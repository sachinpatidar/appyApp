angular.module('verifyUserOtp.module', ['verifyUserOtp.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('verifyUserOtp', {
        url: '/verifyUserOtp/:yourName?email?countryCode?phoneNo?password',
        templateUrl: 'views/verifyUserOtp.html',
        controller: 'verifyUserOtp.controller',
    })
});