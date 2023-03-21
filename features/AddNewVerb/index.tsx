import type { SubmitHandler } from 'react-hook-form';
import type { Verb } from '@/typings';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Row } from '@/components/Row';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { entries, mapWordToOption } from '@/utils';
import { useWords } from '@/reactQuery/words';
import { useAddVerb } from '@/reactQuery/verb';
import styles from '../AddNewCategory/styles.module.css';

type FormValues = Omit<Verb, 'id'>;

const Tense = {
  past: 'Past',
  present: 'Present',
  future: 'Future',
} as const;

const PersonalPronounce = {
  firstPerson: '1 person',
  secondPerson: '2 person',
  thirdPerson: '3 person',
} as const;

export const AddNewVerb = () => {
  const [isOpen, setOpen] = useState(false);
  const { words } = useWords();
  const { addVerb } = useAddVerb();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addVerb(data);
    console.log(data);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new verb</Button>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={styles.formItem}>
              <span>Original verb</span>
              <Input
                type="text"
                autoComplete="off"
                {...register('original', { required: true })}
              />
            </label>
            {errors.original && (
              <span className={styles.error}>Original verb is required</span>
            )}
          </div>
          {entries(Tense).map(([tense, tenseLabel]) => {
            return entries(PersonalPronounce).map(([person, personLabel]) => (
              <div key={`${tense}${person}`}>
                <label className={styles.formItem}>
                  <span>
                    {tenseLabel} / {personLabel}
                  </span>
                  <Select
                    options={words?.map(mapWordToOption) || []}
                    {...register(`${tense}.${person}`, {
                      valueAsNumber: true,
                    })}
                  />
                </label>
              </div>
            ));
          })}
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
