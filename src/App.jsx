import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import './App.css'


const frase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
function App() {


  let refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);

  useEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    crearAnimacion();
  }, [])

  const crearAnimacion = () => {
      gsap.to(refs.current, {
        scrollTrigger: {
            trigger: container.current,
            scrub: true,
            start: `top`,
            end: `+=${window.innerHeight / 1.5}`,
        },
        opacity: 1,
        ease: "none",
        stagger: 0.1
    })
  }

  const dividirPalabras = (frase) => {
    let body = [];
    frase.split(" ").forEach( (palabra, i) => {
      const letra = dividirLetras(palabra);
      body.push(<p key={palabra + "_" + i}>{letra}</p>)
    })
    return body
  }

  const dividirLetras = (palabra) => {
    let letras = []
    palabra.split("").forEach( (letra, i) => {
      letras.push(<span key={letra + "_" + i} ref={el => {refs.current.push(el)}}>{letra}</span>)
    })
    return letras;
  }

  return (
    <main ref={container} className="main">
      <div ref={body} className="body">
        {
          dividirPalabras(frase)
        }
      </div>
    </main>
  )
}

export default App
