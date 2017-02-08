angular.module('MakeSomeoneAppy.module.controller', []).controller('MakeSomeoneAppy.controller',
    function ($scope, $ionicPopup, $ionicLoading, $ionicHistory, httpServices, $state, ionicToast) {
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
        $scope.openPopup = function (view,title) {
             myPopup = $ionicPopup.show({
                templateUrl: 'views/'+view,
                title: title,

                scope: $scope,

            });
        }
        httpServices.get("GetMessages/" + localStorage.getItem('languageSelected')).then(function (response) {
            console.log(response);
            if (response.data.GetMessagesResult.length > 0) {
                $scope.detailSomeone = response.data.GetMessagesResult;
                // $state.go('dashboard');
            }
        }, function (error) {
            ionicToast.show('Please check your network connection', 'top', false, 2500);
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
                    //  $state.go('dashboard');
                    ionicToast.show('Message sent successfully', 'top', false, 2500);
                    $("input[type='text']").val('');
                    $("input[type='name']").val('');
                    $("input[type='email']").val('');
                    $("input[type='tel']").val('');
                }
            })
        }

        function onSuccess(contacts) {
           
          
            $scope.contacts = contacts;
        };
        $scope.selectedContact = function (number) {
            $scope.data.phoneNo = number[0].value;

            myPopup.close();
            setTimeout(function () {

                $('.md-input').each(function () {
                    if ($(this).val() != '') {
                        $('#' + $(this).next('span').attr('id')).addClass('active');
                    }
                });
            }, 500);
        }
        function onError(contactError) {
            alert('onError!');
        };

        // find all contacts with 'Bob' in any name field
       
            var options = new ContactFindOptions();
          //  options.filter = "";
            options.multiple = true;
            options.desiredFields = [navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.name];
            //options.hasPhoneNumber = true;
            var fields = ['displayName'];
            navigator.contacts.find(fields, onSuccess, onError, options);
        
        
    });