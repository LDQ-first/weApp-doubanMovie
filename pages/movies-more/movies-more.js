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
           default:
              return;
        }

      return  req.then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      if(subjects.length === 0) {
                          wx.showToast({
                            title: '没有更多数据了',
                            duration: 2000
                        })
                        return
                      }else if(this.data.subjects.length > 0 && this.data.allData) {
                          console.log('this.data.subjects: ', this.data.subjects)
                          console.log('this.data.subjects.concat(subjects): ', this.data.subjects.concat(subjects))
                          console.log('this.data.allData: ', this.data.allData)
                          console.log('this.data.allData.list.concat(Util.createList(subjects)): ', this.data.allData.list.concat(Util.createList(subjects)))
                          this.setData({
                                subjects: this.data.subjects.concat(subjects),
                                allData: {
                                    title:  title, 
                                    list: this.data.allData.list.concat(Util.createList(subjects))
                                },
                                index: param.start + param.count
                            })
                      } else {
                          this.setData({
                            subjects: subjects,
                            allData: {
                                title:  title, 
                                list: Util.createList(subjects)
                            }
                        })
                      }
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
    },
    onReachBottom () {
        console.log('滚到底了')
        this.onLoad(this.data.option)
            .then(() => {
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            })
    }

})