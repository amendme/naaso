import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { CartItemType } from '@shared/schema';

interface CartState {
  items: CartItemType[];
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
  getSubtotal: () => number;
}

type SetState = (partial: Partial<CartState> | ((state: CartState) => Partial<CartState>), replace?: boolean) => void;
type GetState = () => CartState;

export const useCart = create<CartState>()(
  persist(
    (set: SetState, get: GetState) => ({
      items: [],
      isLoading: false,
      isSyncing: false,
      error: null,
      
      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiRequest('GET', '/api/cart', undefined);
          const data = await response.json();
          set({ items: data, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      
      addToCart: async (productId: number, quantity: number) => {
        set({ isSyncing: true, error: null });
        try {
          await apiRequest('POST', '/api/cart', { productId, quantity });
          await get().fetchCart();
          queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
          set({ isSyncing: false });
        } catch (error) {
          set({ error: (error as Error).message, isSyncing: false });
        }
      },
      
      updateQuantity: async (id: number, quantity: number) => {
        if (quantity < 1) return;
        set({ isSyncing: true, error: null });
        try {
          await apiRequest('PATCH', `/api/cart/${id}`, { quantity });
          await get().fetchCart();
          queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
          set({ isSyncing: false });
        } catch (error) {
          set({ error: (error as Error).message, isSyncing: false });
        }
      },
      
      removeItem: async (id: number) => {
        set({ isSyncing: true, error: null });
        try {
          await apiRequest('DELETE', `/api/cart/${id}`, undefined);
          await get().fetchCart();
          queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
          set({ isSyncing: false });
        } catch (error) {
          set({ error: (error as Error).message, isSyncing: false });
        }
      },
      
      clearCart: async () => {
        set({ isSyncing: true, error: null });
        try {
          await apiRequest('DELETE', '/api/cart', undefined);
          set({ items: [], isSyncing: false });
          queryClient.invalidateQueries({ queryKey: ['/api/cart/count'] });
        } catch (error) {
          set({ error: (error as Error).message, isSyncing: false });
        }
      },
      
      getItemCount: () => {
        return get().items.reduce((count: number, item: CartItemType) => count + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total: number, item: CartItemType) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'naaso-cart',
    }
  )
);
