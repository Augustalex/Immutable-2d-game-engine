module.exports = function State(deps) {

    const userRepository = deps.userRepository;
    const state = deps.originalState;

    return {
        getState: () => {
            state.users = userRepository.getAll();
            return state;
        },
        update: updateFn => updateFn(state)
    };


}