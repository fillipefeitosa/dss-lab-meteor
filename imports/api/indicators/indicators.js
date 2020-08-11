import { Mongo } from "meteor/mongo";

export const Indicators = new Mongo.Collection("Indicators");

Indicators.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
});
