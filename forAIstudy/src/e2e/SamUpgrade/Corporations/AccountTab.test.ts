/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import { findAll, find, randomNumbers } from '../../../lib/utils'

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let salt = randomNumbers();
let accountNumber = randomNumbers() + salt;
let index = 0;

describe('Account Tab', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Enroll New Account', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.accountTabLink.click();
        let accountLength1 = await findAll('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr').count();
        await _CorporationsPages.corporationsPage.enrollAccountLink.click();
        await _CorporationsPages.corporationsPage.enrollAccountNumber.input(accountNumber);
        await _CorporationsPages.corporationsPage.enrollAccountName.input(testDataSAM.newAccountValue.accountName + salt);
        await _CorporationsPages.corporationsPage.addressLine1.input(testDataSAM.newAccountValue.addressLine1);
        await _CorporationsPages.corporationsPage.addressLine2.input(testDataSAM.newAccountValue.addressLine2);
        await _CorporationsPages.corporationsPage.addressLine3.input(testDataSAM.newAccountValue.addressLine3);
        await _CorporationsPages.corporationsPage.organisationId.input(testDataSAM.newAccountValue.organisationId);
        await _CorporationsPages.corporationsPage.organisationCode.input(testDataSAM.newAccountValue.organisationCode);
        await _CorporationsPages.corporationsPage.organisationName.input(testDataSAM.newAccountValue.organisationName);
        await _CorporationsPages.corporationsPage.enrollSelectCurrency.select(testDataSAM.newAccountValue.currency);
        //input swift bic
        await _CorporationsPages.corporationsPage.enrollSwiftBic.input(testDataSAM.newAccountValue.swiftBicCode);
        // //search and add swift bic
        // await _CorporationsPages.corporationsPage.searchBankButton.jsClick();
        // await _CorporationsPages.corporationsPage.fiIdTypeEnumValue.select(testDataSAM.newAccountValue.bankIdType);
        // await _CorporationsPages.corporationsPage.enrollSwiftBic.input(testDataSAM.newAccountValue.swiftBicCode);
        // await _CorporationsPages.corporationsPage.searchBankSubmitButton.jsClick();
        // await _CorporationsPages.corporationsPage.bankLink.click();
        // await _CorporationsPages.corporationsPage.searchBankAddButton.jsClick();
        // await _CorporationsPages.corporationsPage.fiIdTypeEnumValue.select(testDataSAM.newAccountValue.bankIdType);
        // await _CorporationsPages.corporationsPage.enrollProduct.select(SIT ? testDataSAM.newAccountValue.SIT.enrollProduct : testDataSAM.newAccountValue.UAT.enrollProduct);
        await _CorporationsPages.corporationsPage.enrollPreviewButton.jsClick();
        await _CorporationsPages.corporationsPage.enrollSubmitButton.jsClick();
        await _CorporationsPages.corporationsPage.previewAccountButton.jsClick();
        await _CorporationsPages.corporationsPage.submitAccountButton.jsClick();
        let accountLength = await findAll('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr').count();
        let flag = true;
        for (let i = accountLength - 3; i > 0; i--) {
            let statusText = '';
            let accountNumberText = ''
            await find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + i + ']/td[9]').getText().then(text => {
                statusText = text.trim();
            });
            await find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + i + ']/td[1]/a/span').getText().then(text => {
                accountNumberText = text.trim();
            });
            if (accountNumberText === accountNumber && statusText === testDataSAM.status.PendingAddApproval) {
                flag = false;
                index = i;
                break;
            }
        }
        if (flag) {
            throw new Error('Enroll new account error.');
        }
    });

    it('Approve New Account', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.accountTabLink.click();
        let accountLength = await findAll('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr').count();
        let _element = find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + index + ']/td[9]');
        await _element.click();
        await _CorporationsPages.corporationsPage.apporveAccountButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        let statusText = '';
        await _element.getText().then(text => {
            statusText = text.trim();
        });
        if (statusText !== testDataSAM.status.Approved) {
            throw new Error('Approve new account error.');
        }
    });

    it('Delete New Account', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.accountTabLink.click();
        await _CorporationsPages.corporationsPage.AccountText.input(accountNumber);
        await _CorporationsPages.corporationsPage.searchAccButton.jsClick();
        await _CorporationsPages.corporationsPage.AccounNumtLink.jsClick();
        // let accountLength = await findAll('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr').count();
        // let _element1 = find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + index + ']/td[1]');
        // await devWatch();
        // await _element1.click();
        // //await find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + index + ']/td[1]').click();
        await _CorporationsPages.corporationsPage.deletePreviewAccountButton.jsClick();
        await _CorporationsPages.corporationsPage.deleteAccountButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.accountTabLink.click();
        await _CorporationsPages.corporationsPage.AccountText.input(accountNumber);
        await _CorporationsPages.corporationsPage.searchAccButton.jsClick();
        await _CorporationsPages.corporationsPage.AccountStaLink.jsClick();
        //await find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + index + ']/td[9]').click();
        await _CorporationsPages.corporationsPage.apporveAccountButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    // Add for DASB-16469
    it('Create New Account for Japan', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSJP);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMJPAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.accountTabLink.click();
        let accountLength1 = await findAll('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr').count();
        await _CorporationsPages.corporationsPage.enrollAccountLink.click();
        await _CorporationsPages.corporationsPage.enrollAccountNumber.input(accountNumber);
        await _CorporationsPages.corporationsPage.enrollAccountName.input(testDataSAM.newAccountValue.accountName + salt);
        await _CorporationsPages.corporationsPage.addressLine1.input(testDataSAM.newAccountValue.addressLine1);
        //input swift bic
        await _CorporationsPages.corporationsPage.enrollSwiftBic.input(testDataSAM.newAccountValue.swiftBicCodeJP);
        await _CorporationsPages.corporationsPage.enrollPreviewButton.jsClick();
        await _CorporationsPages.corporationsPage.enrollSubmitButton.jsClick();
        await _CorporationsPages.corporationsPage.previewAccountButton.jsClick();
        await _CorporationsPages.corporationsPage.submitAccountButton.jsClick();
        let accountLength = await findAll('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr').count();
        let flag = true;
        for (let i = accountLength - 3; i > 0; i--) {
            let statusText = '';
            let accountNumberText = ''
            await find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + i + ']/td[9]').getText().then(text => {
                statusText = text.trim();
            });
            await find('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[' + i + ']/td[1]/a/span').getText().then(text => {
                accountNumberText = text.trim();
            });
            if (accountNumberText === accountNumber && statusText === testDataSAM.status.PendingAddApproval) {
                flag = false;
                index = i;
                break;
            }
        }
        if (flag) {
            throw new Error('Enroll new account error.');
        }
        //reject the account to reduce account data
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSJP);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMJPAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.accountTabLink2.jsClick();
        const currentElement = findAll('//*[contains(@href,"/samweb/csr/common/corp/corporationEditComprehensiveView/approveAccount") and contains(text(),"Pending Add Approval")]').get(0);
        await currentElement.click();
        await _CorporationsPages.corporationsPage.rejectBtn.click();
        await _CorporationsPages.corporationsPage.accountTabLink2.jsClick();
    });
});