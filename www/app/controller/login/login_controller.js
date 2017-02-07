angular.module('login.module.controller', []).controller('login.controller', function ($scope,$cordovaOauth, $state, httpServices, $rootScope, $ionicHistory,ionicToast) {
    $scope.authenticateUser = function (data) { 
        
            
   
        httpServices.get("GetUser/" + data.email + "/" + data.password).then(function (response) {
           
            if (response.data.GetUserResult.length > 0) {
                localStorage.setItem('email', response.data.GetUserResult[0].email);
                localStorage.setItem('eauid', response.data.GetUserResult[0].eauid);
                localStorage.setItem('password', data.password);
              //  localStorage.setItem('languageSelected', 1);
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
       
        $cordovaOauth.facebook('137744153404879', ["email"]).then(function (result) {
            alert(JSON.stringify(result));
        }, function (error) {
            alert(JSON.stringify(error));
        });
    }

    $scope.loginTwitter= function () {
        
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

    function thirdParyLogin()
    {
        var a = {
            name: $stateParams.yourName, email: $stateParams.email, registeremail: $stateParams.email, mobile: $stateParams.phoneNo, remarks: "R",
            type: "R", promocode: "4655", country: "ind", city: "ind", Language: localStorage.getItem('languageSelected'), DType: "A", user: $stateParams.email, pwd: $stateParams.password,
            Messages: "5", CountryCode: $stateParams.countryCode,
            GCMId: localStorage.getItem("GCMID")
        }

        httpServices.post("RegisterAppy", a).then(function (response) {
            console.log(response);
            if (response.data == "success") {
                $state.go('login');
            }
            else {
                ionicToast.show('Register failed', 'top', false, 2500);
            }

        }, function (error) {
            ionicToast.show('Login failed', 'top', false, 2500);

        })

    }


    
})