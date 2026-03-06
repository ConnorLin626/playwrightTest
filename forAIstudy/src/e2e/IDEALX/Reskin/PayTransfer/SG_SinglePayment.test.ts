/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages,ApprovalsPages,FilesPages } from "../../../../pages/IDEALX";
import {ensure, SIT,randomNumbers, handlerCase, generatedID,PROJECT_TYPE, devWatch} from "../../../../lib";
import { browser } from "protractor";
import moment = require("moment");

let giroReference = "";
let ttReference = "";
let ttReference1 = "";
let qarReference = "";
let actReference = "";
let reference3 = "";
let paymentReference="";
let actReference1 = "";
let actCopyReference = '';
let fastReference = "";
let rtgsReference = "";
let reference="";
let TemplateName = '';
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('SG_testData_04.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/SG_uploadTestData.json');
let fileName = "";
const now = new Date();
let dayOfWeek = now.getDay();

let createTT = async function (isSaveAsTemplate = false, createWithVerify = false, bookingRate = false) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
   // await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.ttExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(createWithVerify ? testData.singlePaymentReskin.verifyAmount : testData.singlePaymentReskin.amount);
    if (bookingRate) {
        await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.singlePaymentReskin.usdCcy);
        await _PaymentsPages.singlePaymentPage.loadConditionForFX();
        await _PaymentsPages.singlePaymentPage.fxOnline.jsClick();
        // await _PaymentsPages.singlePaymentPage.fxContractCheckBox.jsClick();
        await _PaymentsPages.singlePaymentPage.viewRate.jsClick();
        await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
        await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.confirmDialogBtn.jsClick();
    }
    await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    if (isSaveAsTemplate) {
        await _PaymentsPages.singlePaymentPage.saveAsTemplateBtn.jsClick();
        TemplateName = 'TTName' + generatedID();
        await _PaymentsPages.singlePaymentPage.templateName.input(TemplateName);
    }
    await _PaymentsPages.singlePaymentPage.submitBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        ttReference = text.trim();
    });
};

let createTTwithSFX = async function (isApproveNow : Boolean, existingPayee : string) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount3 : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(existingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.singlePaymentReskin.usdCcy);
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    await _PaymentsPages.singlePaymentPage.gFxRate.jsClick();
    //add for IDXP_2274
    await ensure(_PaymentsPages.singlePaymentPage.saveMessage).textContains(testData.singlePaymentReskin.saveMessage);
    ///
    await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClick();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    if(SIT){
        await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClick();
    }
    await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    if(isApproveNow){
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
        await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
    }else{
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.submitwithoutApprove.click();
    }
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await browser.sleep(3000);
};

let multiApprovePayment = async function (isMoreRate : Boolean, isSFX : Boolean,isIndicative : Boolean,isConfirmrate : Boolean) {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewByTx();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(ttReference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.byTxnfilter.clean();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(ttReference1);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.ReviewApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewReview();
        await browser.sleep(1000);
        await Promise.all([
            await ensure(_ApprovalsPages.ApprovalPage.secureFXLabell).textContains("SecureFX"),
            await ensure(_ApprovalsPages.ApprovalPage.secureFXLabel2).textContains("SecureFX"),
            await ensure(_ApprovalsPages.ApprovalPage.moreRate1).isElementPresent(),
            await ensure(_ApprovalsPages.ApprovalPage.moreRate2).isElementPresent(),
        ]);
        if(isMoreRate && isSFX){
            await _ApprovalsPages.ApprovalPage.moreRate1.jsClick();
            await _PaymentsPages.singlePaymentPage.gFxRateBtn.click();
            await _ApprovalsPages.ApprovalPage.ProceedSelectionBtn.jsClick();
            await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
            await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick();
            await _ApprovalsPages.ApprovalPage.moreRate2.jsClick();
            await _PaymentsPages.singlePaymentPage.gFxRateBtn.click();
            await _ApprovalsPages.ApprovalPage.ProceedSelectionBtn.jsClick();
            await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
            await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick();
            await _ApprovalsPages.ApprovalPage.ReviewPageApproveBtn.jsClick();
        }
        else if(isMoreRate && isIndicative){
            await _ApprovalsPages.ApprovalPage.moreRate1.jsClick();
            await _ApprovalsPages.ApprovalPage.ProceedSelectionBtn.click();
            await _ApprovalsPages.ApprovalPage.moreRate2.jsClick();
            await _ApprovalsPages.ApprovalPage.ProceedSelectionBtn.jsClick();
            await _ApprovalsPages.ApprovalPage.ReviewPageApproveBtn.jsClick();
        }
        else if(isMoreRate && isConfirmrate){
            console.log("flow3"+isMoreRate+isConfirmrate);
            await _ApprovalsPages.ApprovalPage.moreRate1.jsClick();
            console.log("flow3beforefxonline")
            await ensure(_PaymentsPages.singlePaymentPage.fxOnlineBtn).isElementPresent();
            await _PaymentsPages.singlePaymentPage.fxOnlineBtn.click();
            console.log("flow3afterfxonline")
            await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
            console.log("flow3afterbook")
            await _PaymentsPages.singlePaymentPage.bookRateBtn.click();
            await _ApprovalsPages.ApprovalPage.moreRate2.jsClick();
            await _PaymentsPages.singlePaymentPage.fxOnlineBtn.click();
            await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
            await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick();
            await _ApprovalsPages.ApprovalPage.ReviewPageApproveBtn.jsClick();
        }else{
            await _ApprovalsPages.ApprovalPage.ReviewPageApproveBtn.jsClick();
            await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
            await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick(); 
        }
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input("12345678");
        await _ApprovalsPages.ApprovalPage.challengeApproveBtn.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForSuccessPage();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
   };

let createACT = async function (bookingRate = false) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    //await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.actExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    if (bookingRate) {
        await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.singlePaymentReskin.usdCcy);
        await _PaymentsPages.singlePaymentPage.indicativeRate.jsClick();
    }
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    await _PaymentsPages.singlePaymentPage.submitBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        actReference = text.trim();
    });
};

let createGiroPayment = async function (isApprovalNow = false) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    //await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.rtgsExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
    console.log(currentDate);
    // await _PaymentsPages.singlePaymentPage.paymentDateBtn.click();
    await _PaymentsPages.singlePaymentPage.paymentDate.select3(currentDate);
    await _PaymentsPages.singlePaymentPage.giroPaymentType.jsClick();
    await _PaymentsPages.singlePaymentPage.purposeCode.select(testData.singlePaymentReskin.purposeCode);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    if (isApprovalNow) {
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        if(!SIT){
            await browser.sleep(2000);
            await _PaymentsPages.singlePaymentPage.enterCodeManul.click();
            await _PaymentsPages.singlePaymentPage.enterManually.click();
            await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
            await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
            await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        }
    } else {
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
    }
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        giroReference = text.trim();
    });
};

//R8.11 single payment reskin
describe('SG_single payment_reskin', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.IDEALX); });
    //Due to working time comment out this case
    // it('Create TT with booking rate', async function () {
    //     await createTT(false,false, true)

    //     await Promise.all([
    //         await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.singlePaymentReskin.fromAccount),
    //         await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee),
    //         await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount)
    //     ]);
    // });

    it('Create TT with save as template', async function () {
        await createTT(true, false, false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForViewTTTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.singlePaymentPage.acctNmValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.amountValue).textContains(testData.singlePaymentReskin.amount)
        ]);
    });

    it('Create ACT with existing payee', async function () {
        await createACT(false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        if(!SIT){
            await browser.sleep(3000);
        }
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    //Add for R8.18 IDXP-1295
    it('Copy ACT in submit page with amount 999999999999.99 GBP', async function () {
        // await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccountWithGBP : testData.singlePaymentReskin.UAT.fromAccountWithGBP);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        if(!SIT){
            await _PaymentsPages.singlePaymentPage.fromAcctMulSelected.click();
        }
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.actExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await browser.sleep(500);
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.maxGBPAmount);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
        await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actReference1 = text.trim();
        }); 
        await _PaymentsPages.singlePaymentPage.copyBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.loadConditionForTTACTSectionPage();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actReference1 = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference1);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccountWithGBP : testData.singlePaymentReskin.UAT.fromAccountWithGBP),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.maxGBPAmountValue),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve ACT which use indicative rate ', async function () {
        await createACT(true);
         // Login with non Dol User
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserNonDol : testData.singlePaymentReskin.UAT.loginUserNonDol, testData.singlePaymentReskin.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.indicativeRate.clickIfExist();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        if(!SIT){
            await browser.sleep(3000);
        }
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.indicativeRate)
        ]);
    });

    it('Copy ACT in the submit page', async function () {
        await createACT(false);
        await _PaymentsPages.singlePaymentPage.copyBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.loadConditionForTTACTSectionPage();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.actExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Reject ACT in the view page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== actReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.rejectBtn.click();
        await _PaymentsPages.singlePaymentPage.rejectReason.input("reasonForRejection");
        await _PaymentsPages.singlePaymentPage.rejectDialogButton.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            actReference = text;
        });
        await ensure(_PaymentsPages.singlePaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.Rejected),
        ]);
    });
    //IDXP-2000
    it('Copy ACT with payment new payee address', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();

         //add new payee
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.addNewPayee.click();
        await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.singlePaymentReskin.payeeLocation);
        await _PaymentsPages.singlePaymentPage.DBSBank.jsClick();
        await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.singlePaymentReskin.acctNumberValue);
        let newPayeeName = 'ACTNewPayeeName' + generatedID();
        await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
        await _PaymentsPages.singlePaymentPage.saveTolist.jsClick();
        await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();
        await browser.sleep(1000);
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actCopyReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.copyBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            actCopyReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actCopyReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Create GIRO Payment with approve now', async function () {
        if(!SIT){
            await browser.sleep(10000);
        }
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password); 
        await createGiroPayment(true);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(giroReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.rtgsExistingPayee)
        ]);
    });

    it('Edit GIRO Payment in the submit page', async function () {
        await createGiroPayment(false);
        await _PaymentsPages.singlePaymentPage.editBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.loadConditionForDomesticSectionPage();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.editAmount);
        //wait amount input
        await browser.sleep(2000);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            giroReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(giroReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.editAmount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.rtgsExistingPayee)
        ]);
    });

    it('Offline approval GIRO Payment in the view page', async function () {
        // AUTOSG04S01 does not have push approval entitlement, can do offline approval
        if(!SIT){
            await browser.sleep(10000);
        }
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId01 : testData.singlePaymentReskin.UAT.loginUserId01, testData.singlePaymentReskin.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== giroReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(giroReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - GIRO Payment", testData.status.PendingRelease);
        }
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        // await _PaymentsPages.singlePaymentPage.getChallengeBtn.click();
        await _PaymentsPages.singlePaymentPage.approverOption.select(SIT ? testData.singlePaymentReskin.approverOption:testData.singlePaymentReskin.UAT.loginUserId03);
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            giroReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(giroReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
    
    //Due to working time comment out this case
    // it('Create RTGS with add contract manually', async function () {
    //     await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.singlePaymentPage.makePayment.click();
    //     await _PaymentsPages.singlePaymentPage.loadCondition();
    //     await _PaymentsPages.singlePaymentPage.fromAccount.click();
    //     await _PaymentsPages.singlePaymentPage.fromAcctInput.input(testData.singlePaymentReskin.fromAccount2);
    //     await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    //     //await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
    //     await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.singlePaymentReskin.sgdCcy);
    //     await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    //     await _PaymentsPages.singlePaymentPage.existingPayee.click();
    //     await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.rtgsExistingPayee);
    //     await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    //     // await _PaymentsPages.singlePaymentPage.fxOnline.jsClick();
    //     await _PaymentsPages.singlePaymentPage.fxOnlineLabel.jsClick();
    //     // await _PaymentsPages.singlePaymentPage.fxContractCheckBox.jsClick();
    //     // await _PaymentsPages.singlePaymentPage.fxRefInput.input(testData.singlePaymentReskin.fxReference);
    //     await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
    //     await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick();
    //     await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
    //     await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    //     await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    //     await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
    //     await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    //     await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    //     await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    //     await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    //     await _PaymentsPages.singlePaymentPage.submitBtn.click();
    //     await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
    //         rtgsReference = text.trim();
    //     });
    //     await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(rtgsReference);
    //     await Promise.all([
    //         await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.singlePaymentReskin.fromAccount2),
    //         await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.rtgsExistingPayee),
    //         await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
    //         await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval)
    //     ]);
    // });


    it('Create fast payment with save as draft', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
       // await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.fastExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await _PaymentsPages.singlePaymentPage.RPPC.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.singlePaymentReskin.purposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
        await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            fastReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.Saved)
        ]);
    });

    //IDXP-2278 NEW UI TT
    it('Edit TT payment with save as draft which payee be updated', async function () {
    await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserIdupdate : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password);  
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
   // await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.ttUpdatedPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClickIfExist();
    //await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    //await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    //await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
    //await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
    await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.click();
    await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
    });
    await _PaymentsPages.singlePaymentPage.okBtn.click();
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    //edit payee
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.singlePaymentReskin.ttUpdatedPayee);
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
    let ramNumbers = randomNumbers();
    await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.existingPayeeAcctNum+ramNumbers);
    await _PaymentsPages.BeneficiaryPage.next.click();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
        
     //edit txn
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
    await _PaymentsPages.singlePaymentPage.editBtn.click();
    //await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.NewUIPayeeDetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
    ]);
    await browser.sleep(2000);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.ttUpdatedPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
    await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.ViewPagePayeedetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
        ]);
    });

    //IDXP-2278 NEW UI Giro
    it('Copy GIRO Payment with save as draft which payee be updated', async function () {
        if(!SIT){
            await browser.sleep(10000);
        }
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password); 
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    //await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.rtgsUpdatedPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
    console.log(currentDate);
    // await _PaymentsPages.singlePaymentPage.paymentDateBtn.click();
    await _PaymentsPages.singlePaymentPage.paymentDate.select3(currentDate);
    await _PaymentsPages.singlePaymentPage.giroPaymentType.jsClick();
    await _PaymentsPages.singlePaymentPage.purposeCode.select(testData.singlePaymentReskin.purposeCode);
    //await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    //await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    //await _PaymentsPages.singlePaymentPage.val.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
     await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.click();
    await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
    });
    await _PaymentsPages.singlePaymentPage.okBtn.click();
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    //edit payee
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.singlePaymentReskin.rtgsUpdatedPayee);
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
    let ramNumbers = randomNumbers();
    await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.existingPayeeAcctNum+ramNumbers);
    await _PaymentsPages.BeneficiaryPage.next.click();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
        
     //copy txn
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
    await _PaymentsPages.singlePaymentPage.copyBtn.click();
    //await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.NewUIPayeeDetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
    ]);
    await browser.sleep(2000);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.rtgsUpdatedPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
    await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            giroReference = text;
        });
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(giroReference);
    await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.ViewPagePayeedetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
        ]);
    });

    //IDXP-2278 NEW UI ACT
    it('Edit ACT with save as draft which payee be updated', async function () {
         await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    //await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.actUpdatedPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.addemail.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
         await _PaymentsPages.singlePaymentPage.saveAsDraftBtn.click();
    await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
    });
    await _PaymentsPages.singlePaymentPage.okBtn.click();
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    //edit payee
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.singlePaymentReskin.actUpdatedPayee);
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
    let ramNumbers = randomNumbers();
    await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.existingPayeeAcctNum+ramNumbers);
    await _PaymentsPages.BeneficiaryPage.next.click();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
     //edit txn
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
    await _PaymentsPages.singlePaymentPage.editBtn.click();
    //await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.NewUIPayeeDetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
    ]);
    await browser.sleep(2000);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.actUpdatedPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
    await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.ViewPagePayeedetail).textContains(testData.Beneficiary.existingPayeeAcctNum+ramNumbers),
        ]);    
    });

    it('Create fast payment with new payee address', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password); 
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.addNewPayee.click();
        await _PaymentsPages.singlePaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.selectedCountry.select(testData.singlePaymentReskin.payeeLocation);
        await _PaymentsPages.singlePaymentPage.payeeBankSearch.click();
        await _PaymentsPages.singlePaymentPage.newPayeeBankIdInput.input(testData.singlePaymentReskin.payeeBankID);
        await _PaymentsPages.singlePaymentPage.bankIdValueSelect.click();
        await _PaymentsPages.singlePaymentPage.acctNumber.input(testData.singlePaymentReskin.acctNumberValue);
        let newPayeeName = 'ACTNewPayeeName' + generatedID();
        await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeNickname.input(newPayeeName);
        await addAddressAllFieldNewUI("sample");
        await _PaymentsPages.singlePaymentPage.payeeReviewBtn.click();
        await _PaymentsPages.singlePaymentPage.saveTolist.jsClick();
        await _PaymentsPages.singlePaymentPage.usePayeewBtn.click();
        await browser.sleep(1000);
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await _PaymentsPages.singlePaymentPage.RPPC.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.singlePaymentReskin.purposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
        await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);

        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            fastReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.payeeAcctNumberView).textContains(testData.singlePaymentReskin.acctNumberValue)

        ]);
    });

    // it will be better for the latest case, for the filter input will not be reset, will impact other cases
    it('Delete fast payment in the view page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== fastReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - FAST Payment", testData.status.Saved);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.deleteBtn.click();
        await _PaymentsPages.singlePaymentPage.deleteDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            fastReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(fastReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
    
   // Add for R8.12 IDXP-262
    it('Create TT with add SecureFX', async function () {
        if(!SIT){
            await browser.sleep(10000);
        }
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserNonDol : testData.singlePaymentReskin.UAT.loginUserNonDol, testData.singlePaymentReskin.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.ttExistingPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.singlePaymentReskin.usdCcy);
        await _PaymentsPages.singlePaymentPage.scrollTo(0,1000);
        await _PaymentsPages.singlePaymentPage.ttPaymentType.click();
        await _PaymentsPages.singlePaymentPage.gFxRate.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
        await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        if(!SIT){
            await browser.sleep(5000);
        }
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).isNotEmpty(),
        ]);
    });

    // add for IDXP-777 Purpose Code dropdown for INR
    it('Create TT with INR CCY', async function () {
        if(!SIT){
            await browser.sleep(10000);
        }
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId04 : testData.singlePaymentReskin.UAT.loginUserId04, testData.singlePaymentReskin.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.newttpayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.singlePaymentReskin.inrCcy);
        if(!SIT){
            await browser.sleep(2000);
            await _PaymentsPages.singlePaymentPage.ttPaymentType.jsClick();
        }
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClick();
        await _PaymentsPages.singlePaymentPage.RPPC.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.singlePaymentReskin.purposeCodeForINR);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        // await _PaymentsPages.singlePaymentPage.IFSC.input('ABCD0123456');
        if(!SIT){
            await _PaymentsPages.singlePaymentPage.updatePayeeDetails.jsClick();
        }
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.otherDetail.click();
        if(!SIT){
            await browser.sleep(5000);
        }
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.newttpayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView3).textContains(testData.singlePaymentReskin.purposeCodeForINR),
        ]);
    });

    // Add for R8.22 IDXP-2116
    it('Copy TT with new QAR purose code in payment history page', async function () {
        await createTT(false, false, false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(ttReference);
        await _PaymentsPages.TransferCentersPage.actionBtn.click();
        await _PaymentsPages.TransferCentersPage.actionCopyBtn.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.singlePaymentReskin.qarCcy);

        await _PaymentsPages.singlePaymentPage.RPPC.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.singlePaymentReskin.RPPCForQAR);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            qarReference = text.trim();
        });
        console.log("TT copyref:"+qarReference);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(qarReference);
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.singlePaymentReskin.qarCcy),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView4).textContains(testData.singlePaymentReskin.RPPCForQAR)
        ]);
        
    });
});
describe('SG_single payment_reskin_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // below cases need login with AUSTOSG04S01 user, 1. does not have push approval access 2.is nodol
    it('Verify TT in the view page', async function () {
        await createTT(false, true, false);
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId01 : testData.singlePaymentReskin.UAT.loginUserNonDol, testData.singlePaymentReskin.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.verifyReleaseBtn.click();
        await _PaymentsPages.singlePaymentPage.verifyReleaseDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval)
        ]);
    });

    it('Approval TT in the view page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== ttReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            ttReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release TT in the view page', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        if (0 !== ttReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingRelease);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.verifyReleaseBtn.click();
        await _PaymentsPages.singlePaymentPage.verifyReleaseDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            ttReference = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

describe('SG_single payment with SFX rate', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskinForVA.SIT.loginCompanyId1 : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskinForVA.SIT.loginUserVA1 : testData.singlePaymentReskin.UAT.loginUserId01, testData.singlePaymentReskin.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

   // below cases need login with AUSTOSG05S01 user DOL and company has SFX
   if(SIT){
   it('Create payment with SFX and approve Now', async function () {
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(true,testData.singlePaymentReskin.ttExistingPayee);
        }else{
            await createTTwithSFX(true,testData.singlePaymentReskin.ttExistingPayeeForWeekend);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
            console.log(ttReference);
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.singlePaymentReskin.fromAccount3),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.secureFxRate)
        ]);
       
    });
    it('Approve payment with SFX on view page', async function () {
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee1);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend1);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.bookRateItemAgree.jsClick();
        await _PaymentsPages.singlePaymentPage.bookRateBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.getChallengeBtn.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.responseCode.input("12345678");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.singlePaymentReskin.fromAccount3),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee1),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.secureFxRate)
        ]);
    });

    it('Multi approve payment with SFX on my approve page', async function () {
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee2);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend2);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
            console.log("reference1:"+ttReference);
        });
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee3);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend3);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference1 = text.trim();
            console.log("reference2:"+ttReference);
        });
        await multiApprovePayment(false,false,false,false)
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.singlePaymentReskin.fromAccount3),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee2),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.secureFxRate)
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference1);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.singlePaymentReskin.fromAccount3),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee3),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.secureFxRate)
        ]);
    });

    it('Multi approve payment that click more rate change to indicative rate on my approve page', async function () {
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee4);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend4);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee5);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend5);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference1 = text.trim();
        });
        await multiApprovePayment(true,false,true,false);
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount3 : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee4),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.indicativeRate)
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference1);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount3 : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee5),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.indicativeRate)
        ]);
    });

    it('Multi approve payment that click more rate change to SFX rate on my approve page', async function () {
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee8);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend8);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
        });
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee9);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend9);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference1 = text.trim();
        });
        await multiApprovePayment(true,true,false,false)
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await browser.sleep(5000);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount3 : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee8),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed,testData.status.Received),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).isNotEmpty(),
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference1);
        await browser.sleep(5000);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount3 : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee9),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed,testData.status.Received),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).isNotEmpty(),
        ]);
    });

    it('Multi approve payment that click more rate change to FX rate on my approve page - create', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskinForVA.SIT.loginCompanyId1 : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskinForVA.SIT.loginUserVA1 : testData.singlePaymentReskin.UAT.loginUserId01, testData.singlePaymentReskin.UAT.password);
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee6);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend6);
        }
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference = text.trim();
            console.log("multittReference1:"+ttReference);
        });
        if(dayOfWeek >= 1 && dayOfWeek <= 5){
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee7);
        }else{
            await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayeeForWeekend7);
        }
        await createTTwithSFX(false,testData.singlePaymentReskin.ttExistingPayee7);
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            ttReference1 = text.trim();
            console.log("multittReference2:"+ttReference1);
        });
        console.log("multittReference3:"+ttReference);
    });
    
    it('Multi approve payment that click more rate change to FX rate on my approve page - approve', async function () {
        await multiApprovePayment(true,false,false,true);
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        console.log("multittReference4:"+ttReference);
        await browser.sleep(2000);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.singlePaymentReskin.fromAccount3 : testData.singlePaymentReskin.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee6),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed,testData.status.Received),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.confirmedRate)
        ]);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference1);
        await browser.sleep(2000);
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.singlePaymentReskin.fromAccount3),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.singlePaymentReskin.ttExistingPayee7),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.singlePaymentReskin.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed,testData.status.Received),
            await ensure(_PaymentsPages.singlePaymentPage.secureFxRateValue).textContains(testData.singlePaymentReskin.confirmedRate)
        ]);
    });
    }
});

//add for IEBAA-3373
describe('SG_single payment with bank return reject code', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    if(SIT){
    it('Create a TT after final approval bank return reject code RF02', async function () {
        await createTTwithRejectCode("-REJECT-RF02-")
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.otherDetail.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.BankRejected),
            await ensure(_PaymentsPages.singlePaymentPage.bankRemarks).textContains(testData.singlePaymentReskin.bankRemarks),
            await ensure(_PaymentsPages.singlePaymentPage.workflowRejectReason).textContains(testData.singlePaymentReskin.workFlowRejectReason)
        ]);
    });

    it('Create a TT after final approval bank return BAU reject code', async function () {
        await createTTwithRejectCode("-REJECT-")
        await browser.sleep(3000);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.singlePaymentPage.otherDetail.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.BankRejected),
            await ensure(_PaymentsPages.singlePaymentPage.bankRemarks).textNotContains(testData.singlePaymentReskin.bankRemarks),
            await ensure(_PaymentsPages.singlePaymentPage.workflowRejectReason).isNotElementPresent()
        ]);
    });

    it('Upload RTGS after final approval bank return reject code RF04', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format",testData.singlePaymentReskin.fileNameForRTGS, "By Transaction").then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            rtgsReference = text;
        });
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await browser.sleep(15000);
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(rtgsReference);
        await _PaymentsPages.singlePaymentPage.otherDetail.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.BankRejected),
            await ensure(_PaymentsPages.singlePaymentPage.bankRemarks).textContains(testData.singlePaymentReskin.bankRemarks),
            await ensure(_PaymentsPages.singlePaymentPage.workflowRejectReason).textContains(testData.singlePaymentReskin.workFlowRejectReason)
        ]);
    });
    }
});

//add for IDXP-2004
describe('SG_single payment with existing payee that missing mamdatory field', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create TT with existing payee that missing Payee address check will display update payee pop up', async function () {
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        // await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.ttExistingPayeeWithoutAddress);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.updatePayeePopUp).textContains(testData.singlePaymentReskin.updatePayeeDeatil),
        ]);
    });

    it('Create RTGS with existing payee that towncity missing value check will display update payee pop up', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.singlePaymentReskin.SIT.loginCompanyId : testData.singlePaymentReskin.UAT.loginCompanyId, SIT ? testData.singlePaymentReskin.SIT.loginUserId02 : testData.singlePaymentReskin.UAT.loginUserId02, testData.singlePaymentReskin.UAT.password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        // await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.click();
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.rtgsExistingPayee1);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
        await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.singlePaymentReskin.paymentDetails);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.updatePayeePopUp).textContains(testData.singlePaymentReskin.updatePayeeDeatil),
        ]);
    });
});

export async function createTTwithRejectCode(rejectCode: string) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.singlePaymentReskin.fromAccount : testData.singlePaymentReskin.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.singlePaymentReskin.ttExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.singlePaymentReskin.amount);
    await _PaymentsPages.singlePaymentPage.bankChargeUs.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.singlePaymentReskin.messageToOrderingBank);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.singlePaymentReskin.adviceContent);
    await _PaymentsPages.singlePaymentPage.email.input(testData.singlePaymentReskin.val);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(rejectCode);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
    await _PaymentsPages.singlePaymentPage.approveBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        ttReference = text.trim();
    });
    console.log(ttReference);
    await browser.sleep(5000);
}


export async function addAddressAllFieldNewUI(format : string) {
    if(format.includes("sample")){
        await _PaymentsPages.singlePaymentPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.singlePaymentPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.singlePaymentPage.payeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.singlePaymentPage.payeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.singlePaymentPage.postalCode.input(testData.Beneficiary.postalCode);
    }else{
        await _PaymentsPages.singlePaymentPage.switchFormatButton.click();
        await _PaymentsPages.singlePaymentPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.singlePaymentPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.singlePaymentPage.streetName.input(testData.Beneficiary.streetName);
        await _PaymentsPages.singlePaymentPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _PaymentsPages.singlePaymentPage.buildingName.input(testData.Beneficiary.buildingName);
        await _PaymentsPages.singlePaymentPage.floor.input(testData.Beneficiary.floor);
        await _PaymentsPages.singlePaymentPage.room.input(testData.Beneficiary.room);
        await _PaymentsPages.singlePaymentPage.department.input(testData.Beneficiary.department);
        await _PaymentsPages.singlePaymentPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _PaymentsPages.singlePaymentPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.singlePaymentPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _PaymentsPages.singlePaymentPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _PaymentsPages.singlePaymentPage.districtName.input(testData.Beneficiary.districtName);
    }
}
