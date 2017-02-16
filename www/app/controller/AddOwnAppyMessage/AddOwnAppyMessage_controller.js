angular.module('AddOwnAppyMessage.module.controller', []).controller('AddOwnAppyMessage.controller', function ($scope,$stateParams, $state, httpServices, $rootScope, $ionicHistory) {
    console.log($stateParams.eauid);
    $scope.data = {};
    if ($stateParams.msgId != null || $stateParams.msgId != 'null') {
       
        $scope.data.MessageSubject = ($stateParams.sub!="null"?$stateParams.sub:"");
        $scope.data.MessageDetail = ($stateParams.text != "null" ? $stateParams.text : "");
        setTimeout(function () {

            $('.md-input').each(function () {
                if ($(this).val() != '') {
                    $('#' + $(this).next('span').attr('id')).addClass('active');
                }
                else { $('#' + $(this).next('span').attr('id')).addClass('addOwnpayylbls'); }
            });
          
        }, 500);

    }
    $scope.AddOwnAppyMessages = function (data) {
        if ($stateParams.msgId == 'null' || $stateParams.msgId == null) {
            console.log(data);
            var a = {
                desc: data.MessageDetail, sub: data.MessageSubject, enable: true, eid: localStorage.getItem('eauid')
            }




            httpServices.post("UserMessage", a).then(function (response) {
                console.log(response);
                if (response.data == "success"||response.data=="Success") {
                    $state.go('OwnAppyMessage');
                } else {
                    ionicToast.show(response.data, 'top', false, 2500);
                }
            }, function (error) {
                if (error.status == "-1") {
                    ionicToast.show('something went wrong', 'top', false, 2500);
                }

            }
        );


        }
        else {
            var a = {
                desc: data.MessageDetail, sub: data.MessageSubject,
                enable: true, eid: localStorage.getItem('eauid'),
                msgid:$stateParams.msgId,

            }
            httpServices.post("UpdatePrivateMessage", a).then(function (response) {
                console.log(response);
                if (response.data == "success") {
                    $state.go('OwnAppyMessage');
                }


            }, function (error) {
                ionicToast.show('Login failed', 'top', false, 2500);

            })
        }
        
    }
    });