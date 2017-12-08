var syncResult = null;
var callbackMap = new Map();
var browser = {
    isIOS: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1)
            return true;
        else return false;
    }
}
var isIOS = browser.isIOS();
var commonCallback = function (result) {
    var jsonResult = null;
    try {
        if (typeof result != "object") {
            jsonResult = JSON.parse(result);
        } else {
            jsonResult = result;
        }
        var successKey = jsonResult.successKey;
        var failKey = jsonResult.failKey;
        var usefullResult = {};
        if (jsonResult.msg != undefined) {
            usefullResult.msg = jsonResult.msg;
        }
        if (jsonResult.result != undefined) {
            usefullResult.result = jsonResult.result;
        }
        if (jsonResult.header) {
            usefullResult.header = jsonResult.header;
        }
        if (jsonResult.isSuccess) {
            if (callbackMap.containsKey(successKey)) {
                var successCallback = callbackMap.get(successKey);
                successCallback.call(this, usefullResult);
            }
        } else {
            if (callbackMap.containsKey(failKey)) {
                var failCallback = callbackMap.get(failKey);
                failCallback.call(this, usefullResult);
            }
        }
        callbackMap.remove(successKey);
        callbackMap.remove(failKey);
    } catch (e) {
        throw("error:TopMobi+框架方法commonCallback()执行错误！"+e);
    }
}

function commonSyncMethod(iosUrl) {
    var ifr = document.createElement("iframe");
    ifr.src = iosUrl;
    document.body.appendChild(ifr);
    ifr.parentNode.removeChild(ifr);
    ifr = null;
    var result = window.syncResult;
    window.syncResult = null;
    return result;
}
function obj2JavaStr(obj) {
    return JSON.stringify(obj).replace(new RegExp(/(")/g), '\\"');
}
function Map() {
    this.elements = new Array();
    this.size = function () {
        return this.elements.length;
    };
    this.isEmpty = function () {
        return (this.elements.length < 1);
    };
    this.clear = function () {
        this.elements = new Array();
    };
    this.put = function (key, value) {
        this.elements.push({
            key: key,
            value: value
        });
    };
    this.remove = function (key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    this.get = function (key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    };
    this.element = function (index) {
        if (index < 0 || index >= this.elements.length) {
            return null;
        }
        return this.elements[index];
    };
    this.containsKey = function (key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    this.containsValue = function (value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    this.values = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    this.keys = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
}
var topmobi = {native: new Object(), extends: new Object(), sdk: new Object()};
topmobi.extends = {
    encrypt:new Object(),
    filePicker:new Object(),
    docReader:new Object(),
    uploader:new Object(),
    safeKeyboard:new Object(),
    imageViewer:new Object()
};
topmobi.sdk = {
    share:new Object(),
    weather:new Object(),
    location:new Object(),
    qrcode:new Object(),
    speech:new Object()
};
