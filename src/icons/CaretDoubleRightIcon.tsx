interface IconProps {
  color?: string;
}

const CaretDoubleRightIcon = ({ color = "#000" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill={color}
    viewBox="0 0 24 24"
  >
    <path d="M7 19l7-7-7-7v14zm5 0l7-7-7-7v14z" />
  </svg>
);

export default CaretDoubleRightIcon;
