angular.module('translator.module.controller', []).controller('translator.controller', function ($scope,httpServices, $translate, $ionicLoading, $ionicPopup, $ionicHistory, $state) {
    // $scope.images = ["img/classprofile.png"];
    
    httpServices.get("GetLanguages").then(function (response) {
        console.log(response);
        if (response.data.GetLanguagesResult.length > 0) {
            $scope.languages = response.data.GetLanguagesResult;
            // $state.go('dashboard');
        }
    }, function (error) {
        ionicToast.show('Login failed', 'top', false, 2500);
    }


    )
    if (localStorage.getItem('value') == "null" || localStorage.getItem('value') == null || localStorage.getItem('value') == '') {
        popup();
    }
    else {
        if (localStorage.getItem('eauid') == "null" || localStorage.getItem('eauid') == null || localStorage.getItem('eauid') == '') {
            $state.go('loginRegister');
        }
        else {
            $state.go('dashboard');
        }
        
    }
    $scope.changeLanguage = function (lang) {
        if (localStorage.getItem('value') == 'showAgreement') {
            $translate.use(lang);
            console.log('called');
            localStorage.setItem('languageSelected', lang);
            $state.go('loginRegister')
        }
        else {
            popup();
        }
        
    }
    function popup()
    {
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
               
            } else {

                $state.go('translator')
            }
        });

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
