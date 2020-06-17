import { Technical } from '/imports/api/technical/technical.js';
import { TechnicalMap } from '/imports/api/technicalMap/technicalMap';

import './techbox.html';

Template.techbox.onCreated(function(){
  Meteor.subscribe('Technical.all');
  Meteor.subscribe('TechnicalMap.all');
});

Template.techbox.helpers({
  techCollection() {
    return Technical.find({});
  },
  techMapCollection() {
    return TechnicalMap.find({});
  }
})