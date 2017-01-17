angular.module('login.module.controller', []).controller('login.controller', function ($scope, $state, httpServices, $rootScope, $ionicHistory) {
    $scope.authenticateUser = function (data) { 
        
            
   
        httpServices.get("GetUser/" + data.email + "/" + data.password).then(function (response) {
            debugger;
            if (response.data.GetUserResult.length > 0)
            {
                $state.go('dashboard');
            }
            }, function (error) {
               // ionicToast.show('Login failed', 'top', false, 2500);

            })

        
    }
})