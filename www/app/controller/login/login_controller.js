angular.module('login.module.controller', []).controller('login.controller', function ($scope,$cordovaOauth, $state, httpServices, $rootScope, $ionicHistory,ionicToast) {
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
    $scope.loginFacebook = function () {
        alert('called facebook login');
        $cordovaOauth.facebook('137744153404879', ["email"]).then(function (result) {
            alert(JSON.stringify(result));
        }, function (error) {
            alert(JSON.stringify(error));
        });
    }

    $scope.loginTwitter= function () {
        alert('called twitter login');
        try {
            $cordovaOauth.twitter('ToeIguHX2euUTLoPVvTqmpAXb', 'ONaap2o25ZnoE90JTcETcu8Xky0UtYgZE6DjRuUUrKYKdpj2yZ').then(function (result) {
                alert(JSON.stringify(result));
            }, function (error) {
                alert(JSON.stringify(error));
            });
        }
        catch (e) {
            alert(JSON.stringify(e));
        }
    }
    $scope.googleplusLogin = function () {

        window.plugins.googleplus.login(
        {
            'webClientId':'770132169628-hs92g4mqtc2tg8uroroliganaeflf6a3.apps.googleusercontent.com'
        },
        function (obj) {
            alert(JSON.stringify(obj));
        },
        function (msg) {
            alert(JSON.stringify(msg));
        }
    );
    }
    
})