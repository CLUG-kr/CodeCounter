// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs')
var guiLast = 0
var editorLast = 0
var nowEditor = ''
const levelPoint = [0, 256, 1024, 4096]
const levelName = ['Green', 'Blue', 'Orange']
const levelTheme = ['green-background', 'blue-background', 'orange-background']
const levelColor = ['green', 'blue', 'orange']
const levelGradient = [["#64FE22", "#56FFF8"], ["#22FEBD", "#3253E8"], ["red", "orange"],[],[],[]]

fs.readFile('html/admin.json', function(err, data){
	getCodeLine(JSON.parse(data))	
})

require('electron').ipcRenderer.on('gui', (event, message)=> {
	guiLast = Date.now()
})

require('electron').ipcRenderer.on('editor', (event, message)=>{
	editorLast = Date.now()
	nowEditor = message
})

require('electron').ipcRenderer.on('code', (event, message)=>{
	var code = JSON.parse(message.replace(/'/gi,'"'))
	setCodeLine(code['line'], code['lang'])
})

setInterval(function(){refreshGUIConn()}, 100)
setInterval(function(){refreshEditorConn()}, 100)

function refreshGUIConn() {
	let gap = (Date.now() - guiLast) / 1000
	if (gap < 3){
		setStatus(true)
	}else
		setStatus(false)
}

function refreshEditorConn() {
	let gap = (Date.now() - editorLast) / 1000
	if (gap < 5){
		setEditor(true, nowEditor)
	}else {
		setEditor(false)
	}
}

function setCircle(line) {
	console.log((line - getPrev(line))/(getNext(line) - getPrev(line)))
	$('#main-meter').circleProgress({
		value: (line - getPrev(line))/(getNext(line) - getPrev(line)).toFixed(3),
		size: 400,
		thickness: 5,
		fill: {
			gradient: getGradient(line)
		}
	});
}

function setProgress() {

}


function setTheme(line) {
	$('.card-icon').removeClass($('.card-icon').attr('class').split(' ')[1])
	$('#level').removeClass($('#level').attr('class').split(' ')[1])
	$('#next').removeClass($('#next').attr('class').split(' ')[1])
	$('#active').removeClass($('#active').attr('class'))
	$('#progressbar').removeClass($('#progressbar').attr('class').split(' ')[3])
	for (var i = 0; i < levelPoint.length-1; ++i)
		if (levelPoint[i] <= line && line <= levelPoint[i+1]){
			$('.card-icon').addClass(levelTheme[i])
			$('#level').addClass(levelColor[i])
			$('#next').addClass(levelColor[i+1])
			$('#active').addClass(levelTheme[i])
			$('#progressbar').addClass(levelTheme[i])
			break
		}
}

function setStatus(state) {
 	if (state){
 		$('#progress').css('display', 'none')
 		$('#status-circle').removeClass('red-background')
 		$('#status-circle').addClass('green-background')
 		$('#status').text('CodeCounter Enabled')
 	}else {
 		$('#progress').css('display', '')
 		$('#status-circle').removeClass('green-background')
 		$('#status-circle').addClass('red-background')
 		$('#status').text('CodeCounter Disabled')
 	}
}

function getGradient(line) {
	for (var i = 0; i < levelPoint.length-1; ++i)
		if (levelPoint[i] <= line && line <= levelPoint[i+1])
			return levelGradient[i]
}

function getPrev(line) {
	for (var i = 0; i < levelPoint.length-1; ++i)
		if (levelPoint[i] <= line && line <= levelPoint[i+1])
			return levelPoint[i]	
}

function getNext(line) {
	for (var i = 0; i < levelPoint.length-1; ++i)
		if (levelPoint[i] <= line && line <= levelPoint[i+1])
			return levelPoint[i+1]
}

function getLevel(line) {
	for (var i = 0; i < levelPoint.length-1; ++i)
		if (levelPoint[i] <= line && line <= levelPoint[i+1])
			return levelName[i]
}

function getCodeLine(json) {
	$('#line').text(json['line'] + ' line')
	$('#next').text(getNext(json['line']) + ' line')
	$('#level').text(json['level'] + ' Level')
	setCircle(json['line'])
	setTheme(json['line'])
	setLangs(json['lang'])
	$($('#active td')[2]).text(json['line'])
}

function setCodeLine(line, lang) {
	fs.readFile('html/admin.json', function(err, data){
		var json = JSON.parse(data)
		json['line'] += line
		json['lang'][lang] += line 

		json['level'] = getLevel(json['line'])
 		getCodeLine(json)
 		fs.writeFile('html/admin.json', JSON.stringify(json), (err)=>{})
	});
}

function setEditor(state, editor){
	if (state){
		$('#editor').text(editor + '실행중')		
	}else{
		$('#editor').text(' ')
	}

}

function sort(lang){
	var keys = []
	for(var k in lang) keys.push([k,lang[k]]);
	for(var i = 0; i < keys.length; ++i)
		for(var j = 0; j < keys.length; ++j){
			if (keys[i][1] > keys[j][1]){
				var temp = keys[i]
				keys[i] = keys[j]
				keys[j] = temp
			}
		}
	   
	return keys
}

function setLangs(lang){
	var keys = sort(lang)
	$($('.first td')[1]).text(keys[0][0])
	$($('.first td')[2]).text(keys[0][1])

	$($('.second td')[1]).text(keys[1][0])
	$($('.second td')[2]).text(keys[1][1])

	$($('.third td')[1]).text(keys[2][0])
	$($('.third td')[2]).text(keys[2][1])
}