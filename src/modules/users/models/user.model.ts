import { UserType } from 'src/common/constants/user-type.constant';
import { DefaultModel } from 'src/common/shared/default.model';

export type UserModel = DefaultModel & {
  name: string;
  email: string;
  password: string;
  type: UserType;
};
