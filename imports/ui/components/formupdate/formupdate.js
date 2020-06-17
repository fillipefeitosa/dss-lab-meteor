import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Technical } from '/imports/api/technical/technical.js';
import { TechnicalMap } from '/imports/api/technicalMap/technicalMap.js';
import { Tools } from '/imports/api/tools/tools.js';

import './formupdate.html';

Template.formupdate.onCreated(function(){
  Meteor.subscribe('Technical.all');
  Meteor.subscribe('TechnicalMap.all');
  Meteor.subscribe('Tools.all');
});

Template.formupdate.events({ 
  'click #clickBack': function(event, template) {
    var route = FlowRouter.current();
    FlowRouter.go(route.oldRoute.name);
  } 
});

Template.formupdate.helpers({
  formCollection(){
    let collectionParam = FlowRouter.getQueryParam('collection');
    if (collectionParam === 'techCollection'){
      return Technical;
    } else if (collectionParam === 'techMapCollection'){
      return TechnicalMap;
    } else if (collectionParam === 'toolsCollection'){
      return Tools;
    }
  },
  getDocument() {
    let docId = FlowRouter.getParam('docId');
    let doc = Technical.findOne(docId) || TechnicalMap.findOne(docId) || Tools.findOne(docId);
    return doc;
  },
});


// var route = FlowRouter.current();
// if(backRoute.oldRoute){
//   console.log('back', route.oldRoute.name);
//   FlowRouter.go(route.oldRoute.name);
// }else{
//   FlowRouter.go('home');
// }