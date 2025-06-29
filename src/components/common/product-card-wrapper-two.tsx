'use client'
import React, { useState } from 'react';
import ProductCardTwo from './product-card-two';
import { StaticImageData } from 'next/image';
import { toast } from 'sonner';
import { useAddToCart } from '@/services/queries/cart';
import { getCookie } from 'cookies-next/client';



interface ProductCardWrapperProps {
  title: string;
  price: {
    min: number;
    max?: number;
  };
  image: StaticImageData;
  variation: any[];
  slug: string;
  id: string
  is_prebook: boolean,
  is_new: boolean
}

export default function ProductCardWrapper({
  title,
  price,
  image,
  variation,
  slug,
  id,
  is_new,
  is_prebook
}: ProductCardWrapperProps) {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const { mutateAsync: add, isPending } = useAddToCart();
  const handleOptionSelect = (option: string): void => {
    if (selectedOption === option) {
      setSelectedOption('');
      return;
    }

    setSelectedOption(option);

  };

  const handleAddToCart = (): void => {
    if (!selectedOption && variation?.length > 0) {
      toast.warning('Please select option first')
      return;
    } else {
      const form_data = new FormData();
      form_data.append("guest_token", getCookie("floranza-g-token") as string);
      form_data.append("product_id", id);
      if (variation?.length) {
        form_data.append("prd_var_value_id", selectedOption?.id);
      }
      form_data.append("qty", "1");
      add(form_data, {
        onSuccess: (response) => {
          toast.success("Product added to cart");
        },
      });
    }

  };

  return (
    <ProductCardTwo
      price={price}
      title={title}
      image={image}
      variation={variation}
      is_prebook={is_prebook}
      is_new={is_new}
      slug={slug}
      selectedOptionId={selectedOption}
      onOptionSelect={handleOptionSelect}
      onAddToCart={handleAddToCart}
      loading={isPending}

    />
  );
}