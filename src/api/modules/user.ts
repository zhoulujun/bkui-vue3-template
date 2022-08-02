import http from '../http';

import { UserInfoRes } from '@/typing/user';
export const getUerInfo = (): Promise<UserInfoRes> => http.get('user/me/');
