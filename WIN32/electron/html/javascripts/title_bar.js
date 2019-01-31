$(document).on('ready', function(){
	console.log('loaded')
	document.getElementById("min-btn").addEventListener("click", function (e) {
		console.log('min')
	    var window = BrowserWindow.getFocusedWindow();
	    window.minimize(); 
	});

	document.getElementById("max-btn").addEventListener("click", function (e) {
		console.log('max')
	    var window = BrowserWindow.getFocusedWindow(); 
	    window.maximize(); 
	});

	document.getElementById("close-btn").addEventListener("click", function (e) {
		console.log('close')
	    var window = BrowserWindow.getFocusedWindow();
	    window.close();
	}); 
})