/**
 * Created by li_sj on 2015/7/9.
 * @date 2015/7/9
 * 简单的渐入渐出轮播插件
 */
$.fn.pslider = function (options) {
    var currentIndex = 0, current = $(this), t, sliderItems = current.find(".slider-item");
    var defaultConfig = {
        duration: 2000  //动画间隔时间
    };
    options = $.extend(defaultConfig, options);
    function slideTo(index) {
        var sliderDots = current.find(".slider-navigator-dot");
        current.find(".cnow").removeClass("cnow").fadeOut(1500);
        sliderItems.eq(index).addClass("cnow").fadeIn(1000);
        sliderDots.removeClass("cdot");
        sliderDots.eq(currentIndex).addClass("cdot");
    }
    function slide(){
        currentIndex = (currentIndex+1)%current.find(".slider-item").length;
        slideTo(currentIndex);
    }
    //添加
    function generatorArrow(){
        var offsetTop = current.height()/2-23,
            left = $("<div class='slider-nav slider-nav-left slider-nav-item'></div>"),
            right = $("<div class='slider-nav slider-nav-right slider-nav-item'></div>");
        left.css("top",offsetTop+'px');
        right.css("top",offsetTop+'px');
        current.append(left);
        current.append(right);
    }
    //生成索引导航
    function generatorNavigator(){
        var navigator = $("<div class='slider-navigator'></div>");
        //添加索引
        for(var i= 0, len=sliderItems.length; i<len; i++){
            i===0?navigator.append("<div class='slider-navigator-dot cdot slider-nav-item' index='"+i+"'></div>"):navigator.append("<div class='slider-navigator-dot slider-nav-item' index='"+i+"'></div>");
        }
        current.append(navigator);
        navigator.css("margin-left",-sliderItems.length*19/2+"px");
    }
    //显示第一帧
    sliderItems.eq(0).show();
    //显示导航帧
    generatorArrow();
    generatorNavigator();
    //定时展示
    t = setInterval(function () {
        slide();
    }, options["duration"]);
    //鼠标悬停，当前帧不变
    current.hover(function(){
        clearInterval(t);
    },function(){
        t = setInterval(function () {
            slide();
        }, options["duration"]);
    });
    //箭头导航事件监听
    current.on("click",".slider-nav-item",function(){
        var current = $(this);
        if(current.hasClass("slider-nav-left")){
            if(currentIndex > 0){
                currentIndex = currentIndex-1;
            }else {
                currentIndex = sliderItems.length - 1;
            }
        }
        if(current.hasClass("slider-nav-right")){
            if(currentIndex < sliderItems.length-1){
                currentIndex = currentIndex+1;
            }else {
                currentIndex = 0;
            }
        }
        if(current.hasClass("slider-navigator-dot")){
            currentIndex = ~~current.attr("index");
        }
        slideTo(currentIndex);
    });
};