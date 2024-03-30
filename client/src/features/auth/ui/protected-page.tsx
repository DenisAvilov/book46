import { authControllerGetSessionInfo } from "@/shared/api/generate";
import { ROUTERS } from "@/shared/constans/routers";
import { UiSpinnerPage } from "@/shared/ui/ui-page-spiner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactElement } from "react";

//хук, любой хук приймає на входе компонент
export function protectedPage<T>(Component: (props: T) => ReactElement) {
  return function protectedPage(props: PropsWithChildren<T>) {
    const router = useRouter();

    const { isLoading, isError } = useQuery({
      queryKey: ["session"],
      queryFn: authControllerGetSessionInfo,
      retry: 1,
    });
    if (isLoading) {
      return <UiSpinnerPage />;
    }
    if (isError) {
      router.replace(ROUTERS.SIGN_IN);
    }
    return <Component {...props} />;
  };
}
