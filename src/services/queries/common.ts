import { fetcher } from "@/lib/utils";
import { COMMON } from "@/shared/urls/common";
import { useQuery } from "@tanstack/react-query";

const useGetNavigation = () => {
    return useQuery({
      queryKey: ["NAVIGATION"],
      queryFn: () =>
        fetcher({
          type: "get",
          url:  COMMON.NAV,
          authenticated:false
  
        }),
    });
  };

  export {
    useGetNavigation
  }