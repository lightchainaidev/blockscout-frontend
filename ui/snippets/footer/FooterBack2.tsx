import type { GridProps, HTMLChakraProps } from '@chakra-ui/react';
import {
  Container,
  Box,
  Grid,
  Flex,
  Text,
  Link,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

import type { CustomLinksGroup } from 'types/footerLinks';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import useApiQuery from 'lib/api/useApiQuery';
import useFetch from 'lib/hooks/useFetch';
import useIssueUrl from 'lib/hooks/useIssueUrl';
import { copy } from 'lib/html-entities';
import HomeNewsletter from 'ui/home/HomeNewsletter';
import Skeleton from 'ui/shared/chakra/Skeleton';
import IconSvg from 'ui/shared/IconSvg';
import { CONTENT_MAX_WIDTH } from 'ui/shared/layout/utils';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

// import bgShape from '../../../assets/images/shape/footer-shape-1.png';
// import bgShape2 from '../../../assets/images/shape/footer-shape-2.png';
import NetworkLogo from '../networkMenu/NetworkLogo';
import FooterLinkItem from './FooterLinkItem';
import IntTxsIndexingStatus from './IntTxsIndexingStatus';
import getApiVersionUrl from './utils/getApiVersionUrl';

const MAX_LINKS_COLUMNS = 4;

const FRONT_VERSION_URL = `https://github.com/blockscout/frontend/tree/${ config.UI.footer.frontendVersion }`;
const FRONT_COMMIT_URL = `https://github.com/blockscout/frontend/commit/${ config.UI.footer.frontendCommit }`;

const Footer = () => {
  const { data: backendVersionData } = useApiQuery('config_backend_version', {
    queryOptions: {
      staleTime: Infinity,
    },
  });
  const apiVersionUrl = getApiVersionUrl(backendVersionData?.backend_version);
  const issueUrl = useIssueUrl(backendVersionData?.backend_version);
  const logoColor = useColorModeValue('blue.600', 'white');

  const BLOCKSCOUT_LINKS = [
    {
      icon: 'edit' as const,
      iconSize: '16px',
      text: 'Submit an issue',
      url: issueUrl,
    },
    {
      icon: 'social/git' as const,
      iconSize: '18px',
      text: 'Contribute',
      url: 'https://github.com/blockscout/blockscout',
    },
    {
      icon: 'social/twitter' as const,
      iconSize: '18px',
      text: 'X (ex-Twitter)',
      url: 'https://www.twitter.com/blockscoutcom',
    },
    {
      icon: 'social/discord' as const,
      iconSize: '24px',
      text: 'Discord',
      url: 'https://discord.gg/blockscout',
    },
    {
      icon: 'brands/blockscout' as const,
      iconSize: '18px',
      text: 'All chains',
      url: 'https://www.blockscout.com/chains-and-projects',
    },
    {
      icon: 'donate' as const,
      iconSize: '20px',
      text: 'Donate',
      url: 'https://github.com/sponsors/blockscout',
    },
  ];

  const frontendLink = (() => {
    if (config.UI.footer.frontendVersion) {
      return (
        <Link href={ FRONT_VERSION_URL } target="_blank">
          { config.UI.footer.frontendVersion }
        </Link>
      );
    }

    if (config.UI.footer.frontendCommit) {
      return (
        <Link href={ FRONT_COMMIT_URL } target="_blank">
          { config.UI.footer.frontendCommit }
        </Link>
      );
    }

    return null;
  })();

  const fetch = useFetch();

  const { isPlaceholderData, data: linksData } = useQuery<
    unknown,
    ResourceError<unknown>,
    Array<CustomLinksGroup>
  >({
    queryKey: [ 'footer-links' ],
    queryFn: async() =>
      fetch(config.UI.footer.links || '', undefined, {
        resource: 'footer-links',
      }),
    enabled: Boolean(config.UI.footer.links),
    staleTime: Infinity,
    placeholderData: [],
  });

  const colNum = isPlaceholderData ?
    1 :
    Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS) + 1;

  const renderNetworkInfo = React.useCallback(
    (gridArea?: GridProps['gridArea']) => {
      return (
        <Flex
          gridArea={ gridArea }
          flexWrap="wrap"
          columnGap={ 8 }
          rowGap={ 6 }
          mb={{ base: 5, lg: 10 }}
          _empty={{ display: 'none' }}
        >
          { !config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus/> }
          <NetworkAddToWallet/>
        </Flex>
      );
    },
    [],
  );

  const renderProjectInfo = React.useCallback(
    (gridArea?: GridProps['gridArea']) => {
      return (
        <Box gridArea={ gridArea }>
          <Flex
            columnGap={ 2 }
            fontSize="xs"
            lineHeight={ 5 }
            alignItems="center"
            color="text"
          >
            <span className="clr-body">Made with</span>
            <Link
              href="https://www.blockscout.com"
              isExternal
              display="inline-flex"
              color={ logoColor }
              _hover={{ color: logoColor }}
            >
              <IconSvg
                className="clr-body"
                name="networks/logo-placeholder"
                width="80px"
                height={ 4 }
              />
            </Link>
          </Flex>
          <Text mt={ 3 } fontSize="xs" className="footer-desc">
            Blockscout is a tool for inspecting and analyzing EVM based
            blockchains. Blockchain explorer for Ethereum Networks.
          </Text>
          <Box mt={ 6 } alignItems="start" fontSize="xs" lineHeight={ 5 }>
            { apiVersionUrl && (
              <Text>
                Backend:{ ' ' }
                <Link href={ apiVersionUrl } target="_blank">
                  { backendVersionData?.backend_version }
                </Link>
              </Text>
            ) }
            { frontendLink && (
              <Text className="clr-body">Frontend: { frontendLink }</Text>
            ) }
            <Text className="clr-body">
              Copyright { copy } Blockscout Limited 2023-
              { new Date().getFullYear() }
            </Text>
          </Box>
        </Box>
      );
    },
    [
      apiVersionUrl,
      backendVersionData?.backend_version,
      frontendLink,
      logoColor,
    ],
  );

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    borderTopWidth: '1px',
    borderTopColor: 'solid',
  };

  const contentProps: GridProps = {
    px: {
      base: 4,
      lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12,
      '2xl': 6,
    },
    py: { base: 4, lg: 8 },
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 470px) 1fr' },
    columnGap: { lg: '32px', xl: '100px' },
    maxW: `${ CONTENT_MAX_WIDTH }px`,
    m: '0 auto',
  };

  const renderRecaptcha = (gridArea?: GridProps['gridArea']) => {
    if (!config.services.reCaptchaV2.siteKey) {
      return <Box gridArea={ gridArea }/>;
    }

    return (
      <Box gridArea={ gridArea } fontSize="xs" lineHeight={ 5 } mt={ 6 } color="text">
        <span>This site is protected by reCAPTCHA and the Google </span>
        <Link href="https://policies.google.com/privacy" isExternal>
          Privacy Policy
        </Link>
        <span> and </span>
        <Link href="https://policies.google.com/terms" isExternal>
          Terms of Service
        </Link>
        <span> apply.</span>
      </Box>
    );
  };

  if (config.UI.footer.links) {
    return (
      <Box { ...containerProps }>
        <Grid { ...contentProps }>
          <div>
            { renderNetworkInfo() }
            { renderProjectInfo() }
            { renderRecaptcha() }
          </div>

          <Grid
            gap={{
              base: 6,
              lg: colNum === MAX_LINKS_COLUMNS + 1 ? 2 : 8,
              xl: 12,
            }}
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 160px)',
              lg: `repeat(${ colNum }, 135px)`,
              xl: `repeat(${ colNum }, 160px)`,
            }}
            justifyContent={{ lg: 'flex-end' }}
            mt={{ base: 8, lg: 0 }}
          >
            { [
              { title: 'Blockscout', links: BLOCKSCOUT_LINKS },
              ...(linksData || []),
            ]
              .slice(0, colNum)
              .map((linkGroup) => (
                <Box key={ linkGroup.title }>
                  <Skeleton
                    fontWeight={ 500 }
                    mb={ 3 }
                    display="inline-block"
                    isLoaded={ !isPlaceholderData }
                  >
                    { linkGroup.title }
                  </Skeleton>
                  <VStack spacing={ 1 } alignItems="start">
                    { linkGroup.links.map((link) => (
                      <FooterLinkItem
                        { ...link }
                        key={ link.text }
                        isLoading={ isPlaceholderData }
                      />
                    )) }
                  </VStack>
                </Box>
              )) }
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <div className="lcai-footer-area">
      <div className="lcai-footer-wrapper">
        <Container maxWidth="1320px" px="0">
          <Box { ...containerProps }>
            <HomeNewsletter/>
            <Box className="lcai-footer-top-section">
              <NetworkLogo/>
              <Box className="content">
                <p className="color-body">Lightscan Explorer Empowering Blockchain Transparency & AI-Driven Insights on Testnet.</p>
              </Box>
              <div className="separator-animated animated-true mt--50 mb--50"></div>
            </Box>

            <div className="lsb-newsletter-shape-wrap">
              <div className="shape-bg">
                <Image
                  src="/assets/images/shape/footer-shape-1.png"
                  width={ 634 }
                  height={ 210 }
                  alt="Shape"
                ></Image>
              </div>
              <div className="shape-2">
                <Image
                  src="/assets/images/shape/footer-shape-2.png"
                  width={ 634 }
                  height={ 350 }
                  alt="Shape"
                ></Image>
              </div>
            </div>

            <Box
              { ...contentProps }
              gridTemplateAreas={{
                lg: `
             "network links-top"
             "info links-bottom"
             "recaptcha links-bottom"
           `,
              }}
              className="footer-wrapper"
            >
              <Box className="footer-grid-wrapper">
                <Box className="single-grid grid-column-2">
                  { renderNetworkInfo({ lg: 'network' }) }
                  { renderRecaptcha({ lg: 'recaptcha' }) }
                </Box>
                <Box className="single-grid">
                  <Box className="widget-title">
                    <h4 className="title">Blockchain</h4>
                  </Box>
                  <Box className="footer-link">
                    <Link href="/txs" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Transactions
                    </Link>
                    <Link href="/ops" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      User operations
                    </Link>
                    <Link href="/blocks" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Blocks
                    </Link>
                    <Link href="/accounts" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Top accounts
                    </Link>
                    <Link href="/verified-contracts" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Verified contracts
                    </Link>
                    <Link href="/withdrawals" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Withdrawals
                    </Link>
                  </Box>
                </Box>
                <Box className="single-grid">
                  <Box className="widget-title">
                    <h4 className="title">Useful links</h4>
                  </Box>
                  <Box className="footer-link">
                    <Link href="https://lightfaucet.ai/" target="_blank" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      LCAI Faucet
                    </Link>
                    <Link href="https://docs.lightchain.ai/" target="_blank" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Documentation
                    </Link>
                    <Link href="/api-docs" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      REST API
                    </Link>
                    <Link href="/tokens" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Tokens
                    </Link>
                    <Link href="/token-transfers" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Token transfers
                    </Link>
                    <Link href="/contract-verification" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Verify contract
                    </Link>
                    <Link href="/gas-tracker" display="flex" alignItems="center" h="30px" variant="secondary" fontSize="xs">
                      Gas tracker
                    </Link>
                  </Box>
                </Box>
                <Box className="single-grid">
                  <Box className="widget-title">
                    <h4 className="title">Socials</h4>
                  </Box>
                  <Link href="https://x.com/LightchainAI" display="flex" alignItems="center" h="30px" variant="secondary" target="_blank" fontSize="xs">
                    Twitter (X)
                  </Link>
                  <Link href="https://t.me/LightchainProtocol" display="flex" alignItems="center" h="30px" variant="secondary" target="_blank" fontSize="xs">
                    Telegram
                  </Link>
                  <Link href="https://linktr.ee/lightchainai" display="flex" alignItems="center" h="30px" variant="secondary" target="_blank" fontSize="xs">
                    Linktree
                  </Link>
                </Box>
              </Box>
            </Box>

            <Box className="lcai-copyright-area">
              <p className="copyright-text">© 2025 Lightscan. All rights reserved</p>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default React.memo(Footer);
