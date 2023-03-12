import { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { transliterate } from '@/services/transliteration';
import { useCategories } from 'reactQuery/categories';
import { useAddWord } from '@/reactQuery/word';

type FormValues = {
  en: string;
  ka: string;
  transcription: string;
  categoryId: number;
};

export const AddNewWord = () => {
  const [isOpen, setOpen] = useState(false);
  const [form] = Form.useForm<FormValues>();
  const { categories, isLoading } = useCategories();
  const { addWord, isAdding } = useAddWord();

  const onFinish = (values: FormValues) => {
    addWord({ ...values, pictureUrl: null });
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add new word</Button>
      <Modal
        title="Add a new word to the table"
        open={isOpen}
        centered
        closable={false}
        confirmLoading={isAdding}
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
            name="en"
            label="English word"
            rules={[{ required: true, message: 'Word must be provided' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ka"
            label="Georgian word"
            rules={[
              { required: true, message: 'Word must be provided' },
              {
                pattern: /^[ა-ჰ_ -]*$/g,
                message: 'Word must be georgian',
              },
            ]}
          >
            <Input
              onChange={(e) =>
                form.setFieldValue(
                  'transcription',
                  transliterate(e.target.value)
                )
              }
            />
          </Form.Item>
          <Form.Item name="transcription" label="Transcription">
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: 'Category must be selected' }]}
          >
            <Select
              options={categories}
              fieldNames={{ value: 'id', label: 'name' }}
              loading={isLoading}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
