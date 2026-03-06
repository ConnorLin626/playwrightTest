import { TestPages } from '../../../lib';
import { ProfileSettingsPage } from "./ProfileSettingsPage";

export {
    ProfileSettingsPage
};

export class ProfileSettingsPages extends TestPages {
    public profileSettingsPage : ProfileSettingsPage;
    constructor() {
        super();
        this.profileSettingsPage = new ProfileSettingsPage();
    }
}
