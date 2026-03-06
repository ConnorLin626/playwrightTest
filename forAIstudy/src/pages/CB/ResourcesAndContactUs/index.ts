/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ResourcesPage } from './ResourcesPage';
import { TestPages } from '../../../lib';
import { ContactUsPage } from './ContactUsPage';


export {
    ResourcesPage, ContactUsPage
};

export class ResourcesAndContactUsPage extends TestPages {
    public resourcesPage: ResourcesPage;
    public contactUsPage: ContactUsPage;

    constructor() {
        super();
        this.resourcesPage = new ResourcesPage();
        this.contactUsPage = new ContactUsPage();

    }
}