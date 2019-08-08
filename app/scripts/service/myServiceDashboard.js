angular.module('eCommApp')
	.service('adminService', function($http,$log,StoreAdmin){

        this.adminLogin = function (data){
        	return $http.post(baseUrl+'admin/login',data)
        }
        this.getCustomerPayments = ()=>{
            return $http.post(baseUrl+'admin/getCustomerPayments')
        };
        this.getallcustomers = function (){
                return $http.post(baseUrl+'admin/getCustData')
        }
        this.getManualPayments = function (){
                return $http.post(baseUrl+'admin/getManualPayments')
        }
        this.getCustDetails = function (){
                return $http.post(baseUrl+'admin/getCustDetails')
        }
        this.getAllCustomerDUE = function (){
                return $http.post(baseUrl+'admin/getAllCustomerDUE')
        }
        this.getAllCustomersWallet = function (){
                return $http.post(baseUrl+'admin/getAllCustomersWallet')
        }
        this.getWalletForCustomer= function (data){
                return $http.post(baseUrl+'admin/getWalletForCustomer', data)
        }
        this.updateGSTIN= function (data){
                return $http.post(baseUrl+'admin/updateGSTIN', data)
        }
        this.manualRecharge= function (data){
        	return $http.post(baseUrl+'admin/manualRecharge', data)
        }
        this.loadUser = function (data) {
            return $http.post(baseUrl+'admin/loadUser', data).then(function (result) {
                $log.debug(result);
                if(result.status === 200 && result.data.status){
                    document.cookie = 'Authorization'+"=;path=/;";
                    $log.debug("In if() loadUser");
                    //window.sessionStorage.setItem('Authorization', result.data.token);
                    // document.cookie = 'Authorization1'+"=" + success.data.token + ";domain=capitalquotient.com;path=/;";
                    document.cookie = 'Authorization'+"=" + result.data.token + ";path=/;";
                    //myService.setHeaders();
                }
                return result;
            }).catch(function (error) {
                return error;
            });
        };
	});
