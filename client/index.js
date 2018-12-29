const Vue = require('vue');
const Vuex = require('vuex');
const PortalVue = require('portal-vue');
const vClickOutside = require('v-click-outside');
const Router = require('./Router.js');
const RootStore = require('./RootStore.js');
const LoginPage = require('./login/LoginPage.js');

let socket;
let rootStore;

Vue.use(Vuex);
Vue.use(PortalVue);
Vue.use(vClickOutside);
bootstrap();

function bootstrap() {
    socket = io();

    rootStore = createStores();

    initRouter();
}

function initRouter() {
    const pagesByName = {
        'login': LoginPage,
    };
    const pageDependencies = {
        rootStore
    };
    const router = Router({ pagesByName, pageDependencies });

    router.route('login');
}

function createStores() {
    return RootStore();
}