import { Meteor } from 'meteor/meteor';
import { Tools } from '/imports/api/tools/tools.js';

import './tools.html';

Template.addtools.onCreated(function(){
  Meteor.subscribe('Tools.all');
});

Template.addtools.helpers({
  toolsCollection(){
    return Tools;
  }
});

Template.managetools.onCreated(function(){
  Meteor.subscribe('Tools.all');
});

Template.managetools.helpers({
  toolsCollection(){
    return Tools.find({});
  }
})

Template.managetools.events({
  'click #deleteTools'(){
    Tools.remove(this._id);
  },
});