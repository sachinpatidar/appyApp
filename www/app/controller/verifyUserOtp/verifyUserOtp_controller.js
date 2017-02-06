angular.module('verifyUserOtp.module.controller', []).controller('verifyUserOtp.controller',
    function ($scope, httpServices, $ionicLoading, $ionicHistory, $state, $stateParams, $ionicPopup) {
        //  $scope.images = ["img/classprofile.png"];
       
        $scope.data = {};
        $scope.data.phoneNo = $stateParams.phoneNo;
        sendOtp();
        function sendOtp() {
          //  $scope.otp = '123456';
            httpServices.get("SendOTP/" + $scope.data.phoneNo).then(function (response) {
                console.log(JSON.stringify(response));
                $scope.otp = response.data.SendOTPResult;
                console.log($scope.otp);
            });

        }
        $scope.verifyOtp = function (code) {
            console.log($scope.data.code);
           
            if ($scope.data.code == $scope.otp)
            {
                $state.go('register', { yourName: $stateParams.yourName, email: $stateParams.email, countryCode: $stateParams.countryCode, phoneNo: $scope.data.phoneNo, password: $stateParams.password });
            }
        }
        $scope.ResendCode = function () {

        }
        $scope.changeNumber = function () {

            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.phoneNo">',
                title: 'Enter phoneNumber',
              
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },
                  {
                      text: '<b>Save</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                          if (!$scope.data.phoneNo) {
                              console.log($scope.data.phoneNo)
                              //don't allow the user to close unless he enters wifi password
                             // e.preventDefault();
                          } else {
                              console.log($scope.data.phoneNo)
                              return $scope.data.phoneNo;
                          }
                      }
                  }
                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        }
    });