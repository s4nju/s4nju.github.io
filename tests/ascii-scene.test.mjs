import assert from "node:assert/strict";
import test from "node:test";
import {
	createLandscape,
	DINO_SCALE,
	renderDinosaur,
	renderSky,
	sceneryOffset,
	SCENE_ROWS,
	SCENERY_SPEEDS,
	TILE_COLUMNS,
} from "../src/utils/asciiScene.ts";

test("landscape layers repeat exactly, including terrain at every wrap", () => {
	for (const layer of Object.values(createLandscape())) {
		const rows = layer.split("\n");
		assert.equal(rows.length, SCENE_ROWS);
		assert.match(layer, /^[\x20-\x7E\n]+$/);
		for (const row of rows) {
			assert.equal(row.length, TILE_COLUMNS * 3);
			assert.equal(row.slice(0, TILE_COLUMNS), row.slice(TILE_COLUMNS, TILE_COLUMNS * 2));
			assert.equal(row.slice(0, TILE_COLUMNS), row.slice(TILE_COLUMNS * 2));
		}
	}
});

test("scenery travels at fractional pixel speeds and wraps to the identical tile", () => {
	const tileWidth = TILE_COLUMNS * 5.1;
	for (const speed of Object.values(SCENERY_SPEEDS)) {
		const before = sceneryOffset(1, speed, tileWidth);
		const after = sceneryOffset(1 + 1 / 60, speed, tileWidth);
		assert.ok(Math.abs(after - before + speed / 60) < 1e-10);
		assert.ok(Math.abs(sceneryOffset(1 + tileWidth / speed, speed, tileWidth) - before) < 1e-10);
	}
});

test("the smaller dinosaur retains its body and alternates its footsteps", () => {
	assert.equal(DINO_SCALE, 0.6);
	const a = renderDinosaur(0).split("\n");
	const b = renderDinosaur(0.32).split("\n");
	assert.equal(a.length, 15);
	assert.ok(a.every((row) => row.length === 18));
	assert.deepEqual(a.slice(0, 12), b.slice(0, 12));
	assert.notDeepEqual(a.slice(12), b.slice(12));
	assert.equal(renderDinosaur(0), renderDinosaur(0.64));
});

test("the still sky stays bounded across mobile and desktop widths", () => {
	for (const columns of [40, 67, 140, 200]) {
		const sky = renderSky(columns);
		assert.equal(sky.split("\n").length, SCENE_ROWS);
		assert.ok(sky.split("\n").every((row) => row.length === columns));
		assert.match(sky, /^[\x20-\x7E\n]+$/);
	}
});
