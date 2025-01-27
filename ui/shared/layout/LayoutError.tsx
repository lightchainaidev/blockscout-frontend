import { Box } from '@chakra-ui/react';
import React from 'react';

import type { Props } from './types';

import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary';
import HeaderAlert from 'ui/snippets/header/HeaderAlert';
import HeaderDesktop from 'ui/snippets/header/HeaderDesktop';
import HeaderMobile from 'ui/snippets/header/HeaderMobile';
import NavbarUpdate from 'ui/snippets/navigation/vertical/NavbarUpdate';

import * as Layout from './components';

const LayoutError = ({ children }: Props) => {
  return (
    <Layout.Container>
      <Layout.TopRow/>
      <Layout.NavBar/>
      <HeaderMobile/>
      <Box p={{ base: 4, lg: 8 }}>
        <NavbarUpdate/>
      </Box>
      <Layout.MainArea>
        { /* <Layout.SideBar/> */ }
        <Layout.MainColumn>
          <HeaderAlert/>
          <HeaderDesktop/>
          <AppErrorBoundary>
            <main>{ children }</main>
          </AppErrorBoundary>
        </Layout.MainColumn>
      </Layout.MainArea>
      <Layout.Footer/>
    </Layout.Container>
  );
};

export default LayoutError;
