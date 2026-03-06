import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, DateSelect1, waitForUXLoading} from '../../../lib';

@log export class ReportsPage extends Page {
    constructor() {
        super();
    }

    // for create report
    @component('//*[@id="menuReports-a"]/span[1]') public reportsMenu: Button;
    @component('//*[@id="ux-tab-AVAILABLE"]') public avaliableTab: Button;
    @component('//*[@id="btn-create-policyReport"]') public authPolicyCreate: Button;
    @component('//*[@id="reportName"]') public reportName: TextInput;
    @component('//*[@formcontrolname="organisation"]') public orgSelect: OptionSelect;
    @component('//*[@id="label-multi-dropdown-report-paymentType"]') public product: Button;
    @component('//*[@id="report-paymentType-0"]') public paymentSelect: Button;
    @component('//*[@id="report-paymentType-7"]') public paymentSelect1: Button;
    @component('//*[@id="label-multi-dropdown-report-category"]') public payeeCategories: Button;
    @component('//*[@id="report-category-0"]') public payeeCategoriesValue: Button;
    @component('//*[@id="4555"]') public payeeSelect: Button;
    @component('//date-picker[@formcontrolname="reportDate"]') public paymentDate: DateSelect1;
    @component('//*[@id="password"]') public password: TextInput;
    @component('//*[@id="remarks"]') public remarks: TextInput;
    @component('//*[@id="continue-btn"]') public saveBtn: Button;
    @component('//*[@id="submit-btn"]') public submitBtn: Button;
    @component('//*[@id="finish-btn"]') public finishBtn: Button;
    @component('//*[@id="available-report-filter"]') public reportFilter: TextInput;
    @component('//*[@id="btn-show-IDEALAuthorisationPolicyReport"]') public showReport: Button;
    @component('//*[@id="report-item-0"]') public reportNameLink: Button;
    @component('//*[@id="report-item-0"]') public reportNameText: TextInput;
    @component('//*[@id="success-0"]') public successfulMsg: TextInput;
    @component('//*[@data-mat-icon-name="ic-arrow"]') public showReportDetail: Button;
    @component('//*[@class="break-words ng-star-inserted"]') public reportDetail: TextInput;
    @component('//*[@class="break-words w-48"]') public remarkValue: TextInput;


    // for modify report
    @component('//*[@id="btn-action-report-0"]') public actionBtn: Button;
    @component('//*[@id="edit-btn-action"]') public modifyBtn: Button;

    // for create user setup report
    @component('//*[@formcontrolname="organisations"]') public organisationSelect: OptionSelect;
    @component('//*[@id="report-organisation-0"]') public organisation1: OptionSelect;
    @component('//*[@id="btn-create-userReport"]') public userSetupCreate: Button;
    @component('//*[@id="label-multi-dropdown-report-user"]') public userList: Button;
    @component('//*[@id="search"]') public userListSearch: TextInput;
    @component('//*[@id="report-user-0"]') public userListSelect: Button;
    @component('//*[@id="btn-show-UserSetupReport"]') public showUserReport: Button;
    @component('//*[@id="btn-hide-UserSetupReport"]') public hideUserReport: Button;
    @component('//*[@name="Delete"]') public deleteBtn: Button;
    @component('//*[@id="delete-btn-dialog"]') public confirmDelete: Button;
    @component('//*[@id="dismiss-btn-dialog"]') public dismissBtn: Button;
    @component('//*[@id="No Records Found"]') public noRecord: TextInput;
    @component('//*[@id="request-item-checkbox-2-0"]') public reportCheckBox: Button;
    @component('//*[@class="break-all ng-star-inserted"]') public userSetupReportDetail: TextInput;

    // for create company detail report
    @component('//*[@id="btn-create-companyReport"]') public newCompanyDetailBtn: Button;
    @component('//*[@id="continue-btn"]') public saveCompanyDetailBtn: Button;
    @component('//p-auto-complete[@formcontrolname="organisation"]') public companyOrgSelect: OptionSelect;
    @component('//*[@id="selectDropdown-icon"]') public orgDropdownBtn: Button;
    @component('//*[@id="dropDown-selectAll"]') public orgDropdownSelectBtn: Button;
    @component('//*[@id="publish-btn-action"]') public publishBtn: Button;
    @component('//*[@class="mat-mdc-dialog-title mdc-dialog__title"]') public confirmPublishMsg: TextInput;
    @component('//*[@id="publish-btn-dialog"]') public publishConfirmBtn: Button;
    @component('//*[@id="confirm-dialog-title"]') public publishCompleteMsg: TextInput;
    @component('//*[@id="ux-tab-PUBLISHED"]') public publishTabBtn: Button;
    @component('//*[@id="publishedReport-filter"]') public publishFilter: TextInput;
    @component('//*[@id="reportName-0"]') public publishReportName: TextInput;
    @component('//*[@id="request-item-checkbox-0"]') public publishReportCheckbox: Button;
    @component('//*[@id="btn-delete"]') public publishDeleteBtn: Button;
    @component('//*[@id="btn-show-CompanyDetailReport"]') public showCompanyReportBtn: Button;
    @component('//*[@id="delete-dialog-title"]') public delectPubConfirmMsg: TextInput;
    @component('//*[@id="PUBLISHED-panel"]/published-reports/div/div[2]/ngx-datatable/div/datatable-body/datatable-selection/div') public noRecordFoundMsg: TextInput;
    @component('//*[@id="btn-download"]') public publishDownloadBtn: Button;
    @component('//*[@class="break-all ng-star-inserted"]') public companyReportDetail: TextInput;


    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.reportName.element), this.reportName.getTimeOut());
    }
    public async loadConditionForModify() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.saveBtn.element), this.saveBtn.getTimeOut());
    }
    public async loadConditionForPublish() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmPublishMsg.element), this.confirmPublishMsg.getTimeOut());
    }

    public async loadConditionForSubmit() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
    }
    public async loadConditionForPublishComplete() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.publishCompleteMsg.element), this.publishCompleteMsg.getTimeOut());
    }

    public async loadConditionForDeletePublish() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.delectPubConfirmMsg.element), this.delectPubConfirmMsg.getTimeOut());
    }
}

