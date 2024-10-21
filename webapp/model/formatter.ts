import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export default {
    statusText: function (this: Controller, status: string): string | undefined {
        switch (status) {
            case "A":
                return "New";
            case "B":
                return "In Progress";
            case "C":
                return "Done";
            default:
                return status;
        }

        const resourceBundle = <ResourceBundle>(<ResourceModel>this?.getOwnerComponent()?.getModel("i18n"))?.getResourceBundle();

        console.log({ self: this, status, resourceBundle });

        switch (status) {
            case "A":
                return resourceBundle.getText("invoiceStatusA");
            case "B":
                return resourceBundle.getText("invoiceStatusB");
            case "C":
                return resourceBundle.getText("invoiceStatusC");
            default:
                return status;
        }
    },
};
