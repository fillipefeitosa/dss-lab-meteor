import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

import "./admin.html";

// Needed Components
import "../../components/dashboard/dashboard.js";
import "../../components/dashboard/tools/tools.js";
import "../../components/dashboard/technical/addtechnical.js";
import "../../components/dashboard/technical/managetechnical.js";
import "../../components/dashboard/formupdate/formupdate.js";
import "../../components/dashboard/addindicator/addindicator.js";
import "../../components/dashboard/manageindicator/manageindicator.js";

// Routine to get Breadcrumb from route
Tracker.autorun(function () {
  FlowRouter.watchPathChange();
  let currentContext = FlowRouter.current();
  if (currentContext.route) {
    let breadcrumb = currentContext.route.options.breadcrumb;
    Session.set("breadcrumb", breadcrumb);
  }
});

Template.breadcrumb.helpers({
  getBreadcrumb() {
    let currentPathName = FlowRouter.getRouteName();
    if (currentPathName !== "dashboard") {
      return "> " + Session.get("breadcrumb");
    }
  },
});
