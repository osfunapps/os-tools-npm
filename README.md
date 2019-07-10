Introduction
------------

this module contains fundamental scripts (like fileHandler) to implement in an npm project.

## Installation
Install via npm:
    
    npm i os-tools


## Usage       
Require tools:
        
    var tools = require("os-tools")

## Functions and signatures:

        /**
         * will save a json into a file
         * @param jsonObj
         * @param filePath
         * @returns {Promise<void>}
         * @constructor
         */
        JSONObjectToFile: async function (jsonObj, filePath) {
    
            // stringify JSON Object
            const jsonContent = JSON.stringify(jsonObj);
            console.log(jsonContent);
    
            fs.writeFile(filePath, jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
    
                console.log("JSON file has been saved.");
            });
        },
    
        /**
         * will save text into a file
         * @param text -> the text to save
         * @param filePath -> the path to the file
         * @returns {Promise<void>}
         * @constructor
         */
        textToFile: function (text, filePath) {
    
            console.log("saving text");
            const parentDir = self.getParentDir(filePath)
            self.createDir(parentDir)
            fs.writeFileSync(filePath, text);
            console.log("done!")
        },
    
    
    
        /**
         * will read a file to string
         */
        readFileToString: async function (filePath) {
            const fs = require('fs');
            return fs.readFileSync(filePath, 'utf8');
        },
    
        /**
         * will create a directory (if not exists)
         */
        createDir: function (dirPath) {
            const fs = require('fs');
            if (!self.isFileExists(dirPath)){
                fs.mkdirSync(dirPath);
            }
        },
    
        /**
         * will return the path to the parent of a file
         */
        getParentDir: function (filePath) {
            var path = require('path');
            return path.dirname(filePath);
        },
    
        /**
         * will read a file to json
         */
        readFileToJSON: async function (filePath) {
            const fs = require('fs');
            const ff = await self.readFileToString(filePath)
            return JSON.parse(ff);
        },
    
    
    
        /**
         * is file (or directory) exists
         */
        isFileExists: function (filePath) {
            try {
                return fs.existsSync(filePath);
    
            } catch(err) {
                return false
            }
        },
    
        /**
         * will wait a given time
         */
        delay: function (timeout) {
            return new Promise((resolve) => {
                setTimeout(resolve, timeout);
            });
        },
    
        /**
         * will remove everything except numbers from a given string
         */
        onlyNumericFromStr: function (str) {
            return str.replace(/\D+/g, '');
        },
    
        /**
         * will remove everything except alpha from a given string
         */
        onlyAlphaFromStr: function (str) {
            return str.replace('[\\p{Alnum},\\s#\\-.]');
        },
    
        /**
         * will remove a file from a directory
         */
        removeFile: function (filePath) {
            try {
                fs.unlinkSync(filePath);
            } catch (e) {
                //if no file exist, no problem
            }
        },
    
        
        /**
         * will prompt the user with a question and return the answer
         * @param question
         */
        promptUser: function (question) {
            return new Promise((resolve, reject) => {
                const {stdin, stdout} = process;
    
                stdin.resume();
                stdout.write(question + "\n");
    
                stdin.on('data', data => resolve(data.toString().trim()));
                stdin.on('error', err => reject(err));
            })
        },
        
And more...


## Links
[GitHub - osapps](https://github.com/osfunapps)

## Licence
ISC