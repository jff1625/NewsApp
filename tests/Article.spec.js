//system Under Test
import { Article } from '../src/Article.js';

describe('Article', () => {

    let a;
    let title = 'faketitle',
        date = '20/20/2018', 
        source = 'fakesource', 
        url = 'fakeurl';
    
    beforeEach(() => {
        a = new Article(title, date, source, url);
    });

    describe('constructor', () => {
        it('accepts injected args', () => {
            expect(a.title).toEqual(title);
            expect(a.date).toEqual(date);
            expect(a.source).toEqual(source);
            expect(a.url).toEqual(url);
        });

        it('creates an HTML template LI', () => {
            expect(a.template).toBeInstanceOf(HTMLLIElement);
        });
    });

    it('hide sets class \'hidden\' template LI', () => {
        expect(a.template.classList.contains('hidden')).toBeFalsy();
        a.hide();
        expect(a.template.classList.contains('hidden')).toBeTruthy();
    });

    it('unhide removes class \'hidden\' template LI', () => {
        a.hide();
        expect(a.template.classList.contains('hidden')).toBeTruthy();
        a.unhide();
        expect(a.template.classList.contains('hidden')).toBeFalsy();
    });

    it('appendToDOMNode calls appendChild', () => {
        let elem = {
            appendChild: jest.fn()
        };
        expect(elem.appendChild).not.toHaveBeenCalled();
        a.appendToDOMNode(elem);
        expect(elem.appendChild).toHaveBeenCalled();
    });
     
});
