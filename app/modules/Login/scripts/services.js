appLogin.
factory("LoginService", ["$http", "$localStorage", "apiUrl", "apiKey", "apiTime", "apiToken", "apiMd5", "apiLocal", function($http, $localStorage, apiUrl, apiKey, apiTime, apiToken, apiMd5, apiLocal){

	var getYZMRequest = function(phone){	//获取验证码

		var apiPath = "App/PSystem/send_login_messagecode";
		var time = apiTime.run();
		var token = apiMd5.run( apiToken.run({
			phone : phone,
			time : time
		}, apiKey) );
		
		return $http({
			method : "JSONP",
			url : apiUrl + apiPath,
			params : {
				"callback" : "JSON_CALLBACK",
				"phone" : phone,
				"time" : time,
				"token" : token
			}
		});
	};

	var sendYZMRequest = function(phone, yzm){

		var apiPath = "App/PSystem/messagecode_login";
		var local = apiLocal.run();
		var time = apiTime.run();
		var token = apiMd5.run( apiToken.run({
			phone : phone,
			local : local,
			code : yzm,
			time : time		
		}, apiKey) );

		return $http({
			method : "JSONP",
			url : apiUrl + apiPath,
			params : {
				"callback" : "JSON_CALLBACK",
				"phone" : phone,
				"local" : local,
				"code" : yzm,
				"time" : time,
				"token" : token
			}
		})
	};

	var updateInfoRequest = function(username, sex, birthday){

		var apiPath = "App/PUser/update";
		var loginkey = $localStorage.loginkey;
		var local = apiLocal.run();
		var time = apiTime.run();
		var realname = "timer";
		var token = apiMd5.run( apiToken.run({
			loginkey : loginkey,
			local : local,
			time : time,
			username : username,
			realname : realname,
			sex : sex,
			birthday : birthday
		}, apiKey) );

		return $http({
			method : "JSONP",
			url : apiUrl + apiPath,
			params : {
				"callback" : "JSON_CALLBACK",
				"loginkey" : loginkey,
				"local" : local,
				"time" : time,
				"username" : username,
				"realname" : realname,
				"sex" : sex,
				"birthday" : birthday,
				"token" : token
			}
		})
	};

	var getLoginStateRequest = function(){
		var apiPath = "App/PSystem/is_login";
		var loginkey = $localStorage.loginkey;
		var local = apiLocal.run();
		var time = apiTime.run();
		var token = apiMd5.run( apiToken.run({
			loginkey : loginkey,
			local : local,
			time : time
		}, apiKey) );

		return $http({
			method : "JSONP",
			url : apiUrl + apiPath,
			params : {
				"callback" : "JSON_CALLBACK",
				"loginkey" : loginkey,
				"local" : local,
				"time" : time,
				"token" : token				
			}
		})

	};

	return {
		getYZM : function(phone){
			return getYZMRequest(phone);
		},
		sendYZM : function(phone, yzm){
			return sendYZMRequest(phone, yzm);
		},
		updateInfo : function(username, sex, birthday){
			return updateInfoRequest(username, sex, birthday);
		},
		getLoginState : function(){
			return getLoginStateRequest();
		}
	};
}])