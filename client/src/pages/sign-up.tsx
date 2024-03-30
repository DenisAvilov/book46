import { SignUpForm } from "@/features/auth/ui/sign-up-form";
import { UiFormPageLayout } from "@/shared/ui/layouts/ui-form-page-layout";
import { UiHeader } from "@/shared/ui/ui-header";
// 3/55 min
export function SignUpPage() {
  return (
    <UiFormPageLayout
      header={<UiHeader right="Реєстрація" />}
      form={<SignUpForm />}
      title="Реєстрація"
    />
  );
}
