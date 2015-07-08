appLogin.
directive("myLoginform", ["$timeout", "$location", "$localStorage", "LoginService", "apiLocal", function($timeout, $location, $localStorage, LoginService, apiLocal){

	return {
		link : function(scope, ele, attrs, c){

				scope.isYZM = true;	//验证码是否输入正确
			 	scope.offYZM = true;	//验证码开关
				scope.offTime = 10;		//开关时间间隔(应该设为30-60s)

				scope.getYZM = function(){	//获取验证码

					LoginService.getYZM(scope.user.phone).
						success(function(data, status){
							console.log(data);
						});

					scope.offYZM = false;	//关闭验证码开关
					$timeout(openYZMOff, 1000, true);
				}

				function openYZMOff(){	//打开验证码开关
					if( scope.offTime == 0 ){
						scope.offTime = 10;	//初始化开关时间
						scope.offYZM = true;
						return;
					}else{
						$timeout(openYZMOff,1000,true);
					}
					scope.offTime--;	
				}

				scope.submit = function(){


					LoginService.sendYZM(scope.user.phone, scope.user.yzm).
						success(function(data, status){
							console.log(data);
							if(data.result_code == "SUCCESS"){
									$localStorage.local = apiLocal.run();
								    $localStorage.loginkey = data.loginkey;
								    $localStorage.phone = scope.user.phone;
								    $localStorage.rctoken = data.rc_token;
								if( data.user.username ){	//如果是已注册用户则跳到首页，否则完善信息			
									$location.path("/");	
								}else{
									$location.path("/login/info");
								}
							}else{
								scope.isYZM = false;
							}
						});
				}
		}
	}

}]).
directive("myLogininfoform", ["$location", "$localStorage", "$filter", "LoginService", function($location, $localStorage, $filter, LoginService){

	return {
		link : function(scope, ele, attrs, c){

			scope.user = {
				sex : "M"
			}
			scope.changeSex = function(sex){
				if(sex == "boy"){
					scope.user.sex = "M";
				}else{
					scope.user.sex = "F";
				}
			}
			scope.goPrev = function(){
				$location.path("/login");
			}

			scope.submit = function(){
				var birthday = $filter("date")(scope.user.birth, "yyyy-MM-dd");

				LoginService.updateInfo( scope.user.name, scope.user.sex, birthday ).
					success(function(data, status){

						if( data.result_code == "SUCCESS" ){
							$localStorage.user = {
								headimg : data.user.headimg,
								username : data.user.username,
								sex : data.user.sex,
								birthday : data.user.birthday
							}
							$location.path("/").replace();
						}else{

						}
					});
			}

		}
	}
}]);

