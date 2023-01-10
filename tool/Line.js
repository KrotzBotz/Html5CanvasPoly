/**
 * @LINE
 *
 * @param {c1,c2} c1 c2 both point objects
 *
 * @c1 point 1
 * @c2 point 2
 * @slope slope of line
 * @b y offset
 *
 * @intersects (Line) returns boolean
 * finds if another line intersects
 *
 * @findIntersect (Line) returns {x:number, y:number, seg1:boolean, seg2:boolean}
 * finds point of intersection
 */

function Line(c1, c2) {
	if (c1.x === c2.x) {
		this.verticle = true;
	}
	if (c1.y === c2.y) {
		this.horizontal = true;
	}
	if (this.verticle && this.horizontal) {
		return null;
	}
	this.c1 = c1;
	this.c2 = c2;
	if (!(this.horizontal || this.verticle)) this.slope = findSlope(c1, c2);
	this.b = findB(c1, this.slope);

	this.intersects = (line) => {
		let a = this.c1.x;
		let b = this.c1.y;
		let c = this.c2.x;
		let d = this.c2.y;
		let p = line.c1.x;
		let q = line.c1.y;
		let r = line.c2.x;
		let s = line.c2.y;
		var det, gamma, lambda;
		det = (c - a) * (s - q) - (r - p) * (d - b);
		if (det === 0) {
			return false;
		} else {
			lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
			gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
			return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
		}
	};

	this.findIntersect = (line) => {
		let x1 = this.c1.x;
		let y1 = this.c1.y;
		let x2 = this.c2.x;
		let y2 = this.c2.y;
		let x3 = line.c1.x;
		let y3 = line.c1.y;
		let x4 = line.c2.x;
		let y4 = line.c2.y;
		var ua,
			ub,
			denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
		if (denom == 0) {
			return null;
		}
		ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
		ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
		return {
			x: x1 + ua * (x2 - x1),
			y: y1 + ua * (y2 - y1),
			seg1: ua >= 0 && ua <= 1,
			seg2: ub >= 0 && ub <= 1,
		};
	};
}

/*












*/

const inRange = (line1, line2, int) => {
	return (
		inbetween(line1.c1.x, line1.c2.x, int.x) &&
		inbetween(line2.c1.x, line2.c2.x, int.x) &&
		inbetween(line1.c1.y, line1.c2.y, int.y) &&
		inbetween(line2.c1.y, line2.c2.y, int.y)
	);
};

const inbetween = (p1, p2, t) => {
	let min, max;
	if (p1 > p2) {
		max = p1;
		min = p2;
	} else {
		max = p2;
		min = p1;
	}
	return min < t && t < max;
};

const findSlope = (c1, c2) => {
	if (c1.x === c2.x) return false;
	return (c1.y - c2.y) / (c1.x - c2.x);
};
const findB = (coords, slope) => {
	return coords.y - slope * coords.x;
};

export default Line;
