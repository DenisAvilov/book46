import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";

import { UseSignInForm } from "../model/use-sign-in-form";
import { UiLink } from "@/shared/ui/ui-link";
import { ROUTERS } from "@/shared/constans/routers";

export function SignInForm() {
  const { register, handleSubmit, isLoading, massageError } = UseSignInForm();
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
          Авторизація
        </UiButton>
        <UiLink href={ROUTERS.SIGN_UP}>Реєстрація</UiLink>
      </div>

      {massageError && <div className="text-rose-500">{massageError}</div>}
    </form>
  );
}
