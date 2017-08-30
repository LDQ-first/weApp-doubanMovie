

const objToParam = (obj) => {
    let param = ''
    for(let key of Object.keys(obj) ) {
        console.log(key)
        console.log(obj[key])
        param += `${key}=${obj[key]}&`
    }
    return param.slice(0, param.length - 1)
}


const serachFocus = () => {
     console.log('foucs')
}


module.exports = {
    serachFocus: serachFocus,
    objToParam: objToParam
}