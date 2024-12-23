const DEFAULT_STATE = {
    isLight: true,
};

export const themeReducer = (state = DEFAULT_STATE, action) => {
    if (action.type === "SWITCH") {
        return {
            ...state,
            isLight: !state.isLight,
        };
    } else {
        return state;
    }
};
