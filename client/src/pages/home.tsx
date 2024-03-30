import { authControllerGetSessionInfo } from "@/shared/api/generate";
import { useQuery } from "@tanstack/react-query";

import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiSelectField } from "@/shared/ui/ui-select";

import { UiHeader } from "@/shared/ui/ui-header";

import { SignOut } from "@/features/auth/ui/sign-out";

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
    <main className={`min-h-screen `}>
      <UiHeader
        right={
          <div className="flex flex-col justify-center">
            {data?.email}
            <SignOut />
          </div>
        }
      />
      <UiButton variant="primary">Hey </UiButton>
      <UiButton variant="secondary">Sing out</UiButton>
      <UiButton variant="outlined">Sing in</UiButton>
      <UiButton disabled variant="outlined">
        Sing up
      </UiButton>
      <UiTextField inputProps={{ placeholder: "Enter example" }} />
      <UiTextField
        inputProps={{ placeholder: "Enter example" }}
        error="Pomulka"
      ></UiTextField>
      <UiSelectField
        selectProps={{ placeholder: "...Enter example" }}
        options={[
          { value: "1", label: "options" },
          { value: "2", label: "Next" },
        ]}
      />
    </main>
  );
}
