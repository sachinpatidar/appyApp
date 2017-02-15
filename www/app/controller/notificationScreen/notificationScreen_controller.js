angular.module('notificationScreen.module.controller', []).controller('notificationScreen.controller',
    function ($scope, $ionicPopup, $state, $ionicLoading, $rootScope, ionicToast) {
        //  $scope.images = ["img/classprofile.png"];

       
Alepop = $ionicPopup.alert({
                templateUrl: 'views/partial_Alert.html',
                scope: $scope,
            });

            $('.popup-buttons').hide();
            $('.popup-head').hide();
            $('.popup').addClass('InfoAlert');
        

       
        $rootScope.Alrtcls = function () { Alepop.close(); }
     
    });