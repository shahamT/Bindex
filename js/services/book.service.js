function getBooks() {
    return gBooks
}

function addBook(book) {
    gBooks.push(book)
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
}

function deleteBook(id) {
    bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookIdx, 1)
}