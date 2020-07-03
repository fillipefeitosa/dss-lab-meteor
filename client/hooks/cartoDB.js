import { AutoForm } from "meteor/aldeed:autoform";
import { TechnicalMap } from "/imports/api/technicalMap/technicalMap";
import { Tools } from "/imports/api/tools/tools.js";
import { Session } from "meteor/session";
import { FlowRouter } from "meteor/kadira:flow-router";

// Autoform routines to call API after insert hook, Created for Tools and for TechMaps
// Tools
var cartoDBinsertTools = {
  after: {
    insert: function (error, result) {
      if (error) {
        console.log(error);
      } else {
        let currentDoc = Tools.findOne({ _id: result });
        Meteor.call(
          "sendDocToCarto",
          {
            doc: currentDoc,
            docId: result,
            typeOfCall: "ferramentas",
          },
          function (error, response) {
            if (error) {
              console.log("error", error);
            }
            if (response) {
              console.log(response.error);
            } else {
              console.log("Doc Added to CartoDB. All Good.");
            }
          }
        );
      }
    },
  },
};

// TechMaps
var cartoDBinsertTech = {
  after: {
    insert: function (error, result) {
      if (error) {
        console.log(error);
      } else {
        let currentDoc = TechnicalMap.findOne({ _id: result });
        Meteor.call(
          "sendDocToCarto",
          {
            doc: currentDoc,
            docId: result,
            typeOfCall: "trabalhos_tecnicos",
          },
          function (error, response) {
            if (error) {
              console.log("error", error);
            }
            if (response) {
              console.log(response);
            } else {
              console.log("Doc was added succefully. All good.");
            }
          }
        );
      }
    },
  },
};

// Returns the table name used in CartoAPI to prepare meteorCall
function getFormUpdateParam() {
  let typeOfCall = FlowRouter.getQueryParam("collection");
  if (typeOfCall === "toolsCollection") {
    return "ferramentas";
  } else if (typeOfCall === "techMapCollection") {
    return "trabalhos_tecnicos";
  } else {
    // Default Behavior.
    console.log("Invalid typeOfCall. Check formupdate query params.");
  }
}

var cartoDBupdateTech = {
  after: {
    update: function (error, result) {
      if (error) {
        // If there was an autoform update error
        console.log(error);
      } else {
        let typeOfCall = getFormUpdateParam();
        let currentDoc =
          TechnicalMap.findOne({ _id: this.docId }) ||
          Tools.findOne({ _id: this.docId });

        Meteor.call(
          "updateDocToCarto",
          {
            doc: currentDoc,
            docId: this.docId,
            typeOfCall: typeOfCall,
          },
          function (error, result) {
            if (error) {
              // If the internal (Meteorjs) server returned and error
              console.log("error", error);
            }
            if (result) {
              // If result comes as answer from the server, is Because CARTO API found some kind of problem.
              console.log(result.error);
            } else {
              // Default Behavior
              console.log("Doc successfully updated on Carto DB");
            }
          }
        );
      }
    },
  },
};

// Apply TechMap Hooks
AutoForm.hooks({
  insertTechinicalMapForm: cartoDBinsertTech,
});

// Apply Tools Hooks
AutoForm.hooks({
  insertToolsForm: cartoDBinsertTools,
});

// Update Hooks for Both
AutoForm.hooks({
  quickEditForm: cartoDBupdateTech,
});
