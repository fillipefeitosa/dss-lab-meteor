// Client entry point, imports all client code
import 'bootstrap';
import popper from 'popper.js';

import '/imports/startup/client';
import '/imports/startup/both';


global.Popper = popper;
AutoForm.setDefaultTemplate('bootstrap4');
