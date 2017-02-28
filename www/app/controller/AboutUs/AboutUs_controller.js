angular.module('AboutUs.module.controller', []).controller('AboutUs.controller',
    function ($scope, httpServices, $ionicLoading, $ionicHistory, $state) {
        //  $scope.images = ["img/classprofile.png"];

        if (localStorage.getItem('eauid') == null) {
            $state.go('login');
        }

        httpServices.get("GetPublicPagesinfo/" + "About Us" + "/" + localStorage.getItem('languageSelected')).then(function (response) {
            console.log(JSON.stringify(response));
            if (response.data.GetPublicPagesinfoResult.length > 0) {
                $scope.AboutPageContent = response.data.GetPublicPagesinfoResult[0].PageContent;
                // $state.go('dashboard');Messagescount
            } else {
                ionicToast.show(response.data, 'top', false, 2500);
            }
        }, function (error) {
            if (error.status == "-1") {
                ionicToast.show('something went wrong', 'top', false, 2500);
            }
       
        }
        );
    });