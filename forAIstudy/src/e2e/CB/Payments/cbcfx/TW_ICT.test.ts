/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../../pages/CB';
import { OperationsPages } from '../../../../pages/SAM';
import { Menu } from '../../../../config/menu';
import { deleteFile, load1stPPC, LoadPpcCriteria, getOutPutFile, hasSameContent, DuringOfficeHour } from "./LoadPpcUtils";
import { ensure, SIT, handlerCase } from "../../../../lib";
import * as moment from "moment";
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let _OperationsPages = new OperationsPages();
let criteria = new LoadPpcCriteria();
let day = new Date().getDay();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let testDataCB = _PaymentsPages.fetchTestData('TW_testData.json');

let reference = "";
criteria.purposeCode = _PaymentsPages.intraCompanyTransferPage.purposeCode;
criteria.subPurposeCode = _PaymentsPages.intraCompanyTransferPage.subPurposeCode;

//1.while set file name = TW_ict_obu_twd_fcy
//2.Generated Purpose code list will be 'src/e2e/CB/Payment/cbcfx/ppcList/TW_ict_obu_twd_fcy.lst'

describe('TW CBCFX ICT', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Can not create ICT payment in the holiday', async function () {
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
		// set today as holiday
		await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.intraCompanyTransferPage.ictScheduleLink, day, "");
		await new NavigatePages().loginCB(SIT ? testDataCB.ICT.SIT.loginCompanyId : testDataCB.ICT.UAT.loginCompanyId, SIT ? testDataCB.ICT.SIT.loginUserId : testDataCB.ICT.UAT.loginUserId);
		await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testDataCB.ICT.SIT.fromAccount : testDataCB.ICT.UAT.fromAccount);
		await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testDataCB.ICT.SIT.toAccount : testDataCB.ICT.UAT.toAccount);
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testDataCB.ICT.amount);
		await _PaymentsPages.intraCompanyTransferPage.purposeCode.select(testDataCB.ICT.purposeCode);
		await _PaymentsPages.intraCompanyTransferPage.subPurposeCode.select(testDataCB.ICT.subPurposeCode);
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForMessageInCreatePage();
		await _PaymentsPages.intraCompanyTransferPage.hasUXErrorMsg(testDataCB.ICT.messageToCreateAfterCutOffTime).then(value => {
			if (!value) {
				throw new Error('When try to create TW CBCFX in the holiday, the error message is wrong');
			}
		});
	});

	it('Can not approval ICT payment after cut off time', async function () {
		if (!DuringOfficeHour(testDataCB.ICT.cutOffTimeBegin, testDataCB.ICT.cutOffTimeEnd)) {
			if (0 !== reference.trim().length) {
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);

				await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
				await _PaymentsPages.intraCompanyTransferPage.approveButton.click();
				await _PaymentsPages.intraCompanyTransferPage.getChallenge.jsClickIfExist();
				await _PaymentsPages.intraCompanyTransferPage.challengeResponse.input('123123123');
				await _PaymentsPages.intraCompanyTransferPage.approveButton.click();
				await _PaymentsPages.intraCompanyTransferPage.loadConditionForMessageInApprovalPage();
				await _PaymentsPages.intraCompanyTransferPage.hasUXErrorMsg(testDataCB.ICT.messageToApprovalAfterCutOffTime).then(value => {
					if (!value) {
						throw new Error('When try to approval TW CBCFX after cut off time, the error message is wrong');
					}
				});
			}
		}
	});

	it('Can create ICT payment in the office hour', async function () {
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
		// set today is not a holiday
		await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.intraCompanyTransferPage.ictScheduleLink, day, testDataSAM.schedule.CutoffTime01);
		await createICT('TW_ict_dbu_twd_fcy');
	});

	it('Can approval ICT payment in the office hour', async function () {
		if (DuringOfficeHour(testDataCB.ICT.cutOffTimeBegin, testDataCB.ICT.cutOffTimeEnd)) {
			if (0 !== reference.trim().length) {
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);

				await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
				await _PaymentsPages.intraCompanyTransferPage.approveButton.click();
				await _PaymentsPages.intraCompanyTransferPage.getChallenge.jsClickIfExist();
				await _PaymentsPages.intraCompanyTransferPage.challengeResponse.input('123123123');
				await browser.sleep(3000);
				await _PaymentsPages.intraCompanyTransferPage.approveButton.click();
				await _PaymentsPages.intraCompanyTransferPage.dismissButton.click();
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
				await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
				let currentDate = moment(new Date()).format('DD MMM YYYY');
				await Promise.all([
					await ensure(_PaymentsPages.intraCompanyTransferPage.paymentDateValue).textContains(currentDate),
					await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testDataCB.status.Approved, testDataCB.status.PartialApproved, testDataCB.status.Received, testDataCB.status.PendingRelease, testDataCB.status.Completed, testDataCB.status.BankRejected),
				]);
			}
		}
	});
});

export async function createICT(title: string) {

	await new NavigatePages().loginCB(SIT ? testDataCB.ICT.SIT.loginCompanyId : testDataCB.ICT.UAT.loginCompanyId, SIT ? testDataCB.ICT.SIT.loginUserId : testDataCB.ICT.UAT.loginUserId);
	criteria.outPutFilePath = getOutPutFile('ppcList', title);
	criteria.targetPpcFilePath = getOutPutFile('ppcList', testDataCB.ICT.purposeCodeList4);
	await deleteFile(criteria.outPutFilePath);
	await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
	await _PaymentsPages.intraCompanyTransferPage.loadCondition();
	await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testDataCB.ICT.SIT.fromAccount : testDataCB.ICT.UAT.fromAccount);
	await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testDataCB.ICT.SIT.toAccount : testDataCB.ICT.UAT.toAccount);
	await _PaymentsPages.intraCompanyTransferPage.amount.input(testDataCB.ICT.amount);
	await Promise.all([
		await ensure(_PaymentsPages.intraCompanyTransferPage.useFxCheckBox).isNotElementPresent(),
		await ensure(_PaymentsPages.intraCompanyTransferPage.paymentDate).isToday(),
		await ensure(_PaymentsPages.intraCompanyTransferPage.paymentDate).isDisable(),
		// await ensure(_PaymentsPages.intraCompanyTransferPage.cutoffTimeTip).textContains(testData.IntraCompanyTransfer.cutoffTime),
	]);
	await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPurposeCode();
	//check point 4:
	// await load1stPPC(criteria);
	// if (!hasSameContent(criteria.targetPpcFilePath, criteria.outPutFilePath)) {
	// 	throw new Error('purposeCode list ' + criteria.outPutFilePath + ' is wrong');
	// }
	if (DuringOfficeHour(testDataCB.ICT.cutOffTimeBegin, testDataCB.ICT.cutOffTimeEnd)) {
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
	}
};
