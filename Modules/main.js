var MainApp=angular.module("MainApp",["ProductApp","CartApp"]);

MainApp.directive('addClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            	element.bind('click', function() {
            	element.parent().parent().children().removeClass(attrs.addClass);
                element.parent().addClass(attrs.addClass);
            });
        }
    };
});

MainApp.directive('loadCurrent',function(){
return {
	restrict:"A",
	link:function(scope,element,attrs){
		console.log('loadcurrent');
		scope.currentView="shopProduct";
   		}
	}
})

MainApp.filter("salaryFilter",function(){
         return function(value,idn){
             if(angular.isNumber(value)&&angular.isString(idn)){
                 return value+" "+idn;
             }
             else
                 return value;
        }     
 })

MainApp.controller("MainCtrl",function($scope,$http){
	$scope.cartBadge=0;

	$scope.setCartBadge=function(value){
		$scope.cartBadge=value;
	}

	$scope.currentView="adminProduct";

	$scope.setCurrentView=function(name){
		$scope.currentView=name;
	}

	$scope.showAdminProduct=function(){
		$scope.currentView="adminProduct";
	}
	$scope.showAdminOrder=function(){
		$scope.currentView="adminOrder";
	}

	$scope.showShopProduct=function(){
		$scope.currentView="shopProduct";
	}
	
	$scope.showShopCart=function(){
		$scope.currentView="shopCart";
	}
})