import drawMonkeys from '../DrawMonkeys';
import findLocation from './FindLocation';

var prevLoc;
var xslide = 0,
	yslide = 0;

function onMMove(event, canvas, map, monkeyClass, domains, mDown, regions) {
	let { width, height } = canvas.getBoundingClientRect();
	let c;
	if (event) {
		c = findLocation(event, canvas);
		c.x = (c.x * canvas.width) / width;
		c.y = (c.y * canvas.height) / height;
	}

	let diff;
	if (mDown) {
		if (!prevLoc) prevLoc = { x: c.x, y: c.y };
		else {
			diff = { x: c.x - prevLoc.x, y: c.y - prevLoc.y };
			if (xslide + diff.x < 0 && -(xslide + diff.x) < map.width - canvas.width) xslide += diff.x;
			if (yslide + diff.y < 0 && -(yslide + diff.y) < map.height - canvas.height) yslide += diff.y;
			prevLoc = { x: c.x, y: c.y };
		}
	} else prevLoc = null;

	drawMonkeys(canvas, monkeyClass, map, false, c, { xslide, yslide }, regions);
}

const reset = () => {
	xslide = 0;
	yslide = 0;
	prevLoc = null;
};

const clearPrevLoc = () => {
	prevLoc = null;
};

export { onMMove, reset, clearPrevLoc };
