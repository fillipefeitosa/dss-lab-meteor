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

Template.managetechnical.events({
  'click #deleteTech'(){
    Technical.remove(this._id);
  },
  'click #deleteTechMap'(){
    let docId = this._id;
    Meteor.call('removeDocFromCarto', {
      docId: docId,
      typeOfCall: 'trabalhos_tecnicos'
    }, function(error, result) { 
      if (error) { 
        // This is a possible error while calling the internal Server. For the Carto API check the exception handling in Methods
        console.log('error', error); 
      } 
      if (result) { 
        // If result comes as answer from the server, is Because CARTO API found some kind of problem. 
        console.log(result.error);
      } else {
        console.log('Removing the Doc '+docId);
        TechnicalMap.remove(docId);
      }
    });
  }
  
});