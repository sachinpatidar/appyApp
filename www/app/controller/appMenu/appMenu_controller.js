angular.module('appMenu.module.controller', []).controller('appMenu.controller', function ($scope,httpServices, $ionicLoading, $ionicHistory, $state) {
    //  $scope.images = ["img/classprofile.png"];
  
   

  
        //  $scope.images = ["img/classprofile.png"];
    var a = [];
    var b = [];
    httpServices.get("GetUserCategorySubCategory/" + localStorage.getItem('email') + "/" + localStorage.getItem('password') + "/1").then(function (response) {
        console.log(response);
        if (response.data.GetUserCatSubCatResult.length > 0) {

            b = response.data.GetUserCatSubCatResult;
            // $state.go('dashboard');
        }
    });
        httpServices.get("GetCategorySubCategory/" + 1).then(function (response) {
            console.log(response);
            if (response.data.GetCatSubCatResult.length > 0) {

                a = response.data.GetCatSubCatResult;
                // $state.go('dashboard');
            }
        $scope.val = [];
        var cat = a[0].category;
        var id = a[0].cateid;
        var catsub = [];
        var check = false;
        a.map((i, j) => {
            
            if (i.category == cat) {
            //    for (var i = 0; i < b.length;)
                b.map((k, l) => {
                  
                    if (k.scateid == i.scateid) {
                        check = true;
                    }
                })
               // setTimeout(function () {
                    catsub.push({ "scateid": i.scateid, "subcategory": i.subcategory, enableSub: check });
                //}, 40)
        
                check = false;
            }
            else {
                $scope.val.push({ category: cat, subcategory: catsub, categoryId: id, enableCat: false });
                id = i.cateid;
                cat = i.category;
                check = false;
                b.map((k, l) => {
                    if (k.scateid == i.scateid) {
                        check = true;
                    }
                })
                catsub = [];
                catsub.push({ "scateid": i.scateid, "subcategory": i.subcategory, enableSub: check })
            }

        });
        $scope.val.push({ category: cat, subcategory: catsub, categoryId: id, enableCat: false });
        $scope.selectAllSub = function (val, $index) {
            console.log(val, $index);
            $scope.val[$index].subcategory.map((i, j) => {
                i.enableSub = val;
            })
        }

        })
        $scope.submitMenuOptions = function () {
            var stringg = '';
            $scope.val.map((i, j) => {
              
                i.subcategory.map((k, l) => {
                    //console.log(k);
                    if (k.enableSub)
                    {
                        console.log(k);
                        stringg += k.scateid + ',';
                        console.log(stringg);
                    }
                    
                })
            })

          var a=  {
              "eauid": localStorage.getItem('eauid'),
                "idwid":0,
                "scateid": stringg.substring(0, stringg.length - 1)
          }
          console.log(a);
          httpServices.post("CategorywiseID", a).then(function (response) {
                console.log(response);
                if (response.data == "success") {
                    $state.go('dashboard');
                }


            }, function (error) {
                ionicToast.show('Login failed', 'top', false, 2500);

            })
        }
})