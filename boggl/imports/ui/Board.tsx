import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { GamesCollection } from '../api/games';

export const Board = () => {
    const game = useTracker(() => {
        return GamesCollection.findOne({}, { sort: { createdAt: -1 } });
    });

    if (game === undefined) {
        return <div>No board found.</div>
    }

    return (
        <div className="board">
            <table>
                <tbody>
                    {game.board.map((row) => (
                        <tr>
                            {row.map((die) => (
                                <td>{die}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
