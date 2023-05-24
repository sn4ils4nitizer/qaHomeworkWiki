import {Builder, By, Capabilities, until, WebDriver, } from "selenium-webdriver";
  const chromedriver = require("chromedriver");

  const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();

  class employeePageObject {
      driver: WebDriver;
      url: string = "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";
        //FILL OUT LOCATORS CONSTRUCTOR AND METHODS IN ORDER TO PASS THE TEST
      addEmployee: By = By.name("addEmployee");
      newEmployee: By = By.xpath('//li[@class="listText"][11]');
      nameInput: By = By.name("nameEntry");
      phoneInput: By = By.name("phoneEntry");
      titleInput: By = By.name("titleEntry");
      saveButton: By = By.id("saveBtn");
      header: By = By.css('.titleText');
      employeeCardBigName: By = By.id("employeeTitle");
      constructor(driver: WebDriver){
        this.driver = driver
      };
      async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.header));
      };
      async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).click();
      };
      async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy));
        await this.driver.findElement(elementBy).sendKeys(keys);
      };
      async getText(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        await this.driver.findElement(elementBy).getText();
      };
  };

  const emPage = new employeePageObject(driver)

  describe("Practicing PageObjects", () => {
    beforeEach(async () => {
        await emPage.navigate()
    });
    afterAll(async () =>{
        await driver.quit()
    });

    test("adding an employee", async () => {
      await driver.wait(until.elementLocated(emPage.header))
      await driver.findElement(emPage.addEmployee).click();
      await driver.findElement(emPage.newEmployee).click();
      await driver.findElement(emPage.nameInput).click();
      await driver.findElement(emPage.nameInput).clear();
      await driver.findElement(emPage.nameInput).sendKeys("The Knight Who Says NI");
      await driver.findElement(emPage.phoneInput).click();
      await driver.findElement(emPage.phoneInput).clear();
      await driver.findElement(emPage.phoneInput).sendKeys("1234567890");
      await driver.findElement(emPage.titleInput).click();
      await driver.findElement(emPage.titleInput).clear();
      await driver.findElement(emPage.titleInput).sendKeys("Shrubbery");
      await driver.findElement(emPage.saveButton).click();
      let result = await driver.findElement(emPage.employeeCardBigName).getText()
      expect(result).toContain("The Knight Who Says NI");  
    });
});
  
      
  /* this is a commment */