'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const gameview = require('./controllers/gamelist.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers
// getting routes
router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteGamelist/:id', dashboard.deleteGamelist);
router.get('/about',about.index)
router.get('/gamelist/:id', gameview.index);
router.get('/gamelist/:id/deleteGame/:gameId', gameview.deleteGame);

// accounts
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);

// posting routes
router.post('/dashboard/addGamelist', dashboard.addGamelist);
router.post('/dashboard/:id/addGame', dashboard.addGame);
router.post('/gamelist/:id/updateGame', gameview.updateGame);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// export router module
module.exports = router;