import { handleRequest } from '@/utils';
import { useMutation } from '@tanstack/react-query';

export const useUploadPicture = (wordId: number) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: FormData) => {
      return handleRequest(`/api/picture/${wordId}`, {
        method: 'POST',
        body: formData,
      });
    },
  });

  return {
    upload: mutate,
    isUploading: isLoading,
  };
};
