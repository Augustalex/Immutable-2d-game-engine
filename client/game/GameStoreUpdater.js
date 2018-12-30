module.exports = function GameStoreUpdater({ rootStore, gameController }) {

    return {
        init
    };

    function init() {
        gameController.onAction(({ action, value }) => {
            console.log('Got action from server: ' + action, value);
            rootStore.dispatch(`game/${action}`, value);
        });

        gameController.requestState();
    }
}