import React, { useState } from "react";

import { Ticket, Check, X, Percent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApplyCoupon } from "@/services/queries/cart";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  attributeOption: string;
  cart_qty: number;
  total_sale_value: number;
}

interface CartData {
  cart: CartItem[];
  sub_total: number;
  shipping_charge: number;
  total: number;
}

interface CouponSectionProps {
  cart_items: {
    data: CartData;
  };
  setCoupon: any
}

interface AppliedCoupon {
  coupon_code: string;
  coupon_value: number;
  discount_type: string
}

const CouponSection: React.FC<CouponSectionProps> = ({ setCoupon }) => {
  const { mutateAsync: apply, isPending } = useApplyCoupon()
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const handleApplyCoupon = async (): Promise<void> => {

    apply({ coupon_code: couponCode }, {
      onSuccess: (response) => {

        setCoupon(couponCode)
        setAppliedCoupon(response?.data)
        toast.success('Coupon applied')
      },
      onError: (error: any) => {
        toast.error(error?.data?.message)

      }
    })



  };

  const handleRemoveCoupon = (): void => {
    setCouponCode("");
    setCoupon(false)
    setAppliedCoupon(null)
  };

  return (
    <div className="space-y-3">
      {/* Coupon Input Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-main" />
          <span className="text-sm font-medium">Coupon Code</span>
        </div>

        {!appliedCoupon ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={couponCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCouponCode(e.target.value);
                  }}
                  placeholder="Enter coupon code"
                  className="h-8 pr-10"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      handleApplyCoupon();
                    }
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Percent className="w-4 h-4 text-muted-foreground/30" />
                </div>
              </div>
              <Button
                onClick={handleApplyCoupon}
                disabled={isPending || !couponCode.trim()}
                size="sm"
                variant="outline"

                className=" px-6 hover:bg-main hover:text-white border-main text-main"
              >
                {isPending ? "Applying..." : "Apply"}
              </Button>
            </div>


          </div>
        ) : (
          /* Applied Coupon Display */
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Coupon Applied
                </span>
              </div>
              <Button
                onClick={handleRemoveCoupon}
                variant="ghost"
                size="sm"
                className="h-auto p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {appliedCoupon.coupon_code}
                </Badge>
                <span className="text-sm text-green-700">
                  {appliedCoupon?.discount_type === 'flat' && '₹'}{appliedCoupon.coupon_value}{appliedCoupon?.discount_type === "percent" && '%'} off
                </span>
              </div>

            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default CouponSection;