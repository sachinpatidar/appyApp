angular.module('OwnAppyMessage.module.controller', []).controller('OwnAppyMessage.controller',
    function ($scope, $ionicLoading, httpServices, $ionicHistory, $state, $ionicPopup) {
        //  $scope.images = ["img/classprofile.png"];
        setTimeout(function(){   $('.title.title-center.header-item').css('right', '0').css('left', '0');},200);
        httpServices.get("GetUserMessage/" + localStorage.getItem('eauid')).then(function (response) {
            console.log(response);
            if (response.data.GetUserMessageResult.length > 0) {
                
                $scope.UserMessages = response.data.GetUserMessageResult;
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
      
        $scope.enableDisable = function (data,msgId) {
            var a = {
               
                enable: data,
                msgid: msgId,

            }
            console.log(a);
            httpServices.post("UpdateUserMessage", a).then(function (response) {
                console.log(response);
                if (response.data == "success") {
                    $state.go('OwnAppyMessage');
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
        $scope.DeleteOwnAppyMessage = function (msgId, eid) {
            var a = {

               
                "desc": "String content",
                "eid": eid,
                "enable": true,
                "msgid": msgId,
                "sub": "String content"

            }
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmation',
                template: 'Are you sure want to remove ?',
                cancelText: 'Cancel',
                cancelType: 'button-positive1',
                okText: 'OK',
                okType: 'button-positive1',
                cssClass: 'popup-cls'
            });
            $('.popup-body').css("text-align", "Center");
            confirmPopup.then(function (res) {
                if (res) {
                        httpServices.post("DeletePrivateMessage", a).then(function (response) {
                            
                            if (response.data == "Success") {
                                $scope.UserMessages.map((i, j) => {                                
                                if (i.msgid == msgId)
                                {
                                    $scope.UserMessages.splice(j, 1);
                                }
                            });
                                $state.go('OwnAppyMessage');
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
            });
      
               
           


        }
    });