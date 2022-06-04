/// <reference types="cypress" />

import { onCreateGatewaySuccess } from "../../src/services/gatewaySlice";

const dispatch = action => cy.window().its('store').invoke('dispatch', action);

describe("<NewGateway />", () => {
    it("<NewGateway /> Validations and alerts", () => {
        cy.visit("/gateways/new");

        // Check the existence of all elements
        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Create new gateway");

        cy.get("[data-cy=imgContainer]").should("exist");

        cy.get("[data-cy=serialNumber] input")
            .should("exist")
            .should('have.attr', 'placeholder', 'Serial Number')

        cy.get("[data-cy=name] input")
            .should("exist")
            .should('have.attr', 'placeholder', 'Name')

        cy.get("[data-cy=ip] input")
            .should("exist")
            .should('have.attr', 'placeholder', 'IP')

        cy.get("[data-cy=newPeripheralBtn]").should("exist");
        cy.get("[data-cy=backBtn]").should("exist");
        cy.get("[data-cy=newGatewayBtn]").should("exist");

        // Click on create button with empty form fields
        cy.get("[data-cy=newGatewayBtn]").click();

        cy.get("[data-cy=serialNumber] p")
            .should("exist")
            .invoke("text")
            .should("equal", "The serial number is required");

        cy.get("[data-cy=name] p")
            .should("exist")
            .invoke("text")
            .should("equal", "The name is required");

        cy.get("[data-cy=ip] p")
            .should("exist")
            .invoke("text")
            .should("equal", "IP is required");

        // Check for incorrect ip alert
        cy.get("[data-cy=serialNumber]").type("HJIUTQ674");
        cy.get("[data-cy=name]").type("CISCO L3");
        cy.get("[data-cy=ip]").type("192.25.4");

        cy.get("[data-cy=ip] p")
            .should("exist")
            .invoke("text")
            .should("equal", "IP must be a v4 valid IP");

        cy.get("[data-cy=serialNumber] p").should("not.exist");
        cy.get("[data-cy=name] p").should("not.exist");

        // If it is about adding more than 10 peripherals, it should give an alert
        for (let i = 1; i <= 11; i++) {
            cy.get("[data-cy=newPeripheralBtn]").click();
        }

        // Sweetalert2 show
        cy.get('.swal2-container').should("exist");
        cy.get('.swal2-container h2.swal2-title')
            .should("exist")
            .invoke("text")
            .should("equal", "Maximum reached");

        cy.get('.swal2-container div.swal2-html-container')
            .should("exist")
            .invoke("text")
            .should("equal", "Each gateway has a maximum of 10 peripherals");

        cy.get('.swal2-container button.swal2-confirm.swal2-styled').click();
    });

    it("<NewGateway /> Create and delete peripherals", () => {
        cy.visit("/");
        cy.visit("/gateways/new");

        // Add two peripherals
        cy.get("[data-cy=newPeripheralBtn]").click();
        cy.get("[data-cy=newPeripheralBtn]").click();

        cy.get("[data-cy=peripherals] [data-cy=peripheral]").should("have.length", 2);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=deleteBtn]").click();

        cy.get("[data-cy=peripherals] [data-cy=peripheral]").should("have.length", 1);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=deleteBtn]").click();

        cy.get("[data-cy=peripherals] [data-cy=peripheral]").should("have.length", 0);

    });

    it("<NewGateway /> Create a new gateway", () => {
        const TEST_UID = Cypress.env("TEST_UID");
        
        const newGateway = {
            id: 1,
            serialNumber: "HIUT987T",
            name: "Switch CISCO L2",
            ip: "192.25.63.87",
            uid: TEST_UID,
            peripherals: [
                {
                    uid: "UID01",
                    vendor: "Vendor01",
                    status: true,
                },
                {
                    uid: "UID02",
                    vendor: "Vendor02",
                    status: false
                }
            ]
        }
        
        // Clear de previous data 
        cy.visit("/");
        cy.visit("/gateways/new");

        cy.get("[data-cy=serialNumber]").type(newGateway.serialNumber);
        cy.get("[data-cy=name]").type(newGateway.name);
        cy.get("[data-cy=ip]").type(newGateway.ip);

        // Add two peripherals
        cy.get("[data-cy=newPeripheralBtn]").click();

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=puid] input").type(newGateway.peripherals[0].uid);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=vendor] input").type(newGateway.peripherals[0].vendor);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=statusSwitch] input").check();

        cy.get("[data-cy=newPeripheralBtn]").click();

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=puid] input").type(newGateway.peripherals[1].uid);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=vendor] input").type(newGateway.peripherals[1].vendor);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]").should("have.length", 2);

        
        cy.visit("/");
        
        dispatch(onCreateGatewaySuccess(newGateway));

        const getGateways = (win) => win.store.getState().gateway.gateways;

        cy.window().pipe(getGateways).should('have.length', 1)

        cy.window().its('store').invoke('getState').should('deep.equal', {
            gateway: {
                gateways: [{...newGateway}],
                deletegateway: null,
                editgateway: null,
                detailgateway: null,
            },
            user: {
                user: null
            },
        })

        cy.get("[data-cy=datagrid] div.MuiDataGrid-row:nth-child(1) div.MuiDataGrid-cellContent").eq(0).invoke("text").should("equal", newGateway.serialNumber);
        cy.get("[data-cy=datagrid] div.MuiDataGrid-row:nth-child(1) div.MuiDataGrid-cellContent").eq(1).invoke("text").should("equal", newGateway.name);
        cy.get("[data-cy=datagrid] div.MuiDataGrid-row:nth-child(1) div.MuiDataGrid-cellContent").eq(2).invoke("text").should("equal", newGateway.ip);

    });

});