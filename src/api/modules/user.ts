import http from '../http';

import { PermissionUser, UserInfoRes } from '@/typings';
export const getUserInfo = (): Promise<UserInfoRes> => http.get('user/me/');
export const getSpacePermission = (space_uid: string): Promise<PermissionUser> => http.get('user/permission/', { params: { space_uid } });
