
export class Article {
    constructor(title, date, source, url){
        this.title = title;
        this.date = date;
        this.source = source;
        this.url = url;
        this.template = this.html2li(`<a href="${this.url}">
            <span class="title">${this.title}</span>
            <span class="date">${this.date}</span>
            <span class="source">${this.source}</span>
            </a>`);
    }

    html2li (htmlString) {
        let li = document.createElement('li');
        li.innerHTML = htmlString;
        return li;
    }

    hide () {
        this.template.classList.add('hidden');
    }

    unhide() {
        this.template.classList.remove('hidden');
    }

    appendToDOMNode (elem) {
        this.parentElem = elem;
        if (elem.appendChild) {
            elem.appendChild(this.template);
        }
    }
   
}