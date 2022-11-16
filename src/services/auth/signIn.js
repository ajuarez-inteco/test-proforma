import { Auth } from 'aws-amplify';
import { redirect } from 'react-router-dom';

const signIn = async ({ request }) => {
  try {
    const formData = await request.formData();
    const userObj = Object.fromEntries(formData);
    const userCredentials = {
      email: userObj.email,
      password: userObj.password,
    };

    // TODO: implement success auth
    await Auth.signIn(userCredentials.email, userCredentials.password);
    return redirect('/revenue');
  } catch (error) {
    // errores
  }
  return null;
};

export default signIn;
