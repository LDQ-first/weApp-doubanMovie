
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
        
    }

})