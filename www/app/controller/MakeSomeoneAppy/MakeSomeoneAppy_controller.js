angular.module('MakeSomeoneAppy.module.controller', []).controller('MakeSomeoneAppy.controller',
    function ($scope,$ionicPopup, $ionicLoading, $ionicHistory,httpServices, $state) {
        //  $scope.images = ["img/classprofile.png"];
        $scope.data = [];
        $scope.data.countryCode = "+1";
        $scope.country = httpServices.getCountry();
        // $scope.data = {};
        var myPopup = '';
        $scope.selectedCountry = function (name, code) {
            $scope.data.countryCode = code;
            myPopup.close();
        }
        $scope.openPopup = function () {
             myPopup = $ionicPopup.show({
                templateUrl: 'views/partial_country.html',
                title: 'select country',

                scope: $scope,

            });
        }
        httpServices.get("GetMessages/" + 1).then(function (response) {
            console.log(response);
            if (response.data.GetMessagesResult.length > 0) {
                $scope.detailSomeone = response.data.GetMessagesResult;
                // $state.go('dashboard');
            }
        }, function (error) {
            ionicToast.show('Login failed', 'top', false, 2500);
        }


   )
        $scope.getSmsDetail = function (id1) {
           // var id = id1;
            console.log($scope.detailSomeone);
            $scope.detailSomeone.map((i, j) => {
              

                if (id1 == i.mid)
                {
                    console.log(id1);
                    console.log(i.smsdetails);
                    $scope.msgDetail = i.smsdetails;
                }
            })
        }
        $scope.makeSomeoneAppy = function (data, msg) {

            console.log(data);
            var a = {
                message: msg, mid: data.mid, mobile: data.phoneNo

            }
            httpServices.post("SendUserMessage", a).then(function (response) {
                console.log(response);
                if (response.data == "success") {
                    $state.go('dashboard');
                }
            })
        }


    });