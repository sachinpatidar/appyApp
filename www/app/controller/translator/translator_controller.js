﻿angular.module('translator.module.controller', []).controller('translator.controller', function ($scope, httpServices, $translate, $ionicLoading, $ionicPopup, $ionicHistory, $state, ionicToast) {
    // $scope.images = ["img/classprofile.png"];

    $scope.selectedlanguage = 1;
    httpServices.get("GetLanguages").then(function (response) {
        //  alert(JSON.stringify(response));
        if (response.data.GetLanguagesResult.length > 0) {
            $scope.languages = response.data.GetLanguagesResult;

            // $state.go('dashboard');
        }
        else {
            ionicToast.show('Login failed', 'top', false, 2500);
        }
    }, function (error) {
        if (error.status == "-1") {
            ionicToast.show('something went wrong', 'top', false, 2500);
        }

    }


    );
    if (localStorage.getItem('value') == null) {
        popup();
    }
    else if (localStorage.getItem('languageSelected') == "null" || localStorage.getItem('languageSelected') == null || localStorage.getItem('languageSelected') == '') {
        $state.go('translator');
    }
    else {
        if (localStorage.getItem('eauid') == "null" || localStorage.getItem('eauid') == null || localStorage.getItem('eauid') == '') {
            $state.go('loginRegister');
        }
        else {
            //    alert("sdfsad");
            //     $translate.use(lang);
       //    alert('called');
            //  localStorage.setItem('languageSelected', lang);

            $state.go('dashboard');
        }

    }
    $scope.changeLanguage = function (lang) {

        if (localStorage.getItem('value') == 'showAgreement') {
            //  alert(lang + " Type of :: "+ typeof(lang));
            if (lang != undefined) {
                var trans = '';
                switch (lang) {
                    case "1":
                        {
                            trans = 'en';
                            break;
                        };
                    case "2":
                        {
                            trans = 'fr';
                            break;
                        };
                    case "3":
                        {
                            trans = 'ru';
                            break;
                        }
                    case "4":
                        {
                            trans = 'zh';
                            break;
                        }
                    case "5":
                        {
                            trans = 'ar';
                            break;
                        }
                    case "6":
                        {
                            trans = 'he';
                            break;
                        }
                }
                console.log(trans);
                $translate.use(trans);

                //    alert("sdfsad");
                //     $translate.use(lang);
                console.log('called');
                localStorage.setItem('languageSelected', lang);
                httpServices.getLanguages();
                $state.go('loginRegister')
            }
            else {
                ionicToast.show('Please select language', 'top', false, 2500);
            }
        }
        else {
            popup();
        }

    }

    $scope.getvalue = function (data) {
        $scope.selectedlanguage = data;
        //alert(data);
    }

    function popup() {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Agreement',
            template: 'This app stores your valuable data in your mobile SD card only in a database. So it is advisable that you that the backup of your data(be sure to have one copy in your email inbox) at regular interval to avoid any circumstances that causes data loses. <br/> <br/> It is also advisable to take proper backup of your data before updating android OS or this app. <br/> <br/> Developer of this app will not be responsible for any data losses under any circumstances. It"s user responsible to keep proper backupd of data at regular intervals. <br/> <br/> Please accept to proceed.',
            cancelText: 'Decline',
            cancelType: 'button-positive1',
            okText: 'Accept',
            okType: 'button-positive1',
            cssClass: 'popup-cls'
        });
        console.log('popup aya');
        confirmPopup.then(function (res) {
            if (res) {
                localStorage.setItem('value', 'showAgreement');

            } else {
                console.log(res);
                $state.go('translator')
            }
        });

    }




});

////angular.module('translator.module.controller', []).controller('translator.controller', function ($scope, $ionicLoading, $ionicHistory, $state) {

////    function ctrl($scope) {
////        $scope.itemList = [];
////        $scope.blisterPackTemplates = [{ id: 1, name: "english" }, { id: 2, name: "french" }, { id: 3, name: "german" }]

////        $scope.changedValue = function (item) {
////            $scope.itemList.push(item.name);
////        }

////    }
