import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

import Dialog from "sap/m/Dialog";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class HelloPanel extends Controller {
    private dialog: Dialog;

    onShowHello(): void {
        // read msg from i18n model
        // functions with generic return values require casting
        const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle();
        const recipient = (<JSONModel>this.getView()?.getModel())?.getProperty("/recipient/name");
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        MessageToast.show(msg);
    }

    async onOpenDialog(): Promise<void> {
        this.dialog ??= await (<Promise<Dialog>>this.loadFragment({
            name: "ui5.walkthrough.view.HelloDialog",
        }));
        this.dialog.open();
    }
}
