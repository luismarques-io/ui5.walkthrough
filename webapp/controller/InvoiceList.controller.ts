import ObjectListItem from "sap/m/ObjectListItem";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Event from "sap/ui/base/Event";
import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import ListBinding from "sap/ui/model/ListBinding";
import Component from "../Component";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class App extends Controller {
    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR",
        });
        this.getView()?.setModel(viewModel, "view");
    }

    onFilterInvoices(event: SearchField$SearchEvent): void {
        // build filter array
        const filter = [];
        const query = event.getParameter("query");
        if (query) {
            filter.push(new Filter("ProductName", FilterOperator.Contains, query));
        }

        // filter binding
        const list = this.byId("invoiceList");
        const binding = list?.getBinding("items") as ListBinding;
        binding?.filter(filter);
    }

    onPress(event: Event): void {
        const item = <ObjectListItem>event.getSource();

        const router = (<Component>this.getOwnerComponent()).getRouter();
        router.navTo("detail", {
            invoicePath: window.encodeURIComponent(item.getBindingContext("invoice").getPath().substr(1)),
        });
    }
}
