function getHot(arr) {
  return arr.sort((a, b) => { return b.date - a.date })
}

function getSoon(arr) {
  return arr.sort((a, b) => { return a.date - b.date })
}

function getTop(arr) {
  return arr.sort((a, b) => { return b.average - a.average })
}

function getDetail(arr, id) {
  var res = []
  arr.forEach((item) => {
    if (item.id === id) {
      res.push(item)
    }
  })
  return res
}

function searchMovie(arr, text) {
  return arr.filter(item => item.title.indexOf(text) > -1)
}

function getMes(arr) {
  return arr.sort((a,b) => { return b.id - a.id })
}

function polyTime(num) {
  return num > 9 ? '' + num : `0${num}`
}

module.exports = {
  getHot,
  getSoon,
  getTop,
  getDetail,
  searchMovie,
  getMes,
  polyTime
}