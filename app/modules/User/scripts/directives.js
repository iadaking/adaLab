appUser.
directive("myUserinfo", ["$filter", "$location", "$localStorage", "UserService", function($filter, $location, $localStorage, UserService){

	return{
		link : function(scope, ele, attrs, c){
			
			scope.user = $localStorage.user==null?{		//数据初始化，如果没有本地数据则使用默认数据
				headimg : "./modules/User/images/user-demo.png",
				username : "username",
				sex : "M",
				birthday : "0000-00-00"
			}:{
				headimg : $localStorage.user.headimg,
				username : $localStorage.user.username,
				sex : $localStorage.user.sex,
				birthday : $localStorage.user.birthday
			};

			UserService.getUserInfo().	//获取用户信息
				success(function(data, status){
					console.log(data);
					if(data.result_code == "SUCCESS"){

						scope.user = {
							headimg : data.headimg,
							username : data.username,
							sex : data.sex,
							birthday : data.birthday
						}

						$localStorage.user = {
							headimg : data.headimg,
							username : data.username,
							sex : data.sex,
							birthday : data.birthday
						}
					}
				}); 

			scope.changeSex = function(sex){	//切换性别
				if(sex == "boy"){
					scope.user.sex = "M";
				}else{
					scope.user.sex = "F";
				}
			}

			scope.submit = function(){		//提交
				var birthday = $filter("date")(scope.user.birthday, "yyyy-MM-dd");
				//console.log(birthday);

				UserService.updateUserInfo( scope.user.username, scope.user.sex, birthday ).
					success(function(data, status){
						console.log(data);
						if( data.result_code == "SUCCESS" ){
							$localStorage.user = {
								headimg : data.user.headimg,
								username : data.user.username,
								sex : data.user.sex,
								birthday : data.user.birthday
							}
							console.log($localStorage.user);
							$location.path("/");
						}else{
							console.log("修改信息失败");
						}
					});
			}

		}
	}
}]);