interface IconProps {
  color?: string;
  label?: string;
}

const CaretLeftIcon = ({ color = "#000", label = "Previous" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill={color}
    viewBox="0 0 24 24"
    aria-label={label}
  >
    <path d="M15 19l-7-7 7-7v14z" />
  </svg>
);

export default CaretLeftIcon;
