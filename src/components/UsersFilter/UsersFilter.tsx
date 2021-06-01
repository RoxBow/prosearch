import { HStack, Button } from '@chakra-ui/react';
import { useState } from 'react';

type Filter = { label: string; value: 'all' | 'dev' | 'design' };

const filters: Filter[] = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'dev',
    value: 'dev',
  },
  {
    label: 'design',
    value: 'design',
  },
];

const UsersFilter = () => {
  const [activeFilter, setActiveFilter] = useState<Filter['value']>(filters[0].value);

  return (
    <HStack spacing={2}>
      {filters.map(filter => (
        <Button
          key={filter.value}
          height="auto"
          p={2}
          colorScheme="teal"
          variant={activeFilter === filter.value ? 'solid' : 'outline'}
          onClick={() => setActiveFilter(filter.value)}>
          {filter.label}
        </Button>
      ))}
    </HStack>
  );
};

export default UsersFilter;
