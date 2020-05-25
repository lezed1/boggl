import { Meteor } from 'meteor/meteor';
import { GamesCollection, insertNewGame } from '/imports/api/games';

Meteor.startup(() => {
  // If the Games collection is empty, add some data.
  if (GamesCollection.find().count() === 0) {
    insertNewGame();
  }
});

declare var Assets: { getText(assetPath: string): string };
const dictionary = Assets.getText('collins_scrabble_dictionary_2019.txt')
  .split('\n')
  .filter((line) => line[0] != '#');

Meteor.methods({
  getCurrentTime: function () {
    return new Date();
  },
  getAllWords: function () {
    return dictionary;
  },
});
