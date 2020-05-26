import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/category/category.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.redirect',
  action() {
    window.location = 'http://localhost:8000/';
  },
});

FlowRouter.route('/municipios', {
  name: 'App.redirectMunicipios',
  action() {
    window.location = 'http://localhost:8000/municipios.php';
  },
});

FlowRouter.route('/toolmap', {
  name: 'App.toolmap',
  action(){
    BlazeLayout.render('App_body', {main: 'App_home', map:'toolmap', bottomContainer:'toolbox'});
  },
});

FlowRouter.route('/techmap', {
  name: 'App.techmap',
  action(){
    BlazeLayout.render('App_body', {main: 'App_home', map:'techmap', bottomContainer:'techbox'});
  }
})

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

// Login to Admin Interface
FlowRouter.route('/login', {
  name: 'login',
  action: function(){
      BlazeLayout.render('login');
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action: function(){
      BlazeLayout.render('register');
  }
});

loggedIn = FlowRouter.group({
  prefix: '/admin',
  triggersEnter: [
    function(){
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())){
        route = FlowRouter.current();
        if (route.route.name !== 'login'){
          sessionStorage.set('redirectAfterLogin', route.path)
        }
        return FlowRouter.go('login');
      }
    }
  ]
});