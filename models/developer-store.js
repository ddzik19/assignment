'use strict';

const developerStore = {

  // import the playlist collection object
  developerCollection: require('./developer-store.json').developerCollection,

  // function to get all of the playlists
  getAllDevelopers() {
    return this.developerCollection;
  },

};

// export the playlistStore object so it can be used elsewhere
module.exports = developerStore;