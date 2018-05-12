#!/usr/bin/env node

let fs = require('fs');
let program = require('commander');
let co = require('co');
let prompt = require('co-prompt');

program.version('0.0.1', '-v, --version')
    .arguments('<dir>')
    // .option('-s, --simple-html', 'Simple site with basic html, css (sass), js and images')
    // .option('-wp, --wordpress', 'Basic starting wordpress site (includes full WP install)')
    .action(function(dir){
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		console.log('sites');
		co(function *(){
			var siteType = yield prompt('Type of site: ');
        	console.log(siteType, dir);
			process.stdin.pause();
		})
    })
	.parse(process.argv);