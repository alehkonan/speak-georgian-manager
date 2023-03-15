import { useState, FormEvent, useRef } from 'react';
import { useAddCategory } from 'reactQuery/categories';
import styles from './styles.module.css';

export const AddNewCategory = () => {
  const [isOpen, setOpen] = useState(false);
  const { addCategory, isAddingCategory } = useAddCategory();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.hasOwn(e.target, FormValues.Name)) {
      console.log(e.target[FormValues.Name]);
    }
    // addCategory({ name: values.name });
    // setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Add new category</button>
      <dialog open={isOpen}>
        <button onClick={() => setOpen(false)}>Close modal</button>
        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            <span>Category name</span>
            <input type="text" name={FormValues.Name} />
          </label>
          <label>
            <span>sdcds name</span>
            <input type="text" name={FormValues.Surname} />
          </label>
          <button>Add</button>
        </form>
      </dialog>
      {/* <Modal
        title="Add a new category to the table"
        open={isOpen}
        centered
        closable={false}
        confirmLoading={isAddingCategory}
        okText="Add"
        onCancel={() => setOpen(false)}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          preserve={false}
          labelAlign="left"
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Category name"
            rules={[{ required: true, message: 'Name must be provided' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};
