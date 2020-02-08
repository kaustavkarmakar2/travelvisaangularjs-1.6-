angular.module('eCommApp')
    .controller('loginCtrl', ['$state','$http','$scope','$timeout','$rootScope', function ($state,$rootScope,$scope,$http,$timeout) {
        console.log('loginCtrl--------------calling11111111111111');
        var pass_LOGIN_URL = 'http://localhost:3002/sequelize/login';
        var api_array = [];
        $scope.formData = {};
        api_array.push({auth_flag : false, functionName : "login", functionData : {url : pass_LOGIN_URL, type : "POST"}});
        $scope.Onchange =(form) =>
                                {
                                    // show_loading_bar(70); // Fill progress bar to 70% (just a given value)
    
                                    var email_id = $(form).find('#email_id').val();
                                    var password = $(form).find('#password').val();
                                    $scope.email_id ;
                                    $scope.password;
    
                                    var loginObj = {
                                        email_id : $scope.email_id ,
                                        password: $scope.password
                                    };
                                    console.log(loginObj);
                     
                                    var data = ApiFunction("login", loginObj);
                                    // console.log('AA' + data.status);
                    
                                    if (data.status == 1 && data.username!=undefined){
                                        localStorage.setItem('cust_id',data.username.cust_id);
                                        localStorage.setItem('full_name',data.username.full_name);
                                        localStorage.setItem('phone_no',data.username.phone_no);
                                        localStorage.setItem('email_id',data.username.email_id);
                                        localStorage.setItem('address',data.username.address);
                                        localStorage.setItem('passport_number',data.username.passport_number);
                                        // localStorage.setItem('issue_date',data.username.issue_date);
                                        localStorage.setItem('place_issue',data.username.place_issue);
                                        
                                        localStorage.setItem('loggedin','true');
                                        window.location.href = '#/formpage';
                                        // $timeout(function()
                                        // {  alert("Hello");
                                        //      window.location.href = '#/dashboard';
                                        // }, 1000);
                                        
                                    } 
                                    else if (data.status == 2 && !data.api_flag) {
                                        toastr.error("This email id is not registerd.", "Sorry!");
                                    }
                                    else if (data.status == 3 && !data.api_flag) {
                                        toastr.error("Your account is temporary disabled.", "Sorry!");
                                    }
                                    else {
                                        toastr.error("Something wents wrong. Please retry!", "Oops!");
                                    
                                    }
    
                                    var opts = {
                                        "closeButton": true,
                                        "debug": false,
                                        "positionClass": "toast-top-full-width",
                                        "onclick": null,
                                        "showDuration": "300",
                                        "hideDuration": "1000",
                                        "timeOut": "5000",
                                        "extendedTimeOut": "1000",
                                        "showEasing": "swing",
                                        "hideEasing": "linear",
                                        "showMethod": "fadeIn",
                                        "hideMethod": "fadeOut"
                                    };
                                    
                  }
        //function
        function ApiFunction(ApiName, obj)
        {
            var returnData; 
            $.each( api_array, function(i, val) {
                if( val['functionName'] == ApiName ) {
                    if(val['auth_flag']) {
                        returnData =  CallApiWithAuth(val, obj);
                    }
                    else {
                        returnData =  CallApiWithOutAuth(val, obj);
                    }
                }
            });
            return returnData;
        }
        var retry_flag = 2;
        function CallApiWithAuth(val, apiData) {
            var api_flag = {"api_flag": true};
            var response = "";
            try {
                var cookie_data = JSON.parse(getCookie('sitedata2c'));
                $.ajax({
                    method: 'POST',
                    //  type: 'application/json',
                    headers: {
                            'Content-Type': 'application/json'
                            },
                    // type: val["functionData"].type,
                    // url: base_url+val["functionData"].url,
                    url:'http://localhost:3002/sequelize/login',
                    dataType: 'json',
                    data: apiData,
                    async: false,
                    success: function (data) {
                        console.log("check",data);
                    if (data != null) {				
                        api_flag = {"api_flag": true};
                        response = Object.assign(api_flag, data);
                        console.log("response",response);
                    }
                    else {
                        api_flag = {"api_flag": false};
                        response = Object.assign(api_flag, data);
                        console.log("response1",response);
                    }
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("user-id", cookie_data.user_id);
                        xhr.setRequestHeader("auth-token", cookie_data.auth_token);
                        xhr.setRequestHeader("Content-Type", "application/json")
                        },
                    error: function (data) {
                        console.log( data);
                        if(data.status == 401 && retry_flag > 0) {
                            retry_flag--;
                            regenerateToken ();
                            CallApiWithAuth(val, apiData);
                        }
                        else {
                            api_flag = {"api_flag": false};
                            response = Object.assign(api_flag, data);
                        }
                        // if(data.statusText=="Unauthorized") {
                        // 	document.cookie="Token=;expires=Wed; 01 Jan 1970;path=/";
                        // 	var abc = checkToken();
                        // 	retry_flag--;
                        // 	if((abc.status == 200) && (retry_flag > 0)) {
                        // 		CallApi(functionData, prof);
                        // 	}
                        // 	else {
                        // 		alert("<strong>Oh! Snap</strong> Some thing went wrong. Please retry!  :)");
                        // 	}
                        // }
                        // else {
                        // 	alert("<strong>Oh! Snap</strong> Some thing went wrong. Please retry!  :)");
                        // }
                    }
                });
            }
            catch (e) {
                api_flag = {"api_flag": false};
                response = api_flag;
            }
            return response;
        }
    
        function CallApiWithOutAuth(val, apiData) {
            var api_flag = {"api_flag": true};
            var response = "";
            $.ajax({
                method: 'POST',
                type: 'application/json',
                url: 'http://localhost:3002/sequelize/login',
                dataType: 'json',
                data: apiData,
                async: false,
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        if(val["functionName"]=="login"){
                            var flag = false;
                            if(data.status == 1) {
                                $scope.flag = setLogin(data);
                                console.log("flag",flag);
                            }
                            api_flag = {"api_flag": flag};
                            response = Object.assign(api_flag, data);
                            console.log("response",response);
                        }else{
                            api_flag = {"api_flag": true};
                            response = Object.assign(api_flag, data);
                        }
                    }
                    else {
                        api_flag = {"api_flag": false};
                        response = Object.assign(api_flag, data);
                    }
                },
                error: function (data) {
                    api_flag = {"api_flag": false};
                    response = Object.assign(api_flag, data);
                }
            });
            return response;
        }
        function setLogin(data) {
            return setCookie("sitedata2c", JSON.stringify(data));
        }
        function setCookie(cname, cvalue, exdays) {
        // var d = new Date();
        // d.setTime(d.getTime() + (exdays*24*60*60*1000));
        // var expires = "expires="+ d.toUTCString();
        // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
    
        $scope.logout = function(){
            localStorage.removeItem('loggedin');
            window.location.href = '#/login';
           
        } 
}]);