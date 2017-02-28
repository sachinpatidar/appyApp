angular.module('ContactUs.module.controller', []).controller('ContactUs.controller', function ($scope, $rootScope, $ionicPopover, $state, $ionicLoading, httpServices, $ionicPopup, ionicToast) {
    $scope.country = httpServices.getCountry();
    $scope.data = {};
    $scope.data.countryCode = "+1";
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

            buttons: [{
                text: '<i class="icon ion-close-circled"></i>',
                type: 'popclose',
                onTap: function (e) {

                }
            }],

        });
        setTimeout(function () {
            $('.popup').css('width', '90% !important');
        }, 5000);
    }

    $scope.contactDetails = function (data) {
        // alert(JSON.stringify(data.Name));


        if (data.Name == '' || data.Name == undefined) {
            ionicToast.show('Please enter name', 'top', false, 2500);
            return;
        }
        if (data.email == '' || data.email == undefined) {
            ionicToast.show('Please enter email', 'top', false, 2500);
            return;
        }
        if (data.phoneNo == '' || data.phoneNo == undefined) {
            ionicToast.show('Please enter phone number', 'top', false, 2500);
            return;
        }
        if (data.subject == '' || data.subject == undefined) {
            ionicToast.show('Please enter subject', 'top', false, 2500);
            return;
        }

        if (data.message == '' || data.message == undefined) {
            ionicToast.show('Please enter message', 'top', false, 2500);
            return;
        }




        console.log(data);
        var a = {
            qname: data.Name, qemail: data.email, qregisteredemail: localStorage.getItem('email'), qmobile: data.phoneNo, remarks: data.subject,
            qdescription: data.message, cid: '91'
        }

        httpServices.post("UserDataQuery", a).then(function (response) {
            console.log(response);
            if (response.data == "success") {
                //    $state.go('dashboard');
                ionicToast.show('Message sent successfully', 'top', false, 2500);
                $("input[type='text']").val('');
                $("input[type='name']").val('');
                $("input[type='email']").val('');
                $("input[type='tel']").val('');
                $scope.data.countryCode = "+1";
            } else {
                ionicToast.show(response.data, 'top', false, 2500);
            }



        }, function (error) {
            ionicToast.show('Message not sent successfully', 'top', false, 2500);
        })


    }
})