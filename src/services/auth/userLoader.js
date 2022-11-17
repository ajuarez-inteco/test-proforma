/* eslint-disable */
import { Auth } from 'aws-amplify';

const userLoader = async ({ params }) => {
  try {
    const currUser = await Auth.signIn(params.userId);
    return currUser;
  } catch (error) {
    if (/user is not confirmed/i.test(error.message)) {
      const user = localStorage.getItem('usertmp');
      return user ? JSON.parse(user) : {
        username: 'Not found'
      };
    }
    throw new Response('', {
      status: 400,
      statusText: 'User does not exist'
    })
  }
};

export default userLoader;
