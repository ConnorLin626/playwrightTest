import { TestPages } from '../../../lib';
import { MyProfilePage } from './MyProfilePage';


export {
    MyProfilePage,
};

export class MyProfilePages extends TestPages {
    public MyProfilePage: MyProfilePage;

    constructor() {
        super();
        this.MyProfilePage = new MyProfilePage();
    }

}