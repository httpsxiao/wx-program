var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser') // 用来获取 post 请求携带的数据
var utils = require('./utils')

var app = new express()

var hotData = JSON.parse(fs.readFileSync('./data/hot.json'))
var soonData = JSON.parse(fs.readFileSync('./data/soon.json'))
var topData = JSON.parse(fs.readFileSync('./data/top.json'))
var mesData = JSON.parse(fs.readFileSync('./data/mes.json'))

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

// async function queryMysql (sql) {
//   let data = []
  
//   try {
//     data = await new Promise((resolve, reject) => {
//       connection.query(sql, function(err, res) {
//         if (err) { reject(err) }
//         resolve(res)
//       })
//     })
//   } catch(err) { console.log(err) }

//   return data
// }

app.get('/movie/type/:type', function (req, res) {
  var start = +req.query.start || 0
  var count = +req.query.count || 3
  var end = start + count
  var data = []

  switch(req.params.type) {
    case 'hot':
      data = utils.getHot(hotData).slice(start, end)
      break;
    case 'soon':
      data = utils.getSoon(soonData).slice(start, end)
      break;
    case 'top':
      data = utils.getTop(topData).slice(start, end)
      break;
    default:
      break;
  }
  res.send(data)
})

app.get('/movie/detail', function (req, res) {
  var movieId = req.query.id
  res.send(utils.getDetail(hotData.concat(soonData, topData), movieId))
})

app.get('/movie/search', function (req, res) {
  var text = req.query.q
  res.send(utils.searchMovie(hotData.concat(soonData, topData), text))
})

app.get('/mes/all', function (req, res) {
  var start = +req.query.start || 0
  var count = +req.query.count || 5

  res.send(utils.getMes(mesData).slice(start, start + count))
})

app.post('/mes/add', function (req, res) {
  var name = req.body.name
  var content = req.body.content
  var date = new Date()
  var id = date.getTime()
  var year = date.getFullYear()
  var month =  utils.polyTime(date.getMonth())
  var day =  utils.polyTime(date.getDate())
  var hours =  utils.polyTime(date.getHours())
  var minutes =  utils.polyTime(date.getMinutes())
  var time = `${year}-${month}-${day} ${hours}:${minutes}`
  mesData.push({
    id,
    name,
    time,
    content
  })

  fs.writeFile('./data/mes.json', JSON.stringify(mesData), (err) => {
    if (err) {
      res.send({ errno: 1001 })
    }else {
      res.send({ errno: 0 })
    }
  })
})

app.post('/mes/delete', function (req, res) {
  var id = req.body.id
  var newMesData = utils.removeMes(mesData, id)

  fs.writeFile('./data/mes.json', JSON.stringify(newMesData), (err) => {
    if (err) {
      res.send({ errno: 1001 })
    }else {
      res.send({ errno: 0 })
    }
  })
}

app.listen(9999, function () {
  console.log('App listening on port 9999')
})
