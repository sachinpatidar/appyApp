angular.module('login.module.controller', []).controller('login.controller', function ($scope,$cordovaOauth, $state, httpServices, $rootScope, $ionicHistory,ionicToast,$q) {

   // alert(JSON.stringify( localStorage.getItem("GCMID")));

    $scope.authenticateUser = function (data) {
        httpServices.get("GetUser/" + data.email + "/" + data.password).then(function (response) {
           
            if (response.data.GetUserResult.length > 0) {
                localStorage.setItem('email', response.data.GetUserResult[0].email);
                localStorage.setItem('eauid',response.data.GetUserResult[0].eauid );
                localStorage.setItem('password', data.password);
                localStorage.setItem('languageSelectedText', data.Language);
                httpServices.getLanguagesID();
           //     alert("UDI" + response.data.GetUserResult[0].eauid + "  " +localStorage.getItem("GCMID"));
                if (localStorage.getItem("GCMID") != null) {
                    updateGCMID(response.data.GetUserResult[0].eauid);
                }
                $state.go('dashboard');
              //  httpServices.post('UpdateGCMId', {
              //      "eauid": response.data.GetUserResult[0].eauid,
              //      "gcmid": localStorage.getItem('GCMID')
              //  }).then(function (res) {
              //      alert(JSON.stringify(res));
              //      $state.go('dashboard');

              //  }, function (er) { })
              ////  localStorage.setItem('languageSelected', 1);
               
            }
            else {
                ionicToast.show('please enter valid email and password', 'top', false, 2500);
            }
        }
            , function (error) {
            ionicToast.show('Login failed', 'top', false, 2500);

            }
            )

        
    }
    function updateGCMID(Id) {

        httpServices.post("UpdateGCMId", {
            "eauid": Id,
            "gcmid": localStorage.getItem("GCMID")
        }).then(function (su) { console.log(su) }, function (er) { console.log(er) })
    }
    $scope.loginFacebook = function () {
       
        $cordovaOauth.facebook('137744153404879', ["email",  "user_website", "user_location", "user_relationships"]).then(function (result) {
            
            httpServices.facebookService(result.access_token).then(function (res) {
               
                thirdParyLogin(res.data.name, res.data.email)
            }, function (er) {
                alert(JSON.stringify(er));
            });
        }, function (error) {
            alert(JSON.stringify(error));
           
        });
    }
   
    $scope.loginTwitter= function () {
        alert('called');
      
        $cordovaOauth.twitter("ToeIguHX2euUTLoPVvTqmpAXb", "ONaap2o25ZnoE90JTcETcu8Xky0UtYgZE6DjRuUUrKYKdpj2yZ").then(function (result) {
            alert('success');
            alert(JSON.stringify(result));
        }, function (error) {
            alert('fail')
            alert(JSON.stringify(error));
            console.log(JSON.stringify(error));
        });
          
    }
    $scope.googleplusLogin = function () {

        window.plugins.googleplus.login(
        {
            'webClientId':'770132169628-hs92g4mqtc2tg8uroroliganaeflf6a3.apps.googleusercontent.com'
        },
        function (obj) {
            thirdParyLogin(obj.displayName, obj.email)
           
        },
        function (msg) {
            alert(JSON.stringify(msg));
        }
    );
    }
    function login(email) {
        
        httpServices.get("GetUser/" + email + "/" + '123456789').then(function (response) {
            

            if (response.data.GetUserResult.length > 0) {
               
                try {
                    
                    localStorage.setItem('email', response.data.GetUserResult[0].email);
                  
                    localStorage.setItem('eauid', response.data.GetUserResult[0].eauid);
                   
                    localStorage.setItem('password','123456789');
                   
                    $state.go('dashboard');

                } catch (e) {
                    alert(JSON.stringify(e));

                }
                    //  localStorage.setItem('languageSelected', 1);
                   

                }
                else {
                    alert('fail');
                    ionicToast.show('please enter valid email and password', 'top', false, 2500);
                }
            }
, function (error) {
    alert(JSON.stringify(error));
    ionicToast.show('Login failed', 'top', false, 2500);

}
)
        }
       
        
    
    function thirdParyLogin(name,email)
    {

        var a = {
            name: name, email: email, registeremail: email, mobile: email, remarks: "R",
            type: "R", promocode: "4655", country: "ind", city: "ind", Language: localStorage.getItem('languageSelected'), DType: "A", user: email, pwd: '123456789',
            Messages: "5", CountryCode: '+972',
            GCMId: localStorage.getItem("GCMID")
        }
     
        httpServices.post("RegisterAppy", a).then(function (response) {
            console.log(response);
            alert(JSON.stringify(response));
            if (response.data == "success") {
                q.resolve(response.data);
            }
            else {
                if (response.data == 'Email Exists') {
                    login(email)
                   
                }
                else {
                    if (response.data == 'Mobile Exists') {
                        login(email)
                    }
                    else {
                        ionicToast.show('Login failed', 'top', false, 2500);
                    }
                }
                
               
            }

        }, function (error) {
           
            ionicToast.show('Login failed', 'top', false, 2500);

        })
       
    }


    
})