/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Page, TextInput, Button, OptionSelect, DateSelect, RadioButton, FileSelect, ListSelect, WebComponent } from '../../../lib';
import * as utils from '../../../lib/utils';
import * as constVal from '../../../pages/CB/Payments/constantValue';
import { PaymentsPages, FilesPages } from '../../../pages/IDEALX';


@log export class SGPayNowPage extends Page {
    @component('//*[@id="icon__make_payment"]')public payNowPayment: Button;

    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//date-picker[@formcontrolname="paymentDate"]') public paymentDate: DateSelect;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//multi-level-dropdown-reskin[@formcontrolname="gstPurposeCode"]') public purposeOfPayment: OptionSelect;
    @component('//input[@placeholder="Purpose code number or description"]') public filterRppc: TextInput;
    @component('//*[@class="truncate-searchResult text-sm text-slate-950 flex-1"]') public selectFirstResult: TextInput;
    //"Chose Date" at Make a Payment Payment Screen 
    @component('//input[@id="set_date"]') public choseDateRadioButton: Button;
    //"Payment priority" at Make a Payment Payment Screen 
    @component('//input[@id="immediate_type"]') public fastTypeRadioButton: Button;
    //"Payment priority" at Make a Payment Payment Screen 
    @component('//input[@id="next_day_paynow"]') public nextDateTypeRadioButton: Button;
    //"status" field at View Single(eg FAST) Payment Screen
    @component('//div[@id="domestic-view-status"]') public statusLableViewSinglePayment: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;

    //"payee name" at View Single(eg FAST) Payment Screen
    @component('//span[@id="domestic-view-payNow-proxy"]') payNowPayeeNameViewSinglePayment: TextInput;
    @component('//span[@id="domestic-view-newPayNow-proxy"]') newPayNowPayeeNameViewSinglePayment: TextInput;
    //"payment date" at View Single(eg FAST) Payment Screen
    @component('//span[@id="domestic-view-paymentDate"]') paymentDateViewSinglePayment: TextInput;
    @component('//a[@id="ux-tab-EXISTING"]') public existingTab: Button;
    @component('//a[@id="ux-tab-NEWPAYNOW"]') public payNowTab: Button;
    @component('//*[@id="ux-tab-labelPayNow"]') public payNowTab4Bulk: Button;
    @component("//*[@class='idealx-dialog__container cognitive-breaks-dialog']") public haveYouCheckDialog: WebComponent;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    @component('//input[@id="proxyTypeCmpnyIde"]') public companyIdentifierRadio: Button;
    @component('//input[@id="proxyTypeMobNum"]') public mobileNumberRadio: Button;
    @component('//input[@id="proxyTypeNF"]') public nfRadio: Button;
    //"from account" at View Single(eg FAST) Payment JSP Screen via Manage Files
    @component('//*[@id="domestic-view-accountNum"]') public fromAccount_ViewUploadSinglePayment: TextInput;
    //"amount" at View Single(eg FAST) Payment JSP Screen via Manage Files
    @component('//*[@id="domestic-view-deductAmount"]') public amount_ViewUploadSinglePayment: TextInput;
    //"payee name" at View Single(eg FAST) Payment JSP Screen via Manage Files
    @component('//*[@id="domestic-view-newPayNow-proxy"]') public payeeName_ViewUploadSinglePayment: TextInput;
    //"status" at View FAST Payment JSP Screen via Manage Files
    @component('//*[@id="domestic-view-status"]') public status_ViewUploadSinglePayment: TextInput;
    //"status" at View GIRO Payment JSP Screen via Manage Files
    @component('//tr[@data-title="Transaction Information"]/td/div/div[2]/table/tbody/tr/td/div/table[@id="uploadpaymentDetails"]/tbody/tr[7]/td[2]') public statusGIRO_ViewUploadSinglePaymentOldUI: TextInput;
    //"approved by" at View Single(eg FAST) Payment JSP Screen via Manage Files
    @component('//*[@id="domestic-view-paymentDate"]') public cutoff_ViewUploadSinglePaymentOldUI: TextInput;
    @component('//dbs-radio-group[@formcontrolname="payNowProxyType"]') public payNowProxyTypeRadioButton: RadioButton;
    @component('//input[@name="proxyTypeCmpnyIdeInput"]') public proxyTypeCmpnyIde: TextInput;
    @component('//dbs-paynow-mobile-country/p-auto-complete') public proxyTypeMobNumCountry: OptionSelect;
    @component('//input[@name="proxyTypeMobNumInput"]') public proxyTypeMobNum: TextInput;
    @component('//input[@name="proxyTypeNFInput"]') public proxyTypeNF: TextInput;
    @component('//input[@id="saveToList"]') public savePayee: Button;
    @component('//button[@name="add-payee"]') public addPayee: Button;
    @component("//ng-component/div/ng-component/div/dbs-top-panel/div/div[2]/ul/li/span") public nicknameMsg: TextInput;
    @component('//*[@formcontrolname="nickname"]') public nicknameField: TextInput;
    //different with the xpath of normal bulk payment(BulkPaymentpage.transactionStatusValue), paynow is "div[3]/div[2]/strong
    //"status" in transaction List View Bulk Payment Screen
    @component('//strong[@id="bulk-view-pendingStatus_0"]') public statusLableViewPayNowBulkPayment: TextInput;
    //"PayNow proxy" in transaction List View Bulk Payment Screen
    @component('//div[@id="paynow-proxy-mobNum-0"]') public proxyValueViewPayNowBulkPayment: TextInput;

    @component('//button[@name="upload-file"]') public payNowEnqUploadFileButton: Button;
    @component('//input[@id="PayNowFileUpload"]') public payNowEnqChoseFileButton: FileSelect;
    @component('//input[@id="showFileName2-input"]') public uploadFileNameInputBox: TextInput;
    @component('//button[@name="upload"]') public doUploadButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//input[@name="filter-search-data"]') public payNowFilterSearch: TextInput;
    @component('//div[@id="paynow-enq-data-list"]') public payNowDatatList: ListSelect;
    @component('//input[@id="selectTName0"]') public payNowFirstData: ListSelect;
    @component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;
    //"status" in PayNow Enq List
    @component('//td[@id="paynow-enq-data-status-0"]')
    public statusLabelPayNowEnqList: TextInput;
    @component("//button[@name='Approve']") public payNowApproveButton: Button;
    @component("//button[@id='paynowenqlistDelete']") public deleteButton: Button;
    @component("//button[@id='dialogDelete']") public dialogDeleteButton: Button;

    @component('//input[@name="payee-selector"]') public filterExistingPayee: TextInput;
    @component('//button[@name="add"]') public addpayee: Button;

    public async loadCondition() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
        await browser.sleep(3000)
    }

    public async loadCondition4ViewSinglePayment() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusLableViewSinglePayment.element), this.statusLableViewSinglePayment.getTimeOut());
    }

    public async loadCondition4ViewPayNowBulkPayment() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusLableViewPayNowBulkPayment.element), this.statusLableViewPayNowBulkPayment.getTimeOut());
    }

    public async loadCondition4PayNowEnq() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.payNowEnqUploadFileButton.element), this.payNowEnqUploadFileButton.getTimeOut());
    }

    public async loadCondition4PayNowUploadFile() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.uploadFileNameInputBox.element), this.uploadFileNameInputBox.getTimeOut());
    }

    public async loadCondition4PayNowApprove() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.challengeResponse.element), this.challengeResponse.getTimeOut());
    }

    public async loadCondition4PayNowExistingPayee() {
        let _PaymentsPages = new PaymentsPages();
        await utils.waitForUXLoading();
        await browser.sleep(2000);//coding as normal step, but happen frequently "field required" when click "next", so sleep to control the step
        await browser.wait(ExpectedConditions.elementToBeClickable(_PaymentsPages.SGPayNowPage.amount.element), _PaymentsPages.SGPayNowPage.amount.getTimeOut());
    }

    public async addExisting4Single(exsitingPayeeName: string): Promise<void> {
        await this.addExistingPayNow4Single(exsitingPayeeName);
    }
    public async addExistingPayNow4Single(exsitingPayeeName: string): Promise<void> {
        await this.existingTab.click();
        await this.existingPayee.select(exsitingPayeeName);
    }

    public async addExistingPayNow4Bulk(exsitingPayeeName: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        _PaymentsPages.SGPayNowPage.addExistingPayee(exsitingPayeeName);
    }

    public async addNewPayNow4Single(payNowProxyType: string, payNowProxyValue: string, payNowProxyCountryPhoneCode?: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        await this.payNowTab.click();
        await this.continueBtn.jsClick();//add for IDXP-1492
        if (payNowProxyType === constVal.payNowTypeCodeMap.U) {
            await this.companyIdentifierRadio.jsClick();
            await this.proxyTypeCmpnyIde.input(payNowProxyValue);
        } else if (payNowProxyType === constVal.payNowTypeCodeMap.M) {
            await this.mobileNumberRadio.jsClick();
            await this.proxyTypeMobNumCountry.select(payNowProxyCountryPhoneCode);
            await this.proxyTypeMobNum.input(payNowProxyValue);
        } else if (payNowProxyType === constVal.payNowTypeCodeMap.N) {
            await this.nfRadio.jsClick();
            await this.proxyTypeNF.input(payNowProxyValue);
        }
        await _PaymentsPages.MEPSPaymentPage.newPayeeNickname.input('newPayeeNickname');
    }

    public async addNewPayNow4Bulk(payNowProxyType: string, payNowProxyValue: string, payNowProxyCountryPhoneCode?: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        await this.payNowTab4Bulk.click();
        await this.continueBtn.jsClickIfExist();
        if (payNowProxyType === constVal.payNowTypeCodeMap.U) {
            await this.payNowProxyTypeRadioButton.select(constVal.payNowProxyTypeLableMap.U);
            await this.proxyTypeCmpnyIde.input(payNowProxyValue);
        } else if (payNowProxyType === constVal.payNowTypeCodeMap.M) {
            await this.payNowProxyTypeRadioButton.select(constVal.payNowProxyTypeLableMap.M);
            await this.proxyTypeMobNumCountry.select(payNowProxyCountryPhoneCode);
            await this.proxyTypeMobNum.input(payNowProxyValue);
        } else if (payNowProxyType === constVal.payNowTypeCodeMap.N) {
            await this.payNowProxyTypeRadioButton.select(constVal.payNowProxyTypeLableMap.N);
            await this.proxyTypeNF.input(payNowProxyValue);
        }
        await _PaymentsPages.MEPSPaymentPage.newPayNowNickName.input('newPayNowNickName');
        await this.addPayee.click();
    }
    public async uploadPayNowEnq(uploadFileName: string): Promise<string> {
        let filePath: string = null;
        let fileName: string = null;
        let _FilesPages = new FilesPages();
        let _PaymentsPages = new PaymentsPages();
        await _FilesPages.uploadFilePage.fileEnquiryTab.click();
        await _PaymentsPages.SGPayNowPage.loadCondition4PayNowEnq();
        await _PaymentsPages.SGPayNowPage.payNowEnqUploadFileButton.click();
        await _PaymentsPages.SGPayNowPage.loadCondition4PayNowUploadFile();
        await _PaymentsPages.SGPayNowPage.payNowEnqChoseFileButton.select(uploadFileName).then(
            (data) => {
                filePath = data;
                console.log(filePath);
                let pos: number = filePath.lastIndexOf('/');
                fileName = filePath.substr(pos + 1);
                console.log(fileName);
            });
        await _PaymentsPages.SGPayNowPage.doUploadButton.click();
        await _PaymentsPages.SGPayNowPage.dismissButton.click();

        return await fileName;

    }
    public async goToNowEnqItem(uploadFileName: string): Promise<void> {
        let _FilesPages = new FilesPages();
        let _PaymentsPages = new PaymentsPages();
        await _FilesPages.uploadFilePage.fileEnquiryTab.click();
        await _PaymentsPages.SGPayNowPage.loadCondition4PayNowEnq();
        await _PaymentsPages.SGPayNowPage.payNowFilterSearch.input(uploadFileName);
        await _PaymentsPages.SGPayNowPage.loadCondition4PayNowEnq();
    }

    public async checkPayNowEnqItem(uploadFileName: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.SGPayNowPage.goToNowEnqItem(uploadFileName);
        //use jsClick instead of selectAll() to increase the process
        //    await _PaymentsPages.SGPayNowPage.payNowDatatList.setDataListType(utils.DATALIST_TYPE.PAYNOW).selectAll();
        await _PaymentsPages.SGPayNowPage.payNowFirstData.jsClick();
    }


    public async approvePayNowEnqItem(resposneCode: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.SGPayNowPage.payNowApproveButton.jsClick();
        await _PaymentsPages.SGPayNowPage.loadCondition4PayNowApprove();
        await _PaymentsPages.SGPayNowPage.challengeResponse.input(resposneCode);
        await _PaymentsPages.SGPayNowPage.approveButton.jsClick();
        await _PaymentsPages.SGPayNowPage.dismissButton.jsClick();
    }
    public async addExistingPayee(testDate: string): Promise<void> {
        await this.filterExistingPayee.input(testDate);
        await this.addpayee.jsClick();
    }
}