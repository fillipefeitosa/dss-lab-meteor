import { Meteor } from 'meteor/meteor';
import { Technical } from '/imports/api/technical/technical.js';
import { TechnicalMap } from '/imports/api/technicalMap/technicalMap';

import './managetechnical.html';

Template.managetechnical.onCreated(function(){
  Meteor.subscribe('Technical.all');
  Meteor.subscribe('TechnicalMap.all');
});

Template.managetechnical.helpers({
  techCollection() {
    return Technical.find({});
  },
  techMapCollection() {
    return TechnicalMap.find({});
  }
})