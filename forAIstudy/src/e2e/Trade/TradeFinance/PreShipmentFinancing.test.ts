/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { ensure, generatedID, SIT, handlerCase } from "../../../lib";
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

let customerRefA1 = "";
// for Select Approver,Edit,Reject, saveand exist, Delete in the edit screen
let customerRefERD = "";
// for reject,save as template,delete in the center screen
let customerRefCen = "";
// for View report
let customerRefReport = "";
let customerRef = "";

describe('Pre Shipment Financing', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.PreShipmentFinancing.SIT.loginCompanyId : testData.PreShipmentFinancing.UAT.loginCompanyId,
            SIT ? testData.PreShipmentFinancing.SIT.loginUserId : testData.PreShipmentFinancing.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Pre Shipment Financing', async function () {

        await createPRF().then(data => {
            customerRefA1 = data;
        });

        //Check on Edit Page
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefA1);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.PreShipmentFinancingPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.PreShipmentFinancingPage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.PreShipmentFinancingPage.invoiceAmtView).textContains(testData.PreShipmentFinancing.invoiceAmt),
            await ensure(_TradeFinancePages.PreShipmentFinancingPage.debitChargesFromAnotherAcctValue).isNotEmpty(),
			await ensureForR24PayeeFields()
        ]);
    });

    it('Approval in the Edit screen', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        if (0 !== customerRefA1.length) {
            await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefA1);
        } else {
            await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaFilter(testData.paymentType.TradeFinance, testData.paymentType.TradeFinance_PSF, testData.status.PendingApproval);
        }
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await _TradeFinancePages.PreShipmentFinancingPage.customerRef.getText().then(text => {
            customerRef = text.trim();
            console.error("Approval customerRef:" + customerRef);
        })
        await _TradeFinancePages.PreShipmentFinancingPage.approveButton.click();
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await _TradeFinancePages.PreShipmentFinancingPage.approvePassword.input(testData.PreShipmentFinancing.approvePassword);
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFViewPage();
        await ensure(_TradeFinancePages.PreShipmentFinancingPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });

    it('Offline Approval in the Approval screen', async function () {
        let customerRef = "";
        await createPRF().then(data => {
            customerRef = data;
        });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        if (0 !== customerRef.length) {
            await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        } else {
            await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaFilter(testData.paymentType.TradeFinance, testData.paymentType.TradeFinance_PSF, testData.status.PendingApproval);
        }
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await _TradeFinancePages.PreShipmentFinancingPage.customerRef.getText().then(text => {
            customerRef = text.trim();
            console.error("Offline Approval customerRef:" + customerRef);
        })
        await _TradeFinancePages.PreShipmentFinancingPage.offlineApproveBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await _TradeFinancePages.PreShipmentFinancingPage.approvalReason.input(testData.PreShipmentFinancing.approvePassword);
        await _TradeFinancePages.PreShipmentFinancingPage.selectApproverDorpDownList.selectByValue(SIT ? testData.PreShipmentFinancing.SIT.selectApprover : testData.PreShipmentFinancing.UAT.selectApprover);
        await _TradeFinancePages.PreShipmentFinancingPage.offlineSubmitBtn.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFViewPage();
        await ensure(_TradeFinancePages.PreShipmentFinancingPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });

    it('Select Approver in the Approval screen', async function () {
        await createPRF().then(data => {
            customerRefERD = data;
        });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await _TradeFinancePages.PreShipmentFinancingPage.selectApproverBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.selectApproverCheckBox.click();
        await _TradeFinancePages.PreShipmentFinancingPage.isEmail1.jsClick();
        await _TradeFinancePages.PreShipmentFinancingPage.submitButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await ensure(_TradeFinancePages.PreShipmentFinancingPage.selectedApproverValue).isNotEmpty();
    });

    it('Edit in the Approval screen', async function () {
        // await createPRF().then(data => {
        //     customerRefERD = data;
        // });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await _TradeFinancePages.PreShipmentFinancingPage.editBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.invoiceAmt.clean();
        await _TradeFinancePages.PreShipmentFinancingPage.invoiceAmt.input(testData.PreShipmentFinancing.invoiceAmtEdit);

		//for R24
		await inputForR24PayeeFields(true);

        await _TradeFinancePages.PreShipmentFinancingPage.submitButton.click();
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFConfirmPage();
        await _TradeFinancePages.PreShipmentFinancingPage.yesButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
		await Promise.all([
			await ensure(_TradeFinancePages.PreShipmentFinancingPage.invoiceAmt).textContains(testData.PreShipmentFinancing.invoiceAmtEdit),
			await ensureForR24PayeeFields(true)
		]);
    });

    it('Reject in the Approval screen', async function () {
        // let customerRef = "";
        // await createPRF().then(data => {
        //     customerRef = data;
        // });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await _TradeFinancePages.PreShipmentFinancingPage.rejectButton.click();
        await _TradeFinancePages.PreShipmentFinancingPage.rejectReason.input(testData.PreShipmentFinancing.rejectReason);
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFViewPage();
        await ensure(_TradeFinancePages.PreShipmentFinancingPage.currentStatus).textContainsLessOne(testData.status.ModificationRequired);
    });

    it('Save and Exist in the Approval screen', async function () {
        // await createPRF().then(data => {
        //     customerRef = data;
        // });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        // await _TradeFinancePages.PreShipmentFinancingPage.editBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.invoiceAmt.clean();
        await _TradeFinancePages.PreShipmentFinancingPage.invoiceAmt.input(testData.PreShipmentFinancing.invoiceAmtEdit);
        await _TradeFinancePages.PreShipmentFinancingPage.saveIncompleteBtn.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await ensure(_TradeFinancePages.PreShipmentFinancingPage.invoiceAmt).textContains(testData.PreShipmentFinancing.invoiceAmtEdit);
    });

    it('Delete in the Approval screen', async function () {
        // let customerRef = "";
        // await createPRF().then(data => {
        //     customerRef = data;
        // });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefERD);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await _TradeFinancePages.PreShipmentFinancingPage.deleteBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
    });

    it('Reject in the Transaction In Process screen', async function () {
        await createPRF().then(data => {
            customerRefCen = data;
        });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.customerRef.input(customerRefCen);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.rejectBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.rejectReason.input(testData.PreShipmentFinancing.rejectReason);
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
    });

    it('Save as Template in the Transaction In Process screen', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.selectProductType.selectByValue(testData.paymentType.TradeFinance);
        await _TradeFinancePages.transactionInProcessPage.selectSubProductType.selectByValue(testData.paymentType.TradeFinance_PSF);
        await _TradeFinancePages.transactionInProcessPage.selectStatusCd.select(testData.status.Template);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.saveTemplateBtn.click();
        let templateName = 'PSFTem' + generatedID();
        await _TradeFinancePages.transactionInProcessPage.templateName.input(templateName);
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
    });

    it('Delete in the Transaction In Process screen', async function () {
        // let customerRef = "";
        // await createPRF().then(data => {
        //     customerRef = data;
        // });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.customerRef.input(customerRefCen);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.deleteBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
    });

    it('Approval in the Transaction In Process screen', async function () {
        let customerRef = "";
        await createPRF().then(data => {
            customerRef = data;
        });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.customerRef.input(customerRef);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.approvalBtn.jsClick();
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.jsClick();
        await _TradeFinancePages.PreShipmentFinancingPage.approvePassword.input(testData.PreShipmentFinancing.approvePassword);
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
    });

    it('Offline Approval in the Transaction In Process screen', async function () {
        let customerRef = "";
        await createPRF().then(data => {
            customerRef = data;
        });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.customerRef.input(customerRef);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.offlineApproveBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.confirmButton.click();
        await _TradeFinancePages.PreShipmentFinancingPage.approvalReason.input(testData.PreShipmentFinancing.approvePassword);
        await _TradeFinancePages.PreShipmentFinancingPage.selectApproverDorpDownList.selectByValue(SIT ? testData.PreShipmentFinancing.SIT.selectApprover : testData.PreShipmentFinancing.UAT.selectApprover);
        await _TradeFinancePages.PreShipmentFinancingPage.offlineSubmitBtn.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
    });

    it('Offline Print in the Approval screen', async function () {
        await createPRF().then(data => {
            customerRefReport = data;
        });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRefReport);
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFEditPage();
        await _TradeFinancePages.PreShipmentFinancingPage.offlinePrintBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForOfflinePrintPage();
        await _TradeFinancePages.PreShipmentFinancingPage.printBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForViewReport(testData.PreShipmentFinancing.offlinereportTitle);
    });

    it('View in the Transaction In Process screen', async function () {
        await new NavigatePages().loginCB(SIT ? testData.PreShipmentFinancing.SIT.loginCompanyId : testData.PreShipmentFinancing.UAT.loginCompanyId,
            SIT ? testData.PreShipmentFinancing.SIT.loginUserId : testData.PreShipmentFinancing.UAT.loginUserId);

        // await createPRF().then(data => {
        //     customerRefCen = data;
        // });
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.customerRef.input(customerRefReport);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.viewBtn.click();
        await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForViewReport(testData.PreShipmentFinancing.viewReportTitle);
    });
});

export async function createPRF() {
	let customerRef = '';

	//pre step for create
	await preStepForCreatePRF().then(data => {
		customerRef = data;
	});

    //input detail data
    await _TradeFinancePages.PreShipmentFinancingPage.applicant.selectFirst();
    await _TradeFinancePages.PreShipmentFinancingPage.tradeLoanType.selectFirst();
    await _TradeFinancePages.PreShipmentFinancingPage.relatedlc.input(testData.PreShipmentFinancing.relatedlc);
    await _TradeFinancePages.PreShipmentFinancingPage.invoiceCcy.selectByValue(testData.PreShipmentFinancing.invoiceCcy);
    await _TradeFinancePages.PreShipmentFinancingPage.invoiceAmt.input(testData.PreShipmentFinancing.invoiceAmt);
    await _TradeFinancePages.PreShipmentFinancingPage.financeCcy.selectByValue(testData.PreShipmentFinancing.financeCcy);
    await _TradeFinancePages.PreShipmentFinancingPage.descriptionOfGoods.input(testData.PreShipmentFinancing.descriptionOfGoods);

	//for R24
	await inputForR24PayeeFields();

    await _TradeFinancePages.PreShipmentFinancingPage.debitAcctOnMaturity.selectFirst();
    await _TradeFinancePages.PreShipmentFinancingPage.debitChargesFromAnotherAcct.selectFirst();
    await _TradeFinancePages.PreShipmentFinancingPage.contactPerson.input(testData.PreShipmentFinancing.contactPerson);
    await _TradeFinancePages.PreShipmentFinancingPage.telCtrycode.selectByValue(testData.PreShipmentFinancing.telCtrycode);
    await _TradeFinancePages.PreShipmentFinancingPage.telAreacode.input(testData.PreShipmentFinancing.telAreacode);
    await _TradeFinancePages.PreShipmentFinancingPage.telNumber.input(testData.PreShipmentFinancing.telNumber);
    await _TradeFinancePages.PreShipmentFinancingPage.attachmentsOptions.selectByValue(testData.PreShipmentFinancing.attachmentsOptions);
    await _TradeFinancePages.PreShipmentFinancingPage.submitButton.click();
    await _TradeFinancePages.PreShipmentFinancingPage.loadConditionForPSFConfirmPage();
    await _TradeFinancePages.PreShipmentFinancingPage.yesButton.click();
    await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
    return customerRef;
};

export async function preStepForCreatePRF() {
	await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
	await _TradeFinancePages.PreShipmentFinancingPage.loadCondition();
	// step 1
	await _TradeFinancePages.PreShipmentFinancingPage.selectProductType.selectByValue(testData.paymentType.TradeFinance);
	await _TradeFinancePages.PreShipmentFinancingPage.selectSubProductType.selectByValue(testData.paymentType.TradeFinance_PSF);
	await _TradeFinancePages.PreShipmentFinancingPage.continueButton.click();

	// step 2
	let customerRef = 'PSF' + generatedID();
	await _TradeFinancePages.PreShipmentFinancingPage.custRef.input(customerRef);
	await _TradeFinancePages.PreShipmentFinancingPage.selectRouting.selectFirst();
	await _TradeFinancePages.PreShipmentFinancingPage.continueSaveButton.click();
	await Promise.all([
		await ensure(_TradeFinancePages.PreShipmentFinancingPage).isTradeSuccess(), // has success message.
	]);

	return customerRef;
}

export async function inputForR24PayeeFields(editFlag?: boolean) {
	const pre = editFlag ? 'edit11' : 'create';
	await _TradeFinancePages.PreShipmentFinancingPage.remitByButton.click();
	await _TradeFinancePages.PreShipmentFinancingPage.remitByOptions.selectFirst();
	await _TradeFinancePages.PreShipmentFinancingPage.payeeNameInput.input(pre + testData.PreShipmentFinancing.payeeName);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeAddr1Input.input(pre + testData.PreShipmentFinancing.payeeAddr1);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeAddr2Input.input(pre + testData.PreShipmentFinancing.payeeAddr2);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeAddr3Input.input(pre + testData.PreShipmentFinancing.payeeAddr3);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeCountryInput.selectFirst();
	await _TradeFinancePages.PreShipmentFinancingPage.payeeRefInput.input(pre + testData.PreShipmentFinancing.payeeRef);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeACNumInput.input(pre + testData.PreShipmentFinancing.payeeACNum);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeBankNameInput.input(pre + testData.PreShipmentFinancing.payeeBankName);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeBankAddr1Input.input(pre + testData.PreShipmentFinancing.payeeBankAddr1);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeBankAddr2Input.input(pre + testData.PreShipmentFinancing.payeeBankAddr2);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeBankAddr3Input.input(pre + testData.PreShipmentFinancing.payeeBankAddr3);
	await _TradeFinancePages.PreShipmentFinancingPage.payeeBankSWIFTInput.input(pre + testData.PreShipmentFinancing.payeeBankSWIFT);
	if(!editFlag) {
		await _TradeFinancePages.PreShipmentFinancingPage.inBankButton.click();
	}
	await _TradeFinancePages.PreShipmentFinancingPage.inBankNameInput.input(pre + testData.PreShipmentFinancing.inBankName);
	await _TradeFinancePages.PreShipmentFinancingPage.inBankAddr1Input.input(pre + testData.PreShipmentFinancing.inBankAddr1);
	await _TradeFinancePages.PreShipmentFinancingPage.inBankAddr2Input.input(pre + testData.PreShipmentFinancing.inBankAddr2);
	await _TradeFinancePages.PreShipmentFinancingPage.inBankAddr3Input.input(pre + testData.PreShipmentFinancing.inBankAddr3);
	await _TradeFinancePages.PreShipmentFinancingPage.inBankSWIFTInput.input(pre + testData.PreShipmentFinancing.inBankSWIFT);
}

export async function ensureForR24PayeeFields(editFlag?: boolean) {
	const pre = editFlag ? 'edit11' : 'create';
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeNameInput).textContains(pre + testData.PreShipmentFinancing.payeeName);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeAddr1Input).textContains(pre + testData.PreShipmentFinancing.payeeAddr1);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeAddr2Input).textContains(pre + testData.PreShipmentFinancing.payeeAddr2);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeAddr3Input).textContains(pre + testData.PreShipmentFinancing.payeeAddr3);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeRefInput).textContains(pre + testData.PreShipmentFinancing.payeeRef);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeACNumInput).textContains(pre + testData.PreShipmentFinancing.payeeACNum);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeBankNameInput).textContains(pre + testData.PreShipmentFinancing.payeeBankName);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeBankAddr1Input).textContains(pre + testData.PreShipmentFinancing.payeeBankAddr1);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeBankAddr2Input).textContains(pre + testData.PreShipmentFinancing.payeeBankAddr2);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeBankAddr3Input).textContains(pre + testData.PreShipmentFinancing.payeeBankAddr3);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.payeeBankSWIFTInput).textContains(pre + testData.PreShipmentFinancing.payeeBankSWIFT);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.inBankNameInput).textContains(pre + testData.PreShipmentFinancing.inBankName);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.inBankAddr1Input).textContains(pre + testData.PreShipmentFinancing.inBankAddr1);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.inBankAddr2Input).textContains(pre + testData.PreShipmentFinancing.inBankAddr2);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.inBankAddr3Input).textContains(pre + testData.PreShipmentFinancing.inBankAddr3);
	await ensure(_TradeFinancePages.PreShipmentFinancingPage.inBankSWIFTInput).textContains(pre + testData.PreShipmentFinancing.inBankSWIFT);
}
