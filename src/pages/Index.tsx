import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    { id: 1, name: 'Гель для стирки Universal Pro', price: 590, category: 'cleaning', rating: 5, image: 'https://cdn.poehali.dev/projects/5dffc7a2-bb39-4eec-ad6e-6308d2b14ecb/files/725c30b3-1498-4c05-9ba2-5568ad16bffe.jpg', badge: 'ХИТ' },
    { id: 2, name: 'Средство для посуды Clean Fresh', price: 290, category: 'cleaning', rating: 5, image: 'https://cdn.poehali.dev/projects/5dffc7a2-bb39-4eec-ad6e-6308d2b14ecb/files/a33d96ea-0dc7-4df5-ac90-28be1ce1cfbb.jpg', badge: 'НОВИНКА' },
    { id: 3, name: 'Универсальное чистящее средство', price: 450, category: 'cleaning', rating: 5, image: '/placeholder.svg' },
    { id: 4, name: 'Кондиционер для белья Soft', price: 390, category: 'cleaning', rating: 4, image: '/placeholder.svg' },
    { id: 5, name: 'Футболка Urban Play', price: 1290, category: 'fashion', rating: 5, image: 'https://cdn.poehali.dev/projects/5dffc7a2-bb39-4eec-ad6e-6308d2b14ecb/files/0fc18576-95e9-49ab-8086-f166a1ee1032.jpg', badge: 'ХИТ' },
    { id: 6, name: 'Толстовка Urban Style', price: 2490, category: 'fashion', rating: 5, image: '/placeholder.svg' },
    { id: 7, name: 'Парфюмерная вода Fresh', price: 1890, category: 'cosmetics', rating: 5, image: '/placeholder.svg', badge: 'НОВИНКА' },
    { id: 8, name: 'Крем для рук Velvet Touch', price: 490, category: 'cosmetics', rating: 4, image: '/placeholder.svg' },
    { id: 9, name: 'Шампунь Natural Care', price: 690, category: 'cosmetics', rating: 5, image: '/placeholder.svg' },
    { id: 10, name: 'Туалетная вода Urban Night', price: 2290, category: 'cosmetics', rating: 5, image: '/placeholder.svg' },
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { id: 'cleaning', name: 'Бытовая химия', icon: 'Droplets' },
    { id: 'fashion', name: 'Одежда', icon: 'Shirt' },
    { id: 'cosmetics', name: 'Косметика и парфюмерия', icon: 'Sparkles' },
  ];

  const reviews = [
    { id: 1, name: 'Мария С.', rating: 5, text: 'Отличная бытовая химия! Гель для стирки прекрасно отстирывает, аромат приятный. Рекомендую!', date: '2 дня назад' },
    { id: 2, name: 'Дмитрий К.', rating: 5, text: 'Заказывал средство для посуды - пенится отлично, посуда блестит. Буду брать еще!', date: '5 дней назад' },
    { id: 3, name: 'Елена П.', rating: 5, text: 'Очень довольна качеством продукции UrbanPlay. Цены доступные, качество на высоте!', date: '1 неделю назад' },
    { id: 4, name: 'Сергей В.', rating: 4, text: 'Купил футболку и парфюм - всё отличного качества. Доставка быстрая!', date: '2 недели назад' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      <header className="sticky top-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <img src="https://cdn.poehali.dev/files/Рисунок1.png" alt="UrbanPlay" className="h-12 w-auto" />
            </div>

            <nav className="hidden md:flex gap-6 animate-fade-in">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'catalog', label: 'Каталог', icon: 'ShoppingBag' },
                { id: 'about', label: 'О нас', icon: 'Info' },
                { id: 'reviews', label: 'Отзывы', icon: 'MessageSquare' },
                { id: 'contacts', label: 'Контакты', icon: 'Phone' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover-scale ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-3 rounded-xl glass-card hover-scale animate-fade-in"
            >
              <Icon name="ShoppingCart" size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-xs font-bold animate-scale-in">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse-glow"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-6xl font-bold mb-6 text-gradient animate-float">
                UrbanPlay — чистота и стиль
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Производитель качественной бытовой химии, одежды, косметики и парфюмерии
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setActiveSection('catalog')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl hover-scale"
                >
                  <Icon name="ShoppingBag" size={24} className="mr-2" />
                  Перейти в каталог
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveSection('about')}
                  className="glass-card text-lg px-8 py-6 rounded-xl hover-scale"
                >
                  Узнать больше
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { icon: 'Factory', title: 'Собственное производство', desc: 'Контроль качества на каждом этапе' },
                { icon: 'Leaf', title: 'Экологичность', desc: 'Безопасные составы для вас и природы' },
                { icon: 'Truck', title: 'Быстрая доставка', desc: 'Отправка в день заказа' },
              ].map((feature, i) => (
                <Card key={i} className="glass-card border-white/10 hover-scale animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                      <Icon name={feature.icon} size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg glass-card border-white/10 rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-8 justify-center flex-wrap animate-fade-in">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  className={`rounded-xl hover-scale ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-primary to-secondary'
                      : 'glass-card border-white/10'
                  }`}
                >
                  <Icon name={cat.icon} size={18} className="mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, i) => (
                <Card key={product.id} className="glass-card border-white/10 overflow-hidden hover-scale animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    {product.badge && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-secondary to-accent">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-lg">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(product.rating)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gradient">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-lg"
                      >
                        <Icon name="Plus" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center text-gradient">О нас</h2>
            <Card className="glass-card border-white/10 p-8">
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed">
                  UrbanPlay — российский производитель качественной бытовой химии с собственным производством. 
                  Мы создаем эффективные и экологичные средства для уборки и стирки, а также предлагаем стильную одежду, косметику и парфюмерию.
                </p>
                <p className="text-lg leading-relaxed">
                  Наша миссия — сделать ваш дом чистым, а жизнь яркой и комфортной. Мы используем только проверенные и безопасные компоненты, 
                  чтобы вы могли доверять нашей продукции.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {[
                    { number: '15+', label: 'Лет на рынке' },
                    { number: '100+', label: 'Наименований продукции' },
                    { number: '99%', label: 'Экологичных компонентов' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 glass-card rounded-xl">
                      <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center text-gradient">Отзывы клиентов</h2>
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <Card key={review.id} className="glass-card border-white/10 hover-scale animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-xl font-bold">
                        {review.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{review.name}</h3>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center text-gradient">Контакты</h2>
            <Card className="glass-card border-white/10 p-8">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: 'Phone', label: 'Телефон', value: '+7 (800) 555-12-34' },
                    { icon: 'Mail', label: 'Email', value: 'info@urbanplay.ru' },
                    { icon: 'MapPin', label: 'Адрес производства', value: 'Россия, Московская обл.' },
                    { icon: 'Clock', label: 'Режим работы', value: 'Пн-Пт: 9:00 - 18:00' },
                  ].map((contact, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 glass-card rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={contact.icon} size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{contact.label}</div>
                        <div className="font-semibold">{contact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <Card className="relative w-full md:w-[500px] glass-card border-white/10 animate-slide-up md:animate-scale-in max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gradient">Корзина</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Icon name="X" size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-lg">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="glass-card border-white/10 p-4">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.name}</h4>
                          <p className="text-sm text-gradient font-bold mb-2">{item.price.toLocaleString('ru-RU')} ₽</p>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 p-0 rounded-lg">
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 p-0 rounded-lg">
                              <Icon name="Plus" size={16} />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)} className="ml-auto rounded-lg">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Итого:</span>
                  <span className="text-gradient">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 py-6 text-lg rounded-xl" onClick={() => toast.success('Заказ оформлен!')}>
                  <Icon name="CreditCard" size={24} className="mr-2" />
                  Оформить заказ
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;