import { DefaultModel } from 'src/common/shared/default.model';
import { UserModel } from 'src/modules/users/models/user.model';

export type CustomerModel = DefaultModel & {
  user: UserModel;
  user_id: string;
  name: string;
  contact: string;
  address: string;
  status: boolean;
};
