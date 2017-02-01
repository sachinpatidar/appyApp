angular.module('ContactUs.module.controller', []).controller('ContactUs.controller', function ($scope, $rootScope, $ionicPopover, $state, $ionicLoading, httpServices, $ionicPopup) {
    $scope.country = httpServices.getCountry();
    $scope.data = {};
    $scope.data.countryCode = "+1";
    $scope.selectedCountry = function (name, code) {
        $scope.data.countryCode = code;
        myPopup.close();
    }
    $scope.openPopup = function () {
        var myPopup = $ionicPopup.show({
            templateUrl: 'views/partial_country.html',
            title: 'select country',

            scope: $scope,

        });
    }
    
    $scope.contactDetails = function (data) {

        console.log(data);
        var a = {
            qname: data.Name, qemail: data.email, qregisteredemail: localStorage.getItem('email'), qmobile: data.phoneNo, remarks: data.subject,
            qdescription: data.message, cid: '91'
        }


        
        httpServices.post("UserDataQuery", a).then(function (response) {
            console.log(response);
            if (response.data == "success") {
                $state.go('dashboard');
            }


        })


    }
})