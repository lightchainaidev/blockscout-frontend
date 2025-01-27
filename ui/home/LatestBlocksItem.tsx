import {
  Box,
  Flex,
  Grid,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { Block } from 'types/api/block';

import config from 'configs/app';
import getBlockTotalReward from 'lib/block/getBlockTotalReward';
import getNetworkValidatorTitle from 'lib/networks/getNetworkValidatorTitle';
import Skeleton from 'ui/shared/chakra/Skeleton';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import IconSvg from 'ui/shared/IconSvg';
import TimeAgoWithTooltip from 'ui/shared/TimeAgoWithTooltip';

type Props = {
  block: Block;
  isLoading?: boolean;
};

const LatestBlocksItem = ({ block, isLoading }: Props) => {
  const totalReward = getBlockTotalReward(block);
  return (
    <Box
      className="lcai-single-block"
      as={ motion.div }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ display: 'none' }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      borderRadius="md"
      border="1px solid"
      borderColor="secondary.300"
      p={ 3 }
    >
      <Flex alignItems="center" overflow="hidden" w="100%" mb={ 3 }>
        <BlockEntity
          isLoading={ isLoading }
          number={ block.height }
          tailLength={ 2 }
          fontSize="xl"
          lineHeight={ 7 }
          fontWeight={ 500 }
          mr="auto"
        />
        { block.celo?.is_epoch_block && (
          <Tooltip label={ `Finalized epoch #${ block.celo.epoch_number }` }>
            <IconSvg name="checkered_flag" boxSize={ 5 } p="1px" ml={ 2 } isLoading={ isLoading } flexShrink={ 0 }/>
          </Tooltip>
        ) }
        <TimeAgoWithTooltip
          className="lcai-badge"
          timestamp={ block.timestamp }
          enableIncrement={ !isLoading }
          isLoading={ isLoading }
          color="text_secondary"
          fontWeight={ 400 }
          display="inline-block"
          fontSize="sm"
          flexShrink={ 0 }
          ml={ 2 }
        />
      </Flex>
      <Grid className="lcai-block-table" gridGap={ 5 } templateColumns="auto minmax(0, 1fr)" fontSize="sm">
        <div className="list-item">
          <Skeleton className="list-title" isLoaded={ !isLoading }>Txn</Skeleton>
          <Skeleton isLoaded={ !isLoading } color="text_secondary"><span>{ block.transaction_count }</span></Skeleton>
        </div>

        { !config.features.rollup.isEnabled && !config.UI.views.block.hiddenFields?.total_reward && (
          <div className="list-item">
            <Skeleton className="list-title" isLoaded={ !isLoading }>Reward</Skeleton>
            <Skeleton isLoaded={ !isLoading } color="text_secondary"><span>{ totalReward.dp(10).toFixed() }</span></Skeleton>
          </div>
        ) }

        { !config.features.rollup.isEnabled && !config.UI.views.block.hiddenFields?.miner && (
          <div className="list-item">
            <Skeleton className="list-title" isLoaded={ !isLoading } textTransform="capitalize">{ getNetworkValidatorTitle() }</Skeleton>
            <AddressEntity
              address={ block.miner }
              isLoading={ isLoading }
              noIcon
              noCopy
              truncation="constant"
            />
          </div>
        ) }

      </Grid>
    </Box>
  );
};

export default LatestBlocksItem;
