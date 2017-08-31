const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')
const app = getApp()

Page({
    data: {
      searchData: [],
      showHead: false
    },
    onLoad (option) {
        console.log('load')
        let param = !Util.isEmptyObject(option) ? option : { start: 0, count: 6 }
        this.setData({hidden: false})
        return API.getTop(param)
                  .then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      if(this.data.subjects && this.data.allData) {
                          this.setData({
                                subjects: this.data.subjects.concat(subjects),
                                allData: {
                                    title:  'Top250', 
                                    list: this.data.allData.list.concat(Util.createList(subjects))
                                },
                                index: param.start + param.count
                            })
                      } 
                      else {
                          this.setData({
                            subjects: subjects,
                            allData: {
                                title:  'Top250', 
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
    onMoreTap () {
        console.log('onMoreTap')
        wx.navigateTo({
            url: '../movies-more/movies-more?type=top'
        })
    },
    onPullDownRefresh () {
        console.log("下拉了")
        wx.showNavigationBarLoading()
        this.onLoad()
            .then(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            })
    },
    onReachBottom () {
        console.log('滚到底了')
        if(this.data.index >= 250) {
            wx.showToast({
                title: '没有更多数据了',
                duration: 2000
            })
            return
        }
        this.onLoad({ start: this.data.index, count: 32 })
            .then(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            })
    }
})