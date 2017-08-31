const API = require('../../utils/api.js')
const Util = require('../../utils/util.js')
const app = getApp()


Page({
    data: {
        
    },
    onLoad (option) {
          console.log('load')
          console.log('option.id: ' , option.id)
          return API.getDetail(option.id)
                    .then( res => {
                        console.log('detailRes: ', res)
                        this.setData({
                            movie: res,
                            stars: Util.starsToArr(res.rating.stars),
                            genres: res.genres.join(' / '),
                            casts: res.casts,
                            castsName: this.ArrToStr(res.casts),
                            directors: res.directors,
                            directorsName: this.ArrToStr(res.directors),
                            average: res.rating.average
                        })
                    })
                    .then(() => {
                        this.setData({
                            castsNameSlice: this.titleSlice(this.data.castsName),
                            directorsNameSlice: this.titleSlice(this.data.directorsName),
                        })
                    })
                    .catch(this.onError)
    },
    titleSlice(name) {
        console.log('name: ', name)
        let nameArrs = name.split(' / ')
        let newNameArrs = []
        nameArrs.forEach((nameArr, i) => {
            newNameArrs.push(Util.titleSlice(nameArr))
        })
        console.log('newNameArrs: ', newNameArrs)
        return newNameArrs
    },
    ArrToStr(arrs) {
        console.log('arrs: ', arrs)
        let str = ''
        arrs.forEach((arr, idx) => {
            str += arr.name + ' / '
        })
         console.log('str: ', str.slice(0, str.length - 1))
        return str.slice(0, str.length - 2)
    },
    onError (err) {
        wx.showToast({
            icon: 'loading',
            title: err.msg + '',
            duration: 2000
        })
    },
})