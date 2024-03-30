import { authControllerSingUp, authControllerSingIn, authControllerSingOut } from "@/shared/api/generate";
import { ROUTERS } from "@/shared/constans/routers";
import { useMutation } from "@tanstack/react-query"; 
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";

export function UseSignUpForm (){
  const router = useRouter();
  const { register, handleSubmit } = useForm<{
  email: string;
  password: string;
  }>();

  const signUpMutation = useMutation({
    mutationFn: authControllerSingUp,
    onSuccess() {
      router.push(ROUTERS.HOME);
    },
  });
  
    const isLoading = signUpMutation.status === "pending";
  const massageError = signUpMutation.error ? "Помилка при реєстрації" : undefined;
  if(signUpMutation){

  }
  return{
    register, 
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)),
    isLoading,
    massageError   
  }
}