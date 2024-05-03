import { authControllerGetSessionInfo } from "@/shared/api/generate";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sessionKey = ["session"];

export function useSessionQuery(){
  return useQuery({
      queryKey: sessionKey,
      queryFn: authControllerGetSessionInfo,
      retry: 0,
      staleTime: 5 * 60 * 1000,
      //staleTime: Буде вважати сесію свежей 5 швилин після того як ми її запросили
    });
}

export function useResetSession(){
 const queryClient = useQueryClient()
 return () => queryClient.removeQueries({ queryKey: sessionKey})
}