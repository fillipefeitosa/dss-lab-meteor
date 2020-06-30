import { AutoForm } from 'meteor/aldeed:autoform';
import { TechnicalMap } from '/imports/api/technicalMap/technicalMap';


// Autoform routines to call API after insert hook, Created for Tools and for TechMaps
var insertDocHook = {
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
  update: function(error, result){
    if (error){
      console.log(error);
    } else {
      let currentDoc = TechnicalMap.findOne({ _id: result });
      Meteor.call('updateDocToCarto', {
        doc: currentDoc,
        docId: result,
        typeOfCall: 'trabalhos_tecnicos'
      }, function(error, success) { 
        if (error) { 
          console.log('error', error); 
        } 
        if (success) { 
          console.log('Doc successfully updated on Carto DB');
        } 
      });
    }
  }
}

// A before Hook
AutoForm.hooks({
  insertTechinicalMapForm: insertDocHook,
})