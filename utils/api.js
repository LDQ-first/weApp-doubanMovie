const app = getApp()
const hotApi = app.globalData.hotApi,
       futureApi = app.globalData.futureApi,
       topApi = app.globalData.topApi,
       searchApi = app.globalData.searchApi,
       detailApi = app.globalData.detailApi
import  {objToParam, douban_limit} from 'util.js'


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
                    console.log(res.data)
                    if(res.data) {
                      resolve(res.data)
                    } else {
                     resolve({status: 'Error', msg: '不！获取电影详情失败 o(TωT)o '})
                    }
                },
                fail (err) {
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