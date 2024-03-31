import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userApi } from '@/services/http/user';
import { CircleNotch } from '@phosphor-icons/react';
import { RegisterFormData, registerFormSchema } from './schema';
import ErrorMsg from '../ErrorMsg';

export default function RegisterModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutateAsync, isPending } = userApi.useCreate();

  const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
    await mutateAsync(formData);
  };

  return (
    <Dialog>
      <div className="flex flex-col md:flex-row items-center text-sm">
        <p>
          Do not have an account?
        </p>
        <DialogTrigger asChild>
          <Button variant="link">Sign Up</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="w-[400px] sm:min-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="grid gap-4 py-4">
            <Input
              { ...register('login') }
              className="col-span-3"
              placeholder="Username"
            />
            <ErrorMsg errorState={ errors.login } />
            <Input
              { ...register('password') }
              className="col-span-3"
              placeholder="Password"
            />
            <ErrorMsg errorState={ errors.password } />
            <Input
              { ...register('confirm') }
              className="col-span-3"
              placeholder="Confirm password"
            />
            <ErrorMsg errorState={ errors.confirm } />
          </div>
          <DialogFooter>
            { isPending
              ? (
                <Button disabled>
                  <CircleNotch size={ 20 } className="animate-spin" />
                </Button>)
              : (<Button type="submit">REGISTER</Button>)}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
