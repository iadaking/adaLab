appHome.
factory("HomeService", ["$rootScope", "$http", "$localStorage", "apiUrl", "apiKey", "apiTime", "apiToken", "apiMd5", "apiLocal", function($rootScope, $http, $localStorage, apiUrl, apiKey, apiTime, apiToken, apiMd5, apiLocal){

	var startMatchRequest = function(tag_type, target_sex){

		var apiPath = "App/PParty/create";
		var loginkey = $localStorage.loginkey;
		var local = apiLocal.run();
		var time = apiTime.run();
		var longitude = $rootScope.coords.longitude;
		var latitude = $rootScope.coords.latitude;
		var token = apiMd5.run( apiToken.run({
			loginkey : loginkey,
			local : local,
			time : time,
			tag_type : tag_type,
			target_sex : target_sex,
			longitude : longitude,
			latitude : latitude
		}, apiKey) );

		return $http({
			method : "JSONP",
			url : apiUrl + apiPath,
			params : {
				"callback" : "JSON_CALLBACK",
				"loginkey" : loginkey,
				"local" : local,
				"time" : time,
				"tag_type" : tag_type,
				"target_sex" : target_sex,
				"longitude" : longitude,
				"latitude" : latitude,
				"token" : token
			}
		});
	}

	var cancelMatchRequest = function(){
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

	return {
		startMatch : function(tag_type, target_sex){
			return startMatchRequest(tag_type, target_sex);
		},
		cancelMatch : function(){
			return cancelMatchRequest();
		}
	}
}]);