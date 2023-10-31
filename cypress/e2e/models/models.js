import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

// Click the "Show commercial properties only" button
When("Click Show commercial properties only btn", () => {
    cy.clickByXpath("ShowCommercialPropertiesOnlyBtn")

})
// Select property type from dropdown
And("Dropdown property type {string}", (propertie) => {
    cy.ListPagePropertyDropDownSelect(propertie)
})

// Enter search string in the search box and handle suggestions
And("SearchBox Enter {string}", (Str) => {
    cy.typeTextToElement("SearchBar", Str)
        .then(() => {
            cy.clickByXpath("SearchBarFirstSuggestion")
                .then(() => {
                    cy.readXpath("SearchBarSelectedItem")
                        .then((valueOfXpathSelectedItem) => {
                            // Validate if the selected item matches the search string
                            cy.xpath(valueOfXpathSelectedItem).should('have.text', Str)
                        });
                });
        });
});
// Open the first search result
And("Open first result", () => {
    cy.clickByXpath("SearchResoultFirstItem")
})
// Check if the "Available from" text exists
Then("Check if there is a available text", () => {
    cy.readXpath("AvailableFromText").then((xpath) => {
        cy.xpath(xpath).should('exist')
    })
})

// Visit the website and handle exceptions
Given("Go to website", () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Minified React error')) {
            return false;
        }
        return true;
    });
    cy.viewport(1920, 1080);

    cy.visit("https://www.propertyfinder.bh/")
})
// Select property type on the homepage

When("Select property type as {string}", propertyType => {
    cy.HomePagePropertyDropDownSelect(propertyType)
})
// Click the search button

And("Click Search Button", () => {
    cy.clickByXpath("SearchButton")
})
// Set the maximum price for the property search

And("Set The Price max as {string}", maxValue => {

    cy.clickByXpath("PriceButton")
    cy.typeTextToElement("MaxPriceTextBox", maxValue)

    cy.xpath(`//button[.='${maxValue}']`)
        .click().wait(1000)

    cy.xpath("//*[contains(@class,'styles-module_dropdown-trigger')]//*[text()='Price']").click({ force: true })

})
// Click the Find button to initiate the search

And("Click Find Button", () => {

    cy.clickByXpath('FindButton')

})


//  Does Not Work!!!!!!!!!!!!!!!! Why in Read me
Then("Check Api Method But Its Does Not Work", () => {


    cy.xpath('//*[@aria-label="Properties"]//*[@role="listitem"]').then((elements) => {
        const count = elements.length;
        console.log("Number of elements: " + count);
        return count;
    }).then((count) => {
        cy.request({
            method: 'GET',
            url: 'xxx'
        }).then((res) => {
            const propertiesCount = Object.keys(res.body.pageProps.searchResult.properties).length;
            console.log(`Number of properties: ${propertiesCount}`);
            console.log("Number of elements: " + count);

            expect(count).to.equal(propertiesCount, "property count is not matched");
        });
    });
});
