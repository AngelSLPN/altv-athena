export enum SYSTEM_EVENTS {
    BOOTUP_ENABLE_ENTRY = 'enable:Entry',
    //
    META_SET = 'meta:Set',
    META_CHANGED = 'meta:Changed',
    //
    NOCLIP_UPDATE = 'noclip:Update',
    NOCLIP_RESET = 'noclip:Reset',
    //
    PLAYER_EMIT_ANIMATION = 'animation:Play',
    PLAYER_EMIT_SOUND_3D = 'sound:3D',
    PLAYER_EMIT_FRONTEND_SOUND = 'sound:Frontend',
    PLAYER_EMIT_NOTIFICATION = 'notification:Show',
    //
    PLAYER_SET_FREEZE = 'freeze:Set',
    PLAYER_SET_DEATH = 'death:Toggle',
    //
    PLAYER_TICK = 'player:Tick',
    //
    INTERACTION = 'player:Interact',
    INTERACTION_ATM = 'atm:Open',
    INTERACTION_ATM_ACTION = 'atm:Action',
    //
    QUICK_TOKEN_EMIT = 'quicktoken:Emit',
    QUICK_TOKEN_FETCH = 'quicktoken:Fetch',
    QUICK_TOKEN_NONE = 'quicktoken:None',
    QUICK_TOKEN_UPDATE = 'quicktoken:Update',
    //
    TICKS_START = 'ticks:Start',
    //
    WORLD_UPDATE_TIME = 'time:Update',
    WORLD_UPDATE_WEATHER = 'weather:Update',
    //
    VOICE_ADD = 'voice:Add',
    VOICE_JOINED = 'voice:Joined'
}
