import { AutoForm } from 'meteor/aldeed:autoform';
import { TechnicalMap } from '/imports/api/technicalMap/technicalMap';


// Autoform routines to call API after insert hook, Created for Tools and for TechMaps
var cartoDBhooks = {
  after: {
    insert: function(error, result){
      if(error){
        console.log(error);
      } else{
        let currentDoc = TechnicalMap.findOne({ _id: result });
        Meteor.call('sendDocToCarto', {
          doc: currentDoc,
          docId: result,
          typeOfCall: 'trabalhos_tecnicos'
        }, function(error, success){
          if (error) {
            console.log('error', error);
          }
          if (success) {
            console.log('Doc added to Carto Dababase. All good.')
          }
        });
      }
    }
  },
}

var cartoDBupdate = {
  after: {
    update: function(error, result){
      if (error){
        console.log(error);
      } else {
        let currentDoc = TechnicalMap.findOne({ _id: this.docId });
        
        Meteor.call('updateDocToCarto', {
          doc: currentDoc,
          docId: this.docId,
          typeOfCall: 'trabalhos_tecnicos'
        }, function(error, result) { 
          if (error) { 
            console.log('error', error); 
          } 
          if (result) {
            // If result comes as answer from the server, is Because CARTO API found some kind of problem. 
            console.log(result.error);
          } else {
            // Default Behavior
            console.log('Doc successfully updated on Carto DB');
          }
        });
      }
    }
  }
}

// Apply Hooks
AutoForm.hooks({
  insertTechinicalMapForm: cartoDBhooks,
});

AutoForm.hooks({
  quickEditForm: cartoDBupdate,
})
// AutoForm.addHooks(['insertTechnicalMapForm'], cartoDBhooks);  