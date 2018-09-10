document.addEventListener('DOMContentLoaded', function() {
    var ul = $('ul'),
        emList = $('em'),
        btns = $('i'),
        banner = $('.banner'),
        myId, //记录周期性定时器的ID
        imgId = 1, //图片的ID
        _index, //点击的em在emList中的索引值  该索引值是比imgId小1的
        _flag = 1; //用于判断左右箭头动画执行程度



    //--------------------思路
    //如果只需要自动轮播的话其实只要5张图片，最后一张和第一张一样（imgId为5）
    //在播到最后一张的时候，图片与第一张一样，等动画结束的瞬间重新复定位，初始到原先的位置，这样就从最后一张
    //跑到了第一张，但是由于图片一样，用户看起来以为没有变化，神不知鬼不觉的又能继续播放了！


    //下面是实现自动轮播功能的代码---------------------------------------------
    //定义一个函数，功能为设置周期定时器，在定时器中设置轮播的功能
    function slide() {
        myId = setInterval(function() {
            imgId++; //---------将要展示的照片ID    正在展示的是imgId
            if (imgId < 5) { //------判断要展示的照片不是第5张的话就正常移动一个图片的宽
                emList.removeAttr('class');
                $(emList[imgId - 1]).addClass('black');
                ul.animate({
                    'left': '-=590px', //在原本的基础上移动一张照片的宽
                }, 1000);
            } else { //---------当要展示最后一张（即与第一张一样的图片）的时候，在动画结束的时候将ul复位
                emList.removeAttr('class');
                $(emList[0]).addClass('black');
                ul.animate({
                    'left': '-=590px',
                }, 1000, function() {
                    imgId = 1; //将照片的ID重置为1
                    ul.css('left', '-590px'); //！！！！！这里就是小动作---复位
                });
            }
        }, 2000);
    };
    slide();
    banner.mouseover(function() {
        clearInterval(myId);
        btns.css('display', 'block');
    })
    banner.mouseout(function() {
            slide();
            btns.css('display', 'none');
        })
        //-----------------------------------------------------------------------

    ////因为要实现箭头的功能，我们要再第一张前面加一张最后一张（imgId为0），这样看起来没有破绽
    //下面是实现箭头按钮的功能----------------------------------------------------
    //左箭头点击事件
    $(btns[0]).click(function() {
        if (_flag) { //--
            _flag = 0;
            if (imgId == 1) { //判断将要展示的照片是不是第一张
                imgId = 4; //是的话把ID变为4，照片展示第0张（自己加进去的最后一张），并且在动画结束后移动到真正的最后一张
                emList.removeAttr('class');
                $(emList[3]).addClass('black');
                ul.animate({
                    'left': '+=590px',
                }, 300, function() {
                    ul.css('left', '-2360px'); //一样的小动作----移动到最后一张
                    _flag = 1;
                    // ul.clearQueue();
                });
            } else if (imgId > 1 && imgId <= 4) { //否则就正常移动一张图片的宽
                imgId--;
                emList.removeAttr('class');
                $(emList[imgId - 1]).addClass('black');
                ul.animate({
                    'left': '+=590px',
                }, 300, function() {
                    _flag = 1;
                    // ul.clearQueue();
                });
            }
        } //-
    })

    //右箭头点击事件与左箭头事件一样只要判断将要展示的是不是最后一张
    $(btns[1]).click(function() {
            if (_flag) {
                _flag = 0;
                if (imgId == 4) {
                    imgId = 1;
                    emList.removeAttr('class');
                    $(emList[0]).addClass('black');
                    ul.animate({
                        'left': '-=590px',
                    }, 300, function() {
                        _flag = 1;
                        ul.css('left', '-590px'); //一样的小动作---复位到真正的第一张
                    });
                } else if (imgId >= 1 && imgId < 4) {
                    imgId++;
                    emList.removeAttr('class');
                    $(emList[imgId - 1]).addClass('black');
                    ul.animate({
                        'left': '-=590px',
                    }, 300, function() {
                        _flag = 1;
                    });
                }
            }
        })
        //---------------------------------------------------------------------------------


    //下面是4个小圆点的功能代码-------------------------------------------------------
    //首先为了看起来没有破绽，我们要注意2点
    //1、当前展示的是第一张并且点击了最后一个em时的情况
    //2、当前展示的是最后一张并且点击了第一个em时的情况
    emList.click(function() {
        _index = emList.index(this) + 1;
        emList.removeAttr('class');
        $(this).addClass('black');
        if (imgId == 1 && _index == 4) { //情况1
            imgId = 4;
            ul.animate({
                'left': '+=590px',
            }, 500, function() {
                ul.css('left', '-2360px'); //小动作
            });
        } else if (imgId == 4 && _index == 1) { //情况2
            imgId = 1;
            ul.animate({
                'left': '-=590px',
            }, 500, function() {
                ul.css('left', '-590px'); //小动作
            });
        } else { //普通情况
            imgId = _index;
            ul.animate({
                'left': -590 * _index,
            }, 500);
        }
    })

    //---------------------------------------------------------------------
})