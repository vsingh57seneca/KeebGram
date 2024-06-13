import { atom } from 'jotai';
import io from 'socket.io-client'
import { DEBUG, API_URL} from './config';

const options = DEBUG === 0 ? { secure: true } : {};
const socket = io.connect(API_URL[DEBUG], options);

export const userAtom = atom({});
export const displayImageAtom = atom("");
export const postsAtom = atom([]);

export default socket;