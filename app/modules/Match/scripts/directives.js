appMatch.
directive("myMatch", ["$timeout", "$location", "$rootScope", "$location", "MatchService", function($timeout, $location, $rootScope, $location, MatchService){
	return{
		link : function(scope, ele, attrs, c){

			scope.second = 600;		//匹配倒计时的秒数
			$timeout(matching, 1000, true);
			function matching(){
				if( scope.second == 1 ){
					$location.path("/");
				}else{
					MatchService.getMatchState().	//获取匹配状态
						success(function(data, status){
							console.log(data);
							if(data.party_state == "PARTY_START"){	//匹配到目标后，把目标对象和自己对象一起保存到全局变量$rootScope.partyUser中
								
								$rootScope.partyUser = data.party_user;
								$location.path("/chat").replace();	//跳转至聊天界面
							}

						});
				}
				scope.second--;
				$rootScope.matchTimer = $timeout(matching, 1000, true);
			}

			scope.cancelMatch = function(){		//取消匹配
				$location.path("/").replace();
			}
		}
	}
}]).
directive("myChat", ["$timeout", "$rootScope", "$location", "$localStorage", "MatchService", "apiAppkey", function($timeout, $rootScope, $location, $localStorage, MatchService, apiAppkey){

	return{
		link : function(scope, ele, attrs, c){

			$ = angular.element;
			var oChat = $(ele).children()[1];
			var oChatCont = $(oChat).children()[0];

			
	

	        RongIMClient.init(apiAppkey); //appkey

	        RongIMClient.setConnectionStatusListener({  //设置连接监听状态
	            onChanged: function (status) {
	                console.log(status.toString(), new Date())
	            }
	        });

	        var partyUser = null;
	        var partyMe = null;
	        RongIMClient.getInstance().setOnReceiveMessageListener({    //消息监听器
	            onReceived: function (data) {
	                //console.log(data.getContent());

					var newReceive = $('<div></div>');
					$(newReceive).addClass("message receive");
					if(partyUser.sex == 'M'){			
						$(newReceive).html("<span>\
												<img src='./modules/Match/images/chat-boy.png'>\
											</span>\
											<p>"+data.getContent()+"</p>");
					}else{
						$(newReceive).html("<span>\
												<img src='./modules/Match/images/chat-girl.png'>\
											</span>\
											<p>"+data.getContent()+"</p>");
					}
					$(oChatCont).append(newReceive);

					$(ele)[0].scrollTop = $(ele)[0].scrollHeight - $(ele)[0].offsetHeight;
	            }
	        });
	     	
	        var target_id = "";
	        RongIMClient.connect($localStorage.rctoken, {  //token
	            onSuccess: function (x) {
	                console.log("connected，userid＝" + x);
	                if( $rootScope.partyUser[0].userid == x ){
	                	target_id = $rootScope.partyUser[1].userid;
	                	partyUser = $rootScope.partyUser[1];
	                	partyMe = $rootScope.partyUser[0];
	                }else{
	                	target_id = $rootScope.partyUser[0].userid;
	                	partyUser = $rootScope.partyUser[0];
	                	partyMe = $rootScope.partyUser[1];
	                }
	               
	            },
	            onError: function (x) {
	                //console.log(x)
	            }
	        });

	        scope.send = function () {
	        	//console.log(target_id);
	            var type = RongIMClient.ConversationType.setValue('4');//设置聊天类型

	            var sendCont = scope.sendCont;

				var newSend = $('<div></div>');
				$(newSend).addClass("message send");
				if(partyMe.sex == 'M'){				
					$(newSend).html("<p>"+sendCont+"</p>\
										<span>\
											<img src='./modules/Match/images/chat-boy.png' >\
										</span>");
				}else{
					$(newSend).html("<p>"+sendCont+"</p>\
										<span>\
											<img src='./modules/Match/images/chat-girl.png'>\
										</span>");					
				}
				$(oChatCont).append(newSend);

				$(ele)[0].scrollTop = $(ele)[0].scrollHeight - $(ele)[0].offsetHeight;

	            scope.sendCont = "";

	            RongIMClient.getInstance().sendMessage( type, target_id, RongIMClient.TextMessage.obtain(sendCont), null, {  //发送信息 1、聊天类型，2、目标id，3、消息内容，4、null
	                onSuccess: function () {
	                   console.log("send successfully");
	                }, onError: function () {
	                   console.log("send fail")
	                }
	            });

	        };

	        scope.cancelChat = function(){		//取消聊天
	        	MatchService.cancelMatch().
	        		success(function(data, status){
	        			//console.log(data, status);
	        			if(data.party_state == "NO_TAG"){	//取消匹配状态后，返回首页
							$location.path("/").replace();
						}
	        		});
	        };

	        // 检查对方是否还在聊天
	        $timeout.cancel( $rootScope.matchTimer );
	        $timeout(function(){
	        	matching();
	        },1000);
	        var matching = function(){
	        	MatchService.getMatchState().
	        		success(function(data, status){
	        			//console.log(data);
	        			if( data.party_state == "ASSEMBLING" ){
	        				scope.cancelChat();
	        			}
	        		});
	        	$rootScope.matchTimer = $timeout(matching,1000);
	        };
		}
	}
}]);