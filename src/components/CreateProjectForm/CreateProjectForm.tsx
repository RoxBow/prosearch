import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useProjects from '@/hooks/useProjects';

type Props = {
  readonly onSuccess: () => void;
};
type FormValues = {
  name: string;
};

const CreateProjectForm = ({ onSuccess }: Props) => {
  const [projects, { mutate }] = useProjects();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = data =>
    fetch('api/projects', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async res => {
      if (res.status === 201) {
        const data = await res.json();
        await mutate([...projects, data.project]);
        onSuccess();
      } else {
        toast({
          description: 'There is a problem during saving project.',
          status: 'error',
        });
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4px">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            placeholder="Totoro"
            {...register('name', { required: true })}
          />
          <FormErrorMessage>Field required</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default CreateProjectForm;
