import { Button, Layout } from "antd";
import Link from "next/link";

const NotFoundPage = () => (
  <Layout>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl font-medium">Page not found ;(</p>
      <Link href="/">
        <Button type="ghost" className="mt-3 bg-indigo-500 text-white">
          Go back home
        </Button>
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;
