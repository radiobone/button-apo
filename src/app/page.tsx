'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

type ColorInfo = {
  letter: string;
  bgColor: string;
  textColor: string;
  ringColor: string;
  backButtonHoverBg: string;
  backButtonHoverText: string;
};

const colorsData: ColorInfo[] = [
  { letter: 'A', bgColor: 'bg-red-500', textColor: 'text-red-100', ringColor: 'focus:ring-red-400', backButtonHoverBg: 'hover:bg-red-100', backButtonHoverText: 'hover:text-red-500' },
  { letter: 'B', bgColor: 'bg-green-500', textColor: 'text-green-100', ringColor: 'focus:ring-green-400', backButtonHoverBg: 'hover:bg-green-100', backButtonHoverText: 'hover:text-green-500' },
  { letter: 'C', bgColor: 'bg-yellow-400', textColor: 'text-yellow-900', ringColor: 'focus:ring-yellow-500', backButtonHoverBg: 'hover:bg-yellow-900', backButtonHoverText: 'hover:text-yellow-400' },
  { letter: 'D', bgColor: 'bg-blue-500', textColor: 'text-blue-100', ringColor: 'focus:ring-blue-400', backButtonHoverBg: 'hover:bg-blue-100', backButtonHoverText: 'hover:text-blue-500' },
];

const cornerClasses = [
  'top-4 left-4 md:top-8 md:left-8',
  'top-4 right-4 md:top-8 md:right-8',
  'bottom-4 left-4 md:bottom-8 md:left-8',
  'bottom-4 right-4 md:bottom-8 md:right-8',
];

export default function Home() {
  const [selected, setSelected] = useState<ColorInfo | null>(null);

  const handleBack = () => {
    setSelected(null);
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden font-headline">
      <div
        className={cn(
          'absolute inset-0 transition-all duration-500 ease-in-out',
          selected ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
        )}
      >
        <div className="relative flex items-center justify-center h-full">
            {colorsData.map((color, index) => (
              <button
                key={color.letter}
                onClick={() => setSelected(color)}
                className={cn(
                  'absolute flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-xl transform transition-all duration-300 ease-in-out',
                  'hover:scale-110 hover:shadow-2xl hover:z-10 focus:outline-none focus:ring-4 ring-offset-4 ring-offset-background',
                  color.bgColor,
                  color.ringColor,
                  cornerClasses[index]
                )}
                aria-label={`Select color ${color.letter}`}
              >
                <span className={cn('text-7xl md:text-8xl font-black', color.textColor)}>
                  {color.letter}
                </span>
              </button>
            ))}
        </div>
      </div>
      
      {selected && (
         <div
            key={selected.letter}
            className={cn(
              'fixed inset-0 z-20 flex flex-col items-center justify-center animate-in fade-in duration-500',
              selected.bgColor
            )}
        >
            <span
              className={cn(
                'font-black text-[25rem] sm:text-[35rem] md:text-[45rem] leading-none select-none animate-in zoom-in-75 duration-700',
                selected.textColor
              )}
            >
              {selected.letter}
            </span>

            <Button
              onClick={handleBack}
              variant="outline"
              className={cn(
                'absolute bottom-10 rounded-full h-14 px-8 text-lg font-semibold border-2 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 fill-mode-backwards',
                'focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent shadow-2xl backdrop-blur-sm bg-white/10',
                selected.textColor,
                selected.ringColor,
                selected.backButtonHoverBg,
                selected.backButtonHoverText,
                { 'border-yellow-900/50': selected.letter === 'C', 'border-white/50': selected.letter !== 'C' }
              )}
              aria-label="Go back to main screen"
          >
            <ArrowLeft className="mr-2 h-6 w-6" />
            Back
          </Button>
        </div>
      )}
    </main>
  );
}
