/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
// Protractor config file
//see https://github.com/angular/protractor/blob/5.4.1/lib/config.ts
let protractor = {
    //broswer
    broswer: 'chrome', //chrome | ie
    //selenium config
    /*
    if directConnect is true, then will ignore seleniumAddress. 
    if directConnect is false, will using seleniumAddress as selenium proxy-address, this way need to start selenium server by using webdriver:start
    */
    directConnect: true,
    /**
    * The address of a running Selenium Server. If specified, Protractor will
    * connect to an already running instance of Selenium. This usually looks like
    * seleniumAddress: 'http://localhost:4444/wd/hub'
    */
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //address config
    /**
    * A base URL for your application under test. Calls to protractor.get()
    * with relative paths will be resolved against this URL (via url.resolve)
    */
   //251
   idealxUrl: process.env.BASE_URL || 'https://192.168.0.251:10444/iws/ssologin',
    //baseUrl:process.env.BASE_URL || 'https://192.168.0.251:10444/iws/ssologin',

    //SAM
    baseUrl:process.env.BASE_URL || 'https://192.168.0.251:9444/samweb/csr/loginSSO',

   //UAT
   //idealxUrl: process.env.BASE_URL || 'https://green.ideal-uat.dbs.com/loginSubscriberv2/login/pin',
    //baseUrl: process.env.BASE_URL || 'https://green.ideal-uat.dbs.com/loginSubscriberv2/login/pin',
     
    newSamUrl: process.env.BASE_URL || 'https://192.168.0.251:9444/samweb/csr/loginSSO',
    
    
    // idealxUrl: process.env.BASE_URL || 'https://localhost:10444/iws/ssologin',
    // baseUrl: process.env.BASE_URL || 'https://192.168.0.244:10444/ssm/ssologin',
    // baseUrl: process.env.BASE_URL || 'https://116.12.252.152/s1gcb/logon/loginSSO',
    // baseUrl: process.env.UX_URL || 'https://localhost:9444/s1gcb/logon/loginSSO',
    // baseUrl: process.env.BASE_URL || 'https://192.168.0.245:9444/swagger/#/default/refreshSession',

    //protractor config
    /**
    * The timeout in milliseconds for each script run on the browser. This
    * should be longer than the maximum time your application needs to
    * stabilize between tasks.
    */
    allScriptsTimeout: 120000,
    /**
    * How long to wait for a page to load.
    */
    getPageTimeout: 30000,
    //SELENIUM_PROMISE_MANAGER: false,// Disable promise manager because we are going to use async/await

    //broswer config
    /**
    * If you would like to run more than one instance of WebDriver on the same
    * tests, use multiCapabilities, which takes an array of capabilities.
    * If this is specified, capabilities will be ignored.
    */
    multiCapabilities: [
        {
            browserName: 'chrome',
            /**
            * Maximum number of browser instances that can run in parallel for this
            * set of capabilities. This is only needed if shardTestFiles is true.
            * Default is 1.
            */
            maxInstances: 3,
            chromeOptions: {
                binary: "/opt/google/chrome/chrome",
                args: ['--ignore-certificate-errors', '--ignore-ssl-errors', '--start-maximized']//'--disable-dev-shm-usage','--no-sandbox', 
            }
        },
    ],
    /*
    add chromeDriver config for build package bug
    */
    chromeDriver: 'C:/driver/chromedriver.exe',

    //test case config
    /**
    * Additional spec files to be run on this capability only.
    */
    // specs: [
    //     "../dist/e2e/CB/Payments/SG_TelegraphicTransfer.test.js",
    // ],

    suites: {
        test: [
            
        
        //"../dist/e2e/IDEALX/PayTransfer/SG_RecurringPayment.test.js",
       "../dist/e2e/IDEALX/Files/TW_UploadFile_User1.test.js",
       //"../dist/e2e/IDEALX/PayTransfer/CN_CrossBorderACH.test.js",
       //"../dist/e2e/IDEALX/PayTransfer/TWDBU_Payroll.test.js",
        //"../dist/e2e/IDEALX/PayTransfer/TW_eACHPayment.test.js",
       //src\e2e\IDEALX\PayTransfer\TW_eACHPayment.test.ts
        //"../dist/e2e/IDEALX/Reskin/PayTransfer/SG_SinglePayment.test.js",
        //"../dist/e2e/Trade/TradeFinance/CN_PurchaseInvoiceFinancing.test.js",
        //"../dist/e2e/Trade/TradeFinance/SG_PurchaseInvoiceFinancing.test.js",
        //"../dist/e2e/IDEALX/Reskin/PayTransfer/TW_GlobesendPayment.test.js",
       
        

        ],
        gateway: '../dist/e2e/gateway.test.js',
        unitTest: [
            '../dist/e2e/e2e.test.js',
        ],
        sanityCommon: [
            "../dist/e2e/CB/Payments/SG_TelegraphicTransfer.test.js",
            "../dist/e2e/CB/Payments/SG_IntraCompanyTransfer.test.js",
            "../dist/e2e/CB/Payments/SG_AccountTransfer.test.js",
            "../dist/e2e/CB/Payments/SG_FastPayment.test.js",
            "../dist/e2e/CB/Payments/SG_BulkPayment.test.js",
            "../dist/e2e/CB/Payments/SG_BulkCollection.test.js",
            "../dist/e2e/CB/Files/UploadProfile.test.js",
            "../dist/e2e/CB/Payments/SG_Beneficiary.test.js",
            "../dist/e2e/CB/Approvals/MyApprovals_byTxn.test.js",
            "../dist/e2e/CB/Approvals/MyApprovals_byFile.test.js",
            "../dist/e2e/CB/Approvals/OfflineApproval.test.js",
            "../dist/e2e/CB/Reports/SG_PaymentReports.test.js",
            "../dist/e2e/CB/Reports/SG_FileUploadReports.test.js",
            "../dist/e2e/CB/UserInfoMastHead/AlertReminders.test.js",
            "../dist/e2e/CB/Payments/CrossBoarderACH.test.js",
            "../dist/e2e/SAM/*/*.test.js"
        ],
        R21sanity: [
        ],
        R22hktt: '../dist/e2e/CB/Payments/HK_TelegraphicTransfer.test.js',
        full: ['../dist/e2e/e2e.test.js', '../dist/e2e/gateway.test.js']
    },

    /*
    * config in package.json
    * "test:protractor": "protractor config/protractor.config.js --suite=gateway,test",
    * "test:protractor": "protractor config/protractor.config.js --suite=full",
    * 
    * config in protractor
    * suites: {
    *     gateway: '../dist/e2e/gateway.test.js',
    *     test: '../dist/e2e/e2e.test.js',
    *     full: ['../dist/e2e/e2e.test.js', '../dist/e2e/gateway.test.js']
    * },

    /**
    * Alternatively, suites may be used. When run without a command line
    * parameter, all suites will run. If run with --suite=smoke or
    * --suite=smoke,full only the patterns matched by the specified suites will
    * run.
    *
    * Example:
    * suites: {
    *   smoke: 'spec/smoketests/*.js',
    *   full: 'spec/*.js'
    * }
    */

    //test frame work config
    /**
    * Test framework to use. This may be one of: jasmine, mocha or custom.
    * Default value is 'jasmine'
    *
    * When the framework is set to "custom" you'll need to additionally
    * set frameworkPath with the path relative to the config file or absolute:
    *
    *   framework: 'custom',
    *   frameworkPath: './frameworks/my_custom_jasmine.js',
    *
    * See github.com/angular/protractor/blob/master/lib/frameworks/README.md
    * to comply with the interface details of your custom implementation.
    *
    * Jasmine is fully supported as test and assertion frameworks.
    * Mocha has limited support. You will need to include your
    * own assertion framework (such as Chai) if working with Mocha.
    */
    framework: 'mocha',
    /**
    * Options to be passed to Mocha.
    *
    * See the full list at http://mochajs.org/
    */
    mochaOpts: {
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: 'test.results',
            reportTitle: 'DBS Testing IDEAL3 Result',
            reportPageTitle: 'DBS Testing IDEAL3 Result',
            reportFilename: 'Result-CB',
            quiet: true,
            html: true,
            json: true
        },
        debug: false,
        timeout: 300000
    },

    //base action config
    /**
    * A callback function called once protractor is ready and available, and
    * before the specs are executed. If multiple capabilities are being run,
    * this will run once per capability.
    *
    * You can specify a file containing code to run by setting onPrepare to
    * the filename string. onPrepare can optionally return a promise, which
    * Protractor will wait for before continuing execution. This can be used if
    * the preparation involves any asynchronous calls, e.g. interacting with
    * the browser. Otherwise Protractor cannot guarantee order of execution
    * and may start the tests before preparation finishes.
    *
    * At this point, global variable 'protractor' object will be set up, and
    * globals from the test framework will be available. For example, if you
    * are using Jasmine, you can add a reporter with:
    *
    *    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
    *      'outputdir/', true, true));
    *
    * If you need access back to the current configuration object,
    * use a pattern like the following:
    *
    *    return browser.getProcessedConfig().then(function(config) {
    *      // config.capabilities is the CURRENT capability being run, if
    *      // you are using multiCapabilities.
    *      console.log('Executing capability', config.capabilities);
    *    });
    */
    onPrepare: () => {
        browser.ignoreSynchronization = true;
        //browser.manage().window().maximize();
        console.log("enter onPrepare");
    },
    /**
    * A callback function called once tests are finished. onComplete can
    * optionally return a promise, which Protractor will wait for before
    * shutting down webdriver.
    *
    * At this point, tests will be done but global objects will still be
    * available.
    */
    onComplete: () => {
        console.log("enter onComplete");
    },

    //params config
    /**
    * The params object will be passed directly to the Protractor instance,
    * and can be accessed from your test as browser.params. It is an arbitrary
    * object and can contain anything you may need in your test.
    * This can be changed via the command line as:
    */
    params: {
        /*
        * Identity develop module or not, if yes then devWatch() function will work
        * which is using for add some time to check the Dom or Error
        */
        dev: true,
        /*
        * this is using for all time defined except caseFinishDelay, will be multiple
        * for other time defined
        */
        multiple: 5,
        /*
        * this defined the retry times when case failed
        */
        caseRetryTimes: 0,
        /*
        * this defined the time out for case
        */
        timeout: {
            /*
            * this defined the time out for every element defined.
            */
            elementLocation: 5000,
            /*
            * this defined the time out for page loading.
            */
            pageComplete: 10000,
            /*
            * this defined the time out for menu item.
            */
            menuItem: 500,
        },
        /*
        * this defined the time delay 
        */
        delay: {
            /*
            * default delay time
            */
            default: 1000,
            /*
            * using by devWatch function after case fininsh, it will delay closed.
            */
            caseFinishDelay: 30000,
            /*
            * using by element find delay for ux select component.
            */
            optionSelect: 1000,
            /*
            * using by element find delay for ux date component.
            */
            datePicker: 1000,
            /*
            * using by element find delay for ux lsit component. like transaction list
            */
            listSelect: 1000,
            /*
            * using by element find delay for ux button component. like transaction list
            */
            button: 500
        },
        /*
        * this defined the retry inteval
        */
        retryinteval: {
            /*
            * this defined the retry inteval for open menu
            */
            menu: 3000,
            /*
            * this defined the retry times for open menu
            */
            times: 5
        },
        /*
        * this defined the qs using for gateway
        */
        url: {
            qs: '',
            subOrgId: '',
            isSingleView: ''
        }
    },
};
if ("ie" === protractor.broswer) {
    protractor.directConnect = false;
    protractor.multiCapabilities = [
        {
            browserName: 'internet explorer',
            platform: 'ANY',
            'se:ieOptions': {
                ignoreProtectedModeSettings: true,
                unexpectedAlertBehaviour: 'ignore',
                acceptSslCerts: true,
                trustAllSSLCertificates: true,
                'disable-popup-blocking': true
            },
            unhandledPromptBehavior: 'accept'
        }
    ];
    protractor.jvmArgs = ['-Dwebdriver.ie.driver=./node_modules/webdriver-manager/selenium/IEDriverServer3.141.5.exe'];
} else if ("chrome" === protractor.broswer) {
    protractor.directConnect = true;
    protractor.multiCapabilities = [
        {
            browserName: 'chrome',
            maxInstances: 3,
            //access to UAT 绕过云安全平台拦截
            'goog:chromeOptions': {
        args: [
          '--disable-blink-features=AutomationControlled',
          '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          '--ignore-certificate-errors',
          '--ignore-ssl-errors', '--start-maximized'//'--disable-dev-shm-usage','--no-sandbox', 
        ],
        excludeSwitches: ['enable-automation'],
        useAutomationExtension: false
    },
        excludeSwitches: ['enable-automation'],
        useAutomationExtension: false
        }
    ];
}
//add date stamp to rest report
const fs = require("fs");
if (fs.existsSync('./version.txt')) {
    fs.readFile("./version.txt", "utf-8", function (error, data) {
        if (error) {
            protractor.mochaOpts.reporterOptions.reportPageTitle = protractor.mochaOpts.reporterOptions.reportPageTitle + " - " + error.message;
        } else {
            let moment = require('moment');
            const currentDate = moment(new Date()).format('YYYY-MM-DD');
            protractor.mochaOpts.reporterOptions.reportTitle = protractor.mochaOpts.reporterOptions.reportTitle + " - " + data + " (Last Success Deployed Date)" + ' - ' + currentDate + "(Test Date)";
            console.log(protractor.mochaOpts.reporterOptions.reportTitle);
        }
    });
}

protractor.caseConfig = require('./case.config.js');
protractor.run = (CaseRunLabels, allCondition = false) => {
    protractor.suites.test = new Array();
    protractor.caseConfig.CASE_CONFIG.find((item) => {
        const caseNumber = allCondition ? CaseRunLabels.length : 1;
        if (caseNumber <= item.labels.filter(label => CaseRunLabels.includes(label)).length) {
            protractor.suites.test.push(item.name);
        }
    });
    // console.log(protractor.suites.test);
}
exports.config = protractor
