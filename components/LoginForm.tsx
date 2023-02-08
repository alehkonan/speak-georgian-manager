import { Button, Form, Input } from 'antd';

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  return (
    <Form<FormValues>
      labelAlign="left"
      labelCol={{ span: 5 }}
      onFinish={(values) => console.log(values)}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter the email' },
          {
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            message: 'Enter correct email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter the email' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
