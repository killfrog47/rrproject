#!/usr/bin/env node

let fs = require('fs');
let program = require('commander');
let inquirer = require('inquirer');
let colors = require('colors');
let ncp = require('ncp').ncp;
let pathToPackage = require("global-modules-path").getPath('rrproject');
let pjson = require('../package.json');

program.version(pjson.version, '-v, --version')
    .arguments('<dir>')
    // .option('-s, --simple-html', 'Simple site with basic html, css (sass), js and images')
    // .option('-wp, --wordpress', 'Basic starting wordpress site (includes full WP install)')
    .action(function(dir){
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
			inquirer.prompt([
				{
					type: 'list',
					name: 'siteType',
					message: 'What type of site are you building?',
					choices: ['Small Site']
				}
			]).then(answers => {
				var selectedDir;
				switch(answers.siteType){
					case 'Small Site':
						selectedDir = 'small-site';
						break;
					default:
						selectedDir = 'small-site';
				}
				ncp.limit = 16;
				ncp(pathToPackage + '\\lib\\' + selectedDir, dir, function (err) {
					if (err) {
						return console.error(colors.red(err));
					}
					console.log(colors.green(answers.siteType + ' has been created in directory: ' + dir));
				});
			});
		}else{
			fs.readdir(dir, function(err, files) {
				if (!files.length) {
					inquirer.prompt([
						{
							type: 'confirm',
							name: 'useExistingDir',
							message: 'The directory already exists but is empty. Do you want to use this directory?',
							default: false
						}
					]).then(answers => {
						if(answers.useExistingDir){
							inquirer.prompt([
								{
									type: 'list',
									name: 'siteType',
									message: 'What type of site are you building?',
									choices: ['Small Site']
								}
							]).then(answers => {
								var selectedDir;
								switch(answers.siteType){
									case 'Small Site':
										selectedDir = 'small-site';
										break;
									default:
										selectedDir = 'small-site';
								}
								ncp.limit = 16;
								ncp(pathToPackage + '\\lib\\' + selectedDir, dir, function (err) {
									if (err) {
										return console.error(colors.red(err));
									}
									console.log(colors.green(answers.siteType + ' has been created in directory: ' + dir));
								});
							});

						}
					});
				}else{
					console.error(colors.red('Folder not empty! Please empty the directory or use a different name.'));
				}
			});
		}

    })
	.parse(process.argv);