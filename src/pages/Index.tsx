import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import ContentSections from '@/components/ContentSections';
import CartModal from '@/components/CartModal';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  rating: number;
  image: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    { id: 1, name: 'Гель для стирки Universal Pro', price: 590, category: 'cleaning', subcategory: 'laundry', rating: 5, image: 'https://cdn.poehali.dev/projects/5dffc7a2-bb39-4eec-ad6e-6308d2b14ecb/files/725c30b3-1498-4c05-9ba2-5568ad16bffe.jpg', badge: 'ХИТ' },
    { id: 2, name: 'Средство для посуды Clean Fresh', price: 290, category: 'cleaning', subcategory: 'dishes', rating: 5, image: 'https://cdn.poehali.dev/projects/5dffc7a2-bb39-4eec-ad6e-6308d2b14ecb/files/a33d96ea-0dc7-4df5-ac90-28be1ce1cfbb.jpg', badge: 'НОВИНКА' },
    { id: 3, name: 'Универсальное чистящее средство', price: 450, category: 'cleaning', subcategory: 'surface', rating: 5, image: '/placeholder.svg' },
    { id: 4, name: 'Кондиционер для белья Soft', price: 390, category: 'cleaning', subcategory: 'laundry', rating: 4, image: '/placeholder.svg' },
    { id: 5, name: 'Футболка КЛ', price: 1290, category: 'fashion', subcategory: 'tops', rating: 5, image: 'https://cdn.poehali.dev/projects/5dffc7a2-bb39-4eec-ad6e-6308d2b14ecb/files/0fc18576-95e9-49ab-8086-f166a1ee1032.jpg', badge: 'ХИТ' },
    { id: 6, name: 'Толстовка КЛ Style', price: 2490, category: 'fashion', subcategory: 'tops', rating: 5, image: '/placeholder.svg' },
    { id: 7, name: 'Парфюмерная вода Fresh', price: 1890, category: 'cosmetics', subcategory: 'perfume', rating: 5, image: '/placeholder.svg', badge: 'НОВИНКА' },
    { id: 8, name: 'Крем для рук Velvet Touch', price: 490, category: 'cosmetics', subcategory: 'skincare', rating: 4, image: '/placeholder.svg' },
    { id: 9, name: 'Шампунь Natural Care', price: 690, category: 'cosmetics', subcategory: 'haircare', rating: 5, image: '/placeholder.svg' },
    { id: 10, name: 'Туалетная вода КЛ Night', price: 2290, category: 'cosmetics', subcategory: 'perfume', rating: 5, image: '/placeholder.svg' },
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { 
      id: 'cleaning', 
      name: 'Бытовая химия', 
      icon: 'Droplets',
      subcategories: [
        { id: 'all', name: 'Все' },
        { id: 'laundry', name: 'Для стирки' },
        { id: 'dishes', name: 'Для посуды' },
        { id: 'surface', name: 'Для уборки' },
      ]
    },
    { 
      id: 'fashion', 
      name: 'Одежда', 
      icon: 'Shirt',
      subcategories: [
        { id: 'all', name: 'Все' },
        { id: 'tops', name: 'Верх' },
        { id: 'bottoms', name: 'Низ' },
        { id: 'accessories', name: 'Аксессуары' },
      ]
    },
    { 
      id: 'cosmetics', 
      name: 'Косметика и парфюмерия', 
      icon: 'Sparkles',
      subcategories: [
        { id: 'all', name: 'Все' },
        { id: 'perfume', name: 'Парфюмерия' },
        { id: 'skincare', name: 'Уход за кожей' },
        { id: 'haircare', name: 'Уход за волосами' },
      ]
    },
  ];

  const reviews = [
    { id: 1, name: 'Мария С.', rating: 5, text: 'Отличная бытовая химия! Гель для стирки прекрасно отстирывает, аромат приятный. Рекомендую!', date: '2 дня назад' },
    { id: 2, name: 'Дмитрий К.', rating: 5, text: 'Заказывал средство для посуды - пенится отлично, посуда блестит. Буду брать еще!', date: '5 дней назад' },
    { id: 3, name: 'Елена П.', rating: 5, text: 'Очень довольна качеством продукции КЛ. Цены доступные, качество на высоте!', date: '1 неделю назад' },
    { id: 4, name: 'Сергей В.', rating: 4, text: 'Купил футболку и парфюм - всё отличного качества. Доставка быстрая!', date: '2 недели назад' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const subcategories = currentCategory?.subcategories || [];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success('Товар добавлен в корзину!', {
      description: product.name,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icon key={i} name={i < rating ? 'Star' : 'Star'} size={16} className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartLength={cart.length}
        onCartOpen={() => setIsCartOpen(!isCartOpen)}
      />

      {activeSection === 'home' && (
        <HomeSection setActiveSection={setActiveSection} />
      )}

      <ContentSections
        activeSection={activeSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        subcategories={subcategories}
        filteredProducts={filteredProducts}
        categories={categories}
        reviews={reviews}
        renderStars={renderStars}
        addToCart={addToCart}
      />

      <CartModal
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />
    </div>
  );
};

export default Index;