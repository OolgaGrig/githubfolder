var CartApp=angular.module("CartApp",[]);

CartApp.controller("CartCtrl",function($scope,$http){

	$scope.cartPlusCount=function(item){

		if(item.newcount<item.count){
		var n=$scope.cart.indexOf(item);
		item.newcount++;
		item.newprice+=item.price;
		$scope.cart.splice(n,1,item);
		}
		else{
			alert("Вибачте, не можна замовити більше!");
		}
	}

	$scope.cartMinesCount=function(item){
		if(item.newcount==1)
		{
			var n=$scope.cart.indexOf(item);
			$scope.cart.splice(n,1);
			$scope.setCartBadge($scope.cart.length);
		}
		else {
		item.newcount--;
		item.newprice-=item.price;
		$scope.cart.splice(n,1,item);

		}
	}

	$scope.cartDeleteItem=function(item){
		var n=$scope.cart.indexOf(item);
		$scope.cart.splice(n,1);
		$scope.setCartBadge($scope.cart.length);
	}

	$scope.cartTotalPrice=function(){
		var total=0;
		for(var i=0;i<$scope.cart.length;i++){
			total+=$scope.cart[i].newprice;
		}
		return total;
	}

	$scope.cartorder={};

	$scope.cartOrderView=function(mas){
		$scope.setCurrentView("cartOrder");
		$scope.cartorder.total=$scope.cartTotalPrice();
		$scope.cartorder.products=[];
		for(var i=0;i<mas.length;i++){
			$scope.cartorder.products.push(mas[i]);
		}
		console.log("order:")
		console.log($scope.cartorder);
	}

	$scope.sendCartOrder=function(item){
		console.log("sendCartOrder:")
		console.log(item);
		$http.post('/cartSendOrder',item).success(function(data){
			console.log('success!');
		})
	}
});