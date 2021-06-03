import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import CreateProjectForm from '../CreateProjectForm/CreateProjectForm';

const ModalLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Create project</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateProjectForm onSuccess={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLogin;
