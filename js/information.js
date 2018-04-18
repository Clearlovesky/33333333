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

console.log(href);

console.log(href.drysalteryFileID)


$.ajax({
    url:"http://www.mffive.com:8080/drysaltery/getAppById",
    type: "post",
    data:{
         drysalteryFileID:href.drysalteryFileID
    },
    success:function(data){
        var tplStr = template('information',data);
        $('.main').html(tplStr);
         // console.info(data);
         console.log(data.obj.content);
         // $(".content").html(data.obj.content)
         var picUrl=data.obj.picUrl;
         if(picUrl===null){
            $(".showImg").hide();
         }else{
            $(".showImg").show();
         }
    },
    error:function(){
        console.log("请求失败了");
    }
})