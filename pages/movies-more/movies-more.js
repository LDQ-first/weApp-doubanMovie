const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')

Page({
    data: {

    },
    onLoad () {
        console.log('load')
        const _this = this
        
        return API.getHot()
                  .then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      this.setData({
                          subjects: subjects,
                          allData: {
                              title:  '正在热映', 
                              list: Util.createList(subjects)
                          } 
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