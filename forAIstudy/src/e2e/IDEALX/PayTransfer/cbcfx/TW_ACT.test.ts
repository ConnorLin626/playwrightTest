/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { deleteFile, getOutPutFile, hasSameContent, load1stPPC, LoadPpcCriteria, DuringOfficeHour } from "./LoadPpcUtils"
import { PaymentsPages, NavigatePages } from "../../../../pages/IDEALX";
import { OperationsPages } from '../../../../pages/SAM';
import { ensure, SIT, handlerCase, PROJECT_TYPE, generatedID } from "../../../../lib";
import { browser } from "protractor";
import * as moment from "moment";


let _PaymentsPages = new PaymentsPages();
let _OperationsPages = new OperationsPages();
let criteria = new LoadPpcCriteria();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let day = new Date().getDay();
let reference = '';
let reference3 = '';
let reference5 = '';
let templateName='';
let nickName='';

criteria.purposeCode = _PaymentsPages.AccountTransferPage.purposeCode;
criteria.subPurposeCode = _PaymentsPages.AccountTransferPage.subPurposeCode;

describe('TW CBCFX_Account Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // OO
    it('Create an ACT Payment from Template', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AccountTransfer.TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AccountTransferPage.loadConditionCreatePaymentTemplate();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.useFxCheckBox).isNotElementPresent(),
            // await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isDisable(),
            // await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isToday(),
            // await ensure(_PaymentsPages.AccountTransferPage.cutoffTimeTip).textContains(testData.AccountTransfer.cutOffTime)
        ]);

        criteria.outPutFilePath = getOutPutFile('ppcList', 'TW_act_list1_buy');
        criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.AccountTransfer.list1);
        await deleteFile(criteria.outPutFilePath);
        await load1stPPC(criteria);
        if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
            throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
        }
        if (DuringOfficeHour(testData.AccountTransfer.cutOffTimeBegin, testData.AccountTransfer.cutOffTimeEnd)) {
            await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
            await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
            await _PaymentsPages.AccountTransferPage.nextButton.click();
            await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
            await _PaymentsPages.AccountTransferPage.submitButton.click();
            await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
            await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
                reference = text;
            });
        }
    });

    // DO
    it('Edit an ACT via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (reference !== '') {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
            await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
            await _PaymentsPages.AccountTransferPage.editButton.click();
            await _PaymentsPages.AccountTransferPage.loadCondition();
            await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
            await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);

            await Promise.all([
                await ensure(_PaymentsPages.AccountTransferPage.useFxCheckBox).isNotElementPresent(),
                // await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isDisable(),
                // await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isToday(),
                // await ensure(_PaymentsPages.AccountTransferPage.cutoffTimeTip).textContains(testData.AccountTransfer.cutOffTime)
            ]);

            criteria.outPutFilePath = getOutPutFile('ppcList', 'TW_act_list5_buy');
            criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.AccountTransfer.list5)
            await deleteFile(criteria.outPutFilePath);
            await load1stPPC(criteria);
            if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
                throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
            }
        }
    });

    // // Due to IEBAA-574, comment out this case
    //     it('Can not create ACT payment in the holiday', async function () {
    //         await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
    //         // set today as holiday
    //         await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.AccountTransferPage.twACTScheduleLink, day, "");
    //         await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");
    //         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //         await _PaymentsPages.TransferCentersPage.loadCondition();
    //         await _PaymentsPages.AccountTransferPage.makePayment.click();
    //         await _PaymentsPages.AccountTransferPage.loadCondition();
    //         await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
    //         await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.paymentCurrency);
    //         await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
    //         await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
    //         await _PaymentsPages.AccountTransferPage.newPayeeCountry.select(testData.AccountTransfer.Country);
    //         await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank TAIWAN');
    //         await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
    //         await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
    //         await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
    //         await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
    //         await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
    //         await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);
    //         await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
    //         await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
    //         await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
    //         await _PaymentsPages.AccountTransferPage.ViewFXrate.click();
    //         await _PaymentsPages.AccountTransferPage.Booknow.click();
    //         await _PaymentsPages.AccountTransferPage.Confirm.click();
    //         await _PaymentsPages.AccountTransferPage.nextButton.click();
    //         await _PaymentsPages.AccountTransferPage.hasUXIxErrorMsg1(testData.AccountTransfer.messageToCreateAfterCutOffTime).then(value => {
    //             if (!value) {
    //                 throw new Error('When try to create TW CBCFX in the holiday, the error message is wrong');
    //             }
    //         });
    //     });

    // Due to IEBAA-574, comment out this case

    // it('Can not approval ACT payment after cut off time', async function () {
    //     if (!DuringOfficeHour(testData.AccountTransfer.cutOffTimeBegin, testData.AccountTransfer.cutOffTimeEnd)) {
    //         if (0 !== reference.trim().length) {
    //             await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //             await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    //             await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
    //             await _PaymentsPages.AccountTransferPage.scrollToBottom();
    //             await _PaymentsPages.AccountTransferPage.approveButton.click();
    //             await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    //             await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    //             await _PaymentsPages.AccountTransferPage.approveButton.click();
    //             await _PaymentsPages.AccountTransferPage.hasUXIxErrorMsg(testData.AccountTransfer.messageToCreateAfterCutOffTime).then(value => {
    //                 if (!value) {
    //                     throw new Error('When try to approval TW CBCFX after cut off time, the error message is wrong');
    //                 }
    //             });
    //         }
    //     }
    // });

    it('Can create ACT payment in the office hour', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
        // set today as holiday
        await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.AccountTransferPage.twACTScheduleLink, day, testDataSAM.schedule.CutoffTime01);
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");
        await createACT();
    });

    it('Can approval ACT payment in the office hour', async function () {
       // if (DuringOfficeHour(testData.AccountTransfer.cutOffTimeBegin, testData.AccountTransfer.cutOffTimeEnd)) {
            //if (0 !== reference.trim().length) {
                await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
                await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
                await _PaymentsPages.AccountTransferPage.scrollToBottom();
                await _PaymentsPages.AccountTransferPage.approveButton.click();
                await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
                await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
                await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
                await _PaymentsPages.AccountTransferPage.approveButton.click();
                await _PaymentsPages.AccountTransferPage.dismissButton.click();
                await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
                await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
                let currentDate = moment(new Date()).format('DD MMM YYYY');
                await Promise.all([
                    await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
                    await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
                ]);
            //}
        //}
    });

    //IEBAA-574_[TW] IDEAL Enhancement for FX Transactions

    // Due to new CR of IEBAA-1443, comment out this case

    // it('US1 - Copy ACT that From account currency is FCY To account currency is TWD and select T+2 as payment date and book the rate', async function () {
    //     //await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.makePayment.click();
    //     await _PaymentsPages.AccountTransferPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount);
    //     await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.TWD);
    //     await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
    //     await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
    //     //await _PaymentsPages.AccountTransferPage.newPayeeCountry.select(testData.AccountTransfer.Country);
    //     await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank TAIWAN');
    //     await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
    //     await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
    //     await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
    //     await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
    //     await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
    //     await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);
    //     await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
    //     await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
    //     await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
    //     await _PaymentsPages.AccountTransferPage.nextButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    //     await _PaymentsPages.AccountTransferPage.submitButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference1 = text;
    //     });
    //     console.log(reference1)
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
    //     await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount),
    //         await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
    //         await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount),
    //         await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),

    //     ]);
    //     await _PaymentsPages.AccountTransferPage.copyButton.click();
    //     let FutureDateAdd2 = moment(new Date()).add(2, 'days').format('DD MMM YYYY');
    //     await _PaymentsPages.AccountTransferPage.scrollTo(1000, 1500)
    //     await _PaymentsPages.AccountTransferPage.paymentDate.select(FutureDateAdd2);
    //     await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
    //     //Due to DASB-25386, the message to check the created page will be commented out 
    //     //await ensure(_PaymentsPages.AccountTransferPage.tipMessage).textContains(testData.AccountTransfer.TipMessage)
    //     await _PaymentsPages.AccountTransferPage.fxContract4.jsClick();
    //     await _PaymentsPages.AccountTransferPage.nextButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    //     await _PaymentsPages.AccountTransferPage.submitButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference = text;
    //     });
    //     console.log(reference)
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    //     await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount),
    //         await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
    //         await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount),
    //         await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
    //         await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).textIs(FutureDateAdd2),
    //         await ensure(_PaymentsPages.AccountTransferPage.contractRefValue).textIs(testData.AccountTransfer.contractRefValue)

    //     ]);
    // });

    it('US3 - Approve ACT that From account currency is FCY To account currency is TWD and select T+90 as payment date and no FX contract', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.TWD);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        //await _PaymentsPages.AccountTransferPage.newPayeeCountry.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank TAIWAN');
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);

        let FutureDateAdd90 = moment(new Date()).add(90, 'days').format('DD MMM YYYY');
        await _PaymentsPages.AccountTransferPage.paymentDate.select(FutureDateAdd90);
        await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);
        await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
        await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
        await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        console.log(reference3)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.pushOption.clickIfExist();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received,testData.status.Completed),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('US5 - DOL user create ACT via Make a payment', async function () {
        //await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.TWD);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
        await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);
        await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
        await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
        await ensure(_PaymentsPages.AccountTransferPage.SellCurrencyAmount).textIs(testData.AccountTransfer.SellCurrencyAmountValue);
        await ensure(_PaymentsPages.AccountTransferPage.BuyCurrencyAmount).textIs(testData.AccountTransfer.BuyCurrencyAmountValue);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference5 = text;
        });
        console.log(reference5)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference5);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });
    //Add for R8.12 IDXP-389
    it('Create ACT template with new Add List 4-1 purpose code', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateTWButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName="TWACT"+generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.SGD);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
        let ACTPayeeName = 'ACTPayee' + generatedID();
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.newPayeeCountry.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(ACTPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(ACTPayeeName);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
        await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCodeOur);
        await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCodeList4);
        await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCodeList4);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionViewPaymentTemplate();
        await _PaymentsPages.AccountTransferPage.templateNameValue.getText().then(text => {
            templateName = text;
        });
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(ACTPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.purposeCodeView).textContains(testData.AccountTransfer.purposeCodeList4),
            await ensure(_PaymentsPages.AccountTransferPage.subPurposeCodeValueView).textContains(testData.AccountTransfer.subPurposeCodeList4),
        ]);
    });

    it('Edit ACT template with new Add List 4-2 purpose code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
            await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        } else {
            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
            await _PaymentsPages.PaymentTemplatesPage.goToViewPTemplatePageViaSearch('Account Transfer');
        }
        await _PaymentsPages.AccountTransferPage.loadConditionViewPaymentTemplate();
        await _PaymentsPages.AccountTransferPage.templateNameValue.getText().then(text => {
            templateName = text;
        });
        await _PaymentsPages.AccountTransferPage.editTemplate.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.TWD);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayeeACT);
        await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
        await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCodeOur);
        await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCodeList4);
        await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCodeList4Edit);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionViewPaymentTemplate();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.purposeCodeView).textContains(testData.AccountTransfer.purposeCodeList4),
            await ensure(_PaymentsPages.AccountTransferPage.subPurposeCodeValueView).textContains(testData.AccountTransfer.subPurposeCodeList4Edit),
        ]);
        await _PaymentsPages.PaymentTemplatesPage.deleteTemplate(templateName);
    });

    it('Create an ACT Payment from Template with new Add List 4-4 purpose code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AccountTransfer.TemplateNameList4);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AccountTransferPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.FromAccount : testData.AccountTransfer.UAT.FromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
            await ensure(_PaymentsPages.AccountTransferPage.purposeCodeView).textContains(testData.AccountTransfer.purposeCodeList4Fcy),
            await ensure(_PaymentsPages.AccountTransferPage.subPurposeCodeValueView).textContains(testData.AccountTransfer.subPurposeCodeList4Fcy),
        ]);
    });
    // add for IEBAA-3403/IEBAA-3410
    it('Create single payment template with Organisation Select All', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.template.SIT.loginCompanyId02 : testData.template.UAT.loginCompanyId02, SIT ? testData.template.SIT.loginUserId02 : testData.template.UAT.loginUserId02, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        // await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.showAll.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateTWButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName="TWACT"+generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT? testData.template.SIT.fromAccount01: testData.template.SIT.fromAccount01);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.template.amount);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.template.payee01);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        // await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.click();
        await _PaymentsPages.PaymentTemplatesPage.showAll.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionViewPaymentTemplate();
        await _PaymentsPages.AccountTransferPage.templateNameValue.getText().then(text => {
            templateName = text;
        });
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT? testData.template.SIT.fromAccount01: testData.template.SIT.fromAccount01),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.template.payee01),
        ]);
    });
    it('Edit HQ template with Organisation Select All', async function () {
        await _PaymentsPages.PaymentTemplatesPage.editACTTemplate.jsClick();
        templateName="EditTWACT"+generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.template.editAmount);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        // await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.click();
        await _PaymentsPages.PaymentTemplatesPage.showAll.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionViewPaymentTemplate();
        await _PaymentsPages.AccountTransferPage.templateNameValue.getText().then(text => {
            templateName = text;
        });
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT? testData.template.SIT.fromAccount01: testData.template.SIT.fromAccount01),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.template.payee01),
        ]);
        //delete one template
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        // await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.click();
        await _PaymentsPages.PaymentTemplatesPage.showAll.click();
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.dialogDelete.click();
        await _PaymentsPages.PaymentTemplatesPage.dismissBtn.click();
    });
});

export async function createACT() {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
    await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.paymentCurrency);
    await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
    await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
    await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.AccountTransferPage.newPayeeCountry.select(testData.AccountTransfer.Country);
    await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank TAIWAN');
    await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
    await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
    await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
    await _PaymentsPages.BeneficiaryPage.addAddress.click();
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);
    await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
    await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
    await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
    //if (DuringOfficeHour(testData.AccountTransfer.cutOffTimeBegin, testData.AccountTransfer.cutOffTimeEnd)) {
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
    //}
};

export async function deletePayee(payeename : string) {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(payeename);
        await _PaymentsPages.BeneficiaryPage.deletePayeeBtn.click();
        await _PaymentsPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _PaymentsPages.BeneficiaryPage.confirmDelete.click();
        await _PaymentsPages.BeneficiaryPage.loadConditionForDismissButton();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
}
