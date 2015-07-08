// JavaScript Document

  $(document).ready(function(e) {
    $(".xxk dt ol li").hover(function(){
		$(this).addClass("cli").siblings().removeClass("cli");	
		$k=$(".xxk dt ol li").index(this);
		$(".xxk dd ul").eq($k).css({display:"block"}).siblings().css({display:"none"})
	})

  });