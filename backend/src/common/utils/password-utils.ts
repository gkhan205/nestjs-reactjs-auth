import * as bcrypt from 'bcrypt';

const salt = 10;

export const createHashedPassword = async (
  password: string,
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
