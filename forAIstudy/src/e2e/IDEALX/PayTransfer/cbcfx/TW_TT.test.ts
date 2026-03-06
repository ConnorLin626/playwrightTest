/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../../pages/IDEALX';
import { deleteFile, load1stPPC, LoadPpcCriteria, getOutPutFile, hasSameContent, DuringOfficeHour } from './LoadPpcUtils'
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../../lib";
import * as moment from "moment";
import { browser } from 'protractor';
import { OperationsPages } from '../../../../pages/SAM';

let _PaymentsPages = new PaymentsPages();
let _OperationsPages = new OperationsPages();
let criteria = new LoadPpcCriteria();
criteria.purposeCode = _PaymentsPages.TelegraphicTransferPage.purposeCode;
criteria.subPurposeCode = _PaymentsPages.TelegraphicTransferPage.subPurposeCode;
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let testDataCB = _PaymentsPages.fetchTestData('TW_testData.json');
let day = new Date().getDay();
let reference = "";
let reference4 = "";
let refEdit = "";

describe('TW CBCFX_TT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testDataCB.TT.SIT.loginCompanyId : testDataCB.TT.UAT.loginCompanyId, SIT ? testDataCB.TT.SIT.loginUserId : testDataCB.TT.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // check list1 when the bene country is "non-TW" this case bene area is HK
    it('Check the Purpose Code list 1 bene area is HK', async function () {
        await createTT('TW_tt_obu_twd_fcy', false);
    });

    // check list1 when the bene country is "non-TW" this case bene area is HK
    it('Check the Purpose Code list 1 bene country is CN', async function () {
        await createTT('TW_tt_obu_twd_fcy', true);
    });

    // check list2
    it('Check the Purpose Code list 2', async function () {

        await createTT('TW_tt_dbu_twd_fcy_DO_Our', false);
    });

    // check list3
    it('Check the Purpose Code list 3', async function () {

        await createTT('TW_tt_dbu_twd_fcy_DO_Others', false);
    });

    // // Due to IEBAA-574, comment out this case
    //     it('Can not create TT payment in the holiday', async function () {
    //         await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
    //         // set today as holiday
    //         await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.TelegraphicTransferPage.twTTScheduleLink, day, "");
    //         await new NavigatePages().loginIdealx(SIT ? testDataCB.TT.SIT.loginCompanyId : testDataCB.TT.UAT.loginCompanyId, SIT ? testDataCB.TT.SIT.loginUserId : testDataCB.TT.UAT.loginUserId, "123123");
    //         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //         await _PaymentsPages.TransferCentersPage.loadCondition();
    //         await _PaymentsPages.AccountTransferPage.makePayment.click();
    //         await _PaymentsPages.TelegraphicTransferPage.loadCondition();
    //         await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount);
    //         await _PaymentsPages.TelegraphicTransferPage.amountCcy.select(testDataCB.TT.paymentCurrency);
    //         await _PaymentsPages.TelegraphicTransferPage.amount.input(testDataCB.TT.amount);
    //         await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
    //         await _PaymentsPages.TelegraphicTransferPage.Country.select(testDataCB.TT.Country);
    //         await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testDataCB.TT.newPayeeName);
    //         await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testDataCB.TT.newPayeeAdd1);
    //         await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testDataCB.TT.newPayeeAdd2);
    //         await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd3.input(testDataCB.TT.newPayeeAdd3);
    //         await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testDataCB.TT.SIT.payeeBankID : testDataCB.TT.UAT.payeeBankID);
    //         //due to new task#DASB-14900
    //         //await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testDataCB.TT.newPayeeRoutingCode);
    //         await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testDataCB.TT.newPayeeAcctNumber);
    //         await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testDataCB.TT.purposeCode);
    //         await _PaymentsPages.TelegraphicTransferPage.ViewFXrate.click();
    //         await _PaymentsPages.TelegraphicTransferPage.Booknow.click();
    //         await _PaymentsPages.TelegraphicTransferPage.Confirm.click();
    //         await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
    //         await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
    //         //await _PaymentsPages.TelegraphicTransferPage.loadConditionForMessageInCreatePage();
    //         await _PaymentsPages.TelegraphicTransferPage.hasUXIxErrorMsg1(testDataCB.TT.messageToCreateAfterCutOffTime).then(value => {
    //             if (!value) {
    //                 throw new Error('When try to create TW CBCFX in the holiday, the error message is wrong');
    //             }
    //         });
    //     });

    it('Can create TT payment in the office hour', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
        // set today as working date
        await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.TelegraphicTransferPage.twTTScheduleLink, day, testDataSAM.schedule.CutoffTime01);
        await new NavigatePages().loginIdealx(SIT ? testDataCB.TT.SIT.loginCompanyId : testDataCB.TT.UAT.loginCompanyId, SIT ? testDataCB.TT.SIT.loginUserId : testDataCB.TT.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amountCcy.select(testDataCB.TT.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testDataCB.TT.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testDataCB.TT.Country);
         await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testDataCB.TT.SIT.payeeBankID : testDataCB.TT.UAT.payeeBankID);
        //due to new task#DASB-14900 
        //await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testDataCB.TT.newPayeeRoutingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testDataCB.TT.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testDataCB.TT.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testDataCB.TT.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testDataCB.TT.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testDataCB.TT.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testDataCB.TT.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testDataCB.TT.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testDataCB.TT.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testDataCB.TT.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        //if (DuringOfficeHour(testDataCB.TT.cutOffTimeBegin, testDataCB.TT.cutOffTimeEnd)) {
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
                await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount),
                await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testDataCB.TT.amount),
                await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            ]);
        //}
    });

    it('Can approval TT payment in the office hour', async function () {
        //if (DuringOfficeHour(testDataCB.AccountTransfer.cutOffTimeBegin, testDataCB.AccountTransfer.cutOffTimeEnd)) {
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();   
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
            await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
            await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
            await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.jsClickIfExist();
            await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');
            await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
            await _PaymentsPages.TelegraphicTransferPage.approveButton.click();
            await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
            await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
            let currentDate = moment(new Date()).format('DD MMM YYYY');
            await Promise.all([
                await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
                await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testDataCB.status.Approved, testDataCB.status.PartialApproved, testDataCB.status.Received, testDataCB.status.PendingRelease, testDataCB.status.Completed, testDataCB.status.BankRejected),
            ]);    
    });

    //IEBAA-574_[TW] IDEAL Enhancement for FX Transactions - US1:Requirement1-1&2

    // Due to new CR of IEBAA-1443, comment out this case

    // it('US1 - Create TT that From account currency is TWD To account currency is FCY and select T+1 as payment date and book the rate', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.makePayment.click();
    //     await _PaymentsPages.TelegraphicTransferPage.loadCondition();
    //     await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount);
    //     await _PaymentsPages.TelegraphicTransferPage.amountCcy.select(testDataCB.TT.FCY);
    //     await _PaymentsPages.TelegraphicTransferPage.amount.input(testDataCB.TT.amount);
    //     await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
    //     await _PaymentsPages.TelegraphicTransferPage.Country.select(testDataCB.TT.Country);
    //     await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testDataCB.TT.newPayeeName);
    //     await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testDataCB.TT.newPayeeAdd1);
    //     await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testDataCB.TT.newPayeeAdd2);
    //     await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd3.input(testDataCB.TT.newPayeeAdd3);
    //     await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testDataCB.TT.SIT.payeeBankID : testDataCB.TT.UAT.payeeBankID);
    //     await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testDataCB.TT.newPayeeAcctNumber);
    //     await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testDataCB.TT.purposeCode);
    //     let FutureDateAdd1 = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
    //     await _PaymentsPages.TelegraphicTransferPage.paymentDate.select(FutureDateAdd1);
    //     await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
    //     //Due to DASB-25386, the message to check the created page will be commented out 
    //     //await ensure(_PaymentsPages.TelegraphicTransferPage.tipMessage).textContains(testDataCB.TT.TipMessage)
    //     await _PaymentsPages.TelegraphicTransferPage.fxContract3.jsClick();
    //     await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
    //     await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
    //     await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
    //     await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference = text;
    //     });
    //     await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    //     await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeNameValue).textContains(testDataCB.TT.newPayeeName),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testDataCB.TT.amount),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testDataCB.status.PendingApproval),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.contractRefValue).textIs(testDataCB.TT.contractRefValue),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).textIs(FutureDateAdd1),
    //     ]);
    // });

     // 由于246 环境的mock不能准确的模拟出来，暂时先注释掉
    // it('US3 - create TT from template that From account currency is TWD To account currency is FCY and select T+90 as payment date and no FX contract', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testDataCB.TT.TemplateName);
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
    //     await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
    //     let FutureDateAdd90 = moment(new Date()).add(90, 'days').format('DD MMM YYYY');
    //     let CutOffTime = '15:30 hrs ' + FutureDateAdd90
    //     await _PaymentsPages.TelegraphicTransferPage.paymentDate.select(FutureDateAdd90);
    //     await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
    //     await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
    //     await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference3 = text;
    //     });
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
    //     await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testDataCB.TT.toPayeeValue),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testDataCB.TT.amountT),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testDataCB.status.PendingApproval),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).textIs(FutureDateAdd90),
    //         await ensure(_PaymentsPages.TelegraphicTransferPage.paymentCutOffTime).textIs(CutOffTime),
    //     ]);

    // });

    // Add for IEBAA-574 US5
    it('Create TT from template with non DOL user', async function () {
        await new NavigatePages().loginIdealx(SIT ? testDataCB.TT.SIT.loginCompanyId : testDataCB.TT.UAT.loginCompanyId, SIT ? testDataCB.TT.SIT.loginUserIdNolDol : testDataCB.TT.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testDataCB.TT.templateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.IntraCompanyTransferPage.useFxCheckBox.jsClick();
        await ensure(_PaymentsPages.TelegraphicTransferPage.SellCurrencyAmount).textContains(testDataCB.TT.SellCurrencyAmountValue);
        await ensure(_PaymentsPages.TelegraphicTransferPage.BuyCurrencyAmount).textContains(testDataCB.TT.BuyCurrencyAmountValue);
        await _PaymentsPages.TelegraphicTransferPage.fxContract1.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.processButton.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testDataCB.TT.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testDataCB.TT.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testDataCB.status.PendingApproval),
        ]);
    }); 

    it('US4 - non-IDEAL DOL user initiate FCY-FCY FX transaction smaller than USD300K', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testDataCB.TT.SIT.ToAccount : testDataCB.TT.UAT.ToAccount);
        await _PaymentsPages.TelegraphicTransferPage.amountCcy.select(testDataCB.TT.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testDataCB.TT.amountM);
        await ensure(_PaymentsPages.IntraCompanyTransferPage.WarningMessage).isNotElementPresent();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testDataCB.TT.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testDataCB.TT.SIT.payeeBankID : testDataCB.TT.UAT.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testDataCB.TT.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testDataCB.TT.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testDataCB.TT.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testDataCB.TT.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testDataCB.TT.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testDataCB.TT.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testDataCB.TT.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testDataCB.TT.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testDataCB.TT.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testDataCB.TT.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testDataCB.TT.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testDataCB.TT.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testDataCB.TT.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testDataCB.TT.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testDataCB.TT.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testDataCB.TT.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testDataCB.TT.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference4 = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewPageAllField(false); //IDXP-812
    });

    it('Edit a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference4.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Telegraphic Transfer", testDataCB.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testDataCB.TT.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            refEdit = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(refEdit);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        if (reference4 == refEdit) {
            await checkViewPageAllField(true); //Add for IDXP-812
        } else {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
        ]);
        }
    });

    //Add for R8.13 ,IDXP-38
    it('Create TT from template with FX check amount deduct logic', async function () {
        await new NavigatePages().loginIdealx(SIT ? testDataCB.TT.SIT.loginCompanyId : testDataCB.TT.UAT.loginCompanyId, SIT ? testDataCB.TT.SIT.loginUserId : testDataCB.TT.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testDataCB.TT.templateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testDataCB.TT.amount1)
        await _PaymentsPages.TelegraphicTransferPage.firstfxContract.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmt).textContains(testDataCB.TT.deductAmt),
            await ensure(_PaymentsPages.TelegraphicTransferPage.AmtToDeduct).textContains(testDataCB.TT.deductAmt1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.TotalAmtDeduct).textContains(testDataCB.TT.deductAmt),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.processButton.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).textContains(testDataCB.TT.deductAmt),
            await ensure(_PaymentsPages.TelegraphicTransferPage.AmtToDeductValue).textContains(testDataCB.TT.deductAmt1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).textContains(testDataCB.TT.deductAmt),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).textContains(testDataCB.TT.deductAmt),
            await ensure(_PaymentsPages.TelegraphicTransferPage.AmtToDeductValue).textContains(testDataCB.TT.deductAmt1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).textContains(testDataCB.TT.deductAmt)
        ]);
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testDataCB.TT.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testDataCB.TT.amount1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testDataCB.status.PendingApproval,testDataCB.status.PendingVerification),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).textContains(testDataCB.TT.deductAmt),
            await ensure(_PaymentsPages.TelegraphicTransferPage.AmtToDeductValue).textContains(testDataCB.TT.deductAmt1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).textContains(testDataCB.TT.deductAmt)
        ]);
    }); 
});

export async function createTT(title: string, isCN: boolean) {

    const dataFile = 'cbcfx/' + title + '.json';
    const testData = _PaymentsPages.fetchTestData(dataFile);
    criteria.outPutFilePath = getOutPutFile('ppcList', title);
    if(isCN){
        criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.TT.list1CN);
    }else{
        criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.TT.list1);
    }
    await deleteFile(criteria.outPutFilePath);
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.TelegraphicTransferPage.loadCondition();
    await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TT.SIT.fromAccount : testData.TT.UAT.fromAccount);
    await _PaymentsPages.TelegraphicTransferPage.amountCcy.select(testData.TT.amountCcy)
    await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TT.amountA1);
    if(isCN){
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TT.existingPayeeForCN);
    }else{
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TT.existingPayee);
    }
    if (undefined !== testData.TT.outwardRemit && null !== testData.TT.outwardRemit) {
        await _PaymentsPages.TelegraphicTransferPage.outwardRemit.select(testData.TT.outwardRemit);
    }

    if (undefined !== testData.TT.payeeCode && null !== testData.TT.payeeCode) {
        await _PaymentsPages.TelegraphicTransferPage.payeeCode.select(testData.TT.payeeCode);
    }
    await _PaymentsPages.TelegraphicTransferPage.scrollTo(0, 1600);

    //check point 1-3
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.useFXCheckbox).isNotElementPresent(),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDate).isDisable(),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDate).isToday(),
        // await ensure(_PaymentsPages.TelegraphicTransferPage.cutoffTimeTip).textContains(testData.TT.cutOffTime)
    ]);
    //check point 4:
    await load1stPPC(criteria);
    if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
        throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
    }
};

export async function checkViewPageAllField(isEdit: boolean = false) {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testDataCB.status.PendingVerification),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testDataCB.TT.SIT.ToAccount : testDataCB.TT.UAT.ToAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeAcctNumValue).textContains(testDataCB.TT.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeNameValue).textContains(testDataCB.TT.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd1Value).textContains(testDataCB.TT.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd2Value).textContains(testDataCB.TT.newPayeeAdd2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testDataCB.TT.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testDataCB.TT.editAmount : testDataCB.TT.amountM), 
        //await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(testDataCB.TT.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(testDataCB.TT.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(SIT ? testDataCB.TT.SIT.payeeBankID : testDataCB.TT.UAT.payeeBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testDataCB.TT.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testDataCB.TT.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testDataCB.TT.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testDataCB.TT.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testDataCB.TT.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testDataCB.TT.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testDataCB.TT.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testDataCB.TT.bankChargeUs),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testDataCB.TT.SIT.ToAccount : testDataCB.TT.UAT.ToAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.domesticOutwardRemittance).textContains(testDataCB.TT.domesticOutwardRemittance),
        await ensure(_PaymentsPages.TelegraphicTransferPage.beneficiaryCode).textContains(testDataCB.TT.beneficiaryCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(testDataCB.TT.purposeCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testDataCB.TT.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testDataCB.TT.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty()
    ]);
};
