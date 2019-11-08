import socketIO from 'socket.io-client';

const sockets = socketIO(window.location.origin.replace('localhost:3000', 'slim-chat.herokuapp.com'));

export default sockets;