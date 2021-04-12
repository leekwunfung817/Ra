var SSOCore = {
    CookieDomain: function() { return ".hkjc.com"; },
    Version: function() { return "1.4.1.0"; },
    SLPExtensionURL: function() { return ""; },
    SLPExtensionIFrameID: function() { return "__HKJCSSO__CLIENT_SLP_EXTEND__"; },
    GracePeriodDuraitonMs: function() { return 1200000; }, //20 mins
    GracePeriodCookieName: function() { return "HKJCSSOGP"; },
    ExtendSLP: function() {
        if (SSOCore.IsExtendRequired()) {
            SSOCore.SetLastExtendTS();
            SSOCore.MakeExtendCall();
        }
    },
    IsExtendRequired: function() {
        var nLastExtendTS = SSOCore.GetLastExtendTS();

        if (nLastExtendTS == -1 || (new Date().valueOf() - nLastExtendTS) > SSOCore.GracePeriodDuraitonMs()) {
            return true;
        }
        return false;
    },
    GetLastExtendTS: function() {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(SSOCore.GracePeriodCookieName() + "=");
            if (c_start != -1) {
                c_start = c_start + SSOCore.GracePeriodCookieName().length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return parseInt(unescape(document.cookie.substring(c_start, c_end)), 10);
            }
        }
        return -1;
    },
    SetLastExtendTS: function() {
        document.cookie =
			SSOCore.GracePeriodCookieName() + "=" + new Date().valueOf() +
			";path=/;domain=" + SSOCore.CookieDomain() + ";";
    },
    MakeExtendCall: function() {
        var ifrm = document.getElementById(SSOCore.SLPExtensionIFrameID());
        if (ifrm != null) {
            document.body.removeChild(ifrm);
        }

        var ifrm = document.createElement("IFRAME");
        ifrm.id = SSOCore.SLPExtensionIFrameID();
        ifrm.setAttribute("src", SSOCore.SLPExtensionURL());
        ifrm.style.width = "0px";
        ifrm.style.height = "0px";
        ifrm.style.display = "none";
        document.body.appendChild(ifrm);
    },
    AttachAllIFrameOnLoad: function() {
        var iFrames = document.getElementsByTagName("IFRAME");
        for (var i = 0; i < iFrames.length; i++) {
            if (iFrames[i].id != SSOCore.SLPExtensionIFrameID()) {
                if (iFrames[i].addEventListener) {
                    iFrames[i].addEventListener("load", SSOCore.ExtendSLP, false);
                } else {
                    iFrames[i].attachEvent("onload", SSOCore.ExtendSLP);
                }
            }
        }
    }
}