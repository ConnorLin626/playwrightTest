/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { ConfigurationsPages, OperationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE, generatedID, SIT } from '../../../lib';
import { browser } from 'protractor';
import * as moment from 'moment';

let _ConfigurationsPages = new ConfigurationsPages();
let _OperationsPages = new OperationsPages();
let testDataSAM = _ConfigurationsPages.fetchTestData('SAM_testData.json');
let descriptionName = '';
let HolidayName = "";
let affiliateName = '';
let currentDate = moment(new Date()).format('MM/DD');

describe('Configuration-System', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('System - Contact Info ', async function () {
        await new NavigatePages().loginNewSAM(SIT ? testDataSAM.loginSAMID.ASADM1 : testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.loadCondition();
        await _ConfigurationsPages.systemPage.contactInfoLink.click();
        await _ConfigurationsPages.systemPage.inputCity.input(testDataSAM.systemParameters.City);
        await _ConfigurationsPages.systemPage.previewInfoButton.click();
        await _ConfigurationsPages.systemPage.submitInfoButton.click();
        await _ConfigurationsPages.systemPage.contactInfoLink.click();
        await ensure(_ConfigurationsPages.systemPage.inputCity).textIs(testDataSAM.systemParameters.City);
    });

    it('System - Server Exit Urls ', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.serverExitUrlLink.click();
        await _ConfigurationsPages.systemPage.inputApplicationUrl.input(testDataSAM.systemParameters.ApplicationURL);
        await _ConfigurationsPages.systemPage.previewUrlButton.click();
        await _ConfigurationsPages.systemPage.submitUrlButton.click();
        await _ConfigurationsPages.systemPage.serverExitUrlLink.click();
        await ensure(_ConfigurationsPages.systemPage.inputApplicationUrl).textIs(testDataSAM.systemParameters.ApplicationURL);

    });

    it('System - Server Parameters ', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.serverParameterLink.click();
        await _ConfigurationsPages.systemPage.inputSAMTimeOut.input(testDataSAM.systemParameters.SAMTimeOut);
        await _ConfigurationsPages.systemPage.previewServerParamButton.click();
        await _ConfigurationsPages.systemPage.submitServerParamButton.click();
        await _ConfigurationsPages.systemPage.serverParameterLink.click();
        await ensure(_ConfigurationsPages.systemPage.inputSAMTimeOut).textIs(testDataSAM.systemParameters.SAMTimeOut);
    });

    it('System - Resources', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.resourcesLink.click();
        if (await (_ConfigurationsPages.systemPage.descriptionValue).isElementPresent()) {
            await _ConfigurationsPages.systemPage.descriptionValue.getText().then(text => {
                descriptionName = text.trim();
            });
            await _ConfigurationsPages.systemPage.inputResourceCriteria.input(descriptionName);
            await _ConfigurationsPages.systemPage.searchResourceButton.click();
            await ensure(_ConfigurationsPages.systemPage.descriptionValue).textContains(descriptionName);
        }

    });

    it('System - General Banking Parameters', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.generalBankingParametersLink.click();
        await _ConfigurationsPages.systemPage.inputAccountPurge.input(testDataSAM.systemParameters.AccountPurge);
        await _ConfigurationsPages.systemPage.previewGeneBnkParamButton.click();
        await _ConfigurationsPages.systemPage.submitGeneBnkParamButton.click();
        await _ConfigurationsPages.systemPage.generalBankingParametersLink.click();
        await ensure(_ConfigurationsPages.systemPage.inputAccountPurge).textIs(testDataSAM.systemParameters.AccountPurge);
    });

    it('System - Corporate Banking Parameters', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.corporateBankingParametersLink.click();
        await _ConfigurationsPages.systemPage.inputSwiftID.input(testDataSAM.systemParameters.SwiftID);
        await _ConfigurationsPages.systemPage.previewCorpBnkParamButton.click();
        await _ConfigurationsPages.systemPage.submitCorpBnkParamButton.click();
        await _ConfigurationsPages.systemPage.corporateBankingParametersLink.click();
        await ensure(_ConfigurationsPages.systemPage.inputSwiftID).textIs(testDataSAM.systemParameters.SwiftID);
    });

    it('System - Holiday Schedule', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.holidayScheduleLink.click();
        await _ConfigurationsPages.systemPage.createHolidayLink.click();
        HolidayName = testDataSAM.systemParameters.HolidayName + generatedID();
        await _ConfigurationsPages.systemPage.inputHolidayName.input(HolidayName);
        await _ConfigurationsPages.systemPage.holidayTypeRadioButton.click();
        await _ConfigurationsPages.systemPage.inputScheduleHolidayDate.input(currentDate);
        await _ConfigurationsPages.systemPage.previewHolidayScheduleButton.click();
        await _ConfigurationsPages.systemPage.submitHolidayScheduleButton.click();
        await _OperationsPages.schedulesPage.topOperationsLink.click();
        await _OperationsPages.schedulesPage.scheduleLink.click();
        await _OperationsPages.schedulesPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.schedulesPage.submitAffiliate.click();
        await _OperationsPages.schedulesPage.toHolidayScheduleLink.click();
        if (await (_ConfigurationsPages.systemPage.holidayToBeDeleteLink).isDisplayed()) {
            await _ConfigurationsPages.systemPage.holidayToBeDeleteLink.click();
            await _ConfigurationsPages.systemPage.previewDeleteHolidayButton.click();
            await _ConfigurationsPages.systemPage.deleteHolidayButton.click();
        }

    });

    it('System - Affiliate Personalities', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.affiliatePersonalitiesLink.click();
        await _ConfigurationsPages.systemPage.editAffiPersonalitiesLink.getText().then(text => {
            affiliateName = text.trim();
        });
        await _ConfigurationsPages.systemPage.editAffiPersonalitiesLink.click();
        await _ConfigurationsPages.systemPage.inputAffiliateDesc.input(testDataSAM.systemParameters.AffiliateDesc);
        await _ConfigurationsPages.systemPage.previewAffiliateButton.click();
        await _ConfigurationsPages.systemPage.submitAffiliateButton.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.affiliatePersonalitiesLink.click();
        await _ConfigurationsPages.systemPage.editAffiPersonalitiesLink.click();
        await ensure(_ConfigurationsPages.systemPage.inputAffiliateDesc).textIs(testDataSAM.systemParameters.AffiliateDesc);

    });

    it('System - Mobile Banking Parameters', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _ConfigurationsPages.systemPage.toConfigurationLink.click();
        await _ConfigurationsPages.systemPage.systemLink.click();
        await _ConfigurationsPages.systemPage.mobileBankingParameterLink.click();
        await _ConfigurationsPages.systemPage.inputMobileBrandingGroup.input(testDataSAM.systemParameters.MobileBrandingGroup);
        await _ConfigurationsPages.systemPage.previewMobileBnkParamButton.click();
        await _ConfigurationsPages.systemPage.submitMobileBnkParamButton.click();
        await _ConfigurationsPages.systemPage.mobileBankingParameterLink.click();
        await ensure(_ConfigurationsPages.systemPage.inputMobileBrandingGroup).textIs(testDataSAM.systemParameters.MobileBrandingGroup);
    });
});
