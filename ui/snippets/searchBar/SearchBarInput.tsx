import {
  InputGroup,
  Input,
  InputLeftElement,
  chakra,
  useColorModeValue,
  forwardRef,
} from '@chakra-ui/react';
import throttle from 'lodash/throttle';
import React from 'react';
import type { ChangeEvent, FormEvent, FocusEvent } from 'react';

import { useScrollDirection } from 'lib/contexts/scrollDirection';
import useIsMobile from 'lib/hooks/useIsMobile';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBlur?: (event: FocusEvent<HTMLFormElement>) => void;
  onFocus?: () => void;
  onHide?: () => void;
  onClear: () => void;
  isHomepage?: boolean;
  isSuggestOpen?: boolean;
  value: string;
}

const SearchBarInput = (
  {
    onChange,
    onSubmit,
    isHomepage,
    isSuggestOpen,
    onFocus,
    onBlur,
    onHide,
    value,
  }: Props,
  ref: React.ForwardedRef<HTMLFormElement>,
) => {
  const innerRef = React.useRef<HTMLFormElement>(null);
  React.useImperativeHandle(ref, () => innerRef.current as HTMLFormElement, []);
  const [ isSticky, setIsSticky ] = React.useState(false);
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  const handleScroll = React.useCallback(() => {
    const TOP_BAR_HEIGHT = 36;
    if (!isHomepage) {
      if (window.scrollY >= TOP_BAR_HEIGHT) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    const clientRect = isMobile && innerRef?.current?.getBoundingClientRect();
    if (clientRect && clientRect.y < TOP_BAR_HEIGHT) {
      onHide?.();
    }
  }, [ isMobile, onHide, isHomepage ]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [ onChange ],
  );

  React.useEffect(() => {
    if (!isMobile) {
      return;
    }
    const throttledHandleScroll = throttle(handleScroll, 300);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [ isMobile, handleScroll ]);

  const handleKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      if (isMobile) {
        return;
      }

      switch (event.key) {
        case '/': {
          if (
            [ 'INPUT', 'TEXTAREA' ].includes(
              (event.target as HTMLElement).tagName,
            )
          ) {
            break;
          }

          if (!isSuggestOpen) {
            event.preventDefault();
            innerRef.current?.querySelector('input')?.focus();
            onFocus?.();
          }
          break;
        }
        case 'Escape': {
          if (isSuggestOpen) {
            innerRef.current?.querySelector('input')?.blur();
            onHide?.();
          }
          break;
        }
      }
    },
    [ isMobile, isSuggestOpen, onFocus, onHide ],
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [ handleKeyPress ]);

  const transformMobile =
    scrollDirection !== 'down' ? 'translateY(0)' : 'translateY(-100%)';

  return (
    <chakra.form
      ref={ innerRef }
      noValidate
      onSubmit={ onSubmit }
      onBlur={ onBlur }
      onFocus={ onFocus }
      maxW="648px"
      className="banner-search"
      position={{ base: isHomepage ? 'static' : 'absolute', lg: 'relative' }}
      top={{ base: isHomepage ? 0 : 55, lg: 0 }}
      left="0"
      zIndex={{
        base: isHomepage ? 'auto' : '-1',
        lg: isSuggestOpen ? 'popover' : 'auto',
      }}
      paddingX={{ base: isHomepage ? 0 : 3, lg: 0 }}
      paddingTop={{ base: isHomepage ? 0 : 10, lg: 0 }}
      paddingBottom={{ base: isHomepage ? 0 : 2, lg: 0 }}
      boxShadow={ scrollDirection !== 'down' && isSticky ? 'none' : 'none' }
      // boxShadow={scrollDirection !== "down" && isSticky ? "md" : "none"}
      transform={{ base: isHomepage ? 'none' : transformMobile, lg: 'none' }}
      transitionProperty="transform,box-shadow,background-color,color,border-color"
      transitionDuration="normal"
      transitionTimingFunction="ease"
    >
      <InputGroup size={{ base: 'sm', lg: isHomepage ? 'sm_md' : 'sm' }}>
        <InputLeftElement
          w={{ base: isHomepage ? 6 : 4, lg: 6 }}
          ml={{ base: isHomepage ? 4 : 3, lg: 4 }}
          h="100%"
        >
          <IconSvg
            name="search"
            boxSize={{ base: isHomepage ? 6 : 4, lg: 6 }}
            color={ useColorModeValue('system.100', 'whiteAlpha.600') }
          />
        </InputLeftElement>
        <Input
          className="banner-searchbar"
          pl={{ base: isHomepage ? '50px' : '38px', lg: '50px' }}
          sx={{
            '@media screen and (max-width: 999px)': {
              paddingLeft: isHomepage ? '50px' : '38px',
              paddingRight: '36px',
            },
            '@media screen and (min-width: 1001px)': {
              paddingRight: '36px',
            },
          }}
          placeholder={
            isMobile ?
              'Search by address / ... ' :
              'Search transactions, blocks, programs and tokens'
          }
          onChange={ handleChange }
          border={ isHomepage ? 'none' : '2px solid' }
          borderColor={ useColorModeValue('blackAlpha.100', 'whiteAlpha.200') }
          _focusWithin={{ _placeholder: { color: 'white' } }}
          color={ useColorModeValue('white', 'blackAlpha.100') }
          value={ value }
        />
        { /* <InputRightElement top={{ base: 2, lg: isHomepage ? 3 : 2 }} right={ 2 }>
          { rightElement }
        </InputRightElement> */ }
      </InputGroup>
    </chakra.form>
  );
};

export default React.memo(forwardRef(SearchBarInput));
