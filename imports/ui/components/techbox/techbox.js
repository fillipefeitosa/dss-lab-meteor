import { Technical } from '/imports/api/technical/technical.js';
import { TechnicalMap } from '/imports/api/technicalMap/technicalMap';
import { Mongo } from 'meteor/mongo';

import './techbox.html';

Template.techbox.onCreated(function () {
  Meteor.subscribe('Technical.all');
  Meteor.subscribe('TechnicalMap.all');
});

Template.techbox.helpers({
  techCollection() {
    return Technical.find({});
  },
  techData() {
    return Technical.find({ _id: this._id });
  },
  getAuthors() {    
    return Technical.find({_id:this._id}, {"authors":1}); 
  },
  techMapCollection() {
    return TechnicalMap.find({});
  },

})