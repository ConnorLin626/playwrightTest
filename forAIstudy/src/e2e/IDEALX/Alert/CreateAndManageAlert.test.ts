import { AlertsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE, randomNumbers } from "../../../lib";
import * as moment from 'moment';
import { browser } from "protractor";
let currentDate = moment(new Date()).format('DD MMM YYYY');

let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("SG_testData_03.json");

let _mockData = SIT ? testData.Alerts.SIT : testData.Alerts.UAT;
let _createAlertPage = _alertPagesListPage.createManageAlertPage;

describe("High Low Balance Alert", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, testData.Alerts.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("has high and low balance value", async function () {
        ////await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await browser.sleep(2000);
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.createHLBalanceAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.selectAllInput.jsClick();
        await _createAlertPage.search.input(_mockData.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(_mockData.account2);
        await _createAlertPage.accountOption1.jsClick();
        let highBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.highThresholdInput.input(highBalanceText);
        let lowBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.lowThresholdInput.input(lowBalanceText);
        //let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        //await _createAlertPage.applyButton.jsClickIfExist();
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.sendEmailIx);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await _createAlertPage.alertsFilter.input(highBalanceText);
        await _createAlertPage.showHLBalanceAlerts.jsClick();
        await Promise.all([
        await ensure(_createAlertPage.higLowAccount1).textContains(_mockData.account1),
        await ensure(_createAlertPage.higLowAccount2).textContains(_mockData.account2),
            await ensure(_createAlertPage.higLowSendTo).textContains(_mockData.sendEmailIx),
            await ensure(_createAlertPage.higLowThreshold).textContains(highBalanceText),
            //await ensure(_createAlertPage.higLowThreshold).textContains(lowBalanceText),
        ]);
        await _createAlertPage.deleteHLBalanceAlerts.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });

    it("has high and without low balance value", async function () {
        ////await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.createHLBalanceAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.selectAllInput.jsClick();
        await _createAlertPage.search.input(_mockData.account1);
        await _createAlertPage.accountOption1.jsClick();
        let highBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.highThresholdInput.input(highBalanceText);
        await _createAlertPage.startDate.select(currentDate);
        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        //await _createAlertPage.applyButton.jsClickIfExist();
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.sendEmailIx);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await _createAlertPage.alertsFilter.input(highBalanceText);
        await _createAlertPage.showHLBalanceAlerts.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.higLowAccount1).textContains(_mockData.account1),
            await ensure(_createAlertPage.higLowSendTo).textContains(_mockData.sendEmailIx),
            await ensure(_createAlertPage.higLowThreshold).textContains(highBalanceText)
        ]);
        await _createAlertPage.deleteHLBalanceAlerts.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
    //due to IDXP-1561 High low Balance Alert not support SMS
    // it("add new mobile", async function () {
    //     ////await _createAlertPage.userMenu.click();
    //     await _createAlertPage.profileMenu.click();
    //     await _createAlertPage.alertMenu.click();
    //     await _createAlertPage.loadCondition();
    //     await _createAlertPage.createHLBalanceAlertButton.jsClick();
    //     await _createAlertPage.loadConditionCreatePage();
    //     await _createAlertPage.alertAccountMultiSelection.jsClick();
    //     await _createAlertPage.search.input(_mockData.account1);
    //     await _createAlertPage.accountOption1.jsClick();
    //     let highBalanceText = _createAlertPage.getRandomNumber(2);
    //     await _createAlertPage.highThresholdInput.input(highBalanceText);
    //     // let currentDate = _createAlertPage.getCurrentDate();
    //     // await _createAlertPage.startDate.click();
    //     // await _createAlertPage.date.jsClick();
    //     await _createAlertPage.startDate.select(currentDate);
    //    // await _createAlertPage.applyButton.jsClickIfExist();
    //     await _createAlertPage.sendEmailButton.jsClickIfExist();
    //     await _createAlertPage.sendEmailMultiSelection.jsClick();
    //     await _createAlertPage.search.input(_mockData.sendEmailIx);
    //     await _createAlertPage.sendEmailOption1.jsClick();

    //     await _createAlertPage.isSendSMS.jsClick();
    //     await _createAlertPage.addNewMobile.jsClick();
    //     // await _createAlertPage.loadConditionCreatePage();
    //     let nickName = 'autoTestNewMobile' + generatedID();
    //     await _createAlertPage.nickname0.input(nickName);

    //     await _createAlertPage.countryCodeSelection.jsClick();
    //     await _createAlertPage.countryCodeSelection.input('+');
    //     await _createAlertPage.countryCodeOption0.jsClick();

    //     const _areaCode = _createAlertPage.getRandomNumbers(4);
    //     await _createAlertPage.areaCode0.input(_areaCode);
    //     const _mobileNumber = _createAlertPage.getRandomNumbers(8);
    //     await _createAlertPage.mobileNumber0.input(_mobileNumber);
    //     await _createAlertPage.saveAndCloseMobilButton.jsClick();
    //     await _createAlertPage.loadConditionCreatePage();
    //     await _createAlertPage.sendSmsSelection.jsClick();
    //     await _createAlertPage.search.input(nickName);
    //     await _createAlertPage.sendSmsOption0.jsClick();
    //     await _createAlertPage.submitButton.jsClick();
    //     await _createAlertPage.loadDialog();
    //     await _createAlertPage.dismissButton.jsClick();
    //     await _createAlertPage.loadCondition();

    //     await _createAlertPage.alertsFilter.input(nickName);
    //     await _createAlertPage.showHLBalanceAlerts.jsClick();
    //     await Promise.all([
    //         await ensure(_createAlertPage.MobilLigLowSendTo).textContains(nickName),
    //         await ensure(_createAlertPage.MobilLigLowSendTo).textContains(_mobileNumber),
    //     ]);
    //     await _createAlertPage.deleteHLBalanceAlerts.click();
    //     await _createAlertPage.deleteDialogButton.jsClick();
    //     await _createAlertPage.dismissButton.click();
    // });
});

describe("Periodic Balance Alert", async function () {
    //await new NavigatePages().loginIdealx(_mockData.loginCompanyId, _mockData.loginUserIdIx, "123123");
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Periodic Balance Alert", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.periodicAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createPeriodicBalanceAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(_mockData.account2);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.sendTime.input(_mockData.sendTime)
        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        //await _createAlertPage.applyButton.jsClickIfExist();
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.sendEmailIx);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.periodicAlertNums).isNotEmpty(),
        ]);
        await _createAlertPage.showPeriodicAlertButton.jsClick();
        await _createAlertPage.deletePeriodicAlert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });

    //due to IDXP-882 VA will be turn off in R8.16
    it("Create Periodic Balance Alert with Virtual accounts", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.periodicAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createPeriodicBalanceAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.selectVAButton.jsClick();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.selectAllInput.jsClick();
        await _createAlertPage.search.input(_mockData.accountVA1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.sendTime.input(_mockData.sendTime)
        // // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.periodicAlertNums).textContains(nums),
        ]);
    });

    it("delete Periodic Balance Alert with Virtual accounts", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.alertsFilter.input(_mockData.accountVA1);
        let nums = '';
        await _createAlertPage.periodicAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 - 1 + '';
        });
        await _createAlertPage.showPeriodicAlertButton.jsClick();
        await _createAlertPage.deletePeriodicAlert.click();
        await _createAlertPage.loadDeleteDialog();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.periodicAlertNums).textContains(nums),
        ]);
    }); 
});

describe("Remittance & MT103 Advice Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create MT103 Advice Alert", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.remittanceMT103AlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createRemittanceMT103AlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(_mockData.account2);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.alertPassword.jsClick();
        await _createAlertPage.alertPassword.input("123123");
        await _createAlertPage.alertConfirmPassword.jsClick();
        await _createAlertPage.alertConfirmPassword.input("123123");

        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.remittanceMT103AlertNums).textContains(nums),
        ]);
        await _createAlertPage.showRemittanceMT103AlertButton.jsClick();
        await _createAlertPage.deleteremittanceMT103Alert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();

    });
});

describe("Payment Statuses Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create with checkbox all", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.paymentStatusAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createPaymentStatusAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account3);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(_mockData.account4);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.accountDropIcon.jsClick();
        await _createAlertPage.alertCreateCheckbox.jsClick();
        await _createAlertPage.alertModifiedCheckbox.jsClick();
        await _createAlertPage.alertPendingVerificationCheckbox.jsClick();
        await _createAlertPage.alertPendingApprovalCheckbox.jsClick();
        await _createAlertPage.alertPendingReleaseCheckbox.jsClick();
        await _createAlertPage.alertRejectedCheckbox.jsClick();
        await _createAlertPage.alertSentCheckbox.jsClick();
        await _createAlertPage.alertFailedCheckbox.jsClick();

        let alertBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.alertThresholdInput.input(alertBalanceText);

        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        //await _createAlertPage.applyButton.jsClickIfExist()
        await _createAlertPage.submitButton.jsClick();
        if(!SIT){
            browser.sleep(10000);
        }
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        // const _filterKey = _mobileNumber;
        // await _createAlertPage.alertsFilter.input(_filterKey);
        // await _createAlertPage.showPaymentStatusAlertButton.jsClick();
        // await _createAlertPage.editPaymentStatusAlertButton.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.paymentStatusAlertNums).isNotEmpty(),
            // await _createAlertPage.isSendMobile.isElementSelected(),
            // await ensure(_createAlertPage.alertAccountMultiSelection).textContains(_mockData.account3),
            // await ensure(_createAlertPage.alertAccountMultiSelection).textContains(_mockData.account4),
            // await ensure(_createAlertPage.alertThresholdInput).textContains(alertBalanceText),
        ]);
        await _createAlertPage.showPaymentStatusAlertButton.jsClick()
        await _createAlertPage.deletepaymentStatusAlert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });

    it("create with checkbox single", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.paymentStatusAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createPaymentStatusAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account3);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(_mockData.account4);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.accountDropIcon.jsClick();
        await _createAlertPage.alertCreateCheckbox.jsClick();

        let alertBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.alertThresholdInput.input(alertBalanceText);

        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        //await _createAlertPage.applyButton.jsClickIfExist()
        await _createAlertPage.submitButton.jsClick();
        if(!SIT){
            browser.sleep(10000);
        }
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.paymentStatusAlertNums).textContains(nums),
        ]);
        await _createAlertPage.showPaymentStatusAlertButton.jsClick()
        await _createAlertPage.deletepaymentStatusAlert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});

if (SIT) {
    describe("Fixed Deposit Maturity Alert", async function () {
        // before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, "123123"); });
        const suitObject = this;
        beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

        it("Create Fiexed Deposit Manturity Alert", async function () {
            //await _createAlertPage.userMenu.click();
            await _createAlertPage.profileMenu.click();
            await _createAlertPage.alertMenu.click();
            await _createAlertPage.loadCondition();
            let nums = '';
            await _createAlertPage.fixedDepsAlertNums.getText().then(val => {
                let _val = val.trim();
                nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
            });

            await _createAlertPage.createFixedDepositAlertButton.jsClick();
            await _createAlertPage.loadConditionCreatePage();
            await _createAlertPage.alertAccountMultiSelection.jsClick();
            await _createAlertPage.search.input(_mockData.accountFD1);
            await _createAlertPage.accountOption1.jsClick();
            await _createAlertPage.search.input(_mockData.accountFD2);
            await _createAlertPage.accountOption1.jsClick();
            await _createAlertPage.beforeDate.input(_mockData.beforeDate);
            // let currentDate = _createAlertPage.getCurrentDate();
            // await _createAlertPage.startDate.click();
            // await _createAlertPage.date.jsClick();
            await _createAlertPage.startDate.select(currentDate);
           // await _createAlertPage.applyButton.jsClickIfExist()
            await _createAlertPage.submitButton.jsClick();
            await _createAlertPage.loadDialog();
            await _createAlertPage.dismissButton.jsClick();
            await _createAlertPage.loadCondition();

            await Promise.all([
                await ensure(_createAlertPage.fixedDepsAlertNums).textContains(nums),
            ]);
            await _createAlertPage.showFixedDepsAlertButton.jsClick();
            await _createAlertPage.scrollTo(0,800);
            await _createAlertPage.deletefixedDepsAlert.click();
            await _createAlertPage.deleteDialogButton.jsClick();
            await _createAlertPage.dismissButton.click();
        });
    });
}

describe("Loans Overdue Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Loans Overdue Alert", async function () {
        // if (!SIT) {
        //     await new NavigatePages().loginIdealx(testData.Alerts.loansOverdueAlert.UAT.loginCompanyId, testData.Alerts.loansOverdueAlert.UAT.loginUserId, "123123");
        // }
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.loansOverAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createLoansOverdueAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account5 : testData.Alerts.loansOverdueAlert.UAT.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account6 : testData.Alerts.loansOverdueAlert.UAT.account2);
        await _createAlertPage.accountOption1.jsClick();
        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        //await _createAlertPage.applyButton.jsClickIfExist()
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await Promise.all([
            await ensure(_createAlertPage.loansOverAlertNums).textContains(nums),
        ]);

        await _createAlertPage.showLoansOverdueAlertButton.jsClick()
        await _createAlertPage.deleteloanOverAlert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});

describe("Loans Payments Due Date Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it("Create Loans Payments Due Date Alert", async function () {
        // if (!SIT) {
        //     await new NavigatePages().loginIdealx(testData.Alerts.loansOverdueAlert.UAT.loginCompanyId, testData.Alerts.loansOverdueAlert.UAT.loginUserId, "123123");
        // }
        //await _createAlertPage.userMenu.click();
        await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, testData.Alerts.UAT.password); 
        await _createAlertPage.profileMenu.click();
        await browser.sleep(2000);
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.loansPaymentsAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createLoansPaymentsAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        if(!SIT){
            await _createAlertPage.selectAllInput.jsClick();
            await _createAlertPage.selectAllInput.jsClick();
        }
        await _createAlertPage.search.input(SIT ? _mockData.account5 : testData.Alerts.loansOverdueAlert.UAT.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account6 : testData.Alerts.loansOverdueAlert.UAT.account2);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.beforeDate.input(_mockData.beforeDate);
        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        //await _createAlertPage.applyButton.jsClickIfExist()
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.loansPaymentsAlertNums).textContains(nums),
        ]);

        await _createAlertPage.showLoansPaymentsAlertButton.jsClick()
        await _createAlertPage.deleteloansPaymentAlert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});

describe("Incoming Funds Alert", async function () {
    // before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Incoming Funds Alert", async function () {
        // if (!SIT) {
        //     await new NavigatePages().loginIdealx(testData.Alerts.creditConfirmAlert.UAT.loginCompanyId, testData.Alerts.creditConfirmAlert.UAT.loginUserId, "123123");
        // }
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.incomingFundsAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        // let alertType = 'Incoming Funds Alert';
        // await _createAlertPage.alertsFilter.input(alertType);
        // await _createAlertPage.showIncomingFundsAlertButton.jsClick();
        await _createAlertPage.createIncomingFundsAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        //await _createAlertPage.selectAllInput.jsClick();
        await _createAlertPage.search.input(_mockData.account7);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(_mockData.account8);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.incomingFundsAlertGreaterInput.input('10');
        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        //await _createAlertPage.applyButton.jsClickIfExist()
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        // await _createAlertPage.alertsFilter.input(alertType);
        // await _createAlertPage.showIncomingFundsAlertButton.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.incomingFundsAlertNums).textContains(nums),
            // await ensure(_createAlertPage.incomingFundsAltAccount1).textContains(_mockData.account7),
            // await ensure(_createAlertPage.incomingFundsAltAccount2).textContains(_mockData.account8),
        ]);
        await _createAlertPage.showIncomingFundsAlertButton.jsClick();
        await _createAlertPage.deleteincomingFundsAlert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});

describe("Credit Confirmation Alert", async function () {
    // before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Credit Confrimation Alert", async function () {
        // if (!SIT) {
        //     await new NavigatePages().loginIdealx(testData.Alerts.creditConfirmAlert.UAT.loginCompanyId, testData.Alerts.creditConfirmAlert.UAT.loginUserId, "123123");
        // }
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.createConfirmationAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        // let alertType = 'Credit Confirmation Alert';
        // await _createAlertPage.alertsFilter.input(alertType);
        // await _createAlertPage.showCreateConfirmationAlertButton.jsClick();
        await _createAlertPage.createCreateConfirmationAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        //await _createAlertPage.selectAllInput.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account7 : testData.Alerts.creditConfirmAlert.UAT.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account8 : testData.Alerts.creditConfirmAlert.UAT.account2);
        await _createAlertPage.accountOption1.jsClick();
        // let currentDate = _createAlertPage.getCurrentDate();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        //await _createAlertPage.applyButton.jsClickIfExist()
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        // await _createAlertPage.alertsFilter.input(alertType);
        // await _createAlertPage.showCreateConfirmationAlertButton.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.createConfirmationAlertNums).textContains(nums),
            // await ensure(_createAlertPage.createConfirmationAltAccount1).textContains(_mockData.account7),
            // await ensure(_createAlertPage.createConfirmationAltAccount2).textContains(_mockData.account8),
        ]);
        await _createAlertPage.showCreateConfirmationAlertButton.jsClick();
        await _createAlertPage.deleteConfirmationAlert.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});

describe("ALT Vendor Finance Alert", async function () {
    //await new NavigatePages().loginIdealx(_mockData.loginCompanyId, _mockData.loginUserIdIx, "123123");
    // before(async function () { await new NavigatePages().loginIdealx(_mockData.loginCompanyId, _mockData.loginUserIdIx, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create ALT Vendor Finance Alert", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        if(!SIT){
            await browser.sleep(5000);
        }
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.AltAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createAltAlertBtn.jsClick();
        await _createAlertPage.loadConditionCreateAltPage();
        await _createAlertPage.submitCheckbox.jsClickIfExist();
        await _createAlertPage.finalApprovalCheckbox.jsClick();
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.loginUserId : _mockData.sendEmailIx);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.AltAlertNums).textContains(nums),
        ]);
    });

    it("delete ALT Vendor Finance Alert", async function () {
        //await _createAlertPage.userMenu.click();
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.AltAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 - 1 + '';
        });

        await _createAlertPage.showAlert.jsClick();
        await _createAlertPage.deleteAlert.click();
        await _createAlertPage.loadDeleteDialog();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.AltAlertNums).textContains(nums),
        ]);

    });
});

describe("EDP status Alert", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, testData.Alerts.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create EDP alert", async function () {
        await _createAlertPage.profileMenu.click();
        await browser.sleep(2000);
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.EDPAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createEDPAlertBtn.jsClick();
        await _createAlertPage.loadConditionCreateAltPage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account9);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.issued.jsClick();
        await _createAlertPage.issuanceFailed.jsClick();
        await _createAlertPage.issuedCashOut.jsClick();
        await _createAlertPage.issuedPayeeRejected.jsClick();
        await _createAlertPage.issuedExpired.jsClick();
        await _createAlertPage.receivedPendingCashOut.jsClick();
        await _createAlertPage.receivedCahsOutUnsuccess.jsClick();
        await _createAlertPage.receivedPayroCancelled.jsClick();
        await _createAlertPage.receivedExpiringSoon.jsClick();
        await _createAlertPage.alertThresholdInput.input('1');
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.loginUserId : _mockData.sendEmailIx);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await Promise.all([
            await ensure(_createAlertPage.EDPAlertNums).textContains(nums),
        ]);
        await _createAlertPage.showEDPAlert.jsClick();
        await _createAlertPage.editEDPAlertBtn.jsClick();
        await _createAlertPage.loadConditionCreateAltPage();
        await Promise.all([
            await ensure(_createAlertPage.issued).isSelected(),
            await ensure(_createAlertPage.issuanceFailed).isSelected(),
            await ensure(_createAlertPage.issuedCashOut).isSelected(),
            await ensure(_createAlertPage.issuedPayeeRejected).isSelected(),
            await ensure(_createAlertPage.issuedExpired).isSelected(),
            await ensure(_createAlertPage.receivedPendingCashOut).isSelected(),
            await ensure(_createAlertPage.receivedCahsOutUnsuccess).isSelected(),
            await ensure(_createAlertPage.receivedPayroCancelled).isSelected(),
            await ensure(_createAlertPage.receivedExpiringSoon).isSelected(),
        ]);
    });

    it("Edit EDP alert", async function () {
        await _createAlertPage.selectAllBtn.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEDPAlert.jsClick();
        await _createAlertPage.editEDPAlertBtn.jsClick();
        await _createAlertPage.loadConditionCreateAltPage();
        await Promise.all([
            await ensure(_createAlertPage.issued).isSelected(),
            await ensure(_createAlertPage.issuanceFailed).isSelected(),
            await ensure(_createAlertPage.issuanceUnsuccessful).isSelected(),
            await ensure(_createAlertPage.issuedCashOut).isSelected(),
            await ensure(_createAlertPage.issuedCashCoutFailed).isSelected(),

            await ensure(_createAlertPage.issuedPayeeRejected).isSelected(),
            await ensure(_createAlertPage.issuedPayorCancelled).isSelected(),
            await ensure(_createAlertPage.issuedPayorCancellationUnsuccessful).isSelected(),
            await ensure(_createAlertPage.issuedExpiringSoon).isSelected(),
            await ensure(_createAlertPage.issuedExpired).isSelected(),

            await ensure(_createAlertPage.receivedPendingCashOut).isSelected(),
            await ensure(_createAlertPage.received_CashedOut).isSelected(),
            await ensure(_createAlertPage.receivedCashOutFailed).isSelected(),
            await ensure(_createAlertPage.receivedCahsOutUnsuccess).isSelected(),
            await ensure(_createAlertPage.receivedPayeeRejected).isSelected(),
            await ensure(_createAlertPage.received_PayeeRejectionUnsuccessful).isSelected(),
            await ensure(_createAlertPage.receivedPayroCancelled).isSelected(),
            await ensure(_createAlertPage.receivedExpiringSoon).isSelected(),
            await ensure(_createAlertPage.receivedRReceivedExpired).isSelected(),
        ]);
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEDPAlert.jsClick();
        await _createAlertPage.deleteEDPAlert.click();
        await _createAlertPage.loadDeleteDialog();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        
    });
});