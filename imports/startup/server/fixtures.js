// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // Create Roles and Default users if the Database is empty
  var roles = Meteor.roles.find({}).count();
  if (roles > 0){
    console.log("Roles defined. Default behavior.");
  } else {
    // Create some users WITH the roles for default operation
    var users = [
      {name:"Convidado",email:"convidado@example.com",roles:['Convidado']},
      {name:"Colaborador",email:"colaborador@example.com",roles:['Colaborador']},
      {name:"Admin User",email:"admin@example.com",roles:['Administrador']}
    ];

    users.forEach(function (user){
      var userObject;
      userObject = Accounts.createUser({ 
        email: user.email, 
        password: 'dssuser', 
        profile: { name: user.name}  
      }); 
      console.log('User created ' + userObject);
      
      if (Meteor.roleAssignment.find( {'user._id': userObject} ).count() === 0){
        user.roles.forEach(function (role){
          Roles.createRole(role, { unlessExists: true });
        });
        Roles.addUsersToRoles(userObject, user.roles);
      }

    });
  }
  
  // Make new users as 'Convidados Role'
  Accounts.onCreateUser(function(options, user) { 
    Roles.addUsersToRoles(user, 'Convidado') 
    return user; 
  });

  // if the Links collection is empty
  if (Links.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
      },
    ];

    data.forEach(link => Links.insert(link));
  }
});
