angular.module('translator.module.controller', []).controller('translator.controller', function ($scope, $translate, $ionicLoading, $ionicHistory, $state) {
     // $scope.images = ["img/classprofile.png"];
    $scope.changeLanguage = function (lang) {
        $translate.use(lang);
    }

})

////angular.module('translator.module.controller', []).controller('translator.controller', function ($scope, $ionicLoading, $ionicHistory, $state) {

////    function ctrl($scope) {
////        $scope.itemList = [];
////        $scope.blisterPackTemplates = [{ id: 1, name: "english" }, { id: 2, name: "french" }, { id: 3, name: "german" }]

////        $scope.changedValue = function (item) {
////            $scope.itemList.push(item.name);
////        }

////    }
