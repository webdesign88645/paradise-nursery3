import React, { useState, useReducer } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Home, Leaf } from 'lucide-react';

// Redux-like reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    
    case 'INCREMENT_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    
    case 'DECREMENT_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    default:
      return state;
  }
};

// Datos de las plantas organizadas por categorías con imágenes reales
const plantsData = {
  "Plantas de Hojas Verdes": [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Ficus Lyrata",
      price: 52.50,
      image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ],
  "Plantas Suculentas": [
    {
      id: 3,
      name: "Echeveria Elegans",
      price: 18.75,
      image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Aloe Vera",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ],
  "Plantas Colgantes": [
    {
      id: 5,
      name: "Pothos Dorado",
      price: 28.50,
      image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "Hiedra Inglesa",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ]
};

// Componente Header
const Header = ({ cartCount, currentPage, setCurrentPage }) => {
  return (
    <header className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Leaf className="w-8 h-8 text-pink-100" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-100 to-white bg-clip-text text-transparent">
            Paradise Nursery
          </h1>
        </div>
        <nav className="flex items-center gap-6">
          {currentPage !== 'home' && (
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-400 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <Home className="w-4 h-4" />
              Inicio
            </button>
          )}
          {currentPage !== 'products' && (
            <button
              onClick={() => setCurrentPage('products')}
              className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-400 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Productos
            </button>
          )}
          {currentPage !== 'cart' && (
            <button
              onClick={() => setCurrentPage('cart')}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-400 transition-all duration-300 transform hover:scale-105 shadow-md relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
              Carrito
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

// Componente Home Page
const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Imagen de fondo real */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.3)), url("https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-20 left-20 w-4 h-4 bg-pink-300 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-rose-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-pink-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-rose-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-4">
        <div className="bg-white bg-opacity-95 rounded-2xl p-12 max-w-2xl shadow-2xl backdrop-blur-sm border border-pink-200">
          <div className="mb-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
              Paradise Nursery
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Bienvenido a Paradise Nursery, tu destino premium para plantas de interior excepcionales. 
            Desde 1985, nos especializamos en cultivar y cuidar las más hermosas plantas tropicales, 
            suculentas y plantas de follaje para transformar tu hogar en un oasis verde. Nuestra pasión 
            por la botánica y años de experiencia nos permiten ofrecerte plantas saludables y de la más 
            alta calidad, junto con el conocimiento experto para cuidarlas adecuadamente.
          </p>
          
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full text-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-2xl"
          >
            Empezar ✨
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Products Page
const ProductsPage = ({ cart, dispatch }) => {
  const isInCart = (plantId) => {
    return cart.items.some(item => item.id === plantId);
  };

  const addToCart = (plant) => {
    dispatch({ type: 'ADD_TO_CART', payload: plant });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Nuestra Colección de Plantas de Interior
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
        </div>
        
        {Object.entries(plantsData).map(([category, plants]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold text-pink-700 mb-6 text-center">
              <span className="bg-white px-6 py-2 rounded-full shadow-md border-2 border-pink-200">
                {category}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plants.map((plant) => (
                <div key={plant.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
                  <div className="relative overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/ec4899/ffffff?text=${encodeURIComponent(plant.name)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{plant.name}</h4>
                    <p className="text-2xl font-bold text-pink-600 mb-4">${plant.price}</p>
                    <button
                      onClick={() => addToCart(plant)}
                      disabled={isInCart(plant.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        isInCart(plant.id)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isInCart(plant.id) ? '✓ Añadida al Carrito' : '🛒 Añadir al Carrito'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente Cart Page
const CartPage = ({ cart, dispatch, setCurrentPage }) => {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const incrementItem = (id) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: { id } });
  };

  const decrementItem = (id) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: { id } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleCheckout = () => {
    alert('¡Próximamente! Funcionalidad de pago en desarrollo. 💳✨');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Tu Carrito de Compras
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-12 shadow-xl border border-pink-200">
              <ShoppingCart className="w-24 h-24 text-pink-300 mx-auto mb-4" />
              <h3 className="text-2xl text-pink-600 mb-4 font-semibold">Tu carrito está vacío</h3>
              <p className="text-gray-600 mb-6">¡Descubre nuestras hermosas plantas y empieza tu jardín interior!</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🌸 Continuar Comprando
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Resumen del carrito */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-pink-200">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-pink-700">
                  🌱 Total de plantas: <span className="text-2xl">{totalItems}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total a pagar</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Items del carrito */}
            <div className="space-y-4 mb-8">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/80x80/ec4899/ffffff?text=${encodeURIComponent(item.name.slice(0,2))}`;
                        }}
                      />
                      <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h4>
                      <p className="text-pink-600 font-semibold mb-1">${item.price} por unidad</p>
                      <p className="text-gray-600">Subtotal: <span className="font-semibold text-pink-600">${(item.price * item.quantity).toFixed(2)}</span></p>
                    </div>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-3 bg-pink-50 rounded-xl p-2">
                      <button
                        onClick={() => decrementItem(item.id)}
                        className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center hover:bg-pink-300 transition-colors text-pink-700 font-bold"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-pink-700">{item.quantity}</span>
                      <button
                        onClick={() => incrementItem(item.id)}
                        className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center hover:bg-pink-300 transition-colors text-pink-700 font-bold"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200 hover:border-rose-300"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={() => setCurrentPage('products')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                🌸 Continuar Comprando
              </button>
              <button
                onClick={handleCheckout}
                className="px-10 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg text-lg"
              >
                💳 Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'products':
        return <ProductsPage cart={cart} dispatch={dispatch} />;
      case 'cart':
        return <CartPage cart={cart} dispatch={dispatch} setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      {currentPage !== 'home' && (
        <Header 
          cartCount={cartCount} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
      )}
      {renderPage()}
    </div>
  );
};

export default App;
