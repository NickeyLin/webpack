var broadcastMap = new Map();
var sensor = {
    x: null,
    y: null,
    z: null
};
window.addEventListener('deviceorientation', orientationListener, false);
window.addEventListener('MozOrientation', orientationListener, false);
window.addEventListener('devicemotion', orientationListener, false);
function orientationListener() {
    var result = {
        x: null,
        y: null,
        z: null
    };
    try {
        if (!event.gamma && !event.beta) {
            event.gamma = (event.x * (180 / Math.PI));
            event.beta = (event.y * (180 / Math.PI));
            event.alpha = (event.z * (180 / Math.PI));
        }
        var gamma = event.gamma;
        var beta = event.beta;
        var alpha = event.alpha;

        if (event.accelerationIncludingGravity) {
            gamma = event.accelerationIncludingGravity.x * 10;
            beta = -event.accelerationIncludingGravity.y * 10;
            alpha = event.accelerationIncludingGravity.z * 10;
        }
        result.x = alpha;
        result.y = beta;
        result.z = gamma;

        sensorCallack.call(window, result);
    }
    catch (e) {
        throw("error:TopMobi+框架内部异常(orientationListener):" + e.message);
    }
};
function sensorCallack(data) {
    sensor.x = data.x;
    sensor.y = data.y;
    sensor.z = data.z;
}
var boradcastCallback = function (result) {
    try {
        var realCallback = broadcastMap.get(result.action);
        if (realCallback) {
            realCallback.call(this, result.msg);
        }
    } catch (e) {
        throw("error:TopMobi+框架内部异常(boradcastCallback):" + e.message);
    }
}
topmobi.native = {
    common: {
        showMsg: function () {
            var myArgs = arguments;
            var argSize = myArgs.length;
            var msg;
            var location = "bottom";
            var timeLength = 2000;
            if (argSize < 1) {
                throw("error:TopMobi+框架showMsg()方法没有传入显示的消息！");
            } else if (argSize == 1) {
                msg = myArgs[0];
            } else if (argSize == 2) {
                msg = myArgs[0];
                if (typeof myArgs[1] == "number") {
                    timeLength = myArgs[1];
                } else if (typeof myArgs[1] == "string") {
                    if (["top", "middle", "bottom"].indexOf(myArgs[1]) >= 0) {
                        location = myArgs[1];
                    }
                }
            } else {
                msg = myArgs[0];
                if (["top", "middle", "bottom"].indexOf(myArgs[1]) >= 0) {
                    location = myArgs[1];
                }
                if (typeof myArgs[2] == "number") {
                    timeLength = myArgs[2];
                }
            }
            try {
                return window.Native.showMsg(msg, location, timeLength);
            } catch (e) {
                throw("error:TopMobi+框架方法showMsg()执行错误！" + e.message);
            }
        },
        openWindow: function (obj) {
            if (!obj.action.android && !obj.action.ios) {
                throw("error:TopMobi+框架openWindow()方法调用参数格式有误！");
            }
            var windowType = 0;
            var params = null;
            if (obj.windowType) {
                windowType = obj.windowType;
            }
            if (obj.params) {
                params = obj.params;
            }
            try {
                if (isIOS) {
                    return window.Native.openWindow(obj.action.ios, windowType, JSON.stringify(params));

                } else {
                    return window.Native.openWindow(obj.action.android, windowType, JSON.stringify(params));
                }
            } catch (e) {
                throw("error:TopMobi+框架方法openWindow()执行错误！" + e.message);
            }
        },
        closeWindow: function (windowType) {
            var _windowType = 0;
            if (windowType) {
                _windowType = windowType;
            }
            try {
                if (isIOS) {
                    return window.Native.closeWindow(windowType);

                } else {
                    return window.Native.closeWindow();
                }
            } catch (e) {
                throw("error:TopMobi+框架方法closeWindow()执行错误！" + e.message);
            }
        },
        startService: function (obj) {
            if (!obj.action.android && !obj.action.ios) {
                throw("error:TopMobi+框架startService()方法的参数格式有误！");
            }
            var params = null;
            if (obj.params) {
                params = obj.params;
            }
            try {
                if (isIOS) {
                    var iosUrl = "chmobile://com.changhong.native.sync/startService:?param="
                        + JSON.stringify({action: obj.action.ios, params: params});
                    return commonSyncMethod(iosUrl);
                } else {
                    return window.Native.startService(obj.action.android, JSON.stringify(params));
                }
            } catch (e) {
                throw("error:TopMobi+框架方法startService()执行错误！" + e.message);
            }
        },
        log: function (tag, msg) {
            var _tag = ""
            if (tag) {
                _tag = tag;
            }
            try {
                return window.Native.log(_tag, msg);
            } catch (e) {
                throw("error:TopMobi+框架方法log()执行错误！" + e.message);
            }
        },
        getDeviceInfo: function (callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架getDeviceInfo()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "getDeviceInfo_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "getDeviceInfo_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.getDeviceInfo(successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法getDeviceInfo()执行错误！" + e.message);
            }
        },
        screenShot: function (callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架screenShot()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "screenShot_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "screenShot_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.screenShot(successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法screenShot()执行错误！" + e.message);
            }
        },
        getConnecter: function (name, callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架getConnecter()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "getConnecter_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "getConnecter_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.getConnecter(name, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法getConnecter()执行错误！" + e.message);
            }
        },
        getConnecterList: function (callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架getConnecterList()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "getConnecter_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "getConnecter_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.getConnecterList(successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法getConnecterList()执行错误！" + e.message);
            }
        },
        makePhoneCall: function (num) {
            try {
                return window.Native.makePhoneCall(num);
            } catch (e) {
                throw("error:TopMobi+框架方法makePhoneCall()执行错误！" + e.message);
            }
        },
        sendShortMsg: function (num, msg, callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架sendShortMsg()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "sendShortMsg_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "sendShortMsg_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.sendShortMsg(num, msg, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法sendShortMsg()执行错误！" + e.message);
            }
        },
        vibrator: function (timeLength) {
            try {
                return window.Native.vibrator(timeLength);
            } catch (e) {
                throw("error:TopMobi+框架方法vibrator()执行错误！" + e.message);
            }
        },
        notify: function (digest, title, content) {
            try {
                return window.Native.notify(digest, title, content);
            } catch (e) {
                throw("error:TopMobi+框架方法notify()执行错误！" + e.message);
            }
        },
        registerBroadcast: function (action, callback) {
            if (callback) {
                broadcastMap.put(action, callback);
            }
            try {
                return window.Native.registerBroadcast(action);
            } catch (e) {
                throw("error:TopMobi+框架方法registerBroadcast()执行错误！" + e.message);
            }
        },
        unregisterBroadcast: function (action) {
            try {
                return window.Native.unregisterBroadcast(action);
            } catch (e) {
                throw("error:TopMobi+框架方法unregisterBroadcast()执行错误！" + e.message);
            }
        },
        broadcast: function (action, msg) {
            try {
                return window.Native.broadcast(action, msg);
            } catch (e) {
                throw("error:TopMobi+框架方法broadcast()执行错误！" + e.message);
            }
        },
        downloadApp: function (url, name, callbacks) {
            if ((!url) || (!name) || (typeof callbacks != "object")) {
                throw("error:TopMobi+框架downloadApp()方法调用参数格式错误！");
                return;
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "downloadApp_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "downloadApp_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.downloadApp(url, name, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法downloadApp()执行错误！" + e.message);
            }
        },
        unZipApp: function (name, path, callbacks) {
            if ((!path) || (!name) || (typeof callbacks != "object")) {
                throw("error:TopMobi+框架unZipApp()方法调用参数格式错误！");
                return;
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "unZipApp_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "unZipApp_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.unZipApp(name, path, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法unZipApp()执行错误！" + e.message);
            }
        },
        getSDPath: function () {
            try {
                return window.Native.getSDPath();
            } catch (e) {
                throw("error:TopMobi+框架方法getSDPath()执行错误！" + e.message);
            }
        },
        getStorePath: function () {
            try {
                return window.Native.getStorePath();
            } catch (e) {
                throw("error:TopMobi+框架方法getStorePath()执行错误！" + e.message);
            }
        },
        getAppPath: function () {
            try {
                return window.Native.getAppPath();
            } catch (e) {
                throw("error:TopMobi+框架方法getAppPath()执行错误！" + e.message);
            }
        },
		setLongPressEnable: function (enable){			
		    try {
                window.Native.setLongPressEnable(enable);
            } catch (e) {
                throw("error:TopMobi+框架方法getAppPath()执行错误！" + e.message);
            }
		}
    },
    media: {
        mediaPlaye: function (path, type, callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架mediaPlaye()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "mediaPlaye_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "mediaPlaye_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.mediaPlaye(path, type, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法mediaPlaye()执行错误！" + e.message);
            }
        },
        choosePicture: function (photograph, isClipping, callbacks) {
            var _photograph = false;
            var _isClipping = false;
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架choosePicture()方法调用参数格式错误！");
            }
            if (photograph) {
                _photograph = photograph;
            }
            if (isClipping) {
                _isClipping = isClipping;
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "choosePicture_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "choosePicture_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.choosePicture(_photograph, _isClipping, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法choosePicture()执行错误！" + e.message);
            }
        },
        compressPicture: function (isCrop,path, width, height, callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架compressPicture()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "compressPicture_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "compressPicture_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.compressPicture(isCrop,path, width, height, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法compressPicture()执行错误！" + e.message);
            }
        }
    },
    sensor: {
        orientation: function () {
            return sensor;
        }
    },
    network: {
        getNetWorkType: function () {
            try {
                return window.Native.getNetWorkType();
            } catch (e) {
                throw("error:TopMobi+框架方法getNetWorkType()执行错误！" + e.message);
            }
        },
        isNetWorkAvailable: function (callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架isNetWorkAvailable()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "isNetWorkAvailable_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "isNetWorkAvailable_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.isNetWorkAvailable(successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法isNetWorkAvailable()执行错误！" + e.message);
            }
        },
        networkRequest: function (obj) {
            if (typeof obj != "object") {
                throw("error:TopMobi+框架networkRequest()方法调用参数格式错误！");
            }
            if (!obj.url) {
                throw("error:TopMobi+框架networkRequest()方法的请求地址不能为空！");
            }
            this.timeout = 10000;
            if (obj.timeout) {
                this.timeout = obj.timeout;
            }
            this.method = "post";
            if (obj.method) {
                this.method = obj.method;
            }
            this.header = "";
            if (obj.header) {
                this.header = obj.header;
            }
            this.dataCharset = "UTF-8";
            if (obj.dataCharset) {
                this.dataCharset = obj.dataCharset;
            }
            this.contentType = "application/json";
            if (obj.contentType) {
                this.contentType = obj.contentType;
            }
            this.data = "";
            if (obj.data) {
                this.data = obj.data;
            }
            this.url = obj.url;
            this.successKey = "";
            this.failKey = "";
            this.success = null;
            if (obj.success) {
                this.success = obj.success;
                this.successKey = "networkRequest_s_" + new Date().getTime();
                callbackMap.put(this.successKey, this.success);
            }
            this.fail = null;
            if (obj.fail) {
                this.fail = obj.fail;
                this.failKey = "networkRequest_f_" + new Date().getTime();
                callbackMap.put(this.failKey, this.fail);
            }
            try {
				var dataStr = this.data;
                if (this.contentType == "application/json") {
                    dataStr = JSON.stringify(obj.data);
                } else {
                    dataStr = obj.data;
                }
                var headerStr = "";
                if (this.header != "") {
                    headerStr = JSON.stringify(this.header);
                }
                window.Native.networkRequest(this.timeout, this.method, dataStr, this.dataCharset,
                    headerStr, this.contentType, this.url, this.successKey, this.failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法networkRequest()执行错误！" + e.message);
            }
        }
    },
    io: {
        readFile: function (fileName,callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架readFile()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "readFile_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "readFile_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.readFile(fileName,successKey,failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法readFile()执行错误！" + e.message);
            }
        },
        writeFile: function (fileName, msg, callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架writeFile()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "writeFile_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "writeFile_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.writeFile(fileName, msg, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法writeFile()执行错误！" + e.message);
            }
        },
        deleteFile: function (fileName) {
            try {
                return window.Native.deleteFile(fileName);
            } catch (e) {
                throw("error:TopMobi+框架方法deleteFile()执行错误！" + e.message);
            }
        }
    },
    cache: {
        containsSharedValue: function (name, key) {
            try {
                return window.Native.containsSharedValue(name, key);
            } catch (e) {
                throw("error:TopMobi+框架方法containsSharedValue()执行错误！" + e.message);
            }
        },
        getSharedValue: function (name, key) {
            try {
                return window.Native.getSharedValue(name, key);
            } catch (e) {
                throw("error:TopMobi+框架方法getSharedValue()执行错误！" + e.message);
            }
        },
        putSharedValue: function (name, key, value) {
            try {
                var result = window.Native.putSharedValue(name, key, value);
                if (typeof result != "object") {
                    return JSON.parse(result);
                } else {
                    return result;
                }
            } catch (e) {
                throw("error:TopMobi+框架方法putSharedValue()执行错误！" + e.message);
            }
        },
        removeSharedValue: function (name, key) {
            try {
                return window.Native.removeSharedValue(name, key);
            } catch (e) {
                throw("error:TopMobi+框架方法removeSharedValue()执行错误！" + e.message);
            }
        },
        clearSharedCache: function (name) {
            try {
                return window.Native.clearSharedCache(name);
            } catch (e) {
                throw("error:TopMobi+框架方法clearSharedCache()执行错误！" + e.message);
            }
        }
    },
    db: {
        openDataBase: function (path) {
            try {
                var result = window.Native.openDataBase(path);
                if (typeof result != "object") {
                    return JSON.parse(result);
                } else {
                    return result;
                }
            } catch (e) {
                throw("error:TopMobi+框架方法openDataBase()执行错误！" + e.message);
            }
        },
        closeDataBase: function (path) {
            try {
                var result = window.Native.closeDataBase(path);
                if (typeof result != "object") {
                    return JSON.parse(result);
                } else {
                    return result;
                }
            } catch (e) {
                throw("error:TopMobi+框架方法closeDataBase()执行错误！" + e.message);
            }
        },
        execSql: function (path, sql, callbacks) {
            if (typeof callbacks != "object") {
                throw("error:TopMobi+框架execSql()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "execSql_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "execSql_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
            try {
                window.Native.execSql(path, sql, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法execSql()执行错误！" + e.message);
            }
        },
		query : function(path, table, columns, list, callbacks){
			if (typeof callbacks != "object") {
                throw("error:TopMobi+框架query()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "query_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "query_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
			try {
                window.Native.query(path, table, columns, list, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法query()执行错误！" + e.message);
            }
		},
		insert : function(path, table, map, callbacks){
			if (typeof callbacks != "object") {
                throw("error:TopMobi+框架insert()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "insert_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "insert_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
			try {
                window.Native.insert(path, table, map, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法insert()执行错误！" + e.message);
            }
		},
		update : function(path, table, set,list, callbacks){
			if (typeof callbacks != "object") {
                throw("error:TopMobi+框架update()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "update_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "update_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
			try {
                window.Native.update(path, table, set,list, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法update()执行错误！" + e.message);
            }
		},	
		deleteDB : function(path, table, list, callbacks){
			if (typeof callbacks != "object") {
                throw("error:TopMobi+框架deleteDB()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "deleteDB_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "deleteDB_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
			try {
                window.Native.deleteDB(path, table, list, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法deleteDB()执行错误！" + e.message);
            }
		},	
		create : function(path, table, list, callbacks){
			if (typeof callbacks != "object") {
                throw("error:TopMobi+框架create()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "create_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "create_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
			try {
                window.Native.create(path, table, list, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法create()执行错误！" + e.message);
            }
		},	
		alter : function(path, table,type, list, callbacks){
			if (typeof callbacks != "object") {
                throw("error:TopMobi+框架alter()方法调用参数格式错误！");
            }
            var successKey = "";
            var failKey = "";
            if (callbacks.success) {
                successKey = "alter_s_" + new Date().getTime();
                callbackMap.put(successKey, callbacks.success);
            }
            if (callbacks.fail) {
                failKey = "alter_f_" + new Date().getTime();
                callbackMap.put(failKey, callbacks.fail);
            }
			try {
                window.Native.alter(path, table, type,list, successKey, failKey);
            } catch (e) {
                throw("error:TopMobi+框架方法alter()执行错误！" + e.message);
            }
		}			
    }
};
