"use strict";

// import all required modules
const logger = require("../utils/logger");
const gamelistStore = require("../models/gamelist-store.js");
const uuid = require("uuid");
const accounts = require("./accounts.js");

// create dashboard object
const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Game Review Dashboard',
      gamelists: gamelistStore.getUserGameLists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render' + viewData.gamelists);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  addGamelist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newGameList = {
      title: request.body.title,
      id: uuid(),
      games: [],
    };
    logger.debug('Creating a new Gamelist' + newGameList);
    gamelistStore.addGamelist(newGameList);
    response.redirect("/dashboard");
  },
  deleteGamelist(request, response) {
    const gamelistId = request.params.id;
    logger.debug(`Deleting GameList ${gamelistId}`);
    gamelistStore.removeGamelist(gamelistId);
    response.redirect("/dashboard");
  },
  // below code is note needed in here but i left it so the app does not crash
  addGame(request, response) {
    const gamelistId = request.params.id;
    const newGame = {
      id: uuid(),
      name: request.body.name,
      releaseDate: request.body.releaseDate,
      genre: request.body.genre,
      rating: request.body.rating,
      desc: request.body.desc,
    };
    logger.info(`Added a new game! ${newGame}`);
    gamelistStore.addGame(gamelistId, newGame);
    response.redirect("/dashboard/");
  },
  deleteGame(request, response) {
    const gameId = request.params.id;
    logger.info(`Deleting game ${gameId}`);
    gamelistStore.deleteGame(gameId);
    response.redirect("/dashboard");
  },
};

// export the dashboard module
module.exports = dashboard;