// Custom Cypress command to read Xpath value from a JSON fixture file based on the element name

Cypress.Commands.add('readXpath', (nameOfElement) => {

    cy.fixture('example.json').then((data) => {
        var valueOfXpath = data[nameOfElement];
        return valueOfXpath
    })
})
// Custom Cypress command to click an element using its Xpath

Cypress.Commands.add('clickByXpath', (nameOfElement) => {
    console.log("clicking element ... " + nameOfElement)
    cy.readXpath(nameOfElement).then((valueOfXpath) => {
        cy.xpath(valueOfXpath).filter(':visible').click()
    })

});
// Custom Cypress command to type text into an element identified by its Xpath

Cypress.Commands.add('typeTextToElement', (nameOfElement, text) => {
    cy.readXpath(nameOfElement).then((valueOfXpath) => {
        cy.xpath(valueOfXpath).filter(':visible').type(text)
    })
});

// Custom Cypress command to select an option from a dropdown on the list page

Cypress.Commands.add('ListPagePropertyDropDownSelect', (ddChoiceToSelect) => {
    cy.readXpath("PropertyTypeDDListPage")
        .then((valueOfXpath) => {
            if (valueOfXpath) {
                cy.xpath(valueOfXpath)
                    .filter(':visible')
                    .click()
                    .then(() => {
                        cy.readXpath("PropertyTypeDDChoiceListPage")
                            .then((valueOfXpathChoice) => {
                                if (valueOfXpathChoice) {
                                    cy.xpath(valueOfXpathChoice.replaceAll('PROPERTIEHERE', ddChoiceToSelect))
                                        .click()
                                } else {
                                    console.error("Xpath choice value is undefined or null.");
                                }
                            });
                    });
            } else {
                console.error("Xpath value is undefined or null.");
            }
        });
});


// Select an option from a dropdown on the home page
Cypress.Commands.add('HomePagePropertyDropDownSelect', (ddChoiceToSelect) => {
    cy.readXpath("PropertyTypeDDHomePage")
        .then((valueOfXpath) => {
            cy.xpath(valueOfXpath)
                .filter(':visible')
                .click()
                .then(() => {
                    cy.readXpath("PropertyTypeDDChoiceHomePage")
                        .then((valueOfXpathChoice) => {
                            cy.xpath(valueOfXpathChoice.replaceAll('PROPERTIEHERE', ddChoiceToSelect))
                                .click()
                        })
                })
        })
});




//For a hide XHR in a TestRunner
const app = window.top
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style')
    style.innerHTML = '.command-name-request , .command-name-xhr {display:none} '
    style.setAttribute('data-hide-command-log-request', "")

    app.document.head.appendChild(style)
}