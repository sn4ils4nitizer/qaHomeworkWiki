import {By} from "selenium-webdriver";
import { GoogleBasePage } from "./2.8.2googleBasePage";

export class Google extends GoogleBasePage {
    searchBar: By = By.name("q");
    results: By = By.id("rso");
    constructor() {
        super({url: "https://www.google.com"});
    };
    async search(searchTerm: string) {
        return this.setInput(this.searchBar, `${searchTerm}\n`);
    };
    async getResults() {
        return this.getText(this.results);
    };
};