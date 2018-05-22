//system Under Test
import { SelectList } from '../src/SelectList.js';

describe('SelectList', () => {

    let s;

    //mocks
    let fakeEvent = {
        target: {
            value: 'fakeValue'
        }
    };
    let selectTag = {
        addEventListener: function(e, c){
            //just call it immediately
            c(fakeEvent);
        },
        children : [],
        add: jest.fn()
    };
    let callback = jest.fn();
    
    beforeEach(() => {
        s = new SelectList(selectTag, callback);
    });

    describe('constructor', () => {
        it('accepts selectTag arg', () => {
            expect(s.selectTag).toEqual(selectTag);
        });

        it('has a list', () => {
            expect(s.list).toBeInstanceOf(Set);
        });

        it('mock callback gets called', () => {
            expect(callback).toHaveBeenCalled();
        });
    });

    describe('add', () => {
        it('adds HTMLOptionelement to list', () => {
            const fakeValue = 'fakeValue';
            expect(s.list.size).toEqual(0);
            s.add(fakeValue);
            expect(s.list.size).toEqual(1);
            const opt = s.list.values().next().value;
            expect(opt).toBeInstanceOf(HTMLOptionElement);
            expect(opt.value).toEqual(fakeValue);
        });

        it('accepts \'selected\' and \'disabled\' args', () => {
            const fakeValue = 'fakeValue';
            s.add(fakeValue, true, true);
            let iterable = s.list.values();
            let opt = iterable.next().value;
            expect(opt.selected).toBeTruthy();
            expect(opt.disabled).toBeTruthy();

            s.add(fakeValue, false);
            
            opt = iterable.next().value;
            expect(opt.selected).toBeFalsy();
            expect(opt.disabled).toBeFalsy();
        });
    });

    describe('render', () => {
        it('\'add\'s elem to selectTag', () => {
            const fakeValue = 'fakeValue';
            s.add(fakeValue);
            expect(selectTag.add).not.toHaveBeenCalled();
            s.render();
            expect(selectTag.add).toHaveBeenCalled();
        });
    });

});