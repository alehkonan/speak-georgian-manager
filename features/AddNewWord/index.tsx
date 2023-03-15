import type { SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { transliterate } from '@/services/transliteration';
import { useCategories } from 'reactQuery/categories';
import { useAddWord } from '@/reactQuery/word';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';

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
      <button onClick={() => setOpen(true)}>Add new word</button>
      <ReactFocusLock>
        <dialog open={isOpen} className={styles.dialog}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className={styles.formItem}>
                <span>English word</span>
                <input
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
                <input
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
                <input
                  type="text"
                  autoComplete="off"
                  {...register('transcription')}
                />
              </label>
            </div>
            <div>
              <label className={styles.formItem}>
                <span>Category</span>
                <select {...register('categoryId')}>
                  {categories?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.formItem}>
              <button type="submit">Add</button>
              <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </form>
        </dialog>
      </ReactFocusLock>
    </>
  );
};
