import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState, useRef } from "react";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    headingref.current.addEventListener("click", () => {
      setShowCanvas(!showCanvas);
    });

    // Listen for click events anywhere on the page
    const handleClick = () => {
      if(document.body.style.backgroundColor == 'black'){
        document.body.style.backgroundColor='red';
      }
      else{
        document.body.style.backgroundColor="black";
      }; // Change background color to red
    };

    // Attach the click event listener
    document.body.addEventListener('click', handleClick);
    
    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [showCanvas]);

  return (
    <>
      <div className="w-full relative min-h-screen bg-#fd2c2a text-white font-['Helvetica_Now_Display']">
        {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
        <div className="w-full z-[1] h-screen relative">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-bold">Thirtysixstudios</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a key={index} href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300">
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[40%]">
              <h3 className="text-3xl leading-[1]">
                At Thirtysixstudio, we build immersive digital experiences for brands with a purpose
              </h3>
              <p className="text-md w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are passionate about creating digital experiences that are both beautiful and functional
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>
          <div className="overflow-x-hidden w-full relative"></div>
          <div className="w-full absolute bottom-0 left-0 top-50px">
            <h1 ref={headingref}
              className="text-[16rem] font-normal pl-[60px] tracking-tight leading-none">
              thirtysixstudios
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full h-screen relative text-white mt-32 px-10">
        {data[1].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
        <div className="relative z-[1]">
          <h1 className="text-8xl">about the brand</h1>
          <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam similique dolorem excepturi eius, ea corporis ipsum mollitia asperiores id odit eos illum? Unde consequatur ullam, incidunt commodi sequi veritatis voluptatibus voluptates voluptate minima sapiente suscipit neque et nostrum exercitationem molestiae eius voluptas! Officia id, fugit quis ullam impedit magnam libero.
          </p>
          <img className="w-[80%] relative m-10" src="https://www.bestcss.in/application/upload/WebsitePhoto/6614-creativstudio.jpg" alt=""></img>
        </div>
      </div>
    </>
  );
}

export default App;
