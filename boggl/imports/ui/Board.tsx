import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { GamesCollection } from '/imports/api/games';

export const Board = () => {
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

  return (
    <div className="board">
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
};
