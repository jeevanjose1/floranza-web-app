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
   id:string
}

export default function ProductCardWrapper({ 
  title, 
  price, 
  image, 
  variation, 
  slug,
  id
}: ProductCardWrapperProps) {
  const [selectedOption, setSelectedOption] = useState<any>(null);
   const { mutateAsync: add, isPending } = useAddToCart();
  const handleOptionSelect = (option: string ): void => {
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
    }else {
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
    
    // Add to cart logic here
    console.log(`Adding to cart with option: ${selectedOption}`);
  };
  
  return (
    <ProductCardTwo
      price={price}
      title={title}
      image={image}
      variation={variation}
      slug={slug}
      selectedOptionId={selectedOption}
      onOptionSelect={handleOptionSelect}
      onAddToCart={handleAddToCart}
      loading={isPending}
    />
  );
}