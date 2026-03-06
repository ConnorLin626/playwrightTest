/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, OptionSelect, FileSelect, waitForUXLoading, IXHorizontalMenu } from "../../../lib";
import * as utils from '../../../lib/utils';
import { BulkPaymentPage } from './BulkPaymentPage';
import { PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';

@log export class CrossBoarderACHPage extends BulkPaymentPage {

    @component('//*[@id="icon__ACH_payment"]') public crossBorderMenu: Button;
    @component("//li[@class='page-point ng-star-inserted']") public page: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="countrySelected"]') public paymentCountry: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="debitTypeObjectSelected"]') public debitType: OptionSelect;
    @component('//*[@name="payee-selector"]') filterExistingPayee: TextInput;
    @component('//*[@name="payeeDetails"]') paymentDetail: TextInput; 
    @component('//*[@id="temp-bulk-create-optDetail_0"]') showOptionDetail: Button;
    @component('//*[@id="useIntermediary0"]') IntermediaryBankInformation: Button; 
    @component('//p-auto-complete[@formcontrolname="selectedIntermediaryCountry"]') public selectedIntermediaryCountry: OptionSelect;
    @component('//bp-payee-intermediary/div/div[2]/div[2]/dbs-payee-bank/div/div/div[2]/div/div[1]/input') public payeeBankID: OptionSelect;
    @component('//*[@id="isBeneAdvising0"]') public MessageToPayee: Button;
    @component('//*[@name="email-0"]') public Email1: TextInput;
	@component('//*[@name="email-1"]') public Email2: TextInput;
	@component('//*[@name="email-2"]')public Email3: TextInput;
    @component('//*[@name="email-3"]') public Email4: TextInput;
    @component('//*[@name="email-4"]') public Email5: TextInput;
    @component('//*[@name="adviceContent"]') public Message: TextInput;
    @component('//input[@name="payeeAmount"]') payeeAmount: TextInput; //amount for first payee
    @component('//input[@name="crsbrdint1-bp-payee-payeePurpose1"]') purposePaymentLine: TextInput; //purpose payment line1 for first INTL payee
    @component('//input[@name="crsbrdint1-bp-payee-payeeAdditional1"]') additionalInfoLine: TextInput; //additional info line1 for first INTL payee
    @component('//div[@id="temp-bulk-create-optDetail_0"]') showHideDetail: Button; //show hide button for first INTL payee
    @component('//input[@name="crsbrdint1-bp-payee-payeeDetail1"]') paymentDetailLine: TextInput;  //payment Detail Line1 for first INTL payee
    @component('//input[@name="new-payee-payeeName"]') newPayeeName: TextInput;  
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//input[@name="new-payee-add1"]') newPayeeAdd1: TextInput;  
    @component('//input[@name="new-payee-add2"]') newPayeeAdd2: TextInput;  
    @component('//input[@name="new-payee-add3"]') newPayeeAdd3: TextInput;  
    @component('//*[@id="bulk-newPayee-bankId"]') public newPayeeBankID: TextInput;

    @component('//div[@id="crsbrd-view-edit"]') public editButton: Button;
    @component('//*[@name="save-as-draft"]') public saveButton: Button;
    @component('//button[@name="addPayee"]') public addPayeeBtn: Button;
    @component('//button[@name="add"]') public addPayee: Button;
    @component('//button[@name="next"]') public nextButton: Button;
    @component('//button[@name="submit"]') public submitButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//span[@id="crsbrd-view-fromAccount"]') public fromAccountPreview: TextInput;
    @component('//span[@id="crsbrd-view-fromAccount"]') public fromAccountView: TextInput;
    @component('//span[@id="crsbrd-view-payAmt"]') public amountView: TextInput;
    @component('//span[@id="crsbrd-view-paymentDate"]') public paymentDateView: TextInput;
    @component('//strong[@id="crsbrd-view-name_0"]') public ExistingPayee: TextInput;
    @component('//strong[@id="crsbrd-view-name_1"]') public ExistingPayee2: TextInput;
    @component('//strong[@id="crsbrd-view-pendingStatus_0"]') public crsBrdTransactionStatusValue: TextInput;
    @component('//strong[@id="crsbrd-view-rejectedStatus_0"]') public transactionStatusReject: TextInput;

    @component('//a[@id="filter"]') public filterButton: Button;
    @component('//input[@name="batchName"]') public fileNameFilterValue: TextInput;
    @component('//a[@id="goFilter"]') public goFilterBtn: Button;
    //"file name link" at View File JSP Screen via Manage Files
    @component('//td[@id="fileName-0"]/a[@id="uploadBatchView-0"]') public uploadFileNameLink: Button;
    //"file name link" at View Payment JSP Screen via Manage Files
    @component('//td[@id="refNum-0"]/a[@id="uploadPaymentView-0"]') public uploadPaymentLink: Button;
    @component('//div[starts-with(@class, "manual clearfix")]') public enterDetail: Button

    @component('//button[@name="approve"]')
    public approveButton: Button;

    @component('//*[@class="push-option-label"]')
    public pushOption: Button;

    @component('//input[@name="new-payee-routing-code"]')
    public newPayeeRoutingCode: TextInput;

    @component('//input[@name="crsbrdint1-bp-payee-payeePurpose1"]')
    public payeePurpose1: TextInput;

    @component('//input[@name="crsbrdint1-bp-payee-payeeDetail1"]')
    public payeeDetail1: TextInput;

    // @component('//li[@id="labelNewPayee_1"]/span')
    // public newPayeeTab: Button;
    @component('//*[@id="ux-tab-labelNewPayee"]')
    public newPayeeTab: Button;

    @component('//*[@id="ux-tab-labelNewPayee"]') public newPayeePtnbnkTab: Button;

    @component('//*[@id="bulk-newPayee-bankId"]') public swiftBICSelect: TextInput;
    @component('//*[@id="new-payee-bank-id-button"]') public findBankBtn: Button;
    @component('//*[@class="swift-option"]') public findBankResultBtn: Button;
    @component('//*[@class="search-result-container"]') public payeeBankResult: Button;
    @component('//*[@class="account-detail"]') public payeeAccountDetail: TextInput;
    


    @component('//input[@name="new-payee-acct-number"]')
    public newPayeeAcctNo: TextInput;

    @component('//input[@name="new-payee-routing-code"]')
    public payeeBankRouting: TextInput;

    @component('//div[@id="temp-bulk-create-optDetail_0"]')
    public hideOptDetail: Button;

    //"status" at Approval Confirmation Screen via My Approve
    @component('//p[@id="complete-transaction-labelStatus-0"]')
    public myApproveFileStatus: TextInput;

    // CN - Cross Border ACH
    // Create/Edit Regulatory Reporting
    @component('//p-auto-complete[@formcontrolname="counterptycntryCode"]') public counterPartyCode: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="specPmtPurpose"]') public specPmtPurpose: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="pmtCategory1"]') public pmtCategory1: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="seriesCode1"]') public seriesCode1: OptionSelect;
    @component('//input[@name="cnttTransRemark1"]') public cnttTransRemark1: TextInput;
    @component('//input[@id="digiDocFileUpload"]') public digiDocFileUploadButton: FileSelect;
    @component('//p-auto-complete[@formcontrolname="docType"]') public DocType: OptionSelect;
    @component('//div[@class="utilizedAmount"]/dbs-input/div/div/div/input') public utilizedAmount: TextInput;

    // View
    @component('//*[@id="crsbrd-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="crsbrd-view-fromAccount"]') public fromAccountValue: TextInput;
    @component('//*[@id="crsbrd-view-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="crsbrd-view-paymentCountry"]') public payeeArea: TextInput;
    @component('//*[@id="crsbrd-view-payAmt"]') public deductedAmt: TextInput;
    @component('//*[@id="crsbrd-view-debitType"]') public debitTypeValue: TextInput;
    @component('//*[@id="crsbrd-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="crsbrd-view-custRef"]') public internalRef: TextInput;
    @component('//*[@id="crsbrd-view-batchID"]') public batchIDValue: TextInput;
    @component('//*[@id="bulk-viewTemp-status"]') public statusValue: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component('//*[@id="crsbrd-view-edit"]') public edit: TextInput;

    // payee 1
    @component('//*[@id="crsbrd-view-name_0"]') public payeeName1: TextInput;
    @component('//*[@id="crsbrd-view-nickname_0"]') public payeeNickname1: TextInput;
    @component('//*[@id="crsbrd-view-payee-bankCode_0"]') public payeeBankCode1: TextInput;
    @component('//*[@id="crsbrd-view-payee-bankName_0"]') public payeeBankName1: TextInput;
    @component('//*[@id="crsbrd-view-acctNum_0"]') public payeeAcctNum1: TextInput;
    @component('//*[@id="crsbrd-view-amount_0"]') public payeeAmt1: TextInput;
    @component('//*[@id="crsbrd-show-optBtn_0"]') public showOptBtn1: Button;
    @component('//*[@id="crsbrd-view-paymentDetails_0"]') public paymentDetails1: TextInput;
    @component('//*[@id="crsbrd-view-adviceContent_0"]') public message1: TextInput;
    @component('//*[@id="crsbrd-view-email_0"]') public emailList1: TextInput;

    // payee 2
    @component('//*[@id="crsbrd-view-name_1"]') public payeeName2: TextInput;
    @component('//*[@id="crsbrd-view-nickname_1"]') public payeeNickname2: TextInput;
    @component('//*[@id="crsbrd-view-payee-bankCode_1"]') public payeeBankCode2: TextInput;
    @component('//*[@id="crsbrd-view-acctNum_1"]') public payeeAcctNum2: TextInput;
    @component('//*[@id="crsbrd-view-amount_1"]') public payeeAmt2: TextInput;
    @component('//*[@id="crsbrd-show-optBtn_1"]') public showOptBtn2: Button;
    @component('//*[@id="crsbrd-view-paymentDetails_1"]') public paymentDetails2: TextInput;
    @component('//*[@id="crsbrd-view-adviceContent_1"]') public message2: TextInput;
    @component('//*[@id="crsbrd-view-email_1"]') public emailList2: TextInput;
    @component('//li[contains(@class,"digidoc-uploaded")]') public digiDocUploaded: TextInput;

    //Based on this exchange rate
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]/span/span') public contractRef : TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[2]/span') public indicativeExchangeRate : TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[3]/span') public amountToTransfer : TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[4]/span') public amountToDeduct : TextInput;


    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }
    public async loadConditionForBank() {
        await waitForUXLoading();
        await browser.sleep(5000)
        await browser.wait(ExpectedConditions.elementToBeClickable(this.payeeBankResult.element), this.payeeBankResult.getTimeOut());
    }

    public async loadCondition4Preview() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountPreview.element), this.fromAccountPreview.getTimeOut());
    }

    public async wait4ViewCrsBrdUXScreenReady() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.crsBrdTransactionStatusValue.element), this.crsBrdTransactionStatusValue.getTimeOut());
    }

    public async loadCondition4MngFile() {
        await utils.waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.filterButton.element), this.filterButton.getTimeOut());
    }

    public async loadCondition4ViewFile() {
        await utils.waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.uploadPaymentLink.element), this.uploadPaymentLink.getTimeOut());
    }

    public async loadCondition4ViewPayment() {
        await this.pageSwitchToUX();
        await utils.waitForUXLoading();
        await browser.sleep(2000);//use this can be use for all cases
    }

    public async loadCondition4ViewPaymentOldUI() {
        await utils.waitForI3Loading();
        await browser.sleep(2000);//use this can be use for all cases
    }

    public async loadCondition4MyApprovalCompleted() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.myApproveFileStatus.element), this.myApproveFileStatus.getTimeOut());
    }

    public async addINTLNewPayee(payeeName: string, payeeBankID: string, accountNumber: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        await this.newPayeeTab.click();
        await this.newPayeeName.input(payeeName);
        await this.newPayeeNickname.input(payeeName);
        await this.payeeAddress1.input(payeeName);
        await this.swiftBICSelect.input(payeeBankID);
        // await this.payeeBankID.input("AFABAFK0XXX");
        await this.payeeBankResult.click();
        await this.payeeBankRouting.input(accountNumber);
        await this.newPayeeAcctNo.input(accountNumber);
        //await _PaymentsPages.PartnerBankPayment.addPayeeBtn.click();
    }

    // public async uploadFileByTXN(fileType: string, fileFormat: string, uploadFileName: string): Promise<string> {
    //     let _FilesPages = new FilesPages();
    //     let fileName: string = null;
    //     await this.uploadFileCommon(_FilesPages, fileType, fileFormat, uploadFileName, constVal.approvalOptionLableMap.byTXN).then(
    //         (data) => {
    //             fileName = data;
    //         }
    //     );
    //     await this.uploadFileCommon2(_FilesPages);
    //     return await fileName;
    // }

    // public async uploadFileByFile(fileType: string, fileFormat: string, uploadFileName: string, approvalCurrency: string): Promise<string> {
    //     let _FilesPages = new FilesPages();
    //     let fileName: string = null;
    //     await this.uploadFileCommon(_FilesPages, fileType, fileFormat, uploadFileName, constVal.approvalOptionLableMap.byFile).then(
    //         (data) => {
    //             fileName = data;
    //         }
    //     );
    //     await _FilesPages.uploadFilePage.approvalCurrency.select(approvalCurrency);
    //     await this.uploadFileCommon2(_FilesPages);
    //     return await fileName;
    // }

    // //Manage Files -> filter by Name -> click file name -> enter View File -> Click File Name -> enter View Payment(UX Screen)
    // public async goToViewUploadPayment(fileName: string): Promise<void> {
    //     let _PaymentsPages = new PaymentsPages();
    //     await this.goToViewUploadPaymentCommon(fileName);
    //     await _PaymentsPages.crossBoarderACHPage.loadCondition4ViewPayment();
    // }

    // //Manage Files -> filter by Name -> click file name -> enter View File -> Click File Name -> enter View Payment(OLD UI)
    // public async goToViewUploadPaymentOldUI(fileName: string): Promise<void> {
    //     let _PaymentsPages = new PaymentsPages();
    //     await this.goToViewUploadPaymentCommon(fileName);
    //     await _PaymentsPages.crossBoarderACHPage.loadCondition4ViewPaymentOldUI();
    // }

    //My Approve -> By File -> Filter by Name -> click File Name -> enter View Screen
    public async goToMyApprovalByFileViewFile(fileNameByFile: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.filter.input(fileNameByFile);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.byFileFileNameRef.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForViewFile();
    }

    // private async uploadFileCommon(_FilesPages: FilesPages, fileType: string, fileFormat: string, uploadFileName: string, approvalOption: string): Promise<string> {

    //     let filePath: string = null;
    //     let fileName: string = null;
    //     await _FilesPages.openMenu(Menu.Files.UploadFile);
    //     await _FilesPages.uploadFilePage.loadCondition();
    //     await _FilesPages.uploadFilePage.fileType.select(fileType);
    //     await _FilesPages.uploadFilePage.fileFormat.select(fileFormat);
    //     await _FilesPages.uploadFilePage.fileName.select(uploadFileName).then(
    //         (data) => {
    //             filePath = data;
    //             console.log(filePath);
    //             let pos: number = filePath.lastIndexOf('/');
    //             fileName = filePath.substr(pos + 1);
    //             console.log(fileName);
    //         });
    //     await _FilesPages.uploadFilePage.amendPaymentDate.input(utils.formatDate2String(new Date(), 'DD-MMM-YYYY'));
    //     await _FilesPages.uploadFilePage.approvalOption.select(approvalOption);
    //     return await fileName;
    // }

    // private async uploadFileCommon2(_FilesPages: FilesPages): Promise<void> {
    //     await _FilesPages.uploadFilePage.uploadFileButton.click();
    //     await browser.sleep(5000);//wait for MQ procssing
    // }

    // private async goToViewUploadPaymentCommon(fileName: string): Promise<void> {
    //     let _FilesPages = new FilesPages();
    //     let _PaymentsPages = new PaymentsPages();
    //     await _FilesPages.openMenu(Menu.Files.ManageFiles);
    //     await _PaymentsPages.crossBoarderACHPage.loadCondition4MngFile();
    //     await _PaymentsPages.crossBoarderACHPage.filterButton.click();
    //     await _PaymentsPages.crossBoarderACHPage.fileNameFilterValue.input(fileName);
    //     await _PaymentsPages.crossBoarderACHPage.goFilterBtn.click();
    //     await _PaymentsPages.crossBoarderACHPage.loadCondition4MngFile();
    //     await _PaymentsPages.crossBoarderACHPage.uploadFileNameLink.jsClick();
    //     await _PaymentsPages.crossBoarderACHPage.loadCondition4ViewFile();
    //     await _PaymentsPages.crossBoarderACHPage.uploadPaymentLink.jsClick();
    // }
}
