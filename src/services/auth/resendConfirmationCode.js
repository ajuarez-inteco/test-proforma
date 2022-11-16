// TODO: add error handler
import { Auth } from 'aws-amplify';

const resendConfirmationCode = async ({ params }) => {
  try {
    const { userId } = params;
    await Auth.resendSignUp(userId);
  } catch (err) {
    // console.log('error resending code: ', err);
  }
};

export default resendConfirmationCode;
