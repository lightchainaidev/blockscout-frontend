import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import config from 'configs/app';
import { useScrollDirection } from 'lib/contexts/scrollDirection';
import RewardsButton from 'ui/rewards/RewardsButton';
import NetworkLogo from 'ui/snippets/networkMenu/NetworkLogo';
import SearchBar from 'ui/snippets/searchBar/SearchBar';
import UserProfileMobile from 'ui/snippets/user/profile/UserProfileMobile';
import UserWalletMobile from 'ui/snippets/user/wallet/UserWalletMobile';

import Settings from '../topBar/settings/Settings';
import Burger from './Burger';

type Props = {
  hideSearchBar?: boolean;
  renderSearchBar?: () => React.ReactNode;
};

const HeaderMobile = ({ hideSearchBar, renderSearchBar }: Props) => {
  const bgColor = useColorModeValue('white', 'black');
  const scrollDirection = useScrollDirection();
  const { ref, inView } = useInView({ threshold: 1 });

  const searchBar = renderSearchBar ? renderSearchBar() : <SearchBar/>;

  return (
    <Box
      className="mobile-menu"
      ref={ ref }
      bgColor={ bgColor }
      display={{ base: 'block', lg: 'none' }}
      position="sticky"
      top="-1px"
      left={ 0 }
      zIndex="sticky2"
      pt="1px"
    >
      <Flex
        as="header"
        paddingX={ 6 }
        paddingY={ 4 }
        bgColor={ bgColor }
        width="100%"
        alignItems="center"
        transitionProperty="box-shadow"
        transitionDuration="slow"
        boxShadow={ !inView && scrollDirection === 'down' ? 'md' : 'none' }
        className="lcai-mobile-inner"
      >
        <div className="lcai-humbergur">
          <Burger/>
        </div>
        <NetworkLogo ml={ 2 } mr="auto"/>
        <Flex
          alignItems="center"
          justifyContent="end"
          gap="10px"
        >
          <Settings/>
          <Flex columnGap={ 2 } className="lcai-mobile-menu-button">
            { config.features.rewards.isEnabled && <RewardsButton/> }
            {
              (config.features.account.isEnabled && <UserProfileMobile/>) ||
              (config.features.blockchainInteraction.isEnabled && <UserWalletMobile/>) ||
              <Box boxSize={ 10 }/>
            }
          </Flex>
        </Flex>
      </Flex>
      { !hideSearchBar && searchBar }
    </Box>
  );
};
export default React.memo(HeaderMobile);
