const express = require('express');

const app = express();
// 启动服务端口
const Port = 3000;

app.set('secret', 'shihao')

/* 
  允许跨域
*/
app.use(require('cors')())
/*
  解析 json 
 */
app.use(express.json())
/* 
  静态资源托管
*/
app.use('/', express.static(__dirname + '/web'))
app.use('/liushihaoadmin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app);
require('./routes/admin')(app);
require('./routes/web')(app);
require('./routes/web/Comment')(app);
require('./routes/web/Timeline')(app);

app.listen(Port, () => {
  console.log(`http://127.0.0.1:${Port}`);
})