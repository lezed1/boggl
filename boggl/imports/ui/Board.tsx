import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { GamesCollection } from '/imports/api/games';
import { withResizeDetector } from 'react-resize-detector';

export const Board = withResizeDetector(({ width, height }) => {
  const game = useTracker(() => {
    return GamesCollection.findOne({}, { sort: { createdAt: -1 } });
  });

  if (game === undefined) {
    return <div>Loading...</div>;
  }

  const squareSize = _.min([width, height]);

  return (
    <div
      className="grid-container fluid"
      style={{ width: squareSize, height: squareSize }}
    >
      <div className="grid-y grid-padding-y">
        {game.board.map((row, i) => (
          <div className="cell grid-x grid-padding-x" key={i}>
            {row.map((die, i) => (
              <div className="cell auto" key={i}>
                <svg className="die" viewBox="0 0 20 20">
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    {die}
                  </text>
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
