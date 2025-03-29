import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home"); // Redirects "/" to "/home"
  }, []);

  return <p>Redirecting...</p>;
}
