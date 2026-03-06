/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { ConfigurationsPages } from '../../../pages/SamUpgrade';
import { handlerCase, PROJECT_TYPE, generatedID,ensure } from '../../../lib';
import { browser } from 'protractor';

let _ConfigurationsPages = new ConfigurationsPages();
let testDataSAM = _ConfigurationsPages.fetchTestData('SAM_testData.json');
let cosName = '';

describe('Configuration-Class Of Service', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Class Of Service ', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.classofservicePage.toConfigurationLink.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.loadCondition();
        await _ConfigurationsPages.classofservicePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSAU);
        await _ConfigurationsPages.classofservicePage.submitAffiliate.click();
        await _ConfigurationsPages.classofservicePage.createCOSLink.click();
        cosName = testDataSAM.configurationParameter.COSName + generatedID();
        //cosName = testDataSAM.configurationParameter.COSName;
        await _ConfigurationsPages.classofservicePage.inputCOSName.input(cosName);
        await _ConfigurationsPages.classofservicePage.templateDualAuthCheckbox.jsClickIfExist();
        await _ConfigurationsPages.classofservicePage.fileUploadFTPCheckbox.jsClickIfExist();
        await _ConfigurationsPages.classofservicePage.fileUploadManualCheckbox.jsClickIfExist();
        await _ConfigurationsPages.classofservicePage.fileUploadReportCheckbox.jsClickIfExist();
        await _ConfigurationsPages.classofservicePage.SGAccountTransferCheckbox.jsClickIfExist();
        await _ConfigurationsPages.classofservicePage.SGBulkGIROCollection.jsClickIfExist();
        await _ConfigurationsPages.classofservicePage.SGBulkGIROCollectionDBSCheckbox.jsClickIfExist();
        await _ConfigurationsPages.classofservicePage.previewClassButton.click();
        await _ConfigurationsPages.classofservicePage.submitClassButton.click();
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _ConfigurationsPages.classofservicePage.toConfigurationLink.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.loadCondition();
        await _ConfigurationsPages.classofservicePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSAU);
        await _ConfigurationsPages.classofservicePage.submitAffiliate.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        if (await (_ConfigurationsPages.classofservicePage.COSToBeDeleteLink).isDisplayed()) {
            await _ConfigurationsPages.classofservicePage.PendingAddApproval.click();
            await _ConfigurationsPages.classofservicePage.approveClassButton.click();
        }
        //await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        if (await (_ConfigurationsPages.classofservicePage.COSToBeDeleteLink).isDisplayed()) {
            await _ConfigurationsPages.classofservicePage.COSToBeDeleteLink.click();
            await _ConfigurationsPages.classofservicePage.previewDeleteCOSButton.click();
            await _ConfigurationsPages.classofservicePage.deleteCOSButton.click();
        }
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.classofservicePage.toConfigurationLink.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.loadCondition();
        await _ConfigurationsPages.classofservicePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSAU);
        await _ConfigurationsPages.classofservicePage.submitAffiliate.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.PendingDeleteApproval.click();
        await _ConfigurationsPages.classofservicePage.approveClassButton.click();
    });

    //Add for DASB-16469
    it('Create New COS for Dubai', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.classofservicePage.toConfigurationLink.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.loadCondition();
        await _ConfigurationsPages.classofservicePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _ConfigurationsPages.classofservicePage.submitAffiliate.click();
        await _ConfigurationsPages.classofservicePage.createCOSLink.click();
        cosName = testDataSAM.configurationParameter.COSName + generatedID();
        await _ConfigurationsPages.classofservicePage.inputCOSName.input(cosName);
        await _ConfigurationsPages.classofservicePage.previewClassButton.click();
        await _ConfigurationsPages.classofservicePage.submitClassButton.click();
        await Promise.all([
            await ensure(_ConfigurationsPages.classofservicePage).isSAMSuccess(),
        ]);
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _ConfigurationsPages.classofservicePage.toConfigurationLink.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.loadCondition();
        await _ConfigurationsPages.classofservicePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _ConfigurationsPages.classofservicePage.submitAffiliate.click();
        if (await (_ConfigurationsPages.classofservicePage.COSToBeDeleteLink).isDisplayed()) {
            await _ConfigurationsPages.classofservicePage.PendingAddApproval.click();
            await _ConfigurationsPages.classofservicePage.approveClassButton.click();
        }
        await Promise.all([
            await ensure(_ConfigurationsPages.classofservicePage).isSAMSuccess(),
        ]);
        //Edit Cos
        if (await (_ConfigurationsPages.classofservicePage.COSToBeDeleteLink).isDisplayed()) {
            await _ConfigurationsPages.classofservicePage.COSToBeDeleteLink.click();
            await _ConfigurationsPages.classofservicePage.previewClassButton.click();
            await _ConfigurationsPages.classofservicePage.submitClassButton.click();
        }
        await Promise.all([
            await ensure(_ConfigurationsPages.classofservicePage).isSAMSuccess(),
        ]);
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.classofservicePage.toConfigurationLink.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.loadCondition();
        await _ConfigurationsPages.classofservicePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _ConfigurationsPages.classofservicePage.submitAffiliate.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.PendingModifyApproval.click();
        await _ConfigurationsPages.classofservicePage.approveClassButton.click();
        await Promise.all([
            await ensure(_ConfigurationsPages.classofservicePage).isSAMSuccess(),
        ]);
        //delete the COS
        if (await (_ConfigurationsPages.classofservicePage.COSToBeDeleteLink).isDisplayed()) {
            await _ConfigurationsPages.classofservicePage.COSToBeDeleteLink.click();
            await _ConfigurationsPages.classofservicePage.previewDeleteCOSButton.click();
            await _ConfigurationsPages.classofservicePage.deleteCOSButton.click();
        }
        await Promise.all([
            await ensure(_ConfigurationsPages.classofservicePage).isSAMSuccess(),
        ]);
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _ConfigurationsPages.classofservicePage.toConfigurationLink.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.loadCondition();
        await _ConfigurationsPages.classofservicePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _ConfigurationsPages.classofservicePage.submitAffiliate.click();
        await _ConfigurationsPages.classofservicePage.classOfServiceLink.click();
        await _ConfigurationsPages.classofservicePage.PendingDeleteApproval.click();
        await _ConfigurationsPages.classofservicePage.approveClassButton.click();
        await Promise.all([
            await ensure(_ConfigurationsPages.classofservicePage).isSAMSuccess(),
        ]);
    }); 
});   