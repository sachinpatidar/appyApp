// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngMessages', 'dashboard.module', 'login.module','pascalprecht.translate', 'http.service.module', 'register.module', 'loginRegister.module','ionMdInput', 'forgetPassword.module', 'appMenu.module', 'personalDetail.module', 'translator.module','OwnAppyMessage.module'
, 'AboutUs.module', 'HowtouseAppy.module', 'MakeSomeoneAppy.module','ionic-toast', 'toolTechniques.module', 'ContactUs.module', 'AddOwnAppyMessage.module'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {

        var push = PushNotification.init({
            android: {
                senderID: "370585387255"
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function(data) {
            // data.registrationId
            localStorage.setItem("GCMID", data.registrationId);
        });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });

        push.on('error', function(e) {
            // e.message
        });
     

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function ($urlRouterProvider, $ionicConfigProvider,$translateProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.navBar.alignTitle('center');
    $urlRouterProvider.otherwise('loginRegister');
    $translateProvider.translations('en', {
        TITLE: 'Welcome!',
        MESSAGE: 'This app supports your lanaguage!'
    })
 .translations('sv', {
     TITLE: 'V�lkommen!',
     MESSAGE: 'Denna app st�der ditt spr�k!'
 });
    $translateProvider.preferredLanguage('en');
})
