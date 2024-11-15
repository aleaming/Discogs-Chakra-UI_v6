import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  Text,
  Button,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import MarketplaceAlbumBlock from '../MarketplaceAlbumBlock';
import { mockItems } from '../../data/marketplace';

export const FeaturedMarketplace = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  return (
    <Box py={8} borderTop="1px" borderColor={borderColor}>
      <Container maxW="container.xl" px={0}>
        <HStack justify="space-between" mb={6} px={4}>
          <Box>
            <Heading size="lg" mb={2}>Featured in Marketplace</Heading>
            <Text color="gray.600">Handpicked items from our community</Text>
          </Box>
          <HStack spacing={4}>
            <Button
              variant="ghost"
              rightIcon={<ArrowRight size={16} />}
              colorScheme="brand"
            >
              View All
            </Button>
            <HStack spacing={2}>
              <IconButton
                aria-label="Scroll left"
                icon={<ChevronLeft size={24} />}
                onClick={() => scroll('left')}
                variant="ghost"
                colorScheme="brand"
                isDisabled={scrollPosition <= 0}
              />
              <IconButton
                aria-label="Scroll right"
                icon={<ChevronRight size={24} />}
                onClick={() => scroll('right')}
                variant="ghost"
                colorScheme="brand"
              />
            </HStack>
          </HStack>
        </HStack>

        <Box
          ref={scrollContainerRef}
          overflowX="hidden"
          whiteSpace="nowrap"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none'
          }}
          px={4}
        >
          <HStack spacing={6}>
            {mockItems.slice(0, 8).map((item) => (
              <Box key={item.id} minW="300px">
                <MarketplaceAlbumBlock
                  title={item.title}
                  artist={item.artist}
                  price={item.price}
                  image={item.image}
                />
              </Box>
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};