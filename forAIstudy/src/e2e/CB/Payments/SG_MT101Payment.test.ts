/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_MT101 Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.MT101Payment.SIT.loginCompanyId : testData.MT101Payment.UAT.loginCompanyId, SIT ? testData.MT101Payment.SIT.loginUserId : testData.MT101Payment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    let reference = "";
    let tempRef = "";
    let templateName = '';

    it('Create a MT101 Payment with New Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.MT101Payment);
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.fromAccount.select(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount);
        await _PaymentsPages.mt101PaymentPage.paymentCurrency.select(testData.MT101Payment.paymentCurrency);
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.amount);
        await _PaymentsPages.mt101PaymentPage.fxContractReference.input(testData.MT101Payment.fxContractReference);
        //create bene
        await _PaymentsPages.mt101PaymentPage.newBeneBtn.jsClick();
        await _PaymentsPages.mt101PaymentPage.createBeneBtn.jsClick();
        //switch to frame
        await _PaymentsPages.mt101PaymentPage.loadConditionFrame();
        await _PaymentsPages.mt101PaymentPage.pageSwitchIframe('//iframe[@id="overlayContainerFrame"]');
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateBenePage(210000);
        await _PaymentsPages.mt101PaymentPage.beneName.input(testData.MT101Payment.beneName);
        await _PaymentsPages.mt101PaymentPage.beneAddr1.input(testData.MT101Payment.beneAddr1);
        await _PaymentsPages.mt101PaymentPage.beneAddr2.input(testData.MT101Payment.beneAddr2);
        await _PaymentsPages.mt101PaymentPage.beneAddr3.input(testData.MT101Payment.beneAddr3);
        await _PaymentsPages.mt101PaymentPage.beneAccountNumber.input(testData.MT101Payment.beneAccountNumber);
        await _PaymentsPages.mt101PaymentPage.beneBankDetailsBtn02.jsClick();
        await _PaymentsPages.mt101PaymentPage.beneBankName.input(testData.MT101Payment.beneBankName);
        await _PaymentsPages.mt101PaymentPage.beneBankAddr1.input(testData.MT101Payment.beneBankAddr1);
        await _PaymentsPages.mt101PaymentPage.beneBankAddr2.input(testData.MT101Payment.beneBankAddr2);
        await _PaymentsPages.mt101PaymentPage.beneRoutingCode.input(testData.MT101Payment.beneRoutingCode);
        let beneNickName = "Bene" + generatedID();
        await _PaymentsPages.mt101PaymentPage.beneNickName.input(beneNickName);
        await _PaymentsPages.mt101PaymentPage.benePreviewBtn.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForPreviewBenePage(210000);
        await _PaymentsPages.mt101PaymentPage.beneSubmitBtn.jsClick();

        //switch to parent frame
        await _PaymentsPages.mt101PaymentPage.pageSwitchToI3();
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.intermediaryBankInformation.jsClick();
        await _PaymentsPages.mt101PaymentPage.intermediaryBankID.input(testData.MT101Payment.intermediaryBankID);
        await _PaymentsPages.mt101PaymentPage.intermediaryBankCountry.select(testData.MT101Payment.intermediaryBankCountry);
        await _PaymentsPages.mt101PaymentPage.searchButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.intermediaryBankInformationSelect.jsClick();
        await _PaymentsPages.mt101PaymentPage.submitIntermediaryBankButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.paymentDetails.input(testData.MT101Payment.paymentDetails);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText1.input(testData.MT101Payment.regulatoryReportingText1);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText2.input(testData.MT101Payment.regulatoryReportingText2);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText3.input(testData.MT101Payment.regulatoryReportingText3);
        await _PaymentsPages.mt101PaymentPage.transactionNotes.input(testData.MT101Payment.transactionNotes);
        await _PaymentsPages.mt101PaymentPage.previewButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForPreviewPaymentPage();
        await _PaymentsPages.mt101PaymentPage.submitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await _PaymentsPages.mt101PaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        //verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewFromAccount).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewFXContractRef).textIs(testData.MT101Payment.fxContractReference),
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).textContains(testData.MT101Payment.amount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneName).textIs(testData.MT101Payment.beneName),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneAccountNumber).textIs(testData.MT101Payment.beneAccountNumber),
            await ensure(_PaymentsPages.mt101PaymentPage.viewStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.mt101PaymentPage.cutofftime).isNotEmpty()
        ]);
    });

    it('Create a MT101 Payment with Approve Now', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.MT101Payment);
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.fromAccount.select(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount);  //UAT from account
        await _PaymentsPages.mt101PaymentPage.paymentCurrency.select(testData.MT101Payment.paymentCurrency);
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.amount);
        await _PaymentsPages.mt101PaymentPage.fxContractReference.input(testData.MT101Payment.fxContractReference);
        //select exist payee
        await _PaymentsPages.mt101PaymentPage.existBeneBtn.jsClick();
        await _PaymentsPages.mt101PaymentPage.existingPayee.select(testData.MT101Payment.existingPayee);
        //Intermediary Bank Information
        await _PaymentsPages.mt101PaymentPage.intermediaryBankInformation.jsClick();
        await _PaymentsPages.mt101PaymentPage.intermediaryBankID.input(testData.MT101Payment.intermediaryBankID);
        await _PaymentsPages.mt101PaymentPage.intermediaryBankCountry.select(testData.MT101Payment.intermediaryBankCountry);
        await _PaymentsPages.mt101PaymentPage.searchButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.intermediaryBankInformationSelect.jsClick();
        await _PaymentsPages.mt101PaymentPage.submitIntermediaryBankButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.paymentDetails.input(testData.MT101Payment.paymentDetails);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText1.input(testData.MT101Payment.regulatoryReportingText1);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText2.input(testData.MT101Payment.regulatoryReportingText2);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText3.input(testData.MT101Payment.regulatoryReportingText3);
        await _PaymentsPages.mt101PaymentPage.transactionNotes.input(testData.MT101Payment.transactionNotes);
        await _PaymentsPages.mt101PaymentPage.approveNow.jsClick();
        await _PaymentsPages.mt101PaymentPage.previewButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForApprovalNowPage();
        await _PaymentsPages.mt101PaymentPage.challengeResponse.input(testData.MT101Payment.challengeResponse);
        await _PaymentsPages.mt101PaymentPage.approveButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateApprovalNowSuccessPage();
        await _PaymentsPages.mt101PaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        // view verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewFromAccount).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneName).textContains(testData.MT101Payment.existingPayee),
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).textContains(testData.MT101Payment.amount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Create a MT101 Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.MT101Payment);
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.fromAccount.select(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount);
        await _PaymentsPages.mt101PaymentPage.paymentCurrency.select(testData.MT101Payment.paymentCurrency);
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.amount);
        await _PaymentsPages.mt101PaymentPage.fxContractReference.input(testData.MT101Payment.fxContractReference);
        //select exist payee
        await _PaymentsPages.mt101PaymentPage.existBeneBtn.jsClick();
        await _PaymentsPages.mt101PaymentPage.existingPayee.select(testData.MT101Payment.existingPayee);
        //Intermediary Bank Information
        await _PaymentsPages.mt101PaymentPage.intermediaryBankInformation.jsClick();
        await _PaymentsPages.mt101PaymentPage.intermediaryBankID.input(testData.MT101Payment.intermediaryBankID);
        await _PaymentsPages.mt101PaymentPage.intermediaryBankCountry.select(testData.MT101Payment.intermediaryBankCountry);
        await _PaymentsPages.mt101PaymentPage.searchButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.intermediaryBankInformationSelect.jsClick();
        await _PaymentsPages.mt101PaymentPage.submitIntermediaryBankButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.paymentDetails.input(testData.MT101Payment.paymentDetails);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText1.input(testData.MT101Payment.regulatoryReportingText1);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText2.input(testData.MT101Payment.regulatoryReportingText2);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText3.input(testData.MT101Payment.regulatoryReportingText3);
        await _PaymentsPages.mt101PaymentPage.transactionNotes.input(testData.MT101Payment.transactionNotes);
        await _PaymentsPages.mt101PaymentPage.saveAsTemplate.jsClick();
        templateName = "MT101Name" + generatedID();
        await _PaymentsPages.mt101PaymentPage.templateName.input(templateName)
        await _PaymentsPages.mt101PaymentPage.previewButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForPreviewPaymentPage();
        await _PaymentsPages.mt101PaymentPage.submitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await _PaymentsPages.mt101PaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        // view verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewFromAccount).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneName).textContains(testData.MT101Payment.existingPayee),
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).textContains(testData.MT101Payment.amount)
        ]);
        // template verify
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.mt101PaymentPage.loadConditionForI3ViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewTemplateName).textIs(templateName),
            await ensure(_PaymentsPages.mt101PaymentPage.viewFromAccount).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).textContains(testData.MT101Payment.amount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneName).textContains(testData.MT101Payment.existingPayee)
        ]);
    });

    it('Create a MT101 Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select('MT101 Payment');
            await _PaymentsPages.PaymentTemplatesPage.searchButton.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.mt101PaymentPage.loadCondtionCratePaymentFromTemplate();
        await _PaymentsPages.mt101PaymentPage.amount.clean();
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.amount);
        await _PaymentsPages.mt101PaymentPage.previewSubmitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForPreviewPaymentPage();
        await _PaymentsPages.mt101PaymentPage.submitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await _PaymentsPages.mt101PaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        // view verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewFromAccount).isNotEmpty(),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneName).isNotEmpty(),
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).isNotEmpty(),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneAccountNumber).isNotEmpty()
        ]);
    });

    it('Create a MT101 Payment with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.MT101Payment);
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.fromAccount.select(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount);
        await _PaymentsPages.mt101PaymentPage.paymentCurrency.select(testData.MT101Payment.paymentCurrency);
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.amount);
        await _PaymentsPages.mt101PaymentPage.fxContractReference.input(testData.MT101Payment.fxContractReference);
        //select exist payee
        await _PaymentsPages.mt101PaymentPage.existBeneBtn.jsClick();
        await _PaymentsPages.mt101PaymentPage.existingPayee.select(testData.MT101Payment.existingPayee);
        await _PaymentsPages.mt101PaymentPage.paymentDetails.input(testData.MT101Payment.paymentDetails);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText1.input(testData.MT101Payment.regulatoryReportingText1);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText2.input(testData.MT101Payment.regulatoryReportingText2);
        await _PaymentsPages.mt101PaymentPage.regulatoryReportingText3.input(testData.MT101Payment.regulatoryReportingText3);
        await _PaymentsPages.mt101PaymentPage.transactionNotes.input(testData.MT101Payment.transactionNotes);
        await _PaymentsPages.mt101PaymentPage.saveButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await _PaymentsPages.mt101PaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        //verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewFromAccount).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).textContains(testData.MT101Payment.amount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneName).textContains(testData.MT101Payment.existingPayee),
            await ensure(_PaymentsPages.mt101PaymentPage.viewStatus).textContains(testData.status.Saved),
        ]);
    });

    it('Copy a MT101 Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('MT101 Payment', testData.status.PendingApproval);
        await _PaymentsPages.mt101PaymentPage.loadConditionForI3ViewPage();
        await _PaymentsPages.mt101PaymentPage.copyButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.amount.clean();
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.copyAmount);
        await _PaymentsPages.mt101PaymentPage.previewButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForPreviewPaymentPage();
        await _PaymentsPages.mt101PaymentPage.submitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await _PaymentsPages.mt101PaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        //verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).textContains(testData.MT101Payment.copyAmount)
        ]);
    });

    it('Edit a MT101 Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('MT101 Payment', testData.status.PendingApproval);
        await _PaymentsPages.mt101PaymentPage.loadConditionForI3ViewPage();
        await _PaymentsPages.mt101PaymentPage.editButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForEditPage();
        await _PaymentsPages.mt101PaymentPage.amount.clean();
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.editAmount);
        await _PaymentsPages.mt101PaymentPage.previewSubmitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForPreviewEditPaymentPage();
        await _PaymentsPages.mt101PaymentPage.submitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await _PaymentsPages.mt101PaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        //verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewFromAccount).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewAmount).textContains(testData.MT101Payment.editAmount),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneName).isNotEmpty(),
            await ensure(_PaymentsPages.mt101PaymentPage.viewBeneAccountNumber).isNotEmpty()
        ]);
    });

    it('Approve a MT101 Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('MT101 Payment', testData.status.PendingApproval);
        await _PaymentsPages.mt101PaymentPage.loadConditionForI3ViewPage();
        //if ref is empty then set the value from view.
        await _PaymentsPages.mt101PaymentPage.viewCustomerReference.getText().then((ref) => {
            tempRef = ref;
        });
        await _PaymentsPages.mt101PaymentPage.approveButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForApprovalPage();
        await _PaymentsPages.mt101PaymentPage.challengeResponse.input(testData.MT101Payment.challengeResponse);
        await _PaymentsPages.mt101PaymentPage.approveSubmitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, tempRef);

        //verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Reject a MT101 Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('MT101 Payment', testData.status.PendingApproval);
        await _PaymentsPages.mt101PaymentPage.loadConditionForI3ViewPage();
        //if ref is empty then set the value from view.
        await _PaymentsPages.mt101PaymentPage.viewCustomerReference.getText().then((ref) => {
            tempRef = ref;
        });
        await _PaymentsPages.mt101PaymentPage.rejectButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForRejectPage();
        await _PaymentsPages.mt101PaymentPage.rejectReason.input(testData.MT101Payment.rejectReason);
        await _PaymentsPages.mt101PaymentPage.rejectSubmitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //view
        await _PaymentsPages.mt101PaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, tempRef);

        //verify
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.viewStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete a MT101 Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('MT101 Payment', testData.status.PendingApproval);
        await _PaymentsPages.mt101PaymentPage.loadConditionForI3ViewPage();
        //if ref is empty then set the value from view.
        await _PaymentsPages.mt101PaymentPage.viewCustomerReference.getText().then((ref) => {
            tempRef = ref;
        });
        await _PaymentsPages.mt101PaymentPage.deleteButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForDeletePage();
        await _PaymentsPages.mt101PaymentPage.deleteSubmitButton.jsClick();
        await _PaymentsPages.mt101PaymentPage.loadConditionForCreateSuccessPage();
        await ensure(_PaymentsPages.mt101PaymentPage).isI3Success();

        //center
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(tempRef);

        //verify
        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
})