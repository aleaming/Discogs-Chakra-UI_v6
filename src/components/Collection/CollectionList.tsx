import {
  VStack,
  HStack,
  Image,
  Text,
  Badge,
  IconButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoreHorizontal, Edit, Trash2, Share2, Star } from 'lucide-react';
import type { CollectionItem } from './types';

interface CollectionListProps {
  items: CollectionItem[];
}

export const CollectionList = ({ items }: CollectionListProps) => {
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
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
    <VStack spacing={4} align="stretch">
      {items.map((item) => (
        <Box
          key={item.id}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={4}
          transition="all 0.2s"
          _hover={{ bg: hoverBg }}
        >
          <HStack spacing={6} align="start">
            <Image
              src={item.image}
              alt={item.title}
              boxSize="120px"
              objectFit="cover"
              borderRadius="md"
            />

            <VStack align="start" flex={1} spacing={2}>
              <HStack justify="space-between" width="full">
                <VStack align="start" spacing={0}>
                  <Text fontSize="xl" fontWeight="bold">
                    {item.title}
                  </Text>
                  <Text fontSize="md" color="brand.500">
                    {item.artist}
                  </Text>
                </VStack>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="More options"
                    icon={<MoreHorizontal size={16} />}
                    size="sm"
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem icon={<Edit size={16} />}>Edit</MenuItem>
                    <MenuItem icon={<Share2 size={16} />}>Share</MenuItem>
                    <MenuItem icon={<Trash2 size={16} />} color="red.500">
                      Remove
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>

              <HStack spacing={2}>
                <Badge colorScheme="purple">{item.format.type}</Badge>
                <Badge variant={getConditionVariant(item.condition.media)}>
                  Media: {item.condition.media}
                </Badge>
                <Badge variant={getConditionVariant(item.condition.sleeve)}>
                  Sleeve: {item.condition.sleeve}
                </Badge>
              </HStack>

              {item.condition.notes && (
                <Text fontSize="sm" color={mutedColor}>
                  Notes: {item.condition.notes}
                </Text>
              )}

              <HStack spacing={4}>
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
              </HStack>

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
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};