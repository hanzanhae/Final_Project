import { io } from 'socket.io-client';

const socket = io('wss://myspringserver.store/ws');

export default socket;
