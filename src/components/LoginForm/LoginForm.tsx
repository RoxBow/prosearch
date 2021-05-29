import { FormControl, FormLabel, FormErrorMessage, Input, Button, VStack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUser from '../../../hooks/useUser';

type FormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [, { mutate }] = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data =>
    fetch('api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async res => {
      if (res.status === 200) {
        const userData = await res.json();
        await mutate(userData);
      } else {
        // Pb login
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4px">
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            placeholder="Totoro"
            {...register('username', { required: true })}
          />
          <FormErrorMessage>Field required</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="username">Password</FormLabel>
          <Input type="password" id="password" {...register('password', { required: true })} />
          <FormErrorMessage>Field required</FormErrorMessage>
        </FormControl>
      </VStack>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
