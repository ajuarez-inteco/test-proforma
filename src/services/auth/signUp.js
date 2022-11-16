import { Auth } from 'aws-amplify';

const signUp = async ({
  firstName,
  lastName,
  company,
  email,
  password,
}) => {
  try {
    const userPayload = {
      username: email,
      password,
      attributes: {
        'custom:first_name': firstName,
        'custom:last_name': lastName,
        'custom:company': company,
      },
    };
    console.log(userPayload);
    const userStr = JSON.stringify(userPayload);
    console.log(userStr);
    localStorage.setItem('usertmp', userStr);
    const { userSub } = await Auth.signUp(userPayload);
    return `/success/${userSub}`;
  } catch (error) {
    throw new Response('', {
      status: 400,
      statusText: error.message,
    });
  }
};

export default signUp;
