const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')
const app = getApp()

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
                          },
                          search: {
                              searchPanelShow: app.globalData.searchPanelShow,
                              searchCloseShow: app.globalData.searchCloseShow
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
        Util.searchFocus()
        this.setData({
            search: {
                searchPanelShow: app.globalData.searchPanelShow,
                searchCloseShow: app.globalData.searchCloseShow
            }
        })
        console.log('search: ', this.search)
    },
    onBindBlur (e) {
        Util.searchBlur(API, e.detail.value).then(() => {
            this.setData({
                searchData: app.globalData.searchData
            })
        })
        this.setData({
            search: {
                    searchPanelShow: app.globalData.searchPanelShow,
                    searchCloseShow: app.globalData.searchCloseShow
                }
        })
        
    },
    onCancelImgTap () {

    },

    onMoreTap () {
        console.log('onMoreTap')
        wx.navigateTo({
            url: '../movies-more/movies-more'
        })
    }
})