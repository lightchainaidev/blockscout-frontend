import { Container, Flex } from '@chakra-ui/react';
import React from 'react';

import IndexingBlocksAlert from './alerts/IndexingBlocksAlert';
import MaintenanceAlert from './alerts/MaintenanceAlert';

const HeaderAlert = () => {
  return (
    <Container
      className="alert-container"
      maxWidth="1320px"
      pt={{ base: 20, sm: 16, md: 12 }}
      px={{ base: 0, lg: 4 }}
    >
      <Flex flexDir="column" rowGap={ 3 } mb={ 3 } _empty={{ display: 'none' }}>
        <MaintenanceAlert/>
        <IndexingBlocksAlert/>
      </Flex>
    </Container>
  );
};

export default React.memo(HeaderAlert);
