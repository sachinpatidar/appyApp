angular.module('loginRegister.module.controller', []).controller('loginRegister.controller', function ($scope, $ionicPopup, $state, $ionicLoading) {

    function callAlert() {
        Alepop = $ionicPopup.alert({
            templateUrl: 'views/partial_Alert.html',
            scope: $scope,
        });

        $('.popup-buttons').hide();
        $('.popup-head').hide();
        $('.popup').addClass('InfoAlert');
    }

    //cordova.plugins.notification.local.on("trigger", function (notification) {
    //    $scope.txtAlert = notification.text;
    //    alert('called fri login regisger');
    //    callAlert();
    //});
    $scope.Alrtcls = function () { Alepop.close(); }

})