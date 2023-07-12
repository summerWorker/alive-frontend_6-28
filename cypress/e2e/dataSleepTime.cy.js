describe('睡眠时间界面测试', () => {
  it('测试表格切换', () => {
    cy.visit('/data/sleepTime');
    cy.contains('日').click();
    cy.get('input').should('have.length', 1);
    cy.get('title')
      .filter((index, element) => {
        return Cypress.$(element).text().includes(':');
      })
      .should('exist');
    cy.get('.apexcharts-rangebar-area').should('exist');
    cy.get('.apexcharts-bar-area').should('have.length.at.most', 4);

    cy.contains('周').click();
    cy.get('input').should('have.length', 2);
    cy.contains('周一').should('exist');
    cy.contains('周二').should('exist');
    cy.contains('周三').should('exist');
    cy.contains('周四').should('exist');
    cy.contains('周五').should('exist');
    cy.contains('周六').should('exist');
    cy.contains('周日').should('exist');
    cy.get('.apexcharts-rangebar-area').should('not.exist');
    cy.get('.apexcharts-bar-area').should('have.length.at.least', 4);

    cy.contains('月').click();
    cy.get('input').should('have.length', 2);
    cy.get('title')
      .filter((index, element) => {
        return Cypress.$(element).text().includes('/');
      })
      .should('have.length.at.least', 30);
    cy.get('.apexcharts-rangebar-area').should('not.exist');
    cy.get('.apexcharts-bar-area').should('have.length.at.least', 4);
  });
});
