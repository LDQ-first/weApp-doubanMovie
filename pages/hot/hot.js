const API = require('../../utils/api.js')
const app = getApp()
const Util = require('../../utils/util.js')


Page({
    data: {
      
    },
    onLoad () {
        console.log('load')
        const _this = this

        return API.getHot({
                    start: 0,
                    count: 6
                  })
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
    onBindFocus () {
        Util.serachFocus()
    },
    onBindBlur () {

    },
    onCancelImgTap () {

    },

    onMoreTap () {
        console.log('onMoreTap')
    }
})