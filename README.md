Introduction
------------

this module contains fundamental generic methods to implement in an npm project.

## Installation
Install via npm:
    
    npm i os-tools


## Usage       
Require tools:
        
    var tools = require("os-tools")

## Functions and signatures:
    
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
    
    
        /**
         * will return today's date
         * @param numbersSeparator -> the separator to use between the numbers
         */
        getTodaysDate: function (numbersSeparator) {
            const dateObj = new Date();
            const year = dateObj.getUTCFullYear().toString().substring(2);
            const month = dateObj.getUTCMonth() + 1;
            const day = dateObj.getUTCDate();
            return day + numbersSeparator + month + numbersSeparator + year
        }
        
And more...


## Links
[GitHub - osapps](https://github.com/osfunapps)

## Licence
ISC