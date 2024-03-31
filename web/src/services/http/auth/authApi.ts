import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { UserType } from '../user';

const login = async (data: UserType): Promise<{ access_token: string }> => {
  const response = await api.post('/integrations/auth', data);

  return response.data;
};

const useAuth = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: login,
    onSuccess: () => {
      toast({
        title: 'Logged in successfully',
      });
    },
    onError: (error: AxiosError<{ message: string }>) => toast({
      variant: 'destructive',
      title: 'Error trying to log in',
      description: error.response?.data.message,
    }),
  });
};

export default {
  useAuth,
};
