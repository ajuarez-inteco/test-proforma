import React from 'react';
import { Revenue } from '../pages/Revenue';
import { Captable } from '../pages/CapTable';
import { Models } from '../pages/Models';
import ErrorPage from '../pages/ErrorPage';

export const getInputRouter = () => {
  return [
    {
      path: 'revenue',
      element: <Revenue />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'captable',
      element: <Captable />,
      errorElement: <ErrorPage />,
      children: [
        {
          children: [
            {
              path: ':uuidModel',
              element: <Captable />,
              errorElement: <ErrorPage />,
            },
            {
              path: '',
              element: <Captable />,
            },
          ],
        },
      ],
    },
    {
      path: 'models',
      element: <Models />,
      errorElement: <ErrorPage />,
    },
  ];
};
