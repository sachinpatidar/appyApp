angular.module('dashboard.module.controller', []).controller('dashboard.controller', function ($scope,$ionicHistory, $ionicLoading, $ionicHistory, $state) {
    //  $scope.images = ["img/classprofile.png"];
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.removeBackView();
    $scope.logout = function () {

        localStorage.setItem('email', '');
        localStorage.setItem('eauid','');
        localStorage.setItem('password', '');
        localStorage.setItem("GCMID", '');
        localStorage.setItem("value", '');
        localStorage.setItem('languageSelected', '');
        $state.go('loginRegister');
    }

})