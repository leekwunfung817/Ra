var returnlogin = "http:" + SSOCommonPath + "ProcessLogon.aspx?Lang=C";
var returnpreference = "http:" + SSOCommonPath + "ProcessLogon.aspx?Lang=C&Pref=Y";
var returnlogout = "http:" + SSOCommonPath + "ProcessLogon.aspx?Lang=C&SignOut=true";
var returnregister = "http:" + SSOCommonPath + "ProcessLogon.aspx?Lang=C&Reg=Y";
var returnFAQ = "http://common.hkjc.com/utility/faq/chinese/index.aspx";

function redirectPage(action) {

    var url = "";
    var returnURL = window.top.location.href;
    returnURL = encodeURIComponent(returnURL);

    if (action == "login") {
        url = returnlogin + "&ReturnURL=" + returnURL;
        window.top.location.href = url;
    } else if (action == "logout") {
        alert("如你正在其他視窗開啟馬會網上服務，該等服務亦會同時被登出，如有需要請關閉該等視窗。");
        url = returnlogout + "&ReturnURL=" + returnURL;
        window.top.location.href = url;
    } else if (action == "register") {
        url = returnregister;
        window.top.location.href = url;
    }
    else if (action == "preference") {
        url = returnpreference + "&ReturnURL=" + returnURL;
        window.top.location.href = url;
    }
    else if (action == "help") {
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
    if (salutation == "Mr." || salutation == "Mr")
        salutation = "先生";
    if (salutation == "Ms." || salutation == "Ms")
        salutation = "女士";
    if (salutation == "Miss." || salutation == "Miss")
        salutation = "小姐";
    if (salutation == "Mrs." || salutation == "Mrs")
        salutation = "太太";
    if (displayname == "" || displayname == null) {
        if (lastnamechinese == "" || lastnamechinese == null)
            showname = lastname + salutation;
        else
            showname = lastnamechinese + salutation;
    }
    return "    你好 " + showname + "    ";
}

var strlogin = "login";
var strregister = "register";
var strpreference = "preference";
var strlogout = "logout";
var strhelp = "help"

function showLogin() {
    if (typeof (readyToShowLoginBar) == 'undefined') {
        setTimeout(showLogin, 250);
        return;
    }
    var refreshGlobalLoginControl = function() {
        try {
            if (!WCIPCookie.isLoggedIn()) {
                document.getElementById("globalLoginControl").innerHTML =
          '<a class="login" href="javascript:redirectPage(strlogin)">登入</a>' +
          ' / ' +
          '<a href="javascript:redirectPage(strregister)">登記</a>' +
		  '<a href="javascript:redirectPage(strhelp)" class="faq">常見問題</a>';
            } else {
                document.getElementById("globalLoginControl").innerHTML =
          '<span id="hkjc_greeting_name">' + showDisplayName(WCIPCookie.getDisplayName(), WCIPCookie.getSalutation(), WCIPCookie.getLastName(), WCIPCookie.getLastNameChinese()) + '</span>' +
          '<a class="logout" href="javascript:redirectPage(strlogout)"> ' +
          ' 登出</a>' +
          ' / ' +
          '<a href="javascript:redirectPage(strpreference)">偏好設定</a>' +
          '<a href="javascript:redirectPage(strhelp)" class="faq">常見問題</a>';
            }
        } catch (e) { }
    }
    refreshGlobalLoginControl();
    SSO.OnUserProfileLoaded(refreshGlobalLoginControl);
}