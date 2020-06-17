import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { AutoForm } from 'meteor/aldeed:autoform';

SimpleSchema.extendOptions(['autoform']);

export const Technical = new Mongo.Collection('Technical');

Technical.allow({ 
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

TechnicalSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nome",
        max: 200
    },
    submitedBy: {
        type: String,
        autoValue: function(){ return this.userId },
        autoform: { type: "hidden", label: false }
    },
    authors: {
        type: Array,
        optional: true,
        label: "Lista de Autores",
        maxCount: 9
    },
    "authors.$": {
        type: Object,
        optional: true,
        label: "Autor",
    },
    "authors.$.name": {
        type: String,
        max: 200,
        label: 'Nome',
        optional: false,
    },
    "authors.$.prefix": {
        type: String,
        optional: true,
        label: "Prefixo (ie. PhD, Prof)",
        optional: true,
    },
    abstract: {
        type: String,
        label: 'Abstract',
        optional: true,
        max: 1000,
        autoform: { rows: 4 }
    },
    link: {
        type: String,
        label: "Link",
        optional: true,
        max: 200
    },
    keywords: {
        type: String,
        label: "Keywords (separar por ; )",
        optional: true,
        max:200
    }

});

Technical.attachSchema(TechnicalSchema);

