import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CircleNotch, Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';
import { authApi } from '@/services/http/auth';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LoginFormData, loginFormSchema } from './schema';
import ErrorMsg from '../ErrorMsg';

type FormProps = React.HTMLAttributes<HTMLFormElement>;

function Form({ children, ...props }: FormProps) {
  const [inputType, setInputType] = useState<string>('password');
  const { mutateAsync, isPending } = authApi.useAuth();
  const navigate = useNavigate();
  const { setItem } = useLocalStorage('token', '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    const data = await mutateAsync(formData);
    navigate('/dashboard');
    setItem(data.access_token);
  };

  const handleClick = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) } { ...props }>
      <Input placeholder="Username" id="login" { ...register('login') } type="text" />
      <ErrorMsg errorState={ errors.login } />
      <div className="flex items-center">
        <Input
          placeholder="Password"
          id="password"
          { ...register('password') }
          type={ inputType }
        />
        <button type="button" onClick={ handleClick }>
          { inputType === 'password'
            ? (<EyeSlash size={ 18 } className="focus:outline-none -ml-8" />)
            : (<Eye size={ 18 } className="focus:outline-none -ml-8" />)}
        </button>
      </div>
      <ErrorMsg errorState={ errors.password } />
      { isPending
        ? (
          <Button disabled>
            <CircleNotch size={ 20 } className="animate-spin" />
          </Button>)
        : (<Button type="submit">LOGIN</Button>)}
    </form>
  );
}

export default Form;
