import React from "react";
import { ImLinkedin2 } from "react-icons/im";
import { FaGithubSquare } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-teal-700">
      <div>
        <div className="flex justify-center items-center flex-col text-white text-2xl py-5">
          <div className="mx-5">Contact at</div>
          <a href="mailto:cujba.tiberiu@gmail.com">cujba.tiberiu@gmail.com</a>
        </div>
        <div className="flex justify-center text-white text-3xl py-5">
          <a
            href="https://www.linkedin.com/in/tiberiu-stefan-cujba/"
            className="mx-5 hover:-translate-x-1 ease-in-out duration-500"
          >
            <ImLinkedin2 />
          </a>

          <a
            href="https://github.com/CujbaTiberiu"
            className="mx-5 hover:-translate-y-1 ease-in-out duration-500"
          >
            <FaGithubSquare />
          </a>
          <a
            href="https://cujbatiberiu-webdev-portfolio.netlify.app/"
            className="mx-5 hover:translate-x-1 ease-in-out duration-500"
          >
            <RiPagesLine />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
