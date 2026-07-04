

export const IsoHouse = ({ x, y, color = '#6EE7B7' }: { x: number, y: number, color?: string }) => {
  let top, left, right;
  if (color === '#6EE7B7') { // Mint
    top = '#A7F3D0'; left = '#34D399'; right = '#059669';
  } else if (color === '#F97316') { // Orange
    top = '#FDBA74'; left = '#F97316'; right = '#C2410C';
  } else if (color === '#60A5FA') { // Blue
    top = '#93C5FD'; left = '#60A5FA'; right = '#2563EB';
  } else {
    top = '#E5E7EB'; left = '#9CA3AF'; right = '#4B5563';
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Left Face */}
      <polygon points="0,20 20,30 20,10 0,0" fill={left} />
      {/* Right Face */}
      <polygon points="20,30 40,20 40,0 20,10" fill={right} />
      {/* Top Face */}
      <polygon points="0,0 20,10 40,0 20,-10" fill={top} />
    </g>
  );
};

export const IsoTree = ({ x, y }: { x: number, y: number }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Trunk */}
      <polygon points="17,25 23,25 23,32 17,32" fill="#78350F" />
      {/* Cone/Leaves */}
      <polygon points="20,0 35,26 5,26" fill="#166534" />
      {/* Shading on the right half of the cone for a low-poly 3D feel */}
      <polygon points="20,0 35,26 20,26" fill="#14532D" opacity="0.5" />
    </g>
  );
};
