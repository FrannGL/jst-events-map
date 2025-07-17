import type { SVGProps } from "react";

const SvgIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    viewBox="0 0 48 48"
    {...props}
  >
    <g id="Layer_2" data-name="Layer 2">
      <path
        id="invisible_box"
        fill="none"
        d="M0 0h48v48H0z"
        data-name="invisible box"
      />
      <path
        id="icons_Q2"
        d="M24 2C14.1 2 7 10.1 7 20s11.5 21.3 15.6 25.4a1.9 1.9 0 0 0 2.8 0C29.5 41.3 41 30.1 41 20S33.9 2 24 2m0 22a7 7 0 1 1 7-7 7 7 0 0 1-7 7"
        data-name="icons Q2"
        stroke="black" // borde
        strokeWidth={1.5} // grosor del borde
      />
    </g>
  </svg>
);

export default SvgIcon;
