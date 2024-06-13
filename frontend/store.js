import { atom } from 'jotai';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001');

export const userAtom = atom({});
export const displayImageAtom = atom("");
export const postsAtom = atom([]);

export default socket;