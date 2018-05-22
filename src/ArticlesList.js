import { Article } from './Article.js';

export class ArticlesList {
    constructor (ul) {
        this.targetElem = ul;
        this.articles = new Set;
    }

    add (title, date, source, url) {
        this.articles.add(new Article(title, date, source, url));
    }

    show () {
        this.targetElem.className = 'loaded';
    }

    render () {
        let targetElem = this.targetElem;
        this.articles.forEach(article => {
            article.appendToDOMNode(targetElem);
        });
    }

    filter (source) {
        this.articles.forEach(article => {
            if (article.source == source) {
                article.unhide();
            }
            else {
                article.hide();
            }
        });
    }
}