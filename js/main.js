//1.初始化数据
var hashInit = init()
var keys = hashInit['keys']
var hash = hashInit['hash']
//2.生成键盘
generateKeyboard(keys, hash)
//3.监听键盘
listenToKeyboard(hash)


//封装函数
//F1.初始化数据函数
function init() {
	var keys = {
		'0': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		'1': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		'2': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
		'length': 3
	}
	var hash = {
		'q': 'www.qq.com',
		'w': 'weibo.com',
		'e': undefined,
		'r': 'renren.com',
		't': 'taobao.com',
		'y': 'youtube.com',
		'u': 'www.ubisoft.com.cn',
		'o': 'opera.com',
		'j': 'www.jd.com',
		'a': 'apple.com',
		's': 'steampowered.com',
		'g': 'google.com',
		'v': 'vraymasters.cn',
		'b': 'bilibili.com',
		'z': 'zhihu.com',
		'd': 'draw.io',
		'p': 'pixiv.net',
		'm': 'mikanani.me',
		'n': 'nicovideo.jp',
	}
	//读取浏览器本地数据
	var hashInLocalStorage = JSON.parse(localStorage.getItem('usrCustomWeb') || 'null')
	if (hashInLocalStorage) {
		hash = hashInLocalStorage
	}
	return {
		'keys': keys,
		'hash': hash
	}
}
//F2.生成键盘函数
function generateKeyboard(keys, hash) {
	for (var index = 0; index < keys['length']; index++) {
		//创建kbdRow
		var div = tag('div')
		div.className = 'kbdRow'

		kbdNav.appendChild(div)

		var row = keys[index]
		for (var index2 = 0; index2 < row['length']; index2++) {
			//创建span
			var span = createSpan(row[index2])

			//创建img
			var img = createImg(hash[row[index2]])

			//创建button
			var button = createButton(row[index2])

			//创建kbd
			var kbd = tag('kbd')
			kbd.className = 'kbdKey'

			kbd.appendChild(span)
			kbd.appendChild(img)
			kbd.appendChild(button)
			div.appendChild(kbd)
		}
	}
}
//F3.监听键盘函数
function listenToKeyboard(hash) {
	document.onkeypress = function (phyKbdPress) {
		var key = phyKbdPress.key
		var website = hash[key]
		window.open('http://' + website, '_blank')
	}
}

//生成tag标签函数
function tag(tagName) {
	return document.createElement(tagName)
}
//创建span函数
function createSpan(textContent) {
	var span = tag('span')
	span.textContent = textContent
	span.className = 'text'
	return span
}
//创建img函数
function createImg(domain) {
	var img = tag('img')
	img.className = 'icon'
	var website = domain
	if (website) {
		img.src = 'http://' + website + '/favicon.ico'
	} else {
		img.src = '../img/myIcon.png'
	}
	img.onerror = function (imgError) {
		imgError.target.src = '../img/myIcon.png'
	}
	return img
}
//创建button函数
function createButton(id) {
	var button = tag('button')
	button.className = 'editBtn'
	button.id = id
	button.textContent = '编辑'
	button.onclick = function (buttonClick) {
		//修改hash
		var key = buttonClick.target.id//从btn的id来获取key
		var website = prompt('请输入自定义网址')
		hash[key] = website

		//icon读取新hash
		img = buttonClick.target.previousSibling//从btn的兄弟获取icon
		img.src = 'http://' + website + '/favicon.ico'
		img.onerror = function (imgError) {
			imgError.target.src = '../img/myIcon.png'
		}
		//保存用户数据在浏览器本地
		localStorage.setItem('usrCustomWeb', JSON.stringify(hash))
	}
	return button
}