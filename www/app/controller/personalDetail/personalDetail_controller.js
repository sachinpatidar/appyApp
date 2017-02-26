angular.module('personalDetail.module.controller', []).controller('personalDetail.controller', function ($scope, httpServices, $ionicLoading, $ionicHistory, $state, $translate) {
    //  $scope.images = ["img/classprofile.png"];
    setTimeout(function () {
        $scope.language = localStorage.getItem('languageSelected');
    }, 200);
    httpServices.get("GetGFTUser/" + localStorage.getItem('email')).then(function (response) {
        console.log(response);
        if (response.data.GetGFTUserResult.length > 0) {
            $scope.details = response.data.GetGFTUserResult[0];
            // $state.go('dashboard');
            setTimeout(function () {

                $('.md-input').each(function () {
                    if ($(this).val() != '') {
                        $('#' + $(this).next('span').attr('id')).addClass('active');
                    }
                });
            }, 500);

        } else {
                ionicToast.show(response.data, 'top', false, 2500);
            }
        }, function (error) {
            if (error.status == "-1") {
                ionicToast.show('something went wrong', 'top', false, 2500);
            }
       
    
    })
    httpServices.get("GetLanguages").then(function (response) {
        console.log(response);
        if (response.data.GetLanguagesResult.length > 0) {
            $scope.languages = response.data.GetLanguagesResult;
            $scope.selectedlanguage = localStorage.getItem('languageSelected');
            // $state.go('dashboard');
        }
        else {
            ionicToast.show(response.data, 'top', false, 2500);
        }
    }, function (error) {
        if (error.status == "-1") {
            ionicToast.show('something went wrong', 'top', false, 2500);
        }

    }
        );

    httpServices.get("GetMaxMessageLimit/" + localStorage.getItem('eauid')).then(function (response) {
        console.log(response);
        if (response.data.GetMaxMessageLimitResult.length > 0) {
            $scope.messageDetail = response.data.GetMaxMessageLimitResult[0].Messagescount;
            // $state.go('dashboard');Messagescount
        }
        else {
            ionicToast.show(response.data, 'top', false, 2500);
        }
    }, function (error) {
        if (error.status == "-1") {
            ionicToast.show('something went wrong', 'top', false, 2500);
        }

    }
        );
    $scope.updatePassword = function (data) {

        console.log(data);
        var a = {
            oldpwd: data.currentPassword, newpwd: data.newPassword, user: localStorage.getItem('email')

        }
        httpServices.post("UpdatePassword", a).then(function (response) {
            console.log(response);
            if (response.data == "success") {
                $state.go('personalDetail');
            }
        })
    }

    $scope.updateMaxMessage = function (data) {

        console.log(data);
        var m = {
            EAUId: localStorage.getItem('eauid'), Messagescount: data

        }
        httpServices.post("UpdateMessage", m).then(function (response) {
            console.log(response);
            if (response.data == "success") {
                $state.go('personalDetail');
            }
        })
    }

    $scope.changeLanguage = function (lang) {
        $ionicLoading.show();
        if (lang != undefined) {
         //   alert(lang + " Type of :: " + typeof (lang));
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

            localStorage.setItem('languageSelected', lang);

            var m = {
                UserID: localStorage.getItem('eauid'), lang: httpServices.getLanguages()

            }
            httpServices.post("UpdateLanguage", m).then(function (response) {
                console.log(response);
                if (response.data == "success") {
                    $ionicLoading.hide();
                    $scope.language = localStorage.getItem('languageSelected');
                    $state.go('personalDetail');
                }
                else {
                    ionicToast.show(response.data, 'top', false, 2500);
                }
            }, function (error) {
                if (error.status == "-1") {
                    ionicToast.show('something went wrong', 'top', false, 2500);
                }

            }
        );
        }

    }



});
