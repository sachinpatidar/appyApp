angular.module('toolTechniques.module.controller', []).controller('toolTechniques.controller',
    function ($scope, $ionicLoading, $ionicHistory,httpServices, $state) {
        //  $scope.images = ["img/classprofile.png"];
        httpServices.get("GetToolsTechs/" + localStorage.getItem('languageSelected')).then(function (response) {
            console.log(response);
            if (response.data.GetToolsTechsResult.length > 0) {
                $scope.techniques = response.data.GetToolsTechsResult;
                // $state.go('dashboard');
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