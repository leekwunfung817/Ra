//VistorAPI.js code Start
/*HKJC code start*/
var WAGdpr = {
	_isEU: false, // default value is false
	mainDomain: ".hkjc.com",
	countryListUrl: "https://common.hkjc.com/wa/eu.aspx",
	cookieRetention: 1440, // isCU cookie retention (in minute)
    isEU: function () {	
		var isEUCookie = this.getIsEUCookie();  
		if (isEUCookie === ""){
			this.checkIsEU();
		}else {
			this._isEU = (isEUCookie === "false") ? false : true ;
		}
        return this._isEU;		
	},
	getIsEUCookie: function () {
		var name = "isEU" + "=";
		var decodedCookie = unescape(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	setIsEUCookie: function (cvalue) {
		var cdomain = window.location.hostname.substr(this.mainDomain.length * -1) === this.mainDomain ? this.mainDomain : window.location.hostname;
		var now = new Date();
		var minutes = this.cookieRetention;
		now.setTime(now.getTime() + (minutes * 60 * 1000));
		var expires = "; expires=" + now.toGMTString();
		document.cookie = "isEU=" + cvalue + expires + "; path=/; domain=" + cdomain;
	},
	checkIsEU: function () { // to check where customer is in EU and put the result to cookie
		try {
			// read eu.js to array
			var arrayCountryList = new Array();
			var request = new XMLHttpRequest();
			request.open("GET", this.countryListUrl, false);
			request.setRequestHeader('Accept', 'application/json');
			request.onreadystatechange = function () {
				if (this.readyState === 4) {
					var objJSON = JSON.parse(this.responseText);
					for (i in objJSON.countryCode) {
						arrayCountryList.push(objJSON.countryCode[i]);
					}
				}
			}
			request.send();

			var CountryCode = "";
			var request2 = new XMLHttpRequest();
			request2.open('GET', 'https://api.ipdata.co?api-key=ac5f659c94717be9e87ee36deff50b57f29b1f12dff205e7c4fbbfd8', false);
			request2.setRequestHeader('Accept', 'application/json');
			request2.onreadystatechange = function () {
				if (this.readyState === 4) {
					var objJSON = JSON.parse(this.responseText);
					CountryCode = objJSON.country_code;
				}
			}
			request2.send();
			
			this._isEU = (arrayCountryList.indexOf(CountryCode) < 0) ? false : true;
			this.setIsEUCookie(this._isEU.toString());
		} catch (e) {
			this._isEU = false;
			this.setIsEUCookie(this._isEU.toString());
		}
	}
}
/*HKJC code end*/
!function e(t,i,n){function r(s,o){if(!i[s]){if(!t[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(a)return a(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var d=i[s]={exports:{}};t[s][0].call(d.exports,function(e){var i=t[s][1][e];return r(i?i:e)},d,d.exports,e,t,i,n)}return i[s].exports}for(var a="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(e,t,i){(function(i){function n(){function e(){h.windowLoaded=!0}i.addEventListener?i.addEventListener("load",e):i.attachEvent&&i.attachEvent("onload",e),h.codeLoadEnd=(new Date).getTime()}/** @license ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============

Adobe Visitor API for JavaScript version: 3.1.2
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
*/
var r=e("./child/ChildVisitor"),a=e("./child/Message"),s=e("./child/makeChildMessageListener"),o=e("./utils/asyncParallelApply"),l=e("./utils/enums"),u=e("./utils/utils"),d=e("./utils/getDomain"),c=e("./units/version"),f=e("./units/crossDomain"),g=e("@adobe-mcid/visitor-js-shared/lib/ids/generateRandomID"),p=e("./units/makeCorsRequest"),m=e("./units/makeDestinationPublishing"),_=e("./utils/constants"),h=function(e,t,n){function r(e){var t=e;return function(e){var i=e||v.location.href;try{var n=S._extractParamFromUri(i,t);if(n)return H.parsePipeDelimetedKeyValues(n)}catch(e){}}}function h(e){function t(e,t){e&&e.match(_.VALID_VISITOR_ID_REGEX)&&t(e)}t(e[k],S.setMarketingCloudVisitorID),S._setFieldExpire(V,-1),t(e[R],S.setAnalyticsVisitorID)}function C(e){e=e||{},S._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",S._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},S._supplementalDataIDLast=e.supplementalDataIDLast||"",S._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function D(e){function t(e,t,i){return i=i?i+="|":i,i+=e+"="+encodeURIComponent(t)}function i(e){var t=H.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}function n(e,i){var n=i[0],r=i[1];return null!=r&&r!==N&&(e=t(n,r,e)),e}var r=e.reduce(n,"");return i(r)}function I(e){var t=20160,i=e.minutesToLive,n="";return(S.idSyncDisableSyncs||S.disableIdSyncs)&&(n=n?n:"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(n=n?n:"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(n=n?n:"Error: config.url is empty"),"undefined"==typeof i?i=t:(i=parseInt(i,10),(isNaN(i)||i<=0)&&(n=n?n:"Error: config.minutesToLive needs to be a positive number")),{error:n,ttl:i}}if(!n||n.split("").reverse().join("")!==e)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var S=this;S.version="3.1.2";var v=i,A=v.Visitor;A.version=S.version,A.AuthState=l.AUTH_STATE,A.OptOut=l.OPT_OUT,v.s_c_in||(v.s_c_il=[],v.s_c_in=0),S._c="Visitor",S._il=v.s_c_il,S._in=v.s_c_in,S._il[S._in]=S,v.s_c_in++,S._log={requests:[]},S.marketingCloudOrgID=e,S.cookieName="AMCV_"+e,S.sessionCookieName="AMCVS_"+e,S.cookieDomain=d(),S.cookieDomain===v.location.hostname&&(S.cookieDomain=""),S.loadSSL=v.location.protocol.toLowerCase().indexOf("https")>=0,S.loadTimeout=3e4,S.CORSErrors=[],S.marketingCloudServer=S.audienceManagerServer="dpm.demdex.net",S.sdidParamExpiry=30;var y=v.document,M=null,b="MC",k="MCMID",E="MCORGID",T="MCCIDH",O="MCSYNCSOP",w="MCIDTS",L="MCOPTOUT",P="A",R="MCAID",F="AAM",x="MCAAMLH",V="MCAAMB",N="NONE",j=function(e){return!Object.prototype[e]},U=p(S,G);S.FIELDS=l.FIELDS,S.cookieRead=function(e){e=encodeURIComponent(e);var t=(";"+y.cookie).split(" ").join(";"),i=t.indexOf(";"+e+"="),n=i<0?i:t.indexOf(";",i+1),r=i<0?"":decodeURIComponent(t.substring(i+2+e.length,n<0?t.length:n));return r},S.cookieWrite=function(e,t,i){var n,r=S.cookieLifetime;if(t=""+t,r=r?(""+r).toUpperCase():"",i&&"SESSION"!==r&&"NONE"!==r){if(n=""!==t?parseInt(r?r:0,10):-60)i=new Date,i.setTime(i.getTime()+1e3*n);else if(1===i){i=new Date;var a=i.getYear();i.setYear(a+2+(a<1900?1900:0))}}else i=0;return e&&"NONE"!==r?(y.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(i?" expires="+i.toGMTString()+";":"")+(S.cookieDomain?" domain="+S.cookieDomain+";":""),S.cookieRead(e)===t):0},S.resetState=function(e){e?S._mergeServerState(e):C()},S._isAllowedDone=!1,S._isAllowedFlag=!1,S.isAllowed=function(){return S._isAllowedDone||(S._isAllowedDone=!0,(S.cookieRead(S.cookieName)||S.cookieWrite(S.cookieName,"T",1))&&(S._isAllowedFlag=!0)),S._isAllowedFlag},S.setMarketingCloudVisitorID=function(e){S._setMarketingCloudFields(e)},S._use1stPartyMarketingCloudServer=!1,S.getMarketingCloudVisitorID=function(e,t){if(S.isAllowed()){S.marketingCloudServer&&S.marketingCloudServer.indexOf(".demdex.net")<0&&(S._use1stPartyMarketingCloudServer=!0);var i=S._getAudienceManagerURLData("_setMarketingCloudFields"),n=i.url;return S._getRemoteField(k,n,e,t,i)}return""},S.getVisitorValues=function(e,t){var i={MCMID:{fn:S.getMarketingCloudVisitorID,args:[!0],context:S},MCOPTOUT:{fn:S.isOptedOut,args:[void 0,!0],context:S},MCAID:{fn:S.getAnalyticsVisitorID,args:[!0],context:S},MCAAMLH:{fn:S.getAudienceManagerLocationHint,args:[!0],context:S},MCAAMB:{fn:S.getAudienceManagerBlob,args:[!0],context:S}},n=t&&t.length?H.pluck(i,t):i;o(n,e)},S._currentCustomerIDs={},S._customerIDsHashChanged=!1,S._newCustomerIDsHash="",S.setCustomerIDs=function(e){function t(){S._customerIDsHashChanged=!1}if(S.isAllowed()&&e){S._readVisitor();var i,n;for(i in e)if(j(i)&&(n=e[i]))if("object"==typeof n){var r={};n.id&&(r.id=n.id),void 0!=n.authState&&(r.authState=n.authState),S._currentCustomerIDs[i]=r}else S._currentCustomerIDs[i]={id:n};var a=S.getCustomerIDs(),s=S._getField(T),o="";s||(s=0);for(i in a)j(i)&&(n=a[i],o+=(o?"|":"")+i+"|"+(n.id?n.id:"")+(n.authState?n.authState:""));S._newCustomerIDsHash=S._hash(o),S._newCustomerIDsHash!==s&&(S._customerIDsHashChanged=!0,S._mapCustomerIDs(t))}},S.getCustomerIDs=function(){S._readVisitor();var e,t,i={};for(e in S._currentCustomerIDs)j(e)&&(t=S._currentCustomerIDs[e],i[e]||(i[e]={}),t.id&&(i[e].id=t.id),void 0!=t.authState?i[e].authState=t.authState:i[e].authState=A.AuthState.UNKNOWN);return i},S.setAnalyticsVisitorID=function(e){S._setAnalyticsFields(e)},S.getAnalyticsVisitorID=function(e,t,i){if(!H.isTrackingServerPopulated()&&!i)return S._callCallback(e,[""]),"";if(S.isAllowed()){var n="";if(i||(n=S.getMarketingCloudVisitorID(function(t){S.getAnalyticsVisitorID(e,!0)})),n||i){var r=i?S.marketingCloudServer:S.trackingServer,a="";S.loadSSL&&(i?S.marketingCloudServerSecure&&(r=S.marketingCloudServerSecure):S.trackingServerSecure&&(r=S.trackingServerSecure));var s={};if(r){var o="http"+(S.loadSSL?"s":"")+"://"+r+"/id",l="d_visid_ver="+S.version+"&mcorgid="+encodeURIComponent(S.marketingCloudOrgID)+(n?"&mid="+encodeURIComponent(n):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":""),u=["s_c_il",S._in,"_set"+(i?"MarketingCloud":"Analytics")+"Fields"];a=o+"?"+l+"&callback=s_c_il%5B"+S._in+"%5D._set"+(i?"MarketingCloud":"Analytics")+"Fields",s.corsUrl=o+"?"+l,s.callback=u}return s.url=a,S._getRemoteField(i?k:R,a,e,t,s)}}return""},S.getAudienceManagerLocationHint=function(e,t){if(S.isAllowed()){var i=S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)});if(i){var n=S._getField(R);if(!n&&H.isTrackingServerPopulated()&&(n=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)})),n||!H.isTrackingServerPopulated()){var r=S._getAudienceManagerURLData(),a=r.url;return S._getRemoteField(x,a,e,t,r)}}}return""},S.getLocationHint=S.getAudienceManagerLocationHint,S.getAudienceManagerBlob=function(e,t){if(S.isAllowed()){var i=S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerBlob(e,!0)});if(i){var n=S._getField(R);if(!n&&H.isTrackingServerPopulated()&&(n=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerBlob(e,!0)})),n||!H.isTrackingServerPopulated()){var r=S._getAudienceManagerURLData(),a=r.url;return S._customerIDsHashChanged&&S._setFieldExpire(V,-1),S._getRemoteField(V,a,e,t,r)}}}return""},S._supplementalDataIDCurrent="",S._supplementalDataIDCurrentConsumed={},S._supplementalDataIDLast="",S._supplementalDataIDLastConsumed={},S.getSupplementalDataID=function(e,t){S._supplementalDataIDCurrent||t||(S._supplementalDataIDCurrent=S._generateID(1));var i=S._supplementalDataIDCurrent;return S._supplementalDataIDLast&&!S._supplementalDataIDLastConsumed[e]?(i=S._supplementalDataIDLast,S._supplementalDataIDLastConsumed[e]=!0):i&&(S._supplementalDataIDCurrentConsumed[e]&&(S._supplementalDataIDLast=S._supplementalDataIDCurrent,S._supplementalDataIDLastConsumed=S._supplementalDataIDCurrentConsumed,S._supplementalDataIDCurrent=i=t?"":S._generateID(1),S._supplementalDataIDCurrentConsumed={}),i&&(S._supplementalDataIDCurrentConsumed[e]=!0)),i},S.getOptOut=function(e,t){if(S.isAllowed()){var i=S._getAudienceManagerURLData("_setMarketingCloudFields"),n=i.url;return S._getRemoteField(L,n,e,t,i)}return""},S.isOptedOut=function(e,t,i){if(S.isAllowed()){t||(t=A.OptOut.GLOBAL);var n=S.getOptOut(function(i){var n=i===A.OptOut.GLOBAL||i.indexOf(t)>=0;S._callCallback(e,[n])},i);return n?n===A.OptOut.GLOBAL||n.indexOf(t)>=0:null}return!1},S._fields=null,S._fieldsExpired=null,S._hash=function(e){var t,i,n=0;if(e)for(t=0;t<e.length;t++)i=e.charCodeAt(t),n=(n<<5)-n+i,n&=n;return n},S._generateID=g,S._generateLocalMID=function(){var e=S._generateID(0);return q.isClientSideMarketingCloudVisitorID=!0,e},S._callbackList=null,S._callCallback=function(e,t){try{"function"==typeof e?e.apply(v,t):e[1].apply(e[0],t)}catch(e){}},S._registerCallback=function(e,t){t&&(null==S._callbackList&&(S._callbackList={}),void 0==S._callbackList[e]&&(S._callbackList[e]=[]),S._callbackList[e].push(t))},S._callAllCallbacks=function(e,t){if(null!=S._callbackList){var i=S._callbackList[e];if(i)for(;i.length>0;)S._callCallback(i.shift(),t)}},S._addQuerystringParam=function(e,t,i,n){var r=encodeURIComponent(t)+"="+encodeURIComponent(i),a=H.parseHash(e),s=H.hashlessUrl(e),o=s.indexOf("?")===-1;if(o)return s+"?"+r+a;var l=s.split("?"),u=l[0]+"?",d=l[1],c=H.addQueryParamAtLocation(d,r,n);return u+c+a},S._extractParamFromUri=function(e,t){var i=new RegExp("[\\?&#]"+t+"=([^&#]*)"),n=i.exec(e);if(n&&n.length)return decodeURIComponent(n[1])},S._parseAdobeMcFromUrl=r(_.ADOBE_MC),S._parseAdobeMcSdidFromUrl=r(_.ADOBE_MC_SDID),S._attemptToPopulateSdidFromUrl=function(t){var i=S._parseAdobeMcSdidFromUrl(t),n=1e9;i&&i.TS&&(n=H.getTimestampInSeconds()-i.TS),i&&i.SDID&&i[E]===e&&n<S.sdidParamExpiry&&(S._supplementalDataIDCurrent=i.SDID,S._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},S._attemptToPopulateIdsFromUrl=function(){var t=S._parseAdobeMcFromUrl();if(t&&t.TS){var i=H.getTimestampInSeconds(),n=i-t.TS,r=Math.floor(n/60);if(r>_.ADOBE_MC_TTL_IN_MIN||t[E]!==e)return;h(t)}},S._mergeServerState=function(e){function t(e){H.isObject(e)&&S.setCustomerIDs(e)}function i(e){return H.isObject(e)?e:JSON.parse(e)}if(e)try{if(e=i(e),e[S.marketingCloudOrgID]){var n=e[S.marketingCloudOrgID];t(n.customerIDs),C(n.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},S._timeout=null,S._loadData=function(e,t,i,n){var r="d_fieldgroup";t=S._addQuerystringParam(t,r,e,1),n.url=S._addQuerystringParam(n.url,r,e,1),n.corsUrl=S._addQuerystringParam(n.corsUrl,r,e,1),q.fieldGroupObj[e]=!0,n===Object(n)&&n.corsUrl&&"XMLHttpRequest"===U.corsMetadata.corsType&&U.fireCORS(n,i,e)},S._clearTimeout=function(e){null!=S._timeout&&S._timeout[e]&&(clearTimeout(S._timeout[e]),S._timeout[e]=0)},S._settingsDigest=0,S._getSettingsDigest=function(){if(!S._settingsDigest){var e=S.version;S.audienceManagerServer&&(e+="|"+S.audienceManagerServer),S.audienceManagerServerSecure&&(e+="|"+S.audienceManagerServerSecure),S._settingsDigest=S._hash(e)}return S._settingsDigest},S._readVisitorDone=!1,S._readVisitor=function(){if(!S._readVisitorDone){S._readVisitorDone=!0;var e,t,i,n,r,a,s=S._getSettingsDigest(),o=!1,l=S.cookieRead(S.cookieName),u=new Date;if(null==S._fields&&(S._fields={}),l&&"T"!==l)for(l=l.split("|"),l[0].match(/^[\-0-9]+$/)&&(parseInt(l[0],10)!==s&&(o=!0),l.shift()),l.length%2===1&&l.pop(),e=0;e<l.length;e+=2)t=l[e].split("-"),i=t[0],n=l[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),o&&(i===T&&(n=""),r>0&&(r=u.getTime()/1e3-60)),i&&n&&(S._setField(i,n,1),r>0&&(S._fields["expire"+i]=r+(a?"s":""),(u.getTime()>=1e3*r||a&&!S.cookieRead(S.sessionCookieName))&&(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[i]=!0)));!S._getField(R)&&H.isTrackingServerPopulated()&&(l=S.cookieRead("s_vi"),l&&(l=l.split("|"),l.length>1&&l[0].indexOf("v1")>=0&&(n=l[1],e=n.indexOf("["),e>=0&&(n=n.substring(0,e)),n&&n.match(_.VALID_VISITOR_ID_REGEX)&&S._setField(R,n))))}},S._appendVersionTo=function(e){var t="vVersion|"+S.version,i=e?S._getCookieVersion(e):null;return i?c.areVersionsDifferent(i,S.version)&&(e=e.replace(_.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},S._writeVisitor=function(){var e,t,i=S._getSettingsDigest();for(e in S._fields)j(e)&&S._fields[e]&&"expire"!==e.substring(0,6)&&(t=S._fields[e],i+=(i?"|":"")+e+(S._fields["expire"+e]?"-"+S._fields["expire"+e]:"")+"|"+t);i=S._appendVersionTo(i),S.cookieWrite(S.cookieName,i,1)},S._getField=function(e,t){return null==S._fields||!t&&S._fieldsExpired&&S._fieldsExpired[e]?null:S._fields[e]},S._setField=function(e,t,i){null==S._fields&&(S._fields={}),S._fields[e]=t,i||S._writeVisitor()},S._getFieldList=function(e,t){var i=S._getField(e,t);return i?i.split("*"):null},S._setFieldList=function(e,t,i){S._setField(e,t?t.join("*"):"",i)},S._getFieldMap=function(e,t){var i=S._getFieldList(e,t);if(i){var n,r={};for(n=0;n<i.length;n+=2)r[i[n]]=i[n+1];return r}return null},S._setFieldMap=function(e,t,i){var n,r=null;if(t){r=[];for(n in t)j(n)&&(r.push(n),r.push(t[n]))}S._setFieldList(e,r,i)},S._setFieldExpire=function(e,t,i){var n=new Date;n.setTime(n.getTime()+1e3*t),null==S._fields&&(S._fields={}),S._fields["expire"+e]=Math.floor(n.getTime()/1e3)+(i?"s":""),t<0?(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[e]=!0):S._fieldsExpired&&(S._fieldsExpired[e]=!1),i&&(S.cookieRead(S.sessionCookieName)||S.cookieWrite(S.sessionCookieName,"1"))},S._findVisitorID=function(e){return e&&("object"==typeof e&&(e=e.d_mid?e.d_mid:e.visitorID?e.visitorID:e.id?e.id:e.uuid?e.uuid:""+e),e&&(e=e.toUpperCase(),"NOTARGET"===e&&(e=N)),e&&(e===N||e.match(_.VALID_VISITOR_ID_REGEX))||(e="")),e},S._setFields=function(e,t){if(S._clearTimeout(e),null!=S._loading&&(S._loading[e]=!1),q.fieldGroupObj[e]&&q.setState(e,!1),e===b){q.isClientSideMarketingCloudVisitorID!==!0&&(q.isClientSideMarketingCloudVisitorID=!1);var i=S._getField(k);if(!i||S.overwriteCrossDomainMCIDAndAID){if(i="object"==typeof t&&t.mid?t.mid:S._findVisitorID(t),!i){if(S._use1stPartyMarketingCloudServer&&!S.tried1stPartyMarketingCloudServer)return S.tried1stPartyMarketingCloudServer=!0,void S.getAnalyticsVisitorID(null,!1,!0);i=S._generateLocalMID()}S._setField(k,i)}i&&i!==N||(i=""),"object"==typeof t&&((t.d_region||t.dcs_region||t.d_blob||t.blob)&&S._setFields(F,t),S._use1stPartyMarketingCloudServer&&t.mid&&S._setFields(P,{id:t.id})),S._callAllCallbacks(k,[i])}if(e===F&&"object"==typeof t){var n=604800;void 0!=t.id_sync_ttl&&t.id_sync_ttl&&(n=parseInt(t.id_sync_ttl,10));var r=B.getRegionAndCheckIfChanged(t,n);S._callAllCallbacks(x,[r]);var a=S._getField(V);(t.d_blob||t.blob)&&(a=t.d_blob,a||(a=t.blob),S._setFieldExpire(V,n),S._setField(V,a)),a||(a=""),S._callAllCallbacks(V,[a]),!t.error_msg&&S._newCustomerIDsHash&&S._setField(T,S._newCustomerIDsHash)}if(e===P){var s=S._getField(R);s&&!S.overwriteCrossDomainMCIDAndAID||(s=S._findVisitorID(t),s?s!==N&&S._setFieldExpire(V,-1):s=N,S._setField(R,s)),s&&s!==N||(s=""),S._callAllCallbacks(R,[s])}if(S.idSyncDisableSyncs||S.disableIdSyncs)B.idCallNotProcesssed=!0;else{B.idCallNotProcesssed=!1;var o={};o.ibs=t.ibs,o.subdomain=t.subdomain,B.processIDCallData(o)}if(t===Object(t)){var l,u;S.isAllowed()&&(l=S._getField(L)),l||(l=N,t.d_optout&&t.d_optout instanceof Array&&(l=t.d_optout.join(",")),u=parseInt(t.d_ottl,10),isNaN(u)&&(u=7200),S._setFieldExpire(L,u,!0),S._setField(L,l)),S._callAllCallbacks(L,[l])}},S._loading=null,S._getRemoteField=function(e,t,i,n,r){var a,s="",o=H.isFirstPartyAnalyticsVisitorIDCall(e),l={MCAAMLH:!0,MCAAMB:!0};if(S.isAllowed()){S._readVisitor(),s=S._getField(e,l[e]===!0);var u=function(){return(!s||S._fieldsExpired&&S._fieldsExpired[e])&&(!S.disableThirdPartyCalls||o)};if(u()){if(e===k||e===L?a=b:e===x||e===V?a=F:e===R&&(a=P),a)return!t||null!=S._loading&&S._loading[a]||(null==S._loading&&(S._loading={}),S._loading[a]=!0,S._loadData(a,t,function(t){if(!S._getField(e)){t&&q.setState(a,!0);var i="";e===k?i=S._generateLocalMID():a===F&&(i={error_msg:"timeout"}),S._setFields(a,i)}},r)),S._registerCallback(e,i),s?s:(t||S._setFields(a,{id:N}),"")}else s||(e===k?(S._registerCallback(e,i),s=S._generateLocalMID(),S.setMarketingCloudVisitorID(s)):e===R?(S._registerCallback(e,i),s="",S.setAnalyticsVisitorID(s)):(s="",n=!0))}return e!==k&&e!==R||s!==N||(s="",n=!0),i&&n&&S._callCallback(i,[s]),s},S._setMarketingCloudFields=function(e){S._readVisitor(),S._setFields(b,e)},S._mapCustomerIDs=function(e){S.getAudienceManagerBlob(e,!0)},S._setAnalyticsFields=function(e){S._readVisitor(),S._setFields(P,e)},S._setAudienceManagerFields=function(e){S._readVisitor(),S._setFields(F,e)},S._getAudienceManagerURLData=function(e){var t=S.audienceManagerServer,i="",n=S._getField(k),r=S._getField(V,!0),a=S._getField(R),s=a&&a!==N?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(S.loadSSL&&S.audienceManagerServerSecure&&(t=S.audienceManagerServerSecure),t){var o,l,u=S.getCustomerIDs();if(u)for(o in u)j(o)&&(l=u[o],s+="&d_cid_ic="+encodeURIComponent(o)+"%01"+encodeURIComponent(l.id?l.id:"")+(l.authState?"%01"+l.authState:""));e||(e="_setAudienceManagerFields");var d="http"+(S.loadSSL?"s":"")+"://"+t+"/id",c="d_visid_ver="+S.version+"&d_rtbd=json&d_ver=2"+(!n&&S._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(S.marketingCloudOrgID)+"&d_nsid="+(S.idSyncContainerID||0)+(n?"&d_mid="+encodeURIComponent(n):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":"")+(M===!0?"&d_coop_safe=1":M===!1?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+s,f=["s_c_il",S._in,e];return i=d+"?"+c+"&d_cb=s_c_il%5B"+S._in+"%5D."+e,{url:i,corsUrl:d+"?"+c,callback:f}}return{url:i}},S.appendVisitorIDsTo=function(e){try{var t=[[k,S._getField(k)],[R,S._getField(R)],[E,S.marketingCloudOrgID]];return S._addQuerystringParam(e,_.ADOBE_MC,D(t))}catch(t){return e}},S.appendSupplementalDataIDTo=function(e,t){if(t=t||S.getSupplementalDataID(H.generateRandomString(),!0),!t)return e;try{var i=D([["SDID",t],[E,S.marketingCloudOrgID]]);return S._addQuerystringParam(e,_.ADOBE_MC_SDID,i)}catch(t){return e}};var H={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,i){var n=e.split("&");return i=null!=i?i:n.length,n.splice(i,0,t),n.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,i){if(e!==R)return!1;var n;return t||(t=S.trackingServer),i||(i=S.trackingServerSecure),n=S.loadSSL?i:t,!("string"!=typeof n||!n.length)&&(n.indexOf("2o7.net")<0&&n.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"+(S.cookieDomain?" domain="+S.cookieDomain+";":"")},isTrackingServerPopulated:function(){return!!S.trackingServer||!!S.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){var t=e.split("|");return t.reduce(function(e,t){var i=t.split("=");return e[i[0]]=decodeURIComponent(i[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",i="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=i[Math.floor(Math.random()*i.length)];return t},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i]&&(e[i]=t);return e},pluck:function(e,t){return t.reduce(function(t,i){return e[i]&&(t[i]=e[i]),t},Object.create(null))}};S._helpers=H;var B=m(S,A);S._destinationPublishing=B,S.timeoutMetricsLog=[];var G,q={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case b:t===!1?this.MCIDCallTimedOut!==!0&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case P:t===!1?this.AnalyticsIDCallTimedOut!==!0&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case F:t===!1?this.AAMIDCallTimedOut!==!0&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};S.isClientSideMarketingCloudVisitorID=function(){return q.isClientSideMarketingCloudVisitorID},S.MCIDCallTimedOut=function(){return q.MCIDCallTimedOut},S.AnalyticsIDCallTimedOut=function(){return q.AnalyticsIDCallTimedOut},S.AAMIDCallTimedOut=function(){return q.AAMIDCallTimedOut},S.idSyncGetOnPageSyncInfo=function(){return S._readVisitor(),S._getField(O)},S.idSyncByURL=function(e){var t=I(e||{});if(t.error)return t.error;var i,n,r=e.url,a=encodeURIComponent,s=B;return r=r.replace(/^https:/,"").replace(/^http:/,""),i=u.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),n=["ibs",a(e.dpid),"img",a(r),t.ttl,"",i],s.addMessage(n.join("|")),s.requestToProcess(),"Successfully queued"},S.idSyncByDataSource=function(e){return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,S.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},S._getCookieVersion=function(e){e=e||S.cookieRead(S.cookieName);var t=_.VERSION_REGEX.exec(e),i=t&&t.length>1?t[1]:null;return i},S._resetAmcvCookie=function(e){var t=S._getCookieVersion();t&&!c.isLessThan(t,e)||H.removeCookie(S.cookieName)},S.setAsCoopSafe=function(){M=!0},S.setAsCoopUnsafe=function(){M=!1},S.init=function(){function i(){if(t&&"object"==typeof t){S.configs=Object.create(null);for(var e in t)j(e)&&(S[e]=t[e],S.configs[e]=t[e]);S.idSyncContainerID=S.idSyncContainerID||0,M="boolean"==typeof S.isCoopSafe?S.isCoopSafe:H.parseBoolean(S.isCoopSafe),S.resetBeforeVersion&&S._resetAmcvCookie(S.resetBeforeVersion),S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl(),S._readVisitor();var i=S._getField(w),n=Math.ceil((new Date).getTime()/_.MILLIS_PER_DAY);S.idSyncDisableSyncs||S.disableIdSyncs||!B.canMakeSyncIDCall(i,n)||(S._setFieldExpire(V,-1),S._setField(w,n)),S.getMarketingCloudVisitorID(),S.getAudienceManagerLocationHint(),S.getAudienceManagerBlob(),S._mergeServerState(S.serverState)}else S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl()}function n(){if(!S.idSyncDisableSyncs&&!S.disableIdSyncs){B.checkDPIframeSrc();var e=function(){var e=B;e.readyToAttachIframe()&&e.attachIframe()};v.addEventListener("load",function(){A.windowLoaded=!0,e()});try{f.receiveMessage(function(e){B.receiveMessage(e.data)},B.iframeHost)}catch(e){}}}function r(){S.whitelistIframeDomains&&_.POST_MESSAGE_ENABLED&&(S.whitelistIframeDomains=S.whitelistIframeDomains instanceof Array?S.whitelistIframeDomains:[S.whitelistIframeDomains],S.whitelistIframeDomains.forEach(function(t){var i=new a(e,t),n=s(S,i);f.receiveMessage(n,t)}))}i(),n(),r()}};h.getInstance=function(e,t){function n(){var t=i.s_c_il;if(t)for(var n=0;n<t.length;n++){var r=t[n];if(r&&"Visitor"===r._c&&r.marketingCloudOrgID===e)return r}}function a(){try{return i.self!==i.parent}catch(e){return!0}}function s(){i.s_c_il.splice(--i.s_c_in,1)}function o(e){var t="TEST_AMCV_COOKIE";return e.cookieWrite(t,"T",1),"T"===e.cookieRead(t)&&(e._helpers.removeCookie(t),!0)}if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var l=n();if(l)return l;var d=e,c=d.split("").reverse().join(""),f=new h(e,null,c);s();var g=u.getIeVersion(),p="number"==typeof g&&g<10;if(p)return f._helpers.replaceMethodsWithFunction(f,function(){});var m=a()&&!o(f)&&i.parent?new r(e,t,f,i.parent):new h(e,t,c);return f=null,m.init(),m},n(),i.Visitor=h,t.exports=h}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./child/ChildVisitor":2,"./child/Message":3,"./child/makeChildMessageListener":4,"./units/crossDomain":8,"./units/makeCorsRequest":9,"./units/makeDestinationPublishing":10,"./units/version":11,"./utils/asyncParallelApply":12,"./utils/constants":14,"./utils/enums":15,"./utils/getDomain":16,"./utils/utils":18,"@adobe-mcid/visitor-js-shared/lib/ids/generateRandomID":19}],2:[function(e,t,i){(function(i){e("../utils/polyfills");var n=e("./strategies/LocalVisitor"),r=e("./strategies/ProxyVisitor"),a=e("./strategies/PlaceholderVisitor"),s=e("../utils/callbackRegistryFactory"),o=e("./Message"),l=e("../utils/enums"),u=l.MESSAGES;t.exports=function(e,t,l,d){function c(e){Object.assign(I,e)}function f(e){Object.assign(I.state,e),I.callbackRegistry.executeAll(I.state)}function g(e){if(!A.isInvalid(e)){v=!1;var t=A.parse(e);I.setStateAndPublish(t.state)}}function p(e){!v&&S&&(v=!0,A.send(d,e))}function m(){var e=!0;c(new n(l._generateID)),I.getMarketingCloudVisitorID(),I.callbackRegistry.executeAll(I.state,e),i.removeEventListener("message",_)}function _(e){if(!A.isInvalid(e)){var t=A.parse(e);v=!1,i.clearTimeout(this.timeout),i.removeEventListener("message",_),c(new r(I)),i.addEventListener("message",g),I.setStateAndPublish(t.state),I.callbackRegistry.hasCallbacks()&&p(u.GETSTATE)}}function h(){var e=250;S&&postMessage?(i.addEventListener("message",_),p(u.HANDSHAKE),this.timeout=setTimeout(m,e)):m()}function C(){i.s_c_in||(i.s_c_il=[],i.s_c_in=0),I._c="Visitor",I._il=i.s_c_il,I._in=i.s_c_in,I._il[I._in]=I,i.s_c_in++}function D(){function e(e){0!==e.indexOf("_")&&"function"==typeof l[e]&&(I[e]=function(){})}Object.keys(l).forEach(e),I.getSupplementalDataID=l.getSupplementalDataID}var I=this,S=t.whitelistParentDomain;I.state={},I.version=l.version,I.marketingCloudOrgID=e;var v=!1,A=new o(e,S);I.callbackRegistry=s(),I.init=function(){C(),D(),c(new a(I)),h()},I.findField=function(e,t){if(I.state[e])return t(I.state[e]),I.state[e]},I.messageParent=p,I.setStateAndPublish=f}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/callbackRegistryFactory":13,"../utils/enums":15,"../utils/polyfills":17,"./Message":3,"./strategies/LocalVisitor":5,"./strategies/PlaceholderVisitor":6,"./strategies/ProxyVisitor":7}],3:[function(e,t,i){var n=e("../utils/enums"),r=n.MESSAGES,a={0:"prefix",1:"orgID",2:"state"};t.exports=function(e,t){this.parse=function(e){try{var t={},i=e.data.split("|");return i.forEach(function(e,i){if(void 0!==e){var n=a[i];t[n]=2!==i?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(i){var n=this.parse(i);if(!n||Object.keys(n).length<2)return!0;var a=e!==n.orgID,s=!t||i.origin!==t,o=Object.keys(r).indexOf(n.prefix)===-1;return a||s||o},this.send=function(i,n,r){var a=n+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{i.postMessage(a,t)}catch(e){}}}},{"../utils/enums":15}],4:[function(e,t,i){var n=e("../utils/enums"),r=e("../utils/utils"),a=n.MESSAGES,s=n.ALL_APIS,o=n.ASYNC_API_MAP,l=n.FIELDGROUP_TO_FIELD;t.exports=function(e,t){function i(){var t={};return Object.keys(s).forEach(function(i){var n=s[i],a=e[n]();r.isValueEmpty(a)||(t[i]=a)}),t}function n(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(i){if(e._loading[i]){var n=l[i];t.push(n)}}),t.length?t:null}function u(t){return function i(r){var a=n();if(a){var s=o[a[0]];e[s](i,!0)}else t()}}function d(e,n){var r=i();t.send(e,n,r)}function c(e){g(e),d(e,a.HANDSHAKE)}function f(e){var t=u(function(){d(e,a.PARENTSTATE)});t()}function g(i){function n(n){r.call(e,n),t.send(i,a.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}var r=e.setCustomerIDs;e.setCustomerIDs=n}return function(e){if(!t.isInvalid(e)){var i=t.parse(e).prefix,n=i===a.HANDSHAKE?c:f;n(e.source)}}}},{"../utils/enums":15,"../utils/utils":18}],5:[function(e,t,i){var n=e("../../utils/enums"),r=n.STATE_KEYS_MAP;t.exports=function(e){function t(){}function i(t,i){var n=this;return function(){var t=e(0,r.MCMID),a={};return a[r.MCMID]=t,n.setStateAndPublish(a),i(t),t}}this.getMarketingCloudVisitorID=function(e){e=e||t;var n=this.findField(r.MCMID,e),a=i.call(this,r.MCMID,e);return"undefined"!=typeof n?n:a()}}},{"../../utils/enums":15}],6:[function(e,t,i){var n=e("../../utils/enums"),r=n.ASYNC_API_MAP;t.exports=function(){Object.keys(r).forEach(function(e){var t=r[e];this[t]=function(t){this.callbackRegistry.add(e,t)}},this)}},{"../../utils/enums":15}],7:[function(e,t,i){var n=e("../../utils/enums"),r=n.MESSAGES,a=n.ASYNC_API_MAP,s=n.SYNC_API_MAP;t.exports=function(){function e(){}function t(e,t){var i=this;return function(){return i.callbackRegistry.add(e,t),i.messageParent(r.GETSTATE),""}}function i(i){var n=a[i];this[n]=function(n){n=n||e;var r=this.findField(i,n),a=t.call(this,i,n);return"undefined"!=typeof r?r:a()}}function n(t){var i=s[t];this[i]=function(){var i=this.findField(t,e);return i||{}}}Object.keys(a).forEach(i,this),Object.keys(s).forEach(n,this)}},{"../../utils/enums":15}],8:[function(e,t,i){(function(e){var i=!!e.postMessage;t.exports={postMessage:function(e,t,n){var r=1;t&&(i?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+r++ +"&"+e))},receiveMessage:function(t,n){var r;try{i&&(t&&(r=function(e){return!("string"==typeof n&&e.origin!==n||"[object Function]"===Object.prototype.toString.call(n)&&n(e.origin)===!1)&&void t(e)}),e.addEventListener?e[t?"addEventListener":"removeEventListener"]("message",r):e[t?"attachEvent":"detachEvent"]("onmessage",r))}catch(e){}}}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,t,i){(function(e){t.exports=function(t,i){return{corsMetadata:function(){var t="none",i=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?t="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(i=!1),Object.prototype.toString.call(e.HTMLElement).indexOf("Constructor")>0&&(i=!1)),{corsType:t,corsCookiesEnabled:i}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new e[this.corsMetadata.corsType]},fireCORS:function(i,n,r){function a(t){var n;try{if(n=JSON.parse(t),n!==Object(n))return void s.handleCORSError(i,null,"Response is not JSON")}catch(e){return void s.handleCORSError(i,e,"Error parsing response as JSON")}try{for(var r=i.callback,a=e,o=0;o<r.length;o++)a=a[r[o]];a(n)}catch(e){s.handleCORSError(i,e,"Error forming callback function")}}var s=this;n&&(i.loadErrorHandler=n);try{var o=this.getCORSInstance();o.open("get",i.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=t.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&a(this.responseText)}),o.onerror=function(e){s.handleCORSError(i,e,"onerror")},o.ontimeout=function(e){s.handleCORSError(i,e,"ontimeout")},o.send(),t._log.requests.push(i.corsUrl)}catch(e){this.handleCORSError(i,e,"try-catch")}},handleCORSError:function(e,i,n){t.CORSErrors.push({corsData:e,error:i,description:n}),e.loadErrorHandler&&("ontimeout"===n?e.loadErrorHandler(!0):e.loadErrorHandler(!1))}}}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,i){(function(i){var n=e("../utils/constants"),r=e("./crossDomain"),a=e("../utils/utils"),s="MCSYNCSOP",o="MCSYNCS",l="MCAAMLH";t.exports=function(e,t){var u=i.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,i="http://fast.",n="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(u.location.href);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(i=e.idSyncSSLUseAkamai?"https://fast.":"https://"),
t=i+this.subdomain+".demdex.net/dest5.html"+n,this.iframeHost=this.getIframeHost(t),this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(u.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:n.POST_MESSAGE_ENABLED?null:100,jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframe:function(){return!e.idSyncDisable3rdPartySyncing&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){n=u.createElement("iframe"),n.sandbox="allow-scripts allow-same-origin",n.title="Adobe ID Syncing iFrame",n.id=i.id,n.name=i.id+"_name",n.style.cssText="display: none; width: 0; height: 0;",n.src=i.url,i.newIframeCreated=!0,t(),u.body.appendChild(n)}function t(){n.addEventListener("load",function(){n.className="aamIframeLoaded",i.iframeHasLoaded=!0,i.requestToProcess()})}this.startedAttachingIframe=!0;var i=this,n=u.getElementById(this.id);n?"IFRAME"!==n.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==n.className?(this.originalIframeHasLoadedAlready=!1,t()):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=n,this.requestToProcess())):e(),this.iframe=n},requestToProcess:function(t){function i(){a.jsonForComparison.push(t),a.jsonWaiting.push(t),a.processSyncOnPage(t)}var r,a=this;if(t===Object(t)&&t.ibs)if(r=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var s,o,l,u=!1;for(s=0,o=this.jsonForComparison.length;s<o;s++)if(l=this.jsonForComparison[s],r===JSON.stringify(l.ibs||[])){u=!0;break}u?this.jsonDuplicates.push(t):i()}else i();if((this.receivedThirdPartyCookiesNotification||!n.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var d=this.jsonWaiting.shift();this.process(d),this.requestToProcess()}!e.idSyncDisableSyncs&&this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){a.messageSendingInterval=n.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,i){var n=e._getField(l),r=t.d_region||t.dcs_region;return n?r&&(e._setFieldExpire(l,i),e._setField(l,r),parseInt(n,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField(s,""),e._setField(o,""),n=r)):(n=r,n&&(e._setFieldExpire(l,i),e._setField(l,n))),n||(n=""),n},processSyncOnPage:function(e){var t,i,n,r;if((t=e.ibs)&&t instanceof Array&&(i=t.length))for(n=0;n<i;n++)r=t[n],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,i,n,r,s,o=encodeURIComponent,l="",u=!1;if((t=e.ibs)&&t instanceof Array&&(i=t.length))for(u=!0,n=0;n<i;n++)r=t[n],s=[o("ibs"),o(r.id||""),o(r.tag||""),a.encodeAndBuildRequest(r.url||[],","),o(r.ttl||""),"",l,r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(s.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,s.join("|")));u&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,i,r){var a="syncOnPage"===r,l=a?s:o;e._readVisitor();var u,d,c=e._getField(l),f=!1,g=!1,p=Math.ceil((new Date).getTime()/n.MILLIS_PER_DAY);c?(u=c.split("*"),d=this.pruneSyncData(u,t.id,p),f=d.dataPresent,g=d.dataValid,f&&g||this.fireSync(a,t,i,u,l,p)):(u=[],this.fireSync(a,t,i,u,l,p))},pruneSyncData:function(e,t,i){var n,r,a,s=!1,o=!1;for(r=0;r<e.length;r++)n=e[r],a=parseInt(n.split("-")[1],10),n.match("^"+t+"-")?(s=!0,i<a?o=!0:(e.splice(r,1),r--)):i>=a&&(e.splice(r,1),r--);return{dataPresent:s,dataValid:o}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,i,n,r,a,s){var o=this;if(t){if("img"===i.tag){var l,u,d,c,f=i.url,g=e.loadSSL?"https:":"http:";for(l=0,u=f.length;l<u;l++){d=f[l],c=/^\/\//.test(d);var p=new Image;p.addEventListener("load",function(t,i,n,r){return function(){o.onPagePixels[t]=null,e._readVisitor();var s,l=e._getField(a),u=[];if(l){s=l.split("*");var d,c,f;for(d=0,c=s.length;d<c;d++)f=s[d],f.match("^"+i.id+"-")||u.push(f)}o.setSyncTrackingData(u,i,n,r)}}(this.onPagePixels.length,i,a,s)),p.src=(c?g:"")+d,this.onPagePixels.push(p)}}}else this.addMessage(n),this.setSyncTrackingData(r,i,a,s)},addMessage:function(t){var i=encodeURIComponent,r=i(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((n.POST_MESSAGE_ENABLED?"":r)+t)},setSyncTrackingData:function(t,i,n,r){t.push(i.id+"-"+(r+Math.ceil(i.ttl/60/24))),this.manageSyncsSize(t),e._setField(n,t.join("*"))},sendMessages:function(){var e,t=this,i="",r=encodeURIComponent;this.regionChanged&&(i=r("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?n.POST_MESSAGE_ENABLED?(e=i+r("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(i+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){r.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,i=/^---destpub-to-parent---/;"string"==typeof e&&i.test(e)&&(t=e.replace(i,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(i){(null==this.url||i.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=i.subdomain||"",this.url=this.getUrl()),i.ibs instanceof Array&&i.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===u.readyState||"loaded"===u.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(i):this.requestToProcess(i),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(i)},canMakeSyncIDCall:function(t,i){return e._forceSyncIDCall||!t||i-t>n.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(u.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/constants":14,"../utils/utils":18,"./crossDomain":8}],11:[function(e,t,i){function n(e){for(var t=/^\d+$/,i=0,n=e.length;i<n;i++)if(!t.test(e[i]))return!1;return!0}function r(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function a(e,t){for(var i=0;i<e.length;i++){var n=parseInt(e[i],10),r=parseInt(t[i],10);if(n>r)return 1;if(r>n)return-1}return 0}function s(e,t){if(e===t)return 0;var i=e.toString().split("."),s=t.toString().split(".");return n(i.concat(s))?(r(i,s),a(i,s)):NaN}t.exports={compare:s,isLessThan:function(e,t){return s(e,t)<0},areVersionsDifferent:function(e,t){return 0!==s(e,t)},isGreaterThan:function(e,t){return s(e,t)>0},isEqual:function(e,t){return 0===s(e,t)}}},{}],12:[function(e,t,i){t.exports=function(e,t){function i(e){return function(i){n[e]=i,r++;var s=r===a;s&&t(n)}}var n={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var n=e[t];if(n.fn){var r=n.args||[];r.unshift(i(t)),n.fn.apply(n.context||null,r)}})}},{}],13:[function(e,t,i){function n(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var i=this.callbacks[e].push(t)-1;return function(){this.callbacks[e].splice(i,1)}},execute:function(e,t){if(this.callbacks[e]){t="undefined"==typeof t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var i=this.callbacks[e].shift();"function"==typeof i?i.apply(null,t):i instanceof Array&&i[1].apply(i[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!r.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var i=void 0!==e[t]?e[t]:"";this.execute(t,i)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}var r=e("./utils");t.exports=n},{"./utils":18}],14:[function(e,t,i){(function(e){t.exports={POST_MESSAGE_ENABLED:!!e.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,i){i.MESSAGES={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},i.STATE_KEYS_MAP={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},i.ASYNC_API_MAP={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut"},i.SYNC_API_MAP={CUSTOMERIDS:"getCustomerIDs"},i.ALL_APIS={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs"},i.FIELDGROUP_TO_FIELD={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},i.FIELDS={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},i.AUTH_STATE={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},i.OPT_OUT={GLOBAL:"global"}},{}],16:[function(e,t,i){(function(e){t.exports=function(t){var i;if(!t&&e.location&&(t=e.location.hostname),i=t)if(/^[0-9.]+$/.test(i))i="";else{var n=",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,",r=i.split("."),a=r.length-1,s=a-1;if(a>1&&r[a].length<=2&&(2===r[a-1].length||n.indexOf(","+r[a]+",")<0)&&s--,s>0)for(i="";a>=s;)i=r[a]+(i?".":"")+i,a--}return i}}).call(this,"undefined"!=typeof window&&"undefined"!=typeof global&&window.global===global?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(e,t,i){Object.assign=Object.assign||function(e){for(var t,i,n=1;n<arguments.length;++n){i=arguments[n];for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e}},{}],18:[function(e,t,i){i.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},i.isValueEmpty=function(e){return""===e||i.isObjectEmpty(e)},i.getIeVersion=function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e;t=null}return null},i.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)}},{}],19:[function(e,t,i){t.exports=function(e){var t,i,n="0123456789",r="",a="",s=8,o=10,l=10;if(1==e){for(n+="ABCDEF",t=0;16>t;t++)i=Math.floor(Math.random()*s),r+=n.substring(i,i+1),i=Math.floor(Math.random()*s),a+=n.substring(i,i+1),s=16;return r+"-"+a}for(t=0;19>t;t++)i=Math.floor(Math.random()*o),r+=n.substring(i,i+1),0===t&&9==i?o=3:(1==t||2==t)&&10!=o&&2>i?o=10:2<t&&(o=10),i=Math.floor(Math.random()*l),a+=n.substring(i,i+1),0===t&&9==i?l=3:(1==t||2==t)&&10!=l&&2>i?l=10:2<t&&(l=10);return r+a}},{}]},{},[1]);
if(!WAGdpr.isEU()){var visitor = Visitor.getInstance("06AB2C1653DB07AD0A490D4B@AdobeOrg", {
    trackingServer: "hkjcweb.sc.omtrdc.net", // same as s.trackingServer
    trackingServerSecure: "hkjcweb.sc.omtrdc.net", // same as s.trackingServerSecure
});}
//VistorAPI.js code End

var isIE = (navigator.appName.indexOf("Microsoft") > -1);
var d = document;
var returnlogin = "//common.hkjc.com/corporate/ProcessLogon.aspx?Lang=C";
var returnpreference = "//common.hkjc.com/corporate/ProcessLogon.aspx?Lang=C&Pref=Y";
var returnlogout = "//common.hkjc.com/corporate/ProcessLogon.aspx?Lang=C&SignOut=true";
var returnregister = "//common.hkjc.com/corporate/ProcessLogon.aspx?Lang=C&Reg=Y";
var returnFAQ = "//common.hkjc.com/utility/faq/chinese/racing/index.aspx";

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

function checkSubDomain()
{
	var host = location.hostname;
	if (host.indexOf('teamsite.hkjc.com') >= 0)	return;
	
	var url = location.href;
	var subDomain = host.substring(0, host.indexOf('.'));
	var path = location.pathname;
	var array = path.split('/');
	var section = null;
	
	for (var i=0; i<sectionArray.length; i++)
	{
		if (sectionArray[i] == array[1])
		{
			section = array[1];
			break;
		}
	}
	
	if (!section)	return;
	if (!subDomain)	return;
	if (subDomain == section)	return;
	location.href = url.replace(subDomain, section);
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
		if (isIE)
		{
			var str = Number(navigator.appVersion.indexOf('MSIE ')) + 5;
			var version = Number(navigator.appVersion.substring(str, (str+1)));
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
	if (alt)	img.setAttribute('alt', alt);
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

function GetParam(name)
{
	var start=location.search.indexOf("?"+name+"=");
	if (start<0) start=location.search.indexOf("&"+name+"=");
 	if (start<0) return '';
 	start += name.length+2;
 	var end=location.search.indexOf("&",start)-1;
 	if (end<0) end=location.search.length;
 	var result=location.search.substring(start,end);
 	var result='';
 	for(var i=start;i<=end;i++)
 	{
 		var c=location.search.charAt(i);
 		result=result+(c=='+'?' ':c);
 	}
 	//alert(unescape(result));
 	return unescape(result);
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

function getServerTime(type)
{
	var xmlHttp = false;

	//get server time
	try
	{
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e)
	{
		try
		{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e2) {}
	}
	
	if (!xmlHttp && typeof(XMLHttpRequest) != 'undefined')
	{
		xmlHttp = new XMLHttpRequest();
	}

	xmlHttp.open('GET', JcrwUrlPrefix + '/GlobalMenu/proxy/server-time-proxy.aspx', false);
	xmlHttp.send(null);

	//alert("xmlHttp.responseText =" + xmlHttp.responseText);
	
	severtime = new Date(xmlHttp.responseText);
	
	//severtime = xmlHttp.responseText;
	
	//alert('severtime:  ' + severtime)
	
	//get server date
	var year = severtime.getFullYear();
	var month = severtime.getMonth() + 1;
	var date = severtime.getDate();

	//get server time
	var hour = severtime.getHours();
	var minu = severtime.getMinutes();
	var seco = severtime.getSeconds();
	var time = severtime.getTime();
	
	if (type == 'date')
	{
		return severtime;
	}
	else if (type == 'year')
	{
		return year;
	}
	else
	{
		return time;
	}
}

function setCookie(name, value, expires, path, domain, secure)
{	
	var curCookie = name + "=" + escape(value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");

	document.cookie = curCookie;
}

function getCookie(name)
{
	if (document.cookie.indexOf(name) < 0)	return null;
	
	var startStr = document.cookie.indexOf(name) + name.length + 1;
	var endStr = document.cookie.indexOf(";", startStr);
	if (endStr == -1)	endStr = document.cookie.length;
	return unescape(document.cookie.substring(startStr, endStr));
}

/** SQ 531884 add function to check the case of the language **/
function changeLanguage()
{
	var array = new Array('english', 'chinese');
	var lang;
	var url = top.location.href;
	var url_lowercase = url.toLowerCase();
	if (top.location.hash)	url = top.location.href.replace(top.location.hash, '');
	if (top.location.hash)	url_lowercase = top.location.href.replace(top.location.hash, '');
	
	for (var i=0; i<array.length; i++)
	{
		if (url_lowercase.indexOf('/' + array[i] + '/') < 0)	continue;
		
		for (var j=0; j<array.length; j++)
		{
			//if (url.indexOf('/' + array[j] + '/') >= 0)	continue;
			if (url_lowercase.indexOf('/' + array[j] + '/') >= 0)	continue;
			//url = url.replace('/' + array[i] + '/', '/' + array[j] + '/');
			var index = url_lowercase.indexOf('/'+ array[i] + '/');
			//alert(url((index+array[j].length+2),url.length-1));
			url = url.substring(0,index)+'/'+array[j]+'/'+url.substring((index+array[j].length+2),url.length);
			lang = array[j];
			break;
		}
		break;
	}
	//Check default no language homepage, append the url with language
	if (!lang)
	{
		var host = location.hostname;
		var subDomain = host.substring(0, host.indexOf('.'));
		lang = array[0];
		url = '/' + subDomain + '/' + lang + '/index.aspx';
	}
	
	var ciArray = new Array('ci=en-us', 'ci=zh-hk');
	if (url.indexOf('ci=') >= 0)
	{
		var num = url.indexOf('ci=');
		var str1 = url.substring(num, num+8);
		var str2 = str1.toLowerCase();
		url = url.replace(str1, str2);
	}
	
	for (var i=0; i<ciArray.length; i++)
	{
		if (url.indexOf(ciArray[i]) < 0)	continue;
		
		for (var j=0; j<ciArray.length; j++)
		{
			if (url.indexOf(ciArray[j]) >= 0)	continue;
			url = url.replace(ciArray[i], ciArray[j]);
			break;
		}
		break;
	}
	
	var expires = new Date();
	expires.setTime(expires.getTime()+(365*24*60*60*1000));
	setCookie('language', lang, expires, '/', location.domain);
	
	window.top.location.href = url;
}

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

function changeIFrameSize(target)
{
	try
	{
		if (parent)
		{
			//document.body.style.display = "block";
			parent.document.getElementById(target).style.height = document.documentElement.scrollHeight + 'px';
		}
	}
	catch (e)
	{
		setTimeout('changeIFrameSize()', 500);
	}
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
			var a = createA(('javascript:NewWindow(\'//' + jsJCEWDomainIP + '/chinese/corporate/racing_news_item.asp?in_file=' + array[i].link + '\', \'racingNews\', 720, 450, 1, 1);'), '_self', array[i].description);
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
	var array = messageArray[0];
	var str = '';
	var self = this;

	this.init = function()
	{
		if (array.show != 'true')	return;
		
		/*var emergency = d.getElementById('emergency');
		emergency.getElementsByTagName('p')[0].innerHTML = array.description;*/
		
		var emergency = createDiv('emergency');
		str += '<img alt="Emergency Message" src="' + JcrwUrlPrefix + '/GlobalMenu/chinese/images/title_emergency.gif"><br />';
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
				str += '	<param name="initParams" value="autostart=true,m=' + obj.VIDEO_PATH + '" />';
				str += '	<param name="minruntimeversion" value="2.0.31005.0" />';
				str += '    <param name="Autoplay" value="true"/>';
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
				str += '<param name="autoStart" value="true">';
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

function setPromoPopup(link, w, h, scroll, resizable, probability)
{
	if (!link || link == '')	return;
	var probability = probability/100;
	
	var randomNum = Math.ceil(Math.random()*10);
	probability = 10 - Number(probability)*10;
	if (randomNum < probability)	return;
	//alert (randomNum + '  :  ' + probability);
	
	var cookieName = 'promoPopupLink';
	
	if (getCookie(cookieName))
	{
		if (getCookie(cookieName) == link)	return;
	}
	var expires = new Date();
	expires.setTime(expires.getTime()+(365*24*60*60*1000));
	setCookie(cookieName, link, expires, '/', location.domain);
	
	NewWindow(link, 'hkjcPromo', w, h, scroll, resizable);
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

function openEasyform(easyformPath, displayLang) {
    if (screen.availHeight >= 700) {
        var easyform = window.open(HkjcWebUrl + easyformPath + "?lang=" + displayLang, "easyform", "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,screenX=0,screenY=0,left=0,top=0,maximize=1");
    } else {
        var easyform = window.open(HkjcWebUrl + easyformPath + "?lang=" + displayLang, "easyform", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,screenX=0,screenY=0,left=0,top=0,maximize=1");
    }
    easyform.focus();
}

function jcew_openCurrentOdds() {
	var tempwin2=window.open('//bet.hkjc.com/default.aspx?url=/racing/pages/odds_wp.aspx&lang=ch','','toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=600,top=80,left=80');
}

function jcew_openCTC() {
    var tempwin2 = window.open('//ctc.hkjc.com/ch/index.aspx', '', 'toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=600,top=80,left=80');
}

function jcew_openEasyWin() {
	openEasyform('/easyform/popIndex.asp', 'tc');
}

function openEasyformShortcut(easyformPath, raceNo, displayLang){
	if(screen.availHeight >= 700){
		var easyform = window.open(easyformPath + "?shortcut=30&raceNo="+raceNo+"&lang="+displayLang, "easyform","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,screenX=0,screenY=0,left=0,top=0,maximize=1");
	}else{
		var easyform = window.open(easyformPath + "?shortcut=30&raceNo="+raceNo+"&lang="+displayLang, "easyform","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,screenX=0,screenY=0,left=0,top=0,maximize=1");
	}
	easyform.focus();
}

function jcew_allupcalculator(url) {
    if (url.toLowerCase().indexOf("local") > -1) {
        var tempwin2 = window.open(url, '', 'width=750,height=640');
    }
    else {
        var tempwin2 = window.open(url, '', 'width=750,height=700');
    }
}

function jcew_investcalculator() {
	var tempwin2=window.open('//analysis.hkjc.com/racing/ch/calculator/racingcalculator.html','','width=680,height=570,resizable');
}

function jcew_simulcast_openWin() {
	var tempwin2=window.open('//' + jsJCEWDomainIP + '/chinese/special/Simulcast_races/index.asp', 'simulWin','Height=600,Width=780,resizable=1,scrollbars=yes,menubar=1,toolbar=1,left=20,top=20');
}

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
	var tempwin2=window.open('http://www.hkjcridingschools.com/chinese/riding_schools_index.asp', '','Height=600,Width=800,resizable=1,scrollbars=yes,left=20,top=20');
}

function openPowerFigures() {
    var tempwin2 = window.open('/racing/features/2013-power-figures/2013-power-figures.aspx?b_cid=EWRHTMC_PowerFigures', '', 'Height=590,Width=470,resizable=0,scrollbars=0,left=20,top=20');
}

function openPowerFiguresBottomLink() {
    var tempwin2 = window.open('/racing/features/2013-power-figures/2013-power-figures.aspx?b_cid=EWRHBLC_PowerFigures', '', 'Height=590,Width=470,resizable=0,scrollbars=0,left=20,top=20');
}
//JC POPUPS END

function redirectPage(action) {

  var url = "";
  var returnURL = window.top.location.href;
      returnURL = encodeURIComponent(returnURL);  
  
  if( action == "login") {
     url = returnlogin + "&ReturnURL=" + returnURL;
	  window.top.location.href = url;
	 } else if( action == "logout") {
	 
	            alert("如你正在其他視窗開啟馬會網上服務，該等服務亦會同時被登出，如有需要請關閉該等視窗。");
				url = returnlogout + "&ReturnURL=" + returnURL;
				 window.top.location.href = url;
			} else if ( action == "register") {
					url = returnregister;
					 window.top.location.href = url;
				}
				else if ( action == "preference") {
						url =  returnpreference;
						 window.top.location.href = url;
				}
				else if ( action == "help") {
				        window.open(returnFAQ);
				}
				
  	
}

function setReturnLoginURL(url) {

   returnlogin = url;

}

function setReturnLogoutURL(url) {

   returnlogout = url;

}

function setReturnPreferenceURL(url) {

   returnpreference = url;

}

function setReturnRegisterURL(url) {

   returnregister = url;

}

function showDisplayName(displayname, salutation, lastname, lastnamechinese) {

  var showname = displayname;
   

   if(salutation == "Mr." || salutation == "Mr")
     salutation = "先生";
	 
   if(salutation == "Ms." || salutation == "Ms")
     salutation = "女仕";
	
   if(salutation == "Miss." || salutation == "Miss")
     salutation = "小姐";
	 
   if(salutation == "Mrs." || salutation == "Mrs")
     salutation = "太太";
	
 if(displayname == "" || displayname == null ) 
  {

  if(lastnamechinese == "" || lastnamechinese == null)
      showname = lastname + salutation;
  else
      showname = lastnamechinese + salutation;  
  }
  
  var name = "    你好 " + showname + "    ";
  
  return name;
    
    
}


/*Added on 2010-09-29 for simulcast*/
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
			
		var point = Math.floor((day/30 )*178) + 178 * index;
		

		
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
			span.innerHTML = array[i].date.split("/")[0]+"/"+array[i].date.split("/")[1]+" - "+array[i].date2.split("/")[0]+"/"+array[i].date2.split("/")[1] + "<br/>" + array[i].country + "<br/>";																						 
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
	highlightMeeting(meetingid);
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
	var containerW = timelineContent.offsetWidth;
	var maskW = mask.offsetWidth;
	var w = timelineContent.getElementsByTagName('li')[0].offsetWidth;
	var curIndex = 0;
	var total = Math.ceil((containerW - maskW)/w);
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
		
		setOpacity(btnPrev, 50);
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
		
		timelineContent.L = -w*curIndex;
		this.motion(timelineContent);
		
		if (curIndex == 0)
		{
			setOpacity(btnPrev, 50);
		}
		else if (curIndex == 1)
		{
			setOpacity(btnPrev, 100);
		}
		if (curIndex == total - 1)
		{
			setOpacity(btnNext, 50);
		}
		else if (curIndex == total - 2)
		{
			setOpacity(btnNext, 100);
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
			var version = Number(navigator.appVersion.substring(str, (str+1)));
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
	var array = timelineArray;
	var raceNameArray;
	var buttonNav = d.getElementById("simSubNavButton");
	for(var i=0;i<array.length;i++){
		var id= array[i].year+""+array[i].date.split('/')[1]+""+array[i].date.split('/')[0];
		if(id==meetingid){
			raceNameArray = timelineArray[i].raceName;
			for(var j=0;j<raceNameArray.length;j++){
				var a;
				var saveA = buttonNav.getElementsByTagName("a");
				var isExist = false;
				if(saveA.length<=0){
					if(raceNameArray[j].raceCode==raceCode){
							a = createA(raceNameArray[j].url,"target",raceNameArray[j].name,""," active");
						}
						else{
							a = createA(raceNameArray[j].url,"target",raceNameArray[j].name);
						}
						a.appendChild(d.createElement('span'));
						buttonNav.appendChild(a);
				}
				else {
					for(var k=0;k<saveA.length;k++){
						//check the same name
						if(saveA[k].innerHTML.replace(/^\s*/,"").replace(/\s*$/,"").replace("<span></span>","").replace("<SPAN></SPAN>","")== raceNameArray[j].name.replace(/^\s*/,"").replace(/\s*$/,"")){
							isExist = true;
						}
					}
					if(!isExist){
						
						if(raceNameArray[j].raceCode==raceCode){
							a = createA(raceNameArray[j].url,"target",raceNameArray[j].name,""," active");
						}
						else{
							a = createA(raceNameArray[j].url,"target",raceNameArray[j].name);
						}
						a.appendChild(d.createElement('span'));
						buttonNav.appendChild(a);
					}
				}
			}
		}
	}
}

function getRacingPath(path){
	var param =window.location.search;
	window.location.href= path+param;
	return false;
}

function getPathByCategory(category){
	var param =window.location.search.split('=')[1];
	if(typeof(param) !='undefined'){
		param = window.location.search.split('=')[1];
	}
	else{
		//get default
		param = "/"+displayDate.getFullYear()+""+padZero(displayDate.getMonth()+"")+""+padZero(displayDate.getDate()+"")+"/"+meetingVenue+"/"+raceCode;
	}
	
	if(category=="index"){
		window.location.href= '/racing/overseas/chinese'+param+'/index.aspx?param='+param;
	}
	if(category=="news"){
		window.location.href= '/racing/overseas/chinese'+param+'/news.aspx?param='+param;
	}
	if(category=="entries"){
		window.location.href= '/racing/overseas/chinese'+param+'/entries.aspx?param='+param;
	}
	if(category=="reference-odds"){
		window.location.href= '/racing/overseas/chinese'+param+'/reference-odds.aspx?param='+param;
	}
	if(category=="tipsters"){
		window.location.href= '/racing/overseas/chinese'+param+'/tipsters.aspx?param='+param;
	}
	if(category=="form-comment"){
		window.location.href= '/racing/overseas/chinese'+param+'/form-comment.aspx?param='+param;
	}
	return false;
}

function redirectPathByCategory(category){
	var param =window.location.search.split('=')[1];
	if(typeof(param) !='undefined'){
		param = window.location.search.split('=')[1];
	}
	else{
		var serverTime = getServerTime();
		var today = new Date();
		var todayTime = (serverTime)?	serverTime:today.getTime();
		var displayTime = 0;
		var displayDate;
		var meetingid = "";
		var meetingVenue = "";
		var raceCode = "";
		
		for(var i=0;i<timelineArray.length;i++){
			var year = timelineArray[i].year;
			var month = timelineArray[i].date.split("/")[1];
			var day = timelineArray[i].date.split("/")[0];
			var curDate = new Date(year, month, day, 0, 0);
			var curTime = curDate.getTime();
			if(i==0){
				displayTime = curTime;
			}
			//simulcast date to be displayed
			if(curTime < todayTime && displayTime<todayTime){
				meetingid = timelineArray[i].id;
				meetingVenue = timelineArray[i].meetingVenue;
				//get first race code
				raceCode = timelineArray[i].raceName[0].raceCode;
				displayDate = curDate;
			}
			else if(curTime>todayTime && curTime <= displayTime){
				meetingid = timelineArray[i].id;
				meetingVenue = timelineArray[i].meetingVenue;
				//get first race code
				raceCode = timelineArray[i].raceName[0].raceCode;
				displayDate = curDate;
			}
		}
		param ="/"+displayDate.getFullYear()+""+padZero(displayDate.getMonth()+"")+""+padZero(displayDate.getDate()+"")+"/"+meetingVenue+"/"+raceCode;
	}
	if(category=="index"){
		window.location.href= '/racing/overseas/chinese'+param+'/index.aspx?param='+param;
	}
	if(category=="news"){
		window.location.href= '/racing/overseas/chinese'+param+'/news.aspx?param='+param;
	}
	if(category=="entries"){
		window.location.href= '/racing/overseas/chinese'+param+'/entries.aspx?param='+param;
	}
	if(category=="reference-odds"){
		window.location.href= '/racing/overseas/chinese'+param+'/reference-odds.aspx?param='+param;
	}
	if(category=="tipsters"){
		window.location.href= '/racing/overseas/chinese'+param+'/tipsters.aspx?param='+param;
	}
	if(category=="form-comment"){
		window.location.href= '/racing/overseas/chinese'+param+'/form-comment.aspx?param='+param;
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