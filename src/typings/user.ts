export interface IUserModel {
  username: string;
  avatar: string;
}
export interface PermissionUser {
  [props: string]: boolean
}
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

export interface ISpaceItem{
  id: number
  uid: string
  created_by: string
  created_time: string
  updated_by: string
  updated_time: string
  dashboard_count: number
  is_private: boolean
  logo: string
  name: string
  permissions: {[props: string]: boolean}
  admins: string[]
  bind_apps: string[]
  visitors: string[]
}
