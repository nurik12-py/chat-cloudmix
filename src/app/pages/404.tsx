import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link href="/">Go back to home</Link>
    </div>
  );
};

export default NotFound;
