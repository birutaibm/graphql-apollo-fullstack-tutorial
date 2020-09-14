import React from 'react';
import styled from 'react-emotion';

import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';
import { isLoggedInVar } from '../cache';

export default function LogoutButton() {
  return (
    <StyledButton
      onClick={() => {
        localStorage.clear();
        isLoggedInVar(false);
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});
