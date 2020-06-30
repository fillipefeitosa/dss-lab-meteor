// Client entry point, imports all client code

import popper from 'popper.js';
import 'bootstrap';

import '/imports/startup/client';
import '/imports/startup/both';
import './hooks/cartoDB.js';


global.Popper = popper;
AutoForm.setDefaultTemplate('bootstrap4');