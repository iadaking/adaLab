appMatch.
factory("MatchService", ["$http", "$localStorage", "apiUrl", "apiKey", "apiTime", "apiToken", "apiMd5", "apiLocal", function($http, $localStorage, apiUrl, apiKey, apiTime, apiToken, apiMd5, apiLocal){


	var cancelMatchRequest = function(){	//取消匹配

		var apiPath = "App/PParty/cancel";
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
		});
	}

	var getMatchStateRequest = function(){		//获取匹配状态

		var apiPath = "App/PParty/state";
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
		cancelMatch : function(){
			return cancelMatchRequest();
		},
		getMatchState : function(){
			return getMatchStateRequest();
		}
	}
}]);