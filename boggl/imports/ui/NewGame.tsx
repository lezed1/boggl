import React, { useState } from 'react';
import { insertNewGame } from '../api/games';

export const NewGame = () => {

  const newGame = () => {
    insertNewGame();
  };

  return (
    <div>
      <button onClick={newGame}>New Game</button>
    </div>
  );
};
