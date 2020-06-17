import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { AutoForm } from 'meteor/aldeed:autoform';

SimpleSchema.extendOptions(['autoform']);

export const Tools = new Mongo.Collection('Tools');

Tools.allow({ 
    insert: function() { 
        return true; 
    }, 
    update: function() { 
        return true; 
    }, 
    remove: function() { 
        return true; 
    } 
});

const techTypes = {"Multimédia":'Multimédia',"Software": 'Software',"App": 'App'};

const coordinatesSchema = new SimpleSchema({
  lat: {
    type: SimpleSchema.Integer,
    min: 32,
    max: 43
  },
  long: {
    type: SimpleSchema.Integer,
    min: -29,
    max: -6
  }
})

const geometrySchema = new SimpleSchema({
  type: {
    type: String,
    defaultValue: 'Point',
    autoform: { type: "hidden", label:false }
  },
  coordinates: {
    type: Array,
  },
  "coordinates.$": {
    type: coordinatesSchema,
    label: false,
  }
})

const propertiesSchema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
    label: "Nome",
    optional: false
  },
  group: {
    type: String,
    optional: false,
    label: "Tipo",
    autoform: {
        type: 'select',
        options: function(){return techTypes}
    }
  },
  desc: {
    type: String, 
    max: 600,
    optional: true,
    autoform: { rows: 3 }
  },
  link: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  }

})

ToolsSchema = new SimpleSchema({
  type: {
    type: String,
    defaultValue: 'Feature',
    autoform: { type: "hidden", label: false }
  },
  geometry: { type: geometrySchema },
  properties: { type: propertiesSchema }
});

Tools.attachSchema(ToolsSchema);