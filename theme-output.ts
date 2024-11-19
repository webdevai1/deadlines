type Theme = {
  bg: string;
  border: string;
  muted: string;
  primary: string;
  primaryLight: string;
  textAccent: string;
  textMuted: string;
  textPrimary: string;
};

function t(a: [number, number][]) {
  let res: Record<string, string> = {};
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string;
  }
  return res as Theme;
}
const vs = [
  "#ffffff",
  "#d5d5d5",
  "#757575",
  "#7c38d8",
  "#f6ebff",
  "#2D2D2D",
  "#000000",
];

const ks = [
  "bg",
  "border",
  "muted",
  "primary",
  "primaryLight",
  "textAccent",
  "textMuted",
  "textPrimary",
];

const n1 = t([
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 2],
  [7, 6],
]);

export const light = n1;
