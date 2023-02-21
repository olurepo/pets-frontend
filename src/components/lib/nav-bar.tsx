import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@mui/material';

import { PRIMARY_300 } from '../../utils';

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid ${PRIMARY_300};

  .logo-container {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 50px;
  }

  .nav-links-container {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  a {
    text-decoration: none;
  }
`;

export const NavBar = () => (
  <NavBarContainer>
    <div className="logo-container">
      <p>Adopt-A-Pet</p>
      <div className="nav-links-container">
        <div className="nav-link">
          <Link href="/">
            PETS
          </Link>
        </div>
      </div>
    </div>
  </NavBarContainer>
);

export default NavBar;
