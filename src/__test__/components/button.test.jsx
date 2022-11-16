import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../../components';

test('', () => {
  const onClickBtn = jest.fn();
  render(<Button onClick={onClickBtn}>Hello Button</Button>);

  const button = screen.getByRole('button', { name: 'Hello Button' });

  expect(button).toHaveClass('font-semibold');
});
