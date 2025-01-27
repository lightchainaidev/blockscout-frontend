import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import useApiQuery from 'lib/api/useApiQuery';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useIsMobile from 'lib/hooks/useIsMobile';
import useNewTxsSocket from 'lib/hooks/useNewTxsSocket';
import { TX } from 'stubs/tx';
import LinkInternal from 'ui/shared/links/LinkInternal';
import SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';

import LatestTxsItem from './LatestTxsItem';
import LatestTxsItemMobile from './LatestTxsItemMobile';

const LatestTransactions = () => {
  const isMobile = useIsMobile();
  const txsCount = isMobile ? 2 : 6;
  const { data, isPlaceholderData, isError } = useApiQuery('homepage_txs', {
    queryOptions: {
      placeholderData: Array(txsCount).fill(TX),
    },
  });

  const { num, socketAlert } = useNewTxsSocket();

  if (isError) {
    return <Text mt={ 4 }>No data. Please reload the page.</Text>;
  }

  if (data) {
    const txsUrl = route({ pathname: '/txs' });
    return (
      <>
        <div className="lcai-top-section-title">
          <Heading as="h4" size="sm" mb={ 3 }>
            Latest transactions
          </Heading>
          <SocketNewItemsNotice
            className="lcai-socket-new-notify"
            borderBottomRadius={ 0 }
            borderTopRadius={ 8 }
            url={ txsUrl }
            num={ num }
            alert={ socketAlert }
            isLoading={ isPlaceholderData }
          />
        </div>
        <div className="lcai-table">
          <Box mb={ 3 } display={{ base: 'block', lg: 'none' }}>
            { data.slice(0, txsCount).map((tx, index) => (
              <LatestTxsItemMobile
                key={ tx.hash + (isPlaceholderData ? index : '') }
                tx={ tx }
                isLoading={ isPlaceholderData }
              />
            )) }
          </Box>
          <AddressHighlightProvider>
            <Box
              className="table-list-wrapper"
              borderBottomRadius="8px"
              overflow="hidden"
              mb={ 3 }
              display={{ base: 'none', lg: 'block' }}
            >
              { data.slice(0, txsCount).map((tx, index) => (
                <LatestTxsItem
                  key={ tx.hash + (isPlaceholderData ? index : '') }
                  tx={ tx }
                  isLoading={ isPlaceholderData }
                />
              )) }
            </Box>
          </AddressHighlightProvider>
          <Flex justifyContent="center" mb="20px">
            <LinkInternal fontSize="sm" href={ txsUrl }>
              View all transactions
            </LinkInternal>
          </Flex>
        </div>
      </>
    );
  }
  return null;
};

export default LatestTransactions;
