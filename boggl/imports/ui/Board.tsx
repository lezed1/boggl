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

  // return (
  //   <div className="board">
  //     <div className="grid-container">
  //       <div className="grid-y grid-padding-y">
  //         {game.board.map((row, i) => (
  //           <div className="cell grid-x grid-padding-x" key={i}>
  //             {row.map((die, i) => (
  //               <div className="cell auto" key={i}>
  //                 <div className="die">
  //                   <div className="flex-container align-center-middle">
  //                     <div className="die-text text-center">{die}</div>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  const squareSize = _.min([width, height]);

  return (
    <div className="board" style={{ width: squareSize, height: squareSize }}>
      {game.board.map((row) =>
        row.map((die, i) => (
          <div className="" key={i}>
            <div className="die">
              <div className="flex-container align-center-middle">
                <h3 className="die-text text-center">{die}</h3>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
});
