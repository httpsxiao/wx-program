// 把星星转化为数组格式
function convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        } else {
            array.push(0);
        }
    }
    return array;
};

function http(url, callback) {
    var that = this;
    wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        success: function (res) {
            // success
            callback(res.data);
        },
        fail: function () {
            console.log("request fail");
        }
    })
};


module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http
};