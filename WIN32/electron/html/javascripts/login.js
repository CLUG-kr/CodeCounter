$(document).ready(function () {
	$('#submit').on('click', function(){
		var id = $('#id').val()
		var pw = $('#pw').val()

		if (id.length > 0 && pw.length > 0){
			var post = {}
			post['id'] = id
			post['pw'] = pw
			$.ajax({
				url: 'http://127.0.0.1:51234/login',
				method:'POST',
				data: post,
				success: function(data, response, xhr){
					if (data.status == 'success'){
						window.location.replace('index.html');
					}else {
						$('#need').css('display', 'none');
						$('#wrong').css('display','');
					}
				}
			})
		}else{
			if (!$('#wrong').css('display'))
				$('#wrong').css('display','');
			$('#need').css('display', '');
		}

	});
	$('#pw').keydown(function (events) {
        if (event.keyCode == 13) {
            // 엔터 입력
            $('#submit').click();
        }
    });
});