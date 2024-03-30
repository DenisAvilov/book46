import { SignInForm } from "@/features/auth/ui/sign-in-form";
import { UiFormPageLayout } from "@/shared/ui/layouts/ui-form-page-layout";
import { UiHeader } from "@/shared/ui/ui-header";

export function SignInPage() {
  return (
    <UiFormPageLayout
      header={<UiHeader right="Авторизація" />}
      form={<SignInForm />}
      title="Авторизація"
    />
  );
}
