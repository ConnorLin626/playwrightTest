/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const CB_1 = require("../../../pages/IDEALX");
const lib_1 = require("../../../lib");
let _FilesPages = new CB_1.FilesPages();
let fileName = "";
let testData = _PaymentsPages.fetchTestData("AU_testData.json");
let verifyReference = "";
let templateRef = "";
let newPayeeName = "";
let approvalReference = "";

describe("AU Telegraphic Transfer Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a Telegraphic Transfer with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select("AUSTRIA");
        await _PaymentsPages.TelegraphicTransferPage.enterDetailButton.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.ourRadio.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PartialApproved)
        ]);
    });

    it('Copy a Telegraphic Transfer', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
        ]);
    });

    it('Edit a Telegraphic Transfer ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForEdit();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountEdit);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeNameEdit);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountEdit),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeNameEdit)
        ]);
    });

    it('Reject a Telegraphic Transfer ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.rejectButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.reasonForRejection.input(testData.TelegraphicTransfer.rejectReason);
        await _PaymentsPages.TelegraphicTransferPage.rejectDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete a Telegraphic Transfer', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.deleteButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.deleteDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await lib_1.ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.TelegraphicTransfer.labelNoInformationDisplay);
    });

    it('Create with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select("AUSTRIA");
        await _PaymentsPages.TelegraphicTransferPage.enterDetailButton.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.switchFormatButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.streetName.input(testData.TelegraphicTransfer.streetName);
        await _PaymentsPages.TelegraphicTransferPage.buildingNum.input(testData.TelegraphicTransfer.buildingNum);
        await _PaymentsPages.TelegraphicTransferPage.buildingName.input(testData.TelegraphicTransfer.buildingName);
        await _PaymentsPages.TelegraphicTransferPage.floor.input(testData.TelegraphicTransfer.floor);
        await _PaymentsPages.TelegraphicTransferPage.room.input(testData.TelegraphicTransfer.room);
        await _PaymentsPages.TelegraphicTransferPage.department.input(testData.TelegraphicTransfer.department);
        await _PaymentsPages.TelegraphicTransferPage.subDepartment.input(testData.TelegraphicTransfer.subDepartment);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransfer.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.countrySubDivsion.input(testData.TelegraphicTransfer.countrySubDivsion);
        await _PaymentsPages.TelegraphicTransferPage.townLocationName.input(testData.TelegraphicTransfer.townLocationName);
        await _PaymentsPages.TelegraphicTransferPage.districtName.input(testData.TelegraphicTransfer.districtName);
        await _PaymentsPages.TelegraphicTransferPage.ourRadio.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approveNowCheckBox.jsClick();
        //await _PaymentsPages.TelegraphicTransferPage.pushOption.clickIfExist();
        await ensure(_PaymentsPages.TelegraphicTransferPage.mchallengeText).textContains(testData.TelegraphicTransfer.mChllengeText);
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received, testData.status.Completed)
        ]);
    });

    it('Create with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select("AUSTRIA");
        await _PaymentsPages.TelegraphicTransferPage.enterDetailButton.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransfer.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.ourRadio.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.TelegraphicTransferPage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received)
        ]);
    });

    it('Upload Telegraphic Transfer via Files Services Upload', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", lib_1.SIT ? testData.TelegraphicTransfer.SIT.fileName : testData.TelegraphicTransfer.UAT.fileName, testData.TelegraphicTransfer.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.copyButton).isNotDisabled(),
        ]);
        // add for R8.9 FS copy function
        await _PaymentsPages.AccountTransferPage.copyButton.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
        ]);

    });

    it('Create with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select("AUSTRIA");
        await _PaymentsPages.TelegraphicTransferPage.enterDetailButton.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        newPayeeName = testData.TelegraphicTransfer.newPayeeName + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransfer.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.ourRadio.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'AUTT' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(newPayeeName)
        ]);

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(newPayeeName)
        ]);
    });

    it('Create from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.TelegraphicTransfer.SIT.existingTemplate : testData.TelegraphicTransfer.UAT.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).isNotEmpty()
        ]);
    });

    it('Save a Telegraphic Transfer successfully As Draft', async function () {
        let paymentReference = '';
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select("AUSTRIA");
        await _PaymentsPages.TelegraphicTransferPage.enterDetailButton.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName + generatedID());
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransfer.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.ourRadio.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.saveAsDraft.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            // console.error(paymentReference);
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.Saved)
        ]);
    });

    it('Create a Telegraphic Transfer for verify and release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountVerify);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select("AUSTRIA");
        await _PaymentsPages.TelegraphicTransferPage.enterDetailButton.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.switchFormatButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.streetName.input(testData.TelegraphicTransfer.streetName);
        await _PaymentsPages.TelegraphicTransferPage.buildingNum.input(testData.TelegraphicTransfer.buildingNum);
        await _PaymentsPages.TelegraphicTransferPage.buildingName.input(testData.TelegraphicTransfer.buildingName);
        await _PaymentsPages.TelegraphicTransferPage.floor.input(testData.TelegraphicTransfer.floor);
        await _PaymentsPages.TelegraphicTransferPage.room.input(testData.TelegraphicTransfer.room);
        await _PaymentsPages.TelegraphicTransferPage.department.input(testData.TelegraphicTransfer.department);
        await _PaymentsPages.TelegraphicTransferPage.subDepartment.input(testData.TelegraphicTransfer.subDepartment);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransfer.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.countrySubDivsion.input(testData.TelegraphicTransfer.countrySubDivsion);
        await _PaymentsPages.TelegraphicTransferPage.townLocationName.input(testData.TelegraphicTransfer.townLocationName);
        await _PaymentsPages.TelegraphicTransferPage.districtName.input(testData.TelegraphicTransfer.districtName);
        await _PaymentsPages.TelegraphicTransferPage.ourRadio.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingVerification)
        ]);
    });
});

describe('Verify And Release a Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Telegraphic Transfer via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.AU_TT).then(reference => {
            verifyReference = reference;
        });;
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Apprpve a Telegraphic Transfer via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.approveButton.click();
        await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input("222222");
        await _PaymentsPages.TelegraphicTransferPage.approveButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForDismissDialog();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference)
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release a Telegraphic Transfer via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_TT).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

