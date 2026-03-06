/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, UserInfoMastHeadPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase, devWatch } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';

let _UserInfoMastHeadPages = new UserInfoMastHeadPages();
let testData = _UserInfoMastHeadPages.fetchTestData('SG_testData.json');

describe('Alert And Reminders', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.AlertReminders.SIT.loginCompanyId : testData.AlertReminders.UAT.loginCompanyId, SIT ? testData.AlertReminders.SIT.loginUserId : testData.AlertReminders.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    //let date = moment(new Date()).format('DD-MMM-YYYY');
    let date = moment().add(1, 'days').format('DD-MMM-YYYY');

    it('Create Pending Release Alert', async function () {
        let _viewAcct = SIT ? testData.AlertReminders.SIT.viewAcctSIT : testData.AlertReminders.UAT.viewAcctUAT;
        let _selectAcct = SIT ? testData.AlertReminders.SIT.selectedAccountSIT : testData.AlertReminders.UAT.selectedAccountUAT;
        await _UserInfoMastHeadPages.openMenu(Menu.UserInfoMastHead.AlertReminders);
        await _UserInfoMastHeadPages.alertRemindersPage.loadCondition();
        await _UserInfoMastHeadPages.alertRemindersPage.editAlertIfExist(testData.AlertReminders.viewTitle);
        await _UserInfoMastHeadPages.alertRemindersPage.loadConditionForPreview();
        await _UserInfoMastHeadPages.alertRemindersPage.selectedAccount.select(_selectAcct);
        await _UserInfoMastHeadPages.alertRemindersPage.thresholdValue.clean();
        await _UserInfoMastHeadPages.alertRemindersPage.thresholdValue.input(testData.AlertReminders.thresholdValue);
        await _UserInfoMastHeadPages.alertRemindersPage.startDate.input(date);
        await _UserInfoMastHeadPages.alertRemindersPage.submitPreviewButton.click();
        await _UserInfoMastHeadPages.alertRemindersPage.loadConditionForView();
        await _UserInfoMastHeadPages.alertRemindersPage.submitSubmitButton.click();
        await Promise.all([
            await ensure(_UserInfoMastHeadPages.alertRemindersPage).isI3Success(),//has success message.
        ]);
        await _UserInfoMastHeadPages.alertRemindersPage.loadCondition();
        await _UserInfoMastHeadPages.alertRemindersPage.alertList.selectAlert(testData.AlertReminders.viewTitle, _viewAcct);
        await _UserInfoMastHeadPages.alertRemindersPage.loadConditionForPreview();
        await _UserInfoMastHeadPages.alertRemindersPage.submitPreviewButton.click();
        await _UserInfoMastHeadPages.alertRemindersPage.loadConditionForView();
        await Promise.all([
            await ensure(_UserInfoMastHeadPages.alertRemindersPage.alertAcct).textContains(_viewAcct),
            await ensure(_UserInfoMastHeadPages.alertRemindersPage.viewThresholdValue).textContains(testData.AlertReminders.thresholdValue),
        ]);
    });
});
