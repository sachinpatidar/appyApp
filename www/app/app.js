// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMessages', 'dashboard.module', 'login.module','notificationScreen.module', 'ngCordovaOauth', 'pascalprecht.translate', 'http.service.module', 'register.module', 'loginRegister.module', 'ionMdInput', 'forgetPassword.module', 'appMenu.module', 'personalDetail.module', 'translator.module', 'OwnAppyMessage.module'
, 'AboutUs.module', 'HowtouseAppy.module', 'MakeSomeoneAppy.module', 'ionic-toast', 'toolTechniques.module', 'ContactUs.module', 'AddOwnAppyMessage.module', 'verifyUserOtp.module'])

.run(function ($ionicPlatform, $state, $translate, $rootScope) {
    $ionicPlatform.ready(function () {
        if (localStorage.getItem('value') == 'showAgreement') {
            
        var trans = '';
        switch (parseInt(localStorage.getItem('languageSelected'))) {

            case 1:
                {
                    trans = 'en';
                    break;
                };
            case 2:
                {
                    trans = 'fr';
                    break;
                };
            case 3:
                {
                    trans = 'ru';
                    break;
                }
            case 4:
                {
                    trans = 'zh';
                    break;
                }
            case 5:
                {
                    trans = 'ar';
                    break;
                }
            case 6:
                {
                    trans = 'he';
                    break;
                }
        }

        console.log(trans);
        $translate.use(trans);

    }

       
           
           

       

        var push = PushNotification.init({
            android: {
                senderID: "370585387255"
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function (data) {
            // data.registrationId
          //  alert(JSON.stringify(data));
           
            localStorage.setItem("GCMID", data.registrationId);
        });
        var ar = [];
        var i = 0;
        push.on('notification', function (data) {
         //   alert(JSON.stringify(data));

            var now = new Date().getTime();

           
           
             
            cordova.plugins.notification.local.schedule({
                id: i,
                text: data.additionalData.message1,
                at: new Date(now + i * 300000),

            });
                    //cordova.plugins.notification.local.clearAll(function () {
                    //    alert("done");
                       

                //    }, this);
                  
                    i++;
               

            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });
        setInterval(function () {
          
              
                i = 0;
              
          
        }, 300000)
        push.on('error', function (e) {
            // e.message
        });



    cordova.plugins.notification.local.on("schedule", function (notification) {
        //   alert('scheduled events');
          // alert(JSON.stringify(notification));
        });
        cordova.plugins.notification.local.on("click", function (notification) {
          
        });
        cordova.plugins.notification.local.on("trigger", function (notification) {
            $rootScope.txtAlert = notification.text;
          
            $state.go('notificationScreen')



        });

        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).config(function ($urlRouterProvider, $ionicConfigProvider, $translateProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    $ionicConfigProvider.navBar.alignTitle('center');
    $urlRouterProvider.otherwise('translator');
    if (!ionic.Platform.isIOS()) {
        $ionicConfigProvider.scrolling.jsScrolling(true);
    }

    //   $translateProvider.translations('en', {
    //       TITLE: 'Welcome!',
    //       MESSAGE: 'This app supports your lanaguage!'
    //   })
    //.translations('sv', {
    //    TITLE: 'Välkommen!',
    //    MESSAGE: 'Denna app stöder ditt språk!'
    //});

    //.translations('en', {
    //    app_name:'Way to Appy', slogen:'Dream your life, Live your dreams', facebook_app_id:'1247779388575027', navigation_drawer_open:'Open navigation drawer', navigation_drawer_close:'Close navigation drawer', action_settings:'Settings', title_activity_edit_profile:'EditProfileActivity', ShartAppHtml:'Appy Text', eula_title:'Agreement', eula_accept:'Accept', eula_refuse:'Decline', txt_Chooselang:'Choose Language', txt_Selectlang:'Select Preferred Language', sMaxTotalSizeOfFilesDlgMsg:'Enter number of messages you want to receive per day', sMaxTotalSizeOfFiles:'Massage Limit', txt_select_lang:'Select Language', txt_or:'OR', txt_continue:'Continue', txt_login:'Login', txt_register:'Register', txt_email:'Email Address', txt_pass:'Password', txt_remember:'Remember Me', txt_sign_in:'SIGN IN', txt_sign_up:'SIGN UP', txt_forgot_pass:'FORGOT PASSWORD?', txt_enter_email:'Enter email.', txt_enter_pass:'Enter password.',txt_name:'Name', txt_phone:'Phone Number', txt_confirm_pass:'Confirm Password', txt_terms:'Terms and Condition', txt_read_terms:'Read Terms', txt_enter_name:'Enter name.', txt_enter_valid_email:'Enter valid email.', txt_enter_phone:'Enter phone number.', txt_enter_pass_not_matched:'Password and confirm password not matched.', txt_registration_failed:'Error! Registration failed. Please try again.', txt_already_registered:'Error! Your are already registered. Please try forget password.', menu_appy:'Appy Menu', category_screen_msg:'What would you like?', category_done_msg:'GO GET IT', error_network:'Error! Please check your network and try again.',menu_profile:'My Profile', txt_personal_info:'Personal Info', txt_current_pass:'Current Password', txt_new_pass:'New Password', txt_appy_msg_per_day:'Max appy messages per day', txt_language:'Language', txt_update:'Update', enter_current_password:'Enter current password.', enter_new_password:'Enter new password.', msg_update_profile_success:'Profile updated successfully.', msg_update_profile_fail:'Error! Update profile failed.', menu_appy_messages:'My own Appy messages', title_add_msg:'Add Message', txt_msg_subject:'Message Subject', txt_msg_detail:'Message Detail', txt_submit:'Submit', enter_msg_subject:'Enter subject', enter_msg_detail:'Enter Detail', msg_add_msg_success:'Message added successfully.', msg_msg_enabled:'Message enabled', msg_msg_disabled:'Message disabled', menu_make_someone_appy:'Make someone Appy', txt_choose_contact:'Choose a contact', txt_send_msg:'Send Message', msg_msg_send_success:'Message send successfully.', menu_how_to_use_appy:'Using Appy', menu_more_tools_and_techniques:'More tools and techniques', menu_about_us:'About Us', menu_contact_us:'Contact Us', txt_subject:'Subject', enter_subject:'Enter subject', enter_message:'Enter your message'⁠⁠⁠⁠
    //})
    $translateProvider.translations('en', {
        txt_someOne_selectMsg: 'Select Message', txt_update_maxMesg: 'Max messages', adheadms_name: 'Add Message', appymnu_submit: 'Go Get IT', app_name: 'Way to Appy', slogen: 'Dream your life, Live your dreams', facebook_app_id: '1247779388575027', navigation_drawer_open: 'Open navigation drawer', navigation_drawer_close: 'Close navigation drawer', action_settings: 'Settings', title_activity_edit_profile: 'EditProfileActivity', ShartAppHtml: 'Appy Text', eula_title: 'Agreement', eula_accept: 'Accept', eula_refuse: 'Decline', txt_Chooselang: 'Choose Language', txt_Selectlang: 'Select Preferred Language', sMaxTotalSizeOfFilesDlgMsg: 'Enter number of messages you want to receive per day', sMaxTotalSizeOfFiles: 'Massage Limit', txt_select_lang: 'Select Language', txt_or: 'OR', txt_continue: 'Continue', txt_login: 'Login', txt_register: 'Register', txt_email: 'Email Address', txt_pass: 'Password', txt_remember: 'Remember Me', txt_sign_in: 'SIGN IN', txt_sign_up: 'SIGN UP', txt_forgot_pass: 'FORGOT PASSWORD?', txt_enter_email: 'Enter email.', txt_enter_pass: 'Enter password.', txt_name: 'Name', txt_phone: 'Phone Number', txt_confirm_pass: 'Confirm Password', txt_terms: 'Terms and Condition', txt_read_terms: 'Read Terms', txt_enter_name: 'Enter name.', txt_enter_valid_email: 'Enter valid email.', txt_enter_phone: 'Enter phone number.', txt_enter_pass_not_matched: 'Password and confirm password not matched.', txt_registration_failed: 'Error! Registration failed. Please try again.', txt_already_registered: 'Error! Your are already registered. Please try forget password.', category_screen_msg: 'What would you like to order?', category_done_msg: 'GO GET IT', error_network: 'Error! Please check your network and try again.', menu_profile: 'My Profile', txt_personal_info: 'Personal Info', txt_current_pass: 'Current Password', txt_new_pass: 'New Password', txt_appy_msg_per_day: 'Max appy messages per day', txt_language: 'Language', txt_update: 'Update', enter_current_password: 'Enter current password.', enter_new_password: 'Enter new password.', msg_update_profile_success: 'Profile updated successfully.', msg_update_profile_fail: 'Error! Update profile failed.', menu_appy_messages: 'My own Appy messages', title_add_msg: 'Add Message', txt_msg_subject: 'Message Subject', txt_msg_detail: 'Message Detail', txt_submit: 'Submit', enter_msg_subject: 'Enter subject', enter_msg_detail: 'Enter Detail', msg_add_msg_success: 'Message added successfully.', msg_msg_enabled: 'Message enabled', msg_msg_disabled: 'Message disabled', menu_make_someone_appy: 'Make someone Appy', txt_choose_contact: 'Choose a contact', txt_send_msg: 'Send Message', msg_msg_send_success: 'Message send successfully.', menu_how_to_use_appy: 'Using Appy', menu_more_tools_and_techniques: 'More tools and techniques', menu_about_us: 'About Us', menu_contact_us: 'Contact Us', txt_subject: 'Subject', enter_subject: 'Enter subject', enter_message: 'Enter your message'
    })
 .translations('zh', {
     txt_someOne_selectMsg: '選擇消息', txt_update_maxMesg: '最大郵件數', adheadms_name: '添加消息', appymnu_submit: '去實現它（夢想）;去得到它（東西', app_name: '高兴得多', slogen: '梦想你的生活，活出你的梦想', navigation_drawer_open: 'Open navigation drawer', navigation_drawer_close: 'Close navigation drawer', action_settings: 'Settings', title_activity_edit_profile: 'EditProfileActivity', ShartAppHtml: 'Appy Text', eula_title: 'Agreement', eula_accept: 'Accept', eula_refuse: 'Decline', txt_Chooselang: '选择语言', txt_Selectlang: 'Select Preferred Language', sMaxTotalSizeOfFilesDlgMsg: 'Enter number of messages you want to receive per day', sMaxTotalSizeOfFiles: 'Massage Limit', txt_select_lang: '选择语言', txt_or: '或者', txt_continue: '继续', txt_login: '登录', txt_register: '注册', txt_email: '电子邮箱', txt_pass: '密码', txt_remember: '安全控件登录', txt_sign_in: '登录', txt_sign_up: '注册', txt_forgot_pass: '忘记密码？', txt_enter_email: '请输入电子邮箱', txt_enter_pass: '请输入密码', txt_name: '名字', txt_phone: '电话号码', txt_confirm_pass: '确认密码', txt_terms: '条款和条件', txt_read_terms: '读条款', txt_enter_name: '错误！请输入名字。', txt_enter_valid_email: '错误！请输入实在的电子邮箱。', txt_enter_phone: '错误！请输入电话号码。', txt_enter_pass_not_matched: '错误！密码和确认密码不匹配', txt_registration_failed: '错误！注册失败。请再试一次。', txt_already_registered: '错误！你已经注册。请尝试忘词密码.', category_screen_msg: '你要订什么？', category_done_msg: '收到这些', error_network: '错误！请检查您的网络，然后再试一次。', menu_profile: '我的资料', txt_personal_info: '个人信息', txt_current_pass: '当前密码', txt_new_pass: '新的密码', txt_appy_msg_per_day: '每天最大的快乐短信', txt_language: '语言', txt_update: '更新', enter_current_password: '错误！请输入实在的密码。', enter_new_password: '错误！请输入新的密码。', msg_update_profile_success: '资料更新成功。', msg_update_profile_fail: '错误！更新资料失败。', menu_appy_messages: '我自己的高兴短信', title_add_msg: '加短信', txt_msg_subject: '短信主题', txt_msg_detail: '短信详细', txt_submit: '发', enter_msg_subject: '错误！请输入主题', enter_msg_detail: '错误！请输入说明', msg_add_msg_success: '加短信成功', msg_msg_enabled: '短信启用', msg_msg_disabled: '短信禁用', menu_make_someone_appy: '让别人高兴', txt_choose_contact: '选择联系人', txt_send_msg: '发短信', msg_msg_send_success: '发短信成功。', menu_how_to_use_appy: '怎么用应用程序', menu_more_tools_and_techniques: '更多的工具和技术', menu_about_us: '关于应用程序', menu_contact_us: '联系我们', txt_subject: '主题', enter_subject: '错误！请输入主题', enter_message: '错误！请输入短信'
 }).translations('ar', {
     txt_someOne_selectMsg: 'اختر رسالة', txt_update_maxMesg: 'رسالة ماكس', adheadms_name: 'اضافة رسالة', appymnu_submit: 'إذهب واجلبه', app_name: 'طريقك إلى Appy', slogen: 'احلم بحياتك، عش أحلامك', navigation_drawer_open: 'Open navigation drawer', navigation_drawer_close: 'Close navigation drawer', action_settings: 'Settings', title_activity_edit_profile: 'EditProfileActivity', ShartAppHtml: 'Appy Text', eula_title: 'Agreement', eula_accept: 'Accept', eula_refuse: 'Decline', txt_Chooselang: 'Choose Language', txt_Selectlang: 'Select Preferred Language', sMaxTotalSizeOfFilesDlgMsg: 'Enter number of messages you want to receive per day', sMaxTotalSizeOfFiles: 'Massage Limit', txt_select_lang: 'اختيار اللّغة', txt_or: 'أو', txt_continue: 'واصل', txt_login: 'تسجيل الدّخول', txt_register: 'التّسجيل', txt_email: 'عنوان البريد الإلكترونيّ', txt_pass: 'كلمة المرور', txt_remember: 'تذكّرني', txt_sign_in: 'تسجيل الدّخول', txt_sign_up: 'تسجّل', txt_forgot_pass: 'نسيت كلمة المرور؟', txt_enter_email: 'يرجى إدخال البريد الإلكترونيّ', txt_enter_pass: 'المرجو إدخال كلمة المرور', txt_name: 'الإسم', txt_phone: 'رقم الهاتف', txt_confirm_pass: 'تأكيد كلمة المرور', txt_terms: 'الأحكام و الشّروط', txt_read_terms: 'اقرأ الشّروط', txt_enter_name: 'خطأ! يرجى إدخال الإسم', txt_enter_valid_email: '  خطأ! يرجى إدخال بريد إلكترونيّ صحيح', txt_enter_phone: 'خطأ! المرجو إدخال الهاتف.', txt_enter_pass_not_matched: 'خطأ! كلمة المرور و تأكيد كلمة المرور لا يتطابقان.', txt_registration_failed: 'خطأ! فشل التّسجيل. حاول مرّة أخرى.', txt_already_registered: 'خطأ! أنت مسجّل سابقا. المرجو حاول استعادة كلمة المرور.', category_screen_msg: 'ماذا تحبّ أن تطلب؟', category_done_msg: 'اذهب و خذها', error_network: 'خطأ! يرجى التّحقّق من الشّبكة الخاصّة بك و حاول مرّة أخرى.', menu_profile: 'ملفّي الشّخصيّ', txt_personal_info: 'معلومات شخصيّة', txt_current_pass: 'كلمة المرور الحاليّة', txt_new_pass: 'كلمة المرور الجديدة', txt_appy_msg_per_day: 'رسالات Appy القصويّة في اليوم', txt_language: 'اللّغة', txt_update: 'تحديث', enter_current_password: 'خطأ! المرجو إدخال كلمة المرور الحاليّة.', enter_new_password: 'خطأ! المرجو إدخال كلمة المرور الجديدة.', msg_update_profile_success: 'تمّ تحديث الملفّ الشّخصيّ بنجاح.', msg_update_profile_fail: 'خطأ! تحديث الملفّ الشّخصيّ فشل.', menu_appy_messages: 'رسالات Appy الخاصّة بي', title_add_msg: 'إضافة رسالة', txt_msg_subject: 'موضوع الرّسالة', txt_msg_detail: 'تفاصيل الرّسالة', txt_submit: 'تقديم', enter_msg_subject: 'خطأ! المرجو إدخال الموضوع', enter_msg_detail: 'خطأ! المرجو إدخال الوصف', msg_add_msg_success: 'رسالة مضافة بنجاح.', msg_msg_enabled: 'رسالة مفعّلة', msg_msg_disabled: 'رسالة غير مفعّلة', menu_make_someone_appy: 'جعل شخص ما Appy', txt_choose_contact: 'اختيار اتّصال', txt_send_msg: 'إرسال رسالة', msg_msg_send_success: 'رسالة أرسلت بنجاح', menu_how_to_use_appy: 'كيفيّة استعمال Appy', menu_more_tools_and_techniques: 'المزيد من الأدوات والتّقنيات', menu_about_us: 'حول Appy', menu_contact_us: 'اتّصل بنا', txt_subject: 'الموضوع', enter_subject: 'خطأ! المرجو إدخال الموضوع', enter_message: 'خطأ! المرجو إدخال رسالتك'
 }).translations('fr', {
     txt_someOne_selectMsg: 'Sélectionner un message', txt_update_maxMesg: 'Message max', adheadms_name: 'Ajouter un message', appymnu_submit: 'Va le chercher', app_name: 'Voie à Appy', slogen: 'Rêver votre vie, vivre vos rêves', navigation_drawer_open: 'Open navigation drawer', navigation_drawer_close: 'Close navigation drawer', action_settings: 'Settings', title_activity_edit_profile: 'EditProfileActivity', ShartAppHtml: 'Appy Text', eula_title: 'Agreement', eula_accept: 'Accept', eula_refuse: 'Decline', txt_Chooselang: 'Choose Language', txt_Selectlang: 'Select Preferred Language', sMaxTotalSizeOfFilesDlgMsg: 'Enter number of messages you want to receive per day', sMaxTotalSizeOfFiles: 'Massage Limit', txt_select_lang: 'Choisir la langue', txt_or: 'Ou', txt_continue: 'Continuer', txt_login: 'S\'identifier', txt_register: 'Enregistrer', txt_email: 'Adresse e-mail', txt_pass: 'Le mot de passe.', txt_remember: 'Se souveir de moi', txt_sign_in: 'Se connecter', txt_sign_up: 'S\'inscrire', txt_forgot_pass: 'Mot de passe oublié', txt_enter_email: 'S\'il vous plaît entrer l\'e-mail.', txt_enter_pass: 'S\'il vous plaît entrer le mot de passe.', txt_name: 'Le nom', txt_phone: 'Numéro de téléphone', txt_confirm_pass: 'Confirmer le mot de  passe', txt_terms: 'Termes et conditions', txt_read_terms: 'Lire les termes', txt_enter_name: 'Erreur! S\'il vous plaît entrer le nom.', txt_enter_valid_email: 'Erreur! S\'il vous plaît entrer un e-mail valide.', txt_enter_phone: 'Erreur! S\'il vous plaît entrer le portable.', txt_enter_pass_not_matched: 'Erreur! Le mot de passe et confirmer le mot de passe ne correspondent pas.', txt_registration_failed: 'Erreur! Echec de l\'enregistrement. Si\'il vous plaît réessayer.', txt_already_registered: 'Erreur! Vous êtes déjà inscrit. S\'il vous plaît essayer mot de passe oublié.', category_screen_msg: 'Qu\'est ce que vous aimez commander?', category_done_msg: 'Va le chercher', error_network: 'Erreur! S\'il vous plaît vérifier votre réseau et réessayer.', menu_profile: 'Mon profile', txt_personal_info: 'Informations personnelles', txt_current_pass: 'Mot de passe actuel', txt_new_pass: 'Nouveau mot de passe', txt_appy_msg_per_day: 'Maximum Appy messages par jour', txt_language: 'Langue', txt_update: 'Update', enter_current_password: 'Erreur! S\'il vous plaît entrer votre mot de passe actuel.', enter_new_password: 'Erreur! S\'il vous plaît enter votre nouveau mot de passe.', msg_update_profile_success: 'Mise à jour du profil réussie.', msg_update_profile_fail: 'Erreur! Mise à jour du profil a échoué', menu_appy_messages: 'Mes propres Appy messages', title_add_msg: 'Ajouter le message', txt_msg_subject: 'Le sujet du message', txt_msg_detail: 'Détail du message', txt_submit: 'Soumettre', enter_msg_subject: 'Erreur! S\'il vous plaît entrer le sujet', enter_msg_detail: 'Erreur! S\'il vous plaît entrer votre description', msg_add_msg_success: 'Message ajouté avec succès', msg_msg_enabled: 'Message validé', msg_msg_disabled: 'Message désactivé', menu_make_someone_appy: 'Rendre quelqu\'un Appy', txt_choose_contact: 'Choisir un contact', txt_send_msg: 'Envoyer un message', msg_msg_send_success: 'Message envoyé avec succès', menu_how_to_use_appy: 'Comment utiliser Appy', menu_more_tools_and_techniques: 'Plus d\'outils et de techniques', menu_about_us: 'A propos de Appy', menu_contact_us: 'Contactez-nous', txt_subject: 'Sujet', enter_subject: 'Erreur! S\'il vous plaît entrer le sujet', enter_message: 'Erreur! S\'il vous plaît entrer votre message'
 }).translations('he', {
     txt_someOne_selectMsg: 'הודעה בחר', txt_update_maxMesg: 'מקס הודעה', adheadms_name: 'הוסף הודעה', appymnu_submit: 'לך תשיג את זה', app_name: 'דרך ליישם', slogen: 'תחלום את חייך, תחייה את חלומך', navigation_drawer_open: 'Open navigation drawer', navigation_drawer_close: 'Close navigation drawer', action_settings: 'Settings', title_activity_edit_profile: 'EditProfileActivity', ShartAppHtml: 'Appy Text', eula_title: 'Agreement', eula_accept: 'Accept', eula_refuse: 'Decline', txt_Chooselang: 'Choose Language', txt_Selectlang: 'Select Preferred Language', sMaxTotalSizeOfFilesDlgMsg: 'Enter number of messages you want to receive per day', sMaxTotalSizeOfFiles: 'Massage Limit', txt_select_lang: 'בחר שפה', txt_or: 'או', txt_continue: 'המשך', txt_login: 'התחבר', txt_register: 'הירשם', txt_email: 'כתובת דוא"ל', txt_pass: 'סיסמא', txt_remember: 'זכור אותי', txt_sign_in: 'היכנס', txt_sign_up: 'הירשם', txt_forgot_pass: 'שכחת את הסיסמא?', txt_enter_email: 'נא להזין את הדוא"ל.', txt_enter_pass: 'נא להזין את הסיסמה.', txt_name: 'שם', txt_phone: 'מספר טלפון', txt_confirm_pass: 'אשר סיסמה', txt_terms: 'תנאי שימוש', txt_read_terms: 'קרא תנאי שימוש', txt_enter_name: 'שְׁגִיאָה! נא להזין את שמך.', txt_enter_valid_email: 'שְׁגִיאָה! נא להזין דוא"ל חוקי.', txt_enter_phone: 'שְׁגִיאָה! נא להזין את הנייד.', txt_enter_pass_not_matched: 'שְׁגִיאָה! סיסמא אישור סיסמא לא נכון', txt_registration_failed: 'שְׁגִיאָה! הרשמה נכשלה. אנא נסה שוב.', txt_already_registered: 'שְׁגִיאָה! פרטיך כבר רשומים. נסה שכחתי סיסמא.', category_screen_msg: 'מה אתה רוצה להזמין?', category_done_msg: 'לך תשיג את זה', error_network: 'שְׁגִיאָה! בדוק את הרשת שלך ונסה שוב.', menu_profile: 'הפרופיל שלי', txt_personal_info: 'מידע אישי', txt_current_pass: 'סיסמה נוכחית', txt_new_pass: 'סיסמה חדשה', txt_appy_msg_per_day: 'מספר הודעות מירבי ביום', txt_language: 'שפה', txt_update: 'עדכון', enter_current_password: 'שְׁגִיאָה! נא להזין את הסיסמה הנוכחית.', enter_new_password: 'שְׁגִיאָה! נא להזין את הסיסמה החדשה.', msg_update_profile_success: 'פרופיל עודכן בהצלחה.', msg_update_profile_fail: 'שְׁגִיאָה! עדכון הפרופיל  נכשל.', menu_appy_messages: 'הודעות Appy שלי', title_add_msg: 'הוסף הודעה', txt_msg_subject: 'נושא ההודעה', txt_msg_detail: 'פרטי הודעה', txt_submit: 'שלח', enter_msg_subject: 'שְׁגִיאָה! נא להזין את הנושא', enter_msg_detail: 'שְׁגִיאָה! נא להזין תיאור', msg_add_msg_success: 'הודעה נוספה בהצלחה', msg_msg_enabled: 'הודעה מופעלת', msg_msg_disabled: 'הודעה מושבתת', menu_make_someone_appy: 'שלח הודעת Appy למישהו', txt_choose_contact: 'בחר איש קשר', txt_send_msg: 'שלח הודעה', msg_msg_send_success: 'ההודעה נשלחה בהצלחה.', menu_how_to_use_appy: 'כיצד להשתמש ב Appy  ', menu_more_tools_and_techniques: 'עוד כלים וטכניקות ', menu_about_us: 'אודות Appy', menu_contact_us: 'צור קשר', txt_subject: 'נושא', enter_subject: 'שְׁגִיאָה! נא הקלד את הודעתך', enter_message: 'שְׁגִיאָה! נא הזן את הנושא'
 }).translations('ru', {
     txt_someOne_selectMsg: 'Выберите сообщение', txt_update_maxMesg: 'Максимальное сообщение', adheadms_name: 'Добавить сообщение', appymnu_submit: 'Иди возьми это', app_name: 'Чересчур счастливый', slogen: 'Мечтай всю свою жизнь, Живи своими мечтами', navigation_drawer_open: 'Open navigation drawer', navigation_drawer_close: 'Close navigation drawer', action_settings: 'Settings', title_activity_edit_profile: 'EditProfileActivity', ShartAppHtml: 'Appy Text', eula_title: 'Agreement', eula_accept: 'Accept', eula_refuse: 'Decline', txt_Chooselang: 'Выберите язык', txt_Selectlang: 'Select Preferred Language', sMaxTotalSizeOfFilesDlgMsg: 'Enter number of messages you want to receive per day', sMaxTotalSizeOfFiles: 'Massage Limit', txt_select_lang: 'Выберите язык', txt_or: 'Или', txt_continue: 'Продолжить', txt_login: 'Вход', txt_register: 'Зарегистрироваться', txt_email: 'Электронная почта', txt_pass: 'Пароль', txt_remember: 'Запомнить меня', txt_sign_in: 'Авторизоваться', txt_sign_up: 'Зарегистрироваться', txt_forgot_pass: 'Забыли пароль?', txt_enter_email: 'Пожалуйста введите электронный адрес', txt_enter_pass: 'Пожалуйста введите пароль', txt_name: 'Имя', txt_phone: 'Телефонный номер', txt_confirm_pass: 'Подтвердить пароль.', txt_terms: 'Общие положения и условия', txt_read_terms: 'Прочитать общие положения', txt_enter_name: 'Ошибка! Пожалуйста введите имя.', txt_enter_valid_email: 'Ошибка! Пожалуйста введите действительный адрес электронной почты.', txt_enter_phone: 'Ошибка! Пожалуйста введите номер мобильного телефона.', txt_enter_pass_not_matched: 'Ошибка! Пароль и подтвержденный пароль не совпадают.', txt_registration_failed: 'Ошибка! Регистрация не удалась. Пожалуйста повторите попытку позже.', txt_already_registered: 'Ошибка! Вы уже зарегистрированы. Пожалуйста попытайтесь вспомнить пароль.', category_screen_msg: 'Что бы вы хотели заказать?', category_done_msg: 'Получить это', error_network: 'Ошибка! Пожалуйста проверьте соединение и попытайтесь подключиться позже.', menu_profile: 'Мой профиль', txt_personal_info: 'Личная информация', txt_current_pass: 'Текущий пароль', txt_new_pass: 'Новый пароль', txt_appy_msg_per_day: 'Максимальное количество счастливых сообщений в день', txt_language: 'Язык', txt_update: 'Обновить', enter_current_password: 'Ошибка! Пожалуйста введите текущий пароль.', enter_new_password: 'Ошибка! Пожалуйста введите новый пароль.', msg_update_profile_success: 'Профиль успешно обновлен.', msg_update_profile_fail: 'Ошибка! Обновление профиля не удалось.', menu_appy_messages: 'Мои собственные счастливые сообщения', title_add_msg: 'Добавить сообщение', txt_msg_subject: 'Тема сообщения', txt_msg_detail: 'Детали сообщения', txt_submit: 'Отправить', enter_msg_subject: 'Ошибка! Пожалуйста введите тему', enter_msg_detail: 'Ошибка! Пожалуйста введите описание', msg_add_msg_success: 'Сообщение успешно добавлено', msg_msg_enabled: 'Сообщение доступно', msg_msg_disabled: 'Сообщение заблокировано', menu_make_someone_appy: 'Сделайте кого-нибудь счастливым', txt_choose_contact: 'Выбрать контакт', txt_send_msg: 'Послать сообщение', msg_msg_send_success: 'Сообщение послано успешно.', menu_how_to_use_appy: 'Как использовать приложение', menu_more_tools_and_techniques: 'Еще больше настроек и техник', menu_about_us: 'О приложении', menu_contact_us: 'Связаться с нами', txt_subject: 'Тема', enter_subject: 'Ошибка! Пожалуйста введите тему', enter_message: 'Ошибка! Пожалуйста введите сообщение'
 });
    $translateProvider.preferredLanguage('en');
});
