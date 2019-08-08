angular.module('eCommApp')
	.service('adminService', function($http, $log, StoreAdmin){


        this.adminLogin = function (data){
        	return $http.post(baseUrl+'admin/login',data)
        }

        this.getCustomerPayments = ()=>{
            return $http.post(baseUrl+'admin/getPartnerPayments')
        };

        this.getUserSearch = function () {
            //myService.setHeaders();
            return $http.post(baseUrl+'admin/getUser').then(function (success) {
                if(success.data.status){
                    StoreAdmin.allUserData = success.data.value[0];
                }
                return success;
            }).catch(function (error) {
                return error;
            });
        };


        this.getallusers = function (){
                return $http.post(baseUrl+'admin/getUserData')
        }

        this.getManualPayments = function (){
                return $http.post(baseUrl+'admin/getManualPayments')
        }

        this.getUserDetails = function (){
                return $http.post(baseUrl+'admin/getUserDetails')
        }

        this.getAllCustomerDUE = function (){
                return $http.post(baseUrl+'admin/getAllPartnersDUE')
        }
        this.getAllCustomersWallet = function (){
                return $http.post(baseUrl+'admin/getAllPartnersWallet')
        }
        this.getAssetsData = ()=>{
            return $http.get(baseUrl + 'admin/getAssetsData').then((result)=>{
                if(result.data.status){
                    StoreAdmin.AssetsData = result.data.data
                }
                return result;
            }).catch((error)=>{
                return error;
            });
        };
        this.getMonthlyRevenue = ()=>{
            return $http.get(baseUrl + 'admin/getMRROnline').then((result)=>{
                if(result.data.status){
                    StoreAdmin.MonthlyRevenue = result.data.data
                }
                return result
            }).catch((error)=>{
                return error
            })
        };

        this.getallCustomers = function (){
                return $http.post(baseUrl+'admin/getallCustomers')
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
