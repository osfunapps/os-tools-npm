Introduction
------------

This module contains fundamental functions to implement in an npm project.

## Installation
Install via npm:
```js
npm i os-tools
```

## Usage       
Require tools:
```js        
var tools = require("os-tools")
```

## Functions and signatures:
```js
/**
 * Will wait for a given time
 */
delay: function (timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
},

/**
 * Will remove everything except numbers from a given string
 */
onlyNumericFromStr: function (str) {
    return str.replace(/\D+/g, '');
},

/**
 * Will remove everything except alpha from a given string
 */
onlyAlphaFromStr: function (str) {
    return str.replace('[\\p{Alnum},\\s#\\-.]');
},

/**
 * Wll run a cmd command
 */
runCmd: function (cmd) {
    return new Promise(function (resolve) {
        var exec = require('child_process').exec;
        var coffeeProcess = exec(cmd);

        coffeeProcess.stdout.on('data', function (data) {
            console.log(data);
        });

        coffeeProcess.stdout.on('close', function () {
            resolve()
        });

        coffeeProcess.stdout.on('error', function (err) {
            console.log("Error running cmd command: ");
            throw  err
        });
    }.bind())
},

/**
 * Will prompt the user with a question and return the answer.
 *
 * @param question -> the question to ask the user
 */
promptUser: function (question) {
    return new Promise((resolve, reject) => {
        const {stdin, stdout} = process;

        stdin.resume();
        stdout.write(question + "\n");

        stdin.on('data', data => resolve(data.toString().trim()));
        stdin.on('error', err => reject(err));
    })
}
,


/**
 * Will return today's date.
 *
 * @param numbersSeparator -> the separator to use between the numbers
 */
getTodaysDate: function (numbersSeparator) {
    const dateObj = new Date();
    const year = dateObj.getUTCFullYear().toString().substring(2);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    return day + numbersSeparator + month + numbersSeparator + year
},

/**
 * Will filter a list by val list
 *
 * @param arr -> the list to filter
 * @param remove -> set to true if you want to remove the element found, else false so they will be removed
 * @param vals -> the values to look for
 * @param caseSensitive -> true to case sensitive
 * @return {Array}
 */
filterListByVals: function (arr, remove = false, vals = [], caseSensitive = false) {
    let resArr = [];
    if (remove) {
        resArr = arr
    }
    for (let i = 0; i < vals.length; i++) {
        if (remove) {
            resArr = self.filterListByVal(resArr, remove, vals[i], caseSensitive);
        } else {
            let arr2 = self.filterListByVal(arr, remove, vals[i], caseSensitive);
            resArr = self.mergeArrays([resArr, arr2], true)
        }
    }


    return resArr
},

/**
 * Will filter a list by val
 */
filterListByVal: function (arr, remove = false, val, caseSensitive = false) {
    if (caseSensitive) {
        if (remove) {
            return arr.filter((data) => !(data.includes(val)));
        } else {
            return arr.filter((data) => data.includes(val));
        }
    } else {
        if (remove) {
            return arr.filter((data) => !(data.toLowerCase().includes(val.toLowerCase())))
        } else {
            return arr.filter((data) => data.toLowerCase().includes(val.toLowerCase()));
        }
    }
},

/**
 * Will replace all char occurrences
 */
replaceAll: function (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
},

/**
 * Will return the string representation of an object
 */
toStringRepresenation(obj) {
    return JSON.stringify(obj)
},

/**
 * Will merge a bunch of arrays together
 */
mergeArrays: function (arraysList = [], uniqueElements = false) {
    let finalArr = [];
    for (let i = 0; i < arraysList.length; i++) {
        if (uniqueElements) {
            finalArr = finalArr.filter(value => -1 === arraysList[i].indexOf(value))
        } else {
            finalArr = finalArr.concat(arraysList[i])
        }
    }
    return finalArr
},

/**
 * Will filter a dictionary by key
 */
filterDictByKey: function (dictt, name, remove = false, caseSensitive = false) {
    if (caseSensitive) {
        if (remove) {
            return dictt.filter(o => !(Object.keys(o).some(k => o[k].includes(name))));
        } else {
            return dictt.filter(o => Object.keys(o).some(k => o[k].includes(name)));
        }
    } else {
        if (remove) {
            return dictt.filter(o => !(Object.keys(o).some(k => o[k].toLowerCase().includes(name.toLowerCase()))));
        } else {
            return dictt.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(name.toLowerCase())));
        }
    }
}    
```
    
And more...


## Links -> see more tools
* [os-tools-npm](https://github.com/osfunapps/os-tools-npm) -> This module contains fundamental functions to implement in an npm project
* [os-file-handler-npm](https://github.com/osfunapps/os-file-handler-npm) -> This module contains fundamental files manipulation functions to implement in an npm project
* [os-file-stream-handler-npm](https://github.com/osfunapps/os-file-stream-handler-npm) -> This module contains read/write and more advanced operations on files
* [os-xml-handler-npm](https://github.com/osfunapps/os-xml-handler-npm) -> This module will build, read and manipulate an xml file. Other handy stuff is also available, like search for specific nodes

[GitHub - osapps](https://github.com/osfunapps)


## Licence
ISC