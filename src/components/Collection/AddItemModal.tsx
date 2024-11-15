import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Box,
  Image,
  Badge,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Search, Hash } from 'lucide-react';
import { useState } from 'react';
import type { CollectionItem } from './types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: CollectionItem) => void;
}

export const AddItemModal = ({ isOpen, onClose, onAdd }: AddItemModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [releaseId, setReleaseId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<any>(null);
  const [mediaCondition, setMediaCondition] = useState('M');
  const [sleeveCondition, setSleeveCondition] = useState('M');
  const [notes, setNotes] = useState('');
  const toast = useToast();

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

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock data
      setSelectedRelease({
        title: 'Random Access Memories',
        artist: 'Daft Punk',
        year: 2013,
        image: 'https://i.discogs.com/zFVZE4s0zSXUIM7OMl2UDckSq0zlopdHBHRz23zqMJk/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1NzAz/NjYtMTUzOTI5NTA5/Mi02MDg3LnBuZw.jpeg',
        format: {
          type: 'Vinyl',
          details: ['2xLP', 'Album', 'Gatefold'],
          weight: '180g',
          speed: '33 ⅓ RPM',
        },
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToCollection = () => {
    if (!selectedRelease) return;

    const newItem: CollectionItem = {
      id: Date.now().toString(),
      title: selectedRelease.title,
      artist: selectedRelease.artist,
      releaseYear: selectedRelease.year,
      format: selectedRelease.format,
      condition: {
        media: mediaCondition,
        sleeve: sleeveCondition,
        notes: notes.trim() || undefined,
      },
      image: selectedRelease.image,
      dateAdded: new Date().toISOString(),
      tags: [],
      rating: 0,
    };

    onAdd(newItem);
    toast({
      title: 'Item added to collection',
      status: 'success',
      duration: 3000,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add to Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Tabs>
            <TabList mb={4}>
              <Tab>Search</Tab>
              <Tab>Release ID</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <InputGroup>
                      <InputLeftElement>
                        <Search size={20} />
                      </InputLeftElement>
                      <Input
                        placeholder="Search by title or artist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                    <Button
                      colorScheme="brand"
                      onClick={handleSearch}
                      isLoading={isLoading}
                    >
                      Search
                    </Button>
                  </HStack>
                </VStack>
              </TabPanel>

              <TabPanel p={0}>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <InputGroup>
                      <InputLeftElement>
                        <Hash size={20} />
                      </InputLeftElement>
                      <Input
                        placeholder="Enter Discogs Release ID..."
                        value={releaseId}
                        onChange={(e) => setReleaseId(e.target.value)}
                      />
                    </InputGroup>
                    <Button
                      colorScheme="brand"
                      onClick={handleSearch}
                      isLoading={isLoading}
                    >
                      Find
                    </Button>
                  </HStack>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {selectedRelease && (
            <VStack spacing={4} align="stretch" mt={6}>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <HStack spacing={4}>
                  <Image
                    src={selectedRelease.image}
                    alt={selectedRelease.title}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <VStack align="start" spacing={2}>
                    <Text fontSize="lg" fontWeight="bold">
                      {selectedRelease.title}
                    </Text>
                    <Text color="brand.500">{selectedRelease.artist}</Text>
                    <HStack>
                      <Badge colorScheme="purple">
                        {selectedRelease.format.type}
                      </Badge>
                      <Badge>{selectedRelease.year}</Badge>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>

              <FormControl>
                <FormLabel>Media Condition</FormLabel>
                <Select
                  value={mediaCondition}
                  onChange={(e) => setMediaCondition(e.target.value)}
                >
                  <option value="M">Mint (M)</option>
                  <option value="NM">Near Mint (NM)</option>
                  <option value="VG+">Very Good Plus (VG+)</option>
                  <option value="VG">Very Good (VG)</option>
                  <option value="G+">Good Plus (G+)</option>
                  <option value="G">Good (G)</option>
                  <option value="F">Fair (F)</option>
                  <option value="P">Poor (P)</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Sleeve Condition</FormLabel>
                <Select
                  value={sleeveCondition}
                  onChange={(e) => setSleeveCondition(e.target.value)}
                >
                  <option value="M">Mint (M)</option>
                  <option value="NM">Near Mint (NM)</option>
                  <option value="VG+">Very Good Plus (VG+)</option>
                  <option value="VG">Very Good (VG)</option>
                  <option value="G+">Good Plus (G+)</option>
                  <option value="G">Good (G)</option>
                  <option value="F">Fair (F)</option>
                  <option value="P">Poor (P)</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about condition or pressing..."
                />
              </FormControl>

              <Button
                colorScheme="brand"
                size="lg"
                onClick={handleAddToCollection}
                mt={4}
              >
                Add to Collection
              </Button>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};