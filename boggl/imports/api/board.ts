import _ from 'lodash';
import Immutable from 'immutable';
import { trieType } from './trie';

export type Board = string[][];

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

export const createNewBoard: () => Board = () => {
  return (_.chain(dice)
    .map(_.sample)
    .shuffle()
    .chunk(5)
    .value() as unknown) as Board;
};

// Word finder

class Point extends Immutable.Record({ row: -1, col: -1 }, 'Point') {}

interface SearchParameters {
  board: Board;
  numRows: number;
  numCols: number;
  words: Set<string>;
  minimumWordLength: number;
  dictionary: trieType;
}

interface SearchState {
  point: Point;
  seen: Immutable.Set<Point>;
  letters: string;
}

function getLetter(board: Board, point: Point) {
  return board[point.row][point.col];
}

function isValidPoint(searchParameters: SearchParameters, point: Point) {
  return (
    point.row >= 0 &&
    point.row < searchParameters.numRows &&
    point.col >= 0 &&
    point.col < searchParameters.numCols
  );
}

function* neighbors(
  searchParameters: SearchParameters,
  searchState: SearchState
) {
  const possibleMoves = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (const [deltaRow, deltaCol] of possibleMoves) {
    const newPoint: Point = new Point({
      row: searchState.point.row + deltaRow,
      col: searchState.point.col + deltaCol,
    });
    if (
      isValidPoint(searchParameters, newPoint) &&
      !searchState.seen.has(newPoint)
    ) {
      yield newPoint;
    }
  }
}

function isValidWord(searchParameters: SearchParameters, proposedWord: string) {
  return (
    proposedWord.length >= searchParameters.minimumWordLength &&
    searchParameters.dictionary.hasWord(proposedWord)
  );
}

function search(searchParameters: SearchParameters, searchState: SearchState) {
  if (isValidWord(searchParameters, searchState.letters)) {
    searchParameters.words.add(searchState.letters);
  }
  if (searchParameters.dictionary.isPrefix(searchState.letters)) {
    for (const point of neighbors(searchParameters, searchState)) {
      const newSearchState: SearchState = {
        point,
        seen: searchState.seen.add(point),
        letters: searchState.letters + getLetter(searchParameters.board, point),
      };
      search(searchParameters, newSearchState);
    }
  }
}

export const allValidWords = (board: Board, dictionary: trieType) => {
  const searchParameters: SearchParameters = {
    board,
    numRows: board.length,
    numCols: board[0].length,
    words: new Set(),
    minimumWordLength: 4, // Don't hardcode it
    dictionary,
  };

  for (let row = 0; row < searchParameters.numRows; row++) {
    for (let col = 0; col < searchParameters.numCols; col++) {
      const point = new Point({ row, col });
      const searchState: SearchState = {
        point,
        seen: Immutable.Set([point]),
        letters: getLetter(board, point),
      };
      search(searchParameters, searchState);
    }
  }

  return searchParameters.words;
};
