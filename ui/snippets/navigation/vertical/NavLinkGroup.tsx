import {
  Text,
  HStack,
  Box,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import type { NavGroupItem } from 'types/client/navigation';

import Popover from 'ui/shared/chakra/Popover';
import IconSvg from 'ui/shared/IconSvg';

import useNavLinkStyleProps from '../useNavLinkStyleProps';
import NavLink from './NavLink';

type Props = {
  item: NavGroupItem;
  isCollapsed?: boolean;
};

const NavLinkGroup = ({ item, isCollapsed }: Props) => {
  const isExpanded = isCollapsed === false;

  const styleProps = useNavLinkStyleProps({ isCollapsed, isExpanded, isActive: item.isActive });

  return (
    <Box className="lcai-nav-item" as="li" listStyleType="none" w="100%">
      <Popover
        trigger="hover"
        placement="bottom-start"
        // should not be lazy to help google indexing pages
        isLazy={ false }
        gutter={ 0 }
      >
        <PopoverTrigger>
          <Box
            { ...styleProps.itemProps }
            aria-label={ `${ item.text } link group` }
            position="relative"
            pr="30px"
          >
            <HStack spacing={ 0 } overflow="hidden" cursor="pointer">
              <Text { ...styleProps.textProps } ml={ 3 }>
                { item.text }
              </Text>
              <IconSvg
                name="arrows/east-mini"
                position="absolute"
                right="4px"
                transform="rotate(-90deg)"
                boxSize={ 6 }
                transitionProperty="opacity"
                transitionDuration="normal"
                transitionTimingFunction="ease"
              />
            </HStack>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          borderRadius="4px"
          width="252px"
          top={{ lg: isExpanded ? '0px' : 0, xl: isCollapsed ? 0 : '0px' }}
        >
          <PopoverBody p={ 4 }>
            <Text
              variant="secondary"
              fontSize="sm"
              mb={ 1 }
              display={{
                lg: isExpanded ? 'none' : 'block',
                xl: isCollapsed ? 'block' : 'none',
              }}
            >
              { item.text }
            </Text>
            <VStack spacing={ 1 } alignItems="start" as="ul" className="dropdown-item">
              { item.subItems.map((subItem, index) =>
                Array.isArray(subItem) ? (
                  <Box
                    key={ index }
                    w="100%"
                    as="ul"
                    _notLast={{
                      mb: 2,
                      pb: 2,
                      borderBottomWidth: '1px',
                      borderColor: 'divider',
                    }}
                  >
                    { subItem.map((subSubItem) => (
                      <NavLink
                        key={ subSubItem.text }
                        item={ subSubItem }
                        isCollapsed={ false }
                      />
                    )) }
                  </Box>
                ) : (
                  <NavLink
                    key={ subItem.text }
                    item={ subItem }
                    isCollapsed={ false }
                  />
                ),
              ) }
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default NavLinkGroup;
