import { handleRequest } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

export const useUploadPicture = (wordId: number) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: FormData) => {
      return handleRequest(`/api/picture/${wordId}`, {
        method: 'POST',
        body: formData,
      });
    },
    onSuccess: () => message.success('Picture was uploaded'),
  });

  return {
    upload: mutate,
    isUploading: isLoading,
  };
};
