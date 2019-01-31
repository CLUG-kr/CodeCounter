const MENU = ['대시보드', '계정', '설정'];
var now = MENU[0];


$(document).ready(function(){
	$('.main-menu').on('click', function(){
		var which = $($(this).find('span')).text();
		if (which == MENU[0] && now != MENU[0]){
			$('.main-menu').removeClass('active');
			$(this).addClass('active');
			$('.content').empty();
			$.ajax({
				method: 'GET',
				url:'http://127.0.0.1:51234/getHtml/dashboard',
				success: function(data, response, xhr){
					$('.content').append(data);
					fs.readFile('html/admin.json', function(err, data){
						getCodeLine(JSON.parse(data))	
					})
				}
			});
			now = MENU[0];
		}else if (which == MENU[1] && now != MENU[1]){
			$('.main-menu').removeClass('active');
			$(this).addClass('active');
			$('.content').empty();
			$.ajax({
				method: 'GET',
				url:'http://127.0.0.1:51234/getHtml/account',
				success: function(data, response, xhr){
					$('.content').append(data);
				}
			});
			now = MENU[1];
		}else if (which == MENU[2] && now != MENU[2]){
			$('.main-menu').removeClass('active');
			$(this).addClass('active');
			$('.content').empty();
			$.ajax({
				method: 'GET',
				url:'http://127.0.0.1:51234/getHtml/setting',
				success: function(data, response, xhr){
					$('.content').append(data);
				}
			});
			now = MENU[2];			
		}
	});
});