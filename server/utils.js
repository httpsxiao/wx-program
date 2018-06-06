function getHot(arr) {
  var d = new Date()
  var year = d.getFullYear()
  var month = polyTime(+d.getMonth() + 1)
  var day = polyTime(d.getDate())
  var cur = `${year}${month}${day}`
  var newArr = arr.filter(item => +item.date <= +cur)
  return newArr.sort((a, b) => b.date - a.date)
}

function getSoon(arr) {
  var d = new Date()
  var year = d.getFullYear()
  var month = polyTime(+d.getMonth() + 1)
  var day = polyTime(d.getDate())
  var cur = `${year}${month}${day}`
  var newArr = arr.filter(item => +item.date > +cur)
  return newArr.sort((a, b) => a.date - b.date)
}

function getTop(arr) {
  return arr.sort((a, b) => b.average - a.average)
}

function getDetail(arr, id) {
  return arr.filter(item => item.id === id)
}

function searchMovie(arr, text) {
  return arr.filter(item => item.title.indexOf(text) > -1)
}

function getMes(arr) {
  return arr.sort((a,b) => b.id - a.id)
}

function getMesByName (arr, name) {
  return arr.filter(item => item.name === name)
}

function polyTime(num) {
  return num > 9 ? '' + num : `0${num}`
}

function removeMes(arr, id) {
  return arr.filter(item => item.id !== id)
}

module.exports = {
  getHot,
  getSoon,
  getTop,
  getDetail,
  searchMovie,
  getMes,
  getMesByName,
  removeMes,
  polyTime
}