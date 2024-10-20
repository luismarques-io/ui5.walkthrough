import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {
  onInit(): void {
    // set data model on view
    const data = {
      recipient: {
        name: "World"
      }
    };
    const dataModel = new JSONModel(data);
    // because of "strict" mode in tsconfig.json a null check is required for this.getView()
    this.getView()?.setModel(dataModel);

    // set i18n model on view
    const i18nModel = new ResourceModel({
      bundleName: "ui5.walkthrough.i18n.i18n"
    });
    this.getView()?.setModel(i18nModel, "i18n");
  }

  onShowHello(): void {
    // read msg from i18n model
    const recipient = (<JSONModel>this.getView()?.getModel())?.getProperty("/recipient/name");
    const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle();
    const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
    // show message
    MessageToast.show(msg);
  }
}
