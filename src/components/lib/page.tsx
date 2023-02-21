import React, { FC } from 'react';
import styled from '@emotion/styled';

import { NavBar } from './nav-bar';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PageBody = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface PageProps {
    children?: React.ReactElement | React.ReactElement[];
}

export const Page:FC<PageProps> = ({ children }) => (
  <PageContainer>
    <div className="page-heading">
      <NavBar />
    </div>
    <PageBody>
      { children }
    </PageBody>
  </PageContainer>
);

export default Page;
