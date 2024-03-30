import { UiButton } from "@/shared/ui/ui-button";
import { UseSignOut } from "../model/use-sign-out";

export function SignOut() {
  const { isLoading, signOut } = UseSignOut();
  return (
    <UiButton
      variant="outlined"
      disabled={isLoading}
      onClick={() => signOut({})}
    >
      Вихід
    </UiButton>
  );
}
