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
                      
                  })
    }
})