angular.module('register.module.controller', []).controller('register.controller', function ($scope, $ionicPopup, $rootScope, httpServices, $ionicPopover, $state, $ionicLoading, ionicToast) {
    //httpServices.post('/RegisterUser', reqData).then(function (response) {

    //    ionicToast.show('Successfully Registered', 'bottom', true, 2500);
    //    $state.go('dashboard');
    //}, function (error) {

    //    ionicToast.show('Some error occured', 'bottom', true, 2500);
    //})

    $scope.data = {};
    var myPopup = '';
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
        var a = {
            name: data.yourName, email: data.email, registeremail: data.email, mobile: data.phoneNo, remarks: "get lost sachin",
            type: "R", promocode: "4655", country: "ind", city: "ind", Language: "English",DType:"A",user:data.email, pwd: data.password,
            Messages: "5", CountryCode: data.countryCode,
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