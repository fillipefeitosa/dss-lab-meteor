// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';


Meteor.publish(null, function () {
    if (this.userId) {
      return Meteor.roleAssignment.find({ 'user._id': this.userId });
    } else {
      this.ready()
    }
  })