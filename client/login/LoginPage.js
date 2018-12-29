const Vue = require('vue');
const LoginView = require('./Login.vue').default;
const ajax = require('../utils/ajax.js');

module.exports = function (deps) {

    const route = deps.route;
    const userRepository = deps.userRepository;

    let vm;

    return {
        show,
        hide
    };

    function show() {
        if (hasPreviousSession()) {
            restoreFromPreviousSession();
            return;
        }

        vm = new Vue({
            render(h) {
                return h(LoginView, {
                    on: {
                        submit: this.submit
                    }
                });
            },
            methods: {
                async submit(name) {
                    let ownUser = await ajax.jsonPost('/login', { name });
                    localStorage.setItem('own-user', JSON.stringify(ownUser));

                    userRepository.storeOwnUser(ownUser);
                    route('game');
                }
            }
        });
        const hook = document.createElement('div');
        document.body.appendChild(hook);
        vm.$mount(hook);
    }

    function hasPreviousSession() {
        return !!localStorage.getItem('own-user');
    }

    async function restoreFromPreviousSession() {
        let storedUserJson = localStorage.getItem('own-user');
        if (!storedUserJson) return;

        const ownUser = JSON.parse(storedUserJson);
        const allUsers = await userRepository.getAll();
        const existsOnServer = allUsers.some(u => u.id === ownUser.id);
        if (existsOnServer) {
            userRepository.storeOwnUser(ownUser);
            route('game');
        }
        else {
            localStorage.removeItem('own-user');
            route('login');
        }
    }

    function hide() {
        if (!vm) return;

        vm.$destroy();
        vm.$el.remove();
        vm = null;
    }
};