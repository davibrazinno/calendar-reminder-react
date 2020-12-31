function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function toIsoString(date) {
    const dateTime = date.toISOString()
    return dateTime.substring(0, dateTime.length-8)
}

context('Create Reminder Tests', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it("should not create a reminder without the description", () => {

        cy.get("[data-testid=NewReminderButton]")
            .click()
            .get("[data-testid=SaveReminderButton]")
            .click()
            .get("p").contains("The description is required")
    })

    it("should create a reminder with description, date, time, city and color", () => {
        const description = "Learn more about cypress"
        const dateTime = toIsoString(addDays(new Date(), 1))
        const city = "New York"
        const color = "#B80000"

        cy.get("[data-testid=NewReminderButton]")
            .click()
            .get("[data-testid=DescriptionInput]")
            .type(description)
            .get("#dateTime")
            .click()
            .type(dateTime)
            .get("[data-testid=CityAutocompleteField]")
            .click()
            .type(city)
            .get("[data-testid=autocomplete-option]")
            .contains(city)
            .click()
            .get("[data-testid=select-color]")
            .click()
            .get(`[title='${color}']`)
            .click()
            .get("[data-testid=SaveReminderButton]")
            .click()
            .get("[data-testid=Reminder]")
            .contains(description)
            .get("[data-testid=Reminder]")
            .contains(city)
    })

})


