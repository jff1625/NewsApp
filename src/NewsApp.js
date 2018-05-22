
import { SelectList } from './SelectList.js';
import { ArticlesList } from './ArticlesList.js';

export class NewsApp {
    constructor (articlesUL, filterSELECT, showMoreANCHOR){
        this.articlesList = new ArticlesList(articlesUL);
        this.sourceFilterSelectList = new SelectList(filterSELECT, this.filter.bind(this));
        this.showMoreBtn = showMoreANCHOR;
        this.page = 1;
    }

    init(){
        //setup the SELECT
        this.sourceFilterSelectList.add('Filter by source', true, true);

        //setup 'show more' button
        this.showMoreBtn.addEventListener('click', this.showMore.bind(this));
        
        //load content from API
        this.load(this.page)
            .then(data => {
                this.populate(data.articles);
                this.render();
            });
    }

    async load(page){
        const url = 'https://newsapi.org/v2/top-headlines?' +
        'country=gb&' +
        'pageSize=5&' +
        'page=' + page + '&' +
        'apiKey=a3193e3974c145f08ff3596872ad3c4c';
        const req = new Request(url);

        let response;
        try {
            response = await fetch(req);
            response = response.json();
        }
        catch(e) {
            response = {articles: []};
        }
        return response;
    }

    populate (articlesArray) {
        //arg is Array extracted from newsapi json
        articlesArray.forEach(item => {
            this.articlesList.add( 
                item.title, 
                new Date(item.publishedAt).toLocaleDateString('en-GB'), 
                item.source.name, 
                item.url
            );
            this.sourceFilterSelectList.add(item.source.name);
        });
    }

    filter (value) {
        //this is used as the callback/handler for the select list
        this.articlesList.filter(value);
        this.render();
    }

    render () {
        //unhide articles
        this.articlesList.show();
        
        //hide loader circle
        const loader = document.querySelectorAll('.loader')[0];
        if (loader) {
            loader.classList.remove('loading');
            loader.classList.add('loaded');
        }

        //tell components to update themselves
        this.articlesList.render();
        this.sourceFilterSelectList.render();
    }

    async showMore () {
        this.page++;
        const data = await this.load(this.page);
        this.populate(data.articles);
        this.render();
    }
}
