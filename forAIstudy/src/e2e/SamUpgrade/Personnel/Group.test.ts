/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { PersonnelPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, generatedID, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _PersonnelPages = new PersonnelPages();
let testDataSAM = _PersonnelPages.fetchTestData('SAM_testData.json');
let GroupName = "";
let SecureMsgName = "";

describe('Personnel-Group', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Search Group', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _PersonnelPages.groupPage.topPersonnelLink.click();
        await _PersonnelPages.groupPage.groupLink.click();
        await _PersonnelPages.groupPage.loadCondition();
        await _PersonnelPages.groupPage.selectSearchBy.select(testDataSAM.personnelGroup.SearchByGroupName);
        await _PersonnelPages.groupPage.inputSearchFor.input(testDataSAM.personnelGroup.SearchForGroupName);
        await _PersonnelPages.groupPage.searchGroup.click();
        await ensure(_PersonnelPages.groupPage.firstGroupLink).textIs(testDataSAM.personnelGroup.SearchForGroupName);
        await _PersonnelPages.groupPage.firstGroupLink.click();
        await ensure(_PersonnelPages.groupPage.inputGroupName).textIs(testDataSAM.personnelGroup.SearchForGroupName);
    });
    it('Create Support Group', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _PersonnelPages.groupPage.topPersonnelLink.click();
        await _PersonnelPages.groupPage.groupLink.click();
        await _PersonnelPages.groupPage.loadCondition();
        await _PersonnelPages.groupPage.createSupportGroupLink.click();
        GroupName = testDataSAM.personnelGroup.GroupName + generatedID();
        await _PersonnelPages.groupPage.inputGroupName.input(GroupName);
        SecureMsgName = testDataSAM.personnelGroup.SecureMsgName + generatedID();
        await _PersonnelPages.groupPage.inputSecureMsgName.input(SecureMsgName);
        await _PersonnelPages.groupPage.continueButton.click();
        await _PersonnelPages.groupPage.previewGroupButton.click();
        await _PersonnelPages.groupPage.submitGroupButton.click();
        await _PersonnelPages.groupPage.groupLink.click();
        await _PersonnelPages.groupPage.selectSearchBy.select(testDataSAM.personnelGroup.SearchByGroupName);
        await _PersonnelPages.groupPage.inputSearchFor.input(GroupName);
        await _PersonnelPages.groupPage.searchGroup.click();
        await _PersonnelPages.groupPage.firstGroupLink.click();
        await ensure(_PersonnelPages.groupPage.inputGroupName).textIs(GroupName);
        await _PersonnelPages.groupPage.previewDeleteGroupButton.click();
        await _PersonnelPages.groupPage.submitDeleteGroupButton.click();
    });

    it('edit Support Group', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _PersonnelPages.groupPage.topPersonnelLink.click();
        await _PersonnelPages.groupPage.groupLink.click();
        await _PersonnelPages.groupPage.loadCondition();
        await _PersonnelPages.groupPage.groupLink.click();
        await _PersonnelPages.groupPage.selectSearchBy.select(testDataSAM.personnelGroup.SearchByGroupName);
        await _PersonnelPages.groupPage.inputSearchFor.input(testDataSAM.personnelGroup.TESTGroupName);
        await _PersonnelPages.groupPage.searchGroup.click();
        await _PersonnelPages.groupPage.firstGroupLink.click();
        await _PersonnelPages.groupPage.AccountCustomizeAccess.click();
        await _PersonnelPages.groupPage.PersonnelCustomizeAccess.click();
        await _PersonnelPages.groupPage.OperationCustomizeAccess.click();
        await _PersonnelPages.groupPage.ConfigurationCustomizeAccess.click();
        await _PersonnelPages.groupPage.editContinueBtn.click();
        await _PersonnelPages.groupPage.AddAccounts.click();
        await _PersonnelPages.groupPage.SearchSupportPersonActivity.click();
        await _PersonnelPages.groupPage.CreateMarketingMessage.click();
        await _PersonnelPages.groupPage.ModifyAlerts.click();
        await _PersonnelPages.groupPage.ViewTradeFinanceData.click();
        await _PersonnelPages.groupPage.editPreviewBtn.click();
        await _PersonnelPages.groupPage.editSubmitBtn.click();
        await _PersonnelPages.groupPage.selectSearchBy.select(testDataSAM.personnelGroup.SearchByGroupName);
        await _PersonnelPages.groupPage.inputSearchFor.input(testDataSAM.personnelGroup.TESTGroupName);
        await _PersonnelPages.groupPage.searchGroup.click();
        await _PersonnelPages.groupPage.firstGroupLink.click();
        await _PersonnelPages.groupPage.editContinueBtn.click();
        await Promise.all([
            ensure(_PersonnelPages.groupPage.AddAccounts).isNotSelected(),
            ensure(_PersonnelPages.groupPage.SearchSupportPersonActivity).isNotSelected(),
            ensure(_PersonnelPages.groupPage.CreateMarketingMessage).isNotSelected(),
            ensure(_PersonnelPages.groupPage.ModifyAlerts).isNotSelected(),
            ensure(_PersonnelPages.groupPage.ViewTradeFinanceData).isNotSelected(),
        ]);

        await _PersonnelPages.groupPage.AddAccounts.click();
        await _PersonnelPages.groupPage.SearchSupportPersonActivity.click();
        await _PersonnelPages.groupPage.CreateMarketingMessage.click();
        await _PersonnelPages.groupPage.ModifyAlerts.click();
        await _PersonnelPages.groupPage.ViewTradeFinanceData.click();
        await _PersonnelPages.groupPage.editPreviewBtn.click();
        await _PersonnelPages.groupPage.editSubmitBtn.click();
        await _PersonnelPages.groupPage.selectSearchBy.select(testDataSAM.personnelGroup.SearchByGroupName);
        await _PersonnelPages.groupPage.inputSearchFor.input(testDataSAM.personnelGroup.TESTGroupName);
        await _PersonnelPages.groupPage.searchGroup.click();
        await _PersonnelPages.groupPage.firstGroupLink.click();
        await _PersonnelPages.groupPage.AccountCustomizeAccess.click();
        await _PersonnelPages.groupPage.PersonnelCustomizeAccess.click();
        await _PersonnelPages.groupPage.OperationCustomizeAccess.click();
        await _PersonnelPages.groupPage.ConfigurationCustomizeAccess.click();
        await _PersonnelPages.groupPage.editContinueBtn.click();
        await Promise.all([
            ensure(_PersonnelPages.groupPage.AddAccounts).isSelected(),
            ensure(_PersonnelPages.groupPage.SearchSupportPersonActivity).isSelected(),
            ensure(_PersonnelPages.groupPage.CreateMarketingMessage).isSelected(),
            ensure(_PersonnelPages.groupPage.ModifyAlerts).isSelected(),
            ensure(_PersonnelPages.groupPage.ViewTradeFinanceData).isSelected(),
        ]);
    });

    it('List all support groups', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _PersonnelPages.groupPage.topPersonnelLink.click();
        await _PersonnelPages.groupPage.groupLink.click();
        await _PersonnelPages.groupPage.loadCondition();
        await _PersonnelPages.groupPage.listAllSupportGroupsLink.click();
        await ensure(_PersonnelPages.groupPage.groupNameLabel).isNotEmpty();
    });

    



});
