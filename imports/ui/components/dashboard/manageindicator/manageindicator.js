import { Indicators } from "/imports/api/indicators/indicators.js";
import swal from "sweetalert";
import "./manageindicator.html";

Template.manageindicators.onCreated(function () {
  Meteor.subscribe("indicators.all");
});

Template.indicator_item.onCreated(function () {
  Meteor.subscribe("indicators.all");
});

Template.indicator_item.helpers({
  verifyMapType(mapType) {
    if (mapType === "customMap") {
      return "Mapa Customizado";
    } else if (mapType === "defaultMap") {
      return "Mapa Default";
    } else {
      // Default Behavior
      console.log("something is wrong with the mapType Provided");
    }
  },
});

Template.indicator_item.events({
  "click #deleteIndicatorMap": function () {
    let docId = this.indicator._id;
    swal({
      title: "Deletar Registo",
      text: "Remover de forma permanente o registo?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Indicators.remove(docId);
      }
    });
  },
});

Template.manageindicators.helpers({
  indicatorMapCollection: function () {
    return Indicators.find({});
  },
});
