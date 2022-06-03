/// <reference types="cypress" />
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
import { onCreateGatewaySuccess, onEditGatewaySuccess } from "../../src/services/gatewaySlice";

const dispatch = action => cy.window().its('store').invoke('dispatch', action);

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

describe("<MainContainer />", () => {

    // beforeEach(() => {
    //     const TEST_UID = Cypress.env("TEST_UID");
    //     cy.login();
    //     cy.callFirestore("delete", "gateways");
    //     const newGateway = {
    //         serialNumber: "HIUT987T",
    //         name: "Switch CISCO L2",
    //         ip: "192.25.63.87",
    //         uid: TEST_UID,
    //         peripherals: [
    //             {
    //                 uid: "UID01",
    //                 vendor: "Vendor01",
    //                 status: true,
    //             },
    //             {
    //                 uid: "UID02",
    //                 vendor: "Vendor02",
    //                 status: false
    //             }
    //         ]
    //     }
    //     cy.callFirestore("add", `gateways`, newGateway);
    // })

    it('The Redux store has expected state on load', () => {
        cy.visit('/')

        cy.window().its('store').invoke('getState').should('deep.equal', {
            gateway: {
                gateways: [],
                deletegateway: null,
                editgateway: null,
                detailgateway: null,
            },
            user: {
                user: null
            },
        })
    })

    it("<MainContainer /> Validation", () => {
        cy.visit("/");

        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Gateways List")

        cy.get("[data-cy=newBtn]")
            .should("exist")
            .invoke("text")
            .should("equal", "New Gateway")

        cy.get("[data-cy=datagrid]").should("exist");
    });

    it("<MainContainer /> New gateway button works", () => {

        cy.get("[data-cy=newBtn]").click();

        // It should redirect to /gateways/new path and back again
        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Create new gateway")

        cy.get("[data-cy=backBtn]").click();

        cy.get("[data-cy=title]")
            .should("exist")
            .invoke("text")
            .should("equal", "Gateways List")
    });

    it("<MainContainer /> Insert new gateways into datagrid", () => {

        //cy.callFirestore("delete", "gateways");

        //cy.callFirestore("add", `gateways`, newGateway);

        dispatch(onCreateGatewaySuccess(newGateway));
        dispatch(onCreateGatewaySuccess({ ...newGateway, id: 2 }));

        const getGateways = (win) => win.store.getState().gateway.gateways;

        cy.window().pipe(getGateways).should('have.length', 2)
    });

    it("<MainContainer /> Edit a gateway in datagrid", () => {
        // click on edit button of the first element in datagrid
        cy.get("[data-cy=datagrid] div.MuiDataGrid-row:nth-child(1) div.d-inline:first-child() button.MuiButtonBase-root.MuiIconButton-root")
            .should("exist")
            .should("have.id", "editBtn")
            .click();

        // verify that it enters the window to edit gateways and all elements are correct
        cy.get("[data-cy=title]").should("exist").invoke("text").should("equal", "Edit gateway");

        cy.get("[data-cy=serialNumber] input")
            .should("exist")
            .should("have.attr", "name", "serialNumber")
            .should('have.attr', 'placeholder', 'Serial Number')
            .should('have.attr', 'value', newGateway.serialNumber)

        cy.get("[data-cy=name] input")
            .should("exist")
            .should("have.attr", "name", "name")
            .should('have.attr', 'placeholder', 'Name')
            .should('have.attr', 'value', newGateway.name)

        cy.get("[data-cy=ip] input")
            .should("exist")
            .should("have.attr", "name", "ip")
            .should('have.attr', 'placeholder', 'IP')
            .should('have.attr', 'value', newGateway.ip)

        cy.get("[data-cy=peripherals] [data-cy=peripheral]").should("have.length", newGateway.peripherals.length);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=puid] input")
            .should("exist")
            .should("have.attr", "name", "uid")
            .should('have.attr', 'placeholder', 'UID')
            .should('have.attr', 'value', newGateway.peripherals[0].uid);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=vendor] input")
            .should("exist")
            .should("have.attr", "name", "vendor")
            .should('have.attr', 'placeholder', 'Vendor')
            .should('have.attr', 'value', newGateway.peripherals[0].vendor);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=statusSwitch] input").should("be.checked");

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=puid] input")
            .should("exist")
            .should("have.attr", "name", "uid")
            .should('have.attr', 'placeholder', 'UID')
            .should('have.attr', 'value', newGateway.peripherals[1].uid);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=vendor] input")
            .should("exist")
            .should("have.attr", "name", "vendor")
            .should('have.attr', 'placeholder', 'Vendor')
            .should('have.attr', 'value', newGateway.peripherals[1].vendor);

        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=statusSwitch] input").should("not.be.checked");

        // change the values and edit the gateway, then check that the gateway changed its values correctly
        const editGateway = {
            id: 1,
            serialNumber: "ALLIDG897",
            name: "Router M2",
            ip: "192.53.48.12",
            uid: TEST_UID,
            peripherals: [
                {
                    uid: "UID001",
                    vendor: "Vendor001",
                    status: false,
                },
                {
                    uid: "UID002",
                    vendor: "Vendor002",
                    status: true
                }
            ]
        }

        cy.get("[data-cy=serialNumber] input").clear({force: true}).type(editGateway.serialNumber);
        cy.get("[data-cy=name] input").clear({force: true}).type(editGateway.name);
        cy.get("[data-cy=ip] input").clear({force: true}).type(editGateway.ip);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=puid] input").clear({force: true}).type(editGateway.peripherals[0].uid);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=vendor] input").clear({force: true}).type(editGateway.peripherals[0].vendor);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(1) [data-cy=statusSwitch] input").uncheck({force: true});
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=puid] input").clear({force: true}).type(editGateway.peripherals[1].uid);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=vendor] input").clear({force: true}).type(editGateway.peripherals[1].vendor);
        cy.get("[data-cy=peripherals] [data-cy=peripheral]:nth-child(2) [data-cy=statusSwitch] input").check({force: true});

        // edit gateway in redux
        dispatch(onEditGatewaySuccess(editGateway));

        cy.get("[data-cy=editBtn]").click();

        cy.get("[data-cy=datagrid] div.MuiDataGrid-row:nth-child(1) div.MuiDataGrid-cellContent").eq(0).invoke("text").should("equal", editGateway.serialNumber);
        cy.get("[data-cy=datagrid] div.MuiDataGrid-row:nth-child(1) div.MuiDataGrid-cellContent").eq(1).invoke("text").should("equal", editGateway.name);
        cy.get("[data-cy=datagrid] div.MuiDataGrid-row:nth-child(1) div.MuiDataGrid-cellContent").eq(2).invoke("text").should("equal", editGateway.ip);

    });
});