export interface Category {
    id: number;
    name: string;
    icon: string;
  }
  
  export interface Provider {
    id: number;
    name: string;
    categoryId: number;
    rating: number;
    pricePerHour: number;
    experienceYears: number;
    location: {
      lat: number;
      lng: number;
      city: string;
    };
    description: string;
    image: string;
    gallery: string[];
  }
  
  
  export interface ProviderWithCategory extends Provider {
    categoryName: string;
  }