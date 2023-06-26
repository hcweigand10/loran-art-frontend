import React, { 
  // useRef, 
  // RefObject, 
  // useState 
} from "react";

const Hero = () => {
  // const ref = useRef<HTMLIFrameElement>(null);
  // const [height, setHeight] = useState("0px");
  // const onLoad = () => {
  //   console.log((ref.current?.clientWidth || 560) / 1.78);
  //   setHeight((ref.current?.clientWidth || 560) / 1.78 + "px");
  // };

  return (
    <div>
      <div className="mt-8 mb-3">
        <div className="">
          <h2 className="text-xl md:text-3xl font-light">
            Colorful, whimsical creations, using tin cans, bottle caps and found
            objects
          </h2>
          <h5 className="text-neutral-400 font-light my-2">
            Watch an old video of Loran{" "}
            <a
              href="https://www.youtube.com/watch?v=fFLbgxJUH-o"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              here
            </a>
          </h5>
        </div>
        {/* <div className="mx-auto flex justify-center">
          <iframe
            ref={ref}
            onLoad={onLoad}
            width="80%"
            height={height}
            src="https://www.youtube.com/embed/fFLbgxJUH-o"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
