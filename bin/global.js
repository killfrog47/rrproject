#!/usr/bin/env node

let fs = require('fs');
let program = require('commander');
let inquirer = require('inquirer');
let colors = require('colors');

program.version('0.0.1', '-v, --version')
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
					choices: ['Small Site'],
					when: function(answers) {
						return answers.comments !== 'Nope, all good!';
					}
				}
			]).then(answers => {
				console.log(answers.siteType);
				// TODO: copy to dir
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
							// TODO: copy to dir
						}
					});
				}else{
					console.error(colors.red('Folder not empty! Please empty the directory or use a different name.'));
				}
			});
		}

    })
	.parse(process.argv);