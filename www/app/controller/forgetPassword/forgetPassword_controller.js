angular.module('forgetPassword.module.controller', []).controller('forgetPassword.controller', function ($scope, $ionicPopup,httpServices, $ionicLoading, $state) {
    //  $scope.images = ["img/classprofile.png"];
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
            buttons: [{
                text: '<i class="icon ion-close-circled"></i>',
                type: 'popclose',
                onTap: function (e) {

                }
            }],
        });
    }

})