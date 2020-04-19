import { Meteor } from 'meteor/meteor';
import { GamesCollection, insertNewGame } from '/imports/api/games';


Meteor.startup(() => {
  // If the Games collection is empty, add some data.
  if (GamesCollection.find().count() === 0) {
    insertNewGame();
  }
});
