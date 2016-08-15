var ProductApp=angular.module("ProductApp",[]);

ProductApp.directive('currentItem', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
                element.bind('load',function(e){
                    console.log(e.target.contentDocument);
                var path=e.target.contentDocument.body.innerHTML;
                scope.$apply(function(){
                scope.currentItem.path=path;
                })
                })
           }
        }
    
});

ProductApp.controller("ProductCtrl",function($scope,$http){
        
    $scope.load=function(){
        $http.get("/productLoad").success(function(data){
        $scope.products=data;
        })
    }
    //створення нового елемента
    $scope.create=function(item){
        console.log(item);
        $http.post("/productCreate",item).success(function(item){
        $scope.products.push(item);
        $scope.setCurrentView("adminProduct");
        })
        
    }
     //оновлення елемента
    $scope.update=function(item){
        $http.post("/productUpdate",item);
        for(var i=0;i<$scope.products.length;i++){
            if($scope.products[i]._id==item._id){
                $scope.products[i]=item;
                break;
            }   
        }
       $scope.setCurrentView("adminProduct");
       }
    //знищення елемента
    $scope.delete=function(item){
        $http.post("/productDelete",item).success(function(res){
        $scope.products.splice($scope.products.indexOf(item),1);
        })
   }
    //редактування існуючого або створення нового елемента
    $scope.editOrCreate=function(item){
        $scope.currentItem=item ? angular.copy(item) : {};
        $scope.setCurrentView("editProduct");
    }

    $scope.saveEdit=function(item){
        if(angular.isDefined(item._id)){
            console.log("update");
            $scope.update(item);
        }
        else{
            console.log("create");
            $scope.create(item);
        }
    }

    $scope.cancelEdit=function(){
        $scope.currentItem={};
         $scope.setCurrentView("adminProduct");
    }

    $scope.uploadFile=function(item){
        $http.post('/uploadFile',item).success(function(item){
            console.log(item);
            $scope.currentItem.path=item;
        })
    }

    $scope.cart=[];

    $scope.addProductCart=function(item){
        var n=$scope.cart.indexOf(item);
        if(n==-1){
            item.newcount=1;
            item.newprice=item.price;
            $scope.cart.push(item);
            $scope.setCartBadge($scope.cart.length);
       }
        else{
            alert("Даний товар вже в корзині!");
        }
    }

    $scope.load();
})
	
