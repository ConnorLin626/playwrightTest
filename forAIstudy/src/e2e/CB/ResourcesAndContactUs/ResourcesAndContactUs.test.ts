/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import {NavigatePages, ResourcesAndContactUsPage} from "../../../pages/CB";
import {Menu} from "../../../config/menu";
import {ensure, SIT, handlerCase, generatedID} from "../../../lib";
import {browser} from "protractor";

let _ResourcesAndContactUsPage = new ResourcesAndContactUsPage();
let testData = _ResourcesAndContactUsPage.fetchTestData("ResourcesandContactUs_testData.json");

describe("Resources and Contact Us", async function() {
	this.retries(browser.params.caseRetryTimes);
	before(async function() {
		await new NavigatePages().loginCB(SIT ? testData.ResourceCenter.SIT.loginCompanyId : testData.ResourceCenter.UAT.loginCompanyId, SIT ? testData.ResourceCenter.SIT.loginUserId : testData.ResourceCenter.UAT.loginUserId);
	});
	const suitObject = this;
	beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function() {
		handlerCase(suitObject, this);
	});

	it('Resources Center - search', async function () {
		await _ResourcesAndContactUsPage.openMenu(Menu.Help.Resources);
		await _ResourcesAndContactUsPage.resourcesPage.loadCondition();
		await _ResourcesAndContactUsPage.resourcesPage.searchFilter.input(SIT ? testData.ResourceCenter.SIT.resourceDscription : testData.ResourceCenter.UAT.resourceDscription);
		await Promise.all([
			await ensure(_ResourcesAndContactUsPage.resourcesPage.descriptionValue).textContains(SIT ? testData.ResourceCenter.SIT.resourceDscription : testData.ResourceCenter.UAT.resourceDscription),
		]);

		await _ResourcesAndContactUsPage.resourcesPage.searchFilter.input(SIT ? testData.ResourceCenter.SIT.title : testData.ResourceCenter.UAT.title);
		await Promise.all([
			await ensure(_ResourcesAndContactUsPage.resourcesPage.titleValue).textContains(SIT ? testData.ResourceCenter.SIT.title : testData.ResourceCenter.UAT.title),
		]);
	});

	it('Contact US - Send a message', async function () {
		await _ResourcesAndContactUsPage.openMenu(Menu.Help.ContactUs);
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition();
		await _ResourcesAndContactUsPage.contactUsPage.messageTo.select(SIT ? testData.ContactUs.SIT.megTo : testData.ContactUs.UAT.megTo);
		await _ResourcesAndContactUsPage.contactUsPage.messageToResult.jsClickIfExist();
		// await _ResourcesAndContactUsPage.contactUsPage.subjectList.select(SIT ? testData.ContactUs.SIT.subject : testData.ContactUs.UAT.subject);
		await _ResourcesAndContactUsPage.contactUsPage.msgText.input(testData.ContactUs.message);
		// await _ResourcesAndContactUsPage.contactUsPage.attachFile.select(testData.ContactUs.attachFile);
		await _ResourcesAndContactUsPage.contactUsPage.submitBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4Submit();
		await _ResourcesAndContactUsPage.contactUsPage.okBtn.click();
        //display inbox page
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4Inbox();
		await Promise.all([
			await ensure(_ResourcesAndContactUsPage.contactUsPage.inboxValue).textContains(testData.ContactUs.inboxValue),
		]);
		await _ResourcesAndContactUsPage.contactUsPage.msgFilter.input(testData.ContactUs.message);
		await Promise.all([
			await ensure(_ResourcesAndContactUsPage.contactUsPage.msgValue).textContains(testData.ContactUs.message),
		]);
		//display view message page
		await _ResourcesAndContactUsPage.contactUsPage.subject.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4ViewMsg();
		await Promise.all([
			await ensure(_ResourcesAndContactUsPage.contactUsPage.viewMsgValue).textContains(testData.ContactUs.message),
		]);
		//click back btn, will back to Inbox page
		await _ResourcesAndContactUsPage.contactUsPage.backBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4Inbox();
		await Promise.all([
			await ensure(_ResourcesAndContactUsPage.contactUsPage.inboxValue).textContains(testData.ContactUs.inboxValue),
		]);
        // click delete btn
		await _ResourcesAndContactUsPage.contactUsPage.subject.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4ViewMsg();
		await _ResourcesAndContactUsPage.contactUsPage.deleteBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4confirmDel();
		await _ResourcesAndContactUsPage.contactUsPage.confirmDelBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4deleteSuccess();
		await _ResourcesAndContactUsPage.contactUsPage.okBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4Inbox();
	});	
		
	it('Contact US - reply message', async function () {
		await _ResourcesAndContactUsPage.openMenu(Menu.Help.ContactUs);
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition();
		await browser.sleep(2000);
		await _ResourcesAndContactUsPage.contactUsPage.cancelBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.msgFilter.input(SIT ? testData.ContactUs.SIT.replyMsgtime : testData.ContactUs.UAT.replyMsgtime);
		await _ResourcesAndContactUsPage.contactUsPage.subject.jsClick();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4ViewMsg();
		await _ResourcesAndContactUsPage.contactUsPage.replyBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadConditionForReply();
		await browser.sleep(25000);
		await _ResourcesAndContactUsPage.contactUsPage.msgText.input(testData.ContactUs.message);
		await _ResourcesAndContactUsPage.contactUsPage.submitBtn.click();
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4Submit();
		await _ResourcesAndContactUsPage.contactUsPage.okBtn.click();
        //display inbox page
		await _ResourcesAndContactUsPage.contactUsPage.loadCondition4Inbox();
		await Promise.all([
			await ensure(_ResourcesAndContactUsPage.contactUsPage.inboxValue).textContains(testData.ContactUs.inboxValue),
		]);
	});
});
