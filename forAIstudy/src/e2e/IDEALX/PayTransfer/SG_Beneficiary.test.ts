/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _optPages = new PaymentsPages();
let testData = _optPages.fetchTestData("SG_testData_01.json");

describe('Beneficiary', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Beneficiary.SIT.loginCompanyId : testData.Beneficiary.UAT.loginCompanyId, SIT ? testData.Beneficiary.SIT.loginUserId : testData.Beneficiary.UAT.loginUserId,testData.Beneficiary.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let domesticPayeeName = "";
    let payNowName = "";
    let payNowPayeeNickName = "";
    let payeeBankName = ""

    it('Create Domestic Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        domesticPayeeName = 'DomesticPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(domesticPayeeName);
        //due to IDXP-2000
        // await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        // await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        // await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        await browser.sleep(500);
        await _optPages.BeneficiaryPage.retriveNameBtn.clickIfExist();
        await _optPages.BeneficiaryPage.dismiss.clickIfExist();
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.newPayeePrintedName);
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(domesticPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains(testData.Beneficiary.sgAccountTransfer)
        ]);
    });

    it('Edit Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();
        await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(domesticPayeeName);
        await _optPages.BeneficiaryPage.editNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForEditBenePage();

        //clean
        await _optPages.BeneficiaryPage.newPayeeName.clean();
        // await _optPages.BeneficiaryPage.newPayeeAdd1.clean();

        //input
        let editPayeeName = 'Payee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(editPayeeName);
        await _optPages.BeneficiaryPage.addAddress.click();
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.editNewPayeeAdd1);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(editPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(editPayeeName),
            await ensure(_optPages.BeneficiaryPage.centerAddress1).textIs(testData.Beneficiary.editNewPayeeAdd1),
        ]);

        //delete payee 
        await deletePayee(domesticPayeeName);
    });

    it('Create a new Paynow Payee', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.payNowProxy.click();
        await _optPages.BeneficiaryPage.proxyTypeMobNum.input(testData.Beneficiary.proxyTypeMobNum);
        await _optPages.BeneficiaryPage.retrievePayNowName.click();
        payNowPayeeNickName = 'PayNowName' + generatedID();
        await _optPages.BeneficiaryPage.newPayNowNickName.input(payNowPayeeNickName);
        // await _optPages.BeneficiaryPage.payNowCanClick();
        payNowName = await _optPages.BeneficiaryPage.retrievePayNowSpan.getText();
        await _optPages.BeneficiaryPage.submit.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.input(payNowPayeeNickName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayNowPayeeName).textIs(payNowName),
            await ensure(_optPages.BeneficiaryPage.centerMobileProxy).textContains(testData.Beneficiary.proxyTypeMobNum),
        ]);
    });

    it('Delete Paynow Payee.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payNowPayeeNickName);
        await _optPages.BeneficiaryPage.loadConditionForDeletePayee();
        await ensure(_optPages.BeneficiaryPage.centerPayNowPayeeName).textIs(payNowName);
        await _optPages.BeneficiaryPage.deleteNewPayee.jsClick();
        await _optPages.BeneficiaryPage.confirmDelete.jsClick();
        await _optPages.BeneficiaryPage.dismiss.jsClick();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.beneficiaryResult).textIs("No data to display")
        ]);
    });

    it('Create International Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.bankCategory.select("Other Bank");
        await _optPages.BeneficiaryPage.OtherBankType.select("Foreign currency / overseas payment");
        await _optPages.BeneficiaryPage.enterManually.click();
        payeeBankName = "payeeBank" + generatedID();
        await _optPages.BeneficiaryPage.payeeBankName.input(payeeBankName);
        await _optPages.BeneficiaryPage.payeeBankAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newPayeeAcctNumber);

        await _optPages.BeneficiaryPage.newPayeeName.input(testData.Beneficiary.newPayeeName);
        // await _optPages.BeneficiaryPage.newPayeeNickName.input(testData.Beneficiary.newPayeeName);
        let payeeNickName = 'interNickName' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeNickName.input(payeeNickName);
        console.log(payeeNickName);
        await _optPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _optPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode)
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.newPayeePrintedName);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payeeNickName);
        await _optPages.BeneficiaryPage.loadCondition();
        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(testData.Beneficiary.newPayeeName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.payeeLocation),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.townCity),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.newPayeeAdd1),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.newPayeeAdd2),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.postalCode),
        ]);
    });

    it('Edit International Beneficiary.', async function () {
        await _optPages.BeneficiaryPage.editNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForEditBenePage();
        await _optPages.BeneficiaryPage.newPayeeName.clean();
        let editPayeeName = 'International' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(editPayeeName);
        await _optPages.BeneficiaryPage.switchFormatButton.click();
        
        await _optPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.editPayeeLocation);
        await _optPages.BeneficiaryPage.townCity.input(testData.Beneficiary.editTownCity);
        await _optPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
        await browser.sleep(5000);
        await _optPages.BeneficiaryPage.postalCode.clean();
        await browser.sleep(5000);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(editPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(editPayeeName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.streetName),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.editPayeeLocation),
            await ensure(_optPages.BeneficiaryPage.addressValue).textContains(testData.Beneficiary.editTownCity),
        ]);

        //delete payee 
        await deletePayee(editPayeeName);
    });

    //add for AB-9011:Payable To field value contain special char(/a-zA-Z0-9 `~!@#$%&()_-+={[}]$/;)
    it('Create DD Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.chequeOrDemand.jsClick();
        await _optPages.BeneficiaryPage.ddPaymentOption.jsClick();
        let ddPayeeName = 'DemandDraftPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(ddPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(ddPayeeName);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.chequeDDPrintedName);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(ddPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(ddPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains(testData.Beneficiary.DDpaymentValue)
        ]);
        await deletePayee(ddPayeeName);
    });
    //add for AB-9011:Payable To field value contain special char(/a-zA-Z0-9 `~!@#$%&()_-+={[}]$/;)
    it('Create cheque Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();   
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.chequeOrDemand.jsClick();
        await _optPages.BeneficiaryPage.chequePaymentOption.jsClick();
        let chequePayeeName = 'chequePayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(chequePayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(chequePayeeName);
        // await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        // await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.chequeDDPrintedName);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(chequePayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(chequePayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains(testData.Beneficiary.chequPaymentValue)
        ]);
        await deletePayee(chequePayeeName);
    });

    //add for IDXP-1243 EDP Payee
    it('Create EDP Beneficiary.', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        let EDPPayeeName = 'EDPPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(EDPPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.input(EDPPayeeName);
        await _optPages.BeneficiaryPage.addAddress.click();
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        // await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.retriveNameBtn.clickIfExist();
        await _optPages.BeneficiaryPage.dismiss.clickIfExist();
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.newPayeePrintedName);
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newPayeeAcctNumber);

        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(EDPPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(EDPPayeeName),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains(testData.Beneficiary.sgEDP)
        ]);
        //delete payee 
        await deletePayee(EDPPayeeName);

});

    it('Create a new Paynow EDPPayee', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.selectedCountry.select(testData.Beneficiary.Country);
        await _optPages.BeneficiaryPage.payNowProxy.click();
        await _optPages.BeneficiaryPage.proxyTypeMobNum.input(testData.Beneficiary.proxyTypeMobNum);
        await _optPages.BeneficiaryPage.retrievePayNowName.click();
        let payNowPayeeEDPNickName = 'EDPPayNowName' + generatedID();
        await _optPages.BeneficiaryPage.newPayNowNickName.input(payNowPayeeEDPNickName);
        // await _optPages.BeneficiaryPage.payNowCanClick();
        payNowName = await _optPages.BeneficiaryPage.retrievePayNowSpan.getText();
        await _optPages.BeneficiaryPage.submit.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.input(payNowPayeeEDPNickName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayNowPayeeName).textIs(payNowName),
            await ensure(_optPages.BeneficiaryPage.centerMobileProxy).textContains(testData.Beneficiary.proxyTypeMobNum),
            await ensure(_optPages.BeneficiaryPage.paymentOptions).textContains(testData.Beneficiary.sgEDP)
        ]);
        //delete payee 
        await deletePayee(payNowPayeeEDPNickName);
    });

     //add for R8.7 IEBAA-1122:Download payee
     it('Download Beneficiary', async function () {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.downloadPayeeTab.click();
        await _optPages.BeneficiaryPage.approveStatusLabel.jsClick();
        await _optPages.BeneficiaryPage.search.input("Approved");
        await ensure(_optPages.BeneficiaryPage.search).textContains("Approved");
        await _optPages.BeneficiaryPage.approveStatusSelectAll.jsClick();
        await _optPages.BeneficiaryPage.approveStatus.jsClick();
        await _optPages.BeneficiaryPage.submit.click();
    });
});

export async function deletePayee(payeename : string) {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payeename);
        await _optPages.BeneficiaryPage.deletePayeeBtn.click();
        await _optPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _optPages.BeneficiaryPage.confirmDelete.click();
        await _optPages.BeneficiaryPage.loadConditionForDismissButton();
        await _optPages.BeneficiaryPage.dismiss.click();
}
