import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Component from "../Component";
import ProductRating, { ProductRating$ChangeEvent } from "../control/ProductRating";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class Detail extends Controller {
    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR",
        });
        this.getView().setModel(viewModel, "view");

        const router = (<Component>this.getOwnerComponent()).getRouter();
        router.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    }

    onObjectMatched(event: Route$PatternMatchedEvent): void {
        (<ProductRating>this.byId("rating")).reset();
        this.getView().bindElement({
            path: "/" + window.decodeURIComponent((<any>event.getParameter("arguments")).invoicePath),
            model: "invoice",
        });
    }

    onNavBack(): void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();

        if (previousHash !== undefined) {
            window.history.go(-1);
        } else {
            const router = (<Component>this.getOwnerComponent()).getRouter();
            router.navTo("overview");
        }
    }

    onRatingChange(event: ProductRating$ChangeEvent): void {
        const value = event.getParameter("value");
        const resourceBundle = <ResourceBundle>(<ResourceModel>this?.getView().getModel("i18n"))?.getResourceBundle();

        MessageToast.show(resourceBundle.getText("ratingConfirmation", [value]));
    }
}
