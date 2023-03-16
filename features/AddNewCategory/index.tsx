import type { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddCategory } from 'reactQuery/categories';
import styles from './styles.module.css';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

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
      <Button onClick={() => setOpen(true)}>Add new category</Button>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
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
            <Button type="submit">Add</Button>
            <Button type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
