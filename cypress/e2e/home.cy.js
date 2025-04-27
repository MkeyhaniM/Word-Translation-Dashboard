describe("check home page", () => {
  it("get page", () => {
    cy.visit("http://localhost:3000/");
    cy.url().should("include", "localhost:3000");
  });

  it("check heading of boxes", () => {
    cy.get("h2").contains("About the Project");
    cy.get("h2").contains("About the Project");
    cy.get("h2").contains("Technical Stack");
  });

  it("click launch dashboard", () => {
    cy.get("a").contains("Launch Dashboard").click();
    cy.url().should("include", "localhost:3000/dashboard");
  });
});
