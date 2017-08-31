const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')

Page({
    data: {

    },
    onLoad (option) {
        console.log('load')
        const _this = this
        console.log('option.type: ', option.type)
        this.setData({
            option: option
        })
        let title = ''
        let req = {}
        switch (option.type) {
            case 'hot' :
              req =  API.getHot()
              title = '正在热映'
              break;
            case 'future' :
              req =  API.getFuture()
              title = '即将上映'
              break;
            case 'top' :
              req =  API.getTop()
              title = 'Top250'
              break;
        }

      return  req.then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      this.setData({
                          subjects: subjects,
                          allData: {
                              title:  title, 
                              list: Util.createList(subjects)
                          } 
                      })
                  })
                  .then(() => {
                        this.setData({hidden: true})
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
    onPullDownRefresh () {
        console.log("下拉了")
        wx.showNavigationBarLoading()
        console.log('this.data.option: ', this.data.option)
        this.onLoad(this.data.option)
            .then(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            })
    }

})