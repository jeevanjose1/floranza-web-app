import { base_url } from '@/services/instance';
import { PRODUCT } from '@/shared/urls/products';
import axios from 'axios';
import React, { ReactNode } from 'react'

type Props = {
	children: ReactNode;
	params: Promise<{ product: string }>
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ product_details: string }>
}) {

	try {
		const param = await params



		const response = await axios.get(`${base_url}${PRODUCT.PRODUCT_DETAILS}/${param?.product_details}`)
		const productData = await response?.data
		if (!productData || !productData.data || !productData.data.product) {
			return {
				title: 'Product Not Found',
				description: 'The requested product could not be found.',
			}
		}

		const product = productData.data.product;
		const category = productData.data.category;

		const getLowestPrice = () => {
			if (!product.variations || product.variations.length === 0) return null;
			const prices = product.variations
				.map((v: any) => parseFloat(v.sale_price))
				.filter((price: any) => price > 0);
			return prices.length > 0 ? Math.min(...prices) : null;
		};

		const getAvailableSizes = () => {
			if (!product.variations || product.variations.length === 0) return [];
			return product.variations
				.filter((v: any) => v.qty > 0)
				.map((v: any) => v.attribute_option_name);
		};

		const lowestPrice = getLowestPrice();
		const availableSizes = getAvailableSizes();
		const inStock = availableSizes.length > 0;

		const cleanDescription = product.description
			? product.description.replace(/<[^>]*>/g, '').trim()
			: '';

		const title = product.meta_title || `${product.name} - ${category?.name || 'Fashion'}`;
		const description = product.meta_des || cleanDescription || `Shop ${product.name} - Premium quality ${category?.name?.toLowerCase() || 'clothing'} with fast delivery.`;

		const structuredData = {
			"@context": "https://schema.org/",
			"@type": "Product",
			"name": product.name,
			"image": product.images?.large,
			"description": cleanDescription,
			"sku": product.sku,
			"brand": {
				"@type": "Brand",
				"name": "Floranza"
			},
			"category": category?.name,
			"offers": {
				"@type": "AggregateOffer",
				"priceCurrency": "INR",
				"lowPrice": lowestPrice,
				"availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
				"offerCount": product.variations?.length || 0
			},
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "4.5",
				"reviewCount": "100"
			}
		};

		return {
			title: title,
			description: description,
			keywords: `${product.name}, ${category?.name || 'kurti'}, cotton wear, casual wear, women fashion, online shopping, ${product.sku}`,

			openGraph: {
				title: title,
				description: description,
				type: 'website',
				url: `https://www.floranzafashion.com/product/${product.slug}`,
				siteName: 'Floranza',
				locale: 'en_IN',
				images: [
					{
						url: product.images?.large || '',
						width: 800,
						height: 600,
						alt: product.name,
						type: 'image/webp',
					},
				],
			},

			twitter: {
				card: 'summary_large_image',
				site: '@floranza_fashion',
				creator: '@floranza_fashion',
				title: title,
				description: description,
				images: [product.images?.large || ''],
			},

			other: {
				'product:price:amount': lowestPrice?.toString() || '0',
				'product:price:currency': 'INR',
				'product:availability': inStock ? 'in stock' : 'out of stock',
				'product:condition': 'new',
				'product:brand': 'Floranza',
				'product:category': category?.name || '',
				'product:material': 'Cotton',

				'pinterest:rich_pin': 'true',

				'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
				'googlebot': 'index, follow',
				'bingbot': 'index, follow',

				'format-detection': 'telephone=no',
				'mobile-web-app-capable': 'yes',
				'apple-mobile-web-app-capable': 'yes',
				'apple-mobile-web-app-status-bar-style': 'default',
				'apple-mobile-web-app-title': 'Floranza',

				'theme-color': '#ffffff',
				'msapplication-TileColor': '#ffffff',

				'canonical': `https://www.floranzafashion.com/product/${product.slug}`,

				'author': 'Floranza',
				'publisher': 'Floranza',

				'language': 'English',
				'geo.region': 'IN-KL',
				'geo.placename': 'Kerala, India',
				'geo.position': '11.2588;75.7804',

				'application/ld+json': JSON.stringify(structuredData),
			},

			alternates: {
				canonical: `https://www.floranzafashion.com/product/${product.slug}`,
			},
		}
	} catch (error) {
		return {
			title: 'Product Not Found',
			description: 'The requested product could not be found.',
		}
	}
}
export default async function Layout({ children }: Props) {
	return (
		<main className="w-full mb-12">
			{children}
		</main>
	)
}