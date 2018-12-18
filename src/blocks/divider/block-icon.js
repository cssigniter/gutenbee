const DividerBlockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g>
      <path d="M0,0V6H20V0ZM18,4H2V0H18Z" style={{ fill: '#333' }} />
      <rect x="2" width="16" height="4" style={{ fill: '#fc0' }} />
      <path d="M20,20V14H0v6ZM2,16H18v4H2Z" style={{ fill: '#333' }} />
      <rect
        x="2"
        y="16"
        width="16"
        height="4"
        transform="translate(20 36) rotate(180)"
        style={{ fill: '#fc0' }}
      />
      <rect y="9" width="20" height="2" style={{ fill: '#333' }} />
    </g>
  </svg>
);

export default DividerBlockIcon;
