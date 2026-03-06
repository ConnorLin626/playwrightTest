/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages} from '../../../pages/IDEALX';
import { ensure,randomNumbers, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import * as moment from "moment";
// this from Online MEPS Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate for MEPS,then Approval

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let currentDate = moment(new Date()).format("DD MMM YYYY");
let paymentReference = '';
let startDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
let endDate = moment(new Date()).add(2, 'days').format('DD MMM YYYY');

describe('SG_Recurring Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.RecurringPayment.SIT.loginCompanyId : testData.RecurringPayment.UAT.loginCompanyId, SIT ? testData.RecurringPayment.SIT.loginUserId : testData.RecurringPayment.UAT.loginUserId, '123123'); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create recurring payment for SG FAST Payment via Make a payment from template and with end date', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.RecurringPayment.templateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.RecurringPaymentPage.recurringRadioBtn.jsClick();
        await _PaymentsPages.RecurringPaymentPage.frequency.select(testData.RecurringPayment.frequency)
        await _PaymentsPages.RecurringPaymentPage.scrollTo(0,800);
        await _PaymentsPages.RecurringPaymentPage.frequencyWeeklyMonday.click();
        await _PaymentsPages.RecurringPaymentPage.startDate.select(startDate);
        await _PaymentsPages.RecurringPaymentPage.endDate.select(endDate);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getRecurringReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.RecurringPaymentPage.goToViewRecurringPaymentPageViaRef(reference);
        await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.RecurringPaymentPage.fastFromAccountValue).textContains(testData.RecurringPayment.account),
            await ensure(_PaymentsPages.RecurringPaymentPage.amountValue).textContains(testData.RecurringPayment.amount),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentStartDateValue).textContains(startDate),
            await ensure(_PaymentsPages.RecurringPaymentPage.freqquencyValue).textContains(testData.RecurringPayment.frequency),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentDateValue).textContains(currentDate),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentEndDateValue).textContains(endDate),
        ]);
    });

    it('Approve SG ACT recurring payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
-       await _PaymentsPages.RecurringPaymentPage.recurringRadioBtn.jsClick();
        await _PaymentsPages.RecurringPaymentPage.frequency.select(testData.RecurringPayment.frequency)
        await _PaymentsPages.RecurringPaymentPage.scrollTo(0,800);
        await _PaymentsPages.RecurringPaymentPage.frequencyWeeklyMonday.click();
        await _PaymentsPages.RecurringPaymentPage.startDate.select(startDate);
        await _PaymentsPages.RecurringPaymentPage.endDate.select(endDate);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getRecurringReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.RecurringPaymentPage.goToViewRecurringPaymentPageViaRef(reference);
        await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
       
        await Promise.all([
            await ensure(_PaymentsPages.RecurringPaymentPage.fastFromAccountValue).textContains(testData.RecurringPayment.account),
            await ensure(_PaymentsPages.RecurringPaymentPage.amountValue).textContains(testData.RecurringPayment.amount),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentStartDateValue).textContains(startDate),
            await ensure(_PaymentsPages.RecurringPaymentPage.freqquencyValue).textContains(testData.RecurringPayment.frequency),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentDateValue).textContains(currentDate),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentEndDateValue).textContains(endDate),
        ]);
        //do Approve
            await _PaymentsPages.RecurringPaymentPage.approveBtn.click();
            await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
            await _PaymentsPages.AccountTransferPage.challengeResponse.input("123123");
            await browser.sleep(2000);
            await _PaymentsPages.RecurringPaymentPage.approveBtn.click();
            await browser.sleep(2000);
            await _PaymentsPages.RecurringPaymentPage.approveBtn.jsClickIfExist();
            await _PaymentsPages.AccountTransferPage.dismissButton.click();
            await _PaymentsPages.RecurringPaymentPage.loadCondition();
            await _PaymentsPages.RecurringPaymentPage.recurringPaymentFilter.input(reference);
            await Promise.all([
                await ensure(_PaymentsPages.RecurringPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.PendingRelease,testData.status.Completed),
            ]);
            await _PaymentsPages.RecurringPaymentPage.recurringPaymentRef.jsClick();
            await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
            await Promise.all([
                await ensure(_PaymentsPages.RecurringPaymentPage.statusViewValue).textContainsLessOne(testData.status.Approved, testData.status.PendingRelease,testData.status.Received, testData.status.Completed),
            ]);
    });

    it('Reject SG TT recurring payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.myrPaymentCcy);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TelegraphicTransfer.myPayeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        //Due to IDXP-2000
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
        // await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        // await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        //await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
        await _PaymentsPages.RecurringPaymentPage.recurringRadioBtn.jsClick();
        await _PaymentsPages.RecurringPaymentPage.frequency.select(testData.RecurringPayment.frequency1)
        await _PaymentsPages.RecurringPaymentPage.scrollTo(0,800);
        await _PaymentsPages.RecurringPaymentPage.frequencyWeeklyMonday.click();
        await _PaymentsPages.RecurringPaymentPage.startDate.select(startDate);
        await _PaymentsPages.RecurringPaymentPage.endDate.select(endDate);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        // await _PaymentsPages.TelegraphicTransferPage.Bycontinuing.jsClick();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.continueBtn.click(); // for IDXP-929 CR
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getRecurringReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.RecurringPaymentPage.goToViewRecurringPaymentPageViaRef(reference);
        await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
       
        await Promise.all([
            await ensure(_PaymentsPages.RecurringPaymentPage.fastFromAccountValue).textContains(testData.RecurringPayment.account),
            await ensure(_PaymentsPages.RecurringPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentStartDateValue).textContains(startDate),
            await ensure(_PaymentsPages.RecurringPaymentPage.freqquencyValue).textContains(testData.RecurringPayment.frequency1),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentDateValue).textContains(currentDate),
            await ensure(_PaymentsPages.RecurringPaymentPage.paymentEndDateValue).textContains(endDate),
        ]);
        //do Reject
            await _PaymentsPages.RecurringPaymentPage.rejectButton.click();
            await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.RecurringPayment.rejectReason);
            await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
            await _PaymentsPages.AccountTransferPage.dismissButton.click();
            await _PaymentsPages.RecurringPaymentPage.loadCondition();
            await _PaymentsPages.RecurringPaymentPage.recurringPaymentFilter.input(reference);
            await Promise.all([
                await ensure(_PaymentsPages.RecurringPaymentPage.statusValue).textIs(testData.status.ApproverRejected),
            ]);
            await _PaymentsPages.RecurringPaymentPage.recurringPaymentRef.jsClick();
            await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
            await Promise.all([
                await ensure(_PaymentsPages.RecurringPaymentPage.statusViewValue).textContains(testData.status.Rejected),
            ]);
    });

    it('Edit recurring payment for SG RTGS Payment to without end date', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click(); 
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingRTGSPayee);
        await _PaymentsPages.MEPSPaymentPage.paymentType.jsClick();
        await _PaymentsPages.RecurringPaymentPage.recurringRadioBtn.jsClick();
        await _PaymentsPages.RecurringPaymentPage.frequency.select(testData.RecurringPayment.frequency1)
        await _PaymentsPages.RecurringPaymentPage.scrollTo(0,800);
        await _PaymentsPages.RecurringPaymentPage.frequencyWeeklyMonday.click();
        await _PaymentsPages.RecurringPaymentPage.startDate.select(startDate);
        await _PaymentsPages.RecurringPaymentPage.endDate.select(endDate);
        await _PaymentsPages.RecurringPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.RecurringPayment.paymentDetails);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.RecurringPayment.transactionNote);
        await _PaymentsPages.RecurringPaymentPage.nextButton.click();
        await _PaymentsPages.RecurringPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RecurringPaymentPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getRecurringReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.RecurringPaymentPage.goToViewRecurringPaymentPageViaRef(reference);
        await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
        await checkViewPageAllField(false);//Add for IDXP-812
        await _PaymentsPages.RecurringPaymentPage.editBtn.click();
        await _PaymentsPages.RecurringPaymentPage.noEndDateBtn.jsClick();
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RecurringPaymentPage.goToViewRecurringPaymentPageViaRef(reference);
        await checkViewPageAllField(true);//Add for IDXP-812
    });
    //IDXP-2278  Recurring payment 
    it('Edit recurring payment with save as draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.myrPaymentCcy);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
       await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.RecurringPayment.updatePayee);
        await _PaymentsPages.RecurringPaymentPage.recurringRadioBtn.jsClick();
        await _PaymentsPages.RecurringPaymentPage.frequency.select(testData.RecurringPayment.frequency1)
        await _PaymentsPages.RecurringPaymentPage.scrollTo(0,800);
        await _PaymentsPages.RecurringPaymentPage.frequencyWeeklyMonday.click();
        await _PaymentsPages.RecurringPaymentPage.startDate.select(startDate);
        await _PaymentsPages.RecurringPaymentPage.endDate.select(endDate);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeInput.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.TelegraphicTransfer.FoodPurposecode);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeSelected3.click();
        //await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        // await _PaymentsPages.TelegraphicTransferPage.Bycontinuing.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.saveAsDraft.jsClick();
         await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
                    paymentReference = text;
                });
                await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
                await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                //edit payee
                await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
                await _PaymentsPages.BeneficiaryPage.loadCondition();
                await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
                await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.RecurringPayment.updatePayee);
                await _PaymentsPages.BeneficiaryPage.loadCondition();
                await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
                await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
                let ramNumbers = randomNumbers();
                await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.accountNum+ramNumbers);
                await _PaymentsPages.BeneficiaryPage.next.click();
                await _PaymentsPages.BeneficiaryPage.dismiss.click();
                await _PaymentsPages.BeneficiaryPage.loadCondition();
        
                //edit txn
                await _PaymentsPages.RecurringPaymentPage.goToViewRecurringPaymentPageViaRef(paymentReference);
                await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
                await _PaymentsPages.AccountTransferPage.editButton.click();
                //await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
                await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        
                await Promise.all([
                    await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
                    //await ensure(_PaymentsPages.TelegraphicTransferPage.PayeeDetail).textContains(testData.Beneficiary.accountNum+ramNumbers),
                ]);
                await browser.sleep(2000);
                await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.RecurringPayment.updatePayee);
                await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
                await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
                await _PaymentsPages.TelegraphicTransferPage.continueBtn.jsClickIfExist();
                await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                await _PaymentsPages.RecurringPaymentPage.goToViewRecurringPaymentPageViaRef(paymentReference);
                await _PaymentsPages.RecurringPaymentPage.loadConditionForViewPage();
                await Promise.all([
                    //await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
                    await ensure(_PaymentsPages.RecurringPaymentPage.existingPayeeValue).textContains(testData.RecurringPayment.updatePayee),
                    await ensure(_PaymentsPages.RecurringPaymentPage.accountNumValue).textContains(testData.Beneficiary.accountNum+ramNumbers),
                ]);
        

    });


});

export async function checkViewPageAllField(isEdit:boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.RecurringPaymentPage.fastFromAccountValue).textContains(testData.RecurringPayment.account),
        await ensure(_PaymentsPages.RecurringPaymentPage.amountValue).textContains(testData.RecurringPayment.amount),
        await ensure(_PaymentsPages.RecurringPaymentPage.paymentStartDateValue).textContains(startDate),
        await ensure(_PaymentsPages.RecurringPaymentPage.freqquencyValue).textContains(testData.RecurringPayment.frequency1),
        await ensure(_PaymentsPages.RecurringPaymentPage.paymentDateValue).textContains(currentDate),
        await ensure(_PaymentsPages.RecurringPaymentPage.paymentEndDateValue).textContains(isEdit? "No end date" : endDate),
        //Check all field
        await ensure(_PaymentsPages.RecurringPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.RecurringPaymentPage.statusViewValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.RecurringPaymentPage.accountNumValue).isNotEmpty(),
        await ensure(_PaymentsPages.RecurringPaymentPage.existingPayeeValue).textContains(testData.MEPSPayment.existingRTGSPayee),
        await ensure(_PaymentsPages.RecurringPaymentPage.paymentTypeValue).textContains(testData.RecurringPayment.paymentType),
        await ensure(_PaymentsPages.MEPSPaymentPage.sendAmountValue).textContains(testData.RecurringPayment.amount),
        await ensure(_PaymentsPages.RecurringPaymentPage.exchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.RecurringPaymentPage.paymentDetailValue).textContains(testData.RecurringPayment.paymentDetails),
        await ensure(_PaymentsPages.RecurringPaymentPage.totalDeductValue).textContains(testData.RecurringPayment.amount),
        await ensure(_PaymentsPages.RecurringPaymentPage.bankChargeValue).textContains(testData.MEPSPayment.bankChargeThey),
        await ensure(_PaymentsPages.RecurringPaymentPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.RecurringPaymentPage.transactionNoteValue).textContains(testData.RecurringPayment.transactionNote),
        await ensure(_PaymentsPages.RecurringPaymentPage.bankChargeValue).textContains(testData.RecurringPayment.bankChargeThey),
        await ensure(_PaymentsPages.RecurringPaymentPage.transactionNoteValue).textContains(testData.RecurringPayment.transactionNote),
        await ensure(_PaymentsPages.RecurringPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.RecurringPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}
