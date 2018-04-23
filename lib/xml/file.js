'use strict';

const testCase = require('./testCase');
const filter = /([\u001b]\[.{1,2}m)/g;
const shorten = /[\n].*/g;

module.exports = function file(testResult) {

    let testsuiteName = '';
    let testNum = testResult.testResults.length || 0;
    let failures = 0;
    let errors = 0;
    let times = 0;

    const testCases = testResult.testResults.map((testResult) => {
        let failuresXml;
        const time = testResult.duration / 1000 || 0;
        testsuiteName = testResult.ancestorTitles[0];
        times += time;
        const aTestCase = {
            _attr: {
                classname: testResult.ancestorTitles,
                name: testResult.fullName || testResult.title,
                time
            }
        };
        if (testResult.status === 'failed') {
            failuresXml = testResult.failureMessages.map((message) => {
                const filteredMessage = message.replace(filter, '');
                const shortMessage = filteredMessage.replace(shorten, '');

                return {
                    failure: {
                        _attr: {
                            message: shortMessage
                        },
                        _cdata: filteredMessage
                    }
                }
            });
            failures++;
            return {testcase: [aTestCase].concat(failuresXml)}
        } else {
            return {testcase: aTestCase}
        }
    });

  const aFile = [{_attr: {name: testsuiteName, tests: testNum, failures, errors, timestamp:new Date().toISOString(), time: times }}];
  return {testsuite: aFile.concat(testCases)};

};
