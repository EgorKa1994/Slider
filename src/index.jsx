import React from 'react';
import ReactDOM from 'react-dom';
import {SliderApp} from './Slider/SliderApp';
import { slides } from './Slider/SliderData';

const App = () => {
  return (
    <SliderApp slides={slides}/>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
