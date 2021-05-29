import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data =>
    fetch('api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register form</h1>

      <label htmlFor="field-username">Username</label>

      <input
        defaultValue="test"
        id="field-username"
        {...register('username', { required: true })}
      />
      {errors.username && <span>This field is required</span>}

      <label htmlFor="field-email">Email</label>
      <input type="email" id="field-email" {...register('email', { required: true })} />
      {errors.email && <span>This field is required</span>}

      <label htmlFor="field-password">Password</label>
      <input type="password" id="field-password" {...register('password', { required: true })} />
      {errors.password && <span>This field is required</span>}

      <input type="submit" value="submit" />
    </form>
  );
};

export default RegisterForm;
