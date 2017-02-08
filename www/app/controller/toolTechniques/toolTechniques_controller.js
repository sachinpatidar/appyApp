angular.module('toolTechniques.module.controller', []).controller('toolTechniques.controller',
    function ($scope, $ionicLoading, $ionicHistory,httpServices, $state) {
        //  $scope.images = ["img/classprofile.png"];
        httpServices.get("GetToolsTechs/" + localStorage.getItem('languageSelected')).then(function (response) {
            console.log(response);
            if (response.data.GetToolsTechsResult.length > 0) {
                $scope.techniques = response.data.GetToolsTechsResult;
                // $state.go('dashboard');
            }
        }, function (error) {
            ionicToast.show('Login failed', 'top', false, 2500);
        }


    )

    });