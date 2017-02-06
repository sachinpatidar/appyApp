angular.module('register.module.controller', []).controller('register.controller', function ($scope, $ionicPopup,$stateParams, $rootScope, httpServices, $ionicPopover, $state, $ionicLoading, ionicToast) {
    //httpServices.post('/RegisterUser', reqData).then(function (response) {

    //    ionicToast.show('Successfully Registered', 'bottom', true, 2500);
    //    $state.go('dashboard');
    //}, function (error) {

    //    ionicToast.show('Some error occured', 'bottom', true, 2500);
    //})

    $scope.data = {};

    var myPopup = '';

    if ($stateParams.phoneNo != 'null')
    {
        alert('called');
            var a = {
                name: $stateParams.yourName, email: $stateParams.email, registeremail: $stateParams.email, mobile: $stateParams.phoneNo, remarks: "get lost sachin",
                type: "R", promocode: "4655", country: "ind", city: "ind", Language: "English", DType: "A", user: $stateParams.email, pwd: $stateParams.password,
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

    $scope.data.countryCode = "+1";
    $scope.country = httpServices.getCountry();
    $scope.selectedCountry = function (name, code) {
        $scope.data.countryCode = code;
        myPopup.close();
    }
    $scope.openPopup = function () {
        myPopup = $ionicPopup.show({
            templateUrl: 'views/partial_country.html',
            title: 'select Country',
            scope: $scope,
        });
    }

        $scope.registerUser = function (data) {
            
            console.log(data);
            $state.go('verifyUserOtp', { yourName: data.yourName, email: data.email, countryCode: data.countryCode, phoneNo: data.phoneNo, password: data.password });
   


    }

}).directive('compareTo', function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {
            console.log('value of socpe' + scope);
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});