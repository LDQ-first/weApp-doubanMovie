const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')

Page({
    data: {

    },
    onLoad (option) {
        if(this.data.over) {
            this.isOver()
            return new Promise((resolve, reject) => {
                resolve()
            })
        }
        console.log('load')
        this.setData({
            option: option
        })
        let title = ''
        let req = {}
        let param = this.data.index ? {start: this.data.index, count: 20} : {start: 0, count: 20}
        this.setData({hidden: false})
        switch (option.type) {
            case 'hot' :
              req =  API.getHot(param)
              title = '正在热映'
              break;
            case 'future' :
              req =  API.getFuture(param)
              title = '即将上映'
              break;
           default:
              return;
        }

      return  req.then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      console.log(subjects)
                      if(subjects.length === 0) {
                          this.setData({
                              over: true
                          })
                         this.isOver()
                        return
                      }else if(this.data.subjects && this.data.allData) {
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
                            },
                            index: param.start + param.count
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
    getDetail (e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../movies-detail/movies-detail?id=' + id
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
    },
    isOver () {
         wx.showToast({
            title: '没有更多数据了',
            duration: 2000
        })
    }

})