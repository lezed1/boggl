import React from 'react';
import { insertNewGame } from '../api/games';

export const NewGameButton = () => {
  const newGame = () => {
    insertNewGame();
  };

  return (
    <div>
      <button className="button" type="button" onClick={newGame}>
        New Game
      </button>
    </div>
  );
};
