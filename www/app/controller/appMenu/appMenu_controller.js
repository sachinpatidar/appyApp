angular.module('appMenu.module.controller', []).controller('appMenu.controller', function ($scope, httpServices, $ionicPopup, $ionicLoading, $ionicHistory, $state, ionicToast, $rootScope) {
    //  $scope.images = ["img/classprofile.png"];

    if (localStorage.getItem('eauid') == null)
    {
        $state.go('login');
    }

    var Alepop = '';
    //  $scope.images = ["img/classprofile.png"];
    var a = [];
    var b = [];
    httpServices.get("GetUserCategorySubCategory/" + localStorage.getItem('email') + "/" + localStorage.getItem('password') + "/" + localStorage.getItem('languageSelected')).then(function (response1) {
        //  console.log(response);
      //  if (response1.data.GetUserCatSubCatResult.length > 0) {
            b = response1.data.GetUserCatSubCatResult;
            httpServices.get("GetCategorySubCategory/" + localStorage.getItem('languageSelected')).then(function (response) {
                // console.log(response);
                console.log(response);
                if (response.data.GetCatSubCatResult.length > 0) {
                    a = response.data.GetCatSubCatResult;
                    $scope.val = [];
                    var cat = a[0].category;
                    var id = a[0].cateid;
                    var catsub = [];
                    var check = false;
                    var enableCat = false;
                    var countTrue = 0;
                    var cnt = 0;
                    a.map((i, j) => {
                        console.log(i.category + " " + cat);
                        if (i.category === cat) {
                            //    for (var i = 0; i < b.length;)
                            b.map((k, l) => {

                                if (k.scateid === i.scateid) {
                                    check = true;
                                    countTrue++;
                                }
                            })
                            cnt++;
                            // setTimeout(function () {
                            catsub.push({ "scateid": i.scateid, "subcategory": i.subcategory, enableSub: check });
                            //}, 40)

                            check = false;
                        }
                        else {
                            if (cnt == countTrue) {
                                $scope.val.push({ category: cat, subcategory: catsub, categoryId: id, enableCat: true });
                            }
                            else { $scope.val.push({ category: cat, subcategory: catsub, categoryId: id, enableCat: false }); }
                            id = i.cateid;
                            cat = i.category;
                            check = false;
                            cnt = 0;
                            countTrue = 0;
                            b.map((k, l) => {
                                if (k.scateid === i.scateid) {
                                    check = true;
                                    countTrue++;
                                }
                            })
                            cnt++;
                            catsub = [];
                            catsub.push({ "scateid": i.scateid, "subcategory": i.subcategory, enableSub: check })
                        }

                    });
                    if (cnt == countTrue) {
                        $scope.val.push({ category: cat, subcategory: catsub, categoryId: id, enableCat: true });
                    } else { $scope.val.push({ category: cat, subcategory: catsub, categoryId: id, enableCat: false }); }

                    $scope.selectAllSub = function (val, $index) {
                        console.log(val, $index);
                        $scope.val[$index].subcategory.map((i, j) => {
                            i.enableSub = val;
                        })
                    }

                    console.log($scope.val);
                } else {
                    ionicToast.show(response.data, 'top', false, 2500);
                }
            }, function (error) {
                if (error.status == "-1") {
                    ionicToast.show('something went wrong', 'top', false, 2500);
                }


            });


            // $state.go('dashboard');
    //    }
    });

    $scope.Alrtcls = function () { Alepop.close(); }
    $scope.showAlert = function () {
        callAlert();
        $scope.txtAlert = "Thank for your interaction";
    }



    function callAlert() {
        Alepop = $ionicPopup.alert({
            templateUrl: 'views/partial_Alert.html',
            scope: $scope,
            buttons: [
{
    text: 'X',
    type: 'button-positive',
}]
        });

      //  $('.popup-buttons').hide();
        $('.popup-head').hide();
        $('.popup').addClass('InfoAlert');
    }

    $scope.submitMenuOptions = function () {
        var stringg = '';
        $scope.val.map((i, j) => {
             
            i.subcategory.map((k, l) => {
                //console.log(k);
                if (k.enableSub) {
                    console.log(k);
                    stringg += k.scateid + ',';
                    console.log(stringg);
                }
            })
        })

        var a = {
            "eauid": localStorage.getItem('eauid'),
            "idwid": 0,
            "scateid": stringg.substring(0, stringg.length - 1)
        }
        console.log(a);
        httpServices.post("CategorywiseID", a).then(function (response) {
            console.log(response);
            if (response.data == "success") {
                //   $state.go('dashboard');
                $scope.txtAlert = "Thank you. Your order is on the way";
                callAlert();
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
})