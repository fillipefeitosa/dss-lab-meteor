import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Indicators } from "./indicators";

Meteor.methods({
  "indicators.insertCustomMap": function (indicatorObj) {
    check(indicatorObj["name"], String);
    check(indicatorObj["url"], String);
    check(indicatorObj["mapType"], String);
    check(indicatorObj["mapService"], String);

    return Indicators.insert({
      indicatorObj,
      createdAt: new Date(),
      submitedBy: Meteor.userId(),
    });
  },
});
