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
  
  export interface Booking {
    id: number;
    providerId: number;
    userId: number;
    date: string;
    time: string;
    hours: number;
    totalCost: number;
    status: 'confirmed' | 'pending' | 'cancelled';
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
  }
  
  // A view-model type for displaying providers with their category name
  export interface ProviderWithCategory extends Provider {
    categoryName: string;
  }