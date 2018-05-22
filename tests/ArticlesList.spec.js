//system Under Test
import { ArticlesList } from '../src/ArticlesList.js';

//Mock the other imports

import { Article } from '../src/Article.js';
jest.mock('../src/Article.js');



describe('ArticlesList', () => {

    let a;
    let mockUL = {
        className: ''
    };
    
    beforeEach(() => {
        a = new ArticlesList(mockUL);
    });

    describe('constructor', () => {
        it('has articles prop', () => {
            expect(a.articles).toBeDefined();
            expect(a.articles).toBeInstanceOf(Set);
        });

    });

    describe('add', () => {
        it('adds an article', () => {
            expect(a.articles.size).toEqual(0);
            a.add ('faketitle', '20/20/2018', 'fakesource', 'fakeurl');
            expect(a.articles.size).toEqual(1);
            expect(a.articles.values().next().value).toBeInstanceOf(Article);
        });
    });

    describe('show', () => {
        it('sets className to \'loaded\'', () => {
            expect(a.targetElem.className).toEqual('');
            a.show();
            expect(a.targetElem.className).toEqual('loaded');
        });
    });

    describe('render', () => {
        it('adds articles to DOM', () => {
            //add something to be rendered
            a.add ('faketitle', '20/20/2018', 'fakesource', 'fakeurl');
            //grab the fake article, so we can spy on it
            const article = a.articles.values().next().value;

            expect(article.appendToDOMNode).not.toHaveBeenCalled();
            a.render();
            expect(article.appendToDOMNode).toHaveBeenCalled();
        });
    });

    describe('filter', () => {
        it('unhides matching article', () => {
            a.add ('faketitle', '20/20/2018', 'fakesource', 'fakeurl');
            //grab the fake article, so we can spy on it
            const article = a.articles.values().next().value;
            //mock Article doesn't store args
            article.source = 'fakesource';
            expect(article.unhide).not.toHaveBeenCalled();
            a.filter('fakesource');
            expect(article.unhide).toHaveBeenCalled();
        });

        it('hides non-matching article', () => {
            a.add ('faketitle', '20/20/2018', 'fakesource', 'fakeurl');
            //grab the fake article, so we can spy on it
            const article = a.articles.values().next().value;
            //mock Article doesn't store args
            article.source = 'fakewrongsource';
            expect(article.hide).not.toHaveBeenCalled();
            a.filter('fakesource');
            expect(article.hide).toHaveBeenCalled();
        });
    });

});
