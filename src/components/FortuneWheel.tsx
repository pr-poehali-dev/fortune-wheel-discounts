import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Segment {
  discount: number;
  color: string;
  rotation: number;
}

const segments: Segment[] = [
  { discount: 5, color: '#FF6B9D', rotation: 0 },
  { discount: 10, color: '#8B5CF6', rotation: 90 },
  { discount: 15, color: '#FCD34D', rotation: 180 },
  { discount: 20, color: '#F97316', rotation: 270 },
];

const FortuneWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setShowConfetti(false);

    const spins = 5 + Math.random() * 3;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + extraDegrees;
    
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentIndex = Math.floor(normalizedRotation / 90);
      const winningDiscount = segments[segmentIndex].discount;
      
      setResult(winningDiscount);
      setShowConfetti(true);
      setIsSpinning(false);

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
            {segments.map((segment, index) => (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)',
                  transform: `rotate(${segment.rotation}deg)`,
                  backgroundColor: segment.color,
                  borderRadius: '50%'
                }}
              >
                <div
                  className="absolute text-white font-bold text-4xl"
                  style={{
                    top: '25%',
                    left: '70%',
                    transform: 'rotate(45deg)'
                  }}
                >
                  {segment.discount}%
                </div>
              </div>
            ))}
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
            <p className="text-2xl text-gray-700 mb-2">Поздравляем! 🎊</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Ваша скидка: {result}%
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="w-4 h-4 rounded-full bg-[#FF6B9D]" />
          <span className="text-sm font-medium">5%</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="w-4 h-4 rounded-full bg-[#8B5CF6]" />
          <span className="text-sm font-medium">10%</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="w-4 h-4 rounded-full bg-[#FCD34D]" />
          <span className="text-sm font-medium">15%</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="w-4 h-4 rounded-full bg-[#F97316]" />
          <span className="text-sm font-medium">20%</span>
        </div>
      </div>
    </div>
  );
};

export default FortuneWheel;
