"use client";

import { useId } from "react";

interface HexagonPatternProps {
  radius?: number;
  gap?: number;
  x?: number;
  y?: number;
  direction?: "horizontal" | "vertical";
  hexagons?: Array<[number, number]>;
  strokeDasharray?: string;
  className?: string;
  [key: string]: unknown;
}

export function HexagonPattern({
  radius = 40,
  gap = 0,
  x = -1,
  y = -1,
  direction = "horizontal",
  hexagons,
  strokeDasharray = "0",
  className,
  ...props
}: HexagonPatternProps) {
  const id = useId();

  // Helper values for hexagon math - rounded for hydration consistency
  const sq3 = Number(Math.sqrt(3).toFixed(3));
  const w = Number((direction === "horizontal" ? 2 * radius : sq3 * radius).toFixed(3));
  const h = Number((direction === "horizontal" ? sq3 * radius : 2 * radius).toFixed(3));

  // Spacing between centers
  const dx = Number((direction === "horizontal" ? (3 / 2) * radius + gap : w + gap).toFixed(3));
  const dy = Number((direction === "horizontal" ? h + gap : (3 / 2) * radius + gap).toFixed(3));

  // Path for a single hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = direction === "horizontal" ? 60 * i : 60 * i + 30;
    const angleRad = (Math.PI / 180) * angleDeg;
    const px = Number((radius + radius * Math.cos(angleRad)).toFixed(3));
    const py = Number((radius + radius * Math.sin(angleRad)).toFixed(3));
    points.push(`${px},${py}`);
  }
  const hexPath = `M ${points.join(" L ")} Z`;

  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      className={className}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={dx}
          height={dy}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={hexPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {hexagons && (
        <svg x={x} y={y} className="overflow-visible">
          {hexagons.map(([col, row]) => {
            const cx =
              direction === "horizontal"
                ? col * dx
                : col * dx + (row % 2 === 1 ? dx / 2 : 0);
            const cy =
              direction === "horizontal"
                ? row * dy + (col % 2 === 1 ? dy / 2 : 0)
                : row * dy;

            return (
              <path
                key={`${col}-${row}`}
                d={hexPath}
                x={cx}
                y={cy}
                className="fill-current"
              />
            );
          })}
        </svg>
      )}
    </svg>
  );
}
