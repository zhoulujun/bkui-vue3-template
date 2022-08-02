import http from '../http';
import { SpaceForm } from '@/typing/space';
import { PermissionUser } from '@/typing/user';
export const getSpaceByUid = (uid: string): Promise<SpaceForm> => http.get(`api/v1/space/${uid}/`);
export const getSpace = (params: {[propsName: string]: any}): Promise<{[propsName: string]: any}|any[]> => http.get('api/v1/space/', {
  params,
});
export const addSpace = (data: {[propsName: string]: any}): Promise<{[propsName: string]: any}> => http.post('api/v1/space/', data);
export const updateSpace = (uid: string, data: {[propsName: string]: any}) => http.put(`api/v1/space/${uid}/`, data);
export const deleteSpace = (uid: string) => http.delete(`api/v1/space/${uid}`);
export const getSpacePermission = (space_uid: string): Promise<PermissionUser> => http.get('api/v1/iam/space_permission/', { params: { space_uid } });
export const exportSpace = (uid: string): Promise<any> => http.get('api/v1/space/export/', {
  params: {
    uid,
  },
});
export const importSpace = (data: {[prop: string]: any}): Promise<any> => http.post('api/v1/space/import/', data);
