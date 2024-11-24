import React from 'react';
import './background.css';

export const Background = ({ children, numOfParticles=10 }) => {
    const numSpans = numOfParticles; // Set the number of spans you want dynamically rendered
    const spans = Array.from({ length: numSpans }, (_, i) => i);

    return (
      <div className="relative">
        {/* Background (particles) */}
        <div className="background absolute top-0 left-0 w-full h-full z-0">
          {spans.map(index => (
            <span key={index} className={`span-${index}`}></span>
          ))}
        </div>
        {children}
      </div>
    );
}
