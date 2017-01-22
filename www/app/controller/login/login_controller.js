angular.module('login.module.controller', []).controller('login.controller', function ($scope, $state, httpServices, $rootScope, $ionicHistory,ionicToast) {
    $scope.authenticateUser = function (data) { 
        
            
   
        httpServices.get("GetUser/" + data.email + "/" + data.password).then(function (response) {
           
            if (response.data.GetUserResult.length > 0) {
                localStorage.setItem('email', response.data.GetUserResult[0].email);
                localStorage.setItem('eauid', response.data.GetUserResult[0].eauid);
                localStorage.setItem('password', data.password);
                $state.go('dashboard');
            }
            else {
                ionicToast.show('please enter valid email and password', 'top', false, 2500);
            }
        }
            , function (error) {
            ionicToast.show('Login failed', 'top', false, 2500);

            }
            )

        
    }



})