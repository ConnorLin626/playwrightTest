/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { TestPages } from '../../../lib';
import { LimitOrderPage } from "./LimitOrderPage";
import { InstantFXConversionPage } from "./InstantFXConversionPage";

export {
    LimitOrderPage,InstantFXConversionPage
};

export class ForeignExchangePages extends TestPages {
    public limitOrderPage : LimitOrderPage;
    public instantFXConversionPage : InstantFXConversionPage;
    constructor() {
        super();
        this.limitOrderPage = new LimitOrderPage();
        this.instantFXConversionPage = new InstantFXConversionPage();
    }
}
