import { Meteor } from 'meteor/meteor';
import { Technical } from '/imports/api/technical/technical.js';
import { TechnicalMap } from '/imports/api/technicalMap/technicalMap';

import './addtechnical.html';

Template.addtechnical.onCreated(function(){
  Meteor.subscribe('Technical.all');
  Meteor.subscribe('TechnicalMap.all');
});

Template.addtechnical.helpers({
  techCollection() {
    return Technical;
  },
  techMapCollection(){
    return TechnicalMap;
  }
})