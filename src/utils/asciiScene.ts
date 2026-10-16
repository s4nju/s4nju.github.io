export const SCENE_ROWS = 20;
export const TILE_COLUMNS = 192;
export const DINO_SCALE = 0.6;
export const SCENERY_SPEEDS = { background: 4, foreground: 10, ground: 24 } as const;

const DINO_BODY = [
	"          .+++++++",
	"          ++.+++++",
	"          ++++++++",
	"          ++++    ",
	"          ++++++  ",
	" +       +++++    ",
	" ++    +++++++    ",
	" +++  ++++++++++  ",
	"  +++++++++++ +   ",
	"   ++++++++++     ",
	"    ++++++++      ",
	"     ++++++       ",
];
const LEGS = [
	["     +++ ++       ", "     ++   ++      ", "     +     +      "],
	["     +++ ++       ", "      ++ ++       ", "         +        "],
	["     ++ +++       ", "    ++   ++       ", "    +     +       "],
	["     ++ +++       ", "     ++ ++        ", "     +            "],
] as const;

type Grid = string[][];
type Ridge = readonly (readonly [number, number])[];
const FAR_RIDGE: Ridge = [
	[0, 12],
	[18, 6],
	[38, 10],
	[60, 9],
	[86, 14],
	[108, 6.5],
	[132, 9],
	[152, 5.5],
	[174, 11],
	[192, 12],
];
const NEAR_RIDGE: Ridge = [
	[0, 15],
	[12, 12],
	[40, 5.5],
	[66, 14.5],
	[84, 16],
	[104, 11.5],
	[128, 15.5],
	[152, 15],
	[172, 13],
	[192, 15],
];

const grid = (columns: number): Grid =>
	Array.from({ length: SCENE_ROWS }, () => Array<string>(columns).fill(" "));
const text = (cells: Grid, copies = 1) =>
	cells.map((row) => row.join("").repeat(copies)).join("\n");
function put(cells: Grid, x: number, y: number, character: string) {
	const row = cells[y];
	if (row && x >= 0 && x < row.length) row[x] = character;
}

/** Cosine easing joins the hand-shaped ridges with level, seamless endpoints. */
function ridgeHeight(x: number, points: Ridge) {
	for (let i = 1; i < points.length; i++) {
		const left = points[i - 1];
		const right = points[i];
		if (!left || !right || x > right[0]) continue;
		const mix = (1 - Math.cos(((x - left[0]) / (right[0] - left[0])) * Math.PI)) / 2;
		return left[1] + (right[1] - left[1]) * mix;
	}
	return 12;
}

/** Generate the landscape once. Repeated tiles scroll as whole, unchanging text. */
export function createLandscape() {
	const background = grid(TILE_COLUMNS);
	const foreground = grid(TILE_COLUMNS);
	const ground = grid(TILE_COLUMNS);
	for (let x = 0; x < TILE_COLUMNS; x++) {
		const far = Math.round(ridgeHeight(x, FAR_RIDGE));
		const near = Math.round(ridgeHeight(x, NEAR_RIDGE));
		put(background, x, far, x % 2 === 0 ? ":" : ".");
		if (x % 3 === 0) put(background, x, far + 1, ".");
		if (x % 2 === 0) put(foreground, x, near, ":");
		if (x % 3 === 1) put(foreground, x, near + 1, ".");
		if (x % 2 === 0) put(ground, x, 18, ".");
		if (x % 13 === 3 || x % 29 === 9) put(ground, x, 19, ".");
	}
	const pine = ["   +   ", "  .+.  ", " .+++. ", "..+|+..", "  .|.  "];
	const tallPine = ["   +   ", "  .+.  ", "  +++  ", " .+|+. ", ".++|++.", "  .|.  ", "   |   "];
	for (const position of [7, 18, 133, 143, 178]) {
		const tree = position === 7 || position === 143 ? tallPine : pine;
		const top = tree === tallPine ? 12 : 13;
		tree.forEach((row, y) => {
			for (let x = 0; x < row.length; x++) {
				if (row.charAt(x) !== " ") put(ground, position + x, top + y, row.charAt(x));
			}
		});
	}
	return {
		background: text(background, 3),
		foreground: text(foreground, 3),
		ground: text(ground, 3),
	};
}

/** Star positions stay fixed; a few selected stars can fade independently. */
export function renderSky(columns: number, group: "all" | "steady" | "a" | "b" = "all") {
	const width = Math.max(40, Math.floor(columns));
	const sky = grid(width);
	const stars = [
		[0.02, 5],
		[0.06, 2],
		[0.1, 7],
		[0.15, 1],
		[0.19, 4],
		[0.24, 2],
		[0.29, 6],
		[0.33, 1],
		[0.37, 4],
		[0.42, 2],
		[0.46, 6],
		[0.51, 1],
		[0.55, 4],
		[0.59, 2],
		[0.64, 5],
		[0.68, 1],
		[0.72, 3],
		[0.77, 6],
		[0.83, 4],
		[0.88, 2],
		[0.92, 5],
		[0.97, 1],
	] as const;
	stars.forEach(([x, y], index) => {
		const starGroup = index % 7 === 0 ? (index % 14 === 0 ? "a" : "b") : "steady";
		if (group === "all" || group === starGroup) {
			put(sky, Math.floor(x * (width - 1)), y, ".");
		}
	});
	return text(sky);
}

export function renderDinosaur(seconds: number) {
	const frame = Math.floor(seconds / 0.16) % LEGS.length;
	return [...DINO_BODY, ...(LEGS[frame] ?? LEGS[0])].map((row) => row.padEnd(18, " ")).join("\n");
}

/** Fractional pixels keep motion smooth; identical tiles make the wrap invisible. */
export function sceneryOffset(seconds: number, speed: number, tileWidth: number) {
	return -((seconds * speed) % tileWidth);
}
