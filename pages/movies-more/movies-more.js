const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')

Page({
    data: {

    },
    onLoad (option) {
        console.log('load')
        const _this = this
        console.log('option.type: ', option.type)

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

            req.then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      this.setData({
                          subjects: subjects,
                          allData: {
                              title:  title, 
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