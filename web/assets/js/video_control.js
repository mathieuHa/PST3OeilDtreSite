/**
 * Created by kafim on 26/02/2017.
 */
$(document).ready(function(){

    var socket = io.connect('http://93.12.53.245:8080');
    socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    });

    $('#left').click(function () {
        socket.emit('left', 'LEFT');
        alert('left');
    });
    $('#right').click(function () {
        socket.emit('right', 'RIGHT');
        alert('right');
    });
    $('#up').click(function () {
        socket.emit('up', 'UP');
        alert('top');
    });
    $('#down').click(function () {
        socket.emit('down', 'DOWN');
        alert('down');
    });
    $('#start_record').click(function () {
        socket.emit('start_record');
    });
    $('#stop_record').click(function () {
        socket.emit('stop_record');
    });
    $('#picture').click(function () {
        socket.emit('picture');
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