/* eslint-disable */
import { Auth } from 'aws-amplify';

const userLoader = async ({ params }) => {
  console.log(params);
  const user = JSON.parse(localStorage.getItem('usertmp'));
  console.log(user);
  user.uuid = params.userId;
  return user ? JSON.parse(user) : {
    username: 'Not found'
  };
};

export default userLoader;
