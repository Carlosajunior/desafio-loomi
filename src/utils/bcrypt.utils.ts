import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const SALT = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, SALT);
}

export function checkPassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
