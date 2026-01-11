import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomeSectionProps {
  setActiveSection: (section: string) => void;
}

const HomeSection = ({ setActiveSection }: HomeSectionProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 animated-gradient-bg opacity-30"></div>
      <div className="wave-shape">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary/20"></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <img src="https://cdn.poehali.dev/files/Рисунок1.png" alt="КЛ" className="h-32 w-auto animate-float hover-scale" />
            </div>
            <h2 className="text-5xl font-bold mb-4 text-gradient">
              Чистота, забота и красота
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Безопасная бытовая химия, стильная одежда и натуральная косметика для вас и вашей семьи
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setActiveSection('catalog')}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl hover-scale"
              >
                <Icon name="Sparkles" size={24} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveSection('advantages')}
                className="glass-card text-lg px-8 py-6 rounded-xl hover-scale"
              >
                <Icon name="Heart" size={24} className="mr-2" />
                Почему мы?
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: 'Heart', title: 'Безопасно для семьи', desc: 'Без фосфатов, хлора и агрессивных веществ' },
              { icon: 'Sparkles', title: 'Натуральные компоненты', desc: 'Только растительное сырье и экстракты' },
              { icon: 'Smile', title: 'Легкость и комфорт', desc: 'Эффективная уборка без усилий' },
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
  );
};

export default HomeSection;