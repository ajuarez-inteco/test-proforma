import React, { useEffect, useState } from 'react';
import {
  Form,
  Outlet,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Button,
  Card,
  Layout,
  Toast,
} from '../../components';
import Logo from '../../assets/img/logotipo.png';
import OkIcon from '../../assets/img/okIcon.svg';
import { useConfirmSignUp } from '../../hooks/auth';
import { authSchema } from '../../utils/schema';
import useSubmit from '../../hooks/submit';

const SuccessSignUp = () => {
  const [user, setUser] = useState({});
  const action = useConfirmSignUp();
  const schema = authSchema.codeSchema;
  const { userId } = useParams();
  const navigate = useNavigate();
  const fields = ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'email'];

  const {
    response,
    alertText,
    setAlertText,
    registerFields,
    onSubmit,
  } = useSubmit({
    schema,
    action,
    fields,
  });
  useEffect(() => {
    localStorage.removeItem('usertmp');
    const userDate = JSON.parse(localStorage.getItem('usertmp'));
    userDate.uuid = userId;
    setUser(userDate);
  }, [userId]);

  useEffect(() => {
    localStorage.removeItem('usertmp');
    if (response) navigate('/success/verified');
  }, [response, navigate]);
  const onKeyDown = (e) => {
    const boxArr = Array.from(e.target.parentNode.childNodes);
    const currBoxIdx = boxArr.findIndex((el) => el === e.target);
    if (e.keyCode === 8 && e.target.value === '') {
      boxArr[Math.max(0, currBoxIdx - 1)].focus();
    }
    const first = e.target.value;
    e.target.value = first ?? '';
  };

  const handleOnChange = (e) => {
    const boxArr = Array.from(e.target.parentNode.childNodes);
    const currBoxIdx = boxArr.findIndex((el) => el === e.target);
    const lastInputBox = currBoxIdx === boxArr.length - 1;
    const didInsertContent = e.target.value !== '';
    if (didInsertContent && !lastInputBox) {
      boxArr[currBoxIdx + 1].focus();
      boxArr[currBoxIdx + 1].value = '';
      return;
    }
    boxArr[currBoxIdx].value = e.target.value;
  };

  return (
    <Layout>
      {alertText && (
        <Toast
          text={alertText}
          type="alert"
          timeOn
          closeAction={() => setAlertText('')}
        />
      )}
      <div className="flex flex-col min-h-full my-20">

        <div className="flex flex-col flex-auto justify-center items-center">
          <Card>
            <div className="flex flex-col flex-auto justify-center items-center">
              <img
                src={Logo}
                alt="logotipo"
                className="max-w-368 w-full h-auto mb-16"
              />
            </div>
            <div className="flex justify-center align-center mb-12">
              <img
                src={OkIcon}
                alt="ok"
                width="28rem"
                className="mr-3"
              />
              <h1 className="text-center text-4xl my-4">Account Created</h1>
            </div>
            <p className="text-center">
              {user
                ? 'Your verification code was sent to'
                : 'Please check your email to get you verification code'}
              {' '}
              {user && user.username}
            </p>
            <form onSubmit={onSubmit}>
              <div className="flex my-6 flex-row justify-between px-12">
                {fields.map((field) => (field === 'email'
                  ? (
                    <input
                      key={field}
                      type="text"
                      className="hidden"
                      value={userId}
                      name={field}
                      readOnly
                      {...registerFields[field]}
                    />
                  )
                  : (
                    <input
                      key={field}
                      onKeyDown={onKeyDown}
                      onChange={handleOnChange}
                      maxLength={1}
                      name={field}
                      {...registerFields[field]}
                      className="text-center rounded-md w-12 h-12 border border-solid border-gray"
                    />
                  )))}
              </div>
              <div className="flex justify-center my-4">
                <Button submit>Verify code</Button>
              </div>
            </form>
            <span className="text-center">
              Didn&apos;t receive code?
              <Form method="post" action="newcode">
                <Button submit inline>
                  Request again
                </Button>
              </Form>
            </span>
          </Card>
        </div>
      </div>
      <Outlet />
    </Layout>
  );
};

export default SuccessSignUp;
