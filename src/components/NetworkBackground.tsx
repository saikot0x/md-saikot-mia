// Subtle network-topology backdrop for the hero: nodes + connecting traces,
// deliberately quiet — a texture, not a centerpiece.
export default function NetworkBackground() {
  const nodes = [
    { x: 60, y: 70 }, { x: 220, y: 40 }, { x: 340, y: 130 },
    { x: 150, y: 190 }, { x: 420, y: 60 }, { x: 480, y: 200 },
    { x: 40, y: 260 }, { x: 300, y: 250 },
  ];
  const links = [
    [0, 1], [1, 2], [2, 4], [0, 3], [3, 7], [2, 5], [4, 5], [3, 6],
  ];

  return (
    <svg
      viewBox="0 0 520 320"
      className="absolute inset-0 h-full w-full opacity-[0.35]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-cyan)"
          strokeOpacity={0.25}
          strokeWidth={1}
          className={i % 3 === 0 ? "dash-flow" : ""}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i % 2 === 0 ? 3.5 : 2.5}
          fill={i % 3 === 0 ? "var(--color-blue)" : "var(--color-cyan)"}
          opacity={0.8}
        />
      ))}
    </svg>
  );
}
