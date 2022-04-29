"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const gamelistStore = {
  // import the playlist collection object
  store: new JsonStore("./models/gamelist-store.json", { lists: [] }),
  collection: "lists",
  // function to get all of the playlists
  getAllGamelists() {
    return this.store.findAll(this.collection);
  },
  getGamelist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  addGamelist(gamelist) {
    this.store.add(this.collection, gamelist);
  },
  removeGamelist(id){
    const game = this.getGamelist(id);
    this.store.remove(this.collection, game)
  },
  addGame(id, game){
    const gamelist = this.getGamelist(id);
    const games = gamelist.games;
    games.push(game);
  },
    removeGame(id, gameId) {
    const gamelist = this.getGamelist(id);
    const games = gamelist.games;
    _.remove(games, { id: gameId });
  },
  updateGame(gamelistId, gameId, updatedGame){
    const gamelist = this.getGamelist(gamelistId);
    const games = gamelist.games;
    for(var i = 0; i < games.length; i++){
      if(games[i] == gameId){
        games[i] = updatedGame;
      }
    }
  },
  getUserGameLists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

// export the gamelistStore object so it can be used elsewhere
module.exports = gamelistStore;
