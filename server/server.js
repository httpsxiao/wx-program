var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser') // 用来获取 post 请求携带的数据
var utils = require('./utils')

var app = new express()

async function readFileData (path) {
  try {
    let data = await new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, buffer) => {
        if (err) { return reject([]) }
        resolve(buffer)
      })
    })
    return JSON.parse(data)
  } catch (err) { console.log(err) }
}

async function writeFileData (path, data) {
  try {
    let result = await new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) { return reject({ errno: 1001 }) }
        resolve({ errno: 0 })
      })
    })
    return result
  } catch (err) { console.log(err) }
}

/*
 * bodyParser.json() for parsing application/json
 * bodyParse.uelencoded({ extend: true}) for parse application/x-www-form-urlencoded
 *
 * 使用上述其中一种方法可以在 req.body 中拿到前端上传参数
 */
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

app.get('/movie/type/:type', function (req, res) {
  var start = +req.query.start || 0
  var count = +req.query.count || 3
  var end = start + count
  var data = []

  switch(req.params.type) {
    case 'hot':
      readFileData('./data/hot.json')
        .then(hotData => res.send(utils.getHot(hotData).slice(start, end)))
      break;
    case 'soon':
      readFileData('./data/soon.json')
        .then(hotData => res.send(utils.getHot(hotData).slice(start, end)))
      break;
    case 'top':
      readFileData('./data/top.json')
        .then(hotData => res.send(utils.getHot(hotData).slice(start, end)))
      break;
    default:
      break;
  }
})

app.get('/movie/detail', function (req, res) {
  var movieId = req.query.id

  Promise.all([readFileData('./data/hot.json'), readFileData('./data/soon.json'), readFileData('./data/top.json')])
    .then(allData => {
      let result = utils.getDetail(allData[0].concat(allData[1], allData[2]), movieId)
      res.send(result)
    })
})

app.get('/movie/search', function (req, res) {
  var text = req.query.q

  Promise.all([readFileData('./data/hot.json'), readFileData('./data/soon.json'), readFileData('./data/top.json')])
    .then(allData => {
      let result = utils.searchMovie(allData[0].concat(allData[1], allData[2]), text)
      res.send(result)
    })
})

app.get('/mes/all', function (req, res) {
  var start = +req.query.start || 0
  var count = +req.query.count || 5
  let result = []

  readFileData('./data/mes.json')
    .then(mesData => res.send(utils.getMes(mesData).slice(start, start + count)))
})

app.post('/mes/add', function (req, res) {
  var name = req.body.name
  var content = req.body.content
  var date = new Date()
  var id = '' + date.getTime()
  var year = date.getFullYear()
  var month =  utils.polyTime(date.getMonth())
  var day =  utils.polyTime(date.getDate())
  var hours =  utils.polyTime(date.getHours())
  var minutes =  utils.polyTime(date.getMinutes())
  var time = `${year}-${month}-${day} ${hours}:${minutes}`

  readFileData('./data/mes.json')
    .then(mesData => {
      let arr = utils.getMes(mesData)
      arr.push({
        id,
        name,
        time,
        content
      })
      writeFileData('./data/mes.json', arr)
        .then(result => res.send(result))
    })
})

app.post('/mes/delete', function (req, res) {
  var id = req.body.id

  readFileData('./data/mes.json')
    .then(mesData => {
      let arr = utils.removeMes(mesData, id)
      writeFileData('./data/mes.json', arr)
        .then(result => res.send(result))
    })
})

app.listen(9999, function () {
  console.log('App listening on port 9999')
})
