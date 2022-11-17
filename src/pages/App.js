import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { awsAuth } from '../features/auth';
import { localDataModel } from '../features/models';

import { getAuthRouter } from '../router/Auth';
import { getInputRouter } from '../router/Inputs';

const App = () => {
  const dispatch = useDispatch();
  const { islogin } = useSelector((state) => state.auth);
  const [router, setRouter] = useState([]);
  const [hasRouter, setHasRouter] = useState(false);

  // TODO: esta creando modelos
  useEffect(() => {
    dispatch(awsAuth());
    const authRouters = getAuthRouter(islogin);
    const inputRouter = getInputRouter(islogin);
    const defaultRouter = [].concat(authRouters, inputRouter);
    setRouter(createBrowserRouter(defaultRouter));
    setHasRouter(true);
    /* eslint-disable no-constant-condition */
    if (true || islogin) {
      dispatch(localDataModel());
    }
    // TODO: Add fix to this data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islogin]);

  return <div>{hasRouter && <RouterProvider router={router} />}</div>;
};

export default App;
