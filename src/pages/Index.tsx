import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import ContentSections from '@/components/ContentSections';
import CartModal from '@/components/CartModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const products: Product[] = [
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

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setActiveSection('product-detail');
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

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
        onProductClick={handleProductClick}
      />

      {activeSection === 'product-detail' && selectedProduct && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Button
              variant="outline"
              onClick={() => setActiveSection('catalog')}
              className="mb-8 hover-scale"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к каталогу
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="animate-fade-in">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full rounded-2xl glass-card shadow-lg"
                />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl font-bold text-gradient">{selectedProduct.name}</h1>
                  {selectedProduct.badge && (
                    <Badge className={`${
                      selectedProduct.badge === 'ХИТ' ? 'bg-gradient-to-r from-secondary to-accent' : 'bg-gradient-to-r from-primary to-secondary'
                    }`}>
                      {selectedProduct.badge}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-1 mb-6">
                  {renderStars(selectedProduct.rating)}
                </div>
                
                <div className="text-5xl font-bold text-gradient mb-8">
                  {selectedProduct.price} ₽
                </div>
                
                <Card className="glass-card border-primary/10 mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Описание товара</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Высококачественный товар от производственной компании КЛ. 
                      Создан с заботой о вашей семье и окружающей среде. 
                      Безопасный состав, проверенное качество, доступная цена.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card border-primary/10 mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Преимущества</h3>
                    <ul className="space-y-3">
                      {[
                        'Безопасный натуральный состав',
                        'Высокое качество продукции',
                        'Экологичная упаковка',
                        'Доступная цена',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Button
                  size="lg"
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-xl py-6 hover-scale"
                >
                  <Icon name="ShoppingCart" size={24} className="mr-3" />
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

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