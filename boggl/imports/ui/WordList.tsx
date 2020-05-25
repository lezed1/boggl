import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { GamesCollection } from '/imports/api/games';
import { allValidWords } from '../api/board';
import { getDictionary } from '/client/main';

export const WordList = () => {
  const allWords: string[] = useTracker(() => {
    const game = GamesCollection.findOne({}, { sort: { createdAt: -1 } });

    if (game === undefined) {
      return [];
    } else {
      let dictionary = getDictionary();

      console.log('dictionary', dictionary);
      return Array.from(allValidWords(game.board, dictionary)).sort();
    }
  });

  return (
    <ul>
      {allWords.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  );
};
