module.exports = function State(originalState) {

    const state = originalState;

    return {
        getState: () => state,
        update: updateFn => updateFn(state)
    };


}