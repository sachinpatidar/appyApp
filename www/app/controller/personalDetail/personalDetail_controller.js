angular.module('personalDetail.module.controller', []).controller('personalDetail.controller', function ($scope, httpServices, $ionicLoading, $ionicHistory, $state) {
    //  $scope.images = ["img/classprofile.png"];
    httpServices.get("GetGFTUser/" + localStorage.getItem('email')).then(function (response) {
        console.log(response);
        if (response.data.GetGFTUserResult.length > 0) {
            $scope.details = response.data.GetGFTUserResult[0];
            // $state.go('dashboard');
        }
    })
    httpServices.get("GetLanguages").then(function (response) {
        console.log(response);
        if (response.data.GetLanguagesResult.length > 0) {
            $scope.languages = response.data.GetLanguagesResult;
            $scope.language = localStorage.getItem('languageSelected');
            // $state.go('dashboard');
        }
    })   
    
    httpServices.get("GetMaxMessageLimit/" + localStorage.getItem('eauid')).then(function (response) {
        console.log(response);
        if (response.data.GetMaxMessageLimitResult.length > 0) {
            $scope.messageDetail = response.data.GetMaxMessageLimitResult[0].Messagescount;
            // $state.go('dashboard');Messagescount
        }
    })
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
     
            localStorage.setItem('languageSelected', lang);
    }


    
});
