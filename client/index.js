const Vue = require('vue');
const Vuex = require('vuex');
const PortalVue = require('portal-vue');
const vClickOutside = require('v-click-outside');
const Router = require('./Router.js');
const RootStore = require('./RootStore.js');
const UserRepository = require('./user/UserRepository.js');
const LoginPage = require('./login/LoginPage.js');
const GamePage = require('./game/GamePage.js');

let socket;
let rootStore;
let userRepository;

Vue.use(Vuex);
Vue.use(PortalVue);
Vue.use(vClickOutside);
bootstrap();

function bootstrap() {
    socket = io();

    userRepository = UserRepository({ socket });
    rootStore = createStores();

    initRouter();
}

function initRouter() {
    const pagesByName = {
        'login': LoginPage,
        'game': GamePage
    };
    const pageDependencies = {
        rootStore,
        userRepository,
        gameController: {
            emit(action, value) {
                socket.emit('action', { action, value });
            },
            onAction(callback) {
                socket.on('action', callback);
            },
            requestState() {
                socket.emit('action', { action: 'requestState' });
            }
        }
    };
    const router = Router({ pagesByName, pageDependencies });

    router.route('login');
}

function createStores() {
    return RootStore();
}