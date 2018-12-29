const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const SocketIO = require('socket.io');
const wrapControllersWithRejectionProtection = require('./utils/wrapControllersWithRejectionProtection.js');
const SocketRepository = require('./user/SocketRepository.js');
const UserRepository = require('./user/UserRepository.js');
const GameController = require('./game/GameController.js');
const http = require('http');
const { port } = require('./settings.json');

let app;
let server;
let socketMaster;

startServer();

function startServer() {
    app = express();
    app.use(bodyParser.json());

    server = http.createServer(app);
    socketMaster = SocketIO(server);

    run();
    server.listen(port, () => {
        console.log(`\n\n --- Running on port ${port} ---`)
    });
}

function run() {
    const socketRepository = SocketRepository({ socketMaster });
    const userRepository = UserRepository({ socketMaster });

    const deps = {
        socketRepository,
        userRepository
    };

    const controllers = {
        game: GameController()
    };
    deps.controllers = controllers;

    const mappedControllers = wrapControllersWithRejectionProtection(controllers);
    setupRoutes(mappedControllers);

    setupSocketConnectionHandler(deps, controllers);
}

function setupRoutes(controllers) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client-dist', 'index.html'));
    });
    app.get('/index.js', (req, res) => {
        res.sendFile(path.join(__dirname, 'client-dist', 'index.js'));
    });

    app.get('/dashboard', (req, res) => {
        res.sendFile(path.join(__dirname, 'dashboard-dist', 'index.html'));
    });
    app.get('/dashboard/index.js', (req, res) => {
        res.sendFile(path.join(__dirname, 'dashboard-dist', 'index.js'));
    });

    app.post('/login', controllers.user.login);
}

function setupSocketConnectionHandler(deps, controllers) {
    const socketRepository = deps.socketRepository;

    socketMaster.on('connection', async connection => {
        connection.on('registerConnection', async ({ userId }) => {
            console.log(' -- registering connection for user', userId)
            socketRepository.setForUser(userId, connection);

            connection.on('action', data => {
                controllers.game[data.action](userId, data.value);
            });
        });
    });
}