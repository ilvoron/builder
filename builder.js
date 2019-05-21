"use strict";

/*-----------*/
/* Constants */
/*-----------*/

const path = require("path");      // This is Node.js
const fs   = require("fs");        // This is Node.js
const log  = require("fancy-log"); // https://github.com/gulpjs/fancy-log
const exec = require("exec-sh");   // https://github.com/tsertkov/exec-sh
const del  = require("del");       // https://github.com/sindresorhus/del

const spaceCode           = "&nbsp;";
const relativePathSymbols = ["..", "\\", "/"];

/*-------------------*/
/* Building Projects */
/*-------------------*/

let destDir = "/_dest";
let projects = [];

function deleteSpacesStart(str) {
	try {
		while (str.indexOf(" ") == 0) {
			str = str.replace(" ", "");
		}
	} catch(err) { log(err); }
	return str;
}

function convertSpaces(str) {
	try {
		while (str.indexOf(" ") >= 0) {
			str = str.replace(" ", spaceCode);
		}
	} catch(err) { log(err); }
	return str;
}

function getFullPath(str, params) {
	let isRelative = false;
	str = deleteSpacesStart(str);
	try {
		for (var ind = 0; ind < relativePathSymbols.length; ind++) {
			if (str.indexOf(relativePathSymbols[ind]) == 0) {
				isRelative = true;
			}
		}
		if (isRelative) {
			if (params.isDestDir || params.isProjectDir) {
				str = path.join(process.cwd(), str);
			}
			if (params.isProjectDestDir) {
				str = path.join(destDir, str);
			}
		}
	} catch(err) { log(err); }
	return str;
}

try {
	if (fs.existsSync("preferences.json")) {
		let rawData = fs.readFileSync("preferences.json");
		let data = JSON.parse(rawData);
		destDir = getFullPath(data.destDir, {isDestDir: true});
		let excArr = data.projects;
		for (var ind = 0; ind < excArr.length; ind++) {
			let tmpObj = {};
			tmpObj.projectDir = getFullPath(excArr[ind].projectDir, {isProjectDir: true});
			tmpObj.destDir = getFullPath(excArr[ind].destDir, {isProjectDestDir: true});
			if ((tmpObj.projectDir.length > 0) && (tmpObj.destDir.length > 0)) {
				projects.push(tmpObj);
			}
		}
	}
} catch(err) { log(err); }

try {
	log("Clearing \"" + destDir + "\"...");
	del.sync(destDir);
	for (var ind = 0; ind < projects.length; ind++) {
		log("Start building \"" + projects[ind].projectDir + "\"...")
		exec("gulp build --customDest \"" + convertSpaces(projects[ind].destDir) + "\"", {
			cwd: projects[ind].projectDir
		}, (err, stdout, stderr) => {
			if (err) {
				log(err);
			}
		})
	}
} catch(err) { log(err); }