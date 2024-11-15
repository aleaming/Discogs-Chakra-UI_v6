import {
  SimpleGrid,
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoreHorizontal, Edit, Trash2, Share2, Star } from 'lucide-react';
import type { CollectionItem } from './types';

interface CollectionGridProps {
  items: CollectionItem[];
}

export const CollectionGrid = ({ items }: CollectionGridProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const getConditionVariant = (condition: string) => {
    const map: { [key: string]: string } = {
      'M': 'mint',
      'NM': 'nearMint',
      'VG+': 'veryGoodPlus',
      'VG': 'veryGood',
      'G+': 'good',
      'G': 'good',
      'F': 'fair',
      'P': 'poor'
    };
    return map[condition] || 'poor';
  };

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
      {items.map((item) => (
        <Box
          key={item.id}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          overflow="hidden"
          bg={cardBg}
          transition="all 0.2s"
          _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        >
          <Box position="relative">
            <Image
              src={item.image}
              alt={item.title}
              width="100%"
              height="auto"
              aspectRatio={1}
              objectFit="cover"
            />
            <Box position="absolute" top={2} right={2}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="More options"
                  icon={<MoreHorizontal size={16} />}
                  size="sm"
                  variant="solid"
                  bg="blackAlpha.700"
                  color="white"
                  _hover={{ bg: 'blackAlpha.800' }}
                />
                <MenuList>
                  <MenuItem icon={<Edit size={16} />}>Edit</MenuItem>
                  <MenuItem icon={<Share2 size={16} />}>Share</MenuItem>
                  <MenuItem icon={<Trash2 size={16} />} color="red.500">
                    Remove
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>

          <VStack p={4} align="stretch" spacing={2}>
            <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
              {item.title}
            </Text>
            <Text fontSize="md" color="brand.500" noOfLines={1}>
              {item.artist}
            </Text>

            <HStack>
              <Badge colorScheme="purple">{item.format.type}</Badge>
              <Badge variant={getConditionVariant(item.condition.media)}>
                Media: {item.condition.media}
              </Badge>
              <Badge variant={getConditionVariant(item.condition.sleeve)}>
                Sleeve: {item.condition.sleeve}
              </Badge>
            </HStack>

            <HStack spacing={1} color="yellow.400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < item.rating ? 'currentColor' : 'none'}
                  stroke={i < item.rating ? 'currentColor' : mutedColor}
                />
              ))}
            </HStack>

            <Text fontSize="sm" color={mutedColor}>
              Added: {new Date(item.dateAdded).toLocaleDateString()}
            </Text>

            {item.tags.length > 0 && (
              <HStack spacing={2} flexWrap="wrap">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    colorScheme="gray"
                    variant="subtle"
                    fontSize="xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>
            )}
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};