const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')
const app = getApp()

Page({
    data: {
      searchData: [],
      showHead: true      
    },
    onLoad () {
        console.log('load')
        
        return API.getFuture({
                    start: 0,
                    count: 6
                  })
                  .then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      this.setData({
                          subjects: subjects,
                          allData: {
                              title:  '即将上映', 
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
        if(e.detail.value != '') {
            this.setData({
                searchValue: e.detail.value
            })
            Util.searchBlur(API, e.detail.value).then(() => {
                this.setData({
                    searchData: app.globalData.searchData
                })
            })
            e.detail = {value: ''}
        } else {
            this.hideSearch()
        }
    },
    hideSearch () {
        Util.hideSearch()
        this.setData({
            searchData: app.globalData.searchData,
            search: {
                searchPanelShow: app.globalData.searchPanelShow,
                searchCloseShow: app.globalData.searchCloseShow
            },
            searchValue: ''
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
            url: '../movies-more/movies-more?type=future'
        })
    }
})