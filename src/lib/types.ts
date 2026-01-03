export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  benefit: string;
  price: number;
  image: {
    id: string;
  };
  ingredients: string[];
  howToUse: string[];
  skinType: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  image: {
    id:string;
  };
};

export type CartItem = {
  product: Product;
  quantity: number;
};
