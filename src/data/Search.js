import Fuse from 'fuse.js'

class Search {

    constructor(data, keys, options) {

        const defaultOptions = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: keys
        }

        this.fuse = new Fuse(data, options||defaultOptions)
    }

    search(searchTerm) {
        return this.fuse.search(searchTerm)
    }

}

export default Search