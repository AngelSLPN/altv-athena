import * as alt from 'alt-client';
import gridData from '../../shared/information/gridData';
import { Blip, StreamBlip } from '../extensions/blip';
import { distance2d } from '../../shared/utility/vector';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

const MAX_BLIP_STREAM_DISTANCE = 750;
const streamBlips: { [key: string]: Array<StreamBlip> } = {
    atm: [],
    gas: []
};

let categoriesWithDistance = ['atm', 'gas'];
let hasPopulatedOnce = false;
let lastGridSpace: number | null;

// We use the weather updater because it's a consistent event.
alt.onServer(SYSTEM_EVENTS.WORLD_UPDATE_WEATHER, handleStreamChanges);

/**
 * Happens around every ~5 seconds.
 * Takes the GridSpace of the player to populate blips.
 */
async function handleStreamChanges(): Promise<void> {
    if (!alt.Player.local.meta) {
        return;
    }

    const gridSpace = alt.Player.local.meta.gridSpace;
    if (gridSpace === null || gridSpace === undefined || gridSpace <= -1) {
        return;
    }

    if (!lastGridSpace) {
        lastGridSpace = gridSpace;
    }

    if (lastGridSpace === gridSpace && hasPopulatedOnce) {
        lastGridSpace = gridSpace;
        categoriesWithDistance.forEach(updateCategory);
        return;
    }

    if (lastGridSpace !== gridSpace && hasPopulatedOnce) {
        await Blip.clearEntireCategory('atm');
        await Blip.clearEntireCategory('gas');
        streamBlips['atm'] = [];
        streamBlips['gas'] = [];
    }

    // Create All New Blip Instances Here
    const atms = gridData[gridSpace].objects.atm;
    for (let i = 0; i < atms.length; i++) {
        const atm = atms[i];
        const pos = {
            x: atm.Position.X,
            y: atm.Position.Y,
            z: atm.Position.Z
        } as alt.Vector3;

        const newStreamBlip = new StreamBlip(pos, 108, 2, 'ATM', 'atm', MAX_BLIP_STREAM_DISTANCE, true);
        streamBlips.atm.push(newStreamBlip);
    }

    const gasStations = gridData[gridSpace].objects.gas;
    for (let i = 0; i < gasStations.length; i++) {
        const gas = gasStations[i];
        const pos = {
            x: gas.Position.X,
            y: gas.Position.Y,
            z: gas.Position.Z
        } as alt.Vector3;

        const newStreamBlip = new StreamBlip(pos, 361, 6, 'Gas Station', 'gas', MAX_BLIP_STREAM_DISTANCE, true);
        streamBlips.gas.push(newStreamBlip);
    }

    if (!hasPopulatedOnce) {
        hasPopulatedOnce = true;
    }

    lastGridSpace = gridSpace;
    categoriesWithDistance.forEach(updateCategory);
}

/**
 * Updates the blips that are closest to you.
 * @param {string} category atm, vending, etc.
 */
function updateCategory(category: string): void {
    const blips = streamBlips[category];
    let lastRange: number = distance2d(alt.Player.local.pos, streamBlips[category][0].pos);

    for (let i = 0; i < blips.length; i++) {
        const blip = blips[i];
        const range: null | number = blip.isInRange();

        if (range === null) {
            blip.safeDestroy();
            continue;
        }

        if (range < lastRange) {
            alt.Player.local.closestInteraction = { type: category, position: blips[i].pos };
            lastRange = range;
        }

        blip.safeCreate();
    }

    if (lastRange > 8) {
        alt.Player.local.closestInteraction = null;
    }
}
