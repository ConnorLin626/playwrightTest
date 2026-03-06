/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
// import { NavigatePages, ApprovalsPages } from '../../../pages/CB';
// import { Menu } from '../../../config/menu'
// import { saveScreen, devWatch, ensure, SIT, handlerCase } from '../../../lib';
// import { browser } from "protractor";

// describe('My Approvals By File', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     //this.timeout(60 * 1000);
//     before(async function () { await new NavigatePages().loginCB(SIT ? 'SG2BE12' : 'SG2BFE1', SIT ? 'SG2BE12S03' : 'SG2BFE1S01'); });
//     const suitObject = this;beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

//     it('Approve a Single File on I3 UI', async function () {
//         let _ApprovalsPages = new ApprovalsPages();
//         await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
//         await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.pageSwitchToI3();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3ByFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3Select1stFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.approveFileI3Button.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponseI3.input('123123123');
//         await _ApprovalsPages.paymentsTransactionsFilesPage.submitFileI3Button.click();
//         //await devWatch();
//         await Promise.all([
//             await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isI3Success(),//has success message.
//         ]);
//     });

//     it('Approve Multiple Files on I3 UI', async function () {
//         let _ApprovalsPages = new ApprovalsPages();
//         await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
//         await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.pageSwitchToI3();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3ByFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3Select1stFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3Select2ndFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.approveFileI3Button.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponseI3.input('123123123');
//         await _ApprovalsPages.paymentsTransactionsFilesPage.submitFileI3Button.click();
//         //await devWatch();
//         await Promise.all([
//             await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isI3Success(),//has success message.
//         ]);
//     });

//     it('Reject a Single File on I3 UI', async function () {
//         let _ApprovalsPages = new ApprovalsPages();
//         await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
//         await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.pageSwitchToI3();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3ByFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3Select1stFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.rejectFileI3Button.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.submitFileI3Button.click();
//         //await devWatch();
//         await Promise.all([
//             await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isI3Success(),//has success message.
//         ]);
//     });

//     it('Reject Multiple Files on I3 UI', async function () {
//         let _ApprovalsPages = new ApprovalsPages();
//         await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
//         await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.pageSwitchToI3();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3ByFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3Select1stFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.myApprovalI3Select2ndFile.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.rejectFileI3Button.click();
//         await _ApprovalsPages.paymentsTransactionsFilesPage.submitFileI3Button.click();
//         //await devWatch();
//         await Promise.all([
//             await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isI3Success(),//has success message.
//         ]);
//     });

// });
