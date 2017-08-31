const app = getApp()
const hotApi = app.globalData.hotApi,
       futureApi = app.globalData.futureApi,
       topApi = app.globalData.topApi,
       searchApi = app.globalData.searchApi,
       detailApi = app.globalData.detailApi
import  {objToParam, douban_limit} from 'util.js'

let obj = {
    "rating": {
      "max": 10,
      "average": 8.6,
      "stars": "45",
      "min": 0
    },
    "reviews_count": 1053,
    "wish_count": 69839,
    "douban_site": "",
    "year": "2013",
    "images": {
      "small": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2070153774.jpg",
      "large": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2070153774.jpg",
      "medium": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2070153774.jpg"
    },
    "alt": "https://movie.douban.com/subject/10577869/",
    "id": "10577869",
    "mobile_url": "https://movie.douban.com/subject/10577869/mobile",
    "title": "时空恋旅人",
    "do_count": null,
    "share_url": "https://m.douban.com/movie/subject/10577869",
    "seasons_count": null,
    "schedule_url": "",
    "episodes_count": null,
    "countries": [
      "英国"
    ],
    "genres": [
      "剧情",
      "爱情",
      "奇幻"
    ],
    "collect_count": 214419,
    "casts": [
      {
        "alt": "https://movie.douban.com/celebrity/1313116/",
        "avatars": {
          "small": "https://img3.doubanio.com/img/celebrity/small/1361026097.22.jpg",
          "large": "https://img3.doubanio.com/img/celebrity/large/1361026097.22.jpg",
          "medium": "https://img3.doubanio.com/img/celebrity/medium/1361026097.22.jpg"
        },
        "name": "多姆纳尔·格里森",
        "id": "1313116"
      },
      {
        "alt": "https://movie.douban.com/celebrity/1053587/",
        "avatars": {
          "small": "https://img1.doubanio.com/img/celebrity/small/538.jpg",
          "large": "https://img1.doubanio.com/img/celebrity/large/538.jpg",
          "medium": "https://img1.doubanio.com/img/celebrity/medium/538.jpg"
        },
        "name": "瑞秋·麦克亚当斯",
        "id": "1053587"
      },
      {
        "alt": "https://movie.douban.com/celebrity/1041002/",
        "avatars": {
          "small": "https://img3.doubanio.com/img/celebrity/small/2821.jpg",
          "large": "https://img3.doubanio.com/img/celebrity/large/2821.jpg",
          "medium": "https://img3.doubanio.com/img/celebrity/medium/2821.jpg"
        },
        "name": "比尔·奈伊",
        "id": "1041002"
      },
      {
        "alt": "https://movie.douban.com/celebrity/1327829/",
        "avatars": {
          "small": "https://img3.doubanio.com/img/celebrity/small/1365307420.05.jpg",
          "large": "https://img3.doubanio.com/img/celebrity/large/1365307420.05.jpg",
          "medium": "https://img3.doubanio.com/img/celebrity/medium/1365307420.05.jpg"
        },
        "name": "莉迪亚·威尔逊",
        "id": "1327829"
      }
    ],
    "current_season": null,
    "original_title": "About Time",
    "summary": "Tim（多姆纳尔·格利森 Domhnall Gleeson 饰）21岁了，他的老爸（比尔·奈伊 Bill Nighy 饰）告诉他，他们家族的男人都有时光旅行的超能力，可以回到过去。于是Tim将信就疑地试了一下，回到了夏天，在那里他试图改变和暗恋对象的关系，却发现怎么穿越时空都不能让不爱你的人爱上你。之后Tim来到了伦敦，成为了一个律师。他爱上了一个漂亮的姑娘Mary（瑞秋·麦克亚当斯 Rachel McAdams 饰），他通过几次时空旅行，努力地想成为Mary的男朋友。再后来，他又试图通过时光旅行，去挽回一场失败的话剧，去改善妹妹的生活，去更好地和亲人、朋友相处，度过生命中的每一天。©豆瓣",
    "subtype": "movie",
    "directors": [
      {
        "alt": "https://movie.douban.com/celebrity/1040673/",
        "avatars": {
          "small": "https://img3.doubanio.com/img/celebrity/small/2835.jpg",
          "large": "https://img3.doubanio.com/img/celebrity/large/2835.jpg",
          "medium": "https://img3.doubanio.com/img/celebrity/medium/2835.jpg"
        },
        "name": "理查德·柯蒂斯",
        "id": "1040673"
      }
    ],
    "comments_count": 66855,
    "ratings_count": 185787,
    "aka": [
      "时空旅恋人",
      "回到最爱的一天(港)",
      "真爱每一天(台)"
    ]
  }






const getHot = (param) => {
    if( douban_limit() === 'Dangerous') {
        return;
    }
    const url = param ? hotApi + '?' + objToParam(param) : hotApi
    console.log('hotUrl: ', url)
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: { 'Content-Type': 'json' },
            success (res) {
                console.log(res.data)
                if(res.data && res.data.subjects &&  res.data.subjects.length > 0 ) {
                    resolve(res.data.subjects)
                } else {
                    resolve({status: 'Error', msg: '不！获取正在热映的电影失败 o(TωT)o '})
                }
            },
            fail (err) {
                resolve({status: 'Error', msg: err})
            }
        })
    }) 
}




const getFuture = (param) => {
    if( douban_limit() === 'Dangerous') {
        return;
    }
    const url = param ? futureApi + '?' + objToParam(param) : futureApi
    console.log('futureUrl: ', url)
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: { 'Content-Type': 'json' },
            success (res) {
                console.log(res.data)
                if(res.data && res.data.subjects &&  res.data.subjects.length > 0 ) {
                    resolve(res.data.subjects)
                } else {
                    resolve({status: 'Error', msg: '不！获取即将上映的电影失败 o(TωT)o '})
                }
            },
            fail (err) {
                resolve({status: 'Error', msg: err})
            }
        })
    }) 
}


const getTop = (param) => {
    if( douban_limit() === 'Dangerous') {
        return;
    }
    const url = param ? topApi + '?' + objToParam(param) : topApi
    console.log('topUrl: ', url)
    return Promise.resolve({
         then:(resolve, reject) => {
            wx.request({
                url: url,
                header: { 'Content-Type': 'json' },
                success (res) {
                    console.log(res.data)
                    if(res.data && res.data.subjects &&  res.data.subjects.length > 0 ) {
                        resolve(res.data.subjects)
                    } else {
                        resolve({status: 'Error', msg: '不！获取Top250的电影失败 o(TωT)o '})
                    }
                },
                fail (err) {
                    resolve({status: 'Error', msg: err})
                }
            })
         } 
      }) 
}


const getSearch = (param) => {
    if( douban_limit() === 'Dangerous') {
        return;
    }
    const url = param ? searchApi + '?' + objToParam(param) : searchApi
    console.log('searchUrl: ', url)
    return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                header: { 'Content-Type': 'json' },
                success (res) {
                    console.log(res.data)
                    if(res.data && res.data.subjects &&  res.data.subjects.length > 0 ) {
                        resolve(res.data.subjects)
                    } else {
                        resolve({status: 'Error', msg: '不！搜索电影失败 o(TωT)o '})
                    }
                },
                fail (err) {
                    resolve({status: 'Error', msg: err})
                }
            })
         }
      )
}


const getDetail = (param) => {
    if( douban_limit() === 'Dangerous') {
        return;
    }
    const url = param ? detailApi + param : detailApi
    console.log('detailUrl: ', url)
    return   Promise.resolve({
         then:(resolve, reject) => {
            wx.request({
                url: url,
                header: { 'Content-Type': 'json' },
                success (res) {
                    /*resolve(obj)*/
                    console.log(res.data)
                    if(res.data) {
                      resolve(res.data)
                    } else {
                     resolve({status: 'Error', msg: '不！获取电影详情失败 o(TωT)o '})
                    }
                },
                fail (err) {
                    /* resolve(obj)*/
                  resolve({status: 'Error', msg: err})
                }
            })
         } 
      }) 
}


module.exports = {
    getDetail,
    getSearch,
    getTop,
    getFuture,
    getHot
}