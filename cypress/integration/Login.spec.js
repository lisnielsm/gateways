/// <reference types="cypress" />

describe("<Login />", () => {
    it("<Login /> Validation and alerts", () => {
        const userId = Cypress.env("TEST_UID");
        cy.log(userId)

        // Visit home and redirect to login
        cy.visit("/");

        // Check for Login title
        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Login");

        // Click on login button with empty form fields
        cy.get("[data-cy=loginBtn]").click();

        cy.get("[data-cy=email] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Email is required");

        cy.get("[data-cy=password] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Password is required");

        // Check for incorrect email alert
        cy.get("[data-cy=email]").type("lisniel@test");
        cy.get("[data-cy=password]").type("123456");

        cy.get("[data-cy=email] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Please enter a correct email");

        cy.get("[data-cy=password] p").should("not.exist");

        // Check for short length password alert
        cy.get("[data-cy=email]").clear().type("lisniel@test.com");
        cy.get("[data-cy=password]").clear().type("123");

        cy.get("[data-cy=password] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Password must have at least 6 characters");

        cy.get("[data-cy=email] p").should("not.exist");

        // Try to autheticate a user with incorrect email or password
        cy.get("[data-cy=email]").clear().type("lisniel99@test.com");
        cy.get("[data-cy=password]").clear().type("123456789");

        cy.get("[data-cy=loginBtn]").click();

        // Sweetalert2 show
        cy.get('.swal2-container').should("exist");
        cy.get('.swal2-container h2.swal2-title')
            .should("exist")
            .invoke("text")
            .should("equal", "Incorrect login");

        cy.get('.swal2-container div.swal2-html-container')
            .should("exist")
            .invoke("text")
            .should("equal", "There was an error with your user or your password");

        cy.get('.swal2-container button.swal2-confirm.swal2-styled').click();

    });

    it("<Login /> Successfully authenticate a user", () => {

        cy.get("[data-cy=email]").clear().type("lisniel@test.com");
        cy.get("[data-cy=password]").clear().type("123456");

        cy.get("[data-cy=loginBtn]").click();

        cy.login();

        // From home
        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Gateways List");

        cy.get("[data-cy=btnCloseSesion]").click();
    });

    // it("Adds document to test_hello_world collection of Firestore", () => {
    //     cy.callFirestore("add", "test_hello_world", { some: "value" });
    // });

});