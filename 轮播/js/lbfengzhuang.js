$.fn.extend({
    lunbo: function(obj) {
        var _that = this,
            scroll = null;
        scroll = function() {
            var content = _that.children('ul'),
                imgWidth = _that.children('ul').children('li').width(),
                imgLength = _that.children('ul').children('li').length,
                rows = _that.children('i'),
                dot = _that.children('div').children('em'),
                imgId = 1,
                _index,
                myId,
                _flag = 1;

            function slide() {
                myId = setInterval(function() {
                    imgId++;
                    if (imgId < imgLength - 1) {
                        $(dot[imgId - 1]).addClass('black').siblings().removeClass('black');
                        content.animate({
                            'left': '-=' + imgWidth + 'px',
                        }, 1000);
                    } else {
                        $(dot[0]).addClass('black').siblings().removeClass('black');
                        content.animate({
                            'left': '-=' + imgWidth + 'px',
                        }, 1000, function() {
                            imgId = 1;
                            content.css('left', '-' + imgWidth + 'px');
                        });
                    }
                }, 2000);
            };
            slide();
            _that.mouseover(function() {
                clearInterval(myId);
                rows.css('display', 'block');
            })
            _that.mouseout(function() {
                slide();
                rows.css('display', 'none');
            })
            $(rows[0]).click(function() {
                if (_flag) {
                    _flag = 0;
                    if (imgId == 1) {
                        imgId = imgLength - 2;
                        $(dot[dot.length - 1]).addClass('black').siblings().removeClass('black');
                        content.animate({
                            'left': '+=' + imgWidth + 'px',
                        }, 300, function() {
                            content.css('left', -imgWidth * (imgLength - 2) + 'px');
                            _flag = 1;
                        });
                    } else if (imgId > 1 && imgId <= imgLength - 2) {
                        imgId--;
                        $(dot[imgId - 1]).addClass('black').siblings().removeClass('black');
                        content.animate({
                            'left': '+=' + imgWidth + 'px',
                        }, 300, function() {
                            _flag = 1;
                        });
                    }
                }
            })
            $(rows[1]).click(function() {
                if (_flag) {
                    _flag = 0;
                    if (imgId == imgLength - 2) {
                        imgId = 1;
                        $(dot[0]).addClass('black').siblings().removeClass('black');
                        content.animate({
                            'left': '-=' + imgWidth + 'px',
                        }, 300, function() {
                            _flag = 1;
                            content.css('left', -imgWidth + 'px');
                        });
                    } else if (imgId >= 1 && imgId < imgLength - 2) {
                        imgId++;
                        $(dot[imgId - 1]).addClass('black').siblings().removeClass('black');
                        content.animate({
                            'left': '-=' + imgWidth + 'px',
                        }, 300, function() {
                            _flag = 1;
                        });
                    }
                }
            })
            dot.click(function() {
                _index = dot.index(this) + 1;
                $(this).addClass('black').siblings().removeClass('black');
                if (imgId == 1 && _index == imgLength - 2) {
                    imgId = imgLength - 2;
                    content.animate({
                        'left': '+=' + imgWidth + 'px',
                    }, 500, function() {
                        content.css('left', -imgWidth * (imgLength - 2) + 'px');
                    });
                } else if (imgId == imgLength - 2 && _index == 1) {
                    imgId = 1;
                    content.animate({
                        'left': '-=' + imgWidth + 'px',
                    }, 500, function() {
                        content.css('left', -imgWidth + 'px');
                    });
                } else {
                    imgId = _index;
                    content.animate({
                        'left': -imgWidth * _index,
                    }, 500);
                }
            })
        }
        scroll();
    }
})