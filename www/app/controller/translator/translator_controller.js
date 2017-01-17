angular.module('translator.module.controller', []).controller('translator.controller', function ($scope, $translate, $ionicLoading, $ionicPopup, $ionicHistory, $state) {
    // $scope.images = ["img/classprofile.png"];
    if (localStorage.getItem('value') == "null" || localStorage.getItem('value') == null) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Agreement',
            template: 'Are you sure you want to eat this ice cream? asfasdf adsf  asdf  asdf  asd f asd f asdf  asdf  asdf  asdf ',
            cancelText: 'Decline',
            cancelType: 'button-positive',
            okText: 'Accept',
            okType: 'button-positive',
            cssClass: 'popup-cls'
        });

        confirmPopup.then(function (res) {
            if (res) {
                localStorage.setItem('value', 'showAgreement');
                $state.go('loginRegister');
            } else {

                $state.go('translator')
            }
        });

    }
    else {
        $state.go('loginRegister');
    }
    $scope.changeLanguage = function (lang) {
        $translate.use(lang);
        $state.go('loginRegister')
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
