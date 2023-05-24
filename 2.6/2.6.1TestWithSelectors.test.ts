import {Builder, By, Capabilities, WebDriver, until} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();

describe("Filling in the blanks", () => {
    
    beforeEach(async () => {
        await driver.get('https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html')
    });
    afterAll(async () => {
        await driver.quit();
    });
    
    // Elements are located by xpath and set to be constants
    const hdrInput: By = By.xpath('//input[@name="hdrInput"]'); //fill in the blank
    const mkeInput: By = By.xpath('//input[@name="mkeInput"]'); //fill in the blank
    const oaiInput: By = By.xpath('//input[@name="oriInput"]'); //fill in the blank
    const nameInput: By = By.xpath('//input[@name="namInput"]'); //fill in the blank
    const clrBtn: By = By.xpath('//button[@id="clearBtn"]'); //fill in blank 
    const submitBtn: By = By.xpath('//button[@id="saveBtn"]'); //fill in blank
    // Element is located by CSS and is set to be a constant
    const errorMsg: By = By.css('#validHeader'); // fill in blank 

    // Test was missing async
    test("filling in the blanks for real", async () => {
        // Driver located Header field and types "ABCD"
        await driver.findElement(hdrInput).sendKeys("ABCD");
        // Driver locates MKE field and types "ABCD"
        await driver.findElement(mkeInput).sendKeys("ABCD");
        // Driver locates Originating Agency Identifier field and types "FBI"
        await driver.findElement(oaiInput).sendKeys("FBI");
        // Driver locates Name field and types "Zyn Nicotine Pouches"
        await driver.findElement(nameInput).sendKeys("Zyn Nicotine Pouches");
        // Drive clicks the Submit button
        await driver.findElement(submitBtn).click();
        // Driver find the error message and extracts it's string value
        let errorMsgText = await driver.findElement(errorMsg).getText();
        // Assertion is made to confirm that errorMsgText containts "Errors Received:" string
        expect(errorMsgText).toContain("Errors Received:");
        // Driver clicks the clear button
        await driver.findElement(clrBtn).click();
        
    });
});