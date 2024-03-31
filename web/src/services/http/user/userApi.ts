import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { UserType } from './types';

const create = async (data: UserType) => {
  const response = await api.post('/user/register', data);
  return response.data;
};

const useCreate = () => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: ['users'],
    mutationFn: create,
    onSuccess: () => toast({
      title: 'Usuário criado com sucesso',
    }),
    onError: (error: AxiosError<{ message: string }>) => toast({
      variant: 'destructive',
      title: 'Error trying to log in',
      description: error.response?.data.message,
    }),
  });
};

export default {
  useCreate,
};
