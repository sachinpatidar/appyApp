angular.module('translator.module.controller', []).controller('translator.controller', function ($scope,httpServices, $translate, $ionicLoading, $ionicPopup, $ionicHistory, $state) {
    // $scope.images = ["img/classprofile.png"];
    alert("dfasd");

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
        alert("pawanasdfs");
        var confirmPopup = $ionicPopup.confirm({
            title: 'Agreement',
            template: 'This app stores your valuable data in your mobile SD card only in a database. So it is advisable that you that the backup of your data(be sure to have one copy in your email inbox) at regular interval to avoid any circumstances that causes data loses. <br/> <br/> It is also advisable to take proper backup of your data before updating android OS or this app. <br/> <br/> Developer of this app will not be responsible for any data losses under any circumstances. It"s user responsible to keep proper backupd of data at regular intervals. <br/> <br/> Please accept to proceed.',
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
