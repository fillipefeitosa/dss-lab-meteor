import { Meteor } from 'meteor/meteor';
import { Tools } from '../tools.js';

Meteor.publish('Tools.all', function () {
  return Tools.find({});
});
