import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

import 'foundation-sites/dist/js/foundation';
import 'foundation-sites/dist/css/foundation.css';

const timeSessionKey = 'currentTime';
Session.set(timeSessionKey, new Date());
export const currentTime = () => Session.get(timeSessionKey) as Date;

function pollTime() {
  Meteor.call('getCurrentTime', function (error: any, result: Date) {
    Meteor.setTimeout(pollTime, 100);

    if (error != undefined) {
      console.log(error);
    }

    Session.set(timeSessionKey, result);
  });
}
Meteor.startup(() => {
  pollTime();
  render(<App />, document.getElementById('react-target'));
});
