import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { IUserModel, PermissionUser, SpaceItem, UserInfoRes } from '@/typing/user';
import { getUerInfo } from '@/api/modules/user';
import { getSpacePermission } from '@/api/modules/space';
import store from '../index';

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule {
  public user: IUserModel|null = null;
  public permissions: PermissionUser = {};
  public space: SpaceItem |null= null;
  public spaces: SpaceItem[] = [];

  @Mutation
  setUser(payload: IUserModel) {
    this.user = payload;
  }

  @Mutation
  setSpace(payload: SpaceItem) {
    this.space = payload;
    window.space_uid = payload.uid;
  }

  @Mutation
  setPermissions(payload: PermissionUser) {
    this.permissions = payload;
  }

  @Action
  setUserAsync() {
    getUerInfo().then(({ permissions, avatar, username, spaces }: UserInfoRes) => {
      this.context.commit('setUser', { username, avatar });
      this.context.commit('setPermissions', permissions || {});
      this.context.commit('setSpace', spaces);
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
