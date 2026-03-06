/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { ensure, handlerCase, SUSIT, SIT, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import { randomNumbers } from '../../../lib/utils'

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let salt = randomNumbers();
let userId;
describe('Edit User On Corporations', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Modify Corporations - Set EBBR ERP is Trusple', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        //AB-9366
        //edit CorporationsPages,Set EBBR ERP = Trusple
        await _CorporationsPages.corporationsPage.editCorpButton.click();
        //if(!_CorporationsPages.corporationsPage.ebbrFlag) await _CorporationsPages.corporationsPage.ebbrFlag.jsClickIfExist();//checked EBBR,how to check?
        await _CorporationsPages.corporationsPage.ebbrErp.select(testDataSAM.ebbrErp.Trusple);
        await _CorporationsPages.corporationsPage.previewGroupButton.click();
        await _CorporationsPages.corporationsPage.submitGroupButton.click();
    });

    it('New User and Edit new user entitlements', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.addUserButton.click();
        await _CorporationsPages.corporationsPage.newUserIdText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.hqAccessProfileText.input(testDataSAM.newUserValue.hqAccessProfileName);
        await _CorporationsPages.corporationsPage.newUserSelectCurrency.select(testDataSAM.newUserValue.currency);
        await _CorporationsPages.corporationsPage.newUserNameText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.newUserEmailText.input(testDataSAM.newUserValue.email);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.submitNewUserButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Limit
        await _CorporationsPages.corporationsPage.editLimitLink.click();
        await _CorporationsPages.corporationsPage.editLimitText.input(testDataSAM.paymentLimit.limitValue);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.submitNewUserButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Account
        await _CorporationsPages.corporationsPage.editNewUserAccountLink.click();
        await _CorporationsPages.corporationsPage.testAccountLink.click();
        await _CorporationsPages.corporationsPage.testPaymentElement.click();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await _CorporationsPages.corporationsPage.backNewUserButton.jsClick();
        //Data Services
        await _CorporationsPages.corporationsPage.dataServicesLink.click();
        await _CorporationsPages.corporationsPage.selectAllDataServicesLink.click();
        await _CorporationsPages.corporationsPage.submitDataServicesButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Functional Access
        await _CorporationsPages.corporationsPage.functionalAccessLink.click();
        await _CorporationsPages.corporationsPage.selectLink1.click();
        await _CorporationsPages.corporationsPage.selectLink2.click();
        await _CorporationsPages.corporationsPage.selectLink3.click();
        await _CorporationsPages.corporationsPage.selectLink4.click();
        await _CorporationsPages.corporationsPage.selectLink5.click();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Ideal Services Access
        await _CorporationsPages.corporationsPage.IdealAccessLink.click();
        await _CorporationsPages.corporationsPage.IdealServiceSelectAll.click();
        await _CorporationsPages.corporationsPage.selectWebCustody.click();
        await _CorporationsPages.corporationsPage.testIdealElement.click();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Done
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await ensure(_CorporationsPages.corporationsPage.userIdCheck).textIs("SAM" + salt);
        await ensure(_CorporationsPages.corporationsPage.userNameCheck).textIs("SAM" + salt);
        await _CorporationsPages.corporationsPage.checkLimitLink.click();
        await ensure(_CorporationsPages.corporationsPage.editLimitText).textIs(testDataSAM.paymentLimit.paymentLimitCheck);
        await _CorporationsPages.corporationsPage.cancelButton.jsClick();
        await _CorporationsPages.corporationsPage.checkIdealAccessLink.click();
        await _CorporationsPages.corporationsPage.ssmCheckBox.isElementSelected();
        await _CorporationsPages.corporationsPage.selectAlt.isElementSelected();
    });

    it('Approve New User', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //由于自动跑batch响应太慢，有时候等了十几秒状态还没有变成approved，因此循环检查几次状态
        await checkStatusLoop(3,"SAM" + salt);
        await ensure(_CorporationsPages.corporationsPage.approveNewUserLink).textContains(testDataSAM.status.Approved)
        // await ensure(_CorporationsPages.corporationsPage.approveNewUserLink).textContains(testDataSAM.status.Approved);
        await deleteApprovedUserViaId("SAM" + salt,testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
    });

    it('Modify User - Edit the function access', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.editUserLink.click();
        await _CorporationsPages.corporationsPage.editFunctionalLink.click();
        await _CorporationsPages.corporationsPage.modifyBeneficiaryAU.click();
        await _CorporationsPages.corporationsPage.previewBeneficiaryButton.click();
        await _CorporationsPages.corporationsPage.submitBeneficiaryButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    it('Modify User - Edit the account  access', async function () {
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.editUserLink.click();
        await _CorporationsPages.corporationsPage.editAccountLink.click();
        await _CorporationsPages.corporationsPage.modifyAccountFirst.click();
        await _CorporationsPages.corporationsPage.modifyPaymentsFirst.click();
        await _CorporationsPages.corporationsPage.previewAccountServiceButton.click();
        await _CorporationsPages.corporationsPage.submitAccountServiceButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    it('Approve User By Clicking into UserID Hyperlink ', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.approveUserLink.click();
        await _CorporationsPages.corporationsPage.submitApproveUserButton.click();
        if (!SUSIT) {
            await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
            await ensure(_CorporationsPages.corporationsPage.approveUserValue).textIs(testDataSAM.status.Approved);
        }


    });

    //add for AB-9196: check entitlement template will not ticked Audit Confirmations
    it('Modify User - Edit the function access - check entitlement template', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.filerUsers.input(SIT ? testDataSAM.filerUser.SIT.SGuser : testDataSAM.filerUser.UAT.SGuser);
        await _CorporationsPages.corporationsPage.editUserLink.jsClick();
        await _CorporationsPages.corporationsPage.editFunctionalLink.click();
        await _CorporationsPages.corporationsPage.fliterTemplate.select(testDataSAM.filerUser.enquiryOpetion);
        await ensure(_CorporationsPages.corporationsPage.confirmations).isNotSelected();
        // await _CorporationsPages.corporationsPage.fliterTemplate.select(testDataSAM.filerUser.withApproveOwnOpetion);
        // await ensure(_CorporationsPages.corporationsPage.confirmations).isNotSelected();
        // await _CorporationsPages.corporationsPage.fliterTemplate.select(testDataSAM.filerUser.withoutApproveOwnOpetion);
        // await ensure(_CorporationsPages.corporationsPage.confirmations).isNotSelected();
    });
    // Add for DASB-16469
    it('New User and Edit new user entitlements for DUBAI', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSDUBAI);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMDUBAIAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.addUserButton.click();
        await _CorporationsPages.corporationsPage.newUserIdText.input("DUBAIAUTO" + salt);
        await _CorporationsPages.corporationsPage.hqAccessProfileText.input(testDataSAM.newUserValue.hqAccessProfileName);
        await _CorporationsPages.corporationsPage.newUserSelectCurrency.select(testDataSAM.newUserValue.currency);
        await _CorporationsPages.corporationsPage.newUserNameText.input("DUBAIAUTO" + salt);
        await _CorporationsPages.corporationsPage.newUserEmailText.input(testDataSAM.newUserValue.email);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.submitNewUserButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Account
        await _CorporationsPages.corporationsPage.editNewUserAccountLink.click();
        await _CorporationsPages.corporationsPage.testAccountLink.click();
        await _CorporationsPages.corporationsPage.userAccountAccess.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await _CorporationsPages.corporationsPage.backNewUserButton.jsClick();
        //Functional Access
        await _CorporationsPages.corporationsPage.functionalAccessLink.click();
        await _CorporationsPages.corporationsPage.selectLink1.click();
        await _CorporationsPages.corporationsPage.selectLink2.click();
        await _CorporationsPages.corporationsPage.selectLink4.click();
        await _CorporationsPages.corporationsPage.selectLink5.click();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Done
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("DUBAIAUTO" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await ensure(_CorporationsPages.corporationsPage.userIdCheck).textIs("DUBAIAUTO" + salt);
        await ensure(_CorporationsPages.corporationsPage.userNameCheck).textIs("DUBAIAUTO" + salt);

    });

    it('New User with Supplier hub', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.addUserButton.click();
        await _CorporationsPages.corporationsPage.newUserIdText.input("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.hqAccessProfileText.input(testDataSAM.newUserValue.hqAccessProfileName);
        await _CorporationsPages.corporationsPage.newUserSelectCurrency.select(testDataSAM.newUserValue.currency);
        await _CorporationsPages.corporationsPage.newUserNameText.input("SUPPLIER" + salt); 
        await _CorporationsPages.corporationsPage.newUserEmailText.input(testDataSAM.newUserValue.email);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.submitNewUserButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Ideal Services Access
        await _CorporationsPages.corporationsPage.IdealAccessLink.click();
        await _CorporationsPages.corporationsPage.selectSupplierHub.click();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Done
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await ensure(_CorporationsPages.corporationsPage.userIdCheck).textIs("SUPPLIER" + salt);
        await ensure(_CorporationsPages.corporationsPage.userNameCheck).textIs("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.checkIdealAccessLink.click();
        await _CorporationsPages.corporationsPage.selectSupplierHub.isElementSelected();
    });

    it('Approve New supplier hub User', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //由于自动跑batch响应太慢，有时候等了十几秒状态还没有变成approved，因此循环检查几次状态
        await checkStatusLoop(2,"SUPPLIER" + salt);
        await ensure(_CorporationsPages.corporationsPage.approveNewUserLink).textContains(testDataSAM.status.Approved);
    });

    it('Delete New User', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await _CorporationsPages.corporationsPage.removeUser.click();
        await _CorporationsPages.corporationsPage.preRemoveUser.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage.approveNewUserLink).textContains(testDataSAM.status.PendingDeleteApproval);
    });

    it('Approve delete User', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SUPPLIER" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage.noUserRecord).textContains("No Users");
    });

    //Add for IDXP-1314
    it('New User with Web Custody and SSM maker then can not submit', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate4);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.addUserButton.click();
        userId = "SSM" + salt
        await _CorporationsPages.corporationsPage.newUserIdText.input(userId);
        await _CorporationsPages.corporationsPage.hqAccessProfileText.input(testDataSAM.newUserValue.hqAccessProfileName);
        await _CorporationsPages.corporationsPage.newUserSelectCurrency.select(testDataSAM.newUserValue.currency);
        await _CorporationsPages.corporationsPage.newUserNameText.input("SSM" + salt);
        await _CorporationsPages.corporationsPage.newUserEmailText.input(testDataSAM.newUserValue.email);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.submitNewUserButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Ideal Services Access
        await _CorporationsPages.corporationsPage.IdealAccessLink.click();
        await _CorporationsPages.corporationsPage.selectWebCustody.click();
        await _CorporationsPages.corporationsPage.showSSM.jsClick();
        await _CorporationsPages.corporationsPage.ssmView.jsClick();
        await _CorporationsPages.corporationsPage.ssmAdminMaker.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage.errorMessage).textContains("SSM and Digital Custody entitlement unable to coexist together");
        //to approve this user
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate4);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userId);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await browser.sleep(15000);
        //to delete this user
        await deleteApprovedUserViaId(userId, testDataSAM.searchAffiliateValue.SAMSGAffiliate4);
    });

    it('Edit User with Web Custody and SSM approver then can not submit', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate4);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.editUserLink.click();
        //Ideal Services Access
        await _CorporationsPages.corporationsPage.editPageIdealAccessLink.click();
        await _CorporationsPages.corporationsPage.selectWebCustody.click();
        await _CorporationsPages.corporationsPage.showSSM.jsClick();
        await _CorporationsPages.corporationsPage.ssmView.jsClick();
        await _CorporationsPages.corporationsPage.ssmAdminApprover.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage.errorMessage).textContains("SSM and Digital Custody entitlement unable to coexist together");
    });

    //Add for idxp-1172
    //Jenkins timeout, so split into 3 cases
    it('Copy user from HQ user copy SC entitlement to new HQ user - copy user', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate2);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(testDataSAM.copyUserId.userId01);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await _CorporationsPages.corporationsPage.copyBtn.click();
        await _CorporationsPages.corporationsPage.copySubCompanyEntitlements.jsClick();
        userId = "SAMCOPY" + salt;
        await _CorporationsPages.corporationsPage.newUserIdText.input(userId);
        await _CorporationsPages.corporationsPage.newUserNameText.input(userId+"Name");
        await _CorporationsPages.corporationsPage.newUserEmailText.input(testDataSAM.newUserValue.email);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.copySubmitBtn.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userId);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        //HQ Functional Access then approve will not show error
        await _CorporationsPages.corporationsPage.editPageFunctionAccessLink.click();
        await _CorporationsPages.corporationsPage.selectLink1.click();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitNewUserButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    it('Copy user from HQ user copy SC entitlement to new HQ user - approve user', async function () {
        //to approve this user
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate2);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userId);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await checkStatusLoop(3,userId);
    });

    it('Copy user from HQ user copy SC entitlement to new HQ user - check SC entitlements', async function () {
        //to check the SC entitlements
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate2);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();

        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userId);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check Account services
        await _CorporationsPages.corporationsPage.subAccountServicesLink.jsClick();
        await ensure(_CorporationsPages.corporationsPage.accountAccessCheck).textContains("Full")
        await _CorporationsPages.corporationsPage.backFromEditUserBtn.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check Data service
        await _CorporationsPages.corporationsPage.subDataServiceLink.jsClick();
        await ensure(_CorporationsPages.corporationsPage.liquidityManagementReportCheck).isSelected();
        await ensure(_CorporationsPages.corporationsPage.servDetailsCheck).isSelected();
        await _CorporationsPages.corporationsPage.backFromEditUserBtn.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check functional access
        await _CorporationsPages.corporationsPage.subFunctionAccessLink.jsClick();
        //Due to IDXP-2100,SG CCH has been removed
        //await ensure(_CorporationsPages.corporationsPage.corporateCheque).isSelected();
        await ensure(_CorporationsPages.corporationsPage.globeSendTransfer).isSelected();
        await ensure(_CorporationsPages.corporationsPage.GIROPayrollDBSPayment).isSelected();
        await ensure(_CorporationsPages.corporationsPage.GIROBulkPaymentDBS).isSelected();
        await ensure(_CorporationsPages.corporationsPage.GIROBulkCollectionDBS).isSelected();
        await ensure(_CorporationsPages.corporationsPage.paymentReports).isSelected();
        await ensure(_CorporationsPages.corporationsPage.uploads).isSelected();
        await ensure(_CorporationsPages.corporationsPage.merchantPortal).isSelected();
        await ensure(_CorporationsPages.corporationsPage.fileExchangeCtoC).isSelected();
        await ensure(_CorporationsPages.corporationsPage.accountBalanceEnquiry).isSelected();
        await ensure(_CorporationsPages.corporationsPage.acccountSatementView).isSelected();
        await ensure(_CorporationsPages.corporationsPage.acccountSatementReportView).isSelected();
        await _CorporationsPages.corporationsPage.backFromEditUserBtn.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check ideal service access
        await _CorporationsPages.corporationsPage.subIdealAccessLink.jsClick();
        //await ensure(_CorporationsPages.corporationsPage.merchantPortal).isSelected();
        await ensure(_CorporationsPages.corporationsPage.ctcp).isSelected();
        // //to delete this user
        await deleteApprovedUserViaId(userId,testDataSAM.searchAffiliateValue.SAMSGAffiliate2);

    });

    it('Copy HQ user from SC user copy SC entitlement to existing HQ user', async function () {
        //copy empty sub access
        this.timeout(420000);
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate2);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(testDataSAM.copyUserId.userId03);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await _CorporationsPages.corporationsPage.copyBtn.click();
        await browser.sleep(3000);
        await _CorporationsPages.corporationsPage.copySubCompanyEntitlements.jsClick();
        await _CorporationsPages.corporationsPage.copyToBtn.select(testDataSAM.copyUserId.userId04);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.copyToSubmitBtn.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();   
        //to approve this user
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate2);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(testDataSAM.copyUserId.userId04);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //由于自动跑batch响应太慢，有时候等了十几秒状态还没有变成approved，因此循环检查几次状态
        await checkStatusLoop(4,testDataSAM.copyUserId.userId04);
        //copy sub access
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate3);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(testDataSAM.copyUserId.userId02);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await _CorporationsPages.corporationsPage.copyBtn.click();
        await _CorporationsPages.corporationsPage.copyToBtn.select(testDataSAM.copyUserId.userId04);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.copyToSubmitBtn.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();  
        //to approve this user
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate2);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(testDataSAM.copyUserId.userId04);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //由于自动跑batch响应太慢，有时候等了十几秒状态还没有变成approved，因此循环检查几次状态
        await checkStatusLoop(4,testDataSAM.copyUserId.userId04);
        //to check the SC entitlements
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check Account services
        await _CorporationsPages.corporationsPage.subAccountServicesLink.jsClick();
        await ensure(_CorporationsPages.corporationsPage.accountAccessCheck).textContains("Full")
        await _CorporationsPages.corporationsPage.backFromEditUserBtn.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check Data service
        await _CorporationsPages.corporationsPage.subDataServiceLink.jsClick();
        await ensure(_CorporationsPages.corporationsPage.liquidityManagementReportCheck).isSelected();
        await ensure(_CorporationsPages.corporationsPage.servDetailsCheck).isSelected();
        await _CorporationsPages.corporationsPage.backFromEditUserBtn.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check functional access
        await _CorporationsPages.corporationsPage.subFunctionAccessLink.jsClick();
        //Due to IDXP-2100,SG CCH has been removed
        //await ensure(_CorporationsPages.corporationsPage.corporateCheque).isSelected();
        await ensure(_CorporationsPages.corporationsPage.globeSendTransfer).isSelected();
        await ensure(_CorporationsPages.corporationsPage.GIROPayrollDBSPayment).isSelected();
        await ensure(_CorporationsPages.corporationsPage.GIROBulkPaymentDBS).isSelected();
        await ensure(_CorporationsPages.corporationsPage.GIROBulkCollectionDBS).isSelected();
        await ensure(_CorporationsPages.corporationsPage.paymentReports).isSelected();
        await ensure(_CorporationsPages.corporationsPage.uploads).isSelected();
        await ensure(_CorporationsPages.corporationsPage.merchantPortal).isSelected();
        await ensure(_CorporationsPages.corporationsPage.fileExchangeCtoC).isSelected();
        await ensure(_CorporationsPages.corporationsPage.accountBalanceEnquiry).isSelected();
        await ensure(_CorporationsPages.corporationsPage.acccountSatementView).isSelected();
        await ensure(_CorporationsPages.corporationsPage.acccountSatementReportView).isSelected();
        await _CorporationsPages.corporationsPage.backFromEditUserBtn.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check ideal service access
        await _CorporationsPages.corporationsPage.subIdealAccessLink.jsClick();
        //await ensure(_CorporationsPages.corporationsPage.merchantPortal).isSelected();
        await ensure(_CorporationsPages.corporationsPage.ctcp).isSelected();
    });

    //add for IEBAA-3595
    it('New User & Approve Pending Add Subscriber user', async function () {
        salt = randomNumbers()
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.addUserButton.click();
        await _CorporationsPages.corporationsPage.newUserIdText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.hqAccessProfileText.input(testDataSAM.newUserValue.hqAccessProfileName);
        await _CorporationsPages.corporationsPage.newUserSelectCurrency.select(testDataSAM.newUserValue.currency);
        await _CorporationsPages.corporationsPage.newUserNameText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.newUserEmailText.input(testDataSAM.newUserValue.email);
        await _CorporationsPages.corporationsPage.previewNewUserButton.jsClick();
        await _CorporationsPages.corporationsPage.submitNewUserButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Functional Access
        await _CorporationsPages.corporationsPage.functionalAccessLink.click();
        await _CorporationsPages.corporationsPage.selectLink1.click();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        //Done
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.approveNewUserLink.click();
        await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await browser.sleep(10000);
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input("SAM" + salt);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage.approveNewUserLink).textContains(testDataSAM.status.Approved);
        await deleteApprovedUserViaId("SAM" + salt,testDataSAM.searchAffiliateValue.SAMSGAffiliate5);
    });

});

export async function deleteApprovedUserViaId(userId: string, companyId: string) {
    await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM1);
    await _CorporationsPages.corporationsPage.topCorporationsLink.click();
    await _CorporationsPages.corporationsPage.loadCorporationCondition();
    await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
    await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
    await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
    await _CorporationsPages.corporationsPage.inputAffiliate.input(companyId);
    await _CorporationsPages.corporationsPage.searchCorpButton.click();
    await _CorporationsPages.corporationsPage.viewCorpLink.click();
    await _CorporationsPages.corporationsPage.userTab.click();
    await _CorporationsPages.corporationsPage.userIdText.input(userId);
    await _CorporationsPages.corporationsPage.submitButton.jsClick();
    await _CorporationsPages.corporationsPage.newUserDetailLink.click();
    await _CorporationsPages.corporationsPage.removeUser.click();
    await _CorporationsPages.corporationsPage.preRemoveUser.jsClick();

    await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
    await _CorporationsPages.corporationsPage.topCorporationsLink.click();
    await _CorporationsPages.corporationsPage.loadCorporationCondition();
    await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
    await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
    await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
    await _CorporationsPages.corporationsPage.inputAffiliate.input(companyId);
    await _CorporationsPages.corporationsPage.searchCorpButton.click();
    await _CorporationsPages.corporationsPage.viewCorpLink.click();
    await _CorporationsPages.corporationsPage.userTab.click();
    await _CorporationsPages.corporationsPage.userIdText.input(userId);
    await _CorporationsPages.corporationsPage.submitButton.jsClick();
    await _CorporationsPages.corporationsPage.approveNewUserLink.click();
    await _CorporationsPages.corporationsPage.approveNewUserSubmitButton.jsClick();   
}

export async function checkStatusLoop(checkTimes: number,userId: string) {
    while(checkTimes > 0){
        await browser.sleep(10000);
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userId);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        console.log("checkTimes:"+checkTimes);
        let text = await _CorporationsPages.corporationsPage.approveNewUserLink.getText();
        console.log(text);
        if(text.includes("Approved")){
            checkTimes = 0;
        }else{
            checkTimes --;
        }
    }
}

