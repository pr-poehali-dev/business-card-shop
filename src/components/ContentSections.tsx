import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  badge?: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ContentSectionsProps {
  activeSection: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredProducts: Product[];
  categories: Category[];
  reviews: Review[];
  renderStars: (rating: number) => JSX.Element[];
  addToCart: (product: Product) => void;
}

const ContentSections = ({
  activeSection,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  filteredProducts,
  categories,
  reviews,
  renderStars,
  addToCart,
}: ContentSectionsProps) => {
  return (
    <>
      {activeSection === 'catalog' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient animate-fade-in">Наш каталог</h2>
            
            <div className="max-w-xl mx-auto mb-12 animate-fade-in">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 glass-card border-primary/20 focus:border-primary text-lg"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-in">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover-scale ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'glass-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={category.icon} size={20} />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="glass-card border-primary/10 overflow-hidden group hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.badge && (
                        <Badge className={`absolute top-4 right-4 ${
                          product.badge === 'ХИТ' ? 'bg-gradient-to-r from-secondary to-accent' : 'bg-gradient-to-r from-primary to-secondary'
                        }`}>
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <div className="flex gap-1 mb-3">
                        {renderStars(product.rating)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gradient">{product.price} ₽</span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity hover-scale"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'advantages' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient animate-fade-in">Наши преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'Shield', title: 'Безопасность', text: 'Все товары сертифицированы и безопасны для здоровья' },
                { icon: 'Sparkles', title: 'Качество', text: 'Высокое качество продукции по доступным ценам' },
                { icon: 'Truck', title: 'Доставка', text: 'Быстрая доставка по всей России' },
                { icon: 'Heart', title: 'Забота', text: 'Экологичные компоненты и упаковка' },
              ].map((advantage, index) => (
                <Card
                  key={advantage.title}
                  className="glass-card border-primary/10 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center hover-scale">
                      <Icon name={advantage.icon} size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-muted-foreground">{advantage.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto animate-fade-in">
              <h2 className="text-4xl font-bold text-center mb-8 text-gradient">О компании КЛ</h2>
              <Card className="glass-card border-primary/10">
                <CardContent className="p-8">
                  <p className="text-xl text-center font-semibold mb-8 text-gradient leading-relaxed">
                    Безопасность Вашей семьи, забота о бюджете и качестве - наша задача!
                  </p>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center">
                    Это не просто слоган, это реальный ориентир, которому мы следуем! 
                    Мы создаем продукцию, которая защищает здоровье вашей семьи, бережет ваш кошелек и гарантирует высочайшее качество в каждом продукте.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {[
                      { icon: 'Users', number: '10000+', text: 'Довольных клиентов' },
                      { icon: 'Package', number: '50+', text: 'Товаров в каталоге' },
                      { icon: 'Award', number: '5', text: 'Лет на рынке' },
                    ].map((stat) => (
                      <div key={stat.text} className="text-center">
                        <Icon name={stat.icon} size={32} className="mx-auto mb-2 text-primary" />
                        <div className="text-3xl font-bold text-gradient mb-1">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.text}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient animate-fade-in">Отзывы клиентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="glass-card border-primary/10 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{review.name}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient animate-fade-in">Контакты</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card border-primary/10 animate-fade-in">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h3>
                  <div className="space-y-4">
                    {[
                      { icon: 'Phone', text: '+7 (800) 123-45-67', label: 'Телефон' },
                      { icon: 'Mail', text: 'info@kl-company.ru', label: 'Email' },
                      { icon: 'MapPin', text: 'г. Москва, ул. Примерная, д. 123', label: 'Адрес' },
                      { icon: 'Clock', text: 'Пн-Пт: 9:00 - 18:00', label: 'Режим работы' },
                    ].map((contact) => (
                      <div key={contact.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                          <Icon name={contact.icon} size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">{contact.label}</div>
                          <div className="font-medium">{contact.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Напишите нам</h3>
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Ваше имя" className="glass-card border-primary/20" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Email" className="glass-card border-primary/20" />
                    </div>
                    <div>
                      <textarea
                        placeholder="Сообщение"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg glass-card border border-primary/20 focus:border-primary outline-none resize-none"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity hover-scale">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContentSections;