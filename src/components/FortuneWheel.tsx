import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Segment {
  discount: number | string;
  color: string;
  rotation: number;
}

const segments: Segment[] = [
  { discount: 5, color: '#FF6B9D', rotation: 0 },
  { discount: 10, color: '#8B5CF6', rotation: 40 },
  { discount: 15, color: '#FCD34D', rotation: 80 },
  { discount: 20, color: '#F97316', rotation: 120 },
  { discount: 'Крути ещё раз', color: '#34D399', rotation: 160 },
  { discount: 5, color: '#FF6B9D', rotation: 200 },
  { discount: 10, color: '#8B5CF6', rotation: 240 },
  { discount: 15, color: '#FCD34D', rotation: 280 },
  { discount: 20, color: '#F97316', rotation: 320 },
];

const FortuneWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setShowConfetti(false);

    const spinAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDGJ0/LTgjMGHGm98OScTgwPUKvo8bllHAU7k9nyz3otBSd9zPLaizsIGGS57OihUBAKTKXh8bllHAU7k9nyz3otBSd9zPLaikwZEDmLw/DXgjEGG2q88OOcTgwPUKvo8bllHAU7k9nyz3otBSd9zPLaizsIGGS57OihUBAKTKXh8bllHAU7k9nyz3otBSd9zPLaii0KE0KZ3/LKfzAGI2/B8eSeTAwOT6nl8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU1jtTxy34qBSN5ye/bjjwIF2K47eeeUBEJRaHg8bFjGwU=');
    spinAudio.volume = 0.3;
    spinAudio.play().catch(() => {});
    spinSoundRef.current = spinAudio;

    const spins = 5 + Math.random() * 3;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + extraDegrees;
    
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentIndex = Math.floor(normalizedRotation / 40);
      const winningDiscount = segments[segmentIndex % segments.length].discount;
      
      setResult(winningDiscount);
      setShowConfetti(true);
      setIsSpinning(false);

      const winAudio = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
      winAudio.volume = 0.5;
      winAudio.play().catch(() => {});
      winSoundRef.current = winAudio;

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100" />
      
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                width: '10px',
                height: '10px',
                backgroundColor: ['#FF6B9D', '#8B5CF6', '#FCD34D', '#F97316', '#34D399'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
          Колесо Фортуны
        </h1>
        <p className="text-2xl text-purple-700 font-medium">
          Крути колесо и выигрывай скидку! 🎉
        </p>
      </div>

      <div className="relative z-10 mb-12">
        <div className="relative w-96 h-96">
          <div className="absolute inset-0 bg-white rounded-full shadow-2xl" />
          
          <div 
            className="absolute inset-2 rounded-full transition-transform duration-3000 ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '3000ms' : '0ms'
            }}
          >
            {segments.map((segment, index) => {
              const anglePerSegment = 360 / segments.length;
              const startAngle = index * anglePerSegment;
              const endAngle = (index + 1) * anglePerSegment;
              const midAngle = (startAngle + endAngle) / 2;
              
              const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
              
              const textRadius = 65;
              const textAngleRad = (midAngle * Math.PI) / 180;
              const textX = 50 + textRadius * Math.cos(textAngleRad);
              const textY = 50 + textRadius * Math.sin(textAngleRad);
              
              return (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{
                    clipPath: `polygon(50% 50%, ${x1}% ${y1}%, ${x2}% ${y2}%)`,
                    backgroundColor: segment.color,
                  }}
                >
                  <div
                    className="absolute text-white font-bold"
                    style={{
                      top: `${textY}%`,
                      left: `${textX}%`,
                      transform: `translate(-50%, -50%) rotate(${midAngle + 90}deg)`,
                      fontSize: typeof segment.discount === 'string' ? '0.8rem' : '1.8rem',
                      whiteSpace: 'nowrap',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      fontWeight: '800'
                    }}
                  >
                    {typeof segment.discount === 'number' ? `${segment.discount}%` : segment.discount}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg z-10 flex items-center justify-center">
            <Icon name="Star" className="text-yellow-500" size={32} />
          </div>

          <div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
            style={{
              width: '0',
              height: '0',
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderTop: '40px solid #EF4444'
            }}
          />
        </div>
      </div>

      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        size="lg"
        className="relative z-10 text-2xl px-12 py-8 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white font-bold rounded-full shadow-2xl transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <Icon name="Loader2" className="animate-spin" size={28} />
            Крутится...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Icon name="Sparkles" size={28} />
            Крутить колесо!
          </span>
        )}
      </Button>

      {result !== null && (
        <div className="relative z-10 mt-8 animate-bounce-in">
          <div className="bg-white rounded-3xl shadow-2xl px-12 py-8 border-4 border-purple-500">
            <p className="text-2xl text-gray-700 mb-2">
              {result === 'Крути ещё раз' ? 'Попробуй снова! 🎲' : 'Поздравляем! 🎊'}
            </p>
            <p className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              {typeof result === 'number' ? `Ваша скидка: ${result}%` : result}
            </p>
          </div>
        </div>
      )}


    </div>
  );
};

export default FortuneWheel;