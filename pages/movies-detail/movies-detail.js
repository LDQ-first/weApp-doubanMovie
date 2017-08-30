const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')
const app = getApp()


Page({
    data: {
        
    },
    onLoad (option) {
          console.log('load')
          console.log('option.id: ' , option.id)
          return API.getDetail(option.id)
                    .then( res => {
                        console.log('detailRes: ', res)
                        this.setData({
                            movie: res
                        })
                    })
                    .catch(this.onError)
    },
    onError (err) {
        wx.showToast({
            icon: 'loading',
            title: err.msg + '',
            duration: 2000
        })
    },
})