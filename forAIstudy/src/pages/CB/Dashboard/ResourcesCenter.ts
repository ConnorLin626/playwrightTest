import { Page, component, log, TextInput, Button } from "../../../lib";
import { browser, ExpectedConditions } from "protractor";

@log export class ResourcesCenter extends Page {
    
    constructor() {
        super();
    }

    @component('//label[@ng-reflect-translate="resources.download"]') public downLoad: Button;
    @component('//span[@class="icon-download-active margin-right-4"]') public UATDownLoad: Button;
    

    public async loadCondition() {
        throw new Error("Method not implemented.");
    }

}
