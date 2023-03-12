import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useAddCategory } from 'reactQuery/categories';

type FormValues = {
  name: string;
};

export const AddNewCategory = () => {
  const [isOpen, setOpen] = useState(false);
  const [form] = Form.useForm<FormValues>();
  const { addCategory, isAddingCategory } = useAddCategory();

  const onFinish = (values: FormValues) => {
    addCategory({ name: values.name });
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add new category</Button>
      <Modal
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
      </Modal>
    </div>
  );
};
