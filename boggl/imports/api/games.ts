import { Mongo } from 'meteor/mongo';
import { Duration } from 'luxon';
import { createNewBoard, Board } from './board';

export interface Game {
  _id?: string;
  board: Board;
  gameLengthSeconds: number;
  createdAt: Date;
}

export const GamesCollection = new Mongo.Collection<Game>('games');

const gameLength = Duration.fromObject({ minutes: 3 });

export const insertNewGame = () => {
  const board = createNewBoard();
  GamesCollection.insert({
    board,
    gameLengthSeconds: gameLength.as('seconds'),
    createdAt: new Date(),
  });
};
