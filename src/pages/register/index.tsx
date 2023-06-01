import React from "react";
import { CloudIcon } from "@heroicons/react/24/solid";
import { Button, Form, Input, Typography, message } from "antd";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { authAPI } from "@/api/authAPI";

interface RegisterFormType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
});

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const formik = useFormik<RegisterFormType>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      registerMutation.mutate(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
  });

  const registerMutation = useMutation(authAPI.register, {
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.access_token);
      router.push("/chats");
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

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

        <Form onFinish={formik.handleSubmit} className="w-full">
          <Form.Item
            className="mt-4"
            name="firstname"
            validateStatus={
              formik.errors.firstname && formik.touched.firstname ? "error" : ""
            }
            help={formik.errors.firstname}
          >
            <Input
              size="large"
              name="firstname"
              placeholder="Firstname"
              onChange={formik.handleChange}
              value={formik.values.firstname}
            />
          </Form.Item>

          <Form.Item
            className="mt-4"
            name="lastname"
            validateStatus={
              formik.errors.lastname && formik.touched.lastname ? "error" : ""
            }
            help={formik.errors.lastname}
          >
            <Input
              size="large"
              name="lastname"
              placeholder="Lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
          </Form.Item>

          <Form.Item
            className="mt-4"
            name="email"
            validateStatus={
              formik.errors.email && formik.touched.email ? "error" : ""
            }
            help={formik.errors.email}
          >
            <Input
              size="large"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Form.Item>

          <Form.Item
            name="password"
            validateStatus={
              formik.errors.password && formik.touched.password ? "error" : ""
            }
            help={formik.errors.password}
          >
            <Input.Password
              size="large"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
            Already have an account? Login
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default RegisterPage;
