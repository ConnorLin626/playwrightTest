/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../../pages/IDEALX';
import { OperationsPages } from '../../../../pages/SAM';
import { deleteFile, getOutPutFile, hasSameContent, load1stPPC, LoadPpcCriteria, DuringOfficeHour } from "./LoadPpcUtils";
import { ensure, SIT, handlerCase, PROJECT_TYPE} from "../../../../lib";
import * as moment from "moment";
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let _OperationsPages = new OperationsPages();
let criteria = new LoadPpcCriteria();
let day = new Date().getDay();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

let reference = "";
let reference1 = "";
let reference4 = "";
let reference5 = "";

criteria.purposeCode = _PaymentsPages.IntraCompanyTransferPage.purposeCode;
criteria.subPurposeCode = _PaymentsPages.IntraCompanyTransferPage.subPurposeCode;

//1.while set file name = TW_ict_obu_twd_fcy
//2.Generated Purpose code list will be 'src/e2e/CB/Payment/cbcfx/ppcList/TW_ict_obu_twd_fcy.lst'

describe('TW CBCFX ICT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.ICT.SIT.loginCompanyId : testData.ICT.UAT.loginCompanyId, SIT ? testData.ICT.SIT.loginUserId : testData.ICT.UAT.loginUserId, "123123");});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // Due to IEBAA-574, comment out this case
    // it('Can not create ICT payment in the holiday', async function () {
    //     await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
    //     // set today as holiday
    //     await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.IntraCompanyTransferPage.ictScheduleLink, day, "");
    //     await new NavigatePages().loginIdealx(SIT ? testDataCB.ICT.SIT.loginCompanyId : testDataCB.ICT.UAT.loginCompanyId, SIT ? testDataCB.ICT.SIT.loginUserId : testDataCB.ICT.UAT.loginUserId, "123123");
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
    //     await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testDataCB.ICT.SIT.fromAccount : testDataCB.ICT.UAT.fromAccount);
    //     await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testDataCB.ICT.SIT.toAccount : testDataCB.ICT.UAT.toAccount);
    //     await _PaymentsPages.IntraCompanyTransferPage.amount.input(testDataCB.ICT.amount);
    //     await _PaymentsPages.IntraCompanyTransferPage.purposeCode.select(testDataCB.ICT.purposeCode);
    //     await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testDataCB.ICT.subPurposeCode);
    //     await _PaymentsPages.IntraCompanyTransferPage.ViewFXrate.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.Booknow.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.Confirm.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
    //     //await _PaymentsPages.IntraCompanyTransferPage.loadConditionForMessageInCreatePage();
    //     await _PaymentsPages.IntraCompanyTransferPage.hasUXIxErrorMsg1(testDataCB.ICT.messageToCreateAfterCutOffTime).then(value => {
    //         if (!value) {
    //             throw new Error('When try to create TW CBCFX in the holiday, the error message is wrong');
    //         }
    //     });
    // });

    // Due to IEBAA-574, comment out this case
    // it('Can not approval ICT payment after cut off time', async function () {
    //     if (!DuringOfficeHour(testDataCB.ICT.cutOffTimeBegin, testDataCB.ICT.cutOffTimeEnd)) {
    //         if (0 !== reference.trim().length) {
    //             await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //             await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    //             await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
    //             await _PaymentsPages.IntraCompanyTransferPage.scrollToBottom();
    //             await _PaymentsPages.IntraCompanyTransferPage.approveButton.click();
    //             await _PaymentsPages.IntraCompanyTransferPage.getChallenge.jsClickIfExist();
    //             await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123123');
    //             await _PaymentsPages.IntraCompanyTransferPage.approveButton.click();
    //             await _PaymentsPages.IntraCompanyTransferPage.loadConditionForMessageInApprovalPage();
    //             await _PaymentsPages.IntraCompanyTransferPage.hasUXIxErrorMsg(testDataCB.ICT.messageToApprovalAfterCutOffTime).then(value => {
    //                 if (!value) {
    //                     throw new Error('When try to approval TW CBCFX after cut off time, the error message is wrong');
    //                 }
    //             });
    //         }
    //     }
    // });

    it('Can create ICT payment in the office hour', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
        // set today is not a holiday
        await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.IntraCompanyTransferPage.ictScheduleLink, day, testDataSAM.schedule.CutoffTime01);
        await new NavigatePages().loginIdealx(SIT ? testData.ICT.SIT.loginCompanyId : testData.ICT.UAT.loginCompanyId, SIT ? testData.ICT.SIT.loginUserId : testData.ICT.UAT.loginUserId, "123123");
        await createICT('TW_ict_dbu_twd_fcy');
    });

    it('Can approval ICT payment in the office hour', async function () {
        //if (DuringOfficeHour(testDataCB.ICT.cutOffTimeBegin, testDataCB.ICT.cutOffTimeEnd)) {
            //if (0 !== reference.trim().length) {
                await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
                await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
                await _PaymentsPages.IntraCompanyTransferPage.approveButton.jsClick();
                await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
                await _PaymentsPages.IntraCompanyTransferPage.getChallenge.click();
                await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123123');
                await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
                await _PaymentsPages.IntraCompanyTransferPage.approveButton.jsClick();
                await _PaymentsPages.IntraCompanyTransferPage.dismissButton.jsClick();
                await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
                await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
                let currentDate = moment(new Date()).format('DD MMM YYYY');
                await Promise.all([
                    await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).isNotEmpty(),
                    await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
                ]);
            //}
        //}
    });

    //IEBAA-574_[TW] IDEAL Enhancement for FX Transactions

    it('US1 - Create ICT that From account currency is TWD To account currency is FCY and select T+1 as payment date and book the rate', async function () {
        let today = new Date();
        let dayOfWeek = today.getDay();
        ///await new NavigatePages().loginIdealx(SIT ? testDataCB.ICT.SIT.loginCompanyId : testDataCB.ICT.UAT.loginCompanyId, SIT ? testDataCB.ICT.SIT.loginUserId : testDataCB.ICT.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICT.amount);
        let FutureDateAdd1 = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        await _PaymentsPages.IntraCompanyTransferPage.paymentDate.select(FutureDateAdd1);
        await _PaymentsPages.IntraCompanyTransferPage.purposeCode.select(testData.ICT.purposeCode);
        await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testData.ICT.subPurposeCode);
        //Due to DASB-25386, the message to check the created page will be commented out 
        //await ensure(_PaymentsPages.IntraCompanyTransferPage.tipMessage).textContains(testData.ICT.TipMessage)
        await _PaymentsPages.IntraCompanyTransferPage.fxContract3.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.processButton.jsClickIfExist();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
        });
        console.log(reference1)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.ICT.amount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval)
        ]);
        //due to simulator paymentdate will skip weekend
        if(dayOfWeek >= 0 && dayOfWeek <= 4  ){
            await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).textIs(FutureDateAdd1);
            await ensure(_PaymentsPages.IntraCompanyTransferPage.contractRefValue).textIs(testData.ICT.contractRefValue)
        }else if(dayOfWeek == 5 ){
            FutureDateAdd1 = moment(new Date()).add(3, 'days').format('DD MMM YYYY');
            await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).textIs(FutureDateAdd1);
            await ensure(_PaymentsPages.IntraCompanyTransferPage.contractRefValue).textIs('Standard rate')
        }else if(dayOfWeek == 6){
            FutureDateAdd1 = moment(new Date()).add(2, 'days').format('DD MMM YYYY');
            await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).textIs(FutureDateAdd1);
            await ensure(_PaymentsPages.IntraCompanyTransferPage.contractRefValue).textIs('Standard rate')
        };
    });

    // 由于246 环境的mock不能准确的模拟出来，暂时先注释掉

    // it('US3 - Create ICT that From account currency is TWD To account currency is FCY and select T+90 as payment date and no FX contract', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
    //     await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testDataCB.ICT.SIT.fromAccount : testDataCB.ICT.UAT.fromAccount);
    //     await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testDataCB.ICT.SIT.ToAccount : testDataCB.ICT.UAT.ToAccount);
    //     await _PaymentsPages.IntraCompanyTransferPage.amount.input(testDataCB.ICT.amount);
    //     let FutureDateAdd90 = moment(new Date()).add(90, 'days').format('DD MMM YYYY');
    //     let CutOffTime = '15:30 hrs ' + FutureDateAdd90
    //     await _PaymentsPages.IntraCompanyTransferPage.paymentDate.select(FutureDateAdd90);
    //     await _PaymentsPages.IntraCompanyTransferPage.purposeCode.select(testDataCB.ICT.purposeCode);
    //     await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testDataCB.ICT.subPurposeCode);
    //     await ensure(_PaymentsPages.IntraCompanyTransferPage.FXcontract).isNotElementPresent();
    //     await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
    //     await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference2 = text;
    //     });
    //     console.log(reference2)
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testDataCB.ICT.SIT.fromAccount : testDataCB.ICT.UAT.fromAccount),
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testDataCB.ICT.SIT.ToAccount : testDataCB.ICT.UAT.ToAccount),
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testDataCB.ICT.amount),
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testDataCB.status.PendingApproval),
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).textIs(FutureDateAdd90),
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.cutoffTimeView).textIs(CutOffTime),

    //     ]);
    // });
    it('US5 FX amount discrepancy requirement - DOL user create ICT', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.ICT.SIT.loginCompanyId : testData.ICT.UAT.loginCompanyId, SIT ? testData.ICT.SIT.loginUserId : testData.ICT.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICT.amount);
        await _PaymentsPages.IntraCompanyTransferPage.purposeCode.select(testData.ICT.purposeCode);
        await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testData.ICT.subPurposeCode);
        await ensure(_PaymentsPages.IntraCompanyTransferPage.SellCurrencyAmount).textIs(testData.ICT.SellCurrencyAmountValue);
        await ensure(_PaymentsPages.IntraCompanyTransferPage.BuyCurrencyAmount).textIs(testData.ICT.BuyCurrencyAmountValue);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference5 = text;
        });
        console.log(reference5)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference5);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.ICT.amount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),

        ]);
    });

    it('US5 FX amount discrepancy requirement - Non DOL user Copy ICT', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.ICT.SIT.loginCompanyId : testData.ICT.UAT.loginCompanyId, SIT ? testData.ICT.SIT.loginUserNonDol : testData.ICT.UAT.loginUserNonDol, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference5);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.copyButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForCopy();
        if (await _PaymentsPages.IntraCompanyTransferPage.useFxCheckBox.isElementPresent()) {
            await _PaymentsPages.IntraCompanyTransferPage.useFxCheckBox.jsClick();
        }
        await ensure(_PaymentsPages.IntraCompanyTransferPage.NonSellCurrencyAmount).textIs(testData.ICT.SellCurrencyAmountValue);
        await ensure(_PaymentsPages.IntraCompanyTransferPage.NonBuyCurrencyAmount).textIs(testData.ICT.BuyCurrencyAmountValue);
        await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testData.ICT.subPurposeCode);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.ICT.amount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),

        ]);
    });

    it('US4 - When non-IDEAL DOL user initiate FCY-FCY FX transaction bigger than USD300K', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.ICT.SIT.loginCompanyId : testData.ICT.UAT.loginCompanyId, SIT ? testData.ICT.SIT.loginUserNonDol : testData.ICT.UAT.loginUserNonDol, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICT.SIT.toAccount : testData.ICT.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICT.amountM);
        await _PaymentsPages.IntraCompanyTransferPage.purposeCode.select(testData.ICT.purposeCode2);
        //await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testDataCB.ICT.subPurposeCode);
        await ensure(_PaymentsPages.IntraCompanyTransferPage.WarningMessage).textIs(testData.ICT.US4Message);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference4 = text;
        });
        console.log(reference4)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.ICT.SIT.toAccount : testData.ICT.UAT.toAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.ICT.amountM),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingVerification),

        ]);
    });

     // Add for R8.13 ,IDXP-38
     it('Create ICT with FX check amount deduct logic', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.ICT.SIT.loginCompanyId : testData.ICT.UAT.loginCompanyId, SIT ? testData.ICT.SIT.loginUserId : testData.ICT.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICT.amount1);
        await _PaymentsPages.IntraCompanyTransferPage.purposeCode.select(testData.ICT.purposeCode);
        await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testData.ICT.subPurposeCode1);
        await _PaymentsPages.IntraCompanyTransferPage.firstfxContract.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmt).textContains(testData.ICT.deductAmt),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.AmtToDeduct).textContains(testData.ICT.deductAmt),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.TotalAmtDeduct).textContains(testData.ICT.deductAmt),
        ]);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.processButton.jsClickIfExist();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(testData.ICT.deductAmt),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.AmtToDeductValue).textContains(testData.ICT.deductAmt1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValue).textContains(testData.ICT.deductAmt),
        ]);
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(testData.ICT.deductAmt),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.AmtToDeductValue).textContains(testData.ICT.deductAmt1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValue).textContains(testData.ICT.deductAmt),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.ICT.amount1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.PendingVerification,testData.status.PendingApproval),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.purposeCodeValue).textContains(testData.ICT.purposeCode),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(testData.ICT.deductAmt),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.AmtToDeductValue).textContains(testData.ICT.deductAmt1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValue).textContains(testData.ICT.deductAmt),
        ]);
    });


   // Add for R8.13 ,IDXP-38
    it('Copy ICT with non DOL User check amount deduct logic', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.ICT.SIT.loginCompanyId : testData.ICT.UAT.loginCompanyId, SIT ? testData.ICT.SIT.loginUserNonDol : testData.ICT.UAT.loginUserNonDol, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.copyButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForCopy();
        await _PaymentsPages.IntraCompanyTransferPage.amount.clean();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICT.amount2);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSummarySection();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmt).textContains(testData.ICT.deductAmt2),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.TotalAmtDeductFoNonDol).textContains(testData.ICT.deductAmt2)
        ]);
        await _PaymentsPages.IntraCompanyTransferPage.subPurposeCode.select(testData.ICT.subPurposeCode1);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.processButton.jsClickIfExist();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(testData.ICT.deductAmt2),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amtToUseValueNonDol).textContains(testData.ICT.amount2),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValueNonDol).textContains(testData.ICT.deductAmt2)
        ]);
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
        });
        console.log(reference1)
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(testData.ICT.deductAmt2),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amtToUseValueNonDol).textContains(testData.ICT.amount2),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValueNonDol).textContains(testData.ICT.deductAmt2)
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.ICT.SIT.ToAccount : testData.ICT.UAT.ToAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.PendingVerification,testData.status.PendingApproval),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.purposeCodeValue).textContains(testData.ICT.purposeCode),
            // view page value display not same as Submit page wait check
            // await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(testDataCB.ICT.deductAmt2),
            // await ensure(_PaymentsPages.IntraCompanyTransferPage.amtToUseValueNonDol).textContains(testDataCB.ICT.amount2),
            // await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValueNonDol).textContains(testDataCB.ICT.deductAmt2)
        ]);
    });
});

export async function createICT(title: string) {
    criteria.outPutFilePath = getOutPutFile('ppcList', title);
    criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.ICT.purposeCodeList4);
    await deleteFile(criteria.outPutFilePath);
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
    await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
    await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.ICT.SIT.fromAccount : testData.ICT.UAT.fromAccount);
    await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICT.SIT.toAccount : testData.ICT.UAT.toAccount);
    await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICT.amount);
    await Promise.all([
        await ensure(_PaymentsPages.IntraCompanyTransferPage.useFxCheckBox).isNotElementPresent(),
        // await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDate).isToday(),
        // await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDate).isDisable(),
        // await ensure(_PaymentsPages.IntraCompanyTransferPage.cutoffTimeTip).textContains(testData.IntraCompanyTransfer.cutoffTime),
    ]);

    //check point 4:
    await load1stPPC(criteria);
    if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
        throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
    }
    //if (DuringOfficeHour(testDataCB.ICT.cutOffTimeBegin, testDataCB.ICT.cutOffTimeEnd)) {
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
    //}
};
