//system Under Test
import { NewsApp } from '../src/NewsApp.js';

//Mock the other imports
import { SelectList } from '../src/SelectList.js';
import { ArticlesList } from '../src/ArticlesList.js';
jest.mock('../src/SelectList.js');
jest.mock('../src/ArticlesList.js');


describe('NewsApp', () => {

    let n;
    let articlesUL;
    let filterSELECT;
    let showMoreANCHOR;
    
    beforeAll(() => {
        //mock the DOM stuff
        articlesUL = {};
        filterSELECT = {};
        showMoreANCHOR = {
            addEventListener: () => {}
        };
    });

    beforeEach(() => {
        n = new NewsApp(articlesUL, filterSELECT, showMoreANCHOR);
    });

    describe('constructor', () => {
        beforeEach(() => {
            
        });

        it('creates the articlesList', () => {
            expect(n.articlesList).toBeDefined();
            expect(n.articlesList).toBeInstanceOf(ArticlesList);
        });

        it('creates the sourceFilterSelectList', () => {
            expect(n.sourceFilterSelectList).toBeDefined();
            expect(n.sourceFilterSelectList).toBeInstanceOf(SelectList);
        });
    });

    describe('init', () => {
        beforeEach(() => {
            //n = new NewsApp(articlesUL, filterSELECT, showMoreANCHOR);
            //mock the 'load' method - loading from external API is not in scope for unit testing
            n.load = jest.fn().mockReturnValue(
                new Promise((resolve) => {
                    resolve({articles: []});
                })
            );
        });

        it('triggers render', async () => {
            jest.spyOn(n, 'render');
            await n.init();
            expect(n.render).toHaveBeenCalled();
        });
    });

    describe('populate', () => {
        let mockarray;
        beforeEach(() => {
            mockarray = [{
                title: 'faketitle',
                publishedAt: '10/10/2018',
                source: {
                    name: 'fakeSource'
                }
            }];
        });

        it('\'add\'s something to articlesList', () => {
            n.populate(mockarray);
            expect(n.articlesList.add).toHaveBeenCalled();
        });

        it('\'add\'s something to sourceFilterSelectList', () => {          
            n.populate(mockarray);
            expect(n.sourceFilterSelectList.add).toHaveBeenCalled();
        });
    });

    describe('filter', () => {
        it('calls filter on the articlesList', () => {
            n.filter();
            expect(n.articlesList.filter).toHaveBeenCalled();
        });

        it('triggers render', () => {
            jest.spyOn(n, 'render');
            n.filter();
            expect(n.render).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('tells articlesList to render itself', () => {
            n.render();
            expect(n.articlesList.render).toHaveBeenCalled();
        });

        it('tells selectList to render itself', () => {
            n.render();
            expect(n.sourceFilterSelectList.render).toHaveBeenCalled();
        });
    });

    describe('showMore', () => {
        beforeEach(() => {
            //mock the 'load' method - loading from external API is not in scope for unit testing
            n.load = jest.fn().mockReturnValue(
                new Promise((resolve) => {
                    resolve({articles: []});
                })
            );
        });

        it('triggers render', async () => {
            jest.spyOn(n, 'render');
            await n.init();
            expect(n.render).toHaveBeenCalled();
        });
    });


});
