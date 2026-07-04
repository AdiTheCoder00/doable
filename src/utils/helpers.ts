export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c)
  );
}

export function getBuildingsForCount(n: number): string[] {
  const stages: { min: number; icons: string[] }[] = [
    { min: 0, icons: [] },
    { min: 1, icons: ['\u{1F331}'] },
    { min: 2, icons: ['\u{1F331}', '\u{1F333}'] },
    { min: 4, icons: ['\u{1F333}', '\u{1F333}', '\u{1F3E0}'] },
    { min: 7, icons: ['\u{1F333}', '\u{1F3E0}', '\u{1F3E0}', '\u{1F333}', '\u{1F3E0}'] },
    { min: 11, icons: ['\u{1F3F0}', '\u{1F3E0}', '\u{1F3E0}', '\u{1F333}', '\u{1F3E0}', '\u{1F333}'] },
  ];
  let stage = stages[0];
  for (const s of stages) if (n >= s.min) stage = s;
  return stage.icons;
}

const BUILDING_POSITIONS = [
  [10, 60], [70, 70], [130, 50], [180, 75], [40, 20], [150, 15],
];

export function getBuildingPositions(count: number): { icon: string; left: number; bottom: number }[] {
  const icons = getBuildingsForCount(count);
  return icons.map((icon, i) => {
    const pos = BUILDING_POSITIONS[i % BUILDING_POSITIONS.length];
    return { icon, left: pos[0], bottom: pos[1] };
  });
}
