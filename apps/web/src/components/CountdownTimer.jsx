
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const labels = {
    days: 'DIAS',
    hours: 'HRS',
    minutes: 'MIN',
    seconds: 'SEG'
  };

  return (
    <div className="flex gap-2 sm:gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div 
          key={unit} 
          className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-white/10 rounded-md w-16 h-16 sm:w-24 sm:h-24"
        >
          <span className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tighter leading-none">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[9px] sm:text-xs font-heading font-bold uppercase text-primary mt-1 tracking-widest">
            {labels[unit]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
