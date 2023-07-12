describe('主页面测试', () => {
  it('测试4个大卡片的跳转逻辑', () => {
    cy.visit('/');
    cy.get('a')
      .filter((index, element) => {
        return Cypress.$(element).text().includes('详细数据');
      })
      .eq(0)
      .click();
    cy.url().should('include', 'data/height');
    cy.go('back');
    cy.get('a')
      .filter((index, element) => {
        return Cypress.$(element).text().includes('详细数据');
      })
      .eq(1)
      .click();
    cy.url().should('include', 'data/weight');
    cy.go('back');
    cy.get('a')
      .filter((index, element) => {
        return Cypress.$(element).text().includes('详细数据');
      })
      .eq(2)
      .click();
    cy.url().should('include', 'data/steps');
    cy.go('back');
    cy.get('a')
      .filter((index, element) => {
        return Cypress.$(element).text().includes('详细数据');
      })
      .eq(3)
      .click();
    cy.url().should('include', 'data/sleepTime');
    cy.go('back');
  });

  it('测试小卡片的跳转逻辑', () => {
    cy.visit('/');
    cy.get('.css-19midj6').eq(0).click();
    cy.url().should('include', 'data/heartRate');
    cy.go('back');
    cy.get('.css-19midj6').eq(1).click();
    cy.url().should('include', 'data/blood');
    cy.go('back');
    cy.get('.css-19midj6').eq(2).click();
    cy.url().should('include', 'data/blood');
    cy.go('back');
    cy.get('.css-19midj6').eq(3).click();
    cy.url().should('include', 'data/calories');
    cy.go('back');
  });

  it('测试侧边栏', () => {
    cy.visit('/');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(0).click();
    cy.url().should('include', 'dashboard/default');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(0).click();
    cy.url().should('include', 'data/height');
    cy.go('back');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(1).click();
    cy.url().should('include', 'data/weight');
    cy.go('back');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(2).click();
    cy.url().should('include', 'data/steps');
    cy.go('back');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(3).click();
    cy.url().should('include', 'data/sleepTime');
    cy.go('back');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(4).click();
    cy.url().should('include', 'data/heartRate');
    cy.go('back');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(5).click();
    cy.url().should('include', 'data/blood');
    cy.go('back');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(6).click();
    cy.url().should('include', 'data/blood');
    cy.go('back');

    cy.get('.icon-tabler-menu-2').click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('not.exist');
    cy.get('.css-126euq6-MuiButtonBase-root-MuiListItemButton-root').eq(1).click();
    cy.get('.css-1jcglh9-MuiButtonBase-root-MuiListItemButton-root').should('exist').eq(7).click();
    cy.url().should('include', 'data/calories');
    cy.go('back');
  });

  it('测试大卡片的点击切换图表', () => {
    cy.visit('/');
    cy.get('.css-1hqeloq').eq(0).click();
    cy.get('.apexcharts-svg')
      .eq(4)
      .should('contain.text', '身高')
      .should('not.contain.text', '体重')
      .should('not.contain.text', '运动步数')
      .should('not.contain.text', '睡眠时间');
    cy.get('.css-1hqeloq').eq(1).click();
    cy.get('.apexcharts-svg')
      .eq(4)
      .should('contain.text', '体重')
      .should('not.contain.text', '身高')
      .should('not.contain.text', '运动步数')
      .should('not.contain.text', '睡眠时间');
    cy.get('.css-1hqeloq').eq(2).click();
    cy.get('.apexcharts-svg')
      .eq(4)
      .should('contain.text', '运动步数')
      .should('not.contain.text', '体重')
      .should('not.contain.text', '身高')
      .should('not.contain.text', '睡眠时间');
    cy.get('.css-1hqeloq').eq(3).click();
    cy.get('.apexcharts-svg')
      .eq(4)
      .should('contain.text', '睡眠时间')
      .should('not.contain.text', '体重')
      .should('not.contain.text', '运动步数')
      .should('not.contain.text', '身高');
  });
});
