
require('../css/main.scss')
var page = {}, _page = []
var Iris = require('./lib/iriswipe.js')
var iris = Iris({
    duration: 600
}) 

var currPage = 0
var ys = [{ y: 200 }, { y: 200 }, { y: 200 }, { y: 200 }, { y: 200 }, { y: 200 }, { y: 200 }]
_pageEmpty = {
    slideOut: function (cb) {
        var config = {
            y: ys[currPage].y,
            compelate: function () {
                cb && cb()
            }
        }
        iris.hide(config)
        console.info('Empty.slideOut')
    },
    slideIn: function () {
        iris.show()
        console.info('Empty.slideIn')
    },
    reset: function () {
        console.info('重置')
    }
}

page.get = function (idx) {
    currPage = idx

    return _pageEmpty
}
page.start = function () {
    iris.show()
}
module.exports = page;