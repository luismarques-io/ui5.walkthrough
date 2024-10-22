import Controller from "sap/ui/core/mvc/Controller";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import Component from "../Component";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class Detail extends Controller {
    onInit(): void {
        const router = (<Component>this.getOwnerComponent()).getRouter();
        router.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    }

    onObjectMatched(event: Route$PatternMatchedEvent): void {
        this.getView().bindElement({
            path: "/" + window.decodeURIComponent((<any>event.getParameter("arguments")).invoicePath),
            model: "invoice",
        });
    }
}
