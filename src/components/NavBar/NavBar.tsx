import { HStack, Flex, Button, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import useUser from '../../../hooks/useUser';
import ModalRegister from '../ModalRegister/ModalRegister';
import ModalLogin from '../ModalLogin/ModalLogin';

const NavBar = () => {
  const [user, { mutate }] = useUser();
  const toast = useToast();

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
      } else {
        // Pb login
      }
    });
  };

  return (
    <Flex flexDirection="row">
      <p>Logo</p>
      <HStack spacing="24px" as="nav">
        <p>ok</p>
      </HStack>

      {user ? (
        <>
          <Link href="/profile">Profile</Link>
          <Button colorScheme="red" mr={3} onClick={logOut}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <ModalLogin />
          <ModalRegister />
        </>
      )}
    </Flex>
  );
};

export default NavBar;
