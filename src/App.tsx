import "./App.css";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { User } from "./UserType";
import { useUserStore } from "./store/useUserStore";

function App() {
  // todo When need i use init ?

  const { updateUser, resetUser } = useUserStore();

  const onFinish: FormProps<User>["onFinish"] = (values) => {
    console.log("Success:", values);

    const user: User = {
      name: values.name,
      email: values.email,
      remember: values.remember,
    };

    updateUser(user);
  };

  const onResetUser = () => {
    resetUser();
  };

  const onFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1>Zustand test</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<User>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<User>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<User>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={onResetUser} type="default">
            Limpar Usuario
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default App;
