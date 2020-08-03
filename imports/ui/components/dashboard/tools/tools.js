import { Meteor } from "meteor/meteor";
import { Tools } from "/imports/api/tools/tools.js";

import "./tools.html";

Template.addtools.onCreated(function () {
  Meteor.subscribe("Tools.all");
});

Template.addtools.helpers({
  toolsCollection() {
    return Tools;
  },
});

Template.managetools.onCreated(function () {
  Meteor.subscribe("Tools.all");
});

Template.managetools.helpers({
  toolsCollection() {
    return Tools.find({});
  },
});

Template.managetools.events({
  "click #deleteTools"() {
    let docId = this._id;
    Meteor.call(
      "removeDocFromCarto",
      {
        docId: docId,
        typeOfCall: "ferramentas",
      },
      function (error, result) {
        if (error) {
          console.log("error", error);
        }
        if (result) {
          console.log(result.error);
        } else {
          console.log("Tools succefully removed from CartoDB: " + docId);
          Tools.remove(docId);
        }
      }
    );
  },
});
