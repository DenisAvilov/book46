import { Inter } from "next/font/google";
import {
  authControllerGetSessionInfo,
  authControllerSingIn,
} from "@/shared/api/generate";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export function HomePage() {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => authControllerGetSessionInfo(),
  });
  // useEffect(() => {
  //   const user = authControllerSingIn({
  //     email: "avilovd.a@gmail.com",
  //     password: "1234",
  //   });
  //   console.log(user);
  // }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {data?.email}
    </main>
  );
}
