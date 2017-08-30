//app.js
App({
  onLaunch () {
    console.log('launch')
  },
  onShow () {
    console.log('show')
  },
  onHide () {
    console.log('hide')
  },
  onError () {
    console.log('error')
  },
  globalData: {
    hotApi: "https://api.douban.com/v2/movie/in_theaters",
    futureApi: "https://api.douban.com/v2/movie/coming_soon",
    topApi: "https://api.douban.com/v2/movie/top250",
    searchApi: "https://api.douban.com/v2/movie/search?q=",
    detailApi: "https://api.douban.com/v2/movie/subject/"

  }
})
