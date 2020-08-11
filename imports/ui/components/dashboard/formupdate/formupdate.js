import { Meteor } from "meteor/meteor";
import { Technical } from "/imports/api/technical/technical.js";
import { TechnicalMap } from "/imports/api/technicalMap/technicalMap.js";
import { Tools } from "/imports/api/tools/tools.js";
import { Indicators } from "/imports/api/indicators/indicators.js";

import "./formupdate.html";

Template.formupdate.onCreated(function () {
  Meteor.subscribe("Technical.all");
  Meteor.subscribe("TechnicalMap.all");
  Meteor.subscribe("Tools.all");
  Meteor.subscribe("indicators.all");
});

Template.formupdate.events({
  "click #clickBack": function (event, template) {
    var route = FlowRouter.current();
    FlowRouter.go(route.oldRoute.name);
  },
});

Template.formupdate.helpers({
  formCollection() {
    let collectionParam = FlowRouter.getQueryParam("collection");
    if (collectionParam === "techCollection") {
      return Technical;
    } else if (collectionParam === "techMapCollection") {
      return TechnicalMap;
    } else if (collectionParam === "toolsCollection") {
      return Tools;
    }
  },
  getCollectionType(testParam) {
    let collectionParam = FlowRouter.getQueryParam("collection");
    if (testParam === collectionParam) {
      return true;
    }
  },
  getDocument() {
    let docId = FlowRouter.getParam("docId");
    let doc =
      Technical.findOne(docId) ||
      TechnicalMap.findOne(docId) ||
      Tools.findOne(docId);
    return doc;
  },
  findIndicatorMap() {
    let docId = FlowRouter.getParam("docId");
    let doc = Indicators.findOne(docId);
    console.log(doc);
    return doc;
  },
});

// Update Indicator
Template.updateIndicator.events({
  "submit #customMapCreate": function (event, template) {
    event.preventDefault();
    let docId = this.indicatorMap._id;
    let target = event.target;
    console.log(docId);
    let map = {
      name: target.name.value,
      mapType: target.mapType.value,
      category: target.category.value,
      url: target.url.value,
      mapService: target.mapService.value,
      descriptionPt: target.descriptionPt.value,
    };
    Meteor.call(
      "indicators.updateCustomMap",
      { docId: docId, map: map },
      function (error, success) {
        if (error) {
          console.log("error", error);
        }
        if (success) {
          //default behavior
          swal("Sucesso", "Registo atualizado", "success");
        }
      }
    );
  },
});

Template.updateIndicator.helpers({
  typesOfService() {
    return ["cartoDB", "mapbox", "qgis"];
  },
  typesOfCategories() {
    return ["nuts3", "municipality", "city"];
  },
  isSelected(docOption, option) {
    if (option === docOption) {
      return true;
    }
  },
  getServiceName(service) {
    const serviceName = {
      cartoDB: "CartoDB",
      mapbox: "MapBox Studio",
      qgis: "QGIS",
    };
    return serviceName[service];
  },
  getCategoryName(category) {
    const categoryName = {
      nuts3: "NUTS 3",
      municipality: "Municípios",
      city: "Cidade",
    };
    return categoryName[category];
  },
});
