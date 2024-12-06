export interface Product {
    _id: string;
    name: string;
    details: string;
    sku: string;
    category: string;
    tags: string[],
    price: number,
    img: string
}