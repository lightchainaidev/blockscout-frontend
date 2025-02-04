import { Box, Container } from '@chakra-ui/react';
import React from 'react';

import type { Props } from './types';

import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary';
import HeaderAlert from 'ui/snippets/header/HeaderAlert';
import HeaderDesktop from 'ui/snippets/header/HeaderDesktop';
import HeaderMobile from 'ui/snippets/header/HeaderMobile';
import NavbarUpdate from 'ui/snippets/navigation/vertical/NavbarUpdate';

import * as Layout from './components';

const LayoutDefault = ({ children }: Props) => {
  return (
    <Box>
      { /* <Layout.TopRow/>  p={{ base: 4, lg: 8 }} */ }
      <Layout.Container>
        <HeaderMobile/>
        <NavbarUpdate/>

        { /* <Layout.NavBar/> */ }
        <Layout.MainArea>
          { /* <Layout.SideBar/> */ }
          <Layout.MainColumn className="layout-col" pt={{ base: 0, md: 5 }}>
            <HeaderAlert/>
            <HeaderDesktop/>
            <AppErrorBoundary>
              <Layout.Content>
                <Container maxW="1320px">{ children }</Container>
              </Layout.Content>
            </AppErrorBoundary>
          </Layout.MainColumn>
        </Layout.MainArea>
        <Layout.Footer/>
      </Layout.Container>
    </Box>
  );
};

export default LayoutDefault;
