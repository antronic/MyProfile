export default (app) => {

  app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req, res)=>{
    res.render('index')
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
  })

  app.get('/clock', (req, res)=>{
    res.render('clock')
  })

  app.get('/kmutt', (req, res) => {
    res.render('kmutt_regis')
  })
}
