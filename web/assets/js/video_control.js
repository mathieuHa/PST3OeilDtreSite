/**
 * Created by kafim on 26/02/2017.
 */
$(document).ready(function(){

    var socket = io.connect('http://192.168.1.27:8080');
    socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    });

    $('#left').click(function () {
        socket.emit('left', 'LEFT');
    });
    $('#right').click(function () {
        socket.emit('right', 'RIGHT');
    });
    $('#up').click(function () {
        socket.emit('up', 'UP');
    });
    $('#down').click(function () {
        socket.emit('down', 'DOWN');
    });
    $('#up-left').click(function () {
        socket.emit('up-left', 'UP-LEFT');
    });
    $('#up-right').click(function () {
        socket.emit('up-right', 'UP-RIGHT');
    });
    $('#down-left').click(function () {
        socket.emit('down-left', 'DOWN-LEFT');
    });
    $('#down-right').click(function () {
        socket.emit('down-right', 'DOWN-RIGHT');
    });
    $('#center').click(function () {
        socket.emit('center', 'CENTER');
    });
    $('#light-on').click(function () {
        socket.emit('light-on', 'LIGHT-ON');
    });
    $('#light-off').click(function () {
        socket.emit('light-off', 'LIGHT-OFF');
    });
});