import { createTSUnionType } from '@babel/types';
import Line from './Line';

/**
 * @Polygon
 *
 * @addLine (line) 				adds line object
 * @removeLine (line) 		removes line
 * @draw ()								draws polygon onto canvas
 * @insde	(point,point)		determines if a point is inside this polygon
 * @getPoints ()					gets all points in polygon
 *
 */
function Polygon(arr, name) {
	this.lines = arr;
	this.color = randomColor();
	this.name = name;

	if (arr.length > 2) {
		let p1 = arr[arr.length - 1].c2;
		let p2 = arr[0].c1;
		this.lines.push(new Line(p1, p2));
	}
	this.addLine = (l) => {
		if (this.lines.length > 2) this.lines.pop();
		this.lines.push(l);
		if (this.lines.length >= 2) {
			let p1 = l.c2;
			let p2 = this.lines[0].c1;
			this.lines.push(new Line(p1, p2));
		}
	};
	this.removeLine = () => {
		if (this.lines.length === 0) return;
		if (this.lines.length === 1) {
			this.lines.pop();
		}
		this.lines.pop();
		this.lines.pop();
		if (this.lines.length < 2) return;
		let tmp = new Line(this.lines[this.lines.length - 1].c2, this.lines[0].c1);
		this.lines.push(tmp);
	};
	this.draw = (canvas, xslide = 0, yslide = 0) => {
		if (this.lines.length < 3) return;
		let ctx = canvas.getContext('2d');
		ctx.restore();
		ctx.lineWidth = 2;
		ctx.strokeStyle = getRGBA(this.color, 1);
		ctx.fillStyle = getRGBA(this.color, 0.0);
		let l = this.lines;
		ctx.beginPath();
		ctx.moveTo(l[0].c1.x, l[0].c1.y);
		for (let i = 0; i < this.lines.length - 1; ++i) {
			ctx.lineTo(l[i].c2.x, l[i].c2.y);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(l[0].c1.x, l[0].c1.y, 8, 0, 2 * Math.PI);
		ctx.stroke();

		for (let i = 0; i < this.lines.length - 1; ++i) {
			ctx.beginPath();
			ctx.arc(l[i].c2.x, l[i].c2.y, 8, 0, 2 * Math.PI);
			ctx.stroke();
		}
		let xAvg = 0;
		let yAvg = 0;
		for (let i = 0; i < this.lines.length; ++i) {
			xAvg += this.lines[i].c1.x;
			yAvg += this.lines[i].c1.y;
		}
		xAvg = xAvg / this.lines.length;
		yAvg = yAvg / this.lines.length;

		ctx.font = '15pt Calibri';
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.strokeText(this.name, xAvg - ctx.measureText(this.name).width / 2, yAvg);
	};
	//ctx.arc(l[0].c1.x, l[0].c1.y, 20, 0, 2 * Math.PI);
	this.inside = (ref, oob) => {
		const refLine = new Line(ref, oob);
		let numIntercepts = 0;
		for (let i = 0; i < this.lines.length; ++i) {
			let line = this.lines[i];
			if (line.intersects(refLine)) ++numIntercepts;
		}
		if (numIntercepts % 2 === 1) return true;
		else return false;
	};
	this.getPoints = () => {
		let lines = this.lines;
		let tmpArr = [];

		if (lines.length === 0) return [];
		tmpArr.push(lines[0].c1);
		tmpArr.push(lines[0].c2);
		for (let i = 1; i < lines.length - 1; ++i) {
			tmpArr.push(lines[i].c2);
		}
		return tmpArr;
	};
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
//const rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
const randomColor = () => {
	return { r: randomBetween(0, 255), g: randomBetween(0, 255), b: randomBetween(0, 255) };
};

const getRGBA = ({ r, g, b }, opacity) => {
	return `rgba(${r},${g},${b},${opacity})`;
};

export default Polygon;
