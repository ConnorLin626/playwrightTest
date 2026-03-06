/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE, devWatch } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this for verofy
let reference3 = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let fileName = "";
let testData = _PaymentsPages.fetchTestData("AU_testData.json");
let verifyReference = "";
let templateRef = "";
let tempNewPayeeName = "";
let approvalReference = "";

describe("AU Account Transfer Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "P@ssword123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an Account Transfer with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount1),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Copy a Account Transfer', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_ACT, testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
            //await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).isNotEmpty()
        ]);
    });

    it('Edit an Account Transfer ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_ACT, testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.editButton.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountEdit);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeNameEdit);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).isNotEmpty()
        ]);
    });

    it('Reject an Account Transfer ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_ACT, testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.rejectButton.jsClick();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
        await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete an Account Transfer', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_ACT, testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.deleteButton.jsClick();
        await _PaymentsPages.AccountTransferPage.deleteDialogButton.click();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.AccountTransfer.labelNoInformationDisplay);
        await _FilesPages.uploadFilePage.filesMenu.click();
    });

    it('Create with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        //due to IDXP-2000
        // await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        // await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
        // await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approveNowCheckBox.jsClickIfExist();
        //await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.AccountTransfer.challengeResponse);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount1),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)

        ]);
    });

    it('Create with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount2);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await addAddressAllFieldOldUI("details");
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approveNowCheckBox.jsClickIfExist();
        //await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.AccountTransfer.challengeResponse);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount2),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Create Account Transfer with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        tempNewPayeeName = testData.AccountTransfer.newPayeeName + generatedID();
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(tempNewPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(tempNewPayeeName);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'AUACT' + generatedID();
        await _PaymentsPages.AccountTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        // Check the Transaction under Transfer Center>View Page
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(tempNewPayeeName)
        ]);

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForACTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccountACT).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amountACT).textContains(testData.AccountTransfer.amount1),
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameACT).textContains(tempNewPayeeName)
        ]);
    });

    it('Create Account Transfer from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.AccountTransfer.SIT.existingTemplate : testData.AccountTransfer.UAT.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).isNotEmpty()
        ]);
        await _PaymentsPages.PaymentTemplatesPage.deleteTemplate(TemplateName);
    });

    it('Save an Account Transfer successfully As Draft', async function () {
        let referenceOfAuAct = '';
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName + generatedID());
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.AccountTransferPage.saveAsDraft.click();
        //await _PaymentsPages.AccountTransferPage.loadConditionForSaveAsDraft();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            referenceOfAuAct = text.trim();
        });
        await console.log("AUACTREF:"+referenceOfAuAct);
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceOfAuAct);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.Saved),
            await ensure(_PaymentsPages.AccountTransferPage.headerRef).textIs(referenceOfAuAct)
        ]);
    });

    it('Upload Account Transfer via Files - File Upload - Upload Files', async function () {
        // upload File start
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.AccountTransfer.SIT.fileName : testData.AccountTransfer.UAT.fileName, testData.AccountTransfer.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).isNotEmpty()
        ]);
    });

    // it('Upload Account Transfer via Files - File Transfer - Upload Profiles', async function () {

    // 	// go to upload profile
    // 	await uploadProfilesForBulk(lib_1.SIT ? testData.AccountTransfer.SIT.fileName : testData.AccountTransfer.UAT.fileName);

    // });

    it('Create an Account Transfer for verify and release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountVerify);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingVerification)
        ]);
    });
});

describe('Verify And Release A Account Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.verifyUserId : testData.AccountTransfer.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an Account Transfer via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, testData.paymentType.AU_ACT).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve an Account Transfer via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_ACT, testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.approveButton.jsClick();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);

    });

    it('Release an Account Transfer via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_ACT).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

export async function addAddressAllFieldOldUI(format : string) {
    if(format.includes("sample")){
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
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