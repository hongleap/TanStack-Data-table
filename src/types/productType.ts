export type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
}

export type ProductDetailType = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
}

export type CartItems = {
    id: number;
    title: string;
    slug?: string;
    price: number;
    description: string;
    category?: string;
    thumbnail: string[];
    createdAt?: string;
    updatedAt?: string;
    quantity: number;
}