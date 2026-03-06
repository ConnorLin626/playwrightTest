import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, DateSelect } from '../../../lib';
import moment = require("moment");

@log export class CreateManageAlertPage extends Page {
    constructor() {
        super();
    }


    // alert list page
    @component('//input[@id="alerts-filter"]') public alertsFilter: TextInput;

    // High / Low Balance Alert
    @component('//button[@id="BnkAlrtHigLow-create"]') public createHLBalanceAlertButton: Button;
    @component('//span[@id="alert-expand-type-BnkAlrtHigLow"]') public showHLBalanceAlerts: Button;
    @component('//li[@id="BnkAlrtHigLow-account-0"]') public higLowAccount1: TextInput;
    @component('//li[@id="BnkAlrtHigLow-account-1"]') public higLowAccount2: TextInput;
    @component('//label[@id="BnkAlrtHigLow-alertName-0"]') public higLowThreshold: TextInput;
    @component('//li[@id="BnkAlrtHigLow-alert-0"]') public higLowSendTo: TextInput;
    @component('//li[@id="BnkAlrtHigLow-alert-1"]') public MobilLigLowSendTo: TextInput;
    @component('//*[@id="BnkAlrtHigLow-delete-0"]') public deleteHLBalanceAlerts: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;

    // Periodic Balance Alert
    @component('//button[@id="BNKOfrTyDePeB-create"]') public createPeriodicBalanceAlertButton: Button;
    @component('//span[@id="alert-expand-type-BNKOfrTyDePeB"]') public showPeriodicAlertButton: Button;
    @component('//li[@id="BNKOfrTyDePeB-account-0"]') public periodicAccount1: TextInput;
    @component('//li[@id="BNKOfrTyDePeB-account-1"]') public periodicAccount2: TextInput;
    @component('//li[@id="BNKOfrTyDePeB-alert-0"]') public periodicSendTo: TextInput;
    @component('//span[@id="alert-nums-BNKOfrTyDePeB"]') public periodicAlertNums: TextInput;

    // Fixed Deposit Maturity Alert
    @component('//button[@id="FixedDepsAlt-create"]') public createFixedDepositAlertButton: Button;
    @component('//span[@id="alert-expand-type-FixedDepsAlt"]') public showFixedDepsAlertButton: Button;
    @component('//li[@id="FixedDepsAlt-account-0"]') public fixedDepsAccount1: TextInput;
    @component('//li[@id="FixedDepsAlt-account-1"]') public fixedDepsAccount2: TextInput;
    @component('//span[@id="alert-nums-FixedDepsAlt"]') public fixedDepsAlertNums: TextInput;

    // Loans Overdue Alert
    @component('//button[@id="LoansOverAlt-create"]') public createLoansOverdueAlertButton: Button;
    @component('//span[@id="alert-expand-type-LoansOverAlt"]') public showLoansOverdueAlertButton: Button;
    @component('//div[@id="LoansOverAlt-edit-0"]') public editLoansOverdueAlertButton: Button;
    @component('//li[@id="LoansOverAlt-account-0"]') public loansOverAltAccount1: TextInput;
    @component('//li[@id="LoansOverAlt-account-1"]') public loansOverAltAccount2: TextInput;
    @component('//span[@id="alert-nums-LoansOverAlt"]') public loansOverAlertNums: TextInput;

    // Loans Payments Due Date Alert
    @component('//button[@id="LoansPayDDA-create"]') public createLoansPaymentsAlertButton: Button;
    @component('//span[@id="alert-expand-type-LoansPayDDA"]') public showLoansPaymentsAlertButton: Button;
    @component('//li[@id="LoansPayDDA-account-0"]') public loansPaymentsAltAccount1: TextInput;
    @component('//li[@id="LoansPayDDA-account-1"]') public loansPaymentsAltAccount2: TextInput;
    @component('//span[@id="alert-nums-LoansPayDDA"]') public loansPaymentsAlertNums: TextInput;

    // Incoming Funds Alert 
    @component('//button[@id="IncoFundsAlt-create"]') public createIncomingFundsAlertButton: Button;
    @component('//span[@id="alert-expand-type-IncoFundsAlt"]') public showIncomingFundsAlertButton: Button;
    @component('//div[@id="IncoFundsAlt-edit-0"]') public editIncomingFundsAlertButton: Button;
    @component('//li[@id="IncoFundsAlt-account-0"]') public incomingFundsAltAccount1: TextInput;
    @component('//li[@id="IncoFundsAlt-account-1"]') public incomingFundsAltAccount2: TextInput;
    @component('//span[@id="alert-nums-IncoFundsAlt"]') public incomingFundsAlertNums: TextInput;
    @component('//input[@name="incomingAmountGreaterNumber"]') public incomingFundsAlertGreaterInput: TextInput;

    // Remittance & MT103 Advice Alert
    @component('//button[@id="BNKAlrtRemAdv-create"]') public createRemittanceMT103AlertButton: Button;
    @component('//span[@id="alert-expand-type-BNKAlrtRemAdv"]') public showRemittanceMT103AlertButton: Button;
    @component('//li[@id="BNKAlrtRemAdv-account-0"]') public remittanceMT103AltAccount1: TextInput;
    @component('//li[@id="BNKAlrtRemAdv-account-1"]') public remittanceMT103AltAccount2: TextInput;
    @component('//span[@id="alert-nums-BNKAlrtRemAdv"]') public remittanceMT103AlertNums: TextInput;

    // Credit Confirmation Alert
    @component('//button[@id="CdtCfmnAltCd-create"]') public createCreateConfirmationAlertButton: Button;
    @component('//span[@id="alert-expand-type-CdtCfmnAltCd"]') public showCreateConfirmationAlertButton: Button;
    @component('//div[@id="CdtCfmnAltCd-edit-0"]') public editCreateConfirmationAlertButton: Button;
    @component('//li[@id="CdtCfmnAltCd-account-0"]') public createConfirmationAltAccount1: TextInput;
    @component('//li[@id="CdtCfmnAltCd-account-1"]') public createConfirmationAltAccount2: TextInput;
    @component('//span[@id="alert-nums-CdtCfmnAltCd"]') public createConfirmationAlertNums: TextInput;

    // Payment Statuses Alert
    @component('//button[@id="BNKAlrtPmtStu-create"]') public createPaymentStatusAlertButton: Button;
    @component('//span[@id="alert-expand-type-BNKAlrtPmtStu"]') public showPaymentStatusAlertButton: Button;
    @component('//div[@id="BNKAlrtPmtStu-edit-0"]') public editPaymentStatusAlertButton: Button;
    @component('//li[@id="BNKAlrtPmtStu-account-0"]') public paymentStatusAltAccount1: TextInput;
    @component('//li[@id="BNKAlrtPmtStu-account-1"]') public paymentStatusAltAccount2: TextInput;
    @component('//li[@id="BNKAlrtPmtStu-alert-0"]') public paymentStatusSendTo: TextInput;
    @component('//span[@id="alert-nums-BNKAlrtPmtStu"]') public paymentStatusAlertNums: TextInput;
    @component('//*[@id="BNKAlrtPmtStu-alertName-0"]') public paymentStatusAlertName: TextInput;

    // create page
    @component('//input[@id="search"]') public search: TextInput;
    @component('//div[@id="label-multi-dropdown-alertAccount"]') public alertAccountMultiSelection: Button;
    @component('//input[@id="alertAccount-0"]') public accountOption1: Button;
    @component('//input[@name="highThreshold"]') public highThresholdInput: TextInput;
    @component('//input[@name="lowThreshold"]') public lowThresholdInput: TextInput;
    @component('//input[@name="alertThreshold"]') public alertThresholdInput: TextInput;
    @component('//date-picker[@formcontrolname="startDate"]') public startDate: DateSelect;
    @component('//div[@id="label-multi-dropdown-sendEmails"]') public sendEmailMultiSelection: Button;
    @component('//input[@id="sendEmails-0"]') public sendEmailOption1: Button;
    @component('//button[@id="btn-save-publish"]') public submitButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//input[@name="sendTime"]') public sendTime: TextInput;
    @component('//input[@name="beforeDate"]') public beforeDate: TextInput;
    @component('//input[@id="ux-input-password-0"]') public alertPassword: TextInput;
    @component('//input[@id="ux-input-password-1"]') public alertConfirmPassword: TextInput;

    @component('//input[@id="Created"]') public alertCreateCheckbox: Button;
    @component('//input[@id="Modified"]') public alertModifiedCheckbox: Button;
    @component('//input[@id="Pending Verification"]') public alertPendingVerificationCheckbox: Button;
    @component('//input[@id="Pending Approval"]') public alertPendingApprovalCheckbox: Button;
    @component('//input[@id="Pending Release"]') public alertPendingReleaseCheckbox: Button;
    @component('//input[@id="Rejected"]') public alertRejectedCheckbox: Button;
    @component('//input[@id="Sent"]') public alertSentCheckbox: Button;
    @component('//input[@id="Failed"]') public alertFailedCheckbox: Button;

    @component('//input[@id="isSendMobile"]') public isSendMobile: Button;
    @component('//input[@id="isSendSMS"]') public isSendSMS: Button;
    @component('//button[@id="addNewMobile"]') public addNewMobile: Button;

    @component('//input[@id="nickname0"]') public nickname0: TextInput;

    // @component('//*[@id="countryCode0"]') public countryCode0: Button;
    // @component('//*[@id="countryCode0"]/div') public countryCodeSelection0: Button;
    @component('//*[@id="countryCode0"]/div/div[1]/input') public countryCodeSelection: TextInput;
    @component('//*[@id="countryCode0"]/div/div/ul/li[1]') public countryCodeOption0: Button;
    @component('//input[@id="areaCode0"]') public areaCode0: TextInput;
    @component('//input[@id="mobileNumber0"]') public mobileNumber0: TextInput;
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

    public async loadDialog() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.dismissButton.element),
            this.dismissButton.getTimeOut()
        );
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
