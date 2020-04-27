import React from 'react';
import { Board } from './Board';
import { NewGameButton } from './NewGameButton';
import { GameStatus } from './GameStatus';

export const App = () => (
  <div className="grid-frame grid-y">
    <div className="call auto top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">Boggl</li>
          <li className="float-right">
            <NewGameButton />
          </li>
          <li className="float-right">
            <GameStatus />
          </li>
        </ul>
      </div>
    </div>

    <div className="cell auto">
      <Board />
    </div>
  </div>
);
