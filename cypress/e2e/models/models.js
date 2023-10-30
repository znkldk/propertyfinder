import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
Given("Go to website", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Ignore specific error with code 418
        if (err.message.includes('Minified React error')) {
            // Do nothing or handle it as per your requirement
            return false;
        }
        // Handle other uncaught exceptions if necessary
        return true;
    });
    cy.viewport(1920, 1080);

    cy.visit("https://www.propertyfinder.bh/")
})

When("Select property type as {string}", propertyType => {

    cy.xpath('//*[contains(@class," data-filter-type-filter[propertyTypeId]")]')
        .filter(':visible')
        .click()
    cy.xpath(`//*[@class="dropdown-list__item-content dropdown-list__item-button" and (text()="${propertyType}")]`)
        .click()


})

And("Click Search Button", () => {
    cy.xpath('//button[contains(@class,"filter-form-search-button")]')
        .filter(':visible')
        .click()
})

And("Set The Price max as {string}", maxValue => {

    cy.xpath("//*[contains(@class,'styles-module_dropdown-trigger')]//*[text()='Price']").click()
    cy.xpath('//*[@data-testid="popover"]//*[@aria-label="Max. Price (BHD)"]')
        .type(maxValue)
    cy.xpath(`//button[.='${maxValue}']`)
        .click().wait(1000)
    cy.xpath("//*[contains(@class,'styles-module_dropdown-trigger')]//*[text()='Price']").click({ force: true })


})

And("Click Find Button", () => {
    cy.xpath('//*[@data-testid="filters-form-btn-find"]').click()

})

Then("adim3", () => {
    console.log("-------------------------");

    cy.wait(1000);

    cy.xpath('//*[@aria-label="Properties"]//*[@role="listitem"]').then((elements) => {
        const count = elements.length;
        console.log("Number of elements: " + count);
        return count; // Bu count değerini promise olarak döndürüyoruz, sonra kullanabilmek için
    }).then((count) => {
        cy.request({
            method: 'GET',
            url: 'https://www.propertyfinder.bh/_next/data/k43zPeS1lsAQvnOJHLwQa/en/search.json?c=1&t=35&pt=30000&fu=0&ob=mr'
        }).then((res) => {
            const propertiesCount = Object.keys(res.body.pageProps.searchResult.properties).length;
            console.log(`Number of properties: ${propertiesCount}`);
            console.log("Number of elements222222: " + count);

            expect(count).to.equal(propertiesCount, "property count is not matched");
        });
    });
});
