import { Page, component, log, TextInput, Button } from "../../../lib";

@log export class ResourcesCenter extends Page {
    
    constructor() {
        super();
    }
    @component('//span[@class="icon-download-active"]') public downLoad:Button;
    @component('//span[@class="icon-download-active"]') public UATDownLoad:Button;

    public async loadCondition() {
        throw new Error("Method not implemented.");
    }

}
