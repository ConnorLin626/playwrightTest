/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let paymentReference = '';
let templateName = '';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

let createNewPayer = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.fastCollectionPage.newPayerRadio.click();
    await _PaymentsPages.fastCollectionPage.createPayerButton.click();
    await _PaymentsPages.fastCollectionPage.pageSwitchIframe('//iframe[@id="overlayContainerFrame"]');
    let newPayerName = "FastNewPayerName" + generatedID();
    let newPayerNickName = "FastNewPayerNickName" + generatedID();
    await _PaymentsPages.fastCollectionPage.payerName.input(newPayerName);
    await _PaymentsPages.fastCollectionPage.payerAccountNumber.input(testData.FastCollection.newPayerAcctNumber);
    await _PaymentsPages.fastCollectionPage.debitReference.input(testData.FastCollection.debitReference);
    await _PaymentsPages.fastCollectionPage.bankDetailSelect.selectByValue(SIT ? testData.FastCollection.SIT.payerBankIDValue : testData.FastCollection.UAT.payerBankIDValue);
    await _PaymentsPages.fastCollectionPage.payerNickName.input(newPayerNickName);
    await _PaymentsPages.fastCollectionPage.previewButton.jsClick();
    await _PaymentsPages.fastCollectionPage.loadConditionOnNewPayerPage();
    await _PaymentsPages.fastCollectionPage.submitPayerButton.jsClick();
    await _PaymentsPages.fastCollectionPage.loadConditionForEditPayerButton();
};

let existingPayer = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.fastCollectionPage.existingPayer.selectByValue("0");
};

let fillFastCollectionData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isMChallenge: Boolean) {
    await _PaymentsPages.openMenu(Menu.Payments.FastCollection);
    await _PaymentsPages.fastCollectionPage.loadCondition();
    await _PaymentsPages.fastCollectionPage.toAccountI3.select(testData.FastCollection.toAccountI3);
    await _PaymentsPages.fastCollectionPage.loadConditionForNewPayer();
    if (isMChallenge) {
        await _PaymentsPages.fastCollectionPage.collectionAmount.input(testData.FastCollection.amountA1);
    } else {
        await _PaymentsPages.fastCollectionPage.collectionAmount.input(testData.FastCollection.amountA2);
    }
    await _PaymentsPages.fastCollectionPage.purposeCode.click();
    await _PaymentsPages.fastCollectionPage.purposeCodeValueInput.input(testData.FastCollection.purposeCode);
    await _PaymentsPages.fastCollectionPage.purposeCodeValueSelected.jsClick();
    if (isCreate) {
        await createNewPayer(_PaymentsPages);
    } else {
        await existingPayer(_PaymentsPages);
    }
    await _PaymentsPages.fastCollectionPage.paymentDetails.input(testData.FastCollection.paymentDetail);
    await _PaymentsPages.fastCollectionPage.deliveryMode.selectByValue(testData.FastCollection.deliveryMode);
    await _PaymentsPages.fastCollectionPage.emailText.input(testData.FastCollection.emailIdO);
    await _PaymentsPages.fastCollectionPage.invoiceDetails.input(testData.FastCollection.invoiceDetails);
    await _PaymentsPages.fastCollectionPage.clientReference1.input(testData.FastCollection.clientReference1);
    await _PaymentsPages.fastCollectionPage.transactionNotes.input(testData.FastCollection.transactionNote);
};

describe('SG_Fast Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.FastCollection.SIT.loginCompanyId : testData.FastCollection.UAT.loginCompanyId,
            SIT ? testData.FastCollection.SIT.loginUserId : testData.FastCollection.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a SG Fast Collection with new Payee', async function () {
        await fillFastCollectionData(_PaymentsPages, true, false);
        await _PaymentsPages.fastCollectionPage.previewCollection.click();
        await _PaymentsPages.fastCollectionPage.loadConditionOnPreviewPage();
        await _PaymentsPages.fastCollectionPage.submitCollection.jsClick();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.fastCollectionPage.toAccountValue).textContains(testData.FastCollection.toAccountI3),
            await ensure(_PaymentsPages.fastCollectionPage.collectionAmountValue).textContains(testData.FastCollection.amountA2),
            await ensure(_PaymentsPages.fastCollectionPage.beneficiaryNameValue).textContains(testData.FastCollection.newPayerName),
            await ensure(_PaymentsPages.fastCollectionPage.statusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create SG Fast Collection - Approve Now with mChallenge', async function () {
        await fillFastCollectionData(_PaymentsPages, false, true);
        await _PaymentsPages.fastCollectionPage.approveNowRadio.click();
        await _PaymentsPages.fastCollectionPage.previewCollection.click();
        await _PaymentsPages.fastCollectionPage.loadConditionForApproveNow();
        await ensure(_PaymentsPages.fastCollectionPage.mChallengeI3Text).textContains(testData.FastCollection.mChallengeI3Text);
        await _PaymentsPages.fastCollectionPage.challengeResponse.input(testData.FastCollection.enterResponseI3Text);
        await _PaymentsPages.fastCollectionPage.approveCollection.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.fastCollectionPage.statusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Create SG Fast Collection - Approve Now without mChallenge', async function () {
        await fillFastCollectionData(_PaymentsPages, false, false);
        await _PaymentsPages.fastCollectionPage.approveNowRadio.click();
        await _PaymentsPages.fastCollectionPage.previewCollection.click();
        await _PaymentsPages.fastCollectionPage.loadConditionForApproveNow();
        await ensure(_PaymentsPages.fastCollectionPage.withoutMChallengeI3Text).textContains(testData.FastCollection.noMChallengeI3Text);
        await _PaymentsPages.fastCollectionPage.challengeResponse.input(testData.FastCollection.enterResponseI3Text);
        await _PaymentsPages.fastCollectionPage.approveCollection.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.fastCollectionPage.statusValue).textContainsLessOne(testData.status.PartialApproved);
    });

    it('Create a SG Fast Collection with Save as Template', async function () {
        await fillFastCollectionData(_PaymentsPages, false, false);
        await _PaymentsPages.fastCollectionPage.saveAsTemplateCheckbox.jsClick();
        templateName = 'FastCollectionName' + generatedID();
        await _PaymentsPages.fastCollectionPage.templateName.input(templateName);
        await _PaymentsPages.fastCollectionPage.previewCollection.click();
        await _PaymentsPages.fastCollectionPage.loadConditionOnPreviewPage();
        await _PaymentsPages.fastCollectionPage.submitCollection.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForI3ViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.fastCollectionPage.templateNameValue).textIs(templateName),
            await ensure(_PaymentsPages.fastCollectionPage.toAccountValue).textContains(testData.FastCollection.toAccountI3),
            await ensure(_PaymentsPages.fastCollectionPage.collectionAmountValue).textContains(testData.FastCollection.amountA2),
            await ensure(_PaymentsPages.fastCollectionPage.beneficiaryNameValue).isNotEmpty(),
        ]);
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.fastCollectionPage.toAccountValue).textContains(testData.FastCollection.toAccountI3),
            await ensure(_PaymentsPages.fastCollectionPage.collectionAmountValue).textContains(testData.FastCollection.amountA2),
            await ensure(_PaymentsPages.fastCollectionPage.beneficiaryNameValue).isNotEmpty(),
        ]);
    });

    it('Create a SG Fast Collection from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.FastCollection.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.fastCollectionPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.fastCollectionPage.previewCollectionI3Button.click();
        await _PaymentsPages.fastCollectionPage.loadConditionOnPreviewFromTemplatePage();
        await _PaymentsPages.fastCollectionPage.submitCollection.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            reference2 = text;
            console.log(reference2);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.fastCollectionPage.toAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fastCollectionPage.collectionAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fastCollectionPage.beneficiaryNameValue).isNotEmpty(),
        ]);
    });

    it('Create a SG Fast Collection with Save as Draft', async function () {
        await fillFastCollectionData(_PaymentsPages, false, false);
        await _PaymentsPages.fastCollectionPage.saveAsDraft.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.fastCollectionPage.toAccountValue).textContains(testData.FastCollection.toAccountI3),
            await ensure(_PaymentsPages.fastCollectionPage.collectionAmountValue).textContains(testData.FastCollection.amountA2),
            await ensure(_PaymentsPages.fastCollectionPage.beneficiaryNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.fastCollectionPage.statusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a SG Fast Collection via Transfer Center', async function () {
        if (reference2) {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        } else {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastCollectionPage.copyButton.click();
        await _PaymentsPages.fastCollectionPage.loadCondition();
        await _PaymentsPages.fastCollectionPage.collectionAmount.clean();
        await _PaymentsPages.fastCollectionPage.collectionAmount.input(testData.FastCollection.amountV);
        await _PaymentsPages.fastCollectionPage.previewCollection.click();
        await _PaymentsPages.fastCollectionPage.loadConditionOnPreviewPage();
        await _PaymentsPages.fastCollectionPage.submitCollection.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            reference3 = text;
            console.log(reference3);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);
        await Promise.all([
            await ensure(_PaymentsPages.fastCollectionPage.toAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fastCollectionPage.collectionAmountValue).textContains(testData.FastCollection.amountV),
            await ensure(_PaymentsPages.fastCollectionPage.statusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a SG Fast Collection via Transfer Center', async function () {
        if (reference) {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastCollectionPage.editButton.click();
        await _PaymentsPages.fastCollectionPage.loadCondition();
        await _PaymentsPages.fastCollectionPage.collectionAmount.clean();
        await _PaymentsPages.fastCollectionPage.collectionAmount.input(testData.FastCollection.editAmount);
        await _PaymentsPages.fastCollectionPage.previewCollectionI3Button.click();
        await _PaymentsPages.fastCollectionPage.loadConditionOnPreviewFromTemplatePage();
        await _PaymentsPages.fastCollectionPage.submitCollection.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await ensure(_PaymentsPages.fastCollectionPage.collectionAmountValue).textContains(testData.FastCollection.editAmount);
    });

    it('Reject a SG Fast Collection via Transfer Center', async function () {
        if (reference) {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastCollectionPage.rejectButton.click();
        await _PaymentsPages.fastCollectionPage.reasonForRejection.input(testData.FastCollection.reasonForRejection);
        await _PaymentsPages.fastCollectionPage.loadConditionOnRejectPage();
        await _PaymentsPages.fastCollectionPage.rejectCollectionButton.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await ensure(_PaymentsPages.fastCollectionPage.statusValue).textContains(testData.status.Rejected);
    });

    it('Delete a SG Fast Collection via Transfer Center', async function () {
        if (reference) {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastCollectionPage.deleteButton.click();
        await _PaymentsPages.fastCollectionPage.loadConditionOnDeletePage();
        await _PaymentsPages.fastCollectionPage.deleteCollectionButton.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.fastCollectionPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
        await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.FastCollection.labelNoInformationDisplay);

    });
});

describe('SG_Fast Collection_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.FastCollection.SIT.loginCompanyId : testData.FastCollection.UAT.loginCompanyId,
            SIT ? testData.FastCollection.SIT.verifyUserId : testData.FastCollection.UAT.verifyUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a Fast Collection via My Verify', async function () {

        await _PaymentsPages.VerificationAndReleasesPage.verifySingleTxn(_PaymentsPages, reference3, "SG - Fast Collection").then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        await ensure(_PaymentsPages.fastCollectionPage.statusValue).textContains(testData.status.PendingApproval);
    });


    it('Approve a SG Fast Collection via Transfer Center', async function () {
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        } else {
            await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastCollectionPage.approveButton.jsClick();
        await _PaymentsPages.fastCollectionPage.loadConditionOnApprovePage();
        await _PaymentsPages.fastCollectionPage.challengeResponse.input(testData.FastCollection.enterResponseI3Text);
        await _PaymentsPages.fastCollectionPage.approveCollectionButton.click();
        await _PaymentsPages.fastCollectionPage.getI3ReferenceID().then(text => {
            approvalReference = text;
            console.log(approvalReference)
        });
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await ensure(_PaymentsPages.fastCollectionPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Release a Fast Collection via My Release', async function () {

        await _PaymentsPages.VerificationAndReleasesPage.releaseSingleTxn(_PaymentsPages, verifyReference, approvalReference, "SG - Fast Collection").then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.fastCollectionPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.fastCollectionPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected);
    });
});