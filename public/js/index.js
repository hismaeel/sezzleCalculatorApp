const socket = io.connect('');
  socket.on('Log', (data) => {
    updateTable(data);
var exp = document.getElementById("expression");
	exp.className = "normal";
  });

  socket.on('firstLog', (data) => {
    createTable(data.data);
console.log(data.data);
  });

socket.on('my error', (data) => {
	var exp = document.getElementById("expression");
	exp.className = "error";
});

//makes the http request to the server, get's the 
function validateForm(){
var string = document.getElementById("expression").value;
socket.emit('requestLog', {expression: string});
}
function createTable(data){
if (null != document.getElementById("table")){
	document.getElementById("table").remove()
}
var table = document.createElement('table');
	table.id = "table";
	for (var i = data.expressions.length-1; i >= 0; i--){
	var row = document.createElement("tr");
	var exp = document.createElement("td");
	res = document.createElement("td");
	exp.innerHTML = data.expressions[i];
	res.innerHTML = data.results[i];
exp.className = "cell exp";
res.className = "cell res";
	row.append(exp);
	row.append(res);
	table.append(row);
}
var body = document.getElementsByTagName('body');
body[0].appendChild(table);
}
function updateTable(data){
var row = document.createElement("tr");
	var exp = document.createElement("td");
	var res = document.createElement("td");
	exp.innerHTML = data.expression;
	res.innerHTML = data.result;
exp.className = "cell exp";
res.className = "cell res";
	row.append(exp);
	row.append(res);
var table = document.getElementById("table");
table.prepend(row);
}
function clearLog(){
socket.emit('clearLog', {});
}
