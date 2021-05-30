import Link from 'next/link';
import {
  Heading,
  Flex,
  Avatar,
  Button,
  HStack,
  Text,
  Box,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegister from '../ModalRegister/ModalRegister';
import useUser from '../../../hooks/useUser';

const Header = () => {
  const [user, { mutate }] = useUser();
  const toast = useToast();
  const router = useRouter();

  const logOut = () => {
    fetch('api/logout', {
      method: 'GET',
    }).then(async res => {
      if (res.status === 204) {
        await mutate(null);
        toast({
          description: 'Disconnected',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Flex direction="row" justify="space-between">
      <Heading as="h1" size="2xl" cursor="pointer">
        <Link href="/">
          <Box>
            <Text as="span" fontWeight="bold" color="orange.400">
              Dev
            </Text>
            <Text as="span" fontWeight="normal">
              ign
            </Text>
          </Box>
        </Link>
      </Heading>

      <HStack spacigng="4px">
        {user ? (
          <>
            <Menu isLazy>
              <MenuButton>
                <Avatar size="md" name={user.username} src="https://bit.ly/tioluwani-kolawole" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <ModalLogin />
            <ModalRegister />
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;
