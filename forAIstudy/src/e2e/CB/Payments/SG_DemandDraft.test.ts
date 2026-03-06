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

let createNewBeneficiary = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.DDPaymentPage.newBeneficiaryRadio.click();
    await _PaymentsPages.DDPaymentPage.createBeneficiaryButton.click();
    await _PaymentsPages.DDPaymentPage.pageSwitchIframe('//iframe[@id="overlayContainerFrame"]');
    let newBeneficiaryName = "DDNewBeneName" + generatedID();
    let newBeneficiaryNickName = "DDNewBeneNickName" + generatedID();
    await _PaymentsPages.DDPaymentPage.BeneficiaryName.input(newBeneficiaryName);
    await _PaymentsPages.DDPaymentPage.BeneficiaryAddress1.input(testData.DemandDraft.newBeneficiaryAddress1);
    await _PaymentsPages.DDPaymentPage.BeneficiaryNickName.input(newBeneficiaryNickName);
    await _PaymentsPages.DDPaymentPage.previewButton.jsClick();
    await _PaymentsPages.DDPaymentPage.loadConditionOnNewBeneficiaryPage();
    await _PaymentsPages.DDPaymentPage.submitBeneficiaryButton.jsClick();
    await _PaymentsPages.DDPaymentPage.loadConditionForEditBeneficiaryButton();
};

let existingBeneficiary = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.DDPaymentPage.existingBeneficiary.selectByValue("0");
};

let fillDemandDraftData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isMChallenge: Boolean) {
    await _PaymentsPages.openMenu(Menu.Payments.DemandDraft);
    await _PaymentsPages.DDPaymentPage.loadCondition();
    await _PaymentsPages.DDPaymentPage.fromAccountI3.select(testData.DemandDraft.toAccountI3);
    await _PaymentsPages.DDPaymentPage.loadCondition();
    await _PaymentsPages.DDPaymentPage.paymentCurrency.selectByValue("SGD");
    await _PaymentsPages.DDPaymentPage.payableCountry.selectByValue("BN");
    if (isMChallenge) {
        await _PaymentsPages.DDPaymentPage.amount.input(testData.DemandDraft.amountA1);
    } else {
        await _PaymentsPages.DDPaymentPage.amount.input(testData.DemandDraft.amountA2);
    }
    if (isCreate) {
        await createNewBeneficiary(_PaymentsPages);
    } else {
        await existingBeneficiary(_PaymentsPages);
    }
    await _PaymentsPages.DDPaymentPage.paymentDetails.input(testData.DemandDraft.paymentDetail);
    await _PaymentsPages.DDPaymentPage.pickupLocation.selectByValue("006");
    await _PaymentsPages.DDPaymentPage.transactionNotes.input(testData.DemandDraft.transactionNote);
};

describe('SG_Demand Draft', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.DemandDraft.SIT.loginCompanyId : testData.DemandDraft.UAT.loginCompanyId,
            SIT ? testData.DemandDraft.SIT.loginUserId : testData.DemandDraft.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a SG Demand Draft with new Beneficiary', async function () {
        await fillDemandDraftData(_PaymentsPages, true, false);
        await _PaymentsPages.DDPaymentPage.previewPayment.click();
        await _PaymentsPages.DDPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.DDPaymentPage.submitPayment.jsClick();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.toAccountValue).textContains(testData.DemandDraft.toAccountI3),
            await ensure(_PaymentsPages.DDPaymentPage.collectionAmountValue).textContains(testData.DemandDraft.amountA2),
            await ensure(_PaymentsPages.DDPaymentPage.beneficiaryNameValue).textContains(testData.DemandDraft.newBeneficiaryName),
            await ensure(_PaymentsPages.DDPaymentPage.statusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create SG Demand Draft - Approve Now with mChallenge', async function () {
        await fillDemandDraftData(_PaymentsPages, false, true);
        await _PaymentsPages.DDPaymentPage.approveNowRadio.click();
        await _PaymentsPages.DDPaymentPage.previewPayment.click();
        await _PaymentsPages.DDPaymentPage.loadConditionForApproveNow();
        await ensure(_PaymentsPages.DDPaymentPage.mChallengeI3Text).textContains(testData.DemandDraft.mChallengeI3Text);
        await _PaymentsPages.DDPaymentPage.challengeResponse.input(testData.DemandDraft.enterResponseI3Text);
        await _PaymentsPages.DDPaymentPage.approvePayment.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.DDPaymentPage.statusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Create SG Demand Draft - Approve Now without mChallenge', async function () {
        await fillDemandDraftData(_PaymentsPages, false, false);
        await _PaymentsPages.DDPaymentPage.approveNowRadio.click();
        await _PaymentsPages.DDPaymentPage.previewPayment.click();
        await _PaymentsPages.DDPaymentPage.loadConditionForApproveNow();
        await ensure(_PaymentsPages.DDPaymentPage.withoutMChallengeI3Text).textContains(testData.DemandDraft.noMChallengeI3Text);
        await _PaymentsPages.DDPaymentPage.challengeResponse.input(testData.DemandDraft.enterResponseI3Text);
        await _PaymentsPages.DDPaymentPage.approvePayment.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.DDPaymentPage.statusValue).textContainsLessOne(testData.status.PartialApproved);
    });

    it('Create a SG Demand Draft with Save as Template', async function () {
        await fillDemandDraftData(_PaymentsPages, false, false);
        await _PaymentsPages.DDPaymentPage.saveAsTemplateCheckbox.jsClick();
        templateName = 'DDName' + generatedID();
        await _PaymentsPages.DDPaymentPage.templateName.input(templateName);
        await _PaymentsPages.DDPaymentPage.previewPayment.click();
        await _PaymentsPages.DDPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.DDPaymentPage.submitPayment.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForI3ViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.templateNameValue).textIs(templateName),
            await ensure(_PaymentsPages.DDPaymentPage.toAccountValue).textContains(testData.DemandDraft.toAccountI3),
            await ensure(_PaymentsPages.DDPaymentPage.collectionAmountValue).textContains(testData.DemandDraft.amountA2),
            await ensure(_PaymentsPages.DDPaymentPage.beneficiaryNameValue).isNotEmpty(),
        ]);
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.toAccountValue).textContains(testData.DemandDraft.toAccountI3),
            await ensure(_PaymentsPages.DDPaymentPage.collectionAmountValue).textContains(testData.DemandDraft.amountA2),
            await ensure(_PaymentsPages.DDPaymentPage.beneficiaryNameValue).isNotEmpty(),
        ]);
    });

    it('Create a SG Demand Draft from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.DemandDraft.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.DDPaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.DDPaymentPage.previewPaymentI3Button.jsClick();
        await _PaymentsPages.DDPaymentPage.loadConditionOnPreviewFromTemplatePage();
        await _PaymentsPages.DDPaymentPage.submitPayment.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            reference2 = text;
            console.log(reference2);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.toAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.DDPaymentPage.collectionAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.DDPaymentPage.beneficiaryNameValue).isNotEmpty(),
        ]);
    });

    it('Create a SG Demand Draft with Save as Draft', async function () {
        await fillDemandDraftData(_PaymentsPages, false, false);
        await _PaymentsPages.DDPaymentPage.saveAsDraft.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.toAccountValue).textContains(testData.DemandDraft.toAccountI3),
            await ensure(_PaymentsPages.DDPaymentPage.collectionAmountValue).textContains(testData.DemandDraft.amountA2),
            await ensure(_PaymentsPages.DDPaymentPage.beneficiaryNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.DDPaymentPage.statusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a SG Demand Draft via Transfer Center', async function () {
        if (reference2) {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        } else {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.SG_DD, testData.status.PendingApproval);
        }
        await _PaymentsPages.DDPaymentPage.copyButton.jsClick();
        await _PaymentsPages.DDPaymentPage.loadCondition();
        await _PaymentsPages.DDPaymentPage.amount.clean();
        await _PaymentsPages.DDPaymentPage.amount.input(testData.DemandDraft.amountV);
        await _PaymentsPages.DDPaymentPage.previewPayment.jsClick();
        await _PaymentsPages.DDPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.DDPaymentPage.submitPayment.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            reference3 = text;
            console.log(reference3);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.toAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.DDPaymentPage.collectionAmountValue).textContains(testData.DemandDraft.amountV),
            await ensure(_PaymentsPages.DDPaymentPage.statusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a SG Demand Draft via Transfer Center', async function () {
        if (reference) {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.SG_DD, testData.status.PendingApproval);
        }
        await _PaymentsPages.DDPaymentPage.editButton.click();
        await _PaymentsPages.DDPaymentPage.loadCondition();
        await _PaymentsPages.DDPaymentPage.amount.clean();
        await _PaymentsPages.DDPaymentPage.amount.input(testData.DemandDraft.editAmount);
        await _PaymentsPages.DDPaymentPage.previewPaymentI3Button.jsClick();
        await _PaymentsPages.DDPaymentPage.loadConditionOnPreviewFromTemplatePage();
        await _PaymentsPages.DDPaymentPage.submitPayment.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await ensure(_PaymentsPages.DDPaymentPage.collectionAmountValue).textContains(testData.DemandDraft.editAmount);
    });

    it('Reject a SG Demand Draft via Transfer Center', async function () {
        if (reference) {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.SG_DD, testData.status.PendingApproval);
        }
        await _PaymentsPages.DDPaymentPage.rejectButton.click();
        await _PaymentsPages.DDPaymentPage.reasonForRejection.input(testData.DemandDraft.reasonForRejection);
        await _PaymentsPages.DDPaymentPage.loadConditionOnRejectPage();
        await _PaymentsPages.DDPaymentPage.rejectPaymentButton.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await ensure(_PaymentsPages.DDPaymentPage.statusValue).textContains(testData.status.Rejected);
    });

    it('Delete a SG Demand Draft via Transfer Center', async function () {
        if (reference) {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.SG_DD, testData.status.PendingApproval);
        }
        await _PaymentsPages.DDPaymentPage.deleteButton.click();
        await _PaymentsPages.DDPaymentPage.loadConditionOnDeletePage();
        await _PaymentsPages.DDPaymentPage.deletePaymentButton.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.DDPaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
        await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.DemandDraft.labelNoInformationDisplay);

    });
});

describe('SG_Demand Draft_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.DemandDraft.SIT.loginCompanyId : testData.DemandDraft.UAT.loginCompanyId,
            SIT ? testData.DemandDraft.SIT.verifyUserId : testData.DemandDraft.UAT.verifyUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a Demand Draft via My Verify', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVeirfyTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTabByTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForVerifyTxn.input(reference3);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxn.selectByValue(testData.DemandDraft.DemandDraftCode);
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForVerifyTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTxnButton.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyPaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmVerifyI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            verifyReference = text;
            console.log(verifyReference);
        });
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        await ensure(_PaymentsPages.DDPaymentPage.statusValue).textContains(testData.status.PendingApproval);
    });


    it('Approve a SG Demand Draft via Transfer Center', async function () {
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        } else {
            await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.SG_DD, testData.status.PendingApproval);
        }
        await _PaymentsPages.DDPaymentPage.approveButton.jsClick();
        await _PaymentsPages.DDPaymentPage.loadConditionOnApprovePage();
        await _PaymentsPages.DDPaymentPage.challengeResponse.input(testData.DemandDraft.enterResponseI3Text);
        await _PaymentsPages.DDPaymentPage.approvePaymentButton.click();
        await _PaymentsPages.DDPaymentPage.getI3ReferenceID().then(text => {
            approvalReference = text;
            console.log(approvalReference)
        });
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await ensure(_PaymentsPages.DDPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Release a Demand Draft via My Release', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTab();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTabByTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
        if (0 !== verifyReference.trim().length && 0 !== approvalReference.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForReleaseTxn.input(verifyReference);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxn.selectByValue(testData.DemandDraft.DemandDraftCode);
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForReleaseTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTxnI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleasePaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmReleaseI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.DDPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.DDPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected);
    });
});