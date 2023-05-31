import { authAPI } from "@/api/authAPI";
import { CloudIcon } from "@heroicons/react/24/solid";
import { Button, Form, Input, Typography, message } from "antd";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import * as Yup from "yup";

type RegisterFormType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 symbols")
    .required("Password is required"),
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
});

const RegisterPage = () => {
  const router = useRouter();

  const formik = useFormik<RegisterFormType>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    onSubmit: () => {
      registerMutation.mutate(formik.values);
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: validationSchema,
  });

  const registerMutation = useMutation(
    (data: RegisterFormType) => authAPI.register(data),
    {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.data.access_token);
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
            Register
          </Typography.Text>
          <Typography.Text className="text-md">
            Nice to meet you! Please enter your details.
          </Typography.Text>
        </div>

        <Form onSubmitCapture={formik.submitForm} className="w-full">
          <Form.Item
            className="mt-4"
            name="firstname"
            validateStatus={formik.errors.firstname ? "error" : ""}
            help={formik.errors.firstname}
          >
            <Input
              size="large"
              name="firstname"
              placeholder="Firstname"
              onChange={formik.handleChange}
            />
          </Form.Item>

          <Form.Item
            className="mt-4"
            name="lastname"
            validateStatus={formik.errors.lastname ? "error" : ""}
            help={formik.errors.lastname}
          >
            <Input
              size="large"
              name="lastname"
              placeholder="Lastname"
              onChange={formik.handleChange}
            />
          </Form.Item>

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
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <Link href="/login">
          <Button type="link" className="text-gray-500">
            Already have account? Login
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default RegisterPage;
