import { TestPages } from '../../../lib';
import { GroupOverviewPage } from './GroupOverviewPage';
import { EnrolCompanyProductPage } from './EnrolCompanyProductPage';
import { OpenBusinessAccountPage } from './OpenBusinessAccountPage';
import { DBSBusinessMultiplierPage } from './Register_ManageDBSBusinessMultiplierPage';

export {
    GroupOverviewPage,EnrolCompanyProductPage,OpenBusinessAccountPage,DBSBusinessMultiplierPage
};

export class GroupOverviewPages extends TestPages {
    public GroupOverviewPage: GroupOverviewPage;

    constructor() {
        super();
        this.GroupOverviewPage = new GroupOverviewPage();
    }

}
export class EnrolCompanyProductPages extends TestPages {
    public EnrolCompanyProductPage: EnrolCompanyProductPage;

    constructor() {
        super();
        this.EnrolCompanyProductPage = new EnrolCompanyProductPage();
    }

}

export class OpenBusinessAccountPages extends TestPages {
    public OpenBusinessAccountPage: OpenBusinessAccountPage;

    constructor() {
        super();
        this.OpenBusinessAccountPage = new OpenBusinessAccountPage();
    }

}


export class DBSBusinessMultiplierPages extends TestPages {
    public DBSBusinessMultiplierPage: DBSBusinessMultiplierPage;

    constructor() {
        super();
        this.DBSBusinessMultiplierPage = new DBSBusinessMultiplierPage();
    }

}