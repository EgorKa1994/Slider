import React from 'react';

// image slide pattern
export const SlideImg = ({ src, alt }) => {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
};

// example of slider with other html content
export const SlideText = ({ text, title, ...other }) => {
  return (
    <div {...other}>
      <h1>{title}</h1>
      {text}
    </div>
  );
};

// dots items in navigation
export const NavDotItem = ({ onClick, id, className }) => {
  return (
    <span
      id={id}
      className={`dot ${className}`}
      onClick={(e) => onClick(e.target.id)}
    ></span>
  );
};
