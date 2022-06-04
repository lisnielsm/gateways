/// <reference types="cypress" />

describe("<CreateAccount />", () => {
    it("<CreateAccount /> Validation and alerts", () => {
        cy.visit("/createAccount");

        const userId = Cypress.env("TEST_UID");
        cy.log(userId)

        // Check for Create Account title
        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Create account");

        // Click on create button with empty form fields
        cy.get("[data-cy=createBtn]").click();

        cy.get("[data-cy=name] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Name is required");

        cy.get("[data-cy=email] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Email is required");

        cy.get("[data-cy=password] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Password is required");

        cy.get("[data-cy=confirmpassword] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Confirm password is required");

        // Check for incorrect email alert
        cy.get("[data-cy=name]").type("Lisniel");
        cy.get("[data-cy=email]").type("lisniel@test");
        cy.get("[data-cy=password]").type("123456");
        cy.get("[data-cy=confirmpassword]").type("123456");

        cy.get("[data-cy=email] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Please enter a correct email");

        cy.get("[data-cy=name] p").should("not.exist");
        cy.get("[data-cy=password] p").should("not.exist");
        cy.get("[data-cy=confirmpassword] p").should("not.exist");

        // Check for short length password alert
        cy.get("[data-cy=name]").clear().type("Lisniel");
        cy.get("[data-cy=email]").clear().type("lisniel@test.com");
        cy.get("[data-cy=password]").clear().type("123");
        cy.get("[data-cy=confirmpassword]").clear().type("123");

        cy.get("[data-cy=password] p")
            .should("exist")
            .invoke("text")
            .should("equal", "Password must have at least 6 characters");

        cy.get("[data-cy=name] p").should("not.exist");
        cy.get("[data-cy=email] p").should("not.exist");
        cy.get("[data-cy=confirmpassword] p").should("not.exist");

        // Check for password doesn't match alert
        cy.get("[data-cy=name]").clear().type("Lisniel");
        cy.get("[data-cy=email]").clear().type("lisniel@test.com");
        cy.get("[data-cy=password]").clear().type("123456");
        cy.get("[data-cy=confirmpassword]").clear().type("123");

        cy.get("[data-cy=confirmpassword] p")
            .should("exist")
            .invoke("text")
            .should("equal", "The confirmation password does not match");

        cy.get("[data-cy=name] p").should("not.exist");
        cy.get("[data-cy=email] p").should("not.exist");
        cy.get("[data-cy=password] p").should("not.exist");

    });

    it("<CreateAccount /> Successfully create a new account to user", () => {

        cy.get("[data-cy=name]").clear().type("Lisniel Sanchez");
        cy.get("[data-cy=email]").clear().type("lisniel@test2.com");
        cy.get("[data-cy=password]").clear().type("123456");
        cy.get("[data-cy=confirmpassword]").clear().type("123456");

        cy.get("[data-cy=createBtn]").click();

        //cy.login();

        cy.visit("/");

        // From home
        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Gateways List");

        // cy.get("[data-cy=btnCloseSesion]").should("exist").invoke("text").should("equal", "Close Session"); 
        // cy.get("[data-cy=btnCloseSesion]").click();
    });

});