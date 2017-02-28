angular.module('http.service.module', []).service('httpServices', ['$q', '$http', '$ionicLoading', '$rootScope', '$state','$translate', function ($q, $http, $ionicLoading, $rootScope, $state, $translate) {

   
   var url = 'http://websvc.waytoappy.com/customerAP.svc/';
    // var url = 'http://localhost:55448/customerAP.svc/';

  this.get=function(urlres){
      var q = $q.defer();
      $ionicLoading.show();
      $http.get(url+urlres).then(function (result) {
         
          q.resolve(result);
          $ionicLoading.hide();
      }, function (error) {
          q.reject(error);
          $ionicLoading.hide();
      })
      return q.promise;
  }
  this.post = function (urlres, data) {
   
      var q = $q.defer();
      $ionicLoading.show();
      $http.post(url+urlres, data).then(function (result) {
          $ionicLoading.hide();
         // alert(JSON.stringify(result));
          q.resolve(result);
      }, function (error) {
          q.reject(error);
      //    alert(JSON.stringify(error));
          $ionicLoading.hide();
      });
      return q.promise;
  }
this.facebookService = function (data) {
   
      var q = $q.defer();
      $ionicLoading.show();
      $http.get("https://graph.facebook.com/me?fields=id,name,gender,location,timezone,relationship_status,email&access_token=" + data).then(function (result) {
          $ionicLoading.hide();
          q.resolve(result);
      }, function (error) {
          q.reject(error);
          alert(JSON.stringify(error + " URL ------> " + url + urlres));
          $ionicLoading.hide();
      });
      return q.promise;
}
this.getLanguages = function () {
    var languageText = '';
    var langlist = [
    { "LId": "1", "Language": "English" },
    { "LId": "2", "Language": "français" },
    { "LId": "3", "Language": "русский" },
    { "LId": "4", "Language": "中文" },
    { "LId": "5", "Language": "عربى" },
    { "LId": "6", "Language": "עברית" }, ]


    $(langlist).each(function (i, v) {
        if (parseInt(v.LId) == parseInt(localStorage.getItem('languageSelected'))) {
            localStorage.setItem('languageSelectedText', v.Language);
            languageText = localStorage.getItem('languageSelectedText');
            return;
        }
    });
    return languageText;
}

this.getLanguagesID = function () {
    var languageID = '';
    var langlist = [
    { "LId": "1", "Language": "English" },
    { "LId": "2", "Language": "français" },
    { "LId": "3", "Language": "русский" },
    { "LId": "4", "Language": "中文" },
    { "LId": "5", "Language": "عربى" },
    { "LId": "6", "Language": "עברית" }, ]


    $(langlist).each(function (i, v) {
        if (v.Language == localStorage.getItem('languageSelectedText')) {
            localStorage.setItem('languageSelected', v.LId);
            languageID = localStorage.getItem('languageSelected');
            if (languageID != undefined) {
                //   alert(lang + " Type of :: " + typeof (lang));
                var trans = '';
                switch (languageID) {
                    case "1":
                        {
                            trans = 'en';
                            break;
                        };
                    case "2":
                        {
                            trans = 'fr';
                            break;
                        };
                    case "3":
                        {
                            trans = 'ru';
                            break;
                        }
                    case "4":
                        {
                            trans = 'zh';
                            break;
                        }
                    case "5":
                        {
                            trans = 'ar';
                            break;
                        }
                    case "6":
                        {
                            trans = 'he';
                            break;
                        }
                }
                $translate.use(trans);
            }
            return;
        }
    });
    return languageID;
}


  this.getCountry = function () {

      var country = [{ "countryName": "Afghanistan", "countryCode": "+93" },
          { "countryName": "Albania", "countryCode": "+355" },
          { "countryName": "Algeria", "countryCode": "+213" },
          
          { "countryName": "Andorra", "countryCode": "+376" },
          { "countryName": "Angola", "countryCode": "+244" },
          
          { "countryName": "Antarctica", "countryCode": "+672" },
          
          { "countryName": "Argentina", "countryCode": "+54" },
          { "countryName": "Armenia", "countryCode": "+374" },
          { "countryName": "Aruba", "countryCode": "+297" },
          { "countryName": "Australia", "countryCode": "+61" },
          { "countryName": "Austria", "countryCode": "+43" },
          { "countryName": "Azerbaijan", "countryCode": "+994" },
          
          { "countryName": "Bahrain", "countryCode": "+973" },
          { "countryName": "Bangladesh", "countryCode": "+880" },
          
          { "countryName": "Belarus", "countryCode": "+375" },
          { "countryName": "Belgium", "countryCode": "+32" },
          { "countryName": "Belize", "countryCode": "+501" },
          { "countryName": "Benin", "countryCode": "+229" },
          
          { "countryName": "Bhutan", "countryCode": "+975" },
          { "countryName": "Bolivia", "countryCode": "+591" },
          { "countryName": "Bosnia and Herzegovina", "countryCode": "+387" },
          { "countryName": "Botswana", "countryCode": "+267" },
          { "countryName": "Brazil", "countryCode": "+55" },
          { "countryName": "British Indian Ocean Territory", "countryCode": "+246" },
          
          { "countryName": "Brunei", "countryCode": "+673" },
          { "countryName": "Bulgaria", "countryCode": "+359" },
          { "countryName": "Burkina Faso", "countryCode": "+226" },
          { "countryName": "Burma (Myanmar)", "countryCode": "+95" },
          { "countryName": "Burundi", "countryCode": "+257" },
          { "countryName": "Cambodia", "countryCode": "+855" },
          { "countryName": "Cameroon", "countryCode": "+237" },
          { "countryName": "Canada", "countryCode": "+1" },
          { "countryName": "Cape Verde", "countryCode": "+238" },
          
          { "countryName": "Central African Republic", "countryCode": "+236" },
          { "countryName": "Chad", "countryCode": "+235" },
          { "countryName": "Chile", "countryCode": "+56" },
          { "countryName": "China", "countryCode": "+86" },
          { "countryName": "Christmas Island", "countryCode": "+61" },
          { "countryName": "Cocos (Keeling) Islands", "countryCode": "+891" },
          { "countryName": "Colombia", "countryCode": "+57" },
          { "countryName": "Comoros", "countryCode": "+269" },
          { "countryName": "Cook Islands", "countryCode": "+682" },
          { "countryName": "Costa Rica", "countryCode": "+506" },
          { "countryName": "Croatia", "countryCode": "+385" },
          { "countryName": "Cuba", "countryCode": "+53" },
          { "countryName": "Cyprus", "countryCode": "+357" },
          { "countryName": "Czech Republic", "countryCode": "+420" },
          { "countryName": "Democratic Republic of the Congo", "countryCode": "+243" },
          { "countryName": "Denmark", "countryCode": "+45" },
          { "countryName": "Djibouti", "countryCode": "+253" },
          
          
          { "countryName": "Ecuador", "countryCode": "+593" },
          { "countryName": "Egypt", "countryCode": "+20" },
          { "countryName": "El Salvador", "countryCode": "+503" },
          { "countryName": "Equatorial Guinea", "countryCode": "+240" },
          { "countryName": "Eritrea", "countryCode": "+291" },
          { "countryName": "Estonia", "countryCode": "+372" },
          { "countryName": "Ethiopia", "countryCode": "+251" },
          { "countryName": "Falkland Islands", "countryCode": "+500" },
          { "countryName": "Faroe Islands", "countryCode": "+298" }, { "countryName": "Fiji", "countryCode": "+679" },
          { "countryName": "Finland", "countryCode": "+358" }, { "countryName": "France", "countryCode": "+33" },
          { "countryName": "French Polynesia", "countryCode": "+689" }, { "countryName": "Gabon", "countryCode": "+241" },
          { "countryName": "Gambia", "countryCode": "+220" }, { "countryName": "Gaza Strip", "countryCode": "+970" },
          { "countryName": "Georgia", "countryCode": "+995" }, { "countryName": "Germany", "countryCode": "+49" },
          { "countryName": "Ghana", "countryCode": "+233" }, { "countryName": "Gibraltar", "countryCode": "+350" },
          { "countryName": "Greece", "countryCode": "+30" }, { "countryName": "Greenland", "countryCode": "+299" },
          
          { "countryName": "Guatemala", "countryCode": "+502" }, { "countryName": "Guinea", "countryCode": "+224" },
          { "countryName": "Guinea-Bissau", "countryCode": "+245" }, { "countryName": "Guyana", "countryCode": "+592" },
          { "countryName": "Haiti", "countryCode": "+509" }, { "countryName": "Holy See (Vatican City)", "countryCode": "+379" },
          { "countryName": "Honduras", "countryCode": "+504" }, { "countryName": "Hong Kong", "countryCode": "+852" },
          { "countryName": "Hungary", "countryCode": "+36" }, { "countryName": "Iceland", "countryCode": "+354" },
          { "countryName": "India", "countryCode": "+91" }, { "countryName": "Indonesia", "countryCode": "+62" },
          { "countryName": "Iran", "countryCode": "+98" }, { "countryName": "Iraq", "countryCode": "+964" },
          { "countryName": "Ireland", "countryCode": "+353" }, { "countryName": "Isle of Man", "countryCode": "+44" },
          { "countryName": "Israel", "countryCode": "+972" }, { "countryName": "Italy", "countryCode": "+39" },
          { "countryName": "Ivory Coast", "countryCode": "+225" }, 
          { "countryName": "Japan", "countryCode": "+81" }, { "countryName": "Jersey", "countryCode": "+44" },
          { "countryName": "Jordan", "countryCode": "+962" }, { "countryName": "Kazakhstan", "countryCode": "+7" },
          { "countryName": "Kenya", "countryCode": "+254" }, { "countryName": "Kiribati", "countryCode": "+686" },
          { "countryName": "Kosovo", "countryCode": "+381" }, { "countryName": "Kuwait", "countryCode": "+965" },
          { "countryName": "Kyrgyzstan", "countryCode": "+996" }, { "countryName": "Laos", "countryCode": "+856" },
          { "countryName": "Latvia", "countryCode": "+371" }, { "countryName": "Lebanon", "countryCode": "+961" },
          { "countryName": "Lesotho", "countryCode": "+266" }, { "countryName": "Liberia", "countryCode": "+231" },
          { "countryName": "Libya", "countryCode": "+218" }, { "countryName": "Liechtenstein", "countryCode": "+423" },
          { "countryName": "Lithuania", "countryCode": "+370" }, { "countryName": "Luxembourg", "countryCode": "+352" },
          { "countryName": "Macau", "countryCode": "+853" }, { "countryName": "Macedonia", "countryCode": "+389" },
          { "countryName": "Madagascar", "countryCode": "+261" }, { "countryName": "Malawi", "countryCode": "+265" },
          { "countryName": "Malaysia", "countryCode": "+60" }, { "countryName": "Maldives", "countryCode": "+960" },
          { "countryName": "Mali", "countryCode": "+223" }, { "countryName": "Malta", "countryCode": "+356" },
          { "countryName": "Marshall Islands", "countryCode": "+692" }, { "countryName": "Mauritania", "countryCode": "+222" },
          { "countryName": "Mauritius", "countryCode": "+230" }, { "countryName": "Mayotte", "countryCode": "+262" },
          { "countryName": "Mexico", "countryCode": "+52" }, { "countryName": "Micronesia", "countryCode": "+691" },
          { "countryName": "Moldova", "countryCode": "+373" }, { "countryName": "Monaco", "countryCode": "+377" },
          { "countryName": "Mongolia", "countryCode": "+976" }, { "countryName": "Montenegro", "countryCode": "+382" },
           { "countryName": "Morocco", "countryCode": "+212" },
          { "countryName": "Mozambique", "countryCode": "+258" }, { "countryName": "Namibia", "countryCode": "+264" },
          { "countryName": "Nauru", "countryCode": "+674" }, { "countryName": "Nepal", "countryCode": "+977" },
          { "countryName": "Netherlands", "countryCode": "+31" }, { "countryName": "Netherlands Antilles", "countryCode": "+599" },
          { "countryName": "New Caledonia", "countryCode": "+687" }, { "countryName": "New Zealand", "countryCode": "+64" },
          { "countryName": "Nicaragua", "countryCode": "+505" }, { "countryName": "Niger", "countryCode": "+227" },
          { "countryName": "Nigeria", "countryCode": "+234" }, { "countryName": "Niue", "countryCode": "+683" },
          { "countryName": "Norfolk Island", "countryCode": "+672" }, { "countryName": "North Korea", "countryCode": "+850" },
          { "countryName": "Norway", "countryCode": "+47" },
          { "countryName": "Oman", "countryCode": "+968" }, { "countryName": "Pakistan", "countryCode": "+92" }, { "countryName": "Palau", "countryCode": "+680" }, { "countryName": "Panama", "countryCode": "+507" }, { "countryName": "Papua New Guinea", "countryCode": "+675" }, { "countryName": "Paraguay", "countryCode": "+595" }, { "countryName": "Peru", "countryCode": "+51" }, { "countryName": "Philippines", "countryCode": "+63" }, { "countryName": "Pitcairn Islands", "countryCode": "+870" }, { "countryName": "Poland", "countryCode": "+48" }, { "countryName": "Portugal", "countryCode": "+351" }, { "countryName": "Puerto Rico", "countryCode": "+1" }, { "countryName": "Qatar", "countryCode": "+974" }, { "countryName": "Republic of the Congo", "countryCode": "+242" }, { "countryName": "Romania", "countryCode": "+40" },
          { "countryName": "Russia", "countryCode": "+7" }, { "countryName": "Rwanda", "countryCode": "+250" }, { "countryName": "Saint Barthelemy", "countryCode": "+590" }, { "countryName": "Saint Helena", "countryCode": "+290" }, 
          { "countryName": "Saint Pierre and Miquelon", "countryCode": "+508" },  { "countryName": "Samoa", "countryCode": "+685" }, { "countryName": "San Marino", "countryCode": "+378" }, { "countryName": "Sao Tome and Principe", "countryCode": "+239" }, { "countryName": "Saudi Arabia", "countryCode": "+966" }, { "countryName": "Senegal", "countryCode": "+221" }, { "countryName": "Serbia", "countryCode": "+381" }, { "countryName": "Seychelles", "countryCode": "+248" }, { "countryName": "Sierra Leone", "countryCode": "+232" }, { "countryName": "Singapore", "countryCode": "+65" }, { "countryName": "Slovakia", "countryCode": "+421" }, { "countryName": "Slovenia", "countryCode": "+386" }, { "countryName": "Solomon Islands", "countryCode": "+677" }, { "countryName": "Somalia", "countryCode": "+252" }, { "countryName": "South Africa", "countryCode": "+27" }, { "countryName": "South Korea", "countryCode": "+82" }, { "countryName": "Spain", "countryCode": "+34" }, { "countryName": "Sri Lanka", "countryCode": "+94" },
          { "countryName": "Sudan", "countryCode": "+249" }, { "countryName": "Suriname", "countryCode": "+597" },
          { "countryName": "Swaziland", "countryCode": "+268" }, { "countryName": "Sweden", "countryCode": "+46" }, { "countryName": "Switzerland", "countryCode": "+41" }, { "countryName": "Syria", "countryCode": "+963" }, { "countryName": "Taiwan", "countryCode": "+886" }, { "countryName": "Tajikistan", "countryCode": "+992" }, { "countryName": "Tanzania", "countryCode": "+255" }, { "countryName": "Thailand", "countryCode": "+66" }, { "countryName": "Timor-Leste", "countryCode": "+670" }, { "countryName": "Togo", "countryCode": "+228" }, { "countryName": "Tokelau", "countryCode": "+690" }, { "countryName": "Tonga", "countryCode": "+676" }, { "countryName": "Tunisia", "countryCode": "+216" }, { "countryName": "Turkey", "countryCode": "+90" }, { "countryName": "Turkmenistan", "countryCode": "+993" }, { "countryName": "Turks and Caicos Islands", "countryCode": "+1 649" }, { "countryName": "Tuvalu", "countryCode": "+688" }, { "countryName": "Uganda", "countryCode": "+256" }, { "countryName": "Ukraine", "countryCode": "+380" },
          { "countryName": "United Arab Emirates", "countryCode": "+971" }, { "countryName": "United Kingdom", "countryCode": "+44" }, { "countryName": "United States", "countryCode": "+1" }, { "countryName": "Uruguay", "countryCode": "+598" },  { "countryName": "Uzbekistan", "countryCode": "+998" }, { "countryName": "Vanuatu", "countryCode": "+678" }, { "countryName": "Venezuela", "countryCode": "+58" }, { "countryName": "Vietnam", "countryCode": "+84" }, { "countryName": "Wallis and Futuna", "countryCode": "+681" }, { "countryName": "West Bank", "countryCode": "+970" }, { "countryName": "Yemen", "countryCode": "+967" }, { "countryName": "Zambia", "countryCode": "+260" }, { "countryName": "Zimbabwe", "countryCode": "+263" }];


      return country;
  }
     

}]);