angular.module('verifyUserOtp.module.controller', []).controller('verifyUserOtp.controller',
    function ($scope, httpServices, $ionicLoading, $ionicHistory, $state, $stateParams, $ionicPopup, ionicToast) {
        //  $scope.images = ["img/classprofile.png"];
       
        $scope.data = {};
        $scope.data.phoneNo = $stateParams.phoneNo;
        var phNo = $stateParams.phoneNo;
        sendOtp();
        function sendOtp() {
      
          //  $scope.otp = '123456';
          //  httpServices.get("SendOTP/" + $stateParams.countryCode.replace("+","")+ $scope.data.phoneNo).then(function (response) {
            httpServices.post("SendOTP_sms", { mobile: $stateParams.countryCode.replace("+", "") + $scope.data.phoneNo }).then(function (response) {
               console.log(JSON.stringify(response));
                $scope.otp = response.data;
                console.log($scope.otp);
            })

        }
        
        //if (SMS) SMS.startWatch(function () {
           
        //}, function () {
           
        //});

        document.addEventListener('onSMSArrive', function (e) {
            var data = e.data;
            alert(JSON.stringify(e));
          //  smsList.push(data);

            //updateStatus('SMS arrived, count: ' + smsList.length);

          //  var divdata = $('div#data');
            //divdata.html(divdata.html() + JSON.stringify(data));

        },false);
        $scope.verifyOtp = function (code) {
            console.log($scope.data.code);
           
            if ($scope.data.code == $scope.otp) {

               // $state.go('register', { yourName: $stateParams.yourName, email: $stateParams.email, countryCode: $stateParams.countryCode, phoneNo: $scope.data.phoneNo, password: $stateParams.password });

                var a = {
                    name: $stateParams.yourName, email: $stateParams.email, registeremail: $stateParams.email, mobile: $stateParams.phoneNo, remarks: "R",
                    type: "R", promocode: "4655", country: "ind", city: "ind", Language: localStorage.getItem('languageSelectedText'), DType: "A", user: $stateParams.email, pwd: $stateParams.password,
                    Messages: "5", CountryCode: $stateParams.countryCode,
                    GCMId:' '
                }

                httpServices.post("RegisterAppy", a).then(function (response) {
                    console.log(response);
                    if (response.data == "You are successfully registered") {
                        $state.go('login');
                    }
                    else {
                        ionicToast.show(response.data, 'top', false, 2500);
                    }

                }, function (error) {
                    ionicToast.show('Login failed', 'top', false, 2500);

                });
            }
            else {
                ionicToast.show('please enter correct otp', 'top', false, 2500);
            }
        }
        $scope.ResendCode = function () {
            sendOtp();
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
                              if (phNo != $scope.data.phoneNo)
                              {
                                  sendOtp();
                              }
                              //don't allow the user to close unless he enters wifi password
                             // e.preventDefault();
                          } else {
                              if (phNo != $scope.data.phoneNo) {
                                  sendOtp();
                              }
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