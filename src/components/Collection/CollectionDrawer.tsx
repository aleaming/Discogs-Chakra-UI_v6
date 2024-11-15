import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  HStack,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useColorModeValue,
  Text,
  Box,
  useDisclosure,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { Search, Plus, Grid, List, Table as TableIcon } from 'lucide-react';
import { useState } from 'react';
import { mockCollection } from '../../data/collection';
import { CollectionGrid } from './CollectionGrid';
import { CollectionList } from './CollectionList';
import { CollectionTable } from './CollectionTable';
import { AddItemModal } from './AddItemModal';
import type { ViewMode, SortOption, CollectionItem } from './types';

interface CollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollectionDrawer = ({ isOpen, onClose }: CollectionDrawerProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('dateAdded');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<CollectionItem[]>(mockCollection);
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const buttonHoverBg = useColorModeValue('gray.100', 'gray.700');

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'dateAdded':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      case 'releaseYear':
        return b.releaseYear - a.releaseYear;
      default:
        return 0;
    }
  });

  const handleAddItem = (newItem: CollectionItem) => {
    setItems([newItem, ...items]);
  };

  const ViewComponent = {
    grid: CollectionGrid,
    list: CollectionList,
    table: CollectionTable,
  }[viewMode];

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bg={bgColor} mt="80px" borderRadius="2xl" p="8">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack justify="space-between">
              <Text fontSize="2xl">My Collection</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="stretch" py={4}>
              <HStack spacing={4}>
                <InputGroup maxW="400px">
                  <InputLeftElement>
                    <Search size={20} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>

                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  maxW="200px"
                >
                  <option value="dateAdded">Date Added</option>
                  <option value="artist">Artist</option>
                  <option value="title">Title</option>
                  <option value="rating">Rating</option>
                  <option value="releaseYear">Release Year</option>
                </Select>

                <HStack>
                  <Button
                    leftIcon={<Grid size={20} />}
                    variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    colorScheme={viewMode === 'grid' ? 'brand' : undefined}
                    _hover={{ bg: buttonHoverBg }}
                  >
                    Grid
                  </Button>
                  <Button
                    leftIcon={<List size={20} />}
                    variant={viewMode === 'list' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    colorScheme={viewMode === 'list' ? 'brand' : undefined}
                    _hover={{ bg: buttonHoverBg }}
                  >
                    List
                  </Button>
                  <Button
                    leftIcon={<TableIcon size={20} />}
                    variant={viewMode === 'table' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('table')}
                    colorScheme={viewMode === 'table' ? 'brand' : undefined}
                    _hover={{ bg: buttonHoverBg }}
                  >
                    Table
                  </Button>
                </HStack>
                <Spacer />
                <Button
                leftIcon={<Plus size={20} />}
                colorScheme="brand"
                onClick={onAddModalOpen}
              >
                Add Item
              </Button>
              </HStack>

              <Box flex={1} overflowY="auto">
                <ViewComponent items={sortedItems} />
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onAdd={handleAddItem}
      />
    </>
  );
};