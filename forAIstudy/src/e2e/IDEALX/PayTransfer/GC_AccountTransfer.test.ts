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
let templateName  = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let fileName = "";
let testData1 = _PaymentsPages.fetchTestData("GC_testData.json");
let testData2 = _FilesPages.fetchTestData('GC_testData.json')
//let uploadTestData = _FilesPages.fetchTestData('uploadTestData/GC_uploadTestData.json');
let approvalReference = "";
let paymentType = "";
let approvalOption = "";
let ACTPayeeName = "";

describe("GC Account Transfer Payment", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData1.AccountTransfer.SIT.loginCompanyId : testData1.AccountTransfer.UAT.loginCompanyId, SIT ? testData1.AccountTransfer.SIT.loginUserId : testData1.AccountTransfer.UAT.loginUserId, "123123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Copy an Account Transfer that Created from File Services', async function () {
        //await new NavigatePages().loginIdealx(SIT ? testData.ACT.SIT.loginCompanyId : testData.ACT.UAT.loginCompanyId, SIT ? testData.ACT.SIT.loginUserId : testData.ACT.UAT.loginUserId, "123123");
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "ALL - Universal File Format";
        approvalOption = "transaction";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData2.FileService.SIT.fileNameForACT : testData2.FileService.UAT.fileNameForACT, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.loadCondition();
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
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData1.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData1.AccountTransfer.SIT.fromAccount : testData1.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData1.AccountTransfer.PayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(testData1.AccountTransfer.PayeeAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData1.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(testData1.AccountTransfer.PaymentDetails),
        ]);
    });

    it('Create GC ACT template ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleGCPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'GCACTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.AccountTransferPage.fromAccount.select(testData1.AccountTransfer.fromGBPAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData1.AccountTransfer.amountA1);

        ACTPayeeName = 'ACTPayee' + generatedID();
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        // await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.newPayeeCountryInput.input(testData1.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.newPayeeCountrySelect.click();
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData1.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(ACTPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(ACTPayeeName);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.switchFormatButton.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData1.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData1.Beneficiary.townCity);
        await _PaymentsPages.BeneficiaryPage.streetName.input(testData1.Beneficiary.streetName);
        await _PaymentsPages.BeneficiaryPage.buildingNum.input(testData1.Beneficiary.buildingNum);
        await _PaymentsPages.BeneficiaryPage.buildingName.input(testData1.Beneficiary.buildingName);
        await _PaymentsPages.BeneficiaryPage.floor.input(testData1.Beneficiary.floor);
        await _PaymentsPages.BeneficiaryPage.room.input(testData1.Beneficiary.room);
        await _PaymentsPages.BeneficiaryPage.department.input(testData1.Beneficiary.department);
        await _PaymentsPages.BeneficiaryPage.subDepartment.input(testData1.Beneficiary.subDepartment);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData1.Beneficiary.postalCode);
        await _PaymentsPages.BeneficiaryPage.countrySubDivsion.input(testData1.Beneficiary.countrySubDivsion);
        await _PaymentsPages.BeneficiaryPage.townLocationName.input(testData1.Beneficiary.townLocationName);
        await _PaymentsPages.BeneficiaryPage.districtName.input(testData1.Beneficiary.districtName);            
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        //await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForACTtempViewPayge();
        await Promise.all([
           await ensure(_PaymentsPages.PaymentTemplatesPage.ViewTemplateName).textIs(templateName),
           await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccountACT).textContains(testData1.AccountTransfer.fromGBPAccount),
           await ensure(_PaymentsPages.PaymentTemplatesPage.amountACT).textContains(testData1.AccountTransfer.amountA1),
           await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameACT).textContains(ACTPayeeName),
           await ensure(_PaymentsPages.PaymentTemplatesPage.templateACTStatus).textIs(testData1.status.PendingApproval),
        ]);
    });

    it('Approve GC ACT template ', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData1.AccountTransfer.SIT.loginCompanyId : testData1.AccountTransfer.UAT.loginCompanyId, SIT ? testData1.AccountTransfer.SIT.ApproveTemplateUserId : testData1.AccountTransfer.UAT.ApproveTemplateUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.click();
        await _PaymentsPages.PaymentTemplatesPage.approveBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.viewApproveBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.dismissBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForACTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccountACT).textContains(testData1.AccountTransfer.fromGBPAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amountACT).textContains(testData1.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameACT).textContains(ACTPayeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateACTStatus).textIs(testData1.status.Approved),
        ]);
    });

})

    