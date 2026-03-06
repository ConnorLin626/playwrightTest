import { AlertsPages } from "../../../pages/CB/Alert";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID } from "../../../lib";
import { Menu } from "../../../config/menu";

let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("SG_testData.json");

let _mockData = SIT ? testData.Alerts.SIT : testData.Alerts.UAT;
let _createAlertPage = _alertPagesListPage.createManageAlertPage;

describe("High Low Balance Alert", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("has high and low balance value", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
        await _createAlertPage.loadCondition();
        await _createAlertPage.createHLBalanceAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(_mockData.account2);
        await _createAlertPage.accountOption1.jsClick();
        let highBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.highThresholdInput.input(highBalanceText);
        let lowBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.lowThresholdInput.input(lowBalanceText);
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.sendEmail);
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
            await ensure(_createAlertPage.higLowSendTo).textContains(_mockData.sendEmail),
            await ensure(_createAlertPage.higLowThreshold).textContains(highBalanceText),
            await ensure(_createAlertPage.higLowThreshold).textContains(lowBalanceText)
        ]);
        await _createAlertPage.deleteHLBalanceAlerts.jsClick();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });

    it("has high and without low balance value", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
        await _createAlertPage.loadCondition();
        await _createAlertPage.createHLBalanceAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account1);
        await _createAlertPage.accountOption1.jsClick();
        let highBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.highThresholdInput.input(highBalanceText);
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.sendEmail);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await _createAlertPage.alertsFilter.input(highBalanceText);
        await _createAlertPage.showHLBalanceAlerts.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.higLowAccount1).textContains(_mockData.account1),
            await ensure(_createAlertPage.higLowSendTo).textContains(_mockData.sendEmail),
            await ensure(_createAlertPage.higLowThreshold).textContains(highBalanceText)
        ]);
        await _createAlertPage.deleteHLBalanceAlerts.jsClick();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });

    it("add new mobile", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
        await _createAlertPage.loadCondition();
        await _createAlertPage.createHLBalanceAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.account1);
        await _createAlertPage.accountOption1.jsClick();
        let highBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.highThresholdInput.input(highBalanceText);
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.sendEmail);
        await _createAlertPage.sendEmailOption1.jsClick();

        await _createAlertPage.isSendSMS.jsClick();
        await _createAlertPage.addNewMobile.jsClick();
        // await _createAlertPage.loadConditionCreatePage();
        let nickName = 'autoTestNewMobile' + generatedID();
        await _createAlertPage.nickname0.input(nickName);

        await _createAlertPage.countryCodeSelection.jsClick();
        await _createAlertPage.countryCodeSelection.input('+');
        await _createAlertPage.countryCodeOption0.jsClick();

        const _areaCode = _createAlertPage.getRandomNumbers(4);
        await _createAlertPage.areaCode0.input(_areaCode);
        const _mobileNumber = _createAlertPage.getRandomNumbers(8);
        await _createAlertPage.mobileNumber0.input(_mobileNumber);
        await _createAlertPage.saveAndCloseMobilButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.sendSmsSelection.jsClick();
        await _createAlertPage.search.input(nickName);
        await _createAlertPage.sendSmsOption0.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await _createAlertPage.alertsFilter.input(nickName);
        await _createAlertPage.showHLBalanceAlerts.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.MobilLigLowSendTo).textContains(nickName),
            await ensure(_createAlertPage.MobilLigLowSendTo).textContains(_mobileNumber),
        ]);
        await _createAlertPage.deleteHLBalanceAlerts.jsClick();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});

describe("Periodic Balance Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create Periodic Balance Alert", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
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
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.sendEmail);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
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
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create MT103 Advice Alert", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
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
        await _createAlertPage.alertPassword.input(_mockData.password);
        await _createAlertPage.alertConfirmPassword.jsClick();
        await _createAlertPage.alertConfirmPassword.input(_mockData.password);

        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.remittanceMT103AlertNums).textContains(nums),
        ]);
    });
});

describe("Payment Statuses Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create with checkbox all", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
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

        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);

        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        // const _filterKey = _mobileNumber;
        // await _createAlertPage.alertsFilter.input(_filterKey);
        // await _createAlertPage.showPaymentStatusAlertButton.jsClick();
        // await _createAlertPage.editPaymentStatusAlertButton.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.paymentStatusAlertNums).textContains(nums),
            // await _createAlertPage.isSendMobile.isElementSelected(),
            // await ensure(_createAlertPage.alertAccountMultiSelection).textContains(_mockData.account3),
            // await ensure(_createAlertPage.alertAccountMultiSelection).textContains(_mockData.account4),
            // await ensure(_createAlertPage.alertThresholdInput).textContains(alertBalanceText),
        ]);
    });

    it("create with checkbox single", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
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

        await _createAlertPage.alertCreateCheckbox.jsClick();

        let alertBalanceText = _createAlertPage.getRandomNumber(2);
        await _createAlertPage.alertThresholdInput.input(alertBalanceText);

        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.paymentStatusAlertNums).textContains(nums),
        ]);
    });
});

if (SIT) {
    describe("Fixed Deposit Maturity Alert", async function () {
        // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
        const suitObject = this;
        beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

        it("Create Fiexed Deposit Manturity Alert", async function () {
            await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
            await _createAlertPage.loadCondition();
            let nums = '';
            await _createAlertPage.fixedDepsAlertNums.getText().then(val => {
                let _val = val.trim();
                nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
            });

            await _createAlertPage.createFixedDepositAlertButton.jsClick();
            await _createAlertPage.loadConditionCreatePage();
            await _createAlertPage.alertAccountMultiSelection.jsClick();
            await _createAlertPage.search.input(_mockData.account3);
            await _createAlertPage.accountOption1.jsClick();
            await _createAlertPage.search.input(_mockData.account4);
            await _createAlertPage.accountOption1.jsClick();
            await _createAlertPage.beforeDate.input(_mockData.beforeDate);
            let currentDate = _createAlertPage.getCurrentDate();
            await _createAlertPage.startDate.select(currentDate);
            await _createAlertPage.submitButton.jsClick();
            await _createAlertPage.loadDialog();
            await _createAlertPage.dismissButton.jsClick();
            await _createAlertPage.loadCondition();

            await Promise.all([
                await ensure(_createAlertPage.fixedDepsAlertNums).textContains(nums),
            ]);
        });
    });
}

describe("Loans Overdue Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create Loans Overdue Alert", async function () {
        if (!SIT) {
            await new NavigatePages().loginCB(testData.Alerts.loansOverdueAlert.UAT.loginCompanyId, testData.Alerts.loansOverdueAlert.UAT.loginUserId);
        }
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
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
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.jsClick();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await Promise.all([
            await ensure(_createAlertPage.loansOverAlertNums).textContains(nums),
        ]);
    });
});

describe("Loans Payments Due Date Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create Loans Payments Due Date Alert", async function () {
        if (!SIT) {
            await new NavigatePages().loginCB(testData.Alerts.loansOverdueAlert.UAT.loginCompanyId, testData.Alerts.loansOverdueAlert.UAT.loginUserId);
        }
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
        await _createAlertPage.loadCondition();
        let nums = '';
        await _createAlertPage.loansPaymentsAlertNums.getText().then(val => {
            let _val = val.trim();
            nums = Number(_val.slice(1, _val.length - 1)) * 1 + 1 + '';
        });
        await _createAlertPage.createLoansPaymentsAlertButton.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account5 : testData.Alerts.loansOverdueAlert.UAT.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account6 : testData.Alerts.loansOverdueAlert.UAT.account2);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.beforeDate.input(_mockData.beforeDate);
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();

        await Promise.all([
            await ensure(_createAlertPage.loansPaymentsAlertNums).textContains(nums),
        ]);
    });
});

describe("Incoming Funds Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create Incoming Funds Alert", async function () {
        if (!SIT) {
            await new NavigatePages().loginCB(testData.Alerts.creditConfirmAlert.UAT.loginCompanyId, testData.Alerts.creditConfirmAlert.UAT.loginUserId);
        }
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
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
        await _createAlertPage.search.input(SIT ? _mockData.account7 : testData.Alerts.creditConfirmAlert.UAT.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account8 : testData.Alerts.creditConfirmAlert.UAT.account2);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.incomingFundsAlertGreaterInput.input('10');
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.select(currentDate);
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
    });
});

describe("Credit Confirmation Alert", async function () {
    // before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create Credit Confrimation Alert", async function () {
        if (!SIT) {
            await new NavigatePages().loginCB(testData.Alerts.creditConfirmAlert.UAT.loginCompanyId, testData.Alerts.creditConfirmAlert.UAT.loginUserId);
        }
        await _alertPagesListPage.openMenu(Menu.Alert.CreateManageAlerts);
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
        await _createAlertPage.search.input(SIT ? _mockData.account7 : testData.Alerts.creditConfirmAlert.UAT.account1);
        await _createAlertPage.accountOption1.jsClick();
        await _createAlertPage.search.input(SIT ? _mockData.account8 : testData.Alerts.creditConfirmAlert.UAT.account2);
        await _createAlertPage.accountOption1.jsClick();
        let currentDate = _createAlertPage.getCurrentDate();
        await _createAlertPage.startDate.jsClick();
        await _createAlertPage.startDate.select(currentDate);
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
    });
});
