import socketIO from 'socket.io-client';

const sockets = socketIO(window.location.origin.replace('3000', '1337'));

export default sockets;