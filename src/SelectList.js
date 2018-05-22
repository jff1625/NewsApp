
export class SelectList {
    constructor(selectTag, updateCallback) {
        this.selectTag = selectTag;
        this.list = new Set;
        this.selectTag.addEventListener('change', (e) => { updateCallback(e.target.value); });
    }

    add (value, selected = false, disabled = false) {
        let opt = document.createElement('option');
        if (selected) {
            opt.selected = true;
        }
        if (disabled) {
            opt.disabled = true;
        }
        opt.text = value;
        opt.value = value;
        this.list.add(opt);
    }

    render () {
        //add only items that aren't already there in the DOM
        this.list.forEach(opt => {
            let found = false;
            for (let i = 0; i < this.selectTag.children.length; i ++) {
                let option = this.selectTag.children[i];
            
                if (opt.value == option.value) {
                    found = true;
                }
            }
            if (!found) {
                this.selectTag.add(opt);
            }
        });
    }
}