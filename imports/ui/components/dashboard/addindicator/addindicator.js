import { Session } from "meteor/session";
import "jquery-validation";
import "./addindicator.html";

// Parent Template
Template.addindicator.events({
  "change #customMap"() {
    Session.set("indicatorMap", "customMap");
  },
  "change #defaultMap"() {
    Session.set("indicatorMap", "defaultMap");
  },
});

Template.addindicator.onCreated(function () {
  Meteor.subscribe("indicators.all");
});

Template.addindicator.helpers({
  verifyWhatIndicator(typeOfIndicator) {
    sessionMap = Session.get("indicatorMap");
    if (sessionMap === typeOfIndicator) return true;
  },
});

// Custom Map
Template.customMap.onRendered(function () {
  $("#customMapCreate").validate({
    rules: {
      name: { required: true, minlength: 6 },
      category: { required: true },
      url: { required: true, url: true },
      mapService: { required: true },
      descriptionPt: { required: true },
    },
  });
});

Template.customMap.events({
  "submit #customMapCreate": function (event) {
    event.preventDefault();
    const target = event.target;

    const indicatorObj = {
      name: target.name.value,
      mapType: target.mapType.value,
      category: target.category.value,
      url: target.url.value,
      mapService: target.mapService.value,
      descriptionPt: target.descriptionPt.value,
    };
    Meteor.call("indicators.insertCustomMap", indicatorObj, function (
      error,
      success
    ) {
      if (error) {
        console.log("error", error);
      }
      if (success) {
        // Default Behavior
        console.log("Indicator Map was successfully inserted");
      }
    });
  },
});
