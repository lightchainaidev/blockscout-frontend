import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type Props = {
  score?: number;
};

function AddressProgress({ score = 0 }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ GaugeComponent, setGaugeComponent ] = useState<any>(null);

  useEffect(() => {
    import('react-gauge-component').then((module) => {
      setGaugeComponent(() => module.default);
    });
  }, []);

  if (!GaugeComponent) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      className="progress"
      mt={{ base: 5, sm: 0 }}
      width={{ base: 270, sm: 400 }}
      height={{ base: 160, sm: 250 }}
      //   style={{ width: "400px", height: "250px"  #14152c}}
    >
      { ' ' }
      <GaugeComponent
        className="progress-body"
        style={{ width: '100%', height: '100%' }}
        marginInPercent={{ top: 0.08, bottom: 0.0, left: 0.07, right: 0.07 }}
        arc={{
          emptyColor: '#14152c',
          subArcs: [
            {
              limit: 20,
              color: '#EA4228',
              showTick: true,
            },
            {
              limit: 40,
              color: '#F58B19',
              showTick: true,
            },
            {
              limit: 60,
              color: '#F5CD19',
              showTick: true,
            },
            {
              limit: 80,
              color: '#BAF998',
              showTick: true,
            },
            {
              limit: 100,
              color: '#5BE12C',
              showTick: true,
            },
          ],
        }}
        value={ score }
      />
    </Box>
  );
}

export default AddressProgress;
