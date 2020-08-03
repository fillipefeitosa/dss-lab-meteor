import { Meteor } from "meteor/meteor";
import { Indicators } from "../indicators";

Meteor.publish("indicators.all", function () {
  return Indicators.find({});
});
