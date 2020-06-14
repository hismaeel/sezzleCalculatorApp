const express = require('express')
const app = express();
const session = require('express-session');
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const math = require('mathjs');

let log = {expressions: [], results: []};

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  'secret': 'a88a8a' //unique string to
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

io.on('connection', (socket) => {
  socket.emit('firstLog', {data: log});
socket.on('clearLog', (data)=>{
	log = {expressions: [], results: []};
socket.emit('firstLog', {data: log});
});
  socket.on('requestLog', (data) => {
try {
let result = math.evaluate(data.expression);
log.expressions.push(data.expression);
log.results.push(result);
io.sockets.emit('Log', {expression: data.expression, result:math.evaluate(data.expression)});
} catch (e) {
socket.emit('my error', {});
} finally {
}
});
});

server.listen(process.env.PORT || 5000, () => {
  console.log('Calculator log App!');
});