/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from copy,then Verify/Approval/Release
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const lib_1 = require("../../../lib");
let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let _FilesPages = new FilesPages();
let paymentReference = "";
let TemplateName = '';
let reference2 = '';
let verifyReference = ''
let referenceEdit = ''

describe("HK Auto Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AutoPayPayment.SIT.loginCompanyId : testData.AutoPayPayment.UAT.loginCompanyId, SIT ? testData.AutoPayPayment.SIT.loginUserId : testData.AutoPayPayment.UAT.loginUserId, SIT ? testData.AutoPayPayment.SIT.pinId : testData.AutoPayPayment.UAT.pinId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a AutoPay Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.makePayment.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA2);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.autoPayPaymentType.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.emailIdO.input(testData.AutoPayPayment.emailIdO);
        await _PaymentsPages.AutoPayPaymentPage.emailId1.input(testData.AutoPayPayment.emailId1);
        await _PaymentsPages.AutoPayPaymentPage.emailId2.input(testData.AutoPayPayment.emailId2);
        await _PaymentsPages.AutoPayPaymentPage.emailId3.input(testData.AutoPayPayment.emailId3);
        await _PaymentsPages.AutoPayPaymentPage.emailId4.input(testData.AutoPayPayment.emailId4);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.approvalNowCheckBox.jsClickIfExist();
        let ispushOptionVisible = await _PaymentsPages.AutoPayPaymentPage.pushOption.isElementPresent();
        let isRespVisible = await _PaymentsPages.AutoPayPaymentPage.challengeResponse.isElementPresent();
        if (ispushOptionVisible === true && isRespVisible === false){
            await _PaymentsPages.AutoPayPaymentPage.pushOption.jsClick();
        };
        await _PaymentsPages.AutoPayPaymentPage.challengeResponse.input('Response');
        await _PaymentsPages.AutoPayPaymentPage.submitButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await browser.sleep(2000);
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA2),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
        ]);
    });

    it('Create a AutoPay Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForMenu();
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.makePayment.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.autoPayPaymentType.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.emailIdO.input(testData.AutoPayPayment.emailIdO);
        await _PaymentsPages.AutoPayPaymentPage.emailId1.input(testData.AutoPayPayment.emailId1);
        await _PaymentsPages.AutoPayPaymentPage.emailId2.input(testData.AutoPayPayment.emailId2);
        await _PaymentsPages.AutoPayPaymentPage.emailId3.input(testData.AutoPayPayment.emailId3);
        await _PaymentsPages.AutoPayPaymentPage.emailId4.input(testData.AutoPayPayment.emailId4);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.approvalNowCheckBox.jsClickIfExist();
        let ispushOptionVisible = await _PaymentsPages.AutoPayPaymentPage.pushOption.isElementPresent();
        let isRespVisible = await _PaymentsPages.AutoPayPaymentPage.challengeResponse.isElementPresent();
        if (ispushOptionVisible === true && isRespVisible === false){
            await _PaymentsPages.AutoPayPaymentPage.pushOption.jsClick();
        };
        await _PaymentsPages.AutoPayPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AutoPayPaymentPage.challengeResponse.input('ok');
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
        ]);
    });

    it('Create a AutoPay Payment with new Payee', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.makePayment.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeTab.click();
        await _PaymentsPages.AutoPayPaymentPage.continueBtn.clickIfExist();
        await _PaymentsPages.AutoPayPaymentPage.Country.select(testData.AutoPayPayment.Country);
        await _PaymentsPages.AutoPayPaymentPage.payeeBankID.select(SIT ? testData.AutoPayPayment.SIT.payeeBankID : testData.AutoPayPayment.UAT.payeeBankID);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeAcctNumber.input(testData.AutoPayPayment.newPayeeAcctNumber);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeName.input(testData.AutoPayPayment.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.AutoPayPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.AutoPayPaymentPage.newPayeeNickname.input(testData.AutoPayPayment.newPayeeNickname);
        };
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);  
        await _PaymentsPages.AutoPayPaymentPage.autoPayPaymentType.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.paymentDetails.input(testData.AutoPayPayment.paymentDetails);
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.emailIdO.input(testData.AutoPayPayment.emailIdO);
        await _PaymentsPages.AutoPayPaymentPage.emailId1.input(testData.AutoPayPayment.emailId1);
        await _PaymentsPages.AutoPayPaymentPage.emailId2.input(testData.AutoPayPayment.emailId2);
        await _PaymentsPages.AutoPayPaymentPage.emailId3.input(testData.AutoPayPayment.emailId3);
        await _PaymentsPages.AutoPayPaymentPage.emailId4.input(testData.AutoPayPayment.emailId4);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.payeeReference.input(testData.AutoPayPayment.payeeReference);
        await _PaymentsPages.AutoPayPaymentPage.payeeParticulars.input(testData.AutoPayPayment.payeeParticulars);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.error(reference);
        });
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();

        await checkViewPageAllField(false); //IDXP-812
    });

    it('Create a AutoPay Payment with Save as Template', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.makePayment.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.autoPayPaymentType.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.emailIdO.input(testData.AutoPayPayment.emailIdO);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'AutoPayName' + generatedID();
        await _PaymentsPages.AutoPayPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValueForTemplate).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.payeeValueForTemplate).textContains(testData.AutoPayPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a AutoPay Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AutoPayPayment.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
            console.error(reference2);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a AutoPay Payment with Save as Draft', async function () {
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForMenu();
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.makePayment.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.autoPayPaymentType.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.emailIdO.input(testData.AutoPayPayment.emailIdO);
        await _PaymentsPages.AutoPayPaymentPage.emailId1.input(testData.AutoPayPayment.emailId1);
        await _PaymentsPages.AutoPayPaymentPage.emailId2.input(testData.AutoPayPayment.emailId2);
        await _PaymentsPages.AutoPayPaymentPage.emailId3.input(testData.AutoPayPayment.emailId3);
        await _PaymentsPages.AutoPayPaymentPage.emailId4.input(testData.AutoPayPayment.emailId4);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.saveAsDraft.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toExistingPayeeValue).textContains(testData.AutoPayPayment.existingPayee),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK FPS Payment (Batch)", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.copyButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.amount.clean();
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountV);
        // wait for page reflesh
        await browser.sleep(2000)
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountV),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Create a AutoPay Payment for Verify and Release', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.makePayment.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountV);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.autoPayPaymentType.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();;
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
            console.error(paymentReference);
        });
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingVerification)
        ]);
    });

    it('Edit a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK FPS Payment (Batch)", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.editButton.click();
        await _PaymentsPages.AutoPayPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.amount.clean();
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();

        if(referenceEdit == reference) {
            await checkViewPageAllField(true); //IDXP-812
        } else {
            await Promise.all([
              await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains( testData.AutoPayPayment.editAmount)
           ]);
        }
    }); 

    it('Reject a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK FPS Payment (Batch)", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.AutoPayPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK FPS Payment (Batch)", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await lib_1.ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display");
    });

    it('Create HK FPS Payment(Batch) with new change Account number payee', async function () {
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.AutoPayPaymentPage.makePayment.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeTab.click();
        await _PaymentsPages.AutoPayPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AutoPayPaymentPage.Country.select(testData.AutoPayPayment.Country);
        await _PaymentsPages.AutoPayPaymentPage.payeeBankID.select(SIT ? testData.AutoPayPayment.SIT.payeeBankID : testData.AutoPayPayment.UAT.payeeBankID);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeAcctNumber.input(testData.AutoPayPayment.AcctNumberPayee);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeName.input(testData.AutoPayPayment.MAXPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.AutoPayPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.AutoPayPaymentPage.newPayeeNickname.input(testData.AutoPayPayment.newPayeeNickname);
        };
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeAdd1.input(testData.AutoPayPayment.newPayeeAdd1);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.error(reference);
        });
        await _PaymentsPages.AutoPayPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toPayeeValue).textIs(testData.AutoPayPayment.AcctNumberPayee),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toPayeeNameValue).textIs(testData.AutoPayPayment.MAXPayeeName)
        ]);
    });
});

describe('HK_AutoPay Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AutoPayPayment.SIT.loginCompanyId : testData.AutoPayPayment.UAT.loginCompanyId, SIT ? testData.AutoPayPayment.SIT.verifyUserId : testData.AutoPayPayment.UAT.verifyUserId, SIT ? testData.AutoPayPayment.SIT.pinId : testData.AutoPayPayment.UAT.pinId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a AutoPay Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, "HK FPS Payment (Batch)").then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK FPS Payment (Batch)", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.scrollToBottom();
        await _PaymentsPages.AutoPayPaymentPage.approveButton.click();
        let ispushOptionVisible = await _PaymentsPages.AutoPayPaymentPage.pushOption.isElementPresent();
        let isRespVisible = await _PaymentsPages.AutoPayPaymentPage.challengeResponse.isElementPresent();
        if (ispushOptionVisible === true && isRespVisible === false){
            await _PaymentsPages.AutoPayPaymentPage.pushOption.jsClick();
        };
        await _PaymentsPages.AutoPayPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AutoPayPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.AutoPayPaymentPage.approveButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a AutoPay Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, paymentReference, "HK FPS Payment (Batch)").then(reference => {
            paymentReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

export async function checkViewPageAllField(isEdit: boolean=false) { 
    await Promise.all([
        await ensure(_PaymentsPages.AutoPayPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.AutoPayPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(isEdit ? testData.AutoPayPayment.editAmount : testData.AutoPayPayment.amountA1),
        await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.AutoPayPaymentPage.toPayeeValue).textContains(testData.AutoPayPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.AutoPayPaymentPage.toPayeeNameValue).textContains(testData.AutoPayPayment.newPayeeName),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeAdd1).textContains(testData.AutoPayPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeAdd2).textContains(testData.AutoPayPayment.newPayeeAdd2),
        // await ensure(_PaymentsPages.AutoPayPaymentPage.payeeAdd3).textContains(testData.AutoPayPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.AutoPayPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.cutoffTimeValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.paymentTypeValue).textContains(testData.AutoPayPayment.paymentTypeValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.sendAmtValue).textContains(isEdit ? testData.AutoPayPayment.editAmount : testData.AutoPayPayment.amountA1),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankNameValue).textContains(SIT ? testData.AutoPayPayment.SIT.payeeBankNameValue: testData.AutoPayPayment.UAT.payeeBankNameValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankAdd1Value).textContains(SIT ? testData.AutoPayPayment.SIT.payeeBankAdd1Value : testData.AutoPayPayment.UAT.payeeBankAdd1Value),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankAdd2Value).textContains(SIT ? testData.AutoPayPayment.SIT.payeeBankAdd2Value : testData.AutoPayPayment.UAT.payeeBankAdd2Value),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankCityValue).textContains(testData.AutoPayPayment.payeeBankCityValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankCountryValue).textContains(testData.AutoPayPayment.payeeBankCountryValue),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankSwiftBic).textContains(SIT ? testData.AutoPayPayment.SIT.payeeBankID : testData.AutoPayPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.AutoPayPaymentPage.payeeBankCodeValue2).textContains(SIT ? testData.AutoPayPayment.SIT.payeeBankID : testData.AutoPayPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.AutoPayPaymentPage.paymentDetailValue).textContains(testData.AutoPayPayment.paymentDetails),
        await ensure(_PaymentsPages.AutoPayPaymentPage.msgToPayeeValue).textContains(testData.AutoPayPayment.message),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(testData.AutoPayPayment.emailIdO),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(testData.AutoPayPayment.emailId1),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(testData.AutoPayPayment.emailId2),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(testData.AutoPayPayment.emailId3),
        await ensure(_PaymentsPages.AutoPayPaymentPage.emailListValue).textContains(testData.AutoPayPayment.emailId4),
        await ensure(_PaymentsPages.AutoPayPaymentPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.batchIdValue).isNotEmpty(),
        await ensure(_PaymentsPages.AutoPayPaymentPage.refForPayeeValue).textContains(testData.AutoPayPayment.payeeReference),
        await ensure(_PaymentsPages.AutoPayPaymentPage.particuarsValue).textContains(testData.AutoPayPayment.payeeParticulars),
        await ensure(_PaymentsPages.AutoPayPaymentPage.msgToApproverValue).textContains(testData.AutoPayPayment.transactionNote),
    ]);
}