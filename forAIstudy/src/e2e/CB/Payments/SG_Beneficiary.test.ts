/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _optPages = new PaymentsPages();
let testData = _optPages.fetchTestData("SG_testData.json");

describe('Beneficiary', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Beneficiary.SIT.loginCompanyId : testData.Beneficiary.UAT.loginCompanyId, SIT ? testData.Beneficiary.SIT.loginUserId : testData.Beneficiary.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    let domesticPayeeName = "";
    let payNowName = "";
    let payNowPayeeNickName = "";

    it('Create Domestic Beneficiary.', async function () {
        await _optPages.openMenu(Menu.Payments.Beneficiary);
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        domesticPayeeName = 'DomesticPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
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
        await _optPages.openMenu(Menu.Payments.Beneficiary);
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(domesticPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();
        await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(domesticPayeeName);
        await _optPages.BeneficiaryPage.editNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForEditBenePage();

        //clean
        await _optPages.BeneficiaryPage.newPayeeName.clean();
        await _optPages.BeneficiaryPage.newPayeeAdd1.clean();

        //input
        let editPayeeName = 'Payee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(editPayeeName);
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
    });

    it('Create a new Paynow Payee', async function () {
        await _optPages.openMenu(Menu.Payments.Beneficiary);
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.payNowProxy.click();
        await _optPages.BeneficiaryPage.proxyTypeMobNum.input(testData.Beneficiary.proxyTypeMobNum);
        await _optPages.BeneficiaryPage.retrievePayNowName.click();
        payNowPayeeNickName = 'PNnickName' + generatedID();
        await _optPages.BeneficiaryPage.newPayNowNickName.input(payNowPayeeNickName);
        await _optPages.BeneficiaryPage.payNowCanClick();
        payNowName = await _optPages.BeneficiaryPage.retrievePayNowSpan.getText();
        await _optPages.BeneficiaryPage.submit.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payNowName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayNowPayeeName).textIs(payNowName),
            await ensure(_optPages.BeneficiaryPage.centerMobileProxy).textContains(testData.Beneficiary.proxyTypeMobNum),
        ]);
    });

    it('Delete Paynow Payee.', async function () {
        await _optPages.openMenu(Menu.Payments.Beneficiary);
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payNowPayeeNickName);
        await _optPages.BeneficiaryPage.loadConditionForDeletePayee();
        await ensure(_optPages.BeneficiaryPage.centerPayNowPayeeName).textIs(payNowName);
        await _optPages.BeneficiaryPage.deleteNewPayee.jsClick();
        await _optPages.BeneficiaryPage.confirmDelete.jsClick();
        await _optPages.BeneficiaryPage.dismiss.jsClick();
        await _optPages.BeneficiaryPage.loadConditionOnCreatePage();
        // await _optPages.BeneficiaryPage.payeeFilter.clean();
        // await _optPages.BeneficiaryPage.payeeFilter.input(payNowPayeeNickName);

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.payeeNum).textIs("0")
        ]);
    });

    it('Edit International Beneficiary.', async function () {
        await _optPages.openMenu(Menu.Payments.Beneficiary);
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _optPages.BeneficiaryPage.newPayeeName.input(testData.Beneficiary.newPayeeName);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.bankCategory.select("Other Bank");
        await _optPages.BeneficiaryPage.OtherBankType.select("Foreign currency / overseas payment");
        await _optPages.BeneficiaryPage.newPayeeBankId.input(testData.Beneficiary.newPayeeBankId);
        await _optPages.BeneficiaryPage.newPayeeBankIdButton.click();
        await _optPages.BeneficiaryPage.selectBankId.click();
        await _optPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.printedName.input(testData.Beneficiary.newPayeePrintedName);
        let payeeNickName = 'interNickName' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeNickName.input(payeeNickName);
        await ensure(_optPages.BeneficiaryPage.newPayeeNumber).textContains(testData.Beneficiary.newPayeeAcctNumber);
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payeeNickName);
        await _optPages.BeneficiaryPage.loadCondition();
        await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(testData.Beneficiary.newPayeeName)
        await _optPages.BeneficiaryPage.editNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForEditBenePage();
        await _optPages.BeneficiaryPage.newPayeeName.clean();
        let editPayeeName = 'International' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(editPayeeName);
        await _optPages.BeneficiaryPage.newPayeeNickName.clean()
        await _optPages.BeneficiaryPage.next.click();
        await _optPages.BeneficiaryPage.dismiss.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(editPayeeName);
        await _optPages.BeneficiaryPage.loadCondition();

        await Promise.all([
            await ensure(_optPages.BeneficiaryPage.centerPayeeName).textIs(editPayeeName)
        ]);
    });

    //add for AB-9011:Payable To field value contain special char(/a-zA-Z0-9 `~!@#$%&()_-+={[}]$/;)
    it('Create DD Beneficiary.', async function () {

        await _optPages.openMenu(Menu.Payments.Beneficiary);
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        let ddPayeeName = 'DemandDraftPayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(ddPayeeName);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.chequeOrDemand.jsClick();
        await _optPages.BeneficiaryPage.ddPaymentOption.jsClick();
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
    });
    //add for AB-9011:Payable To field value contain special char(/a-zA-Z0-9 `~!@#$%&()_-+={[}]$/;)
    it('Create cheque Beneficiary.', async function () {
        await _optPages.openMenu(Menu.Payments.Beneficiary);
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.createNewPayee.jsClick();
        await _optPages.BeneficiaryPage.loadConditionForCreateBenePage();
        let chequePayeeName = 'chequePayee' + generatedID();
        await _optPages.BeneficiaryPage.newPayeeName.input(chequePayeeName);
        await _optPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _optPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _optPages.BeneficiaryPage.newPayeeAdd3.input(testData.Beneficiary.newPayeeAdd3);
        await _optPages.BeneficiaryPage.chequeOrDemand.jsClick();
        await _optPages.BeneficiaryPage.chequePaymentOption.jsClick();
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
    });
});