import findLocation from './FindLocation';
import Point from '../tool/Point';
import Line from '../tool/Line';
import Polygon from '../tool/Polygon';
import drawMonkeys from '../DrawMonkeys';

var lastPoint;

function onMClick(event, canvas, domains, map, monkeyClass, setRegions, index) {
	let { width, height } = canvas.getBoundingClientRect();
	let c = findLocation(event, canvas);
	c.x = (c.x * 500) / width;
	c.y = (c.y * 900) / height;
	console.log(c);
}

export default onMClick;
