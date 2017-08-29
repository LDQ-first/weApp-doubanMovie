
Page({
    data: {
        loading: true
    },
    onLoad () {
        setTimeout(() => {
            this.setData({
                loading: false
            })
        }, 2000)
    },
    onTap () {
        console.log('onTap')
        wx.switchTab({
            url: '../hot/hot'
        })
    },
    onShareAppMessage () {
        return {
            title: '豆瓣电影',
            desc: '进去发现好电影',
            imageUrl: '../../images/loading/loading.gif'
        }
    }

})