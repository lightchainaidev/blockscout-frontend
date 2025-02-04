import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';

import NavbarUpdate from 'ui/snippets/navigation/vertical/NavbarUpdate';
import SearchBar from 'ui/snippets/searchBar/SearchBar';

// import bannerImgLight from '../../assets/images/banner/banner-light-image-light.png';
// import bannerImg from '../../assets/images/banner/banner-light-image.png';
// import bannerSvg from '../../assets/images/banner/title-svg.png';

const HeroBanner = () => {
  return (
    <div>
      { /* p={{ base: 4, lg: 8 }} */ }
      <Box>
        <NavbarUpdate/>
      </Box>
      <Box className="lcai-banner-area">
        <Box className="banner-content">
          <Flex justifyContent="center" alignItems="center" columnGap={ 2 }>
            <div className="banner">
              <Heading
                className="banner-title"
                as="h1"
                fontSize={{ base: '32px', md: '40px', lg: '60px' }}
                lineHeight={{ base: '1.2', lg: '1.2' }}
                fontWeight={{ base: 500, lg: 600 }}
                maxW="865px"
                mb="40px"
                textAlign="center"
              >
                Explore
                <Image src="/assets/images/banner/title-svg.png" alt="banner image"/>
                <span className="text-gradient">Lightscan</span>
              </Heading>
              <div className="banner-img">
                <Image
                  className="for-dark"
                  src="/assets/images/banner/banner-light-image.png"
                  alt="banner image"
                />
                <Image
                  className="for-light"
                  src="/assets/images/banner/banner-light-image-light.png"
                  alt="banner image"
                />
              </div>
            </div>
          </Flex>
          <Flex justify="center">
            <SearchBar isHomepage/>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(HeroBanner);
