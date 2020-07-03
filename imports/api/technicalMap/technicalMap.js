import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { AutoForm } from "meteor/aldeed:autoform";

SimpleSchema.extendOptions(["autoform"]);

export const TechnicalMap = new Mongo.Collection("TechnicalMap");

TechnicalMap.allow({
  insert: function () {
    console.log("Objeto Inserido");

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
  "Aplicativo Móvel": "Aplicativo Móvel",
  Framework: "Framework",
  "Livro Digital": "Livro Digital",
  Modelo: "Modelo",
};

const coordinatesSchema = new SimpleSchema({
  lat: {
    type: SimpleSchema.Integer,
    min: 32,
    max: 43,
  },
  long: {
    type: SimpleSchema.Integer,
    min: -29,
    max: -6,
  },
});

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

const propertiesSchema = new SimpleSchema({
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
    label: "Descrição ou Resumo",
    max: 600,
    optional: true,
    autoform: { rows: 3 },
  },
  link: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
});

TechnicalMapSchema = new SimpleSchema(
  {
    type: {
      type: String,
      defaultValue: "Feature",
      autoform: { type: "hidden", label: false },
    },
    properties: { type: propertiesSchema, label: "Propriedades" },
    geometry: { type: geometrySchema, optional: false, label: "Geometria" },
    authors: {
      type: Array,
      optional: true,
      label: "Lista de Autores",
      maxCount: 9,
    },
    "authors.$": {
      type: Object,
      optional: true,
      label: "Autor",
    },
    "authors.$.name": {
      type: String,
      max: 200,
      label: "Nome",
      optional: false,
    },
    "authors.$.prefix": {
      type: String,
      optional: true,
      label: "Prefixo (ie. PhD, Prof)",
      optional: true,
    },
    submitedBy: {
      type: String,
      autoValue: function () {
        return this.userId;
      },
      autoform: { type: "hidden", label: false },
    },
  },
  { tracker: Tracker }
);

TechnicalMap.attachSchema(TechnicalMapSchema);
