appUser.
factory("UserService", ["$http", "$localStorage", "apiUrl", "apiKey", "apiTime", "apiToken", "apiMd5", "apiLocal", function($http, $localStorage, apiUrl, apiKey, apiTime, apiToken, apiMd5, apiLocal){

	var getUserInfoRequest = function(){

		var apiPath = "App/PUser/info";
		var loginkey = $localStorage.loginkey;
		var local = $localStorage.local;
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

	var getUserHeadimgRequest = function(){

		var apiPath = "App/PUser/headimg";
		var loginkey = $localStorage.loginkey;
		var local = $localStorage.local;
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

	var updateUserInfoRequest = function(username, sex, birthday){

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
	}

	return {
		getUserInfo : function(){
			return getUserInfoRequest();
		},
		getUserHeadimg : function(){
			return getUserHeadimgRequest();
		},
		updateUserInfo : function(username, sex, birthday){
			return updateUserInfoRequest(username, sex, birthday);
		}
	}

}]);