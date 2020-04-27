import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { DateTime, Duration } from 'luxon';
import { GamesCollection } from '/imports/api/games';
import { currentTime } from '/client/main';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const GameStatus = () => {
  const { game, time } = useTracker(() => {
    const game = GamesCollection.findOne({}, { sort: { createdAt: -1 } });
    const time = DateTime.fromJSDate(currentTime());
    return { game, time };
  });

  if (game === undefined) {
    return <div>Loading...</div>;
  }

  const gameLength = Duration.fromObject({ seconds: game.gameLengthSeconds });
  const gameStart = DateTime.fromJSDate(game.createdAt);
  const gameEnd = gameStart.plus(gameLength);

  let isFinished = time >= gameEnd;

  if (isFinished) {
    return <div>Game finished!</div>;
  } else {
    return (
      <div className="game-status">
        <CircularProgressbar
          value={time.valueOf()}
          minValue={gameStart.valueOf()}
          maxValue={gameEnd.valueOf()}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: 'butt',
            pathTransitionDuration: 0,
          })}
        />
      </div>
    );
  }
};
