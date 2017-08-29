
Page({
    data: {
        loading: true
    },
    onUpper () {

    },
    onShow () {

    },
    onLoad () {
        setTimeout(() => {
            this.setData({
                loading: false
            })
        }, 2000)
    },
    onReady () {
        
    },
    onTap () {
        wx.redirectTo({
            url: ''
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