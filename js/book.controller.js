
function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
    renderBooksTable(books)
}

function renderBooksTable(books) {
    var elTableGrid = document.querySelector(`.data-table-container`)
    var strHTML = ``
    strHTML += `  <div class="table-row table-header">
                        <div class="table-cell cell1">Book Name</div>
                        <div class="table-cell cell2">Author</div>
                        <div class="table-cell cell3">Price</div>
                        <div class="table-cell cell4">Rate</div>
                        <div class="table-cell cell5">Stock</div>
                        <div class="table-cell cell6"></div>
                    </div>

                    <div class="table-items-container">`
    var booksStrHTMLs = books.map(book => {
        var bookHTML = `
                <div class="table-row">
                    <div class="table-cell cell1">${book.title}</div>
                    <div class="table-cell cell2">${book.author}</div>
                    <div class="table-cell cell3">${book.price}$</div>
                    <div class="table-cell cell4">${(book.rate).toFixed(1)}⭐</div>
                    <div class="table-cell cell5">${book.stock}</div>
                    <div class="table-cell cell6 item-btns">
                        <button class="txt-btn btn-secondary">Read</button>
                        <button class="txt-btn btn-primary">Edit</button>
                        <button class="icon-btn btn-secondary"><svg viewBox="0 0 482.428 482.429" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.896c15.973,0,28.973,13.001,28.973,28.979V115.744z"/><path d="M191.479,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083c-7.225,0-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083C185.621,401.819,191.479,395.961,191.479,388.736z"/><path d="M264.755,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083s-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083S264.755,395.961,264.755,388.736z"/><path d="M338.031,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083c-7.226,0-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083C332.174,401.819,338.031,395.961,338.031,388.736z"/></g></g></svg>
                        </button>
                    </div>
                </div>`

        return bookHTML
    })

    strHTML += booksStrHTMLs.join('')
    strHTML += `</div>`

    elTableGrid.innerHTML = strHTML
}

function renderBooksCards(books) {

}