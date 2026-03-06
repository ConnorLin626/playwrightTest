/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ensure, SIT, TextInput, handlerCase, PROJECT_TYPE, generatedID } from '../../../lib';
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../../../pages/IDEALX';
import * as utils from '../../../lib/utils';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/SG_uploadTestData.json');
let reference1 = '';
let reference2 = '';
let reference4Save = '';
let reference4ApproveNow = '' ;
let reference4VR = '';
let verifyReference = '';
let approvalReference = '';
let nickName = '';
let txnRef = '';
let clientRefNum = '';
let customerRef = '';
let referenceEdit = '';
let reference = '';
describe('PartnerBank Payment', async function () {

    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.PartnerBank.SIT.login.loginCompanyId : testData.PartnerBank.UAT.login.loginCompanyId, SIT ? testData.PartnerBank.SIT.login.loginUserId : testData.PartnerBank.UAT.login.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create PartnerBank Payment with New Payee', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition()
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
        await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
        await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
        await _PaymentsPages.PartnerBankPaymentPage.addNewPayee(
            testData.PartnerBank.newPayeeName,
            testData.PartnerBank.newPayeePayeeId,
            testData.PartnerBank.newPayeeAcctNum
        );
        await _PaymentsPages.PartnerBankPaymentPage.amount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
        await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
        await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
        await _PaymentsPages.PartnerBankPaymentPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await checkViewOnlinePageAllField(false); //Add for IDXP-812
    });



    it('Create PartnerBank Payment with Approva Now with M-Chanllenge', async function () {

        await approveNow(testData.PartnerBank.amount, _PaymentsPages.PartnerBankPaymentPage.mChallengeText, testData.PartnerBank.mChllengeText);

    });

    it('Create PartnerBank Payment with Approva Now with P M-Chanllenge', async function () {

        await approveNow(SIT ? testData.PartnerBank.SIT.amountWithoutM : testData.PartnerBank.UAT.amountWithoutM,
            _PaymentsPages.PartnerBankPaymentPage.withoutMChallengeText, testData.PartnerBank.withoutChanllenge);

    });

    it('Save PartnerBank Payment', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition()
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
        await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
        await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
        await _PaymentsPages.PartnerBankPaymentPage.addExistingPayee(SIT ? testData.PartnerBank.SIT.existingPayeeNameIx : testData.PartnerBank.UAT.existingPayeeNameIx);
        await _PaymentsPages.PartnerBankPaymentPage.amount.input(testData.PartnerBank.amount);
        await _PaymentsPages.PartnerBankPaymentPage.saveAsDraftButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(data => {
            reference4Save = data;
            console.log(reference4Save);
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4Save);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(testData.PartnerBank.amount),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeNameView).textContains(SIT ? testData.PartnerBank.SIT.existingPayeeNameIx : testData.PartnerBank.UAT.existingPayeeNameIx),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textIs(testData.status.Saved),
        ]);
    });

    it('Copy PartnerBank Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference4Save.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4Save);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("Partner Bank Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await _PaymentsPages.PartnerBankPaymentPage.copyButton.jsClick();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
        await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
            reference2 = data;
            console.log(reference2);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(testData.PartnerBank.amount),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentDateView).isNotEmpty(),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeNameView).textContains(SIT ? testData.PartnerBank.SIT.existingPayeeNameIx : testData.PartnerBank.UAT.existingPayeeNameIx),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textIs(testData.status.PendingApproval),
        ]);
    });

    // it('Create PartnerBank Payment for Verify and Release', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition()
    //     await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
    //     await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
    //     await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
    //     await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
    //     await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
    //     await _PaymentsPages.PartnerBankPaymentPage.addNewPayee(
    //         testData.PartnerBank.newPayeeName,
    //         testData.PartnerBank.newPayeePayeeId,
    //         testData.PartnerBank.newPayeeAcctNum
    //     );
    //     await _PaymentsPages.PartnerBankPaymentPage.amount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
    //     await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
    //     await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
    //     await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
    //     await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
    //     await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
    //         verifyReference = data;
    //         console.log(reference);
    //     });
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    //     await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
    //     ]);
    // });

    it('Edit PartnerBank Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("Partner Bank Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await _PaymentsPages.PartnerBankPaymentPage.editButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.deleteIcon.click();
        await _PaymentsPages.PartnerBankPaymentPage.addNewPayee(
            testData.PartnerBank.newPayeeName,
            testData.PartnerBank.newPayeePayeeId,
            testData.PartnerBank.newPayeeAcctNum
        );
        await _PaymentsPages.PartnerBankPaymentPage.amount.input(testData.PartnerBank.editAmount);
        await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
        await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
            referenceEdit = data;
            console.log(referenceEdit);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        if (referenceEdit == reference) {
            await checkViewOnlinePageAllField(true); //Add for IDXP-812
        }
        else {
            await Promise.all([
                await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(testData.PartnerBank.editAmount),
            ]);
        }
    });


    //reject the "reference2"
    it('Reject PartnerBank Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("Partner Bank Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await _PaymentsPages.PartnerBankPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.PartnerBankPaymentPage.reason4RejectionButton.input(testData.PartnerBank.rejectResason);
        await _PaymentsPages.PartnerBankPaymentPage.rejectDialogButton.click();
        // await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
        //     reference2 = text;
        // })
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textIs(testData.status.Rejected),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.referenceValue).textIs(reference2),
        ]);
    });

    it('Delete PartnerBank Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference4Save.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4Save);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("Partner Bank Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await _PaymentsPages.PartnerBankPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.PartnerBankPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            reference2 = text;
    
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference2);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Create PartnerBank Payment for Verify and Release', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
        await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
        await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
        await _PaymentsPages.PartnerBankPaymentPage.addNewPayee(
            testData.PartnerBank.newPayeeName,
            testData.PartnerBank.newPayeePayeeId,
            testData.PartnerBank.newPayeeAcctNum
        );
        await _PaymentsPages.PartnerBankPaymentPage.amount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
        await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
        await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
        await _PaymentsPages.PartnerBankPaymentPage.getIdealxInfoReferenceID().then((data) => {
            reference2 = data;
            console.log(reference2);
        });
    });
    //Below for AB-8340
    it('Create PartnerBank Payment with Philipines and Payment Type = Payroll', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountryPHP);
        await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount);
        await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentTypePayroll);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.PartnerBankPaymentPage.newPayeeAcctNum.input(testData.PartnerBank.newPayeeAcctNum);
        await _PaymentsPages.PartnerBankPaymentPage.savePayeeBtn.jsClick();
        nickName = "nickName" + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.payeeNickName.input(nickName);
        await _PaymentsPages.PartnerBankPaymentPage.addPayeeBtn.click();
        await _PaymentsPages.PartnerBankPaymentPage.PHPamount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
        txnRef = "txnRef" + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.txnRef.input(txnRef)
        await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
        await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
        await _PaymentsPages.PaymentTemplatesPage.getIdealxInfoReferenceID().then((data) => {
            reference1 = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(utils.formatStr2Money(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentDateView).isNotEmpty(),
            //await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),

        ]);
    });

    it('Create PartnerBank Payment with Philipines and Payment Type = Auto Credit Arrangement', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountryPHP);
        await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount);
        await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentTypeCredit);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.PartnerBankPaymentPage.newPayeeAcctNum.input(testData.PartnerBank.newPayeeAcctNum);
        await _PaymentsPages.PartnerBankPaymentPage.payeeAddress.input(testData.PartnerBank.payeeAddress);
        await _PaymentsPages.PartnerBankPaymentPage.payeeZipCode.input(testData.PartnerBank.payeeZipCode);
        await _PaymentsPages.PartnerBankPaymentPage.savePayeeBtn.jsClick();
        nickName = "nickName" + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.payeeNickName.input(nickName);
        await _PaymentsPages.PartnerBankPaymentPage.addPayeeBtn.click();
        await _PaymentsPages.PartnerBankPaymentPage.PHPamount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
        clientRefNum = "clientRefNum" + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.clientRefNum.input(clientRefNum)
        txnRef = "txnRef" + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.txnRef.input(txnRef)
        customerRef = 'customerRef' + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.customerRef.input(customerRef)
        await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
        await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
            reference1 = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(customerRef);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(utils.formatStr2Money(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentDateView).isNotEmpty(),
            //await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });

    it('Create PartnerBank Payment with Philipines and Payment Type = High Value Payment - RTGS', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
        await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountryPHP);
        await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount);
        await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentTypeHVT);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeTab.click();
        await _PaymentsPages.PartnerBankPaymentPage.newPayeeName.input(testData.PartnerBank.newPayeeName);
        await _PaymentsPages.PartnerBankPaymentPage.payeeNickName.input(testData.PartnerBank.newPayeeNickname);
        await _PaymentsPages.PartnerBankPaymentPage.payeeBankID.input("ANZB01")
        await _PaymentsPages.PartnerBankPaymentPage.payeeBankResult.jsClick();
        await _PaymentsPages.PartnerBankPaymentPage.newPayeeAcctNum.input(testData.PartnerBank.newPayeeAcctNum);
        await _PaymentsPages.PartnerBankPaymentPage.savePayeeBtn.jsClick();
        nickName = "nickName" + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.payeeNickName.input(nickName);
        await _PaymentsPages.PartnerBankPaymentPage.addPayeeBtn.click();
        await _PaymentsPages.PartnerBankPaymentPage.PHPamount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
        await _PaymentsPages.PartnerBankPaymentPage.PurposeCode.select(SIT ? testData.PartnerBank.SIT.purposeCodeValue : testData.PartnerBank.UAT.purposeCodeValue);
        txnRef = "txnRef" + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.txnRef.input(txnRef)
        await _PaymentsPages.PartnerBankPaymentPage.showOption.jsClickIfExist();
        await _PaymentsPages.PartnerBankPaymentPage.beneRef.input("123123");
        await _PaymentsPages.PartnerBankPaymentPage.bankInfo.input("123123");
        await _PaymentsPages.PartnerBankPaymentPage.payeeAddress1.input("address1")
        customerRef = 'customerRef' + generatedID();
        await _PaymentsPages.PartnerBankPaymentPage.customerRef.input(customerRef)
        await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
        await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
            reference1 = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(customerRef);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(utils.formatStr2Money(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentDateView).isNotEmpty(),
            //await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });

    it('Upload Partner Bank Payment_SCB_MCL_UFF', async function () {
        let fileName: string = null;
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.PartnerBank.SIT.fileNameForSCBMCL : testData.PartnerBank.UAT.fileNameForSCBMCL, "By transaction amount").then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();

        await checkViewPageAllField();// IDXP-812
    });
});


describe('Verify&Release Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.PartnerBank.SIT.login.loginCompanyId : testData.PartnerBank.UAT.login.loginCompanyId, SIT ? testData.PartnerBank.SIT.login.verifyUserId : testData.PartnerBank.UAT.login.verifyUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify PartnerBank Payment', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference2, "Partner Bank Payment").then(reference => {
            verifyReference = reference;
        });;


        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textIs(testData.status.PendingApproval),
        ]);
    });

    //approve the "reference"
    it('Approve PartnerBank Payment', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        console.log("partnerBankVerify:"+verifyReference);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Partner Bank Payment', testData.status.PendingApproval);
        }
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await _PaymentsPages.PartnerBankPaymentPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.CrossBorder.responseCode);
        await _PaymentsPages.PartnerBankPaymentPage.approveButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        console.log("partnerBankApprovalRef:"+approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });


    it('Release PartnerBank Payment', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'Partner Bank Payment').then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

});


//for ApproveNow M-Challenge and ApproveNow without M-Challenge, they decided by amount
async function approveNow(amount: string, challengeEle: TextInput, challengeText: string): Promise<void> {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition()
    await _PaymentsPages.PartnerBankPaymentPage.partnerBankMenu.click();
    await _PaymentsPages.PartnerBankPaymentPage.loadCondition();
    await _PaymentsPages.PartnerBankPaymentPage.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
    await _PaymentsPages.PartnerBankPaymentPage.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
    await _PaymentsPages.PartnerBankPaymentPage.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
    await _PaymentsPages.PartnerBankPaymentPage.addExistingPayee(SIT ? testData.PartnerBank.SIT.existingPayeeNameIx : testData.PartnerBank.UAT.existingPayeeNameIx);
    await _PaymentsPages.PartnerBankPaymentPage.amount.input(amount);
    await _PaymentsPages.PartnerBankPaymentPage.nextButton.click();
    await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Preview();
    await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
    await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _PaymentsPages.PartnerBankPaymentPage.submitButton.click();
    await _PaymentsPages.PartnerBankPaymentPage.loadCondition4Submitted();
    await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
        reference4ApproveNow = data;
        console.log(reference4ApproveNow);
    });
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4ApproveNow);
    await _PaymentsPages.PartnerBankPaymentPage.loadCondition4View();
    await Promise.all([
        await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
}

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.PartnerBankPaymentPage.hashValueView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.fromAccountView).textContains(SIT ?uploadTestData.ptnbnk.fromAccount:uploadTestData.ptnbnk.UAT.fromAccount),
        //await ensure(_PaymentsPages.PartnerBankPaymentPage.balanceView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.acctNameView).textContains(SIT ?uploadTestData.ptnbnk.acctNameView : uploadTestData.ptnbnk.UAT.acctNameView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(uploadTestData.ptnbnk.amountValue),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentTypeView).textContains(uploadTestData.ptnbnk.paymentTypeView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.bankChargeTypeView).textContains(uploadTestData.ptnbnk.bankChargeTypeView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.chargeAcct).textContains(SIT? uploadTestData.ptnbnk.chargeAcct : uploadTestData.ptnbnk.UAT.chargeAcct),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.customerRefView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.internalRefView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContains(uploadTestData.status.PendingApproval),
        // Payee1
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeNameView).textContains(uploadTestData.ptnbnk.payeeNameView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeBankNameView).textContains(uploadTestData.ptnbnk.payeeBankNameView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeSwiftBicView).textContains(uploadTestData.ptnbnk.payeeSwiftBicView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeAcctNumView).textContains(uploadTestData.ptnbnk.payeeAcctNumView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeAmtView).textContains(uploadTestData.ptnbnk.payeeAmtView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeServiseTypeiew).textContains(uploadTestData.ptnbnk.payeeServiseTypeiew),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeTransRefView).textContains(uploadTestData.ptnbnk.payeeTransRefView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeePrintInvoiceView).textContains(uploadTestData.ptnbnk.payeePrintInvoiceView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeePrintCreditAdviceView).textContains(uploadTestData.ptnbnk.payeePrintCreditAdviceView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeDeliveryModeView).textContains(uploadTestData.ptnbnk.payeeDeliveryModeView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeBeneNotFicaView).textContains(uploadTestData.ptnbnk.payeeBeneNotFicaView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeBenNotFicaKeyView).textContains(uploadTestData.ptnbnk.payeeBenNotFicaKeyView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeRemarkView).textContains(uploadTestData.ptnbnk.payeeRemarkView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeMedCleCycleView).textContains(uploadTestData.ptnbnk.payeeMedCleCycleView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeWhtAmtView).textContains(uploadTestData.ptnbnk.payeeWhtAmtView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeInvoiceNumView).textContains(uploadTestData.ptnbnk.payeeInvoiceNumView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeInvocieAmtView).textContains(uploadTestData.ptnbnk.payeeInvocieAmtView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeInvoiceDateView).textContains(uploadTestData.ptnbnk.payeeInvoiceDateView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeInvoiceDesView).textContains(uploadTestData.ptnbnk.payeeInvoiceDesView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeePoNumView).textContains(uploadTestData.ptnbnk.payeePoNumView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeVatAmtView).textContains(uploadTestData.ptnbnk.payeeVatAmtView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeChargeAmtView).textContains(uploadTestData.ptnbnk.payeeChargeAmtView),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeePriLanguageView).textContains(uploadTestData.ptnbnk.payeePriLanguageView)
    ]);
}

export async function checkViewOnlinePageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.PartnerBankPaymentPage.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.amountView).textContains(utils.formatStr2Money(isEdit ? testData.PartnerBank.editAmount : SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        // Add all field  
        await ensure(_PaymentsPages.PartnerBankPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.acctNameValue).textContains(SIT? testData.PartnerBank.SIT.payerAcctNameName : testData.PartnerBank.UAT.payerAcctNameName),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentType).textContains(testData.PartnerBank.ptnBnkPaymentType),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.bankCharge).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.chargeAccountValue).textContains(SIT? testData.PartnerBank.SIT.chargeAccount : testData.PartnerBank.UAT.chargeAccount),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.paymentSummaryValue).textContains(isEdit ? testData.PartnerBank.editTotal : testData.PartnerBank.totalAmount),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeNickNameView).textContains(testData.PartnerBank.newPayeeNickname),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeAmtView).textContains(utils.formatStr2Money(isEdit ? testData.PartnerBank.editAmount : SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeAcctNumView).textContains(testData.PartnerBank.newPayeeAcctNum),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeIDView).textContains(testData.PartnerBank.newPayeePayeeId),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.pendingStatusView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.payeeTransRefView).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.PartnerBankPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}