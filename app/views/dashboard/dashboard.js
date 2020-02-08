angular.module('eCommApp')
    .controller('dashboardCtrl', ['$state','$rootScope','$scope','$http', function ($state,$rootScope,$scope,$http) {
        console.log('dashboardformCtrl--------------calling11111111111111');
        var cust_id =localStorage.getItem('cust_id');
        $scope.cust_id = localStorage.getItem('cust_id');
        console.log("ggggg",cust_id);
        var full_name =localStorage.getItem('full_name');
        $scope.full_name = localStorage.getItem('full_name');
        var phone_no =localStorage.getItem('phone_no');
        $scope.phone_no = localStorage.getItem('phone_no');
        var email_id =localStorage.getItem('email_id');
        $scope.email_id = localStorage.getItem('email_id');
        var address =localStorage.getItem('address');
        $scope.address = localStorage.getItem('address');
        var passport_number =localStorage.getItem('passport_number');
        $scope.passport_number = localStorage.getItem('passport_number');
        // var issue_date =localStorage.getItem('issue_date');
        // $scope.issue_date = localStorage.getItem('issue_date');
        var place_issue =localStorage.getItem('place_issue');
        $scope.place_issue = localStorage.getItem('place_issue');
        // console.log("gggg"+full_name);
        $scope.logout = function(){
            localStorage.removeItem('loggedin');
            window.location.href = '#/login';
           
        } 
        $scope.addForm = function(data){
        
        
            var data = {
              'cust_id':    $scope.cust_id,
              'full_name' :  $scope.full_name,
              'phone_no' :  $scope.phone_no,
              'email_id' :  $scope.email_id,
              'address'     : $scope.address,
              'passport_number':$scope.passport_number,
              'issue_date'     :$scope.issue_date,
              
              'place_issue' :          $scope.place_issue ,
              'forien_passport_number':        $scope.forien_passport_number,
              'forien_issue_date' :         $scope.forien_issue_date,
              'forien_place_issue' :    $scope.forien_place_issue
             
              
            }
            console.log(data);
            
    
              $http.put('http://localhost:3002/sequelize/edit/customer',data)
                .then(function successCallback(success){
                  console.log("data addForm",success.data.data)
                  $scope.passport= success.data.data;
                 
                },function errorCallback(response){
                  alert("some error occured")
              })
             
        };
}]);