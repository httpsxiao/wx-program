function getHot(arr) {
  return arr.sort((a, b) => {return b.date - a.date})
}

function getSoon(arr) {
  return arr.sort((a, b) => {return a.date - b.date})
}

function getTop(arr) {
  return arr.sort((a, b) => {return b.average - a.average})
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
  var res = []
  arr.forEach((item) => {
    if (item.title.indexOf(text) > -1) {
      res.push(item)
    }
  })
  return res
}

module.exports = {
  getHot,
  getSoon,
  getTop,
  getDetail,
  searchMovie
}