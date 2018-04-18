$(document).delegate(".delete>div", "click", function() {
	$("#keyword").val($(this).text());
});
/*搜索记录相关*/
//从localStorage获取搜索时间的数组
var hisTime;
//从localStorage获取搜索内容的数组
var hisItem;
//从localStorage获取最早的1个搜索时间
var firstKey;

function init() {
	//每次执行都把2个数组置空
	hisTime = [];
	hisItem = [];
	//模拟localStorage本来有的记录
	//localStorage.setItem("a",12333);
	//本函数内的两个for循环用到的变量
	var i = 0
	for(; i < localStorage.length; i++) {
		if(!isNaN(localStorage.key(i))) {
			hisItem.push(localStorage.getItem(localStorage.key(i)));
			hisTime.push(localStorage.key(i));
		}
	}
	i = 0;
	//执行init(),每次清空之前添加的节点
	$(".delete").html("");
	for(; i < hisItem.length; i++) {
		//alert(hisItem);
		$(".delete").prepend('<div class="word-break">' +'<img src="images/search.png">&nbsp;&nbsp;'+ hisItem[i] + '</div>')
	}
}
init();

function find() {
	$("#keyword").on('keypress', function(e) {
		var value = $("#keyword").val().trim();
		console.log(value)
		var time = (new Date()).getTime();
		var keycode = e.keyCode;
		console.log(keycode)
		if (keycode =='13') {
	      e.preventDefault();
	      //请求搜索接口
	      if(!value) {
					// alert("请输入搜索内容");
					return false;
				} 
			window.location.href="search.html?keyword="+value;

			//输入的内容localStorage有记录
			if($.inArray(value, hisItem) >= 0) {
				for(var j = 0; j < localStorage.length; j++) {
					if(value == localStorage.getItem(localStorage.key(j))) {
						localStorage.removeItem(localStorage.key(j));
					}
				}
				localStorage.setItem(time, value);
			}
			//输入的内容localStorage没有记录
			else {
				//由于限制了只能有5条记录，所以这里进行判断
				if(hisItem.length > 4) {
					firstKey = hisTime[0]
					localStorage.removeItem(firstKey);
					localStorage.setItem(time, value);
				} else {
					localStorage.setItem(time, value)
				}
			}
		
	  }
		init();
		//正式的时候要提交的！！！
		//$("#form1").submit()
	});
}
find();

//清除记录功能
$("#his-dele").click(function() {
	var f = 0;
	for(; f < hisTime.length; f++) {
		localStorage.removeItem(hisTime[f]);
	}
	init();
});
//苹果手机不兼容出现input无法取值以下是解决方法
$(function() {
	$('.word-break').click(function() {
		var div = $(this).text();
		$('#keyword').val(div);
	})
	//取到值以后button存储无法取值，这里强迫浏览器强行刷新可解决
	$('#search').click(function() {
		window.location.reload();
	})
})

// 页面传值
function subStr(url) {
    var obj = {};
    var str = url.split('?')[1];
    //console.log(str);
    var str2 = str.split('&');
    console.log(str2);
    for (var k in str2) {
        var str3 = str2[k].split('=');
        obj[str3[0]] = str3[1];
    }
    return obj;
}
var href = subStr(window.location.href);
var currentPage=0;
currentPage++;
var keyword;
var size = 3;
// 搜索输入页面渲染
var k = decodeURI(href.keyword);
console.log(k)
$.ajax({
    type:"post",
    url:'http://www.mffive.com:8080/drysaltery/getAllDrysalteryListByCondition?currentPage='+currentPage+'&size='+size,
    data:{
            currentPage:currentPage,
            keyword:k
        },
    success:function(data){
        var tplStr1 = template("tplProducts",data);
        console.log(data);
        console.log('http://www.mffive.com:8080/drysaltery/getAllDrysalteryListByCondition?currentPage='+currentPage+'&size='+size);
        console.log(data.objExt)
        $(".list2").html(tplStr1); 
        var type =0;
        var drysalteryFileID = 0;
        var title ='';
        var lever =0;
			  $(".list2 li").on("click",function(){
			  	type=$(this).attr("type");
			  	drysalteryFileID=$(this).attr("drysalteryFileID");
			  	level=$(this).attr("level");
			  	// title=$(this).find("p").text();
					if(Number(type)==2){
			  		window.location.href='information.html?type=' + type + '&title='+ title +"&drysalteryFileID="+drysalteryFileID +"&level="+level;
					}else{
						window.location.href='train-information.html?type=' + type + '&title='+ title +"&drysalteryFileID="+drysalteryFileID +"&level="+level;
					}
			
			  })  
    },
    error:function(){
        console.log("请求失败!");
    }
})