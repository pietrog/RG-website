import { RGWebsitePage } from './app.po';

describe('rg-website App', () => {
  let page: RGWebsitePage;

  beforeEach(() => {
    page = new RGWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
