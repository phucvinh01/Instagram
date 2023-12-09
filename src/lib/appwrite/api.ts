import { INewUser } from '@/types';
import { ID, account } from './config';

export const createNewUser = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
  } catch (err) {
    console.log(err);
  }
};
