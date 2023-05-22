import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
    Key,
} from "selenium-webdriver";

//Initialize chrome webdriver
const chromedriver = require("chromedriver");

//Sets chrome driver settings and lets us use "driver" as a shortcut
const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
// sets constant variables for frequently used web elementss
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");

describe("Employee Manager 1.2", () => {

    beforeEach(async () => {
        await driver.get(
        "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"
        );
    });
    // Allows tests to run after some may fail and shuts down the browser
    afterAll(async () => {
        await driver.quit();
    });

    // begins the test suite
    describe("handles unsaved, canceled, and saved changes correctly", () => {
       // Creates and  names a test, allows further tests to run if this one fails with "async"
        test("An unsaved change doesn't persist", async () => {
        /*
        This test follows these steps:
        1. Open Bernice Ortiz
        2. Edit the name input
        3. Open Phillip Weaver
        4. Open Bernice Ortiz
        5. Verify the name field is the original name
        */

        //Driver find Bernice Ortiz on the employee list and clicks the name pulling up the employee card
        await driver.findElement(bernice).click();
        await driver.wait(
            until.elementIsVisible(await driver.findElement(nameDisplay))
        );
        //Driver clears the name input field on the employee card
        await driver.findElement(nameInput).clear();
        //Driver enters "Test Name" in the employee field
        await driver.findElement(nameInput).sendKeys("Test Name");
        //Driver clicks on the employee Philip Weaver
        await driver.findElement(phillip).click();
        //Driver checks to confirm that the employee card for Philip Weaver has loaded and is correctly displayed
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(nameDisplay),
            "Phillip"
            )
        );
        // Driver clicks back on Bernice Ortiz on the employee list
        await driver.findElement(bernice).click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(nameDisplay),
            "Bernice"
            )
        );

        // Tells the test what is the expected result
        expect(
            await (await driver.findElement(nameInput)).getAttribute("value")
        ).toBe("Bernice Ortiz");
        });

        // new test
        test("A canceled change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
           // Web driver clicks on Philip in the employee list
            await driver.findElement(phillip).click();
            // confirming correct employee is selected
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameDisplay))
            );
            // employee name is cleared
            await driver.findElement(nameInput).clear();
            // test name is typed in the employee name field
            await driver.findElement(nameInput).sendKeys("Test Name");
            // cancel button is clicked
            await driver.findElement(cancelButton).click();
            //test checks that the employee name remain "Philip Weaver after pressing the cancel button"
            expect(
                await (await driver.findElement(nameInput)).getAttribute("value")
            ).toBe("Phillip Weaver");
        });

        test("A saved change persists", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Save the change
            4. Open Phillip Weaver
            5. Open Bernice Ortiz's old record
            5. Verify the name field is the edited name
            */
           // Web Driver finds Bernice on the employee list
            await driver.findElement(bernice).click();
            //web driver confirms that Bernice was selected
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameDisplay))
            );
            //the employee name is cleared
            await driver.findElement(nameInput).clear();
            //"Test Name" is typed into employee name field
            await driver.findElement(nameInput).sendKeys("Test Name");
            //saved button is clicked
            await driver.findElement(saveButton).click();
            //Philip is selected from the employee list
            await driver.findElement(phillip).click();
            //Web driver confirms Philip is selected
            await driver.wait(
                until.elementTextContains(
                await driver.findElement(nameDisplay),
                "Phillip"
                )
            );
            //Bernice is selected on the list to the left
            await driver.findElement(bernice).click();
            //checks for and confirm that the name is "Test Name"
            expect(
                await (await driver.findElement(nameInput)).getAttribute("value")
            ).toBe("Test Name");
    });
});

    describe("handles error messages correctly", () => {
        test("shows an error message for an empty name field", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            */
           //Bernice is clicked on the employee list
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameDisplay))
            );
            //name  input is cleared
            await driver.findElement(nameInput).clear();
            //web driver enters space and deletes it
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            //save button is pressed
            await driver.findElement(saveButton).click();
            //web driver locates the error message
            await driver.wait(until.elementLocated(errorCard));
            // checks for the correct error message
            expect(await (await driver.findElement(errorCard)).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
        });
        test("lets you cancel out of an error message", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            5. Cancel the change
            6. Verify the error is gone
            */
           //Bernice is clicked on the employee list
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameDisplay))
            );
            // name input is cleared
            await driver.findElement(nameInput).clear();
            //web driver types space and back space in  the employee name field
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            //save button is clicked
            await driver.findElement(saveButton).click();
            //web driver checks that the error message appears
            await driver.wait(until.elementLocated(errorCard));
            expect(await (await driver.findElement(errorCard)).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
            //space is typed in the employee name field
            await driver.findElement(nameInput).sendKeys(Key.SPACE);
            //cancel button is clicked
            await driver.findElement(cancelButton).click();
            driver.wait(() => true, 500);
            //check to see that error message does not appear
            expect(await driver.findElements(errorCard)).toHaveLength(0);
        });
    });
});