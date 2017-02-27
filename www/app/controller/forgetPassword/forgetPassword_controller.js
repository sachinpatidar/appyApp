angular.module('forgetPassword.module.controller', []).controller('forgetPassword.controller', function ($scope, $ionicPopup,httpServices, $ionicLoading, $state,ionicToast) {
    //  $scope.images = ["img/classprofile.png"];
    $scope.data = {};

    var myPopup = '';
    $scope.data.countryCode = "+1";
    $scope.country = httpServices.getCountry();
    $scope.selectedCountry = function (name, code) {
        $scope.data.countryCode = code;
        myPopup.close();
    }
var regIsNumber = function (fData) {
var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
    return reg.test(fData)
 }
$scope.submitForget=function(data){

      console.log(data);
      var typedata='email';
if(regIsNumber(data.phoneNo))
{
typedata='phone';

}

        var a = {
            type:typedata, value: data.phoneNo

        }
        httpServices.post("ForgotPassword", a).then(function (response) {
            console.log(response);
           
               // $state.go('personalDetail');
  ionicToast.show(response.data, 'top', false, 2500);
            
        })
}


    $scope.openPopup = function () {
        myPopup = $ionicPopup.show({
            templateUrl: 'views/partial_country.html',
            title: 'select Country',
            scope: $scope,
            buttons: [{
                text: '<i class="icon ion-close-circled"></i>',
                type: 'popclose',
                onTap: function (e) {

                }
            }],
        });
    }

})