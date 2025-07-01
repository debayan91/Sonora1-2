import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { db } from '/firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '/src/hooks/useAuth.js';

const CartContext = createContext();
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: true,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        itemCount: action.payload.itemCount || 0,
        isLoading: false
      };
      
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const updatedItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        : [...state.items, action.payload];
      
      const newTotal = state.total + (action.payload.price * action.payload.quantity);
      const newItemCount = state.itemCount + action.payload.quantity;
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount
      };
    }
      
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity
      };
    }
      
    case 'UPDATE_QUANTITY': {
      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
      
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (itemToUpdate.price * quantityDiff),
        itemCount: state.itemCount + quantityDiff
      };
    }
      
    case 'CLEAR_CART':
      return { ...initialState, isLoading: false };
      
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { currentUser } = useAuth();

  const persistCart = useCallback(async (cartData) => {
    try {
      const dataToSave = {
        ...cartData,
        lastUpdated: new Date().toISOString()
      };

      if (currentUser) {
        await setDoc(doc(db, 'carts', currentUser.uid), dataToSave);
        console.log('Saved to Firestore:', dataToSave);
      } else {
        localStorage.setItem('guestCart', JSON.stringify(dataToSave));
        console.log('Saved to localStorage:', dataToSave);
      }
    } catch (error) {
      console.error('Persist error:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        let cartData;
        if (currentUser) {
          const docSnap = await getDoc(doc(db, 'carts', currentUser.uid));
          cartData = docSnap.exists() ? docSnap.data() : initialState;
          console.log('Loaded from Firestore:', cartData);
        } else {
          const localCart = localStorage.getItem('guestCart');
          cartData = localCart ? JSON.parse(localCart) : initialState;
          console.log('Loaded from localStorage:', cartData);
        }
        
        dispatch({ type: 'SET_CART', payload: cartData });
      } catch (error) {
        console.error('Load error:', error);
        dispatch({ type: 'SET_CART', payload: initialState });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    loadCart();
  }, [currentUser]);

  useEffect(() => {
    if (state.isLoading) return;
    
    const timer = setTimeout(() => {
      if (state.items.length > 0 || state.itemCount > 0) {
        persistCart({
          items: state.items,
          total: state.total,
          itemCount: state.itemCount
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [state.items, state.total, state.itemCount, state.isLoading, persistCart]);

  useEffect(() => {
    if (!currentUser || state.isLoading) return;

    const mergeGuestCart = async () => {
      const guestCart = localStorage.getItem('guestCart');
      if (!guestCart) return;

      try {
        const parsed = JSON.parse(guestCart);
        if (parsed.items?.length > 0) {
          parsed.items.forEach(item => 
            dispatch({ type: 'ADD_ITEM', payload: item })
          );
          localStorage.removeItem('guestCart');
          console.log('Merged guest cart to user');
        }
      } catch (e) {
        console.error('Merge error:', e);
      }
    };

    mergeGuestCart();
  }, [currentUser, state.isLoading]);

  const addItem = useCallback((item) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: {
        id: item.id,
        name: item.pname || item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        brand: item.bname
      }
    });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ 
      type: quantity < 1 ? 'REMOVE_ITEM' : 'UPDATE_QUANTITY',
      payload: quantity < 1 ? id : { id, quantity }
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  return (
    <CartContext.Provider value={{
      items: state.items,
      total: state.total,
      itemCount: state.itemCount,
      isLoading: state.isLoading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};