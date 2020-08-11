import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Indicators } from "./indicators";

Meteor.methods({
  "indicators.insertCustomMap": function (map) {
    check(map["name"], String);
    check(map["url"], String);
    check(map["mapType"], String);
    check(map["mapService"], String);

    return Indicators.insert({
      map,
      createdAt: new Date(),
      submitedBy: Meteor.userId(),
    });
  },
  "indicators.updateCustomMap": function (data) {
    let map = data.map;
    check(map["name"], String);
    check(map["url"], String);
    check(map["mapType"], String);
    check(map["mapService"], String);

    let docId = data.docId;
    return Indicators.update(
      { _id: docId },
      {
        map: map,
      }
    );
  },
});
