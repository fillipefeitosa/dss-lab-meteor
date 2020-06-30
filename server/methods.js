import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({ 
  sendDocToCarto: function({doc, docId, typeOfCall}) { 
     console.log(" --- Starting Api Call ---");
     console.log(typeOfCall);
     console.log(doc);
     try {
        
        let url = "http://fillipefeitosa.cartodb.com/api/v2/sql";
        let docGeometry = `ST_SetSRID(ST_Point(${doc.geometry.coordinates[0]}, ${doc.geometry.coordinates[1]}),4326)`; 
        const result = HTTP.call('POST', url, 
        {
          params: 
          {
            q: `INSERT INTO ${typeOfCall} 
              (the_geom, _desc, name, _group, link, mongo_id) VALUES 
              (${docGeometry}, '${doc.properties.desc}', '${doc.properties.name}',
              '${doc.properties.group}', '${doc.properties.link}','${docId}')`,
            api_key: "3d5e5b8b0063217bfdfdacff263bd4edc24d871f"
          }
        });
        
      //  If succefull, return the doc collection
      console.log(' --- Finished Api call. Doc inserted on CartoDB --- ');
      return doc;

      } catch (error) {
        console.log(error);
        return { error:error, errorMsg: error.response.content};
      }
  },
  removeDocFromCarto: function({docId, typeOfCall}) {
    try {
      let url = "http://fillipefeitosa.cartodb.com/api/v2/sql";
      const result = HTTP.call('POST', url, 
      {
        params:
        {
          q: `DELETE FROM ${typeOfCall} WHERE mongo_idd='${docId}'`,
          api_key: "3d5e5b8b0063217bfdfdacff263bd4edc24d871f"
        }
      }) 
    } catch (error) {
      console.log(error)
      return { error: error, errorMsg: error.response.content };
    }
  },
  updateDocToCarto: function({docId, typeOfCall}) {
    // Create
  } 
});