/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../../pages/CB';
import { Menu } from '../../../../config/menu';
import { deleteFile, load1stPPC, LoadPpcCriteria, getOutPutFile, hasSameContent, DuringOfficeHour } from './LoadPpcUtils'
import { ensure, saveScreen, SIT, handlerCase, devWatch } from "../../../../lib";
import * as moment from "moment";
import { browser } from 'protractor';
import { OperationsPages } from '../../../../pages/SAM';
import { idText } from 'typescript';

let _PaymentsPages = new PaymentsPages();
let _OperationsPages = new OperationsPages();
let criteria = new LoadPpcCriteria();
criteria.purposeCode = _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode;
criteria.subPurposeCode = _PaymentsPages.PaymentLocalOverseasPayeePage.subPurposeCode;
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let testDataCB = _PaymentsPages.fetchTestData('TW_testData.json');
let day = new Date().getDay();
let reference = "";

describe('TW CBCFX_TT', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	// check list1 when the bene country is "non-TW"
	it('Check the Purpose Code list 1', async function () {

		await createTT('TW_tt_obu_twd_fcy');
	});

	// check list2
	it('Check the Purpose Code list 2', async function () {

		await createTT('TW_tt_dbu_twd_fcy_DO_Our');
	});

	// check list3
	it('Check the Purpose Code list 3', async function () {

		await createTT('TW_tt_dbu_twd_fcy_DO_Others');
	});

	it('Can not create TT payment in the holiday', async function () {
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
		// set today as holiday
		await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.PaymentLocalOverseasPayeePage.twTTScheduleLink, day, "");
		await new NavigatePages().loginCB(SIT ? testDataCB.TT.SIT.loginCompanyId : testDataCB.TT.UAT.loginCompanyId, SIT ? testDataCB.TT.SIT.loginUserId : testDataCB.TT.UAT.loginUserId);
		await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amountCcy.select(testDataCB.TT.paymentCurrency);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testDataCB.TT.amount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select(testDataCB.TT.Country);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testDataCB.TT.newPayeeName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testDataCB.TT.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testDataCB.TT.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testDataCB.TT.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeBankID.select(SIT ? testDataCB.TT.SIT.payeeBankID :testDataCB.TT.UAT.payeeBankID);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeRoutingCode.input(testDataCB.TT.newPayeeRoutingCode);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testDataCB.TT.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testDataCB.TT.purposeCode);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForMessageInCreatePage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.hasUXErrorMsg(testDataCB.TT.messageToCreateAfterCutOffTime).then(value => {
			if (!value) {
				throw new Error('When try to create TW CBCFX in the holiday, the error message is wrong');
			}
		});
	});

	it('Can create TT payment in the office hour', async function () {
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
		// set today as working date
		await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.PaymentLocalOverseasPayeePage.twTTScheduleLink, day, testDataSAM.schedule.CutoffTime01);
		await new NavigatePages().loginCB(SIT ? testDataCB.TT.SIT.loginCompanyId : testDataCB.TT.UAT.loginCompanyId, SIT ? testDataCB.TT.SIT.loginUserId : testDataCB.TT.UAT.loginUserId);
		await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amountCcy.select(testDataCB.TT.paymentCurrency);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testDataCB.TT.amount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select(testDataCB.TT.Country);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testDataCB.TT.newPayeeName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testDataCB.TT.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testDataCB.TT.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testDataCB.TT.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeBankID.select(SIT ? testDataCB.TT.SIT.payeeBankID :testDataCB.TT.UAT.payeeBankID);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeRoutingCode.input(testDataCB.TT.newPayeeRoutingCode);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testDataCB.TT.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testDataCB.TT.purposeCode);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
		if (DuringOfficeHour(testDataCB.TT.cutOffTimeBegin, testDataCB.TT.cutOffTimeEnd)) {
			await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
			await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
			await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
			await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
			await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
				reference = text;
			});
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
			await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
			await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

			await Promise.all([
				await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testDataCB.TT.SIT.fromAccount : testDataCB.TT.UAT.fromAccount),
				await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testDataCB.TT.amount),
				await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.paymentDateValue).isNotEmpty(),
			]);
		}
	});

	it('Can approval TT payment in the office hour', async function () {
		if (DuringOfficeHour(testDataCB.AccountTransfer.cutOffTimeBegin, testDataCB.AccountTransfer.cutOffTimeEnd)) {
			if (0 !== reference.trim().length) {
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
				await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
				await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
				await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.jsClickIfExist();
				await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input('123123123');
				await browser.sleep(3000);
				await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
				await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
				await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
				let currentDate = moment(new Date()).format('DD MMM YYYY');
				await Promise.all([
					// await ensure(_PaymentsPages.AccountTransferPage.).textContains(currentDate),
					await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testDataCB.status.Approved, testDataCB.status.PartialApproved, testDataCB.status.Received, testDataCB.status.PendingRelease, testDataCB.status.Completed, testDataCB.status.BankRejected),
				]);
			}
		}
	});
});

export async function createTT(title: string) {

	const dataFile = 'cbcfx/' + title + '.json';
	const testData = _PaymentsPages.fetchTestData(dataFile);
	await new NavigatePages().loginCB(SIT ? testData.TT.SIT.loginCompanyId : testData.TT.UAT.loginCompanyId, SIT ? testData.TT.SIT.loginUserId : testData.TT.UAT.loginUserId);
	criteria.outPutFilePath = getOutPutFile('ppcList', title);
	criteria.targetPpcFilePath = getOutPutFile('ppcList', testData.TT.list1);
	await deleteFile(criteria.outPutFilePath);
	await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
	await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
	await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TT.SIT.fromAccount : testData.TT.UAT.fromAccount);
	await _PaymentsPages.PaymentLocalOverseasPayeePage.amountCcy.select(testData.TT.amountCcy)
	await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TT.amountA1);
	await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TT.existingPayee);

	if (undefined !== testData.TT.outwardRemit && null !== testData.TT.outwardRemit) {
		await _PaymentsPages.PaymentLocalOverseasPayeePage.outwardRemit.select(testData.TT.outwardRemit);
	}

	if (undefined !== testData.TT.payeeCode && null !== testData.TT.payeeCode) {
		await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeCode.select(testData.TT.payeeCode);
	}

	//check point 1-3
	await Promise.all([
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.useFXCheckbox).isNotElementPresent(),
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.paymentDate).isDisable(),
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.paymentDate).isToday(),
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.cutoffTimeTip).textContains(testData.TT.cutOffTime)
	]);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPurposeCode();
	//check point 4:
	// await load1stPPC(criteria);
	// if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
	// 	throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
	}
// };