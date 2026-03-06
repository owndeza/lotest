/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

type CardStep = 'closed' | 'step1' | 'step2' | 'step3' | 'step4' | 'final';

export default function App() {
  const [step, setStep] = useState<CardStep>('closed');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const [showFinalText, setShowFinalText] = useState(false);

  const triggerHearts = () => {
    const scalar = 2;
    const heart = confetti.shapeFromPath({ path: 'M167 72c19,-38 37,-56 75,-56c44,0 75,33 75,77c0,84 -150,188 -150,188c0,0 -150,-104 -150,-188c0,-44 31,-77 75,-77c38,0 56,18 75,56z' });

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      shapes: [heart],
      colors: ['#FF69B4', '#FF1493', '#C71585', '#FFB6C1'],
      scalar
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    };

    shoot();
    setTimeout(shoot, 200);
  };

  const nextStep = (current: CardStep) => {
    setIsTransitioning(true);
    triggerHearts();
    
    setTimeout(() => {
      if (current === 'step1') setStep('step2');
      if (current === 'step2') setStep('step3');
      if (current === 'step3') setStep('step4');
      
      setIsTransitioning(false);
      setNoButtonVisible(true);

      if (current === 'step4') {
        // Step 4 auto-advances after 3 seconds
        setTimeout(() => {
          setIsTransitioning(true); // Pull back in
          setTimeout(() => {
            setStep('final');
            setTimeout(() => setShowFinalText(true), 1000);
          }, 800);
        }, 3000);
      }
    }, 800);
  };

  const handleNo = () => {
    setNoButtonVisible(false);
  };

  const getPaperAnimation = () => {
    if (isTransitioning) return { x: 0, y: 0, opacity: 0 };
    switch (step) {
      case 'step1': return { x: 0, y: '-105%', opacity: 1 };
      case 'step2': return { x: 0, y: '105%', opacity: 1 };
      case 'step3': return { x: 0, y: '-105%', opacity: 1 };
      case 'step4': return { x: 0, y: '105%', opacity: 1 };
      default: return { x: 0, y: 0, opacity: 0 };
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {step !== 'final' ? (
          <motion.div
            key="box-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: 0,
              y: (step === 'step1' && !isTransitioning) ? 40 : 
                 (step === 'step2' && !isTransitioning) ? -40 :
                 (step === 'step3' && !isTransitioning) ? 40 :
                 (step === 'step4' && !isTransitioning) ? -40 : 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
            exit={{ x: 1000, opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="relative w-[85vw] max-w-[280px] aspect-[4/3] cursor-pointer"
            onClick={() => step === 'closed' && setStep('step1')}
          >
            {/* Box Shadow */}
            <div className="absolute inset-0 bg-black/5 blur-xl rounded-2xl translate-y-4 scale-95" />

            {/* The Letter (Paper) */}
            <motion.div
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={getPaperAnimation()}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className={`absolute left-4 right-4 top-4 bottom-4 bg-white shadow-lg rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center text-center z-10 border-2 border-[#FFD1D1] overflow-hidden`}
            >
              {step === 'step1' && (
                <>
                  <h2 className="text-lg sm:text-xl font-bold text-[#FF4D4D] mb-4">Ты любишь меня? ❤️</h2>
                  <div className="flex flex-col gap-3 w-full justify-center items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); nextStep('step1'); }}
                      className="w-full px-6 py-2 bg-[#FF4D4D] text-white rounded-full font-semibold hover:bg-[#FF3333] transition-colors shadow-md text-sm sm:text-base"
                    >
                      Да
                    </button>
                    {noButtonVisible && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNo(); }}
                        className="w-full px-6 py-2 border-2 border-[#FF4D4D] text-[#FF4D4D] rounded-full font-semibold hover:bg-[#FFF0F0] transition-colors text-sm sm:text-base"
                      >
                        Нет
                      </button>
                    )}
                  </div>
                </>
              )}

              {step === 'step2' && (
                <>
                  <h2 className="text-lg sm:text-xl font-bold text-[#FF4D4D] mb-4">Точно? 🥺</h2>
                  <div className="flex flex-col gap-3 w-full justify-center items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); nextStep('step2'); }}
                      className="w-full px-6 py-2 bg-[#FF4D4D] text-white rounded-full font-semibold hover:bg-[#FF3333] transition-colors shadow-md text-sm sm:text-base"
                    >
                      Да
                    </button>
                    {noButtonVisible && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleNo(); }}
                        className="w-full px-6 py-2 border-2 border-[#FF4D4D] text-[#FF4D4D] rounded-full font-semibold hover:bg-[#FFF0F0] transition-colors text-sm sm:text-base"
                      >
                        Нет
                      </button>
                    )}
                  </div>
                </>
              )}

              {step === 'step3' && (
                <>
                  <h2 className="text-lg sm:text-xl font-bold text-[#FF4D4D] mb-4">Ой, оно не заканчивается 🤭</h2>
                  <div className="flex flex-col gap-3 w-full justify-center items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); nextStep('step3'); }}
                      className="w-full px-6 py-2 bg-[#FF4D4D] text-white rounded-full font-semibold hover:bg-[#FF3333] transition-colors shadow-md text-sm sm:text-base"
                    >
                      Дальше?
                    </button>
                  </div>
                </>
              )}

              {step === 'step4' && (
                <div className="flex flex-wrap gap-1 justify-center items-center opacity-80">
                  {[...Array(20)].map((_, i) => (
                    <span key={i} className="text-[#FF4D4D] font-bold text-xs sm:text-sm animate-pulse">
                      я тебя люблю!
                    </span>
                  ))}
                  <div className="my-2">
                    <Heart className="w-8 h-8 text-[#FF4D4D] fill-[#FF4D4D] animate-bounce" />
                  </div>
                  {[...Array(20)].map((_, i) => (
                    <span key={i + 100} className="text-[#FF4D4D] font-bold text-xs sm:text-sm animate-pulse">
                      я тебя люблю!
                    </span>
                  ))}
                  <Step4Effect onReady={() => nextStep('step4')} />
                </div>
              )}
            </motion.div>

            {/* Box Body (Front Sleeve) */}
            <div className="absolute inset-0 bg-[#FF8E8E] rounded-2xl shadow-xl z-20 flex flex-col items-center justify-center overflow-hidden border-4 border-[#FF7676]">
              {/* Decorative Ribbon */}
              <div className="absolute top-0 bottom-0 w-8 bg-[#FF4D4D] shadow-inner" />
              <div className="absolute left-0 right-0 h-8 bg-[#FF4D4D] shadow-inner" />
              
              {/* Box Label */}
              <div className="z-30 bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-[#FF4D4D] transform -rotate-2">
                <span className="text-[#FF4D4D] font-bold text-lg sm:text-xl whitespace-nowrap">
                  {step === 'closed' ? 'Открой меня! 🎁' : 'Сюрприз! ✨'}
                </span>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center p-8 max-w-md"
          >
            {/* Final GIF */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              className="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 flex items-center justify-center border-4 sm:border-8 border-white"
            >
              <img 
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTM2dWNsYmVqbWwxd2t0bTI0cjE5dGhpc3BrNGxudnA4bWpjODRzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yf5t6Zj45o20ZGN2iA/giphy.gif" 
                alt="Cute Cat Love"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {showFinalText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <h1 className="text-2xl sm:text-4xl font-bold text-[#FF4D4D] drop-shadow-sm">
                  С 8 Марта, милая! 🌷
                </h1>
                <p className="text-xl sm:text-2xl text-[#FF7676] font-medium">
                  Люблю тебя! ❤️
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background floating hearts for atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: -100,
              rotate: Math.random() * 360 + 360,
              x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth)
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute"
          >
            <Heart className="text-[#FFB6C1] fill-[#FFB6C1]" size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Helper component to trigger the auto-advance effect safely
function Step4Effect({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, []);
  return null;
}
