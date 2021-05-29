import { useEffect } from 'react';
import Router from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUser from '../../../hooks/useUser';

type FormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [user, { mutate }] = useUser();

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

  useEffect(() => {
    if (user) Router.push('/profile');
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login form</h1>
      <label htmlFor="field-username">Username</label>
      <input
        defaultValue="test"
        id="field-username"
        {...register('username', { required: true })}
      />
      {errors.username && <span>This field is required</span>}

      <label htmlFor="field-password">Password</label>
      <input type="password" id="field-password" {...register('password', { required: true })} />
      {errors.password && <span>This field is required</span>}

      <input type="submit" value="submit" />
    </form>
  );
};

export default LoginForm;
