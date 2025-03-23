'use strict'

var gBooks = []

var gNxtId = 1001

const STORAGE_KEY = 'booksDB'

_createBooks()

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)
    if (gBooks && gBooks.length) return

    gBooks = [{
        id: 'bg4J78',
        title: 'The adventures of Lori Ipsi',
        author: 'blah blah',
        price: 120,
        rate: 4,
        stock: 5,
        imgUrl: 'https://m.media-amazon.com/images/I/71-++hbbERL.jpg'
    },
    {
        id: 'bg4J79',
        title: 'Harry Potter',
        author: 'j.k rolling',
        price: 10,
        rate: 5,
        stock: 12,
        imgUrl: 'https://m.media-amazon.com/images/I/71-++hbbERL.jpg'
    }]

    _saveBooksToStorage()
}

function getBooks(options) {
    var books = gBooks
console.log("options: ", options)
    //filter

    const searchStr = options.filterBy.search ? options.filterBy.search.toLowerCase() : null
    const minRate = options.filterBy.minRate
    const maxPrice = options.filterBy.maxPrice

    if (searchStr) {
        books = books.filter(book => book.title.toLowerCase().includes(searchStr) || book.author.toLowerCase().includes(searchStr))
    }

    if (minRate) {
        books = books.filter(book => book.rate >= minRate)
    }

    if (maxPrice) {
        console.log("maxPrice: ", maxPrice)
        books = books.filter(book => book.price <= maxPrice)
    }

    //sort
    const sortBy = options.sortBy.field ? options.sortBy.field : null
    const sortDir = options.sortBy.dir

    if (sortBy) {
        if (sortBy === 'rate' || sortBy === 'price' || sortBy === 'stock') {
            books.sort((a, b) => (a[sortBy] - b[sortBy]) * sortDir)
        }
        if (sortBy === 'title' || sortBy === 'author') {
            books.sort((a, b) => (a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())) * sortDir)
        }
    }

    return books
}

function addBook(data) {
    const book = {
        id: 'bg' + gNxtId++,
        title: data.title,
        author: data.author,
        price: +data.price,
        rate: +data.rate,
        stock: +data.stock,
        imgUrl: data.imgUrl
    }

    gBooks.push(book)
    _saveBooksToStorage()
}

function getBookById(id) {
    book = gBooks.find(book => book.id === id)
    return book
}

function updateBook(id, data) {
    const book = getBookById(id)
    book.title = data.title
    book.author = data.author
    book.price = data.price
    book.rate = data.rate
    book.stock = data.stock
    book.imgUrl = data.imgUrl

    _saveBooksToStorage()
}

function deleteBook(id) {
    const bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookIdx, 1)

    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}