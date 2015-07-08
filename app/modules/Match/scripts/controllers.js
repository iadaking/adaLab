appMatch.
controller("MatchController", ["$scope", function($scope){

	$scope.second = 0;	//匹配倒计时的秒数
	$scope.cancelMatch = function(){	//取消匹配

	}
}]).
controller("ChatController", ["$scope", function($scope){

	$scope.cancelChat = function(){	//取消聊天

	};

	$scope.send = function(){	//发送信息

	};

}]);