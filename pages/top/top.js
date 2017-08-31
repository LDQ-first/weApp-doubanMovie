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
        let param = !this.isEmptyObject(option) ? option : { start: 0, count: 6 }
        console.log('option: ', option)
        console.log('param: ', param)
        return API.getTop(param)
                  .then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      if(this.data.subjects && this.data.allData) {
                          
                      } 
                      else {
                          this.setData({
                            subjects: subjects,
                            allData: {
                                title:  'Top250', 
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
    isEmptyObject(e) {   
        for (let t in e)  
            return !1;  
        return !0  
    },
    onReachBottom () {
        console.log('滚到底了')
        this.onLoad({ start: 6, count: 6 })
            .then(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
            })
    }
})