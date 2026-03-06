/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { deleteFile, getOutPutFile, hasSameContent, load1stPPC, LoadPpcCriteria, DuringOfficeHour } from "./LoadPpcUtils";
import { PaymentsPages } from "../../../../pages/CB/Payments";
import { OperationsPages } from '../../../../pages/SAM';
import { ensure, SIT, handlerCase } from "../../../../lib";
import { NavigatePages } from "../../../../pages/Navigate";
import { Menu } from "../../../../config/menu";
import { browser } from "protractor";
import * as moment from "moment";
import { async } from "q";

let _PaymentsPages = new PaymentsPages();
let _OperationsPages = new OperationsPages();
let criteria = new LoadPpcCriteria();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let day = new Date().getDay();
let reference = '';

criteria.purposeCode = _PaymentsPages.AccountTransferPage.purposeCode;
criteria.subPurposeCode = _PaymentsPages.AccountTransferPage.subPurposeCode;

describe('TW CBCFX_Account Transfer', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	// OO
	it('Create an ACT Payment from Template', async function () {
		await new NavigatePages().loginCB(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId);
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AccountTransfer.TemplateName);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
		await _PaymentsPages.AccountTransferPage.loadConditionCreatePaymentTemplate();

		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.useFxCheckBox).isNotElementPresent(),
			await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isDisable(),
			await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isToday(),
			// await ensure(_PaymentsPages.AccountTransferPage.cutoffTimeTip).textContains(testData.AccountTransfer.cutOffTime)
		]);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPurposeCode();
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
			await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
				reference = text;
			});
		}
	});

	// DO
	it('Edit an ACT via Transfer Center', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (reference !== '') {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
			await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
			await _PaymentsPages.AccountTransferPage.editButton.click();
			await _PaymentsPages.AccountTransferPage.loadCondition();
			await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
			await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);

			await Promise.all([
				await ensure(_PaymentsPages.AccountTransferPage.useFxCheckBox).isNotElementPresent(),
				await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isDisable(),
				await ensure(_PaymentsPages.AccountTransferPage.paymentDate).isToday(),
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

	it('Can not create ACT payment in the holiday', async function () {
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
		// set today as holiday
		await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.AccountTransferPage.twACTScheduleLink, day, "");
		await new NavigatePages().loginCB(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId);
		await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.AccountTransfer.paymentCurrency);
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
		await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
		await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank TAIWAN');
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
		await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
		await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);
		await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
		await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
		await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForMessageInCreatePage();
		await _PaymentsPages.AccountTransferPage.hasUXErrorMsg(testData.AccountTransfer.messageToCreateAfterCutOffTime).then(value => {
			if (!value) {
				throw new Error('When try to create TW CBCFX in the holiday, the error message is wrong');
			}
		});
	});

	it('Can not approval ACT payment after cut off time', async function () {
		if (!DuringOfficeHour(testData.AccountTransfer.cutOffTimeBegin, testData.AccountTransfer.cutOffTimeEnd)) {
			if (0 !== reference.trim().length) {
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
				await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
				await _PaymentsPages.AccountTransferPage.approveButton.click();
				await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
				await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
				await _PaymentsPages.AccountTransferPage.approveButton.click();
				await _PaymentsPages.AccountTransferPage.loadConditionForMessageInApprovalPage();
				await _PaymentsPages.AccountTransferPage.hasUXErrorMsg(testData.AccountTransfer.messageToCreateAfterCutOffTime).then(value => {
					if (!value) {
						throw new Error('When try to approval TW CBCFX after cut off time, the error message is wrong');
					}
				});
			}
		}
	});

	it('Can create ACT payment in the office hour', async function () {
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
		// set today as holiday
		await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSTW, _PaymentsPages.AccountTransferPage.twACTScheduleLink, day, testDataSAM.schedule.CutoffTime01);
		await createACT();
	});

	it('Can approval ACT payment in the office hour', async function () {
		if (DuringOfficeHour(testData.AccountTransfer.cutOffTimeBegin, testData.AccountTransfer.cutOffTimeEnd)) {
			if (0 !== reference.trim().length) {
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
				await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
				await _PaymentsPages.AccountTransferPage.approveButton.click();
				await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
				await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
				await browser.sleep(3000);
				await _PaymentsPages.AccountTransferPage.approveButton.click();
				await _PaymentsPages.AccountTransferPage.dismissButton.click();
				await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
				await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
				await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
				let currentDate = moment(new Date()).format('DD MMM YYYY');
				await Promise.all([
					// await ensure(_PaymentsPages.AccountTransferPage.).textContains(currentDate),
					await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
				]);
			}
		}
	});
});

export async function createACT() {

	await new NavigatePages().loginCB(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId);
	await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
	await _PaymentsPages.AccountTransferPage.loadCondition();
	await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
	await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.AccountTransfer.paymentCurrency);
	await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount);
	await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
	await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank TAIWAN');
	await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
	await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
	await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
	await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
	await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
	await _PaymentsPages.AccountTransferPage.payeeCode.select(testData.AccountTransfer.payeeCode);
	await _PaymentsPages.AccountTransferPage.outwardRemit.select(testData.AccountTransfer.outwardRemit);
	await _PaymentsPages.AccountTransferPage.purposeCode.select(testData.AccountTransfer.purposeCode);
	await _PaymentsPages.AccountTransferPage.subPurposeCode.select(testData.AccountTransfer.subPurposeCode);
	if (DuringOfficeHour(testData.AccountTransfer.cutOffTimeBegin, testData.AccountTransfer.cutOffTimeEnd)) {
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
	}
};
