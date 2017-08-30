

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


const serachFocus = () => {
     console.log('foucs')
}


module.exports = {
    serachFocus: serachFocus,
    objToParam: objToParam,
    titleSlice: titleSlice,
    genreSlice: genreSlice
}