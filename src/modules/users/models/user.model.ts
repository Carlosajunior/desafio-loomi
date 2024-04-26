import { userType } from '@prisma/client';
import { DefaultModel } from 'src/common/shared/default.model';

export type UserModel = DefaultModel & {
  name: string;
  email: string;
  password: string;
  type: userType;
};
