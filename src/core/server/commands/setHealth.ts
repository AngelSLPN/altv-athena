import * as alt from 'alt-server';
import { getDescription } from '../../shared/commands/commandList';
import { CommandsLocale } from '../../shared/locale/commands';
import { addCommand } from '../systems/chat';

addCommand('sethealth', handleCommand);

function handleCommand(player: alt.Player, value: number = 100, targetPlayerID: string | null = null): void {
    if (isNaN(value)) {
        player.emitMessage(getDescription('sethealth'));
        return;
    }

    if (value < 99) {
        value = 99;
    }

    if (value > 200) {
        value = 200;
    }

    if (targetPlayerID === null) {
        finishSetArmour(player, value);
        return;
    }

    const target: alt.Player = [...alt.Player.all].find((x) => x.id.toString() === targetPlayerID);
    if (!target) {
        player.emitMessage(CommandsLocale.CANNOT_FIND_PLAYER);
        return;
    }

    finishSetArmour(target, value);
}

function finishSetArmour(target: alt.Player, value: number) {
    target.addHealth(value, true);
    target.emitMessage(`${CommandsLocale.HEALTH_SET_TO}${value}`);
}
