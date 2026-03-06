/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages,  FilesPages, ApprovalsPages } from "../../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE, devWatch, generatedID } from "../../../../lib";
import { browser } from "protractor";
import { deleteFile, load1stPPC, LoadPpcCriteria, getOutPutFile, hasSameContent, } from "../../PayTransfer/cbcfx/LoadPpcUtils";


let fileName = "";
let reference = "";
//for approve
let reference1 = "";
let newJPYPayeeName = ""
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let criteria = new LoadPpcCriteria();
criteria.purposeCode = _PaymentsPages.TelegraphicTransferPage.purposeCode;
criteria.subPurposeCode = _PaymentsPages.TelegraphicTransferPage.subPurposeCode;
let existingPayee = async function () {
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.ExistingPayee);
    await _PaymentsPages.singlePaymentPage.payeeSelected.click();
};

let createGlobesend = async function (approveNow :boolean, isCNH : boolean) {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    if(isCNH){
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.cnhCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingCNHPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
    } else {
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccy);
        await existingPayee();
    }
    await _PaymentsPages.singlePaymentPage.amount.input(approveNow? testData.GlobesendPayment.amount:testData.GlobesendPayment.amount1);
    await _PaymentsPages.singlePaymentPage.scrollTo(1000, 2000);
    await _PaymentsPages.singlePaymentPage.purposeCode.select(testData.GlobesendPayment.purposeCode);
    await _PaymentsPages.singlePaymentPage.digiDocFileUploadButton.select(testData.GlobesendPayment.uploadFileName);
    if(isCNH){
        //du to DASB-62571 input paymentDetail manually
        await _PaymentsPages.singlePaymentPage.paymentDetailForCNH.input(testData.GlobesendPayment.paymentDetails);
    }
    if(! isCNH){
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClickIfExist();
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.paymentDetails);
    }
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.GlobesendPayment.adviceContent);
    await _PaymentsPages.singlePaymentPage.val.input(testData.GlobesendPayment.val);
    await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClick();
    await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.GlobesendPayment.messageToOrderingBank);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    if (approveNow == true) {
        await _PaymentsPages.singlePaymentPage.approveAndSubmitBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await browser.sleep(25000);
    } else {
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
    }
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        reference = text.trim();
    });
    console.log(reference)
};

describe('TW Globesend payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create TW Globesend with supporting documents section', async function () {
        await createGlobesend(false,false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await checkViewPageAllField();
    });

    it('Offline approve TW Globesend', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.verifyUserId : testData.GlobesendPayment.UAT.verifyUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Globesend Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.approveBtn.click();
        await _PaymentsPages.singlePaymentPage.approverOption.select(SIT ? testData.GlobesendPayment.SIT.approverOption : testData.GlobesendPayment.UAT.approverOption);
        await _PaymentsPages.singlePaymentPage.responseCode.input("123123");
        await _PaymentsPages.singlePaymentPage.approvalDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            reference1 = text;
        });
        await _PaymentsPages.singlePaymentPage.okBtn.jsClick();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Copy TW Globesend on View page', async function () {
        { await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password); }
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Globesend Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.copyBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.purposeCode.select(testData.GlobesendPayment.purposeCode);
        await _PaymentsPages.singlePaymentPage.gstPurposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.GlobesendPayment.detailsToPayeeValue);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Reject TW Globesend on View page', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Globesend Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.rejectBtn.click();
        await _PaymentsPages.singlePaymentPage.rejectReason.input("reasonForRejection");
        await _PaymentsPages.singlePaymentPage.rejectDialogButton.click();
        await _PaymentsPages.singlePaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.singlePaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.singlePaymentPage.okBtn.jsClick();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Create TW Globesend with push approval', async function () {
        await createGlobesend(true,false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.ExistingPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
    
    it('Delect TW Globesend on Submit page', async function () {
        await createGlobesend(false,false);
        await  _PaymentsPages.singlePaymentPage.deleteBtn.click();
        await _PaymentsPages.singlePaymentPage.deleteDialogBtn.click();
        await _PaymentsPages.singlePaymentPage.okBtn.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
    //Add for idxp-1324
    it('Create TW Globesend and payment ccy is CNH', async function () {
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(" ");
        await createGlobesend(false,true);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.existingCNHPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.sendAmountValue),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.purposeCodeValue).textContains(testData.GlobesendPayment.purposeCode),
        ]);
    });
    
    //Add for IDXP-1388 TW and update for IDXP-2116
    it('File Services upload TW Globesend and CCY is KWD', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.GlobesendPayment.SIT.fileName : testData.GlobesendPayment.UAT.fileName, testData.GlobesendPayment.approvalOptionByFile).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount01 : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.FSPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.GlobesendPayment.kwdCcy),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.RPPCValue).textContains(testData.GlobesendPayment.RPPC),
        ]);
    });

    //IDXP-2022
    it('File Services upload TW Globesend with UFFV2 detailed format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.GlobesendPayment.SIT.fileForGSTUFFV2 : testData.GlobesendPayment.UAT.fileForGSTUFFV2, testData.GlobesendPayment.approvalOptionByFile).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount01 : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.GlobesendPayment.FSPayee),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.amount),
            await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.GlobesendPayment.kwdCcy),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.RPPCValue).textContains(testData.GlobesendPayment.RPPC),
        ]);
    });

    it("Approve Globesend txn under My approval By file", async function () {
        let _totalItems = 0;
        let _selectFileCount = [1];
        let paymentRefList = [];
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.verifyUserId : testData.GlobesendPayment.UAT.verifyUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await ensure(_ApprovalsPages.ApprovalPage.filter).isVisible();
        await _ApprovalsPages.ApprovalPage.filter.clean();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(..._selectFileCount);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.GlobesendPayment.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await _ApprovalsPages.ApprovalPage.completeTotalItems.getText().then(async items => {
            _totalItems = parseInt(items);
        });
        await _ApprovalsPages.ApprovalPage.getApproveTransactionRef(_totalItems).then(async list => {
            paymentRefList = list;
        });
        await _ApprovalsPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
        await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
        for (let i = 0; i < paymentRefList.length; i++) {
            await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
            await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
            await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
            await Promise.all([
                await ensure(_ApprovalsPages.uploadFilePage.viewFileStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
            ]);
        }
    });

    //add for IDXP-1834 
    // check list1 when the bene country is "non-CN" 
    it('Create GST Check the Purpose Code list 1 bene country is Tailand', async function () {
        let title = "TW_gst_twd_fcy1"
        criteria.outPutFilePath = getOutPutFile('ppcList', title);
        criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.GlobesendPayment.list1);
        await deleteFile(criteria.outPutFilePath);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.ccy);
        await existingPayee();
        await load1stPPC(criteria);
        if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
            throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
        }
    });

    // check list1 when the bene country is CN
    it('Create GST Check the Purpose Code list 1 bene country is CN', async function () {
        let title = "TW_gst_twd_fcy2"
        criteria.outPutFilePath = getOutPutFile('ppcList', title);
        criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.GlobesendPayment.list1CN);
        await deleteFile(criteria.outPutFilePath);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.singlePaymentPage.exitPayment.clickIfExist();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.SIT.fromAccount01 : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.cnhCcy);
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(testData.GlobesendPayment.existingCNHPayee);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await load1stPPC(criteria);
        if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
            throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
        }  
    });

    //add for IDXP-1434
    it('Create GST with JPY and existing payee without routing code', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        newJPYPayeeName = 'JPYnewPayee' + generatedID();
        await createPayee(newJPYPayeeName,true,false);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition()
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.jpyCcy);
        //existing payee
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(newJPYPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        //Add for IDXP-2299
        await _PaymentsPages.singlePaymentPage.globeSendSelected.jsClick();
        //other field
        await _PaymentsPages.singlePaymentPage.amount.input(testData.GlobesendPayment.amount1);
        await _PaymentsPages.singlePaymentPage.scrollTo(1000, 2000);
        await _PaymentsPages.singlePaymentPage.purposeCode.select(testData.GlobesendPayment.purposeCode);
        await _PaymentsPages.singlePaymentPage.RoutingCode.input(testData.GlobesendPayment.jpyRoutingCode);
        await _PaymentsPages.singlePaymentPage.digiDocFileUploadButton.select(testData.GlobesendPayment.uploadFileName);
        await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.GlobesendPayment.paymentDetails);
        //Add for IDXP-2299
        await _PaymentsPages.singlePaymentPage.oldinformationline1.input(testData.GlobesendPayment.Information1);
        await _PaymentsPages.singlePaymentPage.oldinformationline2.input(testData.GlobesendPayment.Information2);
        await _PaymentsPages.singlePaymentPage.oldinformationline3.input(testData.GlobesendPayment.Information3);
        await _PaymentsPages.singlePaymentPage.oldinformationline4.input(testData.GlobesendPayment.Information4);
        await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.GlobesendPayment.adviceContent);
        await _PaymentsPages.singlePaymentPage.val.input(testData.GlobesendPayment.val);
        await _PaymentsPages.singlePaymentPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.singlePaymentPage.messageToOrderingBank.input(testData.GlobesendPayment.messageToOrderingBank);
        await _PaymentsPages.singlePaymentPage.reviewBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
        await _PaymentsPages.singlePaymentPage.submitBtn.click();
        await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
            reference = text.trim();
        });
        console.log(reference)
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.GlobesendPayment.jpyCcy),
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.sendAmountValue),
            await ensure(_PaymentsPages.singlePaymentPage.deductCcy).textContains(testData.GlobesendPayment.deductCcyValue),
            await ensure(_PaymentsPages.singlePaymentPage.deductAmt).isNotEmpty(),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textIs(newJPYPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.GlobesendPayment.acctNumberValue),
            await ensure(_PaymentsPages.singlePaymentPage.add1View).textContains(testData.GlobesendPayment.add1Value),
            await ensure(_PaymentsPages.singlePaymentPage.add2View).textContains(testData.GlobesendPayment.add2Value),
            await ensure(_PaymentsPages.singlePaymentPage.PaymentDateView).isNotEmpty(),
            await ensure(_PaymentsPages.singlePaymentPage.HashView).isNotEmpty(),
            await _PaymentsPages.singlePaymentPage.otherDetail.click(),
            await _PaymentsPages.singlePaymentPage.scrollTo(500, 1500),
            await ensure(_PaymentsPages.singlePaymentPage.bankNameView).textContains(SIT ? testData.GlobesendPayment.SIT.bankNameJP : testData.GlobesendPayment.UAT.bankNameJP),
            await ensure(_PaymentsPages.singlePaymentPage.bankLocationValue).textContains(testData.GlobesendPayment.countryJP),
            await ensure(_PaymentsPages.singlePaymentPage.bankSWIFTBICView).textContains(SIT ? testData.GlobesendPayment.SIT.bankIdJP : testData.GlobesendPayment.UAT.bankIdJP),
            await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.jpyRoutingCode),
            await ensure(_PaymentsPages.singlePaymentPage.paidByView).textContains(testData.GlobesendPayment.paidByVlue),
            await ensure(_PaymentsPages.singlePaymentPage.chargView).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.overseasView).textContains(testData.GlobesendPayment.overseasValue),
            await ensure(_PaymentsPages.singlePaymentPage.beneficiaryCodeView).textContains(testData.GlobesendPayment.beneficiaryCodeValue),
            await ensure(_PaymentsPages.singlePaymentPage.purposeCodeValue).textContains(testData.GlobesendPayment.purposeCode),
            await ensure(_PaymentsPages.singlePaymentPage.documentsView).textContains(testData.GlobesendPayment.uploadFileName),
            await ensure(_PaymentsPages.singlePaymentPage.paymentDetailValue).textContains(testData.GlobesendPayment.paymentDetails),
            await ensure(_PaymentsPages.singlePaymentPage.emailValue).textContains(testData.GlobesendPayment.valValue),
        ]);
    });

    it('Check payee routing code has been updated in view page', async function () {
        //check payee routing code
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(newJPYPayeeName);
        await ensure(_PaymentsPages.BeneficiaryPage.viewPageRoutingCode).textContains(testData.GlobesendPayment.jpyRoutingCode);
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        await deletePayee(newJPYPayeeName);
    });

    it('Create GST with JPY and existing payee account num more than 7 digits - Check GlobeSend will be grey out', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        newJPYPayeeName = 'JPYnewPayee' + generatedID();
        await createPayee(newJPYPayeeName,false,true);
        //user create payee require approve
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId02 : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition()
        await _PaymentsPages.singlePaymentPage.makePayment.click();
        await _PaymentsPages.singlePaymentPage.loadCondition();
        await _PaymentsPages.singlePaymentPage.fromAccount.click();
        await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount);
        await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
        await _PaymentsPages.singlePaymentPage.fromAcctCcySelected.select(testData.GlobesendPayment.jpyCcy);
        //existing payee
        await _PaymentsPages.singlePaymentPage.existingPayee.click();
        await _PaymentsPages.singlePaymentPage.existingPayeeInput.input(newJPYPayeeName);
        await _PaymentsPages.singlePaymentPage.payeeSelected.click();
        await browser.sleep(5000);
        await ensure(_PaymentsPages.singlePaymentPage.routingCodePromptMessage).textContains(testData.GlobesendPayment.routingCodePromptMessage);
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        await deletePayee(newJPYPayeeName);
    });
    
    //add for IDXP-2051 maxLength limit
    it('File Services upload TW Globesend check limit filed length', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.GlobesendPayment.SIT.loginCompanyId : testData.GlobesendPayment.UAT.loginCompanyId, SIT ? testData.GlobesendPayment.SIT.loginUserId02 : testData.GlobesendPayment.UAT.loginUserId, SIT ? 123123 : testData.GlobesendPayment.UAT.Password);
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.GlobesendPayment.SIT.LengthlimitfileName : testData.GlobesendPayment.UAT.LengthlimitfileName, testData.GlobesendPayment.approvalOptionByFile).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // Check error message
         await _FilesPages.ViewFilePage.Filter.input(fileName);
        //await _FilesPages.ViewFilePage.ShowAdditionalFilters.jsClick();
        //await _FilesPages.ViewFilePage.search.jsClick();
        //await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.uploadFilePage.Showtransactions.click();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsgAll).textContains('Max length of Additional Info Line 1 should be 30'),
            await ensure(_FilesPages.uploadFilePage.errorMsgAll).textContains('Max length of Additional Info Line 2 should be 30'),
            await ensure(_FilesPages.uploadFilePage.errorMsgAll).textContains('Max length of Additional Info Line 3 should be 30'),
            await ensure(_FilesPages.uploadFilePage.errorMsgAll).textContains('Max length of Additional Info Line 4 should be 30'),
        ]);

    });

    
    
})

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.singlePaymentPage.sendCcy).textContains(testData.GlobesendPayment.ccy),
        await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.GlobesendPayment.sendAmountValue),
        await ensure(_PaymentsPages.singlePaymentPage.deductCcy).textContains(testData.GlobesendPayment.deductCcyValue),
        await ensure(_PaymentsPages.singlePaymentPage.deductAmt).isNotEmpty(),
        await ensure(_PaymentsPages.singlePaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.beneValue).textIs(testData.GlobesendPayment.ExistingPayee),
        await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.GlobesendPayment.acctNumberValue),
        await ensure(_PaymentsPages.singlePaymentPage.add1View).textContains(testData.GlobesendPayment.add1Value),
        await ensure(_PaymentsPages.singlePaymentPage.add2View).textContains(testData.GlobesendPayment.add2Value),
        await ensure(_PaymentsPages.singlePaymentPage.PaymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.singlePaymentPage.HashView).isNotEmpty(),
        await _PaymentsPages.singlePaymentPage.otherDetail.click(),
        await _PaymentsPages.singlePaymentPage.scrollTo(500, 1500),
        await ensure(_PaymentsPages.singlePaymentPage.bankNameView).textContains(SIT ? testData.GlobesendPayment.SIT.bankNameValue : testData.GlobesendPayment.UAT.bankNameValue),
        await ensure(_PaymentsPages.singlePaymentPage.bankLocationValue).textContains(testData.GlobesendPayment.payeeLocation),
        await ensure(_PaymentsPages.singlePaymentPage.bankSWIFTBICView).textContains(SIT ? testData.GlobesendPayment.SIT.bankID : testData.GlobesendPayment.UAT.bankID),
        await ensure(_PaymentsPages.singlePaymentPage.routingCodeView).textContains(testData.GlobesendPayment.routingCode),
        await ensure(_PaymentsPages.singlePaymentPage.paidByView).textContains(testData.GlobesendPayment.paidByVlue),
        await ensure(_PaymentsPages.singlePaymentPage.chargView).textContains(SIT ? testData.GlobesendPayment.SIT.fromAccount : testData.GlobesendPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.singlePaymentPage.overseasView).textContains(testData.GlobesendPayment.overseasValue),
        await ensure(_PaymentsPages.singlePaymentPage.beneficiaryCodeView).textContains(testData.GlobesendPayment.beneficiaryCodeValue),
        await ensure(_PaymentsPages.singlePaymentPage.purposeCodeValue).textContains(testData.GlobesendPayment.purposeCode),
        await ensure(_PaymentsPages.singlePaymentPage.documentsView).textContains(testData.GlobesendPayment.uploadFileName),
        await ensure(_PaymentsPages.singlePaymentPage.purposeOfPaymentView2).textContains(testData.GlobesendPayment.detailsToPayeeValue),
        await ensure(_PaymentsPages.singlePaymentPage.paymentDetailValue).textContains(testData.GlobesendPayment.paymentDetails),
        await ensure(_PaymentsPages.singlePaymentPage.emailValue).textContains(testData.GlobesendPayment.valValue),
        await ensure(_PaymentsPages.singlePaymentPage.messageValue).textContains(testData.GlobesendPayment.messageToOrderingBank),
    ]);
}

export async function resetPayee(payee: string, routingCode: boolean, accountNum: boolean) {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.input(payee);
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await ensure(_PaymentsPages.BeneficiaryPage.centerPayeeName).textIs(payee);
    await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BeneficiaryPage.loadConditionForEditBenePage();

    if(routingCode){
        await _PaymentsPages.BeneficiaryPage.payeeRoutingCode.input('');
    }
    else if(accountNum){
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input("");
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input("123456");
    }
    await _PaymentsPages.BeneficiaryPage.next.click();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
}
export async function createPayee(payeeNameName: string, withOutRoutingCode: boolean, accountNumMoreThan7: boolean){
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.createNewPayee.jsClick();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BeneficiaryPage.loadConditionForCreateBenePage();
    await _PaymentsPages.BeneficiaryPage.selectedCountry.select(testData.GlobesendPayment.countryJP);
    await _PaymentsPages.BeneficiaryPage.newPayeeName.input(payeeNameName);
    await _PaymentsPages.BeneficiaryPage.newPayeeNickName.input(payeeNameName);
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.GlobesendPayment.payeeLocation02);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.GlobesendPayment.townCity);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd1.input(testData.GlobesendPayment.add1Value);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.GlobesendPayment.add2Value);
    await _PaymentsPages.BeneficiaryPage.newPayeeBankId.input(SIT ? testData.GlobesendPayment.SIT.bankIdJP : testData.GlobesendPayment.UAT.bankIdJP);
    await _PaymentsPages.BeneficiaryPage.bankSelect.click();
    if(accountNumMoreThan7) {
        await _PaymentsPages.BeneficiaryPage.payeeRoutingCode.input(testData.GlobesendPayment.jpyRoutingCode);
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.GlobesendPayment.acctNumberMoreThan7);
    }else if(withOutRoutingCode){
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.GlobesendPayment.acctNumberValue);
    }
    await _PaymentsPages.BeneficiaryPage.next.click();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
}
export async function deletePayee(payeeName : string) {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(payeeName);
        await _PaymentsPages.BeneficiaryPage.deletePayeeBtn.click();
        // await _PaymentsPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _PaymentsPages.BeneficiaryPage.confirmDelete.click();
        // await _PaymentsPages.BeneficiaryPage.loadConditionForDismissButton();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
}