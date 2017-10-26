/**
 * Created by JiaXin on 2017/6/22.
 */
let GPS = {
	PI: 3.14159265358979324,
	x_pi: 3.14159265358979324 * 3000.0 / 180.0,
	delta: function (lat, lng) {
		// Krasovsky 1940
		//
		// a = 6378245.0, 1/f = 298.3
		// b = a * (1 - f)
		// ee = (a^2 - b^2) / a^2;
		var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
		var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
		var dLat = this.transformLat(lng - 105.0, lat - 35.0);
		var dlng = this.transformLng(lng - 105.0, lat - 35.0);
		var radLat = lat / 180.0 * this.PI;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
		dlng = (dlng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
		return {'lat': dLat, 'lng': dlng};
	},

	//WGS-84 to GCJ-02
	gcj_encrypt: function (wgsLat, wgslng) {
		if (this.outOfChina(wgsLat, wgslng)) return {'lat': wgsLat, 'lng': wgslng};

		var d = this.delta(wgsLat, wgslng);
		return {'lat': wgsLat + d.lat, 'lng': wgslng + d.lng};
	},
	//GCJ-02 to WGS-84
	gcj_decrypt: function (gcjLat, gcjlng) {
		if (this.outOfChina(gcjLat, gcjlng))
			return {'lat': gcjLat, 'lng': gcjlng};

		var d = this.delta(gcjLat, gcjlng);
		return {'lat': gcjLat - d.lat, 'lng': gcjlng - d.lng};
	},
	//GCJ-02 to WGS-84 exactly
	gcj_decrypt_exact: function (gcjLat, gcjlng) {
		var initDelta = 0.01;
		var threshold = 0.000000001;
		var dLat = initDelta, dlng = initDelta;
		var mLat = gcjLat - dLat, mlng = gcjlng - dlng;
		var pLat = gcjLat + dLat, plng = gcjlng + dlng;
		var wgsLat, wgslng, i = 0;
		while (1) {
			wgsLat = (mLat + pLat) / 2;
			wgslng = (mlng + plng) / 2;
			var tmp = this.gcj_encrypt(wgsLat, wgslng)
			dLat = tmp.lat - gcjLat;
			dlng = tmp.lng - gcjlng;
			if ((Math.abs(dLat) < threshold) && (Math.abs(dlng) < threshold))
				break;

			if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;
			if (dlng > 0) plng = wgslng; else mlng = wgslng;

			if (++i > 10000) break;
		}
		return {'lat': wgsLat, 'lng': wgslng};
	},
	//GCJ-02 to BD-09
	bd_encrypt: function (gcjLat, gcjlng) {
		var x = gcjlng, y = gcjLat;
		var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
		var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
		var bdlng = z * Math.cos(theta) + 0.0065;
		var bdLat = z * Math.sin(theta) + 0.006;
		return {'lat': bdLat, 'lng': bdlng};
	},
	//BD-09 to GCJ-02
	bd_decrypt: function (bdLat, bdlng) {
		var x = bdlng - 0.0065, y = bdLat - 0.006;
		var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
		var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
		var gcjlng = z * Math.cos(theta);
		var gcjLat = z * Math.sin(theta);
		return {'lat': gcjLat, 'lng': gcjlng};
	},
	//WGS-84 to Web mercator
	//mercatorLat -> y mercatorlng -> x
	mercator_encrypt: function (wgsLat, wgslng) {
		var x = wgslng * 20037508.34 / 180.;
		var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
		y = y * 20037508.34 / 180.;
		return {'lat': y, 'lng': x};
		/*
		 if ((Math.abs(wgslng) > 180 || Math.abs(wgsLat) > 90))
		 return null;
		 var x = 6378137.0 * wgslng * 0.017453292519943295;
		 var a = wgsLat * 0.017453292519943295;
		 var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
		 return {'lat' : y, 'lng' : x};
		 //*/
	},
	// Web mercator to WGS-84
	// mercatorLat -> y mercatorlng -> x
	mercator_decrypt: function (mercatorLat, mercatorlng) {
		var x = mercatorlng / 20037508.34 * 180.;
		var y = mercatorLat / 20037508.34 * 180.;
		y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
		return {'lat': y, 'lng': x};
		/*
		 if (Math.abs(mercatorlng) < 180 && Math.abs(mercatorLat) < 90)
		 return null;
		 if ((Math.abs(mercatorlng) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
		 return null;
		 var a = mercatorlng / 6378137.0 * 57.295779513082323;
		 var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
		 var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
		 return {'lat' : y, 'lng' : x};
		 //*/
	},
	// two point's distance
	distance: function (latA, lngA, latB, lngB) {
		var earthR = 6371000.;
		var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lngA - lngB) * this.PI / 180);
		var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
		var s = x + y;
		if (s > 1) s = 1;
		if (s < -1) s = -1;
		var alpha = Math.acos(s);
		var distance = alpha * earthR;
		return distance;
	},
	outOfChina: function (lat, lng) {
		if (lng < 72.004 || lng > 137.8347)
			return true;
		if (lat < 0.8293 || lat > 55.8271)
			return true;
		return false;
	},
	transformLat: function (x, y) {
		var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
		return ret;
	},
	transformLng: function (x, y) {
		var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
		return ret;
	}
};
export default{
	install(Vue, options){

		/*二/三元素高度弹性布局
		 *childFocus  焦点元素ID
		 *father      父元素ID
		 *childTop    子元素A ID
		 *childBot    子元素B ID 为空则为两元素弹性布局
		 */
		Vue.prototype.elementsFlex = function (childFocus, father, childA, childB, onlyNum) {
			let focus = $("#" + childFocus);
			let fatherHeight = $("#" + father).height();
			let childAHeight = $("#" + childA).height();
			let childBHeight;
			if (childB == null || childB == "") {
				childBHeight = 0;
			} else {
				childBHeight = $("#" + childB).height();
			}
			var Num = "";
			if (onlyNum) {
				return Num = fatherHeight - childAHeight - childBHeight - 20
			} else {
				focus.height(fatherHeight - childAHeight - childBHeight - 20);
			}

			//console.log(fatherHeight,childAHeight,childBHeight);
		};
		//转换时间戳
		Vue.prototype.GetDateSeconds = (datestr)=> {
			var date = new Date($.trim(datestr).replace(/-/g, "/"));
			var DefaultDate = new Date("2016/06/06 06:06:00");
			var date1 = new Date();
			var seconds = ((date.getTime() - DefaultDate.getTime()) / 1000) + date1.getTimezoneOffset() * 60;
			return seconds;
		}
		//解析时间戳
		Vue.prototype.transDate = function (date) {
			var DefaultDate = new Date("2016/06/06 06:06:06");

			function GetTimeZone() {
				var date1 = new Date();
				var a = date1.getTimezoneOffset() * 60;
				return a;
			}

			var m = parseInt(date - GetTimeZone());
			DefaultDate.setSeconds(m);
			// alert("3." + DefaultDate.pattern("yyyy-MM-dd HH:mm:ss"));
			Date.prototype.pattern = function (fmt) {

				var o = {

					"M+": this.getMonth() + 1, //月份

					"d+": this.getDate(), //日

					"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时

					"H+": this.getHours(), //小时

					"m+": this.getMinutes(), //分

					"s+": this.getSeconds(), //秒

					"q+": Math.floor((this.getMonth() + 3) / 3), //季度

					"S": this.getMilliseconds() //毫秒

				};

				var week = {

					"0": "\u65e5",

					"1": "\u4e00",

					"2": "\u4e8c",

					"3": "\u4e09",

					"4": "\u56db",

					"5": "\u4e94",

					"6": "\u516d"

				};

				if (/(y+)/.test(fmt)) {

					fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

				}

				if (/(E+)/.test(fmt)) {

					fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);

				}

				for (var k in o) {

					if (new RegExp("(" + k + ")").test(fmt)) {

						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

					}

				}

				return fmt;

			}

			return DefaultDate.pattern("yyyy-MM-dd HH:mm:ss");
		};
		//获取当前地图的缩放
		Vue.prototype.getViewBounds = (map)=> {
			var boundsObj = map.getBounds();
			var neObj = boundsObj.getNorthEast();
			var ne = {
				lng: neObj.lng,
				lat: neObj.lat
			};
			var swObj = boundsObj.getSouthWest();
			var sw = {
				lng: swObj.lng,
				lat: swObj.lat
			};
			var rObj = {
				ne: ne,
				sw: sw
			};
			return rObj
		};
		//将秒数转换成时间格式
		Vue.prototype.formatSeconds = (value)=> {
			var theTime = parseInt(value);// 秒
			var theTime1 = 0;// 分
			var theTime2 = 0;// 小时
			if (theTime > 60) {
				theTime1 = parseInt(theTime / 60);
				theTime = parseInt(theTime % 60);
				if (theTime1 > 60) {
					theTime2 = parseInt(theTime1 / 60);
					theTime1 = parseInt(theTime1 % 60);
				}
			}
			var result = "" + parseInt(theTime) + " " + "秒";
			if (theTime1 > 0) {
				result = "" + parseInt(theTime1) + " " + "分" + result;
			}
			if (theTime2 > 0) {
				result = "" + parseInt(theTime2) + " " + "时" + result;
			}
			return result;
		};
		//数组修改active状态 设置激活状态
		Vue.prototype.changeActive = (array, index)=> {
			array.forEach(function (item, i) {
				if (i === index)
					item.active = true;
				else
					item.active = false;
			})

		};
		//正则去空格
		Vue.prototype.removeBlank = (str)=> {
			return str = str.replace(/\s/g, "&nbsp;");
		};
		//设置纵向滚动条
		Vue.prototype.setScroll = (id,h)=> {
			$("#"+id).slimScroll({
				//width: 'auto', //可滚动区域宽度
				height: h+'px', //可滚动区域高度
				size: '10px', //组件宽度
				color: '#00aff0', //滚动条颜色
				position: 'right', //组件位置：left/right
				distance: '0px', //组件与侧边之间的距离
				start: 'top', //默认滚动位置：top/bottom
				opacity: .6, //滚动条透明度
				alwaysVisible: false, //是否 始终显示组件
				disableFadeOut: true, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
				railVisible: true, //是否 显示轨道
				railColor: '#333', //轨道颜色
				railOpacity: .2, //轨道透明度
				railDraggable: true, //是否 滚动条可拖动
				railClass: 'slimScrollRail', //轨道div类名
				barClass: 'slimScrollBar', //滚动条div类名
				wrapperClass: 'slimScrollDiv', //外包div类名
				allowPageScroll: true, //是否 使用滚轮到达顶端/底端时，滚动窗口
				wheelStep: 20, //滚轮滚动量
				touchScrollStep: 200, //滚动量当用户使用手势
				borderRadius: '7px', //滚动条圆角
				railBorderRadius: '7px' //轨道圆角
			});

		};
		//深拷贝
		Vue.prototype.deepCopy= (data)=> {
			return JSON.parse(JSON.stringify(data))
		};
		//格林尼治时间转换本地时间 time格式为 2017-08-11T12:25:25 服务器返回时间
		Vue.prototype.parseGMT= (time)=> {
			if(time==null || time==""){
				return "";
			}else {
				return moment.parseZone(time+"+00:00").local().format("YYYY-MM-DD HH:mm:ss");
			}
		};
		//本地时间转换格林尼治时间   time为空时获得当前时间的UTC格式 time格式为 2017-08-11 12:25:25（中间为空格不带T）
		Vue.prototype.parseUTC= (time)=> {
			return moment(time).utc().format("YYYY-MM-DD HH:mm:ss")
		};

		//获取day天前的时间(格林尼治时间) getSomeDayBefore(2,"begin")+","+getSomeDayBefore(0,"end")->2017-08-29 16:00:00,2017-08-30 15:59:59
		Vue.prototype.getSomeDayBefore=(day,type)=>{
			let needTime;
			let tempTime;
			if(type=="begin"){
				tempTime=moment().subtract(day, 'days').format("YYYY-MM-DD 00:00:00");
				needTime=Vue.prototype.parseUTC(tempTime);
			}
			if(type=="end"){
				tempTime=moment().subtract(day, 'days').format("YYYY-MM-DD 23:59:59");
				needTime=Vue.prototype.parseUTC(tempTime);
			}
			return needTime;

		};


		//gps地址纠正 得到百度坐标系
		Vue.prototype.parsePointBD= (point)=> {
			var gcjlatlng = GPS.gcj_encrypt(point.lat, point.lng);
			var bdlatlng = GPS.bd_encrypt(gcjlatlng.lat, gcjlatlng.lng);
			return bdlatlng;
		};
		//gps地址纠正 得到谷歌，腾讯，高德坐标系
		Vue.prototype.parsePointGCJ = (point)=> {
			var gcjlatlng = GPS.gcj_encrypt(point.lat, point.lng);
			return gcjlatlng;
		};
		//逆转译地理编码  obj为对象{key:''}
		Vue.prototype.geocoder=(type,point,obj,key,callback)=>{

			switch (type){
				case 0:
					let myGeo = new BMap.Geocoder();
					myGeo.getLocation(new BMap.Point(point.lng,point.lat), function (rs) {
						let addComp = rs.addressComponents;
						obj[key] = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;

						if(callback!=null && callback!="") callback();
					})
					break;
				case 1:
					let geocoder = new google.maps.Geocoder();

					geocoder.geocode({location:new google.maps.LatLng(point.lat,point.lng)}, function geoResults(results, status){
						console.log("results",results);
						if (status == google.maps.GeocoderStatus.OK) {

							obj[key]= results[0].formatted_address;

						} else {
							obj[key]="_获取位置_"

						}
						if(callback!=null && callback!="") callback();
					})
					break;
			}




		};

		//获取元素到浏览器上部和左侧的像素
		Vue.prototype.getDivPoint=(div)=>{
			var t = div.offsetTop; //获取该元素对应父容器的上边距
			var l = div.offsetLeft; //对应父容器的上边距
			//判断是否有父容器，如果存在则累加其边距
			while (div = div.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
				t += div.offsetTop; //叠加父容器的上边距
				l += div.offsetLeft; //叠加父容器的左边距
			}
			return {top: t, left: l}
		};

		//解析电子锁姿态
		Vue.prototype.parseLockPose=(obj)=>{


		};

	}
}


