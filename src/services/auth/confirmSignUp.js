import { Auth } from 'aws-amplify';
import { redirect } from 'react-router-dom';

const confirmSignUp = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const { username, ...codeJSON } = Object.fromEntries(formData);
    const keys = Object.keys(codeJSON);
    const code = keys.map((key) => codeJSON[key]).join('');
    await Auth.confirmSignUp(username, code);
    localStorage.removeItem('usertmp');
    return redirect('/success/verified');
  } catch (error) {
    if (/invalid verification code/i.test(error.message)) return redirect(`${params.userId}/error`);
    throw new Response('', {
      status: 400,
      statusText: error.message,
    });
  }
};

export default confirmSignUp;
