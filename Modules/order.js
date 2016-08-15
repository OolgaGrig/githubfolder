var OrderApp=angular.module("OrderApp",[]);

OrderApp.controller("OrderCtrl",function($scope,$http){
		
		$scope.loadCartOrder=function(){
			$http.get('/cartorder').success(function(data){
				$scope.cartorder=data;
			})
		}
		$scope.loadCartOrder();
	})