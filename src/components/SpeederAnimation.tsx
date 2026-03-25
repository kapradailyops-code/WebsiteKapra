import React from "react";
import { motion } from "framer-motion";

export function SpeederAnimation() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .speeder-wrapper {
          position: relative;
          width: 200px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scaleX(-1) scale(0.6);
          transform-origin: center right;
        }

        .speeder-loader {
          position: relative;
          animation: speeder 0.4s linear infinite;
          z-index: 10;
        }

        .speeder-loader > span {
          height: 5px;
          width: 35px;
          background: #fff;
          position: absolute;
          top: -19px;
          left: 60px;
          border-radius: 2px 10px 1px 0;
        }

        .speeder-base span {
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid #fff;
          border-bottom: 6px solid transparent;
        }

        .speeder-base span:before {
          content: "";
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          right: -110px;
          top: -16px;
        }

        .speeder-base span:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-right: 55px solid #fff;
          border-bottom: 16px solid transparent;
          top: -16px;
          right: -98px;
        }

        .speeder-face {
          position: absolute;
          height: 12px;
          width: 20px;
          background: #fff;
          border-radius: 20px 20px 0 0;
          transform: rotate(-40deg);
          right: -125px;
          top: -15px;
        }

        .speeder-face:after {
          content: "";
          height: 12px;
          width: 12px;
          background: #fff;
          right: 4px;
          top: 7px;
          position: absolute;
          transform: rotate(40deg);
          transform-origin: 50% 50%;
          border-radius: 0 0 0 2px;
        }

        .speeder-loader > span > span:nth-child(1),
        .speeder-loader > span > span:nth-child(2),
        .speeder-loader > span > span:nth-child(3),
        .speeder-loader > span > span:nth-child(4) {
          width: 30px;
          height: 1px;
          background: #fff;
          position: absolute;
          animation: fazer1 0.2s linear infinite;
        }

        .speeder-loader > span > span:nth-child(2) {
          top: 3px;
          animation: fazer2 0.4s linear infinite;
        }

        .speeder-loader > span > span:nth-child(3) {
          top: 1px;
          animation: fazer3 0.4s linear infinite;
          animation-delay: -1s;
        }

        .speeder-loader > span > span:nth-child(4) {
          top: 4px;
          animation: fazer4 1s linear infinite;
          animation-delay: -1s;
        }

        @keyframes fazer1 {
          0% { left: 0; }
          100% { left: -80px; opacity: 0; }
        }
        @keyframes fazer2 {
          0% { left: 0; }
          100% { left: -100px; opacity: 0; }
        }
        @keyframes fazer3 {
          0% { left: 0; }
          100% { left: -50px; opacity: 0; }
        }
        @keyframes fazer4 {
          0% { left: 0; }
          100% { left: -150px; opacity: 0; }
        }

        @keyframes speeder {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -3px) rotate(-1deg); }
          20% { transform: translate(-2px, 0px) rotate(1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 3px) rotate(-1deg); }
          60% { transform: translate(-1px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-2px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        .speeder-longfazers {
          position: absolute;
          width: 400px;
          height: 100px;
          overflow: hidden;
          pointer-events: none;
          left: -200px;
        }

        .speeder-longfazers span {
          position: absolute;
          height: 2px;
          width: 20%;
          background: #fff;
          opacity: 0.2;
        }

        .speeder-longfazers span:nth-child(1) {
          top: 20%;
          animation: lf 0.6s linear infinite;
          animation-delay: -5s;
        }

        .speeder-longfazers span:nth-child(2) {
          top: 40%;
          animation: lf2 0.8s linear infinite;
          animation-delay: -1s;
        }

        .speeder-longfazers span:nth-child(3) {
          top: 60%;
          animation: lf3 0.6s linear infinite;
        }

        .speeder-longfazers span:nth-child(4) {
          top: 80%;
          animation: lf4 0.5s linear infinite;
          animation-delay: -3s;
        }

        @keyframes lf { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf2 { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf3 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }
        @keyframes lf4 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }
      `}} />
      <div className="speeder-wrapper">
        <div className="speeder-longfazers">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="speeder-loader">
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="speeder-base">
            <span></span>
            <div className="speeder-face"></div>
          </div>
        </div>
      </div>
    </>
  );
}
