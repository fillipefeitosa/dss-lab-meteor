import { Meteor } from 'meteor/meteor';
import { TechnicalMap } from '../technicalMap.js';

Meteor.publish('TechnicalMap.all', function () {
  return TechnicalMap.find({});
});
