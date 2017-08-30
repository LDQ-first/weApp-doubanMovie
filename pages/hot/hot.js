const API = require('../../utils/api.js')
const app = getApp()



Page({
    data: {
      
    },
    onLoad () {
        console.log('load')
        const _this = this

        return API.getHot()
                  .then(subjects => {
                      console.log('hotSubjects: ', subjects)
                      let hotArr = []
                      subjects.forEach((obj, idx) => {
                          let newObj = {}
                          newObj.title = obj.title
                          newObj.id = obj.id
                          newObj.average = obj.rating.average
                          newObj.stars = obj.rating.stars
                          newObj.year = obj.year
                          newObj.img = obj.images.large
                       //   console.log(newObj)
                          hotArr.push(newObj)
                      })
                      this.setData({
                          subjects: subjects,
                          hot: hotArr
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
    }
})