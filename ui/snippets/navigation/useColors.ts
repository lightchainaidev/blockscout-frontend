import { useColorModeValue } from '@chakra-ui/react';

export default function useColors() {
  return {
    text: {
      'default': useColorModeValue('dark.200', 'white'),
      active: useColorModeValue('blue.700', 'gray.50'),
      hover: useColorModeValue('primary.100', 'primary.100'),
    },
    bg: {
      'default': 'transparent',
      active: useColorModeValue('blue.50', 'gray.800'),
    },
    border: {
      'default': 'divider',
      active: useColorModeValue('blue.50', 'gray.800'),
    },
  };
}
