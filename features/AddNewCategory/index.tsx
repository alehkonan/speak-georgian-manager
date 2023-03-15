import type { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useForm } from 'react-hook-form';
import { useAddCategory } from 'reactQuery/categories';
import styles from './styles.module.css';

type FormValues = {
  name: string;
};

export const AddNewCategory = () => {
  const [isOpen, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { addCategory } = useAddCategory();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addCategory(data);
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Add new category</button>
      <ReactFocusLock>
        <dialog open={isOpen} className={styles.dialog}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className={styles.formItem}>
                <span>Category name</span>
                <input
                  type="text"
                  autoComplete="off"
                  {...register('name', { required: true })}
                />
              </label>
              {errors.name && (
                <span className={styles.error}>Name is required</span>
              )}
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
