/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';
import { AlertsPages } from "../../../pages/CB/Alert";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData("HK_testData.json");
let newPayeeFPSNickName = "";
let _alertPagesListPage = new AlertsPages();
let _alertNotificationsPage = _alertPagesListPage.alertNotificationsPage;


describe('HK FPS Beneficiary', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Beneficiary.SIT.loginCompanyId : testData.Beneficiary.UAT.loginCompanyId, SIT ? testData.Beneficiary.SIT.loginUserId : testData.Beneficiary.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a new FPS Payee - Mobile', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.Beneficiary);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.createNewPayee.click();
        await _PaymentsPages.BeneficiaryPage.payNowProxy.click();
        await _PaymentsPages.BeneficiaryPage.proxyTypeMobNum.input(testData.Beneficiary.proxyTypeMobNum);
        await _PaymentsPages.BeneficiaryPage.retrieveNameButton.click();
        newPayeeFPSNickName = 'FPSPayeeNickName' + generatedID();
        await _PaymentsPages.BeneficiaryPage.newPayNowNickName.input(newPayeeFPSNickName);
        await _PaymentsPages.BeneficiaryPage.payNowCanClick();
        await _PaymentsPages.BeneficiaryPage.submit.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newPayeeFPSNickName);

        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeNickName).textIs(newPayeeFPSNickName),
            await ensure(_PaymentsPages.BeneficiaryPage.centerMobileProxy).textContains(testData.Beneficiary.proxyTypeMobNum),
        ]);
    });

    // Make sure the case - 'Create a new FPS Payee - Mobile" is success and Proxy Payee Addition Alert is exist in Alerts
    it('Check the new FPS Payee Addition Alert', async function () {
        await _PaymentsPages.FPSPaymentPage.loadConditionOnAlertLink();
        await _PaymentsPages.FPSPaymentPage.readMessagesLink.jsClick();
        await _alertNotificationsPage.loadCondition();
        let currentData = moment(new Date()).format('DD-MMM-YYYY');
       //await _alertNotificationsPage.Filter.input(currentData);  
       await _alertNotificationsPage.Filter.input("PayNow payee Addition Alert");
       await _alertNotificationsPage.loadCondition();
       if (SIT) {
            await Promise.all([
                await ensure(_alertNotificationsPage.AlertDetails).isNotEmpty(),
            ]);
        } else {
            await Promise.all([
                await ensure(_alertNotificationsPage.AlertDetails).textContains(testData.Beneficiary.AlertDetails),
                await ensure(_alertNotificationsPage.AlertDetails).textContains(testData.Beneficiary.proxyTypeMobNum),
                await ensure(_alertNotificationsPage.AlertDetails).textContains(currentData),
            ]);
        }
    });

    it('Create a new FPS Payee - Email', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.Beneficiary);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.createNewPayee.click();
        await _PaymentsPages.BeneficiaryPage.payNowProxy.click();
        await _PaymentsPages.BeneficiaryPage.proxyEmailRadio.click();
        await _PaymentsPages.BeneficiaryPage.proxyEmailText.input(testData.Beneficiary.proxyTypeEmail);
        // await _PaymentsPages.BeneficiaryPage.proxyFasterIdRadio.click();
        // await _PaymentsPages.BeneficiaryPage.proxyFasterIdText.input(testData.Beneficiary.proxyTypeFasterID);
        await _PaymentsPages.BeneficiaryPage.retrieveNameButton.click();
        newPayeeFPSNickName = 'FPSPayeeNickName' + generatedID();
        await _PaymentsPages.BeneficiaryPage.newPayNowNickName.input(newPayeeFPSNickName);
        await _PaymentsPages.BeneficiaryPage.payNowCanClick();
        await _PaymentsPages.BeneficiaryPage.submit.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newPayeeFPSNickName);

        await Promise.all([
            await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeNickName).textIs(newPayeeFPSNickName),
            await ensure(_PaymentsPages.BeneficiaryPage.centerEmailProxy).textContains(testData.Beneficiary.proxyTypeEmail),
            //await ensure(_PaymentsPages.BeneficiaryPage.centerFasterIDProxy).textContains(testData.Beneficiary.proxyTypeFasterID),
        ]);
    });

    it('Delete the new FPS Payee as the above Created', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.Beneficiary);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newPayeeFPSNickName);
        await _PaymentsPages.BeneficiaryPage.loadConditionForDeletePayee();
        await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeViewEmail).textContains(testData.Beneficiary.proxyTypeEmail);
        await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeNickName).textIs(newPayeeFPSNickName);
        await _PaymentsPages.BeneficiaryPage.deleteNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.loadConditionForDeleteButton();
        await _PaymentsPages.BeneficiaryPage.confirmDelete.jsClick();
        await _PaymentsPages.BeneficiaryPage.loadConditionForDismissButton();
        await _PaymentsPages.BeneficiaryPage.dismiss.jsClick();
        await _PaymentsPages.BeneficiaryPage.loadConditionOnCreatePage();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newPayeeFPSNickName);

        await ensure(_PaymentsPages.BeneficiaryPage.beneficiaryResult).textIs(testData.Beneficiary.noData);
    });

    // Make sure the case - 'Delete the new FPS Payee as the above Created" is success and Proxy Payee Deletion  Alert is exist in Alerts
    //  skip this case first, will add a new ui case when new ui alert finished
   /* it.skip('Check the new FPS Payee Deletion Alert', async function () {
        await _PaymentsPages.FPSPaymentPage.readMessagesLink.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnMessages();
        await _PaymentsPages.FPSPaymentPage.firstMessagesLink.jsClick();
        let currentData = moment(new Date()).format('DD-MMM-YYYY');
        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.alertMessageValue).textContains(testData.Beneficiary.proxyTypeEmail),
            await ensure(_PaymentsPages.FPSPaymentPage.alertReceivedValue).textContains(currentData)
        ]);
    });*/
});