'use strict';

const fs = require('fs');
const GROUPS = 4;
const INPUT = 'people.txt';
const OUTPUT = 'groupings.txt';

const start = () => {
	let data = [];
	let groupings = [[],[],[],[]];

	//get data from file
	fs.readFileSync(INPUT, 'utf8').replace('\r', '').split('\n').forEach((item, index) => {
		let datum = item.split(',');
		data.push({
			'name': datum[0],
			'batch': datum[1]
		});
	});

	//randomizing people to each group
	while(data.length) {
		let start = Math.floor(Math.random()*10)%GROUPS;
		let i = start;

		do {
			let datum = data.pop();
			if(datum) {
				groupings[i].push(datum);
				i = (i + 1)%GROUPS;
			} else {
				break;
			}
		} while(i != start);
	}

	//writing result to file
	fs.writeFileSync(OUTPUT, '');
	for(let i=0; i<GROUPS; i++) {
		fs.appendFileSync(OUTPUT, i + '\n');
		for(let j=0; j<groupings[i].length; j++) {
			fs.appendFileSync(OUTPUT, '\t' + groupings[i][j].name + '\n');
		}
	}

	//prompt for user
	console.log("Done.");
}

start();