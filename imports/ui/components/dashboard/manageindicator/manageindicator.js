import { Indicators } from "/imports/api/indicators/indicators.js";

import "./manageindicator.html";

Template.manageindicators.onCreated(function () {
  Meteor.subscribe("indicators.all");
});

Template.manageindicators.helpers({
  indicatorMapCollection: function () {
    return Indicators.find({});
  },
  verifyMapType(mapType) {
    if (mapType === "customMap") {
      return "Mapa Customizado";
    } else if (mapType === "defaultMap") {
      return "Mapa Default";
    } else {
      console.log("something is wrong with the mapType Provided");
    }
  },
});
