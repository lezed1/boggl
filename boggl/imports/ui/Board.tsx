import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { DateTime } from 'luxon';
import { GamesCollection } from '../api/games';

const letterTable = (board: string[][]) => (
  <table>
    <tbody>
      {board.map((row, i) => (
        <tr key={i}>
          {row.map((die, i) => (
            <td key={i}>{die}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export const Board = () => {
  const game = useTracker(() => {
    return GamesCollection.findOne({}, { sort: { createdAt: -1 } });
  });

  if (game === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board">
      {letterTable(game.board)}
      <div>
        Started{' '}
        {DateTime.fromJSDate(game.createdAt).toRelative({
          unit: 'seconds',
        })}
      </div>
    </div>
  );
};
