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
import Project from '@/types/project';

type Props = {
  readonly onSuccess: (project: Project) => Promise<void>;
  readonly project: Project;
};

type FormValues = {
  name: string;
};

const EditProjectForm = ({ onSuccess, project }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = data =>
    fetch(`/api/projects/${project.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async res => {
      if (res.status === 200) {
        onSuccess();
        toast({
          description: 'Project updated',
          status: 'success',
        });
      } else {
        toast({
          description: 'There is a problem during updating project',
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
            defaultValue={project.name}
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

export default EditProjectForm;
