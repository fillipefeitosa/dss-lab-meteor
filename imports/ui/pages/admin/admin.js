import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import './admin.html';

// Needed Components
import '../../components/dashboard/dashboard.js';
import '../../components/tools/tools.js';
import '../../components/technical/addtechnical.js';
import '../../components/technical/managetechnical.js';
import '../../components/formupdate/formupdate.js';

// Routine to get Breadcrumb from route
Tracker.autorun(function() {
  FlowRouter.watchPathChange();
  let currentContext = FlowRouter.current();
  if (currentContext.route){
    let breadcrumb = currentContext.route.options.breadcrumb;
    Session.set('breadcrumb', breadcrumb);
  }
});

Template.breadcrumb.helpers({
  getBreadcrumb(){
    let currentPathName = FlowRouter.getRouteName();
    if (currentPathName !== "dashboard"){
      return "> " + Session.get('breadcrumb');
    }
  },
})