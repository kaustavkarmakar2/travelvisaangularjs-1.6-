angular.module('eCommApp')
    .controller('homeCtrl', ['$rootScope', '$state','$scope', function ($rootScope, $state,$scope) {      
        console.log('homeCtrl--------------calling11111111111111');
        $scope.tab = 0;

      
        $scope.previous = function(i){            
          $scope.tab--;
       return $scope.tab ;
      };
      $scope.setTab = function(newTab){
        $scope.tab = newTab;
      };
  
      $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
      };
      $scope.tab++;
    return $scope.tab ;
}]);
