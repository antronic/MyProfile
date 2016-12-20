'use strict';var _express=require('express');var _express2=_interopRequireDefault(_express);var _http=require('http');var _http2=_interopRequireDefault(_http);var _path=require('path');var _path2=_interopRequireDefault(_path);var _bodyParser=require('body-parser');var _bodyParser2=_interopRequireDefault(_bodyParser);var _serveFavicon=require('serve-favicon');var _serveFavicon2=_interopRequireDefault(_serveFavicon);var _routes=require('./app/routes');var _routes2=_interopRequireDefault(_routes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var project_name='MyProfile';var app=(0,_express2.default)();var server=_http2.default.createServer(app);app.use(_bodyParser2.default.json());app.use(_bodyParser2.default.urlencoded({limit:'50mb',extended:true}));app.use(_express2.default.static(_path2.default.join(__dirname,'public')));app.use((0,_serveFavicon2.default)(_path2.default.join(__dirname,'/public/job_profile.ico')));app.set('view engine','ejs');app.set('views',_path2.default.join(__dirname,'views'));(0,_routes2.default)(app);server.listen(process.env.PORT|3000,function(){console.log(project_name+' is listening on '+server.address().port)});