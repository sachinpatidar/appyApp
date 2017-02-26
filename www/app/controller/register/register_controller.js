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
       
            var a = {
                name: $stateParams.yourName, email: $stateParams.email, registeremail: $stateParams.email, mobile: $stateParams.phoneNo, remarks: "R",
                type: "R", promocode: "4655", country: "ind", city: "ind", Language: localStorage.getItem('languageSelectedText'), DType: "A", user: $stateParams.email, pwd: $stateParams.password,
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
            buttons: [{
                text: '<i class="icon ion-close-circled"></i>',
                type: 'popclose',
                onTap: function (e) {

                }
            }],
        });
    }

    $scope.registerUser = function (data) {
           
      //  alert(JSON.stringify(data.remember));
        if (data.yourName == '' || data.yourName == undefined) {
            ionicToast.show('Please enter name', 'top', false, 2500);
            return;
        }
        if (data.email == '' || data.email == undefined) {
            ionicToast.show('Please enter email', 'top', false, 2500);
            return;
        }
        if (data.countryCode == '' || data.countryCode == undefined) {
            ionicToast.show('Please enter country Code', 'top', false, 2500);
            return;
        }
         if (data.phoneNo == '' || data.phoneNo == undefined) {
            ionicToast.show('Please enter phone number', 'top', false, 2500);
            return;
        }
        if (data.password == '' || data.password == undefined) {
            ionicToast.show('Please enter Password', 'top', false, 2500);
            return;
        }

        if (data.ConfirmPassword == '' || data.ConfirmPassword == undefined) {
            ionicToast.show('Please enter confirm password', 'top', false, 2500);
            return;
        }
        if (data.password !=  data.ConfirmPassword) {
            ionicToast.show('Password not matched', 'top', false, 2500);
            return;
        }

        if (data.remember == false || data.remember == undefined) {
            ionicToast.show('Please Agree the term & condition', 'top', false, 2500);
            return;
        }   
            console.log(data);
            setTimeout(function () {
            $state.go('verifyUserOtp', { yourName: data.yourName, email: data.email, countryCode: data.countryCode, phoneNo: data.phoneNo, password: data.password });
   
 }, 1000);

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