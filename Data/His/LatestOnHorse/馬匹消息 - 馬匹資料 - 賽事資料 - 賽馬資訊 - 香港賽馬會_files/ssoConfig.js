if (typeof (SSOConfig) == 'undefined') {
SSOConfig = (function() {

var extendUrl = '//common.hkjc.com/corporate/Extend.aspx?callback=?';
var userProfileUrl = 'https://wcip.hkjc.com/loadaccinfo.aspx?EP=CORP&LAINR=1';

var debugMode = false;
var getExtendUrl = function() { return extendUrl; };
var getUserProfileUrl = function() { return userProfileUrl; };
var isDebugMode = function() { return debugMode;};
var setDebugMode = function(value) { debugMode = value; };

return {
    getExtendUrl: getExtendUrl,
    getUserProfileUrl: getUserProfileUrl,
    isDebugMode: isDebugMode,
    setDebugMode: setDebugMode
}
})();
}