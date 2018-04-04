

# jest-jenkins-reporter

A plugin that integrates jest test results into Jenkins.

# Installation

```
$ npm install --save jest-jenkins-reporter
or
$ yarn add jest-jenkins-reporter --dev
```

# Usage

Configuring package.json

Add jest test result processor, here is jest-jerkins-reporter. If you want to use your self processor, you can replace "jest-jerkins-reporter".

```
"jest": {
    ...
    ...
    "testResultsProcessor": "jest-jenkins-reporter"
  }
```



Reporter file config:

```
"jestSonar": {
    "reportPath": "reports",
    "reportFile": "report.xml",
    "indent": 4
  }
  
```

* `reportPath`: Report file generation path.
* `reportFile`: Report file name.
* `indent`: XML file indentation space number. 



Test script:

```
"test-jenkins": "NODE_ENV=test jest --colors"
```



## License

MIT

