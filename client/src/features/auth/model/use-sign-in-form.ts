import {  authControllerSingIn } from "@/shared/api/generate";
import { ROUTERS } from "@/shared/constans/routers";
import { useMutation } from "@tanstack/react-query"; 
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";

export function UseSignInForm (){
  const router = useRouter();
  const { register, handleSubmit } = useForm<{
  email: string;
  password: string;
  }>();

  const signInMutation = useMutation({
    mutationFn: authControllerSingIn,
    onSuccess() {
      router.push(ROUTERS.HOME);
    },
  });
  
  const isLoading = signInMutation.status === "pending";
  const massageError = signInMutation.error ? "Помилка при авторізації" : undefined;
   
  return{
    register, 
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isLoading,
    massageError   
  }
}