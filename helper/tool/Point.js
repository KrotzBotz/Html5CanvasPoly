/**
 * @Point
 *
 * @param {coord} coord {x, y} contains coordinates of point
 *
 * @x contains x position of point
 * @y contains y position of point
 *
 * @findDistance (c) finds distance between another point object
 *	c = another point object
 */
function Point(coord) {
	this.x = coord.x;
	this.y = coord.y;
	this.findDistance = (c) => {
		return Math.sqrt(Math.pow(c.x - this.x, 2) + Math.pow(c.y - this.y, 2));
	};
}

export default Point;
