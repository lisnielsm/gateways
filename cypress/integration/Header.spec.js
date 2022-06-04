/// <reference types="cypress" />

describe("<Header />", () => {

    it("<Header /> Validation", () => {
        cy.visit("/login");

        cy.get("[data-cy=logo]")
            .should("exist")
            .invoke("text")
            .should("equal", "Gateways")

        cy.get("[data-cy=loginHeaderBtn]")
            .should("exist")
            .invoke("text")
            .should("equal", "Login")

        cy.get("[data-cy=createAccountBtn]")
            .should("exist")
            .invoke("text")
            .should("equal", "Create Account")

        cy.get("[data-cy=greeting]").should("not.exist");
        cy.get("[data-cy=btnCloseSesion]").should("not.exist");
    });

    it("<Header /> Route validation", () => {
        cy.visit("/createAccount");

        cy.get("[data-cy=loginHeaderBtn]").click();

        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Login");

        cy.get("[data-cy=createAccountBtn]").click();

        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Create account");
    });

    // it("<Header /> With an autheticated user", () => {
    //     cy.visit("/login");

    //     cy.login();

    //     cy.get("[data-cy=greeting]")
    //         .should("exist")
    //         .invoke("text")
    //         .should("equal", "Hello Lisniel")

    //     cy.get("[data-cy=btnCloseSesion]")
    //         .should("exist")
    //         .invoke("text")
    //         .should("equal", "Close Session")

    //     cy.get("[data-cy=loginHeaderBtn]").should("not.exist");
    //     cy.get("[data-cy=createAccountBtn]").should("not.exist");
    // });
});