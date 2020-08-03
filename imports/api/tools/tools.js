import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { AutoForm } from "meteor/aldeed:autoform";

SimpleSchema.extendOptions(["autoform"]);

export const Tools = new Mongo.Collection("Tools");

Tools.allow({
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

const techTypes = {
  Multimédia: "Multimédia",
  Software: "Software",
  App: "App",
};

const coordinatesSchema = new SimpleSchema(
  {
    lat: {
      type: Number,
      min: 32,
      max: 43,
    },
    long: {
      type: Number,
      min: -29,
      max: -6,
    },
  },
  { tracker: Tracker }
);

const geometrySchema = new SimpleSchema(
  {
    type: {
      type: String,
      defaultValue: "Point",
      autoform: { type: "hidden", label: false },
    },
    coordinates: {
      type: Array,
      label: "Coordenadas",
      optional: false,
      maxCount: 1,
      minCount: 1,
    },
    "coordinates.$": {
      type: coordinatesSchema,
      label: false,
    },
  },
  { tracker: Tracker }
);

const propertiesSchema = new SimpleSchema(
  {
    name: {
      type: String,
      max: 100,
      label: "Nome",
      optional: false,
    },
    group: {
      type: String,
      optional: false,
      label: "Tipo",
      autoform: {
        type: "select",
        options: function () {
          return techTypes;
        },
      },
    },
    desc: {
      type: String,
      max: 600,
      optional: true,
      autoform: { rows: 3 },
    },
    link: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
    },
  },
  { tracker: Tracker }
);

ToolsSchema = new SimpleSchema(
  {
    properties: { type: propertiesSchema, label: "Propriedades" },
    type: {
      type: String,
      defaultValue: "Feature",
      autoform: { type: "hidden", label: false },
    },
    geometry: { type: geometrySchema },
  },
  { tracker: Tracker }
);

Tools.attachSchema(ToolsSchema);
