import { Flex, useColorModeValue, chakra } from '@chakra-ui/react';
import React from 'react';

import useIsSticky from 'lib/hooks/useIsSticky';

type Props = {
  children: React.ReactNode;
  className?: string;
  showShadow?: boolean;
};

const TOP_UP = 106;
export const ACTION_BAR_HEIGHT_DESKTOP = 24 + 32 + 12;
export const ACTION_BAR_HEIGHT_MOBILE = 24 + 32 + 24;

const ActionBar = ({ children, className, showShadow }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(ref, TOP_UP + 5);
  const bgColor = useColorModeValue('white', 'black');

  if (!React.Children.toArray(children).filter(Boolean).length) {
    return null;
  }

  return (
    <Flex
      className={ `lcai-pagination ${ className }` }
      backgroundColor={ bgColor }
      wrap={{ base: 'wrap' }}
      gap={{ base: 5 }}
      pt={ 6 }
      pb={{ base: 6, lg: 6 }}
      pl={{ base: 0, lg: 0 }}
      mx="auto"
      justifyContent="space-between"
      width={{ base: '100%', lg: 'unset' }}
      position="sticky"
      transitionProperty="top,box-shadow,background-color,color"
      transitionDuration="normal"
      zIndex={{ base: '9', lg: 'docked' }}
      boxShadow={{
        base: isSticky ? 'none' : 'none',
        lg: isSticky && showShadow ? 'action_bar' : 'none',
      }}
      ref={ ref }
    >
      { children }
    </Flex>
  );
};

export default chakra(ActionBar);
