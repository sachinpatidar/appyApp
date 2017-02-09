﻿angular.module('HowtouseAppy.module.controller', []).controller('HowtouseAppy.controller',
    function ($scope,httpServices, $ionicLoading, $ionicHistory, $state) {
        //  $scope.images = ["img/classprofile.png"];

        httpServices.get("GetPublicPagesinfo/" + '"How to use Appy"' + "/" + localStorage.getItem('languageSelected')).then(function (response) {
            console.log(response);
            if (response.data.GetPublicPagesinfoResult.length > 0) {
                $scope.HowtoPageContent = response.data.GetPublicPagesinfoResult[0].PageContent;
                // $state.go('dashboard');Messagescount
            }
        });
    });