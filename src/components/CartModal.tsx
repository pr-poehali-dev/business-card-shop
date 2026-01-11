import { Button } from '@/components/ui/button';
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

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  updateQuantity: (productId: number, change: number) => void;
  removeFromCart: (productId: number) => void;
  getTotalPrice: () => number;
}

const CartModal = ({ isOpen, cart, onClose, updateQuantity, removeFromCart, getTotalPrice }: CartModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <Card className="relative w-full md:w-[500px] glass-card border-white/10 animate-slide-up md:animate-scale-in max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gradient">Корзина</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
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
  );
};

export default CartModal;
