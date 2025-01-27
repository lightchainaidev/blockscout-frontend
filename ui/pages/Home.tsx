import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
// import '../../public/assets/scss/style.scss';

import config from 'configs/app';
import ChainIndicators from 'ui/home/indicators/ChainIndicators';
import LatestArbitrumL2Batches from 'ui/home/latestBatches/LatestArbitrumL2Batches';
import LatestZkEvmL2Batches from 'ui/home/latestBatches/LatestZkEvmL2Batches';
import LatestBlocks from 'ui/home/LatestBlocks';
import Stats from 'ui/home/Stats';
import Transactions from 'ui/home/Transactions';
// import AdBanner from 'ui/shared/ad/AdBanner';

const rollupFeature = config.features.rollup;

const Home = () => {
  const leftWidget = (() => {
    if (rollupFeature.isEnabled && !rollupFeature.homepage.showLatestBlocks) {
      switch (rollupFeature.type) {
        case 'zkEvm':
          return <LatestZkEvmL2Batches/>;
        case 'arbitrum':
          return <LatestArbitrumL2Batches/>;
      }
    }

    return <LatestBlocks/>;
  })();

  return (
    <Box className="main-home-area" as="main">
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        columnGap={ 2 }
        rowGap={ 1 }
        mt={ 0 }
        _empty={{ mt: 0 }}
      >
        <Stats/>
        <ChainIndicators/>
      </Flex>
      <div className="latest">
        <Container maxW="1320px">
          <div className="lcai-section-gapBottom">
            <Flex
              className="lcai-block-with-sidebar"
              direction={{ base: 'column', lg: 'row' }}
            >
              { leftWidget }
              <Box flexGrow={ 1 }>
                <Transactions/>
              </Box>
            </Flex>
          </div>
        </Container>
      </div>
    </Box>
  );
};

export default Home;
