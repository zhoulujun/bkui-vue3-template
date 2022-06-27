import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { IUserModel, PermissionUser, UserInfoRes } from '@/typings';
import { getUserInfo,getSpacePermission } from '@/api/modules/user';
import store from '../index';
import { ISpaceItem } from '@/typings';

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule {
  public user: IUserModel | null = null;
  public permissions: PermissionUser = {};
  public space: ISpaceItem | null = null;
  public spaces: ISpaceItem[] = [];

  @Mutation
  setUser(payload: IUserModel) {
    this.user = payload;
  }

  @Mutation
  setSpace(payload: {
    type: 'single' | 'array'
    data: ISpaceItem | ISpaceItem[]
  }) {
    if (payload.type === 'single') {
      this.space = payload.data as ISpaceItem;
    } else {
      this.spaces = payload.data as ISpaceItem[];
    }
  }

  @Mutation
  setPermissions(payload: PermissionUser) {
    this.permissions = payload;
  }

  @Action
  setUserAsync() {
    getUserInfo().then(({ permissions, avatar, username, spaces }: UserInfoRes) => {
      this.context.commit('setUser', { username, avatar });
      this.context.commit('setPermissions', permissions || {});
      this.context.commit('setSpace', { type: 'array', data: spaces });
    });
  }

  @Action
  refreshUserPermissions(space_uid: string): Promise<PermissionUser> {
    return new Promise<PermissionUser>((resolve, reject) => {
      getSpacePermission(space_uid).then((permissions) => {
        this.context.commit('setPermissions', permissions || {});
        resolve(permissions);
      })
        .catch((e) => {
          if (reject) {
            reject(e);
          }
        });
    });
  }
}

export const UserModule = getModule(User);
