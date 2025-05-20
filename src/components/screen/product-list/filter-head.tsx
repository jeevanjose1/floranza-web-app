"use client";
import React, { useEffect, useState, useCallback, ReactElement } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// UI Components
import AsyncSelectCustom from "@/components/ui/async-select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

// Utils & Constants
import { fetcher } from "@/lib/utils";
import { images } from "@/shared/images/images";
import { FILTER } from "@/shared/urls/products";

// Types
interface SelectOption {
	value: string;
	label: string;
}

interface FilterState {
	size: SelectOption | null;
	material: SelectOption | null;
	category: SelectOption | null;
	priceRange: [number, number];
	itemsPerPage: number;
	gridView: string;
}

interface ApiResponse<T> {
	data: {
		data: T;
	};
}

interface AttributeOption {
	order_code: string;
	name: string;
}

interface AttributeData {
	attribute_options: AttributeOption[];
}

interface MaterialData {
	slug: string;
	name: string;
}

interface CategoryData {
	slug: string;
	name: string;
}

interface GridViewOption {
	id: string;
	src: string;
	alt: string;
}

interface Prop {
	size?: boolean,
	category?: boolean,
	material?: boolean,  // Fixed typo from 'meterial' to 'material'
	price?: boolean,
}

export default function FilterHead({size=true, category=true, material=true, price=true}: Prop): ReactElement {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = useParams();
	const pathname = usePathname()

	// State initialization
	const [filters, setFilters] = useState<FilterState>({
		size: null,
		material: null,
		category: null,
		priceRange: [0, 4000],
		itemsPerPage: 12,
		gridView: "grid-4"
	});

	// API data fetching functions
	const fetchOptions = async <T, R>(
		endpoint: string, 
		mapFn: (response: ApiResponse<T>) => SelectOption[]
	): Promise<SelectOption[]> => {
		try {
			const response = await fetcher({
				url: endpoint,
				type: "get",
				authenticated: false,
				cacheTime: Infinity
			});
			return mapFn(response);
		} catch (error) {
			console.error(`Error fetching options: ${error}`);
			return [];
		}
	};

	const loadOptions = {
		size: (_: string = "") => fetchOptions<AttributeData[], SelectOption[]>(
			FILTER.ATTRIBUTES, 
			(response) => response?.data?.data?.[0]?.attribute_options?.map(item => ({
				value: item?.order_code,
				label: item?.name,
			})) || []
		),
		material: (_: string = "") => fetchOptions<MaterialData[], SelectOption[]>(
			FILTER.MATERIALS, 
			(response) => response?.data?.data?.map(item => ({
				value: item?.slug,
				label: item?.name,
			})) || []
		),
		category: (_: string = "") => fetchOptions<CategoryData[], SelectOption[]>(
			FILTER.CATOGERIES, 
			(response) => response?.data?.data?.map(item => ({
				value: item?.slug,
				label: item?.name,
			})) || []
		)
	};

	// URL parameter handling
	const updateUrl = useCallback((updates: Record<string, string | number | null>) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			if (value === null) {
				params.delete(key);
			} else {
				params.set(key, value.toString());
			}
		});

		router.push(`?${params.toString()}`, { scroll: false });
	}, [router, searchParams]);

	// Load initial filters from URL
	useEffect(() => {
		const initialFilters: FilterState = {
			size: searchParams.get("size") ? { value: searchParams.get("size")!, label: "" } : null,
			material: searchParams.get("material") ? { value: searchParams.get("material")!, label: "" } : null,
			category: {
				value: params?.product as string,
				label: ""
			},
			priceRange: [
				parseInt(searchParams.get("min_price") || "0"), 
				parseInt(searchParams.get("max_price") || "4000")
			],
			itemsPerPage: parseInt(searchParams.get("per_page") || "12"),
			gridView: searchParams.get("view") || "grid-4"
		};

		setFilters(initialFilters);

		// Fetch labels for selected filters
		const loadInitialLabels = async (): Promise<void> => {
			if (initialFilters.size) {
				const sizeOptions = await loadOptions.size();
				const foundSize = sizeOptions.find(item => item.value === initialFilters.size!.value);
				if (foundSize) {
					setFilters(prev => ({ ...prev, size: foundSize }));
				}
			}

			if (initialFilters.material) {
				const materialOptions = await loadOptions.material();
				const foundMaterial = materialOptions.find(item => item.value === initialFilters.material!.value);
				if (foundMaterial) {
					setFilters(prev => ({ ...prev, material: foundMaterial }));
				}
			}

			if (initialFilters.category) {
				const categoryOptions = await loadOptions.category();
				const foundCategory = categoryOptions.find(item => item.value === initialFilters.category!.value);
				if (foundCategory) {
					setFilters(prev => ({ ...prev, category: foundCategory }));
				}
			}
		};

		loadInitialLabels();
	}, [searchParams, params?.product]);

	// Event handlers
	const handleFilterChange = (filterName: keyof FilterState, selectedOption: SelectOption | null): void => {
		setFilters(prev => ({ ...prev, [filterName]: selectedOption }));

		// Handle category change by updating the route, not the query params
		if (filterName === 'category') {
			// Get the current URL search params
			const currentParams = new URLSearchParams(searchParams.toString());
			const path = pathname.split('/')?.filter(Boolean)?.[0]
			if (selectedOption?.value) {
				// Navigate to the new category path while preserving current query params
				router.push(`/${path}/${selectedOption.value}?${currentParams.toString()}`);
			} else {
				// If no category selected, navigate to the root path
				router.push(`/${path}/?${currentParams.toString()}`);
			}
		} else {
			// For other filters, update the query params as before
			updateUrl({ [filterName]: selectedOption?.value || null });
		}
	};

	const handlePriceChange = (values: number[]): void => {
		setFilters(prev => ({ ...prev, priceRange: values as [number, number] }));
	};

	const applyPriceFilter = (): void => {
		updateUrl({ 
			min_price: filters.priceRange[0], 
			max_price: filters.priceRange[1] 
		});
	};

	const handleItemsPerPageChange = (count: number): void => {
		setFilters(prev => ({ ...prev, itemsPerPage: count }));
		updateUrl({ per_page: count });
	};

	const handleGridViewChange = (view: string): void => {
		setFilters(prev => ({ ...prev, gridView: view }));
		updateUrl({ view });
	};

	// Constants
	const perPageOptions: number[] = [12, 16, 20, 24];
	const gridViewOptions: GridViewOption[] = [
		{ id: "grid-4", src: images.grid_4, alt: "grid four" },
		{ id: "grid-9", src: images.grid_9, alt: "grid nine" },
		{ id: "grid-16", src: images.grid_16, alt: "grid sixteen" }
	];

	// Fixed handleFilterPosition function with explicit classes
	const handleFilterPosition = () => {
		const enabledFilterCount = [size, category, material, price].filter(Boolean).length;
		
		// Handle each possible case explicitly
		switch (enabledFilterCount) {
			case 1:
				return "tablet-lg:grid-cols-1";
			case 2:
				return "tablet-lg:grid-cols-2";
			case 3:
				return "tablet-lg:grid-cols-3";
			case 4:
				return "tablet-lg:grid-cols-4";
			default:
				return "tablet-lg:grid-cols-1"; // Fallback
		}
	};

	return (
		<div className="w-full container-md mb-8">
			{/* Filter Controls */}
			<div className={`grid w-full mobile-lg:grid-cols-2 ${handleFilterPosition()} gap-3 laptop:gap-6`}>
				{/* Size Filter */}
				{size && <AsyncSelectCustom
					cacheOptions
					defaultOptions
					loadOptions={loadOptions.size}
					placeholder="Filter By Size"
					value={filters.size}
					onChange={(option:any) => handleFilterChange('size', option)}
					isClearable
				/>}

				{/* Material Filter - Fixed typo in prop name here */}
				{material && <AsyncSelectCustom
					cacheOptions
					defaultOptions
					loadOptions={loadOptions.material}
					placeholder="Filter By Materials"
					value={filters.material}
					onChange={(option: any) => handleFilterChange('material', option)}
					isClearable
				/>}

				{/* Category Filter */}
				{category && <AsyncSelectCustom
					cacheOptions
					defaultOptions
					loadOptions={loadOptions.category}
					placeholder="Filter By Categories"
					value={filters.category}
					onChange={(option: any) => handleFilterChange('category', option)}
				/>}

				{/* Price Range Filter */}
				{price && <Popover>
					<PopoverTrigger>
						<Button
							className="w-full has-[>svg]:px-4 text-sm whitespace-nowrap h-10 justify-between text-muted-foreground/80 px-4 border-ring/70 focus-within:!border-ring focus-within:!ring-1 focus-within:!ring-ring focus-within:!bg-muted/30 rounded-full shadow-none"
							variant="outline"
						>
							{`Price: ₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}`}
							<ChevronDown />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div>
							<Slider
								defaultValue={[0, 4000]}
								value={filters.priceRange}
								max={4000}
								step={100}
								onValueChange={handlePriceChange}
							/>
							<Separator className="my-4" />
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-2 text-sm">
									<p>₹{filters.priceRange[0]}</p>-<p>₹{filters.priceRange[1]}</p>
								</div>
								<Button
									size="sm"
									variant="secondary"
									className="rounded-full"
									onClick={applyPriceFilter}
								>
									Filter
								</Button>
							</div>
						</div>
					</PopoverContent>
				</Popover>}
			</div>

			{/* Display Controls */}
			<div className="w-full items-center gap-4 hidden tablet-lg:flex justify-end mt-2">
				{/* Items Per Page */}
				<div className="flex items-baseline">
					<p className="font-semibold text-sm">Show: </p>
					<div className="flex text-[10px] items-center">
						{perPageOptions.map((count, index) => (
							<React.Fragment key={count}>
								<Button
									className={filters.itemsPerPage !== count ? "text-faded-gray" : ""}
									variant="transparant"
									size="sm"
									onClick={() => handleItemsPerPageChange(count)}
								>
									{count}
								</Button>
								{index < perPageOptions.length - 1 && " /"}
							</React.Fragment>
						))}
					</div>
				</div>

				{/* Grid View Options */}
				<div className="flex items-center gap-2.5">
					{gridViewOptions.map(grid => (
						<Button
							key={grid.id}
							variant="transparant"
							className={`${
								filters.gridView === grid.id ? "opacity-100" : "opacity-70"
							} px-0 hover:opacity-100 transition-all`}
							size="sm"
							onClick={() => handleGridViewChange(grid.id)}
						>
							<Image src={grid.src} width={18} height={18} alt={grid.alt} />
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}