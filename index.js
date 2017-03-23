'use strict';

const fs = require('fs');
const GROUPS = 4;
const INPUT = 'people.txt';
const OUTPUT = 'groupings.txt';

const start = () => {
	let data = [];
	let batch12 = [];
	let batch13 = [];
	let batch14 = [];
	let batch15 = [];
	let members = [];
	let groupings = [];
	let start = Math.floor(Math.random()*10)%GROUPS;

	fs.readFileSync(INPUT, 'utf8').split('\r\n').forEach((item, index) => {
		let datum = item.split(',');
		data.push({
			'name': datum[0],
			'batch': datum[1]
		});
	});

	for(let i=0; i<GROUPS; i++) {
		groupings.push([]);
	}

	while(data.length) {
		let start = Math.floor(Math.random()*10)%GROUPS;
		let i = start;
		do {
			let datum;
			if(datum = data.pop()) {
				groupings[i].push(datum);
				i = (i + 1)%GROUPS;
			} else {
				break;
			}
		} while(i != start);
	}


	fs.writeFileSync(OUTPUT, '');
	for(let i=0; i<GROUPS; i++) {
		fs.appendFileSync(OUTPUT, i + '\n');
		for(let j=0; j<groupings[i].length; j++) {
			fs.appendFileSync(OUTPUT, '\t' + groupings[i][j].name + '\n');
		}
	}
}

start();