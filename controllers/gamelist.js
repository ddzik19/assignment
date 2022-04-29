"use strict";

const logger = require("../utils/logger");
const gamelistStore = require("../models/gamelist-store");
const uuid = require("uuid");
const accounts = require ('./accounts.js');

const gamelist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const gamelistId = request.params.id;
    logger.debug("list id = " + gamelistId);
    if (loggedInUser) {
    const viewData = {
      title: "Gamelist",
      gamelist: gamelistStore.getGamelist(gamelistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('gamelist-view', viewData);
    }
    else response.redirect('/');
},
    addGame(request, response) {
    const gamelistId = request.params.id;
    const gamelist = gamelistStore.getPlaylist(gamelistId);
    const newGame = {
    id: uuid(),
    title: request.body.title,
    genre: request.body.genre,
    releaseDate: request.body.releaseDate,
    desc: request.body.desc
  };
    gamelistStore.addGame(gamelistId, newGame);
    response.redirect('/game-view/' + gamelistId);
  },
    deleteGame(request, response) {
    const gamelistId = request.params.id;
    const gameId = request.params.gameId;
    logger.debug(`Deleting Game ${gameId} from Gamelist ${gamelistId}`);
    gamelistStore.removeGame(gamelistId, gameId);
    response.redirect('/game-view/' + gamelistId);
  },
  updateGame(request, response){
    const gamelistId = request.params.id;
    const gameId = request.params.id;
    
    let title = prompt("Please enter the game Title: ", "Cool Name!");
    let genre = prompt("Please enter the game Genre: ", "Survival");
    let releaseDate = prompt("Please enter the game Rlease Date: ", "22,02,2022");
    let desc = prompt("Please enter the game Description: ", "Stranded on an island!")
    
    const updatedGame = {
      id: gameId,
      title: title,
      genre: genre,
      releaseDate: releaseDate,
      desc: desc
    }
    logger.debug(`Updating Game ${gameId} in Gamelist ${gamelistId}`);
    gamelistStore.updateGame(gamelistId, gameId, updatedGame);
  }
};

module.exports = gamelist;
