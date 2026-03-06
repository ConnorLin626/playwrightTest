/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from "protractor";
import { Page, component, log, Button, TextInput, waitForI3Loading } from '../../../lib';
import { HtmlSelect } from "../../../lib/components";

@log export class StopChequePage extends Page {
    //The Below for Old Stop Cheque Type
    @component('//*[@id="contentDiv"]/form/table/tbody/tr[3]/td/div/ul/li/a') public stopI3Cheque: Button;
    @component('//a[@class="openbutton"]') public filterButtonI3: Button;
    @component('//select[@id="fromAccId"]') public accountNumberI3Stop: HtmlSelect;
    @component('//select[@name="debitAccountNumber"]') public debitAccountSelect: HtmlSelect;
    //@component('//*[@id="FirstPanel"]/tbody/tr[6]/td[2]/select') public selectChequeType: HtmlSelect;
    @component('//select[@name="multipleArray[0].chequeType"]') public selectChequeType: HtmlSelect;
    @component('//*[@id="fromChqNo_0"]') public inputChequeNumber: TextInput;
    @component('//a[@onclick="preview()"]') public previewI3Button: Button;
    @component('//a[@onclick="submit_submit()"]') public submitI3Button: Button;
    @component('//*[@id="FirstPanel"]/tbody/tr[2]/td[6]/a') public stopChequeRef: Button;
    @component('//a[contains(@onclick,"/bank/user/stopPaymentModify")]') public editButton: Button;
    @component('//input[@name="reason"]') public reasonStopChequeOnEditPage: TextInput;
    @component('//a[contains(@onclick,"bank/user/stopPaymentDeletePreview")]') public deleteButton: Button;
    @component('//a[contains(@onclick,"bank/user/stopPaymentDelete")]') public submitDelete: Button;
    @component("//input[@name='chalengeResponse']") public challengeResponseI3: TextInput;

    //Filter
    @component('//*[@id="filterpanel"]/td/span/a') public filterButton: Button;
    @component('//a[@class="openbutton active"]') public filterButtonByOpened: Button;
    @component('//select[@name="filterChequeType"]') public chequeType: HtmlSelect;
    @component('//select[@name="chequeStatus"]') public chequeStatus: HtmlSelect;
    @component('//input[@name="custRefNo"]') public custRefNo: TextInput;
    @component("//a[@href=\"javascript:submitSet('s1gcb');\"]") public goButton: Button;
    @component('//a[contains(@href,"app/bank/user/multipleStopPaymentView") and contains(text(),"EBSTC")]') public referenceLinkI3: Button;
    @component('//span[@class="openbuttonspan"]/a') public filter2Button: Button;

    //View Cheque Page
    @component('//*[@id="FirstPanel"]/tbody/tr[3]/td[3]') public fromAccountValue: TextInput;
    @component('//*[@id="FirstPanel"]/tbody/tr[7]/td[3]') public chequeNumberValue: TextInput;
    @component('//*[@id="FirstPanel"]/tbody/tr[2]/td[3]') public referenceValue: TextInput;
    @component('//*[@id="FirstPanel"]/tbody/tr[8]/td[3]') public statusValue: TextInput;
    @component('//a[@onclick="preview()"]') public previewEditButton: Button;
    @component('//a[@onclick="submitAct()"]') public submitEditButton: Button;
    @component('//*[@id="FirstPanel"]/tbody/tr[6]/td[3]/div') public reasonStopChequeValue: TextInput;
    @component('//a[contains(@onclick,"bank/user/stopPaymentApprove")]') public approveButton: Button;
    @component('//a[contains(@onclick,"/userServlet/app/bank/user/acceptStopPayment")]') public approveButtonOnChallenge: Button;
    @component('//*[@id="FirstPanel"]/tbody/tr[2]/td') public transactionResult: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.filterButtonI3.element), this.filterButtonI3.getTimeOut());
    }

    public async loadConditionForCreatePage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.stopI3Cheque.element), this.stopI3Cheque.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.accountNumberI3Stop.element), this.accountNumberI3Stop.getTimeOut());
    }

    public async loadConditionOnView() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.stalenessOf(this.referenceLinkI3.element), this.referenceLinkI3.getTimeOut());
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
    }

    public async loadConditionForSubmit() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewI3Button.element), this.previewI3Button.getTimeOut());
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.submitI3Button.element), this.submitI3Button.getTimeOut());
    }

    public async loadConditionForSubmitEdit() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewEditButton.element), this.previewEditButton.getTimeOut());
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.submitEditButton.element), this.submitEditButton.getTimeOut());
    }

    public async loadConditionForApprove() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.approveButton.element), this.approveButton.getTimeOut());
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.approveButtonOnChallenge.element), this.approveButtonOnChallenge.getTimeOut());
    }

    public async loadConditionForSubmitDelete() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.deleteButton.element), this.deleteButton.getTimeOut());
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.submitDelete.element), this.submitDelete.getTimeOut());
    }

    public async loadConditionForReferenceLinkI3() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.filterButtonByOpened.element), this.filterButtonByOpened.getTimeOut());
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.referenceLinkI3.element), this.referenceLinkI3.getTimeOut());
    }

    public async loadConditionForDebitAccountSelectValue() {
        await waitForI3Loading();
        await browser.sleep(5000);
        if (! await this.debitAccountSelect.valueContains("-1")) {
            await browser.wait(
                ExpectedConditions.elementToBeClickable(this.selectChequeType.element), this.selectChequeType.getTimeOut());
        } else {
            await browser.sleep(5000);
            await browser.wait(
                ExpectedConditions.elementToBeClickable(this.selectChequeType.element), this.selectChequeType.getTimeOut());
        }
    }

    public async goToViewStopChequeViaRef(reference: string) {
        let chequeType = "Show All";
        let status = "Show All";
        await this.loadCondition();
        await this.filterButton.jsClick();
        await this.chequeType.select(chequeType);
        await this.chequeStatus.select(status);
        await this.custRefNo.clean();
        await this.custRefNo.input(reference);
        await this.goButton.jsClick();
        await this.loadConditionForReferenceLinkI3();
        await this.referenceLinkI3.jsClick();
    }
}