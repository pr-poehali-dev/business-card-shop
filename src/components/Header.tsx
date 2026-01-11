import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartLength: number;
  onCartOpen: () => void;
}

const Header = ({ activeSection, setActiveSection, cartLength, onCartOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <img src="https://cdn.poehali.dev/files/photo_2026-01-11_11-53-56.jpg" alt="КЛ" className="h-14 w-auto hover-scale object-contain logo-colorful" />
          </div>

          <nav className="hidden md:flex gap-6 animate-fade-in">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'catalog', label: 'Каталог', icon: 'ShoppingBag' },
              { id: 'advantages', label: 'Преимущества', icon: 'Award' },
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
            onClick={onCartOpen}
            className="relative p-3 rounded-xl glass-card hover-scale animate-fade-in"
          >
            <Icon name="ShoppingCart" size={24} />
            {cartLength > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-xs font-bold animate-scale-in">
                {cartLength}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;