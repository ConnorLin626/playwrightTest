/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from copy,then Verify/Approval/Release
let reference2 = "";
let PayeeName = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const lib_1 = require("../../../lib");
let testData = _PaymentsPages.fetchTestData("AU_testData.json");
let paymentReference = "";
let templateRef = "";
let approvalReference = "";
let verifyReference = "";


describe("AU Low Value Domestic Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.LVTPayment.SIT.loginCompanyId : testData.LVTPayment.UAT.loginCompanyId, SIT ? testData.LVTPayment.SIT.loginUserId : testData.LVTPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an AU LVT with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.makePayment.click();
        await _PaymentsPages.LVTPaymentPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
        await _PaymentsPages.LVTPaymentPage.amount.input(testData.LVTPayment.amount);
        await _PaymentsPages.LVTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.LVTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.newPayeeCountry.select(testData.LVTPayment.Country);
        await _PaymentsPages.LVTPaymentPage.enterDetailButton.click();
        await _PaymentsPages.LVTPaymentPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
        await _PaymentsPages.LVTPaymentPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
        await _PaymentsPages.LVTPaymentPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
        await _PaymentsPages.LVTPaymentPage.newPayeeNickname.input(testData.LVTPayment.newPayeeNickname);
        //due to IDXP-2000
        // await _PaymentsPages.LVTPaymentPage.newPayeeAdd1.input(testData.LVTPayment.newPayeeAdd1);    
        // await _PaymentsPages.LVTPaymentPage.newPayeeAdd2.input(testData.LVTPayment.newPayeeAdd2);
        // await _PaymentsPages.LVTPaymentPage.newPayeeAdd3.input(testData.LVTPayment.newPayeeAdd3);
        await _PaymentsPages.LVTPaymentPage.LVTCheckBox.jsClick();
        await _PaymentsPages.LVTPaymentPage.nextButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.LVTPaymentPage.approveNowBox.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.getChallengeButton.clickIfExist();
        await _PaymentsPages.LVTPaymentPage.responseCode.input("response");
        await _PaymentsPages.LVTPaymentPage.submitButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.LVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
         await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.LVTPaymentPage.amountValue).textContains(testData.LVTPayment.amount),
            await ensure(_PaymentsPages.LVTPaymentPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
        ]);
    });

    it('Create an AU LVT with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.makePayment.click();
        await _PaymentsPages.LVTPaymentPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
        await _PaymentsPages.LVTPaymentPage.amount.input(testData.LVTPayment.amountA2);
        await _PaymentsPages.LVTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.LVTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.newPayeeCountry.select(testData.LVTPayment.Country);
        await _PaymentsPages.LVTPaymentPage.enterDetailButton.click();
        await _PaymentsPages.LVTPaymentPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
        await _PaymentsPages.LVTPaymentPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
        await _PaymentsPages.LVTPaymentPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
        await _PaymentsPages.LVTPaymentPage.newPayeeNickname.input(testData.LVTPayment.newPayeeNickname);
        await addAddressAllFieldOldUI("details");
        await _PaymentsPages.LVTPaymentPage.LVTCheckBox.jsClick();
        await _PaymentsPages.LVTPaymentPage.nextButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.LVTPaymentPage.approveNowBox.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.responseCode.input("ok");
        await _PaymentsPages.LVTPaymentPage.submitButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.LVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
         await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.LVTPaymentPage.amountValue).textContains(testData.LVTPayment.amountA2),
            await ensure(_PaymentsPages.LVTPaymentPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
        ]);
    });

    it('Save an AU LVT successfully As Draft', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.makePayment.click();
        await _PaymentsPages.LVTPaymentPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
        await _PaymentsPages.LVTPaymentPage.amount.input(testData.LVTPayment.amount);
        await _PaymentsPages.LVTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.LVTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.newPayeeCountry.select(testData.LVTPayment.Country);
        await _PaymentsPages.LVTPaymentPage.enterDetailButton.click();
        await _PaymentsPages.LVTPaymentPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
        await _PaymentsPages.LVTPaymentPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
        await _PaymentsPages.LVTPaymentPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
        await _PaymentsPages.LVTPaymentPage.newPayeeNickname.input(testData.LVTPayment.newPayeeNickname);
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.LVTPaymentPage.LVTCheckBox.jsClick();
        await _PaymentsPages.LVTPaymentPage.saveAsDraft.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.LVTPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.LVTPaymentPage.dismissButton.click();
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
         await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await lib_1.ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
            await lib_1.ensure(_PaymentsPages.LVTPaymentPage.amountValue).textContains(testData.LVTPayment.amount),
            await lib_1.ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Create an AU LVT with new Payee', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.makePayment.click();
        await _PaymentsPages.LVTPaymentPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
        await _PaymentsPages.LVTPaymentPage.amount.input(testData.LVTPayment.amount);
        await _PaymentsPages.LVTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.LVTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.newPayeeCountry.select(testData.LVTPayment.Country);
        await _PaymentsPages.LVTPaymentPage.enterDetailButton.click();
        await _PaymentsPages.LVTPaymentPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
        await _PaymentsPages.LVTPaymentPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
        await _PaymentsPages.LVTPaymentPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
        await _PaymentsPages.LVTPaymentPage.newPayeeNickname.input(testData.LVTPayment.newPayeeNickname);
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.LVTPaymentPage.LVTCheckBox.jsClick();
        await _PaymentsPages.LVTPaymentPage.nextButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.LVTPaymentPage.submitButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.LVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.LVTPaymentPage.amountValue).textContains(testData.LVTPayment.amount),
            await ensure(_PaymentsPages.LVTPaymentPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Copy an AU LVT', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
        }
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.VNLvtPage.copyButton.jsClick();
        await _PaymentsPages.LVTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.VNLvtPage.loadCondition();
        await _PaymentsPages.VNLvtPage.nextButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
        await _PaymentsPages.VNLvtPage.submitButton.click();
        await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
        await _PaymentsPages.VNLvtPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.VNLvtPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).isNotEmpty()
        ]);
    });

    it('Edit an AU LVT ', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
        }
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.LVTPaymentPage.editButton.jsClick();
        await _PaymentsPages.LVTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.amount.input(testData.LVTPayment.amountEdit);
        await _PaymentsPages.LVTPaymentPage.newPayeeName.input(testData.LVTPayment.newPayeeNameEdit);
        await _PaymentsPages.LVTPaymentPage.nextButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.LVTPaymentPage.submitButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.LVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.amountValue).textContains(testData.LVTPayment.amountEdit),
            await ensure(_PaymentsPages.LVTPaymentPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeNameEdit)
        ]);
    });

    it('Reject an AU LVT  ', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
        }
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.LVTPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.LVTPaymentPage.reasonForRejection.input(testData.LVTPayment.rejectReason);
        await _PaymentsPages.LVTPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.LVTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.LVTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.LVTPaymentPage.dismissButton.click();
         await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    it('Create an AU LVT with Save as Template', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.makePayment.click();
        await _PaymentsPages.LVTPaymentPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
        await _PaymentsPages.LVTPaymentPage.amount.input(testData.LVTPayment.amount);
        await _PaymentsPages.HVTPaymentPage.existingPayee.select(testData.LVTPayment.existingPayee);
        await _PaymentsPages.LVTPaymentPage.nextButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.LVTPaymentPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'AULVT' + generatedID();
        await _PaymentsPages.LVTPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.LVTPaymentPage.submitButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.LVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.LVTPaymentPage.amountValue).textContains(testData.LVTPayment.amount),
        ]);
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.LVTPaymentPage.viewTemplateAmount).textContains(testData.LVTPayment.amount),
        ]);

    });

    it('Delete an AU LVT ', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
        }
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.LVTPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.LVTPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.LVTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.LVTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.LVTPaymentPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await lib_1.ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.LVTPayment.labelNoInformationDisplay);
    });

    it('Create an AU LVT from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        //TemplateName="LVTPayment01Template";
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.LVTPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click();
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });

        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await lib_1.ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).isNotEmpty(),
            await lib_1.ensure(_PaymentsPages.LVTPaymentPage.amountValue).isNotEmpty(),
            await lib_1.ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).isNotEmpty(),
        ]);
        await _PaymentsPages.PaymentTemplatesPage.deleteTemplate(TemplateName);
    });

    it('Create an AU LVT for Verify and Release', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.makePayment.click();
        await _PaymentsPages.LVTPaymentPage.loadCondition();
        await _PaymentsPages.LVTPaymentPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
        await _PaymentsPages.LVTPaymentPage.amount.input(testData.LVTPayment.amountVerify);
        await _PaymentsPages.LVTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.LVTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.newPayeeCountry.select(testData.LVTPayment.Country);
        await _PaymentsPages.LVTPaymentPage.enterDetailButton.click();
        await _PaymentsPages.LVTPaymentPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
        await _PaymentsPages.LVTPaymentPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
        await _PaymentsPages.LVTPaymentPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
        await _PaymentsPages.LVTPaymentPage.newPayeeNickname.input(testData.LVTPayment.newPayeeNickname);
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.LVTPaymentPage.LVTCheckBox.jsClick();
        await _PaymentsPages.LVTPaymentPage.nextButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.LVTPaymentPage.submitButton.click();
        await _PaymentsPages.LVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.LVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.LVTPaymentPage.amountValue).textContains(testData.LVTPayment.amountVerify),
            await ensure(_PaymentsPages.LVTPaymentPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification)
        ]);
    });
});

describe('Verify And Release a Low Value Domestic', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.LVTPayment.SIT.loginCompanyId : testData.LVTPayment.UAT.loginCompanyId, SIT ? testData.LVTPayment.SIT.verifyUserId : testData.LVTPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an AU LVT via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();

        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.AU_LVT).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Approve an AU LVT via Transfer Center', async function () {
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
        }
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.LVTPaymentPage.approveButton.jsClick();
        await _PaymentsPages.LVTPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.LVTPaymentPage.getChallengeButton.clickIfExist();
        await _PaymentsPages.LVTPaymentPage.responseCode.input("response");
        await _PaymentsPages.LVTPaymentPage.approveButton.click();
        await _PaymentsPages.LVTPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await ensure(_PaymentsPages.LVTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.LVTPaymentPage.dismissButton.click();
        await _PaymentsPages.LVTPaymentPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release an AU LVT via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_LVT).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.LVTPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.LVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

export async function addAddressAllFieldOldUI(format : string) {
    if(format.includes("sample")){
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    }else{
        await _PaymentsPages.BeneficiaryPage.switchFormatButton.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
        await _PaymentsPages.BeneficiaryPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _PaymentsPages.BeneficiaryPage.buildingName.input(testData.Beneficiary.buildingName);
        await _PaymentsPages.BeneficiaryPage.floor.input(testData.Beneficiary.floor);
        await _PaymentsPages.BeneficiaryPage.room.input(testData.Beneficiary.room);
        await _PaymentsPages.BeneficiaryPage.department.input(testData.Beneficiary.department);
        await _PaymentsPages.BeneficiaryPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.BeneficiaryPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _PaymentsPages.BeneficiaryPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _PaymentsPages.BeneficiaryPage.districtName.input(testData.Beneficiary.districtName);
    }
}