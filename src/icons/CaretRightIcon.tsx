interface IconProps {
  color?: string;
  label?: string;
}

const CaretRightIcon = ({ color = "#000", label = "Next" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill={color}
    viewBox="0 0 24 24"
    aria-label={label}
  >
    <path d="M9 19l7-7-7-7v14z" />
  </svg>
);

export default CaretRightIcon;
