const fse = require('fs-extra')
const glob = require('glob')
const path = require("path")
const fs = require('fs')
const { spawn } = require('cross-spawn');
let moment = require('moment');
const mochaReportJsonfilesDir=path.join(__dirname, '../../test.results/');
const mochaReportJsonfiles=path.join(mochaReportJsonfilesDir, 'Result-IDEALX-*.json');
// See Params section below
const options = {
    files: [
        mochaReportJsonfiles
    ],
}

const flatten = items => items.reduce((acc, arr) => [...acc, ...arr], [])

const flatMap = fn => items => flatten(items.map(fn))


const collectSourceFiles = flatMap(pattern => {
  const files = glob.sync(pattern)
  if (!files.length) {
    throw new Error(`Pattern ${pattern} matched no report files`)
  }
  return files
})

function generateStats(suites, reports) {
  const tests = getAllTests(suites)
  const passes = tests.filter(test => test.state === 'passed')
  const pending = tests.filter(test => test.state === 'pending')
  const failures = tests.filter(test => test.state === 'failed')
  const skipped = tests.filter(test => test.state === 'skipped')
  
  const timeStats = getStateTimeSpan(reports)
  
  let state = {
    suites: suites.length,
    tests: tests.length,
    passes: passes.length,
    pending: pending.length,
    failures: failures.length,
    testsRegistered: tests.length,
    passPercent: (passes.length * 100) / tests.length,
    pendingPercent: (pending.length * 100) / tests.length,
    other: 0,
    hasOther: false,
    skipped: skipped.length,
    hasSkipped: !!skipped.length,
    ...timeStats
  }
  return {   
    ...state,
    passPercentClass: state.passPercent<90?(state.passPercent<60?"danger":"warning"):"success",
    pendingPercentClass: "danger"
  }
}

function collectReportFiles(files) {
  return Promise.all(files.map(filename => fse.readJson(filename)))
}

const collectReportSuites = flatMap(report =>
  report.suites.suites
)

const getAllTests = flatMap(suite => [
  ...suite.tests,
  ...getAllTests(suite.suites),
])

const getStateTimeSpan = reports => {
  const spans = reports.map(({ stats: { start, end } }) => {
    return { start: new Date(start), end: new Date(end) }
  })

  const maxSpan = spans.reduce(
    (currentMaxSpan, span) => {
      const start = new Date(
        Math.min(currentMaxSpan.start.getTime(), span.start.getTime())
      )
      const end = new Date(
        Math.max(currentMaxSpan.end.getTime(), span.end.getTime())
      )
      return { start, end }
    }
  )

  return {
    start: maxSpan.start.toISOString(),
    end: maxSpan.end.toISOString(),
    duration: maxSpan.end.getTime() - maxSpan.start.getTime()
  }
}

 async function merge(options) {
  const files = collectSourceFiles(options.files)
  const reports = await collectReportFiles(files)
  const suites = collectReportSuites(reports)

  return {
    stats: generateStats(suites, reports),
    results: suites    
  }
}

function generateSuites(suites) {      
    return {
      "uuid":"e0af26db-1111-1111-1111-019abad326f6",
      "title": "",
      "fullFile": "",
      "file": "",
      "beforeHooks": [],
      "afterHooks": [],
      "suites":suites,
      "tests": [],
      "passes": [],
      "failures": [],
      "pending": [],
      "skipped": [],
      "duration": 0,
      "root": true,
      "rootEmpty": true,
      "_timeout": 300000     
    }
  }

  function generateHtmlReport(){
    let margecmd= path.join(__dirname,"../../node_modules/.bin/marge");
    console.log(margecmd)

    const options = {
        stdio: 'inherit', 
        shell: true
    };

    let rptTitle=`--reportTitle="${reportTitle()}"`
    let reportProcess = spawn(margecmd , [`${mochaReportJsonfilesDir}Result-IDEALX.json`,
                            `-o=${mochaReportJsonfilesDir}`,rptTitle],options);

    reportProcess.on('close', (code,signal) => {
        if (code === 0) {
            console.log('Protractor generation have completed successfully.');
        } else {
            console.error(`report generation exited with code ${code} and signal ${signal}.`);
        }
    });
    // Handle the "error" event to prevent unhandled error exceptions
    reportProcess.on('error', (err) => {
        console.error('report generation encountered an error:', err);
    });
}

function reportTitle(){
  let rptTitle="DBS Testing IDEAL3 Result";
  let versionFilePath = path.join(__dirname, '../../version.txt')
  if (fs.existsSync(versionFilePath)) {
    let data =  fs.readFileSync(versionFilePath, "utf-8");
    if (data) { 
        const currentDate = moment(new Date()).format('YYYY-MM-DD');
        rptTitle = rptTitle + " - " + data.trim() + " (Last Success Deployed Date)" + ' - ' + currentDate + "(Test Date)";
    }
  }
return rptTitle;
}
 
  
function generateReport(){
  merge(options).then(
    report => {
      let fileContent={
          stats: report.stats,
          suites: generateSuites(report.results),
          copyrightYear:new Date().getFullYear()  
      }
      const content = JSON.stringify(fileContent, null, 2)
      const outputFilePath=path.join(__dirname, '../../test.results/Result-IDEALX.json');
      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true })
      fs.writeFileSync(outputFilePath, content, { flag: 'w' })
      console.info(`Reports merged to ${outputFilePath}`)
      generateHtmlReport()  

    },
    error => {
      console.error('ERROR: Failed to merge reports\n')
      console.error(error)
      process.exit(1)
    }
  )
}
exports.generateReport=generateReport
