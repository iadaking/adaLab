appHome
.directive("myChoosetag", ["$timeout", "$rootScope", "$location", "HomeService", "geolocation", function($timeout, $rootScope, $location, HomeService, geolocation){

	return {
		link : function(scope, ele, attrs, c){



			var tag_type = "coffee";	//默认初始标签
			scope.showCoffee = true;
			scope.showBook = false;
			scope.showChat = false;
			scope.showGame = false;
			scope.showFilm = false;
			scope.showKtv = false;
			scope.showDesc = true;	//显示标签描述
			scope.showSex = false;	//隐藏性别选项
			scope.sex= 'M';	//性别男


			var $ = angular.element;
			var iPos = [
				{ x : 0, y : -228 },
				{ x : -210, y : -108 },
				{ x : -210, y : 108 },
				{ x : 0, y : 228 },
				{ x : 212, y : 108 },
				{ x : 212, y : -108 }
			];
			var timer = null;


			var oTags = ele.children();
			angular.forEach(oTags, function(value, key){	//给每一个按钮绑定点击事件

				if(key != 0){	//给其他标签绑定点击事件

					$(oTags[key]).bind("click", function(){
						scope.chooseTag(key-1);
						moveTag(key-1);
					});

				}else{	//给选择性别绑定点击事件
					$(oTags[key]).bind("click", function(){
						scope.chooseSex();
					});

				}
			});

			$timeout(moveTag,300);	
			function moveTag(k){
				if(!k){
					k = 0;
				}
				step = 6 - k;	//逆时针要走的步数
				angular.forEach(oTags, function(value, key){
					if(key != 0){
						i = (key - 1 + step) % 6;	//到达的位置

						if(k == key-1){
							$(oTags[key]).css({
								"transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 ) scale3d(1.5,1.5,1)",
								"-webkit-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 ) scale3d(1.5,1.5,1)",
								"-moz-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 ) scale3d(1.5,1.5,1)",
								"-o-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 ) scale3d(1.5,1.5,1)",
								"-ms-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 ) scale3d(1.5,1.5,1)"
							});
							$(oTags[key]).addClass("active");
						}else{
							$(oTags[key]).css({
								"transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 )",
								"-webkit-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 )",
								"-moz-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 )",
								"-o-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 )",
								"-ms-transform" : "translate3d("+ iPos[i].x + "px, " + iPos[i].y + "px, 0 )"
							});
							$(oTags[key]).removeClass("active");
						}

						
					}
				});
			};
			scope.chooseTag = function(k){	//选择标签

				scope.clearAll();
				
				switch(k){
					case 0 : 
						tag_type = "coffee";
						$timeout.cancel(timer);
						timer = $timeout(function(){
							scope.showDesc = true;
							scope.showCoffee = true;		
						},300,true);
						break;
					case 1 : 	
						tag_type = "book";
						$timeout.cancel(timer);
						timer = $timeout(function(){
							scope.showDesc = true;
							scope.showBook = true;
						},300,true);
						break;
					case 2 : 
						tag_type = "chat";	
						$timeout.cancel(timer);					
						timer = $timeout(function(){
							scope.showDesc = true;
							scope.showChat = true;
						},300,true);
						break;
					case 3 : 
						tag_type = "game";
						$timeout.cancel(timer);					
						timer = $timeout(function(){
							scope.showDesc = true;
							scope.showGame = true;
						},300,true);
						break;
					case 4 : 
						tag_type = "film";
						$timeout.cancel(timer);			
						timer = $timeout(function(){
							scope.showDesc = true;
							scope.showFilm = true;
						},300,true);
						break;
					case 5 : 
						tag_type = "ktv";
						$timeout.cancel(timer);			
						timer = $timeout(function(){
							scope.showDesc = true;
							scope.showKtv = true;
						},300,true);
						break;
				}
				
			};
			scope.chooseSex = function(){	//确认标签
				scope.showDesc = false;
				scope.$apply();
				$timeout(function(){
					scope.showSex = true;
				},300,true)
				
			};
			scope.changeSex = function(sex){	//切换性别
				if(sex == "boy"){
					scope.sex = 'M';
				}else{
					scope.sex = 'F';
				}
			};
			scope.clearAll = function(){	//清除标签状态
				scope.showCoffee = false;
				scope.showBook = false;
				scope.showChat = false;
				scope.showGame = false;
				scope.showFilm = false;
				scope.showKtv = false;
				scope.showDesc = false;	//隐藏标签描述
				scope.showSex = false;	//隐藏性别选项
				scope.sex = 'M';

				scope.$apply();
			};
			scope.match = function(){	//发起匹配

				HomeService.startMatch(tag_type, scope.sex).
				success(function(data, status){
					console.log(data);
					if(data.result_code == "SUCCESS"){
						$location.path("/match");
					}
				});
			};


			$timeout.cancel($rootScope.matchTimer);		//取消匹配状态的定时器
			HomeService.cancelMatch()
				.success(function(data, status){
					if( data.party_state == 'NO_TAG' ){
						console.log("取消tag成功");
					}
				});
				
		}
	}
}]);