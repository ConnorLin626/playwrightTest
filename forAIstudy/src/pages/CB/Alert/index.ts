import { TestPages } from '../../../lib';
import { CreateManageAlertPage } from './CreateManageAlertPage';
import { AlertNotificationsPage } from './AlertNotificationsPage';
import { ManageSavedContactsPage } from './ManageSavedContactsPage';

export {
    CreateManageAlertPage,
    AlertNotificationsPage,
    ManageSavedContactsPage
};

export class AlertsPages extends TestPages {
    public createManageAlertPage: CreateManageAlertPage;
    public alertNotificationsPage: AlertNotificationsPage;
    public manageSavedContactsPage: ManageSavedContactsPage;

    constructor() {
        super();
        this.createManageAlertPage = new CreateManageAlertPage();
        this.alertNotificationsPage = new AlertNotificationsPage();
        this.manageSavedContactsPage = new ManageSavedContactsPage();
    }

}
