import { useResetSession } from "@/entities/session/queries";
import { authControllerSingOut } from "@/shared/api/generate";
import { ROUTERS } from "@/shared/constans/routers";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
 

export function UseSignOut(){
  const resetSession = useResetSession()
  const router = useRouter()
 const signOutMutation = useMutation({
    mutationFn: authControllerSingOut,
    onSuccess() {
      router.push(ROUTERS.SIGN_IN)
      resetSession()
    },
    retry: 0
  })

  return{
    isLoading: signOutMutation.status === "pending",
    signOut: signOutMutation.mutate
  }
}