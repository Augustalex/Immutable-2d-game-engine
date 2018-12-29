const Vue = require('vue');
const GameView = require('./Game.vue').default;
const ajax = require('../utils/ajax.js');
const GameStore = require('./GameStore.js');
const GameStoreUpdater = require('./GameStoreUpdater.js');

module.exports = function (deps) {

    const route = deps.route;
    const socket = deps.socket;
    const rootStore = deps.rootStore;

    let vm;

    return {
        show,
        hide
    };

    function show() {
        if (rootStore.state.game) {
            rootStore.unregister('game');
        }
        let gameStore = GameStore({ ...deps });
        rootStore.registerModule('game', gameStore);

        GameStoreUpdater({ ...deps }).init();

        vm = new Vue({
            store: rootStore,
            render(h) {
                return h(GameView, {});
            }
        });
        const hook = document.createElement('div');
        document.body.appendChild(hook);
        vm.$mount(hook);
    }

    function hide() {
        if (!vm) return;

        vm.$destroy();
        vm.$el.remove();
        vm = null;
    }
};