// tools module to perform file operations, prompts etc...
const fs = require('fs');

const self = module.exports = {

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
     * will run a cmd command
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
                console.log("Error running cmd command: ")
                throw  err
            });
        }.bind())
    },

    /**
     * will unpack a series of apks, located in a path, to a desired destination
     */
    unpackApks: async function (jadxExePath, apksPath, destPath) {
        const fh = require('os-file-handler');
        fh.createDir(destPath)
        let apksList = fh.getDirContent(apksPath)
        for (let i = 0; i < apksList.length; i++) {
            console.log("unpacking " + apksList[i])
            let stripped = fh.stripExtension(apksList[i])
            if (stripped === '') {
                continue
            }
            let currDestPath = destPath + stripped
            fh.createDir(currDestPath)
            let cmd = jadxExePath + ' -d ' + '"' + currDestPath + '"' + ' ' + '"' + apksPath + apksList[i] + '"'
            await self.runCmd(cmd)

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
    }
    ,


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
    },

    /**
     * will filter a list by val list
     * @param arr -> the list to filter
     * @param remove -> set to true if you want to remove the element found, else false so they will be removed
     * @param vals -> the values to look for
     * @param caseSensitive -> true to case sensitive
     * @return {Array}
     */
    filterListByVals: function (arr, remove = false, vals = [], caseSensitive = false) {
        let resArr = []
        if (remove) {
            resArr = arr
        }
        for (let i = 0; i < arr.length; i++) {
            if (remove) {
                resArr = filterListByVal(resArr, remove, vals[i], caseSensitive);
            } else {
                let arr2 = filterListByVal(arr, remove, vals[i], caseSensitive);
                resArr = mergeArrays(resArr, arr2, true)
            }
        }


        return resArr
    },

    /**
     * will filter a list by val
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

    mergeArrays: function (arr1, arr2, uniqueElements = false) {
        if (uniqueElements) {
            return arr1.filter(value => -1 === arr2.indexOf(value))
        } else {
            return arr1.concat(arr2)
        }
    },

    /**
     * will filter a dictionary by key
     */
    filterDictByKey: function(dictt, name, remove = false, caseSensitive = false) {
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
}