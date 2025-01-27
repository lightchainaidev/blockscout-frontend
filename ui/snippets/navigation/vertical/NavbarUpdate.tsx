import { Flex, Box, VStack, Container } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import config from 'configs/app';
import useNavItems, { isGroupItem } from 'lib/hooks/useNavItems';
import getDefaultTransitionProps from 'theme/utils/getDefaultTransitionProps';
import RewardsButton from 'ui/rewards/RewardsButton';
import useIsAuth from 'ui/snippets/auth/useIsAuth';
import NetworkLogo from 'ui/snippets/networkMenu/NetworkLogo';
import NetworkMenu from 'ui/snippets/networkMenu/NetworkMenu';
import Settings from 'ui/snippets/topBar/settings/Settings';
import TopBarStats from 'ui/snippets/topBar/TopBarStats';
import UserProfileDesktop from 'ui/snippets/user/profile/UserProfileDesktop';
import UserWalletDesktop from 'ui/snippets/user/wallet/UserWalletDesktop';

import bannerTopImagesLight from '../../../../public/assets/images/banner/separator-top-light.svg';
import bannerTopImages from '../../../../public/assets/images/banner/separator-top.svg';
import NavLink from './NavLink';
import NavLinkGroup from './NavLinkGroup';
import NavLinkRewards from './NavLinkRewards';

const NavbarUpdate = () => {
  const { mainNavItems, accountNavItems } = useNavItems();

  const isAuth = useIsAuth();

  return (
    <Container maxWidth="1320px">
      <div className="lcai-update-header-wrapper">
        <Box
          mb="30px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            maxWidth="440px"
            width="100%"
            display={{ base: 'none', lg: 'flex' }}
          >
            <TopBarStats/>
          </Box>
          <Flex
            justifyContent="center"
            alignItems="center"
            display={{ base: 'none', lg: 'flex' }}
            maxWidth="440px"
            width="100%"
          >
            <Box
              as="header"
              transitionProperty="padding"
              transitionDuration="normal"
              transitionTimingFunction="ease"
            >
              <NetworkLogo/>
              { Boolean(config.UI.navigation.featuredNetworks) && (
                <NetworkMenu/>
              ) }
            </Box>
          </Flex>
          <Box
            alignItems="center"
            justifyContent="end"
            gap="10px"
            maxWidth="440px"
            width="100%"
            display={{ base: 'none', lg: 'flex' }}
          >
            <Settings/>
            { /* <UserProfileButton /> */ }
            { config.UI.navigation.layout === 'vertical' && (
              <Box display={{ base: 'none', lg: 'flex' }} gap={ 2 }>
                { config.features.rewards.isEnabled && (
                  <RewardsButton variant="hero"/>
                ) }
                { (config.features.account.isEnabled && (
                  <UserProfileDesktop buttonVariant="hero"/>
                )) ||
                  (config.features.blockchainInteraction.isEnabled && (
                    <UserWalletDesktop buttonVariant="hero"/>
                  )) }
              </Box>
            ) }
          </Box>
        </Box>
        <Flex
          // display="flex"
          role="group"
          position="relative"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          pb="20px"
          className="asdad"
          display={{ base: 'none', lg: 'flex' }}
          { ...getDefaultTransitionProps({
            transitionProperty: 'width, padding',
          }) }
        >
          <Box className="mainmenu-nav" as="nav" display="flex">
            { mainNavItems.map((item) => {
              if (isGroupItem(item)) {
                return <NavLinkGroup key={ item.text } item={ item }/>;
              } else {
                return <NavLink key={ item.text } item={ item }/>;
              }
            }) }
          </Box>
          { isAuth && (
            <Box
              as="nav"
              borderTopWidth="1px"
              borderColor="divider"
              w="100%"
              mt={ 3 }
              pt={ 3 }
            >
              <VStack as="ul" spacing="1" alignItems="flex-start">
                <NavLinkRewards/>
                { accountNavItems.map((item) => (
                  <NavLink key={ item.text } item={ item }/>
                )) }
              </VStack>
            </Box>
          ) }
        </Flex>
        <div className="top-shape-thumbnail">
          <Image className="for-dark" src={ bannerTopImages } alt="Shape image"/>
          <Image
            className="for-light"
            src={ bannerTopImagesLight }
            alt="Shape image"
          />
        </div>
      </div>
    </Container>
  );
};

export default NavbarUpdate;
