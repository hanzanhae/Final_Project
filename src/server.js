import { io } from 'socket.io-client';

const socket = io('https://myspringserver.store');

export default socket;
