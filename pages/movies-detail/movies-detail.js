const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')
const app = getApp()


Page({
    data: {
        
    },
    onLoad () {
          console.log('load')
          return API.getDetail()
                    .then( res => {
                        console.log('detailRes: ', res)
                        
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