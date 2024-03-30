import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";

import { UseSignUpForm } from "../model/use-sign-up-form";
import { UiLink } from "@/shared/ui/ui-link";
import { ROUTERS } from "@/shared/constans/routers";

export function SignUpForm() {
  const { register, handleSubmit, isLoading, massageError } = UseSignUpForm();
  return (
    <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
      <UiTextField
        label="Ваша пошта"
        inputProps={{
          type: "email",
          ...register("email", { required: true }),
        }}
      />
      <UiTextField
        label="Ваш пароль"
        inputProps={{
          type: "password",
          ...register("password", { required: true }),
        }}
      />
      <div className="flex  flex-col gap-2">
        <UiButton variant="primary" type="submit" disabled={isLoading}>
          Реєстрація
        </UiButton>
        <UiLink href={ROUTERS.SIGN_IN}>Авторізація</UiLink>
      </div>

      {massageError && <div className="text-rose-500">{massageError}</div>}
    </form>
  );
}
