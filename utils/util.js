const app = getApp()
/*import {getSearch} from 'api.js'*/

const objToParam = (obj) => {
    let param = ''
    for(let key of Object.keys(obj) ) {
        console.log(key)
        console.log(obj[key])
        param += `${key}=${obj[key]}&`
    }
    return param.slice(0, param.length - 1)
}

const titleSlice = (title) => {
  let newTitle = ''
   if(title.length > 6) {
       newTitle = title.slice(0, 6) + '...'
   }
   else {
       newTitle = title
   }
   return newTitle
}

const genreSlice = (genre) => {
    let newGenre = []
    if(genre.length > 3) {
        newGenre = genre.slice(0,3)
    }
    else {
        newGenre = genre
    }
    return newGenre
}

const starsToArr = (stars) => {
    const num = stars.substring(0, 1)
    let arr = []
    for(let i = 1; i <= 5; i++) {
        if(i <= num) {
            arr.push(1)
        }
        else {
            arr.push(0)
        }
    }
    return arr
}

const createList = (subjects) => {

    let hotArr = []
        subjects.forEach((obj, idx) => {
            let newObj = {}
            newObj.title = titleSlice(obj.title)
            newObj.id = obj.id
            newObj.average = obj.rating.average
            newObj.stars = starsToArr(obj.rating.stars)
            newObj.genres = genreSlice(obj.genres)
            newObj.year = obj.year + '年'
            newObj.img = obj.images.large
            hotArr.push(newObj)
        })
        return hotArr
}


const searchFocus = () => {
     console.log('foucs')
     app.globalData.searchPanelShow = true
     app.globalData.searchCloseShow = true
}

const searchBlur = (API, value) => {
    console.log('blur')
    app.globalData.searchCloseShow = false
    if(value != '') {
        return API.getSearch({q: value})
            .then(searchData => {
            return app.globalData.searchData = createList(searchData)
            })
            .then(searchData => {
                console.log('app.globalData.searchData: ', app.globalData.searchData)
            })
     }
}


module.exports = {
    searchFocus: searchFocus,
    searchBlur: searchBlur,
    objToParam: objToParam,
    titleSlice: titleSlice,
    genreSlice: genreSlice,
    starsToArr: starsToArr,
    createList: createList
}