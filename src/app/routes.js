export default (app) => {

  app.get('/', (req, res)=>{
    res.render('index')
  })

  app.get('/clock', (req, res)=>{
    res.render('clock')
  })
}
