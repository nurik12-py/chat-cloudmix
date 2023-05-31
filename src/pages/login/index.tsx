import { authAPI } from "@/api/authAPI";
import { CloudIcon } from "@heroicons/react/24/solid";
import { Button, Form, Input, Typography, message } from "antd";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import jwt_decode from "jwt-decode";
import { User } from "@/types/user";
import { useRecoilState } from "recoil";
import { UserState } from "@/context/user";
import * as Yup from "yup";

type LoginFormType = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 symbols")
    .required("Password is required"),
});

const LoginPage = () => {
  const [user, setUser] = useRecoilState(UserState);
  const router = useRouter();

  const formik = useFormik<LoginFormType>({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: () => {
      loginMutation.mutate(formik.values);
    },
  });

  const loginMutation = useMutation(
    (data: LoginFormType) => authAPI.login(data),
    {
      onSuccess: (data) => {
        const accessToken = data.data.access_token;
        const decodedToken = jwt_decode<User>(accessToken);
        setUser(decodedToken);
        localStorage.setItem("accessToken", accessToken);
        router.push("/chats");
      },
      onError: (error) => {
        message.error("Error occured");
      },
    }
  );

  return (
    <main className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        <CloudIcon className="w-10 h-10 text-indigo-500" />
        <div className="text-lg font-medium" style={{ fontFamily: "Inter" }}>
          <span className="font-medium">Cloud</span>
          <span className="font-medium text-indigo-500">Mix</span>
        </div>
      </div>
      <div className="w-full px-10 mt-4 max-w-sm flex flex-col gap-1 md:gap-8 items-center justify-center">
        <div className="w-full">
          <Typography.Text className="text-2xl font-semibold block mb-2">
            Login
          </Typography.Text>
          <Typography.Text className="text-md">
            Welcome back! Please enter your details.
          </Typography.Text>
        </div>

        <Form onSubmitCapture={formik.submitForm} className="w-full">
          <Form.Item
            className="mt-4"
            name="email"
            validateStatus={formik.errors.email ? "error" : ""}
            help={formik.errors.email}
          >
            <Input
              size="large"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            validateStatus={formik.errors.password ? "error" : ""}
            help={formik.errors.password}
          >
            <Input
              size="large"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
              size="large"
              htmlType="submit"
              type="ghost"
              loading={loginMutation.isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Link href="/register">
          <Button type="link" className="text-gray-500">
            Don't have an account? Register
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
