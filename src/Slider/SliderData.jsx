import pic1 from './styles/img/pic1';
import pic2 from './styles/img/pic2';
import pic3 from './styles/img/pic3';
import pic4 from './styles/img/pic4';
import pic5 from './styles/img/pic5';
import pic6 from './styles/img/pic6';

// text slider content
const reactContain =
  'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.';

const jsContain =
  'JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it for client-side page behavior, and all major web browsers have a dedicated JavaScript engine to execute it.';

// the basic data according to which slider is constructed
export const slides = [
  { type: 'pic', src: pic1 },
  { type: 'pic', src: pic2 },
  { type: 'pic', src: pic3 },
  { type: 'pic', src: pic4 },
  { type: 'text', text: reactContain, title: 'React' },
  { type: 'pic', src: pic5 },
  { type: 'pic', src: pic6 },
  { type: 'text', text: jsContain, title: 'JavaScript' },
];
