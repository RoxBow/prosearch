import { List, ListItem, Icon, Box, Text } from '@chakra-ui/react';
import { CgToolbox, CgUserList, CgInfo } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NavBar = () => {
  const router = useRouter();
  const [hovered, setHover] = useState<boolean>(false);

  return (
    <Box
      as="nav"
      w={hovered ? '180px' : '60px'}
      py={4}
      bg="white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <List spacing={6} textAlign="center">
        <ListItem
          borderRight={router.pathname === '/projects' ? '2px solid' : 'none'}
          borderColor="orange.400"
          cursor="pointer"
          px={4}>
          <Link href="/projects">
            <Text>
              <Icon as={CgToolbox} w={6} h={6} mr={2} />
              {hovered && (
                <Text as="span" verticalAlign="middle">
                  Projects
                </Text>
              )}
            </Text>
          </Link>
        </ListItem>
        <ListItem
          borderRight={router.pathname === '/users' ? '2px solid' : 'none'}
          borderColor="orange.400"
          cursor="pointer"
          px={4}>
          <Link href="/users">
            <Text>
              <Icon as={CgUserList} w={6} h={6} mr={2} />
              {hovered && (
                <Text as="span" verticalAlign="middle">
                  Users
                </Text>
              )}
            </Text>
          </Link>
        </ListItem>
        <ListItem
          borderRight={router.pathname === '/about' ? '2px solid' : 'none'}
          borderColor="orange.400"
          cursor="pointer"
          px={4}>
          <Link href="/about">
            <Text>
              <Icon as={CgInfo} w={6} h={6} mr={2} />
              {hovered && (
                <Text as="span" verticalAlign="middle">
                  About
                </Text>
              )}
            </Text>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default NavBar;
