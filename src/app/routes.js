export default (app) => {

  app.get('/', (req, res)=>{
    res.render('index')
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
  })

  app.get('/clock', (req, res)=>{
    res.render('clock')
  })
}
