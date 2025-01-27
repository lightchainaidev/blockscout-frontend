import { Container } from '@chakra-ui/react';
import React from 'react';

import type { Props } from './types';

import HeroBanner from 'ui/home/HeroBanner';
import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary';
// import HeaderAlert from 'ui/snippets/header/HeaderAlert';
import HeaderMobile from 'ui/snippets/header/HeaderMobile';

import * as Layout from './components';

const LayoutHome = ({ children }: Props) => {
  return (
    <div>
      { /* <Layout.TopRow/> */ }
      <HeaderMobile hideSearchBar/>
      <HeroBanner/>
      <Layout.Container>
        { /* <Layout.NavBar/> */ }
        <Layout.MainArea>
          { /* <Layout.SideBar/> */ }
          <Container maxWidth="1920px">
            <AppErrorBoundary>{ children }</AppErrorBoundary>
          </Container>
          { /* <HeaderAlert/> */ }
        </Layout.MainArea>
        <div className="lcai-footer-main-area">
          <Container maxWidth="1320px">
            <Layout.Footer/>
          </Container>
        </div>
      </Layout.Container>
    </div>
  );
};

export default LayoutHome;
