if (window.location.href.indexOf("/iw-cc/Site/Page/Edit.do") == -1)
{
	document.write("<script type=\"text/javascript\" src=\"/racing/common/chinese/js/global_it.js\"></script>");
}

var isIE = (navigator.appName.indexOf("Microsoft") > -1);
var d = document;
var selectedIndexCnt = 0;

if (!sEnabled) var sEnabled = "off";
if (!sYear) var sYear=2011;
if (!sMonth) var sMonth=5;
if (!sDay) var sDay=1;

var sectionArray = new Array('football', 'entertainment', 'racing', 'member', 'charities', 'corporate');
if (!levelArray)	var levelArray = new Array();
if (!sectionHome)	var sectionHome = false;
var isMac = (navigator.appVersion.indexOf("Macintosh") > -1);

if (location == top.location || !sectionHome)
{
	try {if (document.domain.indexOf('.com'))	document.domain = document.domain.substring(document.domain.indexOf('.') + 1);}catch(e) {}
	//alert('parent:  ' + document.domain);
}

//checkSubDomain();


function init()
{
	new setDivPosition('element5', true);
	new setDivPosition('element6');
	removeImg();
	new setNav();
	setTimeout(function(){setFooterYear();}, 500);
}

function getLevel()
{
	var url = location.pathname;
	var array = url.split('/');
	
	for (var i=0; i<array.length; i++)
	{
		if (array[i].indexOf('_') >= 0)
		{
			
			var array1 = array[i].split('_');
			for (var j=0; j<array1.length; j++)
			{
				levelArray.push(array1[j]);
			}
			
		}
		else
		{
			levelArray.push(array[i]);
			
		}
	}
	
	levelArray.shift();
	levelArray.shift();
	
	var obj = levelArray[levelArray.length-1];
	if (obj != 'index.html')
	{
		levelArray[levelArray.length-1] = obj.replace('.aspx', '');
	}
	else
	{
		levelArray.pop();
	}
	//alert(levelArray);
}

/*  SQ No.:531530
 *  Modify the z-index and the timeout to prevent the overlap of the menu after rolling over
 */

function setNav()
{
	var mainNav = d.getElementById('mainNav');
	var topNav = getElementsByClassName(mainNav, 'nav')[0];
	var topSubNav = getElementsByClassName(mainNav, 'subNav')[0];
	var navArray = new Array(topNav, topSubNav);
	var btnHit = false;
	var self = this;
	
	this.init = function()
	{
		this.leftNavOpen();
		
		//Highlight Nav
		for (var i=0; i<navArray.length; i++)
		{
			this.setHighlightNav(i);
		}
	};
	
	this.setHighlightNav = function(id)
	{
		var nav = navArray[id];
		var a = nav.getElementsByTagName('a');
		
		if (id == 1)
		{
			var ul = topSubNav.getElementsByTagName('ul')[0];
			for (var i=0; i<a.length; i++)
			{
				/*a[i].onmouseover = function()
				{
					if (this.className.indexOf(' active') >= 0)	return;
					self.topSubNavOver(this, true);
				}
				a[i].onmouseout = function()
				{
					if (this.className.indexOf(' active') >= 0)	return;
					self.topSubNavOver(this, false);
				}*/
				
				new this.setMenu(a[i]);
				
				//Highlight Nav
				if (!levelArray[id])	continue;
				if (a[i].rel == levelArray[id])
				{
					self.topSubNavOver(a[i], true);
					a[i].className += ' active';
				}
			}
		}
		else
		{
			for (var i=0; i<a.length; i++)
			{
				if (!a[i].rel)	continue;
				if (!a[i].getElementsByTagName('img').length)	continue;
				
				a[i].img = a[i].getElementsByTagName('img')[0];
				a[i].oldSrc = a[i].img.src;
				
				if (a[i].oldSrc.indexOf('_over') < 0)
				{
					a[i].newSrc = a[i].oldSrc.replace('.gif', '_over.gif');
				}
				else
				{
					a[i].newSrc = a[i].oldSrc;
				}
				
				a[i].onmouseover = function()
				{
					if (this.className.indexOf(' active') >= 0)	return;
					this.img.src = this.newSrc;
				}
				a[i].onmouseout = function()
				{
					if (this.className.indexOf(' active') >= 0)	return;
					this.img.src = this.oldSrc;
				}
				
				//Check Domain
				if (id == 0)
				{
					/*if (location.hostname.indexOf('teamsite.hkjc.com') >= 0)	continue;
					var url = a[i].href;
					url = url.replace('www.', '');
					var array = url.split('/');
					var section = array[3];
					//var subDomain = url.substring(7, url.indexOf('.'));
					var array1 = array[2].split('.');
					var subDomain = (array1[0] != 'www')?array1[0]:array1[1];
					a[i].href = url.replace(subDomain, section);*/
					if (location.hostname.indexOf('teamsite.hkjc.com') >= 0)
					{
						var url = a[i].href;
						url = url.replace('www.', '');
						var array = url.split('/');
						var array1 = array[2].split('.');
						var subDomain = array1[0];
						a[i].href = url.replace(subDomain + '.', 'teamsite.');
					}
				}
				
				//Highlight Nav
				if (!levelArray[id])	continue;
				if (a[i].rel == levelArray[id])
				{
					a[i].className += ' active';
					a[i].img.src = a[i].newSrc;
				}
			}
		}
	};
	
	this.leftNavOpen = function(menu)
	{
		if (!d.getElementById('leftNav'))	return;
		
		var leftNav = d.getElementById('leftNav');
		if (!getElementsByClassName(leftNav, levelArray[1]).length)	return;
		var menu = getElementsByClassName(leftNav, levelArray[1])[0];
		menu.style.display = 'block';
		navArray.push(menu);
		
		this.leftSubNavOpen(menu);
	};
	
	this.leftSubNavOpen = function(menu)
	{
		if (!getElementByRel(menu, levelArray[2]))	return;
		var dd = getElementByRel(menu, levelArray[2]).parentNode;
		
		if (!dd.getElementsByTagName('dl').length)	return;
		var dl = dd.getElementsByTagName('dl')[0];
		
		dl.style.display = 'block';
		
		if (!getElementByRel(dl, levelArray[3]))	return;
		var a = getElementByRel(dl, levelArray[3]);
		a.className += ' active';
	};
	
	this.topSubNavOver = function(btn, over)
	{
		var ul = topSubNav.getElementsByTagName('ul')[0];
		var li = setChildNodes(ul, 'LI');
	
		if (over)
		{
			/*for (i=0; i<li.length; i++)
			{
				var a = li[i].getElementsByTagName('a')[0];
				var img = a.getElementsByTagName('img')[0];
				if (img.className.indexOf('level2') < 0)	img.className += ' level2'; 


			}*/
			//setTimeout(function(){btn.parentNode.style.zIndex = 100;}, 0);
			if (ul.className.indexOf('dim') < 0)	ul.className += ' dim';
			if (btn.className.indexOf('active') < 0)	btn.className += ' active';
		}
		else
		{
			/*for (i=0; i<li.length; i++)
			{
				var a = li[i].getElementsByTagName('a')[0];
				var img = a.getElementsByTagName('img')[0];
				if (!levelArray[1] && !btnHit)	img.className = img.className.replace(/level2/, '');


			}*/
			//setTimeout(function(){btn.parentNode.style.zIndex = 1;}, 0);
			if (!levelArray[1] && !btnHit)	ul.className = ul.className.replace(/dim/, '');
			btn.className = btn.className.replace(/active/, '');
		}
	};
	
	this.setMenu = function(btn)
	{
		var li = btn.parentNode;
		var time;
		
		var mode = (btn.parentNode.nodeName.toUpperCase() == 'LI')?	1:2;
		if (mode == 2)
		{
			if (btn.getElementsByTagName('img').length)
			{
				btn.img = btn.getElementsByTagName('img')[0];
				btn.oldSrc = btn.img.src;
				btn.newSrc = btn.oldSrc.replace('.gif', '_over.gif');
			}
		}
		btn.onmouseover	= function() {btn.hit = true;	showLayer(1, mode); self.btnMenuHit = true; btnHit = true;};
		btn.onmouseout	= function() {btn.hit = false;	showLayer(0, mode); self.btnMenuHit = false; btnHit = false;};
		
		if (getElementsByClassName(li, 'pullmenu', true).length)
		{
			var menu = getElementsByClassName(li, 'pullmenu', true)[0];
			menu.onmouseover	= function() {btn.hit = true;	showLayer(1, mode); self.btnMenuHit = true;};
			menu.onmouseout		= function() {btn.hit = false;	showLayer(0, mode); self.btnMenuHit = false;};
			time = 200;
			
			if (mode == 2)
			{
				btn.className += ' subArrow';
				var span = d.createElement('span');
				btn.appendChild(span);
			}
			setTimeout(function(){menu.style.height = menu.offsetHeight - 9 + 'px';}, 300);
			//Hidden Mac's pulldown shadow
			if (isMac)
			{
				var shadowB = getElementsByClassName(menu, 'shadowB');
				for (var i=0; i<shadowB.length; i++)	shadowB[i].style.display = 'none';
				var shadowL = getElementsByClassName(menu, 'shadowL');
				for (var i=0; i<shadowL.length; i++)	shadowL[i].style.visibility = 'hidden';
				var shadowR = getElementsByClassName(menu, 'shadowR');
				for (var i=0; i<shadowR.length; i++)	shadowR[i].style.visibility = 'hidden';
				//if (mode == 2)	menu.style.left = menu.offsetLeft + 4 + 'px';
			}
		}
		else
		{
			time = 0;
		}
		
		function showLayer(over, mode)
		{
			if (over == 1)
			{
				if (btn.className.indexOf('active') < 0)
				{
					btnOver(btn, mode, true);
					if (mode == 1)	self.topSubNavOver(btn, true);
					
				}
				if (menu)
				{
					setTimeout(function()
					{
						btn.parentNode.style.zIndex = 100;
						menu.style.visibility = 'visible';
						self.menuHideSelect(menu, 'hidden');
					}, time);
				}
			}
			else
			{	
				setTimeout(function()
				{
					if (btn.hit)	return;
					if (btn.rel != levelArray[1])
					{
						btnOver(btn, mode, false);
						if (mode == 1)	self.topSubNavOver(btn, false);
					}
					if (menu)
					{
						btn.parentNode.style.zIndex = 1;
						menu.style.visibility = 'hidden';
						if (!self.btnMenuHit)	self.menuHideSelect(menu, 'visible');
					}
				}, time);
			}
		}
		
		function btnOver(btn, mode, over)
		{
			if (over)
			{
				btn.className += ' active';
			}
			else
			{
				btn.className = btn.className.replace(/active/, '');
			}
			
			if (btn.img)
			{	
				if (over)
				{
					//if (btn.className.indexOf(' active') >= 0)	return;
					btn.img.src = btn.newSrc;
				}
				else
				{
					//if (btn.className.indexOf(' active') >= 0)	return;
					btn.img.src = btn.oldSrc;
				}
			}
		}
	};

	this.menuHideSelect = function(div, boolHide)
	{
		var selectHide = false;
		
		try {
		
		if (isIE)
		{
			var str = Number(navigator.appVersion.indexOf('MSIE ')) + 5;
			var version = Number(navigator.appVersion.substring(str, (str+3)));
			if (version < 7)	selectHide = true;
		}
		if (!selectHide)	return;
		
		var selects = d.getElementsByTagName('select');
		for (var i=0; i<selects.length; i++)
		{
			selects[i].style.visibility = boolHide;
		}
		
		if (frames.length > 0)
		{
			for (var i=0; i<frames.length; i++)
			{
				var selects = frames[i].document.getElementsByTagName('select');
				for (var j=0; j<selects.length; j++)
				{
					selects[j].style.visibility = boolHide;
				}
			}
		}
		}
		catch (err) {
		}
	};
	
	this.init();
}

/*
 *  End Change for the SQ No.:531530  
 */

function highlightLeftNav()
{
	if (!d.getElementById('leftNav'))	return;
	var leftNav = d.getElementById('leftNav');
	
	if (!getElementsByClassName(leftNav, levelArray[0]).length)	return;
	var menu = getElementsByClassName(leftNav, levelArray[0])[0];
	menu.style.display = 'block';
	
	setLeftNav(menu);
	
	function setLeftNav(menu)
	{
		var a = menu.getElementsByTagName('a');
		
		for (var i=0; i<a.length; i++)
		{
			a[i].img = a[i].getElementsByTagName('img')[0];
			a[i].oldSrc = a[i].img.src;
			a[i].newSrc = a[i].img.src.replace('.gif', '_over.gif');
			
			a[i].onmouseover = function()
			{
				if (this.className.indexOf(' active') >= 0)	return;
				this.img.src = this.newSrc;
			}
			a[i].onmouseout = function()
			{
				if (this.className.indexOf(' active') >= 0)	return;
				this.img.src = this.oldSrc;
			}
			
			//Highlight Left Nav
			if (a[i].rel == levelArray[1])
			{
				a[i].className += ' active';
				a[i].img.src = a[i].newSrc;
			}
		}
	}
}

function NewWindow(mypage, myname, w, h, scroll,resizable) {
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable='+resizable+','
	win = window.open(mypage, myname, winprops)
	win.self.focus()
	if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function createImg(src, alt, w, h, link, t, className)
{
	var img = d.createElement('img');
	if (src)	img.setAttribute('src', src);
	
	if (alt == null)	
			img.setAttribute('alt', "");
		else
			img.setAttribute('alt', alt.replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
	
	//add by Alex Lee
	if (alt)	img.setAttribute('title', alt);
	//add by Alex Lee
	if (w)	img.setAttribute('width', w);
	if (h)	img.setAttribute('height', h);
	if (className)	img.className = className;
	
	if (link)
	{
		img.setAttribute('border', 0);
		
		var a = d.createElement('a');
		a.setAttribute('href', link);
		if (t && typeof(t) != 'undefined')	a.setAttribute('target', t);
		a.appendChild(img);
		return a;
	}
	else
	{	
		return img;
	}
}

function createA(link, t, txt, id, className)
{		
	var a = d.createElement('a');
	if (link)	a.setAttribute('href', link);
	if (t && typeof(t) != 'undefined')	a.setAttribute('target', t);
	
	//if (txt)	a.appendChild(d.createTextNode(txt));
	if (txt)	a.innerHTML = txt;
	if (id)	a.setAttribute('id', id);
	if (className)	a.className = className;
	
	return a;
}

function createDiv(id, className, txt)
{		
	var div = d.createElement('div');
	if (id)	div.setAttribute('id', id);
	if (className)	div.className = className;
	//if (txt)	div.appendChild(d.createTextNode(txt));
	if (txt)	div.innerHTML = txt;
	return div;
}

function createTag(tag, id, className)
{		
	var div = d.createElement(tag);
	if (id)	div.setAttribute('id', id);
	if (className)	div.className = className;
	return div;
}

function createInput(name, type, value, className)
{		
	var input = d.createElement('input');
	if (name)
	{
		//input.setAttribute('name', name);
		input.setAttribute('id', name);
	}
	if (type)	input.setAttribute('type', type);
	if (value)	input.setAttribute('value', value);
	if (className)	input.className = className;
	return input;
}

function setChildNodes(obj, tagName)
{
	var array = new Array();
	
	for (var i=0; i<obj.childNodes.length; i++)
	{
		if (tagName)
		{
			//alert(obj.childNodes[i].tagName)
			if (obj.childNodes[i].tagName != tagName)	continue;
		}
		if (obj.childNodes[i].toString().toLowerCase().indexOf('text') >= 0)	continue;
		array.push(obj.childNodes[i]);
	}
	
	return array;
}

function getElementsByClassName(p, c, selected)
{
	var array = new Array();
	var tags = p.getElementsByTagName('*');
	
	for (var i=0; i<tags.length; i++)
	{
		if (!tags[i].className)	continue;
		if (selected)
		{
			if (tags[i].className.indexOf(c) >= 0)	array.push(tags[i]);
		}
		else
		{
			if (tags[i].className == c)	array.push(tags[i]);
		}
	}
	
	return array;
}

function getElementByRel(parent, obj)
{
	var a = parent.getElementsByTagName('a');
	for (var i=0; i<a.length; i++)
	{
		if (a[i].rel == obj)
		{
			return a[i];
		}
	}
}

function startFading(el)
{
  if (el.fadinTimeout)	clearTimeout(el.fadinTimeout);
  el.style.visibility = 'visible';
  //el.style.zIndex = 2;
  setOpacity(el, 0);
  fadeImage(el, 0);
}

function fadeImage(el, currentOpacity)
{
  currentOpacity += 20;

  if (currentOpacity > 100)
  {
    setOpacity(el, 100);
    //el.style.zIndex = 1;
	if (el.fadinTimeout)	clearTimeout(el.fadinTimeout);
  }
  else
  {
    setOpacity(el, currentOpacity);
    el.fadinTimeout = setTimeout(function() { fadeImage(el, currentOpacity); }, 10);
  }
}

function setOpacity(el, opacity)
{
	opacity /= 100;
	el.style.opacity = opacity;
	el.style.MozOpacity = opacity;
	el.style.filter = "alpha(opacity=" + (opacity*100) + ")";
}

/** SQ 531884 add function to check the case of the language **/

function setTabList(nav, obj)
{
	var self = this;
	
	this.init = function ()
	{
		this.nav = d.getElementById(nav);
		this.obj = d.getElementById(obj);
		
		this.setA(this.nav);
	};
	
	this.setA = function (nav)
	{
		var a = nav.getElementsByTagName('a');
		
		for (var i=0; i<a.length; i++)
		{
			a[i].num = i;
			a[i].parent = this;
			a[i].className = a[i].className.replace(/active/, '');
			
			a[i].onclick = function()
			{
				if (this.className.indexOf('active') >= 0)	return;
				self.changeA(this, true);
			}
		}
		
		this.highlightA = a[0];
		this.changeA(a[0], false);
	};
	
	this.changeA = function (obj, fadeIn)
	{
		var highlightA = this.highlightA;
		highlightA.className = highlightA.className.replace(/active/, '');
		obj.className += ' active';
		
		var div = setChildNodes(this.obj, 'DIV');
		div[this.highlightA.num].style.display = 'none';
		div[obj.num].style.display = 'block';
		
		this.highlightA = obj;
		if (fadeIn)	startFading(this.obj);
	};
	
	this.init();
}

function setHomeNewsBox(obj)
{
	var container = d.getElementById(obj);
	var photos = getElementsByClassName(container, 'photos')[0];
	var nav = getElementsByClassName(container, 'nav')[0];
	var details = getElementsByClassName(container, 'details')[0];
	var more = getElementsByClassName(container, 'more')[0];
	var obj = mainHighlightObj;
	var highlightImg;
	var highlightP;
	var highlightA;
	var total;
	var navList = new Array();
	var hit = false;
	var index = 1;
	var curIndex = 1;
	var timeout;
	var time = 5000;
	var newsNum = 0;
	var auto = false;
	var flvIsPlaying = false;
	var self = this;
	
	//Get Server Time
	var serverTime = getServerTime();
	var today = new Date();
	var todayTime = (serverTime)?	serverTime:today.getTime();
	//alert(today)
	
	this.init = function()
	{
		this.genNews();
		if (newsNum == 0)	return;
		if(newsNum==1) container.className += ' single';
		
		var imgs = photos.getElementsByTagName('img');
		var a = nav.getElementsByTagName('a');
		var pAll = details.getElementsByTagName('div');
		total = imgs.length;
		
		for (var i=0; i<a.length; i++)
		{
			a[i].img = imgs[i];
			a[i].p = pAll[i];
			a[i].num = i;
			
			a[i].onmouseover = function()
			{
				if (this.className.indexOf('active') >= 0)	return;
				self.changeImg(this);
				hit = true;
				clearInterval(timeout);
			};
			
			a[i].onmouseout = function()
			{
				setTimeout(function(){if (auto&&newsNum>1)	self.autoChange();}, 50);
				hit = false;
			};
			
			navList.push(a[i]);
		}
		
		this.changeImg(navList[0]);
		if (auto&&newsNum>1)	this.autoChange();
	};
	
	this.genNews = function()
	{
		var array = obj.content;
		
		photos.innerHTML = '';
		nav.innerHTML = '';
		details.innerHTML = '';
		
		auto = (obj.rotate == 'true');
		more.href = obj.moreLink;
		more.target = obj.moreTarget;
		
		if (obj.titleImg != '')
		{
			var img = createImg(obj.titleImg, obj.titleImgAlt);
			nav.parentNode.insertBefore(img, nav);
		}
		
		for (var i=0; i<array.length; i++)
		{
			var startTime = this.checkTime(array[i].startDate);
			var endTime = this.checkTime(array[i].endDate);
			if (!(todayTime >= startTime && todayTime < endTime))	continue;
			
			//Gen Photos
			var link = (array[i].flv)?		'javascript:;':array[i].link;
			var target = (array[i].flv)?	'':array[i].target;
			var imgA = createA(link, target);
			var img = createImg(array[i].img, array[i].imgAlt);
			imgA.appendChild(img);
			photos.appendChild(imgA);
			
			//Gen Details
			var div = d.createElement('div');
			var h3 = d.createElement('h3');
			h3.innerHTML = array[i].title;
			var p = d.createElement('p');
			p.innerHTML = array[i].description;
			div.appendChild(h3);
			div.appendChild(p);
			details.appendChild(div);
			
			//Gen Nav
			var a = createA(link, target, '', '', 'clearfix');
			var span = d.createElement('span');
			span.className = 'imgContainer';
			var img = createImg(array[i].thumbnail, array[i].imgAlt);
			span.appendChild(img);
			a.appendChild(span);
			var span = d.createElement('span');
			span.className = 'txt';
			span.innerHTML = array[i].title;
			a.appendChild(span);
			var span = d.createElement('span');
			span.className = 'arrow';
			a.appendChild(span);
			nav.appendChild(a);
			
			if (array[i].flv)
			{
				a.flv = imgA.flv = array[i].flv;
				/*a.onclick = */imgA.onclick = function()
				{
					self.playFLV(this);
				}
			}
			
			newsNum ++;
			if (newsNum >= Number(obj.total))	return;
		}
	};
	
	this.checkTime = function(str)
	{
		var array = str.split('/');
		var date = Number(array[0]);
		var month = Number(array[1]) - 1;
		var year = Number(array[2].substring(0, 4));
		var timeStr = array[2].substring(5, 10);
		var timeArray = timeStr.split(':');
		var hour = Number(timeArray[0]);
		var min = Number(timeArray[1]);
		var thisDate = new Date(year, month, date, hour, min);
		//alert(thisDate);
		
		return thisDate.getTime();
	};
	
	this.playFLV = function(btn)
	{
		clearInterval(timeout);
		this.removeFLV();
		
		var container = createDiv('homeNewsFLVContainer');
		var homeNewsFLV = createDiv('homeNewsFLV');
		homeNewsFLV.innerHTML = 'This site requires JavaScript and ADOBE FLASH PLAYER VERSION 10 or ABOVE.<br />Please visit <a href="https://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank">Adobe website</a> for the latest version.<br /><a href="https://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank"><img src="/football/common/english/images/get_adobe_flash_player.png" alt="Get Adobe Flash Player" /></a>'
		container.appendChild(homeNewsFLV);
		photos.insertBefore(container, photos.getElementsByTagName('a')[0]);
		
		setTimeout(function()
		{
			var flashvars = {};
			flashvars.swfPath = '/football/common/english/images/swf/SkinOverAllNoFullNoCaption.swf';
			flashvars.flv = btn.flv;
			
			var params = {};
			params.allowscriptaccess = 'always';
			params.wmode = 'opaque';
			
			var attributes = {};
			
			swfobject.embedSWF('/football/common/english/images/swf/video.swf', 'homeNewsFLV', '100%', '100%', '10.0.0', '', flashvars, params, attributes);
			
			d.getElementById('homeNewsFLV').style.display = 'block';
		}, 500);
		
		flvIsPlaying = true;
	};
	
	this.removeFLV = function()
	{
		if (!d.getElementById('homeNewsFLVContainer'))	return;
		
		var flvContainer = d.getElementById('homeNewsFLVContainer');
		photos.removeChild(flvContainer);
		
		flvIsPlaying = false;
	};
	
	this.changeImg = function(btn)
	{
		if (hit)	return;
		this.removeFLV();
		
		//if (highlightImg)	highlightImg.style.display = '';
		btn.img.style.display = 'block';
		if (highlightImg)	highlightImg.style.zIndex = index;
		index ++;
		btn.img.style.zIndex = index;
		startFading(btn.img);
		highlightImg = btn.img;
		
		if (highlightP)	highlightP.style.display = '';
		btn.p.style.display = 'block';
		startFading(btn.p);
		highlightP = btn.p;
		
		btn.className += ' active';
		if (highlightA)	highlightA.className = highlightA.className.replace(/active/, '');
		highlightA = btn;
		
		curIndex = btn.num;
	};
	
	this.autoChange = function()
	{
		clearInterval(timeout);
		
		timeout = setInterval(function()
		{
			curIndex ++;
			if (curIndex >= total)	curIndex = 0;
			
			self.changeImg(navList[curIndex]);
		}, time);
	};
	
	this.init();
}

function setWhatsHot(id)
{
	var container = d.getElementById(id);
	var choiceMenu = getElementsByClassName(container, 'choiceMenu')[0];
	var calendarEvents = getElementsByClassName(container, 'calendarEvents')[0];
	var table = container.getElementsByTagName('table')[0];
	var monthContainer = getElementsByClassName(container, 'month')[0];
	var arrowPrev = getElementsByClassName(container, 'arrowPrev')[0];
	var arrowNext = getElementsByClassName(container, 'arrowNext')[0];
	//var monthArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	var monthArray = new Array('一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月');
	//var monthArray = new Array('/ 1', '/ 2', '/ 3', '/ 4', '/ 5', '/ 6', '/ 7', '/ 8', '/ 9', '/ 10', '/ 11', '/ 12');
	var lastMonth = monthArray.length - 1;
	var thisMonth;
	var thisYear;
	var obj = whatshotObj;
	var typeObj = new Object();
	var limitArray = new Array();
	var highlightCell;
	var highlightTime;
	var self = this;
	
	this.calendar = getElementsByClassName(container, 'calendar')[0];
	this.eventContainer = null;
	
	//Get Server Time
	var serverTime = getServerTime('date');
	var today = (serverTime)?	serverTime:new Date();
	var todayDate = serverTime.getDate();
	var todayDay = serverTime.getDay();
	var todayMonth = serverTime.getMonth();
	var todayYear = serverTime.getFullYear();
	
	this.init = function()
	{
		//Check Date Limit
		var m = today.getMonth();
		var startM = 7;//August
		var startY = today.getFullYear();
		var endM = 7;//August
		var endY = startY;
		if (m >= startM)
		{
			endY += 1;
		}
		else
		{
			startY -= 1;
		}
		limitArray.push((new Date(startY, startM)).getTime());
		limitArray.push((new Date(endY, endM)).getTime());
		
		this.genTypes();
		this.genCalendar(today, true);
	};
	
	this.genTypes = function()
	{
		var array = obj.types;
		var col = 2;
		choiceMenu.innerHTML = '';
		
		for (var i=0; i<array.length; i++)
		{
			if (i%col == 0)
			{
				var ul = d.createElement('ul');
				ul.className = 'clearfix';
			}
			
			var li = d.createElement('li');
			li.className = 'box';
			var checkbox = createInput(array[i].id, 'checkbox');
			checkbox.typeName = array[i].id;
			checkbox.onclick = function() {self.filterType(false);};
			var img = createImg(array[i].img);
			li.appendChild(checkbox);
			//checkbox.checked = true;
			li.appendChild(img);
			ul.appendChild(li);
			
			var li = d.createElement('li');
			li.className = 'name';
			var label = d.createElement('label');
			label.setAttribute('for', array[i].id);
			label.innerHTML = array[i].title;
			li.appendChild(label);
			ul.appendChild(li);
			
			choiceMenu.appendChild(ul);
			
			//Set Type Obj
			var id = array[i].id;
			typeObj[id] = new Object();
			typeObj[id] = array[i];
		}
	};
	
	this.filterType = function(start)
	{
		var checkbox = choiceMenu.getElementsByTagName('input');
		var imgs = table.getElementsByTagName('img');
		
		if (start)
		{
			for (var i=0; i<checkbox.length; i++)
			{
				checkbox[i].checked = true;
			}
		}
		
		for (var i=0; i<checkbox.length; i++)
		{
			for (var j=0; j<imgs.length; j++)
			{
				if (imgs[j].className != checkbox[i].typeName)	continue;
				imgs[j].style.display = (checkbox[i].checked)?	'block':'none';
			}
		}
	};
	
	this.genCalendar = function(thisDate, start)
	{
		if (!thisDate)	thisDate = today;
		var date = thisDate.getDate();
		var day = thisDate.getDay();
		var month = thisDate.getMonth();
		var year = thisDate.getFullYear();
		
		// Find out when this month starts and ends.
		var thisMonthDate = new Date(year, month, 1);
		var nextMonthDate = new Date((month == lastMonth)?(year+1):year, (month == lastMonth)?0:(month+1), 1);
		var startDay = thisMonthDate.getDay();
		var endDay = Math.round((nextMonthDate.getTime() - thisMonthDate.getTime()) / (1000*60*60*24));
		
		if (month == todayMonth && year == todayYear)
		{
			date = todayDate;
			day = todayDay;
		}
		
		thisMonthDate = new Date(year, month, 1);
		nextMonthDate = new Date((month == lastMonth)?(year+1):year, (month == lastMonth)?0:(month+1), 1);
		startDay = thisMonthDate.getDay();
		endDay = Math.round((nextMonthDate.getTime() - thisMonthDate.getTime()) / (1000*60*60*24));
		
		//Gen Left Details
		this.genDateDetails(date, day, month, year);
		
		var col = 7;
		var totalCell = col*6; //6 Rows
		var dateNum = 1;
		var array = obj.events;
		
		//Remove Rows
		while (table.rows.length > 1)	table.deleteRow((table.rows.length-1));
		
		for (var i=0; i<totalCell; i++)
		{
			if (i%col == 0)	var row = table.insertRow(-1);
			var cell = row.insertCell(-1);
			
			var div = createDiv('', 'floatRight');
			cell.appendChild(div);
			
			if (i >= startDay && i < (endDay + startDay))
			{
				//Check Events Date
				var eventsArray = new Array();
				var typeArray = new Array();
				var thisDate	= (new Date(year, month, dateNum)).getTime();
				cell.time = thisDate;
				
				for (var j=0; j<array.length; j++)
				{
					var startDate	= this.checkTime(array[j].startDate);
					var endDate		= this.checkTime(array[j].endDate);
					//alert (thisDate + '  :  ' + startDate + '  :  ' + endDate)
					if (!(thisDate >= startDate && thisDate <= endDate))	continue;
					
					if (!typeObj[array[j].type])	continue;
					eventsArray.push(j);
					
					//Prevent Duplicate Img
					var isSame = false;
					for (var k=0; k<typeArray.length; k++)
					{
						if (typeArray[k] == array[j].type)
						{
							isSame = true;
							break;
						}
					}
					if (isSame)	continue;
					typeArray.push(array[j].type);
					
					var type = typeObj[array[j].type];
					var img = createImg(type.img, '', '', '', '', '', array[j].type);
					div.appendChild(img);
				}
				cell.eventsArray = eventsArray;
				
				//Add Date
				if (eventsArray.length > 0)
				{
					var a = createA('', '', dateNum);
					a.onclick = function() {self.changeEvents(this.parentNode);};
					cell.appendChild(a);
				}
				else
				{
					cell.innerHTML += dateNum;
				}
				
				if (i%col == 0)	cell.className += ' sun';//Highlight Sunday
				if (date == dateNum && month == todayMonth && year == todayYear)//Highlight Today
				{
					cell.className += ' today';
					if (start)	this.changeEvents(cell);
				}
				if (cell.time == highlightTime)	this.changeEvents(cell);
				
				dateNum ++;
			}
			else
			{
				cell.innerHTML += '&nbsp;';
			}
		}
		
		this.filterType(start);
	};
	
	this.checkTime = function(str)
	{
		var array = str.split('/');
		var date = Number(array[0]);
		var month = Number(array[1]) - 1;
		var year = Number(array[2].substring(0, 4));
		/*var timeStr = array[2].substring(5, 10);
		var timeArray = timeStr.split(':');
		var hour = Number(timeArray[0]);
		var min = Number(timeArray[1]);
		var thisDate = new Date(year, month, date, hour, min);*/
		var thisDate = new Date(year, month, date);
		//alert(thisDate);
		
		return thisDate.getTime();
	};
	
	this.genDateDetails = function(date, day, month, year)
	{
		var time = (new Date(year, month)).getTime();
		
		if (limitArray[0] == time)
		{
			arrowPrev.className += ' dim';
			arrowPrev.onclick = null;
		}
		else
		{
			arrowPrev.className = arrowPrev.className.replace(/dim/, '');
			arrowPrev.onclick = function()	{self.changeMonth(-1);};
		}
		if (limitArray[limitArray.length-1] == time)
		{
			arrowNext.className += ' dim';
			arrowNext.onclick = null;
		}
		else
		{
			arrowNext.className = arrowNext.className.replace(/dim/, '');
			arrowNext.onclick = function()	{self.changeMonth(1);};
		}
		
		monthContainer.getElementsByTagName('span')[0].innerHTML = monthArray[month] + ' ' + year;
		
		thisMonth = month;
		thisYear = year;
	};

	this.changeMonth = function(index)
	{
		thisMonth += index;
		
		if (thisMonth > lastMonth)
		{
			thisMonth = 0;
			thisYear += 1;
		}
		else if (thisMonth < 0)
		{
			thisMonth = lastMonth;
			thisYear -= 1;
		}
		
		this.genCalendar(new Date(thisYear, thisMonth, 1));
	};
	
	this.changeEvents = function(cell)
	{
		if (cell.eventsArray.length == 0)	return;
		
		cell.className += ' active';
		if (highlightCell)	highlightCell.className = highlightCell.className.replace(/active/, '');
		
		highlightCell = cell;
		highlightTime = cell.time;
		
		var ul = calendarEvents.getElementsByTagName('ul')[0];
		ul.innerHTML = '';
		
		for (var i=0; i<cell.eventsArray.length; i++)
		{
			var array = obj.events[cell.eventsArray[i]];
			
			var li = d.createElement('li');
			var a = createA('', '', array.title);
			a.num = cell.eventsArray[i];
			a.onclick = function()
			{
				self.showEventDetails(this.num);
			};
			li.appendChild(a);
			ul.appendChild(li);
		}
	};
	
	this.showEventDetails = function(id)
	{
		if (this.eventContainer)	this.calendar.removeChild(this.eventContainer);
		
		var array = obj.events[id];
		var container = createDiv('', 'eventsPopup');
		
		var photo = createDiv('', 'photo');
		var img = createImg(array.img, array.imgAlt);
		photo.appendChild(img);
		
		var details = createDiv('', 'detail');
		var h2 = d.createElement('h2');
		h2.innerHTML = array.title;
		var btnClose = createA('javascript:;', '', '', '', 'btnClose');
		btnClose.onclick = function()
		{
			if (!self.eventContainer)	return;
			self.calendar.removeChild(self.eventContainer);
			self.eventContainer = null;
		};
		
		var date = new Date(highlightTime);
		var dateStr = date.getDate() + '/' + this.addZero(date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + array.time;
		var p = d.createElement('p');
		p.innerHTML = '<strong>' + array.venue + '</strong><br />';
		p.innerHTML += dateStr + '<br />';
		var description = array.description.replace(/<p>/g, '');
		description = description.replace(/<\/p>/g, '');		
		description = description.replace(/<P>/g, '');	
		description = description.replace(/<\/P>/g, '');	
		
		p.innerHTML += description;
		
		//Invite Btn
		//var invite = createA("javascript:NewWindow('/racing/chinese/calendar_popup.aspx?event=" + escape(array.id) + "&title=" + escape(array.title) + "', 'calendarPop', 540, 500, 'yes', 'yes');", '', '', '', 'btnCal');
		var invite = createA("javascript:NewWindow('/racing/chinese/calendar_popup.aspx?eventID=" + escape(id) + "&date=" + escape(dateStr) + "', 'calendarPop', 540, 500, 'yes', 'yes');", '', '', '', 'btnCal');
		var span = d.createElement('span');
		span.innerHTML = '邀請';
		invite.appendChild(span);
		
		details.appendChild(btnClose);
		details.appendChild(h2);
		details.appendChild(p);
		details.appendChild(invite);
		
		//View More Btn
		if (array.link)
		{
			var more = createA(array.link, array.target, '', '', 'btnCal');
			var span = d.createElement('span');
			span.innerHTML = '更多';
			more.appendChild(span);
			details.appendChild(more);
		}
		
		container.appendChild(photo);
		container.appendChild(details);
		
		this.eventContainer = this.calendar.appendChild(container);
	};
	
	this.addZero = function(num)
	{
		if (num < 10)	num = '0' + num;
		return num;
	};
	
	this.init();
}

function genRacingNews(obj)
{


	var container = d.getElementById(obj);
	var ul = container.getElementsByTagName('ul')[0];
	var array = racingNewsArray;
	var serverTime = getServerTime();
	var curIndex = 0;
	var total = 3;
	var self = this;
	
	this.init = function()
	{
		this.genNews();
	};
	
	this.genNews = function()
	{
		ul.innerHTML = '';
		
		for (var i=0; i<array.length; i++)
		{
			if (array[i].Date)
			{
				var time = this.checkTime(array[i].Date);
				if (time > serverTime)	continue;
			}
		
			var li = d.createElement('li');
			//var a = createA(array[i].link, array[i].target, array[i].description);
			var a = createA(('javascript:NewWindow(\'//www.hkjc.com/chinese/corporate/racing_news_item.asp?in_file=' + array[i].link + '\', \'racingNews\', 720, 450, 1, 1);'), '_self', array[i].description);
			li.appendChild(a);
			ul.appendChild(li);
			
			curIndex ++;
			if (curIndex >= total)	return;
		}
	};
	
	this.checkTime = function(date)
	{
		var array = date.split('-');
		var year = Number(array[0]);
		var month = Number(array[1]) - 1;
		var date = Number(array[2]);
		var thisDate = new Date(year, month, date);
		
		return thisDate.getTime();
	};
	
	this.init();
	
}

function listScroll(obj, autoPlay)
{
	var container = d.getElementById(obj);
	var div  = setChildNodes(container)[0];
	var timeOutSpeed = 30;
	var containerW = container.offsetWidth;
	var w = div.offsetWidth;
	var timeOut;
	var timeOut2;
	var self = this;
	
	this.init = function()
	{	
		container.onmouseover	= function() {self.stopScroll();};
		container.onmouseout	= function() {self.autoScrollStart();};
		
		if (autoPlay)	this.autoScrollStart();
	};
	
	this.reset = function()
	{
		div.style.left = 0;
	};
	
	this.autoScrollStart = function()
	{
		this.stopScroll();
		timeOut2 = setTimeout(function(){self.autoScroll();}, 1000);
	};
	
	this.autoScroll = function()
	{
		this.stopScroll();
		this.motion();
	};
	
	this.motion = function()
	{
		var objL = div.offsetLeft;
		objL --;
		if (objL < -w)	objL = containerW;
		
		div.style.left = objL + 'px';
		
		timeOut = setTimeout(function() {self.motion();}, timeOutSpeed);
	};
	
	this.stopScroll = function()
	{
		clearTimeout(timeOut);
		clearTimeout(timeOut2);
	};
	
	this.init();
}

function removeImg()
{
	if (d.getElementById('headerImg'))
	{
		var headerImg = d.getElementById('headerImg');
		headerImg.parentNode.parentNode.removeChild(headerImg.parentNode);
	}
	
	if (d.getElementById('mainNavImg'))
	{
		var mainNavImg = d.getElementById('mainNavImg');
		mainNavImg.parentNode.parentNode.removeChild(mainNavImg.parentNode);
	}
	
	if (d.getElementById('seoImg'))
	{
		var seoImg = d.getElementById('seoImg');
		seoImg.parentNode.parentNode.removeChild(seoImg.parentNode);
	}
	
	if (d.getElementById('footerImg'))
	{
		var footerImg = d.getElementById('footerImg');
		footerImg.parentNode.parentNode.removeChild(footerImg.parentNode);
	}
}

function genEmergencyMessage()
{
	//Fix for international racing pages
	if (typeof messageArray === "undefined") {
		messageArray = new Array();
			messageArray = [{
			show:'false',
			description:''}
		];
	}
		var array = messageArray[0];
		var str = '';
		var self = this;

		this.init = function()
		{
			if (array.show != 'true')	return;
			
			/*var emergency = d.getElementById('emergency');
			emergency.getElementsByTagName('p')[0].innerHTML = array.description;*/
			
			var emergency = createDiv('emergency');
			str += '<img alt="Emergency Message" src="/racing/common/chinese/images/title_emergency.gif"><br />';
			str += '<div id="emergencyMessage">';
			str += '<p>' + array.description + '</p>';
			str += '</div>';
			emergency.innerHTML = str;
			emergency.style.display = 'block';
			
			var innerContent = d.getElementById('innerContent');
			var element1 = d.getElementById('element1');
			innerContent.insertBefore(emergency, element1);
			
			new listScroll('emergencyMessage', true);
			
			return;
			
			var y = emergency.parentNode.offsetTop + emergency.offsetHeight + 10;
			
			//Home Landing
			var homeItem = getElementsByClassName(d.body, 'homeItem');
			for (var i=0; i<homeItem.length; i++)
			{
				homeItem[i].parentNode.style.top = y + 'px';
			}
		};
		
		this.init();
}

function setHomeVideo(obj)
{
	var container = d.getElementById(obj);
	var video = getElementsByClassName(container, 'video')[0];
	var details = getElementsByClassName(container, 'details')[0];
	var content = getElementsByClassName(container, 'content')[0];
	//var monthArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	var monthArray = new Array('/ 1', '/ 2', '/ 3', '/ 4', '/ 5', '/ 6', '/ 7', '/ 8', '/ 9', '/ 10', '/ 11', '/ 12');
	var array = FootBallVideoArray;
	var idArray = new Array();
	var total = 4;
	var self = this;
	
	//Get Server Time
	var serverTime = getServerTime();
	var today = new Date();
	var todayTime = (serverTime)?	serverTime:today.getTime();
	
	this.init = function()
	{
		for (var i=0; i<array.length; i++)
		{
			idArray[i] = new Array();
			idArray[i].id = array[i].MATCH;
			idArray[i].date = this.checkTime(array[i].LIVE_DATE, array[i].LIVE_TIME);

		}
		idArray.sort(
			function(a, b)
			{
				return (a.date - b.date);
			}
		);
		idArray.reverse();
		
		this.genVideosList();
	};
	
	this.checkTime = function(date, time)
	{
		var array = date.split('-');
		var year = Number(array[0]);
		var month = Number(array[1]) - 1;
		var date = Number(array[2]);
		var timeArray = time.split(':');
		var hour = Number(timeArray[0]);
		var min = Number(timeArray[1]);
		var thisDate = new Date(year, month, date, hour, min);
		//alert(thisDate);
		
		return thisDate.getTime();
	};
	
	this.checkDate = function(date)
	{
		var array = date.split('-');
		var month = monthArray[Number(array[1]) - 1];
		var date = Number(array[2]);
		return date + ' ' + month;
	};
	
	this.genVideosList = function()
	{
		var num = 0;
		var id = 0;
				
			/*for (var j=0; j<idArray.length; j++)
			{	
				alert("idArray ID: " + idArray[j].id + " Date: " + idArray[j].date);
			}*/
			
			
		for (var j=0; j<idArray.length; j++)
		{
			
			for (var i=0; i<array.length; i++)
			{
	
				if (array[i].MATCH != idArray[j].id)	
				  continue;
				  
				break;
			}
				
			var liveDate = this.checkTime(array[i].LIVE_DATE, array[i].LIVE_TIME);					
			var archiveDate =  this.checkTime(array[i].ARCHIVE_DATE, array[i].ARCHIVE_TIME);
			if (archiveDate < todayTime || liveDate > todayTime )	continue;
			
			var containerDiv = createDiv('', 'clearfix');
			
			var first = createDiv('', 'first');
			var img = createImg(array[i].THUMBNAIL_PATH1);
			first.appendChild(img);
			
			var mid = createDiv('', 'mid');
			var a = createA('javascript:;', '', (array[i].VIDEO_TITLE + '<br /><strong>' + array[i].VIDEO_SHORT_DESC + '</strong>'), i);
			a.onclick = function()
			{
			
			
			if(this.id == "" )
					this.id = 0;
				self.genVideos(this.id);
			}
			mid.appendChild(a);
			
			var last = createDiv('', 'last');
			var div = createDiv();
			div.innerHTML = this.checkDate(array[i].LIVE_DATE) +'<br />' + array[i].LIVE_TIME;
			last.appendChild(div);
			
			containerDiv.appendChild(first);
			containerDiv.appendChild(mid);
			containerDiv.appendChild(last);
			content.appendChild(containerDiv);
			
			num ++;
			if (num == 1 && i > 0)	id = i - 1;
			if (num == total)	break;
		}
		
		this.genVideos(id);
	};
	
	this.genVideos = function(i)
	{
		var w = 280;
		var h = 210;
		var obj = array[i];
		var videoPath = obj.VIDEO_PATH.toLowerCase();
		video.innerHTML = '';
		
		if (videoPath.indexOf('.flv') >= 0)
		{
			//Gen FLV
			var homeVideoFLV = createDiv('homeVideoFLV');
			homeVideoFLV.style.color = '#FFF';
			homeVideoFLV.style.display = 'none';
			homeVideoFLV.innerHTML = 'This site requires JavaScript and ADOBE FLASH PLAYER VERSION 10 or ABOVE.<br />Please visit <a href="https://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank">Adobe website</a> for the latest version.<br /><a href="https://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank"><img src="/football/common/english/images/get_adobe_flash_player.png" alt="Get Adobe Flash Player" /></a>'
			video.appendChild(homeVideoFLV);
			
			setTimeout(function()
			{
				var flashvars = {};
				flashvars.swfPath = '/football/common/english/images/swf/SkinOverAllNoFullNoCaption.swf';
				flashvars.flv = obj.VIDEO_PATH;
				
				var params = {};
				params.allowscriptaccess = 'always';
				params.wmode = 'opaque';
				
				var attributes = {};
				
				swfobject.embedSWF('/football/common/english/images/swf/home_video.swf', 'homeVideoFLV', w, h, '10.0.0', '', flashvars, params, attributes);
				
				d.getElementById('homeVideoFLV').style.display = 'block';
			}, 500);
		}
		else
		{
			var str = '';
			
			if (!isIE)
			{
				//Gen SilverLight
				str += '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="' + w + '" height="' + h + '">';
				str += '	<param name="source" value="/football/common/english/sliverlight/VideoPlayer.xap" />';
				str += '	<param name="Windowless" value="true"/>';
				str += '	<param name="background" value="black" />';
				str += '	<param name="initParams" value="autostart=false,m=' + obj.VIDEO_PATH + '" />';
				str += '	<param name="minruntimeversion" value="2.0.31005.0" />';
				str += '    <param name="Autoplay" value="false"/>';
				str += '	<a href="http://go.microsoft.com/fwlink/?LinkId=124807"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" /></a>';
				str += '</object>';
				
				/*str += '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" height="' + h + 'px" id="slp" style="margin: 0px; width: ' + w + 'px" >' +
'\n  <param name="source" value="/racing/common/chinese/sliverlight/OVP.xap"/>' +
'\n  <param name="enableHtmlAccess" value="true" />' +
'\n  <param name="minRuntimeVersion" value="2.0.30923.0" />' +
'\n  <param name="onload" value="onSilverlightLoad" />' +
'\n  <param name="onerror" value="onSilverlightError" />' +
'\n  <param name="background" value="#EEEEEE" />' +
'\n  <param name="MaxFrameRate" value="30" />' +
'\n  <a href="http://go.microsoft.com/fwlink/?LinkID=124807" style="text-decoration: none;">' +
'\n  <img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style: none"/></a>' +
'\n  <param name="initparams" value=' + "'" + 'showstatistics=false, showlogviewer=false, autoplay=true, muted=false, playlistoverlay=true, ' +
'\n  theme=/racing/common/chinese/sliverlight/theme.xaml, plugins=plugins/AdaptiveEdge.xap, stretchmode=Fit, stretchmodefullscreen=Fit, type=SupportPlayer, ' +
'\n  LogViewer.Transparent = false, mediasource=' + obj.VIDEO_PATH + "' />" +
'\n  </object>';*/
			}
			else
			{
				//Gen MediaPlayer
				str += '<object id="mediaPlayer" width="' + w + '" height="' + h + '" classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" standby="Loading Microsoft Windows Media Player components..." type="application/x-oleobject">';
				str += '<param name="fileName" value="' + obj.VIDEO_PATH + '">';
				str += '<param name="animationatStart" value="true">';
				str += '<param name="transparentatStart" value="true">';
				str += '<param name="autoStart" value="false">';
				str += '<param name="ShowDisplay" value="0">';
				str += '<param name="ShowStatusBar" value="0">';
				str += '<param name="showControls" value="true">';
				str += '<param name="loop" value="true">';
				str += '<embed type="application/x-mplayer2"pluginspage="http://microsoft.com/windows/mediaplayer/en/download/" id="mediaPlayer" name="mediaPlayer" displaysize="4" autosize="-1" bgcolor="darkblue" showcontrols="true" showtracker="-1" showdisplay=0 showstatusbar=0 videoborder3d="-1" width="280" height="210" src="' + obj.VIDEO_PATH + '" autostart="false" designtimesp="5311" loop="true"> </embed>';
				str += '</object>';
				
			}
			video.innerHTML = str;
		}
		
		//Gen Video Details
		var p = details.getElementsByTagName('p')[0];
		p.innerHTML = obj.VIDEO_SHORT_DESC;
	};
	
	this.init();
}

function removeImg()
{
	if (d.getElementById('headerImg'))
	{
		var headerImg = d.getElementById('headerImg');
		headerImg.parentNode.parentNode.removeChild(headerImg.parentNode);
	}
	
	if (d.getElementById('mainNavImg'))
	{
		var mainNavImg = d.getElementById('mainNavImg');
		mainNavImg.parentNode.parentNode.removeChild(mainNavImg.parentNode);
	}
	
	if (d.getElementById('seoImg'))
	{
		var seoImg = d.getElementById('seoImg');
		seoImg.parentNode.parentNode.removeChild(seoImg.parentNode);
	}
	
	if (d.getElementById('footerImg'))
	{
		var footerImg = d.getElementById('footerImg');
		footerImg.parentNode.parentNode.removeChild(footerImg.parentNode);
	}
}

function setFooterYear()
{
	if (!d.getElementById('footer'))	return;
	var footer = d.getElementById('footer');
	var copyright = getElementsByClassName(footer, 'copyright')[0];
	var year = getServerTime('year');
	
	copyright.innerHTML = '版權所有 不得轉載 &copy; 2000-' + year + ' 香港賽馬會';
}

function setDivPosition(id, noMargin)
{
	if (!d.getElementById(id))	return;
	var mainCol = d.getElementById(id);
	//mainCol.style.position = 'relative';
	var divs = setChildNodes(mainCol, 'DIV');
	var divArray = new Array();
	var self = this;
	
	this.init = function()
	{
		for (var i=0; i<divs.length; i++)
		{
			divs[i].style.minHeight = 0;
			divs[i].style.height = 0;
			if (!noMargin)	divs[i].style.margin = 0;
			
			//var div = setChildNodes(divs[i])[0];
			//alert(i  + '  :  ' + div.offsetTop + '  :  ' + div.offsetHeight);
			
			//if (!divs[i].y)	divs[i].y = divs[i].offsetTop;
			//divArray.push({div:divs[i], y:divs[i].y, h:divs[i].offsetHeight});
			
			//divs[i].style.position = 'absolute';
		}
		/*divArray.sort(
			function(a, b)
			{
				return (a.y - b.y);
			}
		);*/
		
		//this.arrangePos();
	};
	
	this.arrangePos = function()
	{
		var tempY = divArray[0].y;
		
		for (var i=0; i<divArray.length; i++)
		{
			divArray[i].div.style.top = tempY + 'px';
			tempY += divArray[i].h;
		}
	};
	
	this.init();
}


//JC POPUPS START

function jcew_museum() {
	var tempwin2=window.open('/chinese/special/2004_archives_museum/am04_index_mu.asp', '','Height=600,Width=780,resizable=1,scrollbars=yes,left=20,top=20');
}

function jcew_knowhorse() {
	var tempwin2=window.open('/chinese/special/2002_horse_info/horses02_index.htm', '','Height=600,Width=780,resizable=1,scrollbars=yes,left=20,top=20');
}

function jcew_hworld() {
	var tempwin2=window.open('/chinese/special/20/hw02_index.htm', '','Height=600,Width=780,resizable=1,scrollbars=yes,left=20,top=20');
}

function know_more_horses() {
	var tempwin2=window.open('//special.hkjc.com/promo/ch/2006_know_more_horses/kmh06_index.asp', '','Height=600,Width=790,resizable=1,scrollbars=yes,left=20,top=20');
}

function jcew_slesson() {
	var tempwin2=window.open('//special.hkjc.com/promo/ch/summer_lesson/playvideo.asp', '','Height=600,Width=788,resizable=1,scrollbars=yes,left=20,top=20');
}

function jcew_rdb() {
	var tempwin2=window.open('//special.hkjc.com/promo/ch/2009_rdb/2009_rdb_index.asp', '','Height=700,Width=818,resizable=1,scrollbars=yes,left=5,top=5');
}

function jcew_prs() {
	var tempwin2=window.open('//corporate.hkjc.com/corporate/chinese/jc-news-and-activities/jc-equestrian-development/public-riding-schools/prs-index.aspx', '','Height=600,Width=800,resizable=1,scrollbars=yes,left=20,top=20');
}

//JC POPUPS END

/*Added on 2010-09-29 for simulcast*/
function compareDates(a, b) {
	var dateA = a.date.split('/')[2]+a.date.split('/')[1]+a.date.split('/')[0];
	var dateB = b.date.split('/')[2]+b.date.split('/')[1]+b.date.split('/')[0];
	return dateA - dateB;
}

function addOption(selectbox, label, value) 
{ 
	var option = d.createElement("option");
	option.text = label;
	option.value = value; 
	try {
		selectbox.add(option, null); //Standard
	}catch(e) {
		selectbox.add(option); // IE only
	} 
	
} 

function setDropDown()
{
	var flag_array = timelineArray;
	flag_array.sort(compareDates);
	
	//Get parameter from URL with "&" separator
	var paravalue = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI("para").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	
	for(var i=flag_array.length-1;i>=0;i--)
	{
		var label='';
		if(!flag_array[i].date2)
		{
			label = flag_array[i].date + ' - ' + flag_array[i].meetingName;
		}
		else
		{
			label = flag_array[i].date + " 至 " + flag_array[i].date2 + " - " + flag_array[i].meetingName;
		}
		
		var value = flag_array[i].meetingUrl;	
		addOption(d.getElementById('dropdown'), label , value);            		
	}
	
	
	var selectedList = d.getElementById('dropdown');
	for(var i=0;i<selectedList.length;i++)
	{
	
		var text = selectedList[i].value.split("=")[1].split("/");
		var option = text[1];
		
			if(option != "" && option !=null && paravalue!=null && paravalue!="" && paravalue.indexOf(option) != -1) {
			
				selectedIndexCnt = i;
				d.getElementById('dropdown').selectedIndex = selectedIndexCnt;
				setRacingNewsImage(flag_array[flag_array.length-1-i].banner, flag_array[flag_array.length-1-i].banner_alt);
			}
	
	}
}

function setRacingNewsImage(imagePath, altText)
{
	d.getElementById("racingBannerImage").innerHTML = "<img src=\""+imagePath+"\" alt=\""+altText+"\" title=\""+altText+"\" />";
}

function changeUrl()
{
var url = (d.getElementById("dropdown").options)[d.getElementById("dropdown").selectedIndex].value;
window.location = url;
}

function switchTimeline(year)
{
	setTimeline('flagContainer', timelineArray,year);
}



function setTimeline(obj,timelineArray,year)
{
	var container = d.getElementById(obj);
	
    var olddiv = container.getElementsByTagName('div');
	
	var j = 0;
	
	var oldtotal = olddiv.length;

	
	
	for ( j=oldtotal-1; j >=0;j--) 
	{
	container.removeChild(olddiv[j]);
	}

	
	var array = timelineArray;
	var curIndex = 0;
	var total = array.length;
	
	var i = 0;
	
    for ( i=0; i<total;i++)	
	{		
	
	    var date = array[i].date;
		var date2 = array[i].date2;
	    var datearray = date.split('/');
		var day = Number(datearray[0]);
		var month = Number(datearray[1]) -1;
		var index=0;
		
		if( 6 < month && month <= 11)
		    index = month - 7;
		else if ( 0 <= month && month < 7)

		    index = month +5 ;
			
		//var point = Math.floor((day/30 )*178) + 178 * index;
		var point = Math.floor((day/30 )*1305) + 1305 * index;
	
		
	    var div = d.createElement('div');
		
		var text = point + "px";
		div.style.left = text;
		
	    var a = createA(array[i].flagUrl, '_self');
		a.rel = array[i].year+""+array[i].date.split('/')[1]+""+array[i].date.split('/')[0];
		if(typeof(meetingid)!='undefined'&&a.rel == meetingid) 
		//if( array[i].flagUrl  == window.location.href) 
		{
			a.className = 'active';
		}
		
		var img = createImg(array[i].flagImg, array[i].imgAlt);
		var span = d.createElement('span');
		
		if(date2!=""){
			span.innerHTML = array[i].date.split("/")[0]+"/"+array[i].date.split("/")[1]+" , "+array[i].date2.split("/")[0]+"/"+array[i].date2.split("/")[1] + "<br/>" + array[i].country + "<br/>";																						 
		}
		else{
			span.innerHTML = array[i].date.split("/")[0]+"/"+array[i].date.split("/")[1] + "<br/>" + array[i].country + "<br/>";																						 
		}
			
			
		if(array[i].year == year )
		{	
			a.appendChild(span);
			a.appendChild(img);
			div.appendChild(a);
		    
			container.appendChild(div);
		}
	};
	
	//check year button is active
	var buttonContainer = d.getElementById("yearBtn");
	var yearA = buttonContainer.getElementsByTagName('a');
	for(var j=0; j<yearA.length; j++){
		yearA[j].className = '';
		if( yearA[j].rel == year) 
		{
			yearA[j].className = ' active';
		}
	}
	if(typeof(meetingid)!='undefined'){
		highlightMeeting(meetingid);
	}
}


/*Added on 2010-09-29 for simulcast*/
function timelineScroll()
{
	var d = document;
	var container = d.getElementById('timelineContainer');
	var btnPrev = getElementsByClassName(container, 'btnPrev')[0];
	var btnNext = getElementsByClassName(container, 'btnNext')[0];
	var mask = getElementsByClassName(container, 'mask')[0];
	var timelineContent = getElementsByClassName(container, 'timelineContent')[0];
	var containerW = timelineContent.offsetWidth*8;
	var maskW = mask.offsetWidth*8;
	var w = timelineContent.getElementsByTagName('li')[0].offsetWidth*8;
	var curIndex = 0;
	var total = Math.ceil((containerW - maskW)/w)*18;
	var timeOut;
	var self = this;
	
	this.init = function()
	{
		btnPrev.onclick = function()
		{
			self.timelineGo(-1);
		};
		btnNext.onclick = function()
		{
			self.timelineGo(1);
		};
		
		//setOpacity(btnPrev, 50);
	};
	
	this.timelineGo = function(num)
	{
		curIndex += num;
		if (curIndex >= total)
		{
			curIndex = total - 1;
			return;
		}
		if (curIndex < 0)
		{
			curIndex = 0;
			return;
		}
		
		timelineContent.L = -(w*curIndex)/12;
		this.motion(timelineContent);
		
		if (curIndex == 0)
		{
			//setOpacity(btnPrev, 50);
		}
		else if (curIndex == 1)
		{
			//setOpacity(btnPrev, 100);
		}
		if (curIndex == total - 1)
		{
			//setOpacity(btnNext, 50);
		}
		else if (curIndex == total - 2)
		{
			//setOpacity(btnNext, 100);
		}
	};
		
	this.motion = function(obj, start)
	{
		if (start)
		{
			obj.style.left = obj.L + 'px';
			return;
		}
		
		obj.objL = obj.offsetLeft;
		
		obj.goStep = (obj.L - obj.objL)/6;
		if (obj.goStep > 0)	obj.goStep = Math.ceil(obj.goStep);
		if (obj.goStep < 0)	obj.goStep = Math.floor(obj.goStep);

		if (!(Math.abs(obj.objL - obj.L) < 1))
		{
			obj.objL += obj.goStep;
			obj.timeOut = setTimeout(function(){self.motion(obj);}, 7);
		}
		else
		{
			obj.objL = obj.L;
			clearTimeout(obj.timeOut);
		}
		
		obj.style.left = obj.objL + 'px';
		//window.status = obj.offsetHeight + '  :  ' + obj.L;
	};
	
	this.init();
}
if (!LevadeLevelArray)	var LevadeLevelArray = new Array();

function setLevadeNav()
{
	var topNav = d.getElementById('simMainNav');
	var navArray = new Array(topNav);
	var self = this;
	
	this.init = function()
	{
		for (var i=0; i<navArray.length; i++)
		{
			this.setHighlightNav(i);
		}
		
		//Highlight Nav
		if (LevadeLevelArray.length > 0)
		{
			var obj = LevadeLevelArray[0];
			var navbtn = d.getElementById(obj);
			navbtn.className += ' active';
			navbtn.isHighlight = true;
		}
	};
	
	this.setHighlightNav = function(id)
	{
		var nav = navArray[id];
		var a = nav.getElementsByTagName('a');
		for (var i=0; i<a.length; i++)
		{
			new this.setMenu(a[i]);
		}
	};
	
	this.setMenu = function(btn)
	{
		var dd = btn.parentNode;
		var time;
		
		var mode = (btn.parentNode.nodeName.toUpperCase() == 'DD')?	1:2;
		
		btn.onmouseover	= function() {btn.hit = true;	showLayer(1, mode); self.btnMenuHit = true;};
		btn.onmouseout	= function() {btn.hit = false;	showLayer(0, mode); self.btnMenuHit = false;};
		
		if (getElementsByClassName(dd, 'pullmenu', true).length)
		{
			var menu = getElementsByClassName(dd, 'pullmenu', true)[0];
			
			menu.onmouseover	= function() {btn.hit = true;	showLayer(1, mode); self.btnMenuHit = true;};
			menu.onmouseout		= function() {btn.hit = false;	showLayer(0, mode); self.btnMenuHit = false;};
			time = 0;
		}
		else
		{
			time = 0;
		}
		
		function showLayer(over, mode)
		{
			if (over == 1)
			{
				if (btn.className.indexOf('active') < 0)
				{
					btnOver(btn, mode, true);
					//if (mode == 1)	self.topSubNavOver(btn, true);
					
				}
				if (menu)
				{
					menu.style.visibility = 'visible';
					self.menuHideSelect(menu, 'hidden');
				}
				else
				{
					if (!self.btnMenuHit)	self.menuHideSelect(menu, 'visible');
				}
			}
			else
			{	
				setTimeout(function()
				{
					if (btn.hit)	return;
					//if (btn.rel != LevadeLevelArray[1])
					//{
						btnOver(btn, mode, false);
						//if (mode == 1)	self.topSubNavOver(btn, false);
					//}
					if (menu)
					{
						menu.style.visibility = 'hidden';
						if (!self.btnMenuHit)	self.menuHideSelect(menu, 'visible');
					}
				}, time);
			}
		}
		
		function btnOver(btn, mode, over)
		{
			if (btn.isHighlight)	return;
			if (over)
			{
				btn.className += ' active';
			}
			else
			{
				btn.className = btn.className.replace(/active/, '');
			}
		}
	};

	this.menuHideSelect = function(div, boolHide)
	{
		var selectHide = false;
		if (isIE)
		{
			var str = Number(navigator.appVersion.indexOf('MSIE ')) + 5;
			var version = Number(navigator.appVersion.substring(str, (str+3)));
			if (version < 7)	selectHide = true;
		}
		if (!selectHide)	return;
		
		var selects = d.getElementsByTagName('select');
		for (var i=0; i<selects.length; i++)
		{
			selects[i].style.visibility = boolHide;
		}
	};
	
	this.init();
}

function setRacingButtonMenu(meetingid,raceCode){
	//alert("setRacingButtonMenu:"+meetingid);
	var paramVenue =window.location.search.split('/')[2];
	if (raceCode.indexOf('undefined') >= 0)	{
		var code = raceCode.split(' - ');
		raceCode = code[0] + ' - ' + 1;
	}
	var array = timelineArray;
	var raceNameArray;
	var buttonNav = d.getElementById("simSubNavButton");
	for(var i=0;i<array.length;i++){
		var id= array[i].year+""+array[i].date.split('/')[1]+""+array[i].date.split('/')[0];
		if(id==meetingid){
			raceNameArray = timelineArray[i].raceName;

			for(var k=0;k<raceNameArray.length;k++){ raceNameArray[k].sortOrder = parseInt(raceNameArray[k].raceCode, 10); }
			raceNameArray.sort(dynamicSortMultiple("meetingVenue", "sortOrder"));			
			
			for(var j=0;j<raceNameArray.length;j++){
			
			/*
			if(raceNameArray[j].meetingVenue!=paramVenue)
			{
				continue;
			}
			*/

				var a;
				var saveA = buttonNav.getElementsByTagName("a");
				var isExist = false;
				if(saveA.length<=0){
				
				var rcode = raceNameArray[j].meetingVenue + " - " + raceNameArray[j].raceCode;
				
					if( rcode==raceCode){
					
							a = createA(raceNameArray[j].url,"_self",raceNameArray[j].name,""," active");
						}
						else{
							a = createA(raceNameArray[j].url,"_self",raceNameArray[j].name);
						}
						a.appendChild(d.createElement('span'));
						buttonNav.appendChild(a);
					}
					else {
					//for(var k=0;k<saveA.length;k++){
						//check the same name
						//if(saveA[k].innerHTML.replace(/^\s*/,"").replace(/\s*$/,"").replace("<span></span>","").replace("<SPAN></SPAN>","")== raceNameArray[j].name.replace(/^\s*/,"").replace(/\s*$/,"")){
						//	isExist = true;
						//}
					//}
					//if(!isExist){
						
					var rcode = raceNameArray[j].meetingVenue + " - " + raceNameArray[j].raceCode;
														
						if(rcode==raceCode){
				
							a = createA(raceNameArray[j].url,"_self",raceNameArray[j].name,""," active");
						}
						else{
							a = createA(raceNameArray[j].url,"_self",raceNameArray[j].name);
						}
						a.appendChild(d.createElement('span'));
						buttonNav.appendChild(a);
				//}
			}
		}
	}
}
}

function dynamicSort(property) {
	var sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1, property.length - 1);
	}
	return function (a, b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	};
}

function dynamicSortMultiple() {
	/*
	 * save the arguments object as it will be overwritten
	 * note that arguments object is an array-like object
	 * consisting of the names of the properties to sort by
	 */
	var props = arguments;
	return function (obj1, obj2) {
		var i = 0, result = 0, numberOfProperties = props.length;
		/* try getting a different result from 0 (equal)
		 * as long as we have extra properties to compare
		 */
		while (result === 0 && i < numberOfProperties) {
			result = dynamicSort(props[i])(obj1, obj2);
			i++;
		}
		return result;
	};
}

function getRacingPath(path){
	var param =window.location.search;
	window.location.href= path+param;
	return false;
}

function SortTimeLineObject(a,b)
{
	var dateA = new Date(a.date.split('/')[2], a.date.split('/')[1]-1, a.date.split('/')[0], 0, 0);
	var dateB = new Date(b.date.split('/')[2], b.date.split('/')[1]-1, b.date.split('/')[0], 0, 0);

	return dateA.getTime() - dateB.getTime();
}

function getPathByCategory(category){
	redirectPathByCategory(category);
}

function redirectPathByCategory(category){

	//Get parameter from URL with "&" separator
	var param = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI("para").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	var hasParam = false;
	if(typeof(param) !='undefined'){
		if(isValidParam(param)){
			hasParam = true;
		}
		else{
			hasParam = false;
		}
	}
	if(!hasParam){
		var serverTime = getServerTime();
		var today = new Date();
		var todayTime = (serverTime)?	serverTime:today.getTime();
		if(sEnabled == "on") {		
			today = new Date(sYear, sMonth-1, sDay, 0, 0);
        		todayTime = today.getTime();		
		}
		var displayTime = 0;
		var displayDate;
		var meetingid = "";
		var meetingVenue = "";
		var raceCode = "";

		//Convert the server date time to date format
		//for further comparison to meeting date		
		var serverCurDateTime = new Date(todayTime);
		var serverCurDate = new Date(serverCurDateTime.getFullYear(), serverCurDateTime.getMonth(), serverCurDateTime.getDate());
		//Sort the time line event to ensure meeting date arranged in ascending order
		timelineArray = timelineArray.sort(SortTimeLineObject);


		for(var i=0;i<timelineArray.length;i++){
			var year = timelineArray[i].year;
			var month = timelineArray[i].date.split("/")[1];
			var day = timelineArray[i].date.split("/")[0];
			var curDate = new Date(year, month-1, day, 0, 0);
			var curTime = curDate.getTime();
			if(i==0){
				displayTime = curTime;
			}
					
			//Get next meeting event for comparison
			//if current handling meeting is "just-before" current datetime
			var nextMeetingDate = new Date(0, 0, 0);					
			var nextMeetingObj = timelineArray[i+1];			
			if (nextMeetingObj != undefined)
			{
				year = nextMeetingObj.year;
				month = nextMeetingObj.date.split("/")[1];
				day = nextMeetingObj.date.split("/")[0];
				nextMeetingDate = new Date(year, month-1, day, 0, 0);
			}

			//If NO next meeting (Current one already the last meeting), set current one as display one (Else case)
			if (nextMeetingObj != undefined)
			{
				//Check if current handling meeting is "just-before" current server datetime
				//Rule: Current looping meeting date <= Server date time <= Next meeting date				
				if (serverCurDate >= curDate &&
			    	    nextMeetingDate >= serverCurDate)
				{					
					if (isBeforeEod(nextMeetingDate, serverCurDateTime, true))
					{	
						if (isBeforeEod(curDate, serverCurDateTime, false))
						{
							meetingid = timelineArray[i].id;
							meetingVenue = timelineArray[i].raceName[0].meetingVenue;
							//get first race code
							raceCode = timelineArray[i].raceName[0].raceCode;
							displayDate = curDate;
							displayTime = displayDate.getTime();							
						}
						else
						{
							meetingid = timelineArray[i + 1].id;
							meetingVenue = timelineArray[i + 1].raceName[0].meetingVenue;
							//get first race code
							raceCode = timelineArray[i + 1].raceName[0].raceCode;
							displayDate = nextMeetingDate;
							displayTime = displayDate.getTime();
						}						
						break;
					} else { continue; }
				}
			}
			else
			{
				//No more next meeting
				
				//Check the last meeting in array is smaller or larger than current server date time.
				
				if (curDate <= serverCurDate)
				{
					meetingid = timelineArray[i].id;
					meetingVenue = timelineArray[i].raceName[0].meetingVenue;
					//get first race code
					raceCode = timelineArray[i].raceName[0].raceCode;
					displayDate = curDate;
					displayTime = displayDate.getTime();
				}else{					

					meetingid = timelineArray[0].id;
					meetingVenue = timelineArray[0].raceName[0].meetingVenue;
					//get first race code
					raceCode = timelineArray[0].raceName[0].raceCode;

					year = timelineArray[0].year;
					month = timelineArray[0].date.split("/")[1];
					day = timelineArray[0].date.split("/")[0];

					displayDate = new Date(year, month-1, day, 0, 0);
					displayTime = displayDate.getTime();
				}
			}
		}
		param ="/"+displayDate.getFullYear()+""+padZero(displayDate.getMonth()+1+"")+""+padZero(displayDate.getDate()+"")+"/"+meetingVenue+"/"+raceCode;
	}
	
	if(category=="index"){
		window.location.href= '/racing/overseas/chinese'+param+'/index.aspx?para='+param;
	}
	if(category=="news"){
		window.location.href= '/racing/overseas/chinese'+param+'/news.aspx?para='+param;
	}
	if(category=="entries"){
		window.location.href= '/racing/overseas/chinese'+param+'/entries.aspx?para='+param;
	}
	if(category=="reference-odds"){
		window.location.href= '/racing/overseas/chinese'+param+'/reference-odds.aspx?para='+param;
	}
	if(category=="tipsters"){
		window.location.href= '/racing/overseas/chinese'+param+'/tipsters.aspx?para='+param;
	}
	if(category=="form-comment"){
		window.location.href= '/racing/overseas/chinese'+param+'/form-comment.aspx?para='+param;
	}
	
	if(category=="form-guide"){
		var seg = param.split('/');
		var date = seg[1];
		var venue = seg[2];
		var raceNum = seg[3];
		var year = date.slice(0,4);
		var month = date.slice(4,6);
		var day = date.slice(6,8);
		var meetingDate = new Date(year, month - 1, day, 0, 0, 0);
		var cutOffDate = new Date(2013, 10, 20, 11, 59, 59);
		
		if (meetingDate.getTime() > cutOffDate.getTime()) {
			window.open('/racing/content/PDF/RaceCard/OSC' + date + '_starter_' + venue + '_r'+ raceNum +'.pdf');
		} else {
			window.open('/racing/content/PDF/RaceCard/OSC' + date + '_starter_r'+ raceNum +'.pdf');
		}
	}
	if(category=="track-analysis"){
		window.location.href= '/racing/overseas/chinese'+param+'/track-analysis.aspx?para='+param;
	}
	if(category=="jockey-trainer-ranking"){
		window.location.href= '/racing/overseas/chinese'+param+'/jockey-trainer-ranking.aspx?para='+param;
	}
	if(category=="expert-column"){
		window.location.href= '/racing/overseas/chinese'+param+'/expert-column.aspx?para='+param;
	}

	return false;
}
function padZero(str){
	if(str.length==1){
		return "0"+str;
	}
	return str;
}

function highlightMeeting(id){
	var container = d.getElementById("flagContainer");
    var olddiv = container.getElementsByTagName('div');
	
	for(var i=0;i<olddiv.length;i++){
		if(olddiv[i].getElementsByTagName('a')[0].rel==id){
			olddiv[i].getElementsByTagName('a')[0].className = "active";
		}
	}
}
