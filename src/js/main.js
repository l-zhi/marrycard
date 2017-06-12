require('../index.html')

var Preloader = require('./lib/preloader.js')
var Slider = require('./lib/slider.js')
var page = require('./page.js')
require('../img/share.jpg')
var audio = 0, $audio = 0
var hasMusic = false
var playAudio = function () {
  hasMusic = true;
  $audio.addClass('off');
  audio.play();
}

var pauseAudio = function () {
  hasMusic = false;
  $audio.removeClass('off');
  audio.pause();
}

/**
 * preloader && start
 */
var preloader = new Preloader({
  resources: ['img/share.jpg', 'img/loading.png', 'img/border1.png', 'img/sprite.icon.png', 'img/sprite.icon2.png'],
  concurrency: 4,
  perMinTime: 1000 // 加载每个资源所需的最小时间，一般用来测试 loading
})
preloader.addProgressListener(function (loaded, length) {
  console.log('loaded', loaded, length, loaded / length)
})
preloader.addCompletionListener(function () {
  $('#o2_loading').hide()
  $('#o2_main').removeClass('hide')
  init()
})
preloader.start()

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

function init() {
  $audio = $('#J_audio')
  audio = document.getElementById('J_mp3')
  playAudio();

  document.addEventListener("WeixinJSBridgeReady", function () {
    playAudio();
  }, false);

  audio.addEventListener("playing", function () {
    playAudio();
  }, false);

  audio.addEventListener("pause", function () {
    pauseAudio();
  }, false);

  $audio.on('touchstart', function () {
    if (hasMusic) {
      pauseAudio();
    } else {
      playAudio();
    }
  })
  new Slider('.slider', {
    sliderOut: function (slider, idx) {
      page.get(idx).slideOut($.proxy(slider.countinue, slider))
    },
    sliderIn: function (slider, idx) {
      page.get(idx).slideIn()
    },
    resetSlider: function (slider, idx) {
      page.get(idx).reset()
    }
  })
  page.start()

  var isSubmit = false
  $(document).on('touchend', '#J_save', function () {
    if (isSubmit) {
      return
    }
    isSubmit = true
    $('#J_save').text('嘿嘿~提交成功！')
    var name = $('#J_name').val()
    var msg = $('#J_msg').val()
    $('#J_msg').val('')
    $('#J_name').val('')
    $.ajax({
      type: 'POST',
      url: 'https://leancloud.cn:443/1.1/classes/actor',
      headers: {
        'X-LC-Id': 'xxx',// 自己的leancloud参数或者接口
        'X-LC-Key': 'xxx',
      },
      contentType: 'application/json',
      data: JSON.stringify({ "name": name, "message": msg }),
      success: function () {

        setTimeout(function () {
          $('#J_save').text('再次提交')
          isSubmit = false
        }, 5000);

      }
    })
  })
}


var wxShare = function (t, i, e, s, n, a, o, r) {
  document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.on("menu:share:timeline", function (r) {
      ATlog && ATlog.custom('wxTimeline', '', 1)
      WeixinJSBridge.invoke("shareTimeline", {
        img_url: t,
        img_width: i,
        img_height: e,
        link: s,
        title: n,
        desc: a
      }, function () {
        o && o("timeline")
      })
    }), WeixinJSBridge.on("menu:share:appmessage", function (c) {
      ATlog && ATlog.custom('wxMessage', '', 1)
      WeixinJSBridge.invoke("sendAppMessage", {
        appid: r || "",
        img_url: t,
        img_width: i,
        img_height: e,
        link: s,
        title: n,
        desc: a
      }, function () {
        o && o("appmessage")
      })
    }), WeixinJSBridge.on("menu:share:weibo", function (t) {
      ATlog && ATlog.custom('weibo', '', 1)
      WeixinJSBridge.invoke("shareWeibo", {
        content: n,
        url: s
      }, function (t) {
        o && o("weibo")
      })
    }), WeixinJSBridge.on("menu:share:facebook", function (r) {
      ATlog && ATlog.custom('facebook', '', 1)
      dataForWeixin.callback(), WeixinJSBridge.invoke("shareFB", {
        img_url: t,
        img_width: i,
        img_height: e,
        link: s,
        title: n,
        desc: a
      }, function (t) {
        o && o("facebook")
      })
    })
  })
}
wxShare('../img/share.jpg', 200, 200, location.href, '分享标题', '分享文案');