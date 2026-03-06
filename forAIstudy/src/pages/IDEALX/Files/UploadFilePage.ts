/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { FilesPages } from '../../../pages/IDEALX';
import { Page, component, log, find, Button, TextInput, waitForUXLoading, HtmlSelect, FileSelect, waitForI3Loading, OptionSelect, DateSelect, DBSCalendarSelect, devWatch } from '../../../lib';
import * as moment from 'moment';

@log export class UploadFilePage extends Page {
    constructor() {
        super();
    }
    @component('//*[@class="header-company__name"]') public companyMenu: Button;
    @component('//*[@id="selectedCompany"]/span') public selectCompany: Button;
    @component('//input[@placeholder="Search companies"]') public searchCompany: TextInput;
    @component('//ng-component/div/div[2]/div/div/ul/li/div[2]/ul/li/div[2]/div/div[1]') public selectCompanyResult: Button;


    // Upload File Page
    @component('//*[@id="nav-item-navBBTopFileLinkText"]') public filesMenu: Button;
    @component('//a[contains(@href,"#/file/file-manage/upload")]') public uploadFilesTab: Button;
    @component('//a[contains(@href,"#/file/paynow-fileenquiry")]') public fileEnquiryTab: Button;
    @component('//a[contains(@href,"#/file/file-manage/download")]') public downloadTab: Button;
    @component('//a[contains(@href,"#/file/file-manage")]') public filesMangementCenter: Button;
    @component("//*[@id='transactionAdditionalFilter']") public ShowAdditionalFilters: Button;
    @component("//button[@name='search']") public searchButton: Button;
    @component("//input[@type='file']") public browseforfiles: FileSelect;
    @component('//button[@name="upload"]') public uploadButton: Button;
    @component("//multi-level-dropdown[@formcontrolname='typeFormat']") public PaymentType: OptionSelect;
    //@component("//p-auto-complete[@formcontrolname='approvalOption']") public approvalOption: OptionSelect;
    @component('//*[@id="approvalOption"]') public approvalOption: TextInput;
    @component('//*[contains(@class,"ui-autocomplete-list-item-wrapper")]') public byTxn: Button;
    @component("//dbs-calendar[@formcontrolname='paymentDate']") public amendPaymentDate: DBSCalendarSelect;
    @component("//button[@name='dismiss']") public ok: Button;
    @component('//div[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;
    @component('//datatable-scroller/datatable-row-wrapper/datatable-body-row/div[2]/datatable-body-cell[5]/div/div/div/p[3]') public FSviewPaymentType: TextInput;

    @component('//p-auto-complete[@formcontrolname="organisation"]') public Organisationselect: OptionSelect;
    @component('//input[@id="confidentialFile"]') public ConfidentialFile: Button;
    @component("//input[@id='testFile']") public TestFile: Button;
    @component('//button[@name="upload"]') public UploadButton: Button;
    @component('//a[@id="ux-tab-FS_TEST_FILES"]') public TestFilestab: Button;
    @component('//file-upload/div/div/div[1]/div[2]/div/p-auto-complete/div/div[2]/ul/li[1]/div/span') public selectAll: Button;

    @component('//p-auto-complete[@formcontrolname="organisation"]') public organisation: OptionSelect;
    @component("//p-auto-complete[@formcontrolname='fileFormat']") public FileFormat: OptionSelect;
    @component("//p-auto-complete[@formcontrolname='approvalOption']") public approvaloption: OptionSelect;
    @component('//input[@id="upload-filter"]') public fileFilter: TextInput;
    @component("//button[@name='search']") public search: Button;

    @component('//*[@class="pull-right btn-refresh flex ng-star-inserted"]') public refresh: Button;

    @component('//p[@id="fileNameLabel-0"]') public FileName: TextInput;
    @component('//div[@id="txnFromAccount-0"]') public FromAccount: TextInput;
    @component('//div[@id="txnAmount-0"]') public Amount: TextInput;
    @component('//*[@id="fileToggleButton-0"]') public Showtransactions: Button;
    @component('//div[@id="errorMessage-0"]') public errorMsg: TextInput;
    @component('//div[@id="errorMessage-1"]') public errorMsg1: TextInput;
    @component('//div[@id="errorMessage-2"]') public errorMsg2: TextInput;
    @component('//div[@id="errorMessage-3"]') public errorMsg3: TextInput;
    @component('//div/upload-list-errors/div/ngx-datatable/div/div/datatable-body') public errorMsgAll: TextInput;

    @component('//button[@id="fileNameButton-0"]') public FileName_Showall: Button;


    @component('//input[@name="fileNameLabel-0"]') public fileName: FileSelect;
    @component('//input[@name="confidential"]') public confidential: TextInput;

    @component('//high-risk-payee-dialog/div/div[3]/div/button[2]') public proceedButton: Button;
    @component('//button[@class="btn btn__primary"]') public cancelTransactionButton: Button;

    // Manage File Page
    @component('//a[@id="filter"]') public filter: Button;
    @component('//input[@name="upload-filter"]') public fileNameFilter: TextInput;
    @component('//a[@id="goFilter"]') public goButton: Button;
    @component('//*[@id="fileNameButton-0"]') public fileNameLink: Button;
    @component('//a[@id="linkMyApproval-0"]') public pendingApprovalLink: Button;
    @component('//*[@id="fileHash-0"]') public fileHash: TextInput;
    @component('//*[@id="fileNameLabel-0"]') public fileNameLabel: Button;

    @component('//*[@id="viewFile_fileName"]') public viewfileName: Button;
    @component('//*[@class="word-break-all ng-star-inserted"]') public paymentType: TextInput;


    // View File Page
    //@component('//a[@id="uploadPaymentView-0"]') public paymentReferenceLink: Button;
   // @component('/html/body/dbs-root/ng-component/div/div[3]/ng-component/ng-component/div/dbs-file-manage-view/div/div/dbs-view-file-list/div/div/div[2]/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper/datatable-body-row/div[2]/datatable-body-cell[3]/div/div/p[1]/button') public paymentReferenceLink: Button
    @component('//*[@class="btn btn__plain btn--word-break text-red-500"]') public paymentReferenceLink: Button;
    @component('(//*[@class="btn btn__plain btn--word-break text-red-500"])[2]') public filepaymentReferenceLink2: Button;
    @component('(//*[@class="btn btn__plain btn--word-break text-red-500"])[3]') public filepaymentReferenceLink3: Button;
    @component('//datatable-selection/datatable-scroller/datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[3]/div/div/p[1]/button') public paymentReferenceLink1: Button;
    @component('//datatable-selection/datatable-scroller/datatable-row-wrapper[2]/datatable-body-row/div[2]/datatable-body-cell[3]/div/div/p[1]/button') public paymentReferenceLink2: Button;
    @component('//table[@class="table-start-lu"]/tbody/tr/td/div/table/tbody/tr[4]/td[5]') public totalItems: Button;
    @component('//*[@name="PDF"]') public DownloadPDF: Button;
    @component('//*[contains(@id,"AUTOGENBOOKMARK_6")]/tbody/tr[1]/td[3]/div') public PaymentDate: TextInput;
    @component('//*[@type="text"]') public viewFileRef: TextInput;
    @component('//datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[7]/div/div/p[1]') public viewFileStatus: TextInput;
    @component('//datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[7]/div/div/p') public viewFileTransactionStatus1: TextInput;
    @component('//datatable-row-wrapper[2]/datatable-body-row/div[2]/datatable-body-cell[7]/div/div/p') public viewFileTransactionStatus2: TextInput;
    @component('//dbs-file-manage-view/div[2]/div/div/div/div[2]/div[2]/span[2]/p') public approveOptionValue: TextInput;
    @component('//dbs-file-manage-view/div[2]/div/div/div/div[3]/div[2]/span[2]/p') public approveGroup: TextInput;
    // View Bulk Payment(DBS)/Payroll(DBS)/Cheque Payment Page(old ui)
    @component('//span[@id="bulk-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//span[@id="ict-view-accountNum"]') public fromAccountValue4ICT: TextInput;
    @component('//strong[@id="bulk-view-amount_0"]') public amountValue: TextInput;
    @component('//table[@id="uploadpaymentDetails"]/tbody/tr[4]/td[2]') public internalReference: TextInput;
    @component('//*[@id="uploadpaymentDetails"]/tbody/tr[8]/td[2]') public amountValueForCheque: TextInput;

    // View GIRO/LVT Page(old ui)
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValueForGIRO: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValueForGIRO: TextInput;
    @component('//table[2]/tbody/tr/td/a/span[1]') public cancelButton: Button;
    @component('//*[@name="cancel"]') public cancelBtn: Button;

    // View HVT Page(old ui)
    @component('//*[@id="uploadpaymentDetails"]/tbody/tr[2]/td[2]') public fromAccountValueForHVT: TextInput;
    @component('//*[@id="uploadpaymentDetails"]/tbody/tr[4]/td[2]') public amountValueForHVT: TextInput;

    // View Fast Payment Page(new ui)
    @component('//span[@id="domestic-view-accountNum"]') public fromAccountValueForFPS: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public amountValueForFPS: TextInput;
    @component('//div[@id="domestic-view-status"]') public statusValueForFPS: TextInput;

    // View Bulk Payment Page(new ui)
    @component('//*[@id="bulk-view-accountNum"]') public fromAccountValueForBP: TextInput;
    @component('//*[@id="bulk-view-paymentAmount"]') public amountValueForBP: TextInput;
    @component('//div[@id="bulk-view-status_0"]') public statusValueForBP: TextInput;

    // View DD Page(new ui)
    @component('//*[@id="dd-view-accountNum"]') public fromAccountValueForDD: TextInput;
    @component('//*[@id="dd-view-deductAmount"]') public amountValueForDD: TextInput;
    @component('//div[@id="domestic-view-status"]') public statusValueForDD: TextInput;

    // View TT Page
    @component('//div[@id="ott-view-status"]') public statusValueForTT: TextInput;

    //Upload fail page
    @component('//a[@id="uploadPaymentView-0"]') public uploadFailLink: TextInput;
    @component('//a[@id="refresh"]') public backBtn: Button;

    // View TW TT Payment Page(new ui)
    @component('//span[@id="view-ott-accountNum"]') public fromAccountValueForTT: TextInput;
    @component('//span[@id="label-purpose-code"]') public purposecodeValue: TextInput;
    @component('//span[@id="label-sub-purpose-code"]') public subPurposeCodeValue: TextInput;
    @component('//span[@id="label-other-description"]') public otherDesValue: TextInput;



    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.ShowAdditionalFilters.element), this.ShowAdditionalFilters.getTimeOut());
    }

    public async loadCondition2() {
        await waitForUXLoading();
        await browser.sleep(1000);
        await browser.wait(ExpectedConditions.visibilityOf(this.fileNameLink.element), this.fileNameLink.getTimeOut());
    }
    
    public async loadConditionUpload() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.uploadButton.element), this.uploadButton.getTimeOut());
        await browser.sleep(2000);
    }
    public async loadConditionforViewPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
    }

    public async loadConditionForViewFPSPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValueForFPS.element), this.fromAccountValueForFPS.getTimeOut());
    }

    public async loadConditionForViewBPPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValueForBP.element), this.fromAccountValueForBP.getTimeOut());
    }
    public async loadConditionForViewFilePage() {
        await waitForUXLoading;
        await browser.wait(ExpectedConditions.stalenessOf(this.fileNameLink.element), this.fileNameLink.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentReferenceLink.element), this.paymentReferenceLink.getTimeOut());
    }

    public async loadConditionForViewFilePage2() {
        await waitForUXLoading;
        await browser.wait(ExpectedConditions.stalenessOf(this.fileNameLink.element), this.fileNameLink.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentReferenceLink1.element), this.paymentReferenceLink1.getTimeOut());
    }

    public async loadConditionForViewFilePage3() {
        await waitForUXLoading;
        await browser.sleep(2000);
        await browser.wait(ExpectedConditions.visibilityOf(this.viewfileName.element), this.viewfileName.getTimeOut());
    }

    public async loadConditionForFileNameLink() {
        //await browser.sleep(30000)
        await waitForUXLoading();
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
    }
    public async loadConditionForViewBulkPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        await browser.sleep(6000)
    }

    public async loadConditionForICTViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue4ICT.element), this.fromAccountValue4ICT.getTimeOut());
    }

    public async loadConditionForFileNameLink2() {
        await waitForUXLoading();
        await browser.sleep(1000);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fileNameLink.element), this.fileNameLink.getTimeOut());
    }

    public async fsUpload(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string, approvalCurrency?: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 300);
        await this.amendPaymentDate.select(currentDate);
        await this.uploadButton.click();
        await this.ok.click();
        await this.loadCondition();
        await browser.sleep(25000) //wait for MQ response
        return fileName;
    }
    public async fsUpload5(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string, approvalCurrency?: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 300);
        await this.amendPaymentDate.select(currentDate);
        await this.uploadButton.click();
        await this.ok.click();
        await browser.sleep(20000); //wait for MQ response
        await this.refresh.jsClickIfExist();
        await this.loadCondition();
        return fileName;
    }

    

    public async fsUpload6(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalCurrency?: string) {
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.scrollTo(0, 100);
        await this.PaymentType.select(paymentType);
        await this.scrollTo(0, 300);
        await this.uploadButton.click();
        await this.ok.click();
        await browser.sleep(25000); //wait for MQ response
        await this.refresh.jsClickIfExist();
        await this.loadCondition();
        return fileName;
    }

    public async fsUpload7(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string, approvalCurrency?: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.click();
        // await this.scrollTo(0, 300);
        await this.amendPaymentDate.select(currentDate);
        await this.uploadButton.click();
        await this.ok.click();
        await browser.sleep(20000); //wait for MQ response
        await this.refresh.click();
        await this.loadCondition();
        return fileName;
    }

    public async fsUpload8(_FilesPages: FilesPages, Organisation: string, paymentType: string, uploadFileName: string, approvalOption: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.scrollTo(0, 300);
        await this.loadConditionUpload();
        await this.Organisationselect.click();
        await this.selectAll.click();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 300);
        await this.amendPaymentDate.select(currentDate);
        // await this.ConfidentialFile.jsClick();
        await this.uploadButton.click();
        await this.ok.click();
        await this.loadCondition();
        await browser.sleep(8000) //wait for MQ response
        return fileName;
    }

    public async fsUpload9(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string, approvalCurrency?: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 300);
        await this.amendPaymentDate.select(currentDate);
        await this.uploadButton.click();
        // await this.ok.click();
        // await browser.sleep(20000); //wait for MQ response
        await this.refresh.jsClickIfExist();
        await this.loadCondition();
        return fileName;
    }

    public async fsUploadTW(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        // await this.approvaloption.select(approvalOption);
        // await this.byTxn.jsClickIfExist();
        await this.amendPaymentDate.select(currentDate);
        await this.uploadButton.click();
        await this.ok.click();
        await this.loadCondition();
        await browser.sleep(8000) //wait for MQ response
        return fileName;
    }

    public async fsUpload1(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 400);
        await this.amendPaymentDate.select(currentDate);
        await this.uploadButton.click();
        await this.ok.click();
        await this.loadCondition();
        await browser.sleep(8000) //wait for MQ response
        return fileName;
    }
    public async fsUpload2(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 500);
        await this.amendPaymentDate.select(currentDate);
        await this.TestFile.jsClick();
        await this.uploadButton.click();
        await this.ok.click();
        await this.loadCondition();
        await browser.sleep(8000) //wait for MQ response
        return fileName;
    }

    public async fsUpload3(_FilesPages: FilesPages, Organisation: string, paymentType: string, uploadFileName: string, approvalOption: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.scrollTo(0, 300);
        await this.loadConditionUpload();
        await this.Organisationselect.select(Organisation);
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 300);
        await this.amendPaymentDate.select(currentDate);
        await this.ConfidentialFile.jsClick();
        await this.uploadButton.click();
        await this.ok.click();
        await this.loadCondition();
        await browser.sleep(8000) //wait for MQ response
        return fileName;
    }
    public async fsUpload4(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        //await _FilesPages.openMenu(Menu.CompanyInfo.SwitchToSubsi2);
        await this.filesMangementCenter.click();
        await this.uploadFilesTab.click();
        await this.loadCondition();
        await this.browseforfiles.select(uploadFileName).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await this.loadConditionUpload();
        await this.PaymentType.select(paymentType);
        await this.approvalOption.input(approvalOption);
        await this.byTxn.jsClickIfExist();
        await this.scrollTo(0, 300);
        await this.amendPaymentDate.select(currentDate);
        await this.ConfidentialFile.jsClick();
        await this.uploadButton.click();
        await this.ok.click();
        await this.loadCondition();
        await browser.sleep(30000) //wait for MQ response
        return fileName;
    }

    public async getTransactionRefViewFilePage(items: number) {
        let _txnRefList = [];
        for (let index = 0; index < items; index++) {
            await (find('//*[@id="uploadPaymentView-' + index + '"]')).getText().then(async text => {
                _txnRefList.push(text);
            })
        }
        return _txnRefList;
    }
    public async loadConditionForManageFilePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.filter.element), this.filter.getTimeOut());
    }

    public async loadConditionForViewTTPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValueForTT.element), this.fromAccountValueForTT.getTimeOut());
    }

    public async loadConditionForAlertOverlay() {
        await browser.wait(ExpectedConditions.visibilityOf(this.proceedButton.element), this.proceedButton.getTimeOut());
    }
    public async loadConditionForClickFileName(){
        await browser.sleep(5000);
        await waitForUXLoading();
    }

}
    
