import { Meteor } from 'meteor/meteor';
import { Technical } from '../technical.js';

Meteor.publish('Technical.all', function () {
  return Technical.find({});
});
