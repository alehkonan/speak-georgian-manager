import type { SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { transliterate } from '@/services/transliteration';
import { useCategories } from 'reactQuery/categories';
import { useAddWord } from '@/reactQuery/word';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Row } from '@/components/Row';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { mapCategoryToOption } from '@/utils';
import styles from '../AddNewCategory/styles.module.css';

type FormValues = {
  en: string;
  ka: string;
  transcription: string;
  categoryId: number;
  pictureUrl: string | null;
};

export const AddNewWord = () => {
  const [isOpen, setOpen] = useState(false);
  const { categories } = useCategories();
  const { addWord } = useAddWord();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { pictureUrl: null } });

  const georgianWord = watch('ka');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addWord(data);
    setOpen(false);
  };

  useEffect(() => {
    if (georgianWord !== undefined) {
      setValue('transcription', transliterate(georgianWord));
    }
  }, [georgianWord, setValue]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new word</Button>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={styles.formItem}>
              <span>English word</span>
              <Input
                type="text"
                autoComplete="off"
                {...register('en', { required: true })}
              />
            </label>
            {errors.en && (
              <span className={styles.error}>English word is required</span>
            )}
          </div>
          <div>
            <label className={styles.formItem}>
              <span>Georgian word</span>
              <Input
                type="text"
                autoComplete="off"
                {...register('ka', {
                  required: true,
                  pattern: /^[ა-ჰ_ -]*$/g,
                })}
              />
            </label>
            {errors.ka && (
              <span className={styles.error}>
                Georgian word is required and should be in georgian
              </span>
            )}
          </div>
          <div>
            <label className={styles.formItem}>
              <span>Transcription</span>
              <Input
                type="text"
                autoComplete="off"
                {...register('transcription')}
              />
            </label>
          </div>
          <div>
            <label className={styles.formItem}>
              <span>Category</span>
              <Select
                options={categories?.map(mapCategoryToOption) || []}
                {...register('categoryId')}
              />
            </label>
          </div>
          <Row>
            <Button type="submit">Add</Button>
            <Button type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Row>
        </form>
      </Modal>
    </>
  );
};
