export interface IUserModel {
  username: string;
  avatar: string;
}
export type PermissionUser  = Record<string, boolean>;

export interface SpaceItem {
  uid: string,
  name: string,
  code?: string,
  logo?: string,
  permissions?: PermissionUser,
}

export interface UserInfoRes {
  permissions: PermissionUser,
  username: string
  avatar: string
  spaces: SpaceItem
}


