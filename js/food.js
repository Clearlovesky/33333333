var currentPage = 0;
$('.content-2').dropload({
    scrollArea : window,
    loadDownFn : function(me){
        currentPage++;
        // 拼接HTML
        var result = '';
        var five="http://www.mffive.com:8080";
        $.ajax({
            type: 'post',
            url: 'http://www.mffive.com:8080/drysaltery/getFoodList?currentPage='+currentPage,
            dataType: 'json',
            data:{
                currentPage:currentPage  
            },
            success: function(data){
                console.log(data)
                console.log('http://www.mffive.com:8080/drysaltery/getFoodList?currentPage='+currentPage)
                var arrLen = data.obj.length;
                var a =data.objExt;
                console.log(arrLen)
                console.log(a)
                if(currentPage<=a){
                    for(var i=0; i<arrLen; i++){
                    result += '<li>'
                              +'<a href="information-1.html?drysalteryFileID='+data.obj[i].id+'">'
                                +'<div class="img">'
                                  +'<img src="'+five+'/'+data.obj[i].logoFile+'" alt="">'
                                +'</div>'
                              +'</a>'
                             +'</li>';
                    }
                // 如果没有数据
                }else{
                    // 锁定
                    me.lock();
                    // 无数据
                    me.noData();
                }
                // 为了测试，延迟1秒加载
                setTimeout(function(){
                    // 插入数据到页面，放到最后面
                    $('.list-2').append(result);
                    // 每次数据插入，必须重置
                    me.resetload();
                },1000);
            },
            error: function(xhr, type){
                alert('Ajax error!');
                // 即使加载出错，也得重置
                me.resetload();
            }
        });
    }
});