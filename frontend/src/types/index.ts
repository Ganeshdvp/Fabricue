// product Data
export interface ProductData {
  readonly _id: string;
  readonly name: string;
  readonly brand: string;
  readonly price: number;
  readonly discountPrice: number;
  readonly rating: number;
  readonly description: string;
  readonly image: string[];
  readonly isFavorite: boolean;
  readonly category: string,
  readonly colors: string[],
  readonly currency: string,
  readonly isNewArrival:boolean,
  readonly numReviews: number,
  readonly sellerId: string,
  readonly sizes: string[],
  readonly stock: number,
  readonly subCategory: string,
}

// User Data in store
export interface User {
  readonly _id: string,
  readonly fullName: string,
  readonly email: string,
  readonly passwordChangedAt: string,
  readonly role: "user" | "seller",
}

// cart items in store
export interface CartItem {
  readonly _id: string,
  readonly userId: string,
  readonly productId: ProductData,
  readonly quantity: number,
  readonly size: string,
  readonly color: string,
}

export interface sidebarDashboard {
  content: string
}

// Reduxt State
export interface RootState {
    readonly user: User | null,
    readonly wishList: ProductData[] | null,
    readonly cartItems: CartItem | null,
    readonly product: ProductData[] | null,
    readonly address: Address | null,
    readonly cookieToggle: boolean,
    readonly sidebarDashboard: sidebarDashboard
}

// Order
export interface Order {
  _id: string,
  createdAt: string,
  updatedAt: string,
  status: OrderStatus,
  paymentMethod: PaymentMethod,
  paymentDate: string,
  items: readonly CartItem[],
  deliveryAddress: Address,
  userId: User
}

// Address
export interface Address {
  readonly _id: string,
  readonly addressType: string,
  readonly city: string,
  readonly country: string,
  readonly landMark: string,
  readonly pinCode: number | null,
  readonly state: string
}

// Add address
export interface AddAddress {
  readonly addressType: string;
  readonly landMark: string;
  readonly city: string;
  readonly state: string;
  readonly pinCode: string;
  readonly country: string;
}

// status
export type OrderStatus = "paid" | "COD" | "failed";
export type PaymentMethod = "COD" | "Online";