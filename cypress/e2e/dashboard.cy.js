describe("check dashboard", () => {
  it("get dashboard page", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.url().should("include", "localhost:3000/dashboard");
  });

  it("added a new work with their translations", () => {
    cy.get('input[placeholder="Keyword"]').type("Bye");
    cy.get('input[placeholder="English translation"]').type("Bye");
    cy.get('input[placeholder="Spanish translation"]').type("Adiós");
    cy.get('input[placeholder="French translation"]').type("Au revoir");
    cy.get('input[placeholder="German translation"]').type("Tschüss");
  });

  it("added a new work with their translations", () => {
    cy.get("button").contains("Add Translation").click();
  });

  it("check if the new work is added", () => {
    cy.get("div").first("span").contains("Bye");
    cy.get("div")
      .parent("div.flex-1")
      .children("div")
      .eq(1)
      .children("input")
      .eq("0")
      .should("have.value", "Bye");

    cy.get("div")
      .parent("div.flex-1")
      .children("div")
      .eq(1)
      .children("input")
      .eq("1")
      .should("have.value", "Adiós");

    cy.get("div")
      .parent("div.flex-1")
      .children("div")
      .eq(1)
      .children("input")
      .eq("2")
      .should("have.value", "Au revoir");

    cy.get("div")
      .parent("div.flex-1")
      .children("div")
      .eq(1)
      .children("input")
      .eq("3")
      .should("have.value", "Tschüss");
  });
});

describe("delete added one translations", () => {
  it("delete the added translation", () => {
    cy.get("div.flex-1")
      .first("div")
      .first("span")
      .contains("Bye")
      .next("button")
      .click();
  });
});
