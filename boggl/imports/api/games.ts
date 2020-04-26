import { Mongo } from 'meteor/mongo';
import * as _ from 'lodash';

export interface Game {
  _id?: string;
  board: string[][];
  createdAt: Date;
}

export const GamesCollection = new Mongo.Collection<Game>('games');

// https://boardgames.stackexchange.com/q/29264
// https://i.stack.imgur.com/F3h55.png
const dice = [
  'QBZJXK',
  'TOUOTO',
  'OVWRGR',
  'AAAFSR',
  'AUMEEG',
  'HHLRDO',
  'NHDTHO',
  'LHNROD',
  'AFAISR',
  'YIFASR',
  'TELPCI',
  'SSNSEU',
  'RIYPRH',
  'DORDLN',
  'CCWNST',
  'TTOTEM',
  'SCTIEP',
  'EANDNN',
  'MNNEAG',
  'UOTOWN',
  'AEAEEE',
  'YIFPSR',
  'EEEEMA',
  'ITITIE',
  'ETILIC',
];

export const createNewGame: () => string[][] = () => {
  return (_.chain(dice)
    .map(_.sample)
    .shuffle()
    .chunk(5)
    .value() as unknown) as string[][];
};

export const insertNewGame = () => {
  const board = createNewGame();
  GamesCollection.insert({ board, createdAt: new Date() });
};
