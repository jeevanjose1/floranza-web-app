import { fetcher } from "@/lib/utils"
import { PAYMENT } from "@/shared/urls/payment"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useRazorpayStatus = ()=>{
    const query = useQueryClient()
    return useMutation({
        mutationFn:(payload:any)=>fetcher({
            url:`${PAYMENT.RAZORPAY}/${payload}`,
            type:'get',
            data:payload
        }),
        onSuccess:(response)=>{
            return response
        },
        onError:(error:any)=>{
            return error
        }
    })
}

const usePhonePeStatus = ()=>{
    return useMutation({
        mutationFn:(payload:any)=>fetcher({
            url:`${PAYMENT.PHONPE}/${payload}`,
            type:'get',
            data:payload
        }),
        onSuccess:(response)=>{
            return response
        },
        onError:(error:any)=>{
            return error
        }
    })
}
export {
    useRazorpayStatus,
    usePhonePeStatus
}

