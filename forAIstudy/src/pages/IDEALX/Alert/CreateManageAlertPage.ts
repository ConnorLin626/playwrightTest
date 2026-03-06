import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, DateSelect, DBSCalendarSelect, OptionSelect } from '../../../lib';
import moment = require("moment");

@log export class CreateManageAlertPage extends Page {
    constructor() {
        super();
    }
    @component('//*[@id="nav-item-navIdealxProfilesLinkText"]') public userMenu: Button;
    @component('//*[@class="icon-wrapper bell-color"]') public alertMenu: Button;
    @component('//*[@id="profile-setting"]') public profileMenu: Button;
    @component('//*[@id="nav-item-navBBTopDashLinkText"]') public dashboard: Button;


    // alert list page
    @component('//input[@id="alerts-filter"]') public alertsFilter: TextInput;

    // High / Low Balance Alert
    @component('//button[@id="BnkAlrtHigLow-create"]') public createHLBalanceAlertButton: Button;
    @component('//span[@id="alert-expand-type-BnkAlrtHigLow"]') public showHLBalanceAlerts: Button;
    @component('//li[@id="BnkAlrtHigLow-account-0"]') public higLowAccount1: TextInput;
    @component('//li[@id="BnkAlrtHigLow-account-1"]') public higLowAccount2: TextInput;
    @component('//*[@id="BnkAlrtHigLow-alert-name-0"]') public higLowThreshold: TextInput;
    @component('//li[@id="BnkAlrtHigLow-recipient-0"]') public higLowSendTo: TextInput;
    @component('//li[@id="BnkAlrtHigLow-recipient-1"]') public MobilLigLowSendTo: TextInput;
    @component('//*[@id="BnkAlrtHigLow-delete-0"]') public deleteHLBalanceAlerts: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // Periodic Balance Alert
    @component('//button[@id="BNKOfrTyDePeB-create"]') public createPeriodicBalanceAlertButton: Button;
    @component('//span[@id="alert-expand-type-BNKOfrTyDePeB"]') public showPeriodicAlertButton: Button;
    @component('//li[@id="BNKOfrTyDePeB-account-0"]') public periodicAccount1: TextInput;
    @component('//li[@id="BNKOfrTyDePeB-account-1"]') public periodicAccount2: TextInput;
    @component('//li[@id="BNKOfrTyDePeB-alert-0"]') public periodicSendTo: TextInput;
    @component('//span[@id="alert-nums-BNKOfrTyDePeB"]') public periodicAlertNums: TextInput;
    @component('//input[@value="VA"]') public selectVAButton: Button;
    @component('//*[@id="BNKOfrTyDePeB-delete-0"]') public deletePeriodicAlert: Button;

    // Fixed Deposit Maturity Alert
    @component('//button[@id="FixedDepsAlt-create"]') public createFixedDepositAlertButton: Button;
    @component('//span[@id="alert-expand-type-FixedDepsAlt"]') public showFixedDepsAlertButton: Button;
    @component('//li[@id="FixedDepsAlt-account-0"]') public fixedDepsAccount1: TextInput;
    @component('//li[@id="FixedDepsAlt-account-1"]') public fixedDepsAccount2: TextInput;
    @component('//span[@id="alert-nums-FixedDepsAlt"]') public fixedDepsAlertNums: TextInput;
    @component('//*[@id="FixedDepsAlt-delete-0"]') public deletefixedDepsAlert: Button;

    // Loans Overdue Alert
    @component('//button[@id="LoansOverAlt-create"]') public createLoansOverdueAlertButton: Button;
    @component('//span[@id="alert-expand-type-LoansOverAlt"]') public showLoansOverdueAlertButton: Button;
    @component('//div[@id="LoansOverAlt-edit-0"]') public editLoansOverdueAlertButton: Button;
    @component('//li[@id="LoansOverAlt-account-0"]') public loansOverAltAccount1: TextInput;
    @component('//li[@id="LoansOverAlt-account-1"]') public loansOverAltAccount2: TextInput;
    @component('//span[@id="alert-nums-LoansOverAlt"]') public loansOverAlertNums: TextInput;
    @component('//*[@id="LoansOverAlt-delete-0"]') public deleteloanOverAlert: Button;

    // Loans Payments Due Date Alert
    @component('//button[@id="LoansPayDDA-create"]') public createLoansPaymentsAlertButton: Button;
    @component('//span[@id="alert-expand-type-LoansPayDDA"]') public showLoansPaymentsAlertButton: Button;
    @component('//li[@id="LoansPayDDA-account-0"]') public loansPaymentsAltAccount1: TextInput;
    @component('//li[@id="LoansPayDDA-account-1"]') public loansPaymentsAltAccount2: TextInput;
    @component('//span[@id="alert-nums-LoansPayDDA"]') public loansPaymentsAlertNums: TextInput;
    @component('//*[@id="LoansPayDDA-delete-0"]') public deleteloansPaymentAlert: Button;

    // Incoming Funds Alert 
    @component('//button[@id="IncoFundsAlt-create"]') public createIncomingFundsAlertButton: Button;
    @component('//span[@id="alert-expand-type-IncoFundsAlt"]') public showIncomingFundsAlertButton: Button;
    @component('//div[@id="IncoFundsAlt-edit-0"]') public editIncomingFundsAlertButton: Button;
    @component('//li[@id="IncoFundsAlt-account-0"]') public incomingFundsAltAccount1: TextInput;
    @component('//li[@id="IncoFundsAlt-account-1"]') public incomingFundsAltAccount2: TextInput;
    @component('//span[@id="alert-nums-IncoFundsAlt"]') public incomingFundsAlertNums: TextInput;
    @component('//input[@name="incomingAmountGreaterNumber"]') public incomingFundsAlertGreaterInput: TextInput;
    @component('//*[@id="IncoFundsAlt-delete-0"]') public deleteincomingFundsAlert: Button;

    // Remittance & MT103 Advice Alert
    @component('//button[@id="BNKAlrtRemAdv-create"]') public createRemittanceMT103AlertButton: Button;
    @component('//span[@id="alert-expand-type-BNKAlrtRemAdv"]') public showRemittanceMT103AlertButton: Button;
    @component('//li[@id="BNKAlrtRemAdv-account-0"]') public remittanceMT103AltAccount1: TextInput;
    @component('//li[@id="BNKAlrtRemAdv-account-1"]') public remittanceMT103AltAccount2: TextInput;
    @component('//span[@id="alert-nums-BNKAlrtRemAdv"]') public remittanceMT103AlertNums: TextInput;
    @component('//*[@id="BNKAlrtRemAdv-delete-0"]') public deleteremittanceMT103Alert: Button;

    // Credit Confirmation Alert
    @component('//button[@id="CdtCfmnAltCd-create"]') public createCreateConfirmationAlertButton: Button;
    @component('//span[@id="alert-expand-type-CdtCfmnAltCd"]') public showCreateConfirmationAlertButton: Button;
    @component('//div[@id="CdtCfmnAltCd-edit-0"]') public editCreateConfirmationAlertButton: Button;
    @component('//li[@id="CdtCfmnAltCd-account-0"]') public createConfirmationAltAccount1: TextInput;
    @component('//li[@id="CdtCfmnAltCd-account-1"]') public createConfirmationAltAccount2: TextInput;
    @component('//span[@id="alert-nums-CdtCfmnAltCd"]') public createConfirmationAlertNums: TextInput;
    @component('//*[@id="CdtCfmnAltCd-delete-0"]') public deleteConfirmationAlert: Button;

    // Payment Statuses Alert
    @component('//button[@id="BNKAlrtPmtStu-create"]') public createPaymentStatusAlertButton: Button;
    @component('//span[@id="alert-expand-type-BNKAlrtPmtStu"]') public showPaymentStatusAlertButton: Button;
    @component('//div[@id="BNKAlrtPmtStu-edit-0"]') public editPaymentStatusAlertButton: Button;
    @component('//li[@id="BNKAlrtPmtStu-account-0"]') public paymentStatusAltAccount1: TextInput;
    @component('//li[@id="BNKAlrtPmtStu-account-1"]') public paymentStatusAltAccount2: TextInput;
    @component('//li[@id="BNKAlrtPmtStu-alert-0"]') public paymentStatusSendTo: TextInput;
    @component('//span[@id="alert-nums-BNKAlrtPmtStu"]') public paymentStatusAlertNums: TextInput;
    @component('//*[@id="BNKAlrtPmtStu-alertName-0"]') public paymentStatusAlertName: TextInput;
    @component('//*[@id="BNKAlrtPmtStu-delete-0"]') public deletepaymentStatusAlert: Button;

    // Credit & Debit confirmation Alert
    @component('//button[@id="CdtDetCfmnAlt-create"]') public cdtDetCfmnAltBtn: Button;
    @component('//credit-debit-type/div/div[2]/div[1]/label') public creditTxnBtn: Button;
    @component('//span[@id="alert-expand-type-CdtDetCfmnAlt"]') public showCDcfmnAltBtn: Button;
    @component('//*[@id="CdtDetCfmnAlt-account-0"]') public cdtDetCfmnAltAcct1: Button;
    @component('//*[@id="CdtDetCfmnAlt-recipient-0"]') public cdtDetCfmnAltEmail1: Button;
    @component('//*[@id="CdtDetCfmnAlt-delete-0"]') public deleteCdtDetCfmnAlt: Button;

    // ALT Vendor Finance Alert
    @component('//button[@id="ALTVdrFncAlrt-create"]') public createAltAlertBtn: Button;
    @component('//span[@id="alert-expand-type-ALTVdrFncAlrt"]') public showALTalert: Button;
    @component('//*[@id="CdtDetCfmnAlt-delete-0"]') public deleteAltAlertBtn: Button;
    @component('//input[@id="labelStatusSubmitted"]') public submitCheckbox: Button;
    @component('//input[@id="labelStatusFinalApproval"]') public finalApprovalCheckbox: Button;
    @component('//span[@id="alert-nums-ALTVdrFncAlrt"]') public AltAlertNums: TextInput;
    @component('//span[@id="alert-expand-type-ALTVdrFncAlrt"]') public showAlert: Button;
    @component('//button[@id="ALTVdrFncAlrt-delete-0"]') public deleteAlert: Button;

    //EDP status alert
    @component('//button[@id="EDPStsAlrt-create"]') public createEDPAlertBtn: Button;
    @component('//span[@id="alert-nums-EDPStsAlrt"]') public EDPAlertNums: TextInput;
    @component('//*[@id="selectAll"]') public selectAllBtn: Button;
    @component('//*[@id="issued_Issued"]') public issued: Button;
    @component('//*[@id="issued_IssuanceFailed"]') public issuanceFailed: Button;
    @component('//*[@id=" issued_IssuanceUnsuccessful"]') public  issuanceUnsuccessful: Button;
    @component('//*[@id="issued_CashedOut"]') public issuedCashOut: Button;
    @component('//*[@id="issued_Cash-outFailed"]') public issuedCashCoutFailed: Button;
    @component('//*[@id="issued_PayeeRejected"]') public issuedPayeeRejected: Button;
    @component('//*[@id="issued_PayorCancelled"]') public issuedPayorCancelled: Button;
    @component('//*[@id="issued_PayorCancellationUnsuccessful"]') public issuedPayorCancellationUnsuccessful: Button;
    @component('//*[@id="issued_ExpiringSoon"]') public issuedExpiringSoon: Button;
    @component('//*[@id="issued_Expired"]') public issuedExpired: Button;

    @component('//*[@id="received_PendingCash-out"]') public receivedPendingCashOut : Button;
    @component('//*[@id="received_CashedOut"]') public received_CashedOut: Button;
    @component('//*[@id="received_Cash-outFailed"]') public receivedCashOutFailed: Button;
    @component('//*[@id="received_Cash-outUnsuccessful"]') public receivedCahsOutUnsuccess: Button;
    @component('//*[@id="received_PayeeRejected"]') public receivedPayeeRejected: Button;
    @component('//*[@id="received_PayeeRejectionUnsuccessful"]') public received_PayeeRejectionUnsuccessful: Button;
    @component('//*[@id="received_PayorCancelled"]') public receivedPayroCancelled: Button;
    @component('//*[@id="received_ExpiringSoon"]') public receivedExpiringSoon: Button;
    @component('//*[@id="received_Expired"]') public receivedRReceivedExpired: Button;
    @component('//*[@id="EDPStsAlrt-edit-0"]') public editEDPAlertBtn: Button;
    @component('//span[@id="alert-expand-type-EDPStsAlrt"]') public showEDPAlert: Button;
    @component('//button[@id="EDPStsAlrt-delete-0"]') public deleteEDPAlert: Button;

    //eStatement Alert
    @component('//button[@id="EStateAlrt-create"]') public createEStateAlertBtn: Button;
    @component('//*[@id="EStateAlrt"]') public EStateAlrt: TextInput;
    @component('//*[@id="FDAdStateAlrt"]') public FDAlert: Button;
    @component('//*[@id="FDAdStateAlrt-eStatement"]') public FDAlertAttach: Button;
    @component('//*[@id="label-multi-dropdown-fdAccount"]') public FDAccountSelect: Button;
    @component('//*[@id="fdAccount-0"]') public FDAccount0: Button;
    @component('//*[@id="fdAccount-1"]') public FDAccount1: Button;
    @component('//*[@id="fdAccount-2"]') public FDAccount2: Button;
    @component('//*[@id="fdAccount-3"]') public FDAccount3: Button;
    @component('//*[@id="alert-expand-type-EStateAlrt"]') public showEStateAlert: Button;
    @component('//*[@id="EStateAlrt-account-0"]') public EStateAlrtAcct0: TextInput;
    @component('//*[@id="EStateAlrt-account-1"]') public EStateAlrtAcct1: TextInput;
    @component('//*[@id="EStateAlrt-alert-name-0"]') public EStateAlrtDetails: TextInput;
    @component('//*[@id="EStateAlrt-recipient-0"]') public EStateAlrtEmail: TextInput;
    @component('//*[@id="EStateAlrt-edit-0"]') public EditEStateAlrtBtn: TextInput;
    @component('//*[@id="EStateAlrt-delete-0"]') public deleteEStateAlt: Button;

    //e-Tax Payment Statuses  Alert
    @component('//button[@id="InTaxAlrt-create"]') public createEtaxAlertBtn: Button;
    @component('//p-auto-complete[@formcontrolname="fileFormat"]') public fileType: OptionSelect;


    // create page
    @component('//input[@id="search"]') public search: TextInput;
    @component('//div[@id="label-multi-dropdown-alertAccount"]') public alertAccountMultiSelection: Button;
    @component('//*[@id="selectAllInput"]') public selectAllInput: Button;
    @component('//input[@id="alertAccount-0"]') public accountOption1: Button;
    @component('//*[@class="select-dropdown-icon"]') public accountDropIcon: Button;
    @component('//input[@name="highThreshold"]') public highThresholdInput: TextInput;
    @component('//input[@name="lowThreshold"]') public lowThresholdInput: TextInput;
    @component('//input[@name="alertThreshold"]') public alertThresholdInput: TextInput;
    @component('//dbs-calendar[@formcontrolname="startDate"]') public startDate: DBSCalendarSelect;
    @component('//dbs-calendar/div/div/div/dbs-day-calendar/div/table/tbody/tr[5]/td[2]/button') public date: Button;
    @component('//button[@class="btn btn__primary btn--xs"]') public applyButton: Button;
    @component('//div[@id="label-multi-dropdown-sendEmails"]') public sendEmailMultiSelection: Button;
    @component('//*[@id="isSendEmails"]') public sendEmailButton: Button;
    @component('//input[@id="sendEmails-0"]') public sendEmailOption1: Button;
    @component('//button[@id="btn-save-publish"]') public submitButton: Button;
    // @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//input[@name="sendTime"]') public sendTime: TextInput;
    @component('//input[@name="beforeDate"]') public beforeDate: TextInput;
    @component('//input[@id="ux-input-password-0"]') public alertPassword: TextInput;
    @component('//input[@id="ux-input-password-1"]') public alertConfirmPassword: TextInput;
    @component('//input[@name="\'alertPassword\'"]') public editAlertPassword: TextInput;
    @component('//input[@name="alertConfirmPwd"]') public editAlertConfirmPassword: TextInput;

    @component('//input[@id="labelStatusCreated"]') public alertCreateCheckbox: Button;
    @component('//input[@id="labelStatusModified"]') public alertModifiedCheckbox: Button;
    @component('//input[@id="labelStatusVerification"]') public alertPendingVerificationCheckbox: Button;
    @component('//input[@id="labelStatusApproval"]') public alertPendingApprovalCheckbox: Button;
    @component('//input[@id="labelStatusRelease"]') public alertPendingReleaseCheckbox: Button;
    @component('//input[@id="labelStatusRejected"]') public alertRejectedCheckbox: Button;
    @component('//input[@id="labelStatusSent"]') public alertSentCheckbox: Button;
    @component('//input[@id="labelStatusFailed"]') public alertFailedCheckbox: Button;

    @component('//input[@id="isSendMobile"]') public isSendMobile: Button;
    @component('//input[@id="isSendSMS"]') public isSendSMS: Button;
    @component('//button[@id="addNewMobile"]') public addNewMobile: Button;

    @component('//input[@id="nickname0-input"]') public nickname0: TextInput;

    // @component('//*[@id="countryCode0"]') public countryCode0: Button;
    // @component('//*[@id="countryCode0"]/div') public countryCodeSelection0: Button;
    @component('//*[@id="countryCode0"]/div//input') public countryCodeSelection: TextInput;
    @component('//*[@id="countryCode0"]/div/div/ul/li[1]') public countryCodeOption0: Button;
    @component('//input[@id="areaCode0-input"]') public areaCode0: TextInput;
    @component('//input[@id="mobileNumber0-input"]') public mobileNumber0: TextInput;
    @component('//button[@id="saveAndCloseMobil"]') public saveAndCloseMobilButton: Button;

    @component('//div[@id="label-multi-dropdown-sendSMS"]') public sendSmsSelection: Button;
    @component('//input[@id="sendSMS-0"]') public sendSmsOption0: Button;

    // @component('//input[@id="fileFormat"]') public fileFormatSelection: Button;
    // @component('//*[@formcontrolname="fileFormat"]/div/div/ul/li[1]') public fileFormatOption1: Button;
    ////*[@id="my-app"]/ng-component/div/ng-component/div/div/form/payment-status-create/file-format/div/span[2]/p-auto-complete/div/div/ul/li[1]

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.visibilityOf(this.alertsFilter.element),
            this.alertsFilter.getTimeOut()
        );
        await browser.wait(
            ExpectedConditions.elementToBeClickable(
                this.alertsFilter.element
            ),
            this.alertsFilter.getTimeOut()
        );

        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.createPeriodicBalanceAlertButton.element),
            this.createPeriodicBalanceAlertButton.getTimeOut()
        );
        await browser.wait(
            ExpectedConditions.elementToBeClickable(
                this.createPeriodicBalanceAlertButton.element
            ),
            this.createPeriodicBalanceAlertButton.getTimeOut()
        );
    }

    public async loadConditionCreatePage() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.visibilityOf(this.alertAccountMultiSelection.element),
            this.alertAccountMultiSelection.getTimeOut()
        );
    }

    public async loadConditionCreateAltPage() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.submitButton.element),
            this.submitButton.getTimeOut()
        );
    }

    public async loadDialog() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.dismissButton.element),
            this.dismissButton.getTimeOut()
        );
    }

    public async loadDeleteDialog() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.deleteDialogButton.element),
            this.dismissButton.getTimeOut()
        );
    }

    public async loadConditionForAlert() {
        await waitForUXLoading();
        await browser.sleep(12000); // wait for alert send
    }

    public getRandomNumber(num = 0) {
        return (Math.random() * 100).toFixed(num);
    }

    public getRandomNumbers(length = 1) {
        let str = '';
        for (let i = 0; i <= length; i++) {
            str += (Math.random() * 10).toFixed(0);
        }
        return str;
    }

    public getCurrentDate() {
        return moment(new Date()).format("DD MMM YYYY");
    }

}
