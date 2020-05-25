import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import Trie from 'trie-prefix-tree';
import { trieType } from '/imports/api/trie';
import 'foundation-sites/dist/js/foundation';
import 'foundation-sites/dist/css/foundation.css';

const time = new ReactiveVar(new Date());
export const currentTime = () => time.get() as Date;

function pollTime() {
  Meteor.call('getCurrentTime', function (error: any, result: Date) {
    Meteor.setTimeout(pollTime, 100);

    if (error != undefined) {
      console.log(error);
      return;
    }
    time.set(result);
  });
}
Meteor.startup(() => pollTime());

const dictionary = new ReactiveVar(Trie([]));
export const getDictionary = () => dictionary.get() as trieType;

Meteor.startup(() => {
  Meteor.call('getAllWords', function (error: any, result: string[]) {
    if (error != undefined) {
      console.log(error);
      return;
    }

    let result1 = Trie(result);
    console.log('result1', result1);
    dictionary.set(result1);
    console.log('getDictionary', getDictionary());
  });
});

Meteor.startup(() => render(<App />, document.getElementById('react-target')));
