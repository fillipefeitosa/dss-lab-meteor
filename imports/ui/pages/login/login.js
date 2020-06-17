import { Template } from 'meteor/templating';
import 'jquery-validation';

import './login.html';


$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        },
        passwordRepeat: {
            equalTo: "#password"
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        },
    }
});

Template.login.onRendered(function(){
    var validator = $('.login').validate({
        submitHandler: function(event){
            let emailVar = $('[name=email]').val();
            let passVar = $('[name=password]').val();
            Meteor.loginWithPassword(emailVar, passVar, function(error){
                if(error){
                    // For secutiry reasons, do not show what is the exact user error
                    if(error.reason == "User not found" || error.reason == "Incorrect password"){
                        validator.showErrors({
                            password: "Check your credentials and try again"   
                        });
                    }
                } else {
                    // Default Behavior. Should Login and redirect to maintenance page
                }
            });

        }
    });
    
});

Template.register.onRendered(function(){
    $('.login').validate({
        submitHandler: function(event){
            var userObject = { 
                email: $('[name=email]').val(),
                password: $('[name=password]').val()
            }; 
            
            Accounts.createUser(userObject, function(err) { 
                if(err){
                    if(error.reason == "Email already exists."){
                        validator.showErrors({
                            email: "That email already belongs to a registered user."   
                        });
                    }
                } else {
                    // Default Behavior. User should LogIn
                }
            });
        }
    });
})

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
    }
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
       
    }
})