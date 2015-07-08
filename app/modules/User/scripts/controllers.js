appUser.
controller("UserController", ["$scope", function($scope){


	$scope.user = {
		headimg : "./modules/User/images/user-demo.png",
		username : "username",
		sex : "M",
		birthday : "0000-00-00"
	}

}]).
controller("UserSetController", ["$scope", "$localStorage", "$location", function($scope, $localStorage, $location){

	$scope.loginOut = function(){
		$localStorage.$reset();
		$location.path("/login");
	}

}]).
controller("UserSetInfoController", ["$scope", function($scope){

	$scope.user = {		//用户初始化
		headimg : "./modules/User/images/user-demo.png",
		username : "username",
		sex : "M",
		birthday : "0000-00-00"
	}

	$scope.changeSex = function(){		//切换性别

	}

	$scope.submit = function(){		//信息提交

	}




}]).
controller("UserSetIdentifyController", ["$scope", function($scope){
 
}]);