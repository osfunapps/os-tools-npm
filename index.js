const fs = require('fs');

const self = module.exports = {

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
     *
     * @param cmd -> the command you want to fire
     * @param print -> set to true to print to console
     * @param timeout -> timeout for the command time
     * @param dataListener -> add a data listener to get all of the output in runtime (function(data){})
     * @param closeListener -> add a close listener to know when the command ends (function(){})
     * @param errorListener -> add an exception listener to know when the command fails(function(err){})
     */
    runCmd: function (cmd, print = true, timeout = null, dataListener = null, closeListener = null, errorListener = null) {
        return new Promise(function (resolve) {
            const exec = require('child_process').exec;
            let coffeeProcess = exec(cmd);
            let timer = null;

            coffeeProcess.stdout.on('data', function (data) {
                if (dataListener !== null) {
                    dataListener(data)
                }
                if (print) {
                    console.log(data);
                }
            });

            coffeeProcess.stdout.on('close', function () {
                if (closeListener !== null) {
                    closeListener()
                }
                resolve()
            });


            coffeeProcess.stdout.on('error', function (err) {
                console.log("Error running cmd command: ");
                if (errorListener !== null) {
                    errorListener(err)
                }
                if (print) {
                    console.log(err)
                }
            });

            function killPocess() {
                coffeeProcess.kill()
                resolve()
            }

            if (timeout !== null) {
                timer = setTimeout(killPocess, timeout)
            }
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
            stdout.write('\033[34;4m' + question + "\n");

            stdin.on('data', data => {
                stdin.removeAllListeners('data')
                stdin.removeAllListeners('error')
                resolve(data.toString().trim());
            });
            stdin.on('error', err => reject(err));
        })
    },


    /**
     * Will return today's date.
     *
     * @param numbersSeparator -> the separator to use between the numbers
     * @param long -> set true to get a long date
     */
    getTodaysDate: function (numbersSeparator, long=false) {
        const date = new Date();
        let year = date.getUTCFullYear().toString()
        let month = date.getUTCMonth() + 1;
        let day = date.getUTCDate();
        if(long){
            month = (month < 10 ? "0" : "") + month;
            day = (day < 10 ? "0" : "") + day;
        } else {
            year = year.substring(2);
        }

        return {
            'year': year,
            'month': month,
            'day': day,
            'toString': day + numbersSeparator + month + numbersSeparator + year
        }
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
     * Will capitalize only the first word
     */
    capitalizeOnlyFirstWord(str) {
        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1)
    },

    /**
     * Will join the paths of dirs
     */
    joinPath: function (...paths) {
        const path = require('path');
        return path.join(...paths)
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
    },

    /**
     * Will capitalize each word
     */
    capitalizeEachWord: function (text) {
        return text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    },

    /**
     * Will print obj in a beautiful manner
     */
    printObj: function (obj) {
        const util = require('util');
        console.log(util.inspect(obj, false, null, true))
    },

    /**
     * Will return a key by a value in a dictionary (object)
     */
    getKeyByValue: function (obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    },

    /**
     * Will run a file
     */
    runFile: function (filePath) {
        let platform = '';
        switch (process.platform) {
            case 'darwin' : platform = 'open'; break
            case 'win32' : platform = 'start'; break;
            case 'win64' : platform = 'start'; break;
            default : platform = 'xdg-open'; break;
        }

        const sys = require('sys');
        let exec = require('child_process').exec;

        exec(platform + ' ' + filePath);
    },

    /**
     * Will sort an array of dictionaries by date
     */
    sortArrayByDate: function (arr, dateSeparator) {
        return arr.sort(function (a, b) {
            let aDate = a.date.split(dateSeparator)
            let bDate = b.date.split(dateSeparator)
            if (aDate[2] > bDate[2]) {
                return 1
            } else if (aDate[2] < bDate[2]) {
                return -1
            }
            if (aDate[1] > bDate[1]) {
                return 1
            } else if (aDate[1] < bDate[1]) {
                return -1
            }
            if (aDate[0] > bDate[0]) {
                return 1
            } else if(aDate[0] < bDate[0]) {
                return -1
            } else {
                return 0
            }
        })
    }



};