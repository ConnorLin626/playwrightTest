/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { ReportsPages,UsersPages } from '../../../pages/SSM';
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment"

let _ReportsPages = new ReportsPages();
let _UsersPages = new UsersPages();
let testData = _ReportsPages.fetchTestData('SSM_testData.json');
let reportName = '';
let reportName1 = '';
let comRepName = '';
let userSetupRepoName='';
let currentDate = moment(new Date()).format("DD MMM YYYY");

describe('Report tab', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginSSM(SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId, SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

    it('Create IDEAL Authorisation Policy Report', async function () {
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.authPolicyCreate.click();
        await _ReportsPages.reportsPage.loadCondition();
        reportName = "authpolicy" + generatedID();
        await _ReportsPages.reportsPage.reportName.input(reportName);
        await _ReportsPages.reportsPage.orgSelect.select(testData.Reports.organisation);
        await _ReportsPages.reportsPage.product.jsClick();
        await _ReportsPages.reportsPage.paymentSelect.jsClick();
        await _ReportsPages.reportsPage.payeeCategories.click();
        await _ReportsPages.reportsPage.payeeCategoriesValue.jsClick();
        await _ReportsPages.reportsPage.paymentDate.click();
        await _ReportsPages.reportsPage.paymentDate.select(currentDate);
        await _ReportsPages.reportsPage.password.input(testData.Reports.password);
        await _ReportsPages.reportsPage.remarks.input(testData.Reports.remarks);
        await _ReportsPages.reportsPage.saveBtn.click();
        await _ReportsPages.reportsPage.loadConditionForSubmit();
        await _ReportsPages.reportsPage.submitBtn.click();
        await ensure(_ReportsPages.reportsPage.successfulMsg).textContains(testData.Reports.successfulMsg)
        await _ReportsPages.reportsPage.finishBtn.click();
        await _ReportsPages.reportsPage.reportFilter.input(reportName);
        await _ReportsPages.reportsPage.showReport.jsClick();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.reportNameLink).textContains(reportName)
        ]);
        await _ReportsPages.reportsPage.showReportDetail.jsClick();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.reportDetail).textContains(testData.Reports.paymentType),
            await ensure(_ReportsPages.reportsPage.remarkValue).textContains(testData.Reports.remarks)
        ]);
    })

    it('Modify IDEAL Authorisation Policy Report', async function () {
        await _UsersPages.UsersPage.dashboardButton.click();
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.showReport.jsClick();
        if(0!==reportName.trim().length){
            await _ReportsPages.reportsPage.reportFilter.input(reportName);
        }else{
            await _ReportsPages.reportsPage.reportFilter.input(testData.Reports.reportName);
        }
        await _ReportsPages.reportsPage.actionBtn.click();
        await _ReportsPages.reportsPage.modifyBtn.jsClick();
        await _ReportsPages.reportsPage.reportName.getText().then(text => {
            reportName = text.trim();
        });
        await _ReportsPages.reportsPage.loadConditionForModify();
        await _ReportsPages.reportsPage.product.click();
        await _ReportsPages.reportsPage.paymentSelect1.jsClick();
        await _ReportsPages.reportsPage.password.click();
        await _ReportsPages.reportsPage.password.input(testData.Reports.password);
        await _ReportsPages.reportsPage.saveBtn.click();
        await _ReportsPages.reportsPage.submitBtn.click();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.successfulMsg).textContains(testData.Reports.modifySuccessful)
        ]);
        await _ReportsPages.reportsPage.finishBtn.click();
        await _ReportsPages.reportsPage.reportFilter.input(reportName);
        await _ReportsPages.reportsPage.showReport.jsClick();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.reportNameLink).textContains(reportName)
        ]);
        await _ReportsPages.reportsPage.showReportDetail.jsClick();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.reportDetail).textContains(testData.Reports.paymentType),
            await ensure(_ReportsPages.reportsPage.reportDetail).textContains(testData.Reports.paymentType1),
        ]);
    })

    it('Publish IDEAL Authorisation Policy Report', async function () {
        await _UsersPages.UsersPage.dashboardButton.click();
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.showReport.jsClick();
        if(0!==reportName.trim().length){
            await _ReportsPages.reportsPage.reportFilter.input(reportName);
        }else{
            await _ReportsPages.reportsPage.reportFilter.input(testData.Reports.reportName);
        }

        await _ReportsPages.reportsPage.reportNameLink.getText().then(text => {
            reportName = text.trim();
        });
        await _ReportsPages.reportsPage.actionBtn.click();
        await _ReportsPages.reportsPage.publishBtn.click();
        await _ReportsPages.reportsPage.publishConfirmBtn.click();
        await _ReportsPages.reportsPage.dismissBtn.click();
        await _ReportsPages.reportsPage.publishTabBtn.click();
        await _ReportsPages.reportsPage.publishFilter.input(reportName);
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.publishReportName).textContains(reportName)
        ]);
    })

    it('Create User Setup Report', async function () {
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.avaliableTab.click();
        await _ReportsPages.reportsPage.userSetupCreate.click();
        await _ReportsPages.reportsPage.loadCondition();
        userSetupRepoName = "userSetup" + generatedID();
        await _ReportsPages.reportsPage.reportName.input(userSetupRepoName);
        await _ReportsPages.reportsPage.organisationSelect.click();
        await _ReportsPages.reportsPage.organisation1.jsClick();
        await _ReportsPages.reportsPage.userList.click();
        await _ReportsPages.reportsPage.userListSearch.input(SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId);
        await _ReportsPages.reportsPage.userListSelect.jsClick();
        await _ReportsPages.reportsPage.paymentDate.select(currentDate);
        await _ReportsPages.reportsPage.password.input(testData.Reports.password);
        await _ReportsPages.reportsPage.remarks.input(testData.Reports.remarks);
        await _ReportsPages.reportsPage.saveBtn.click();
        await _ReportsPages.reportsPage.loadConditionForSubmit();
        await _ReportsPages.reportsPage.submitBtn.click();
        await ensure(_ReportsPages.reportsPage.successfulMsg).textContains(testData.Reports.successfulMsg)
        await _ReportsPages.reportsPage.finishBtn.click();
        await _ReportsPages.reportsPage.reportFilter.input(userSetupRepoName);
        await _ReportsPages.reportsPage.showUserReport.click();

        await Promise.all([
            await ensure(_ReportsPages.reportsPage.reportNameLink).textContains(userSetupRepoName)
        ]);
        await _ReportsPages.reportsPage.showReportDetail.click();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.userSetupReportDetail).textContains(SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId),
            await ensure(_ReportsPages.reportsPage.remarkValue).textContains(testData.Reports.remarks)
        ]);
    })

    it('Modify User Setup Report', async function () {
        await _UsersPages.UsersPage.dashboardButton.click();
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.showUserReport.click();
        if(0!==userSetupRepoName.trim().length){
            await _ReportsPages.reportsPage.reportFilter.input(userSetupRepoName);
        }else{
            await _ReportsPages.reportsPage.reportFilter.input(testData.Reports.userSetupReport);
        }
        await _ReportsPages.reportsPage.actionBtn.click();
        await _ReportsPages.reportsPage.modifyBtn.jsClick();
        await _ReportsPages.reportsPage.reportName.getText().then(text => {
            reportName1 = text.trim();
        });
        await _ReportsPages.reportsPage.loadConditionForModify();
        await _ReportsPages.reportsPage.userList.click();
        await _ReportsPages.reportsPage.userListSearch.input(testData.Reports.userList);
        await _ReportsPages.reportsPage.userListSelect.jsClick();
        await _ReportsPages.reportsPage.password.click();
        await _ReportsPages.reportsPage.password.input(testData.Reports.password);
        await _ReportsPages.reportsPage.remarks.clean();
        await _ReportsPages.reportsPage.remarks.input(testData.Reports.remarksModify);
        await _ReportsPages.reportsPage.saveBtn.click();
        await _ReportsPages.reportsPage.submitBtn.click();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.successfulMsg).textContains(testData.Reports.modifySuccessful)
        ]);
        await _ReportsPages.reportsPage.finishBtn.click();
        await _ReportsPages.reportsPage.reportFilter.input(reportName1);
        await _ReportsPages.reportsPage.showUserReport.click();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.reportNameLink).textContains(reportName1)
        ]);
        await _ReportsPages.reportsPage.showReportDetail.click();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.userSetupReportDetail).textContains(SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId),
            await ensure(_ReportsPages.reportsPage.userSetupReportDetail).textContains(testData.Reports.userList),
            await ensure(_ReportsPages.reportsPage.remarkValue).textContains(testData.Reports.remarksModify)
        ]);
    })

    it('Delete User Setup Report', async function () {
        await _UsersPages.UsersPage.dashboardButton.click();
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.showUserReport.click();
        if (0 !== userSetupRepoName.trim().length) {
            await _ReportsPages.reportsPage.reportFilter.input(userSetupRepoName);
        } else {
            await _ReportsPages.reportsPage.reportFilter.input("userSetup")
        }
        await _ReportsPages.reportsPage.reportNameLink.getText().then(text => {
            reportName1 = text.trim()
        });
        await _ReportsPages.reportsPage.reportCheckBox.jsClick();
        await _ReportsPages.reportsPage.deleteBtn.jsClick();
        await _ReportsPages.reportsPage.confirmDelete.click();
        await _ReportsPages.reportsPage.dismissBtn.click();
        await _ReportsPages.reportsPage.reportFilter.input(reportName1);
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.noRecord).textContains(testData.Reports.searchRecord)
        ]);
    })

    it('Create Company Detail Report', async function () {
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.newCompanyDetailBtn.click();
        await _ReportsPages.reportsPage.loadCondition();
        comRepName = "corpDetail" + generatedID();
        await _ReportsPages.reportsPage.reportName.input(comRepName);
        await _ReportsPages.reportsPage.organisationSelect.click();
        await _ReportsPages.reportsPage.organisation1.jsClick();
        await _ReportsPages.reportsPage.paymentDate.select(currentDate);
        await _ReportsPages.reportsPage.password.click();
        await _ReportsPages.reportsPage.password.input(testData.Reports.password);
        await _ReportsPages.reportsPage.remarks.input(testData.Reports.remarks);
        await _ReportsPages.reportsPage.saveCompanyDetailBtn.click();
        await _ReportsPages.reportsPage.submitBtn.click();
        await ensure(_ReportsPages.reportsPage.successfulMsg).textContains(testData.Reports.successfulMsg)
        await _ReportsPages.reportsPage.finishBtn.click();
        await _ReportsPages.reportsPage.reportFilter.input(comRepName);
        await _ReportsPages.reportsPage.showCompanyReportBtn.click();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.reportNameText).textContains(comRepName)
        ]);
        await _ReportsPages.reportsPage.showReportDetail.click();
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.companyReportDetail).textContains(testData.Reports.companyValue),
            await ensure(_ReportsPages.reportsPage.remarkValue).textContains(testData.Reports.remarks)
        ]);
    })

    it('Publish Company Detail Report', async function () {
        await _UsersPages.UsersPage.dashboardButton.click();
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.showCompanyReportBtn.click();
        if(0!==comRepName.trim().length){
            await _ReportsPages.reportsPage.reportFilter.input(comRepName);
        }else{
            await _ReportsPages.reportsPage.reportFilter.input("corpDetail");
        }
        await _ReportsPages.reportsPage.reportNameLink.getText().then(text => {
            reportName = text.trim();
        });
        await _ReportsPages.reportsPage.actionBtn.click();
        await _ReportsPages.reportsPage.publishBtn.jsClick();
        await _ReportsPages.reportsPage.loadConditionForPublish();
        await _ReportsPages.reportsPage.publishConfirmBtn.click();
        await _ReportsPages.reportsPage.loadConditionForPublishComplete();
        await _ReportsPages.reportsPage.dismissBtn.click();
        await _ReportsPages.reportsPage.publishTabBtn.click();
        await _ReportsPages.reportsPage.publishFilter.input(reportName);
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.publishReportName).textContains(reportName)
        ]);
    })

    it('Download Published Company Detail Report', async function () {
        await _UsersPages.UsersPage.dashboardButton.click();
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.publishTabBtn.click();
        if(0!==reportName.trim().length){
            await _ReportsPages.reportsPage.publishFilter.input(reportName);
        }else{
            await _ReportsPages.reportsPage.publishFilter.input(testData.Reports.comRepName);
        }
        await _ReportsPages.reportsPage.publishReportCheckbox.jsClick();
        await _ReportsPages.reportsPage.publishDownloadBtn.click();
        if (await _ReportsPages.reportsPage.publishDownloadBtn.isDisabled()) {
            throw new Error(`Button ${_ReportsPages.reportsPage.publishDownloadBtn} is not disabled`);
        }
    })

    it('Delete Published Company Detail Report', async function () {
        await _UsersPages.UsersPage.dashboardButton.click();
        await _ReportsPages.reportsPage.reportsMenu.click();
        await _ReportsPages.reportsPage.publishTabBtn.click();
        await _ReportsPages.reportsPage.publishFilter.input(reportName);
        await _ReportsPages.reportsPage.publishReportCheckbox.jsClick();
        await _ReportsPages.reportsPage.publishDeleteBtn.click();
        await _ReportsPages.reportsPage.loadConditionForDeletePublish();
        await _ReportsPages.reportsPage.confirmDelete.click();
        await _ReportsPages.reportsPage.loadConditionForPublishComplete();
        await _ReportsPages.reportsPage.dismissBtn.click();
        await _ReportsPages.reportsPage.publishTabBtn.click();
        await _ReportsPages.reportsPage.publishFilter.input(reportName);
        await Promise.all([
            await ensure(_ReportsPages.reportsPage.noRecord).textContains(testData.Reports.searchRecord)
        ]);
    })

});