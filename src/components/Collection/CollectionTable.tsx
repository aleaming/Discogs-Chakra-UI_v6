import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  HStack,
  VStack,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoreHorizontal, Edit, Trash2, Share2, Star } from 'lucide-react';
import type { CollectionItem } from './types';

interface CollectionTableProps {
  items: CollectionItem[];
}

export const CollectionTable = ({ items }: CollectionTableProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
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
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Album</Th>
            <Th>Format</Th>
            <Th>Condition</Th>
            <Th>Rating</Th>
            <Th>Date Added</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr
              key={item.id}
              _hover={{ bg: hoverBg }}
              transition="background-color 0.2s"
            >
              <Td>
                <HStack spacing={4}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    boxSize="48px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box>
                    <Text fontWeight="bold">{item.title}</Text>
                    <Text fontSize="sm" color="brand.500">
                      {item.artist}
                    </Text>
                  </Box>
                </HStack>
              </Td>
              <Td>
                <Badge colorScheme="purple">{item.format.type}</Badge>
              </Td>
              <Td>
                <VStack align="start" spacing={1}>
                  <Badge variant={getConditionVariant(item.condition.media)}>
                    Media: {item.condition.media}
                  </Badge>
                  <Badge variant={getConditionVariant(item.condition.sleeve)}>
                    Sleeve: {item.condition.sleeve}
                  </Badge>
                </VStack>
              </Td>
              <Td>
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
              </Td>
              <Td>
                <Text fontSize="sm" color={mutedColor}>
                  {new Date(item.dateAdded).toLocaleDateString()}
                </Text>
              </Td>
              <Td>
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
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};