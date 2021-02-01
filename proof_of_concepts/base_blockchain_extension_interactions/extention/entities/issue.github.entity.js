class IssueGithub {
    constructor(id, title, url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setUrl(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }
}