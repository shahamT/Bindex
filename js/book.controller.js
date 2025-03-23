
const gQueryOptions = {
    filterBy: { search: null, minRate: null, maxPrice: null },
    sortBy: { field: null, dir: 1 },
    page: { page: 1, pSize: 10 }
}

var gLayout = 'table'

function onInit() {
    renderBooks()
    resetFiltersElements()
}

function renderBooks() {
    const books = getBooks(gQueryOptions)
    if (gLayout === 'table') {
        renderBooksTable(books)
    } else if (gLayout === 'cards') {
        renderBooksCards(books)
    }

}

function renderBooksTable(books) {
    const elTableGrid = document.querySelector(`.data-table-container`)
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
    if (books.length > 0) {
        var booksStrHTMLs = books.map(book => {
            var bookHTML = `
                <div class="table-row" onclick="onViewBookClick('${book.id}')">
                    <div class="table-cell cell1">${book.title}</div>
                    <div class="table-cell cell2">${book.author}</div>
                    <div class="table-cell cell3">${book.price}$</div>
                    <div class="table-cell cell4">${(book.rate).toFixed(1)}⭐</div>
                    <div class="table-cell cell5">${book.stock}</div>
                    <div class="table-cell cell6 item-btns">
                        <button class="txt-btn btn-primary" onclick="onUpdateBtnClick('${book.id}',event)">Edit</button>
                        <button class="icon-btn btn-secondary" onclick="onDeleteBook('${book.id}',event)"><svg viewBox="0 0 482.428 482.429" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.896c15.973,0,28.973,13.001,28.973,28.979V115.744z"/><path d="M191.479,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083c-7.225,0-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083C185.621,401.819,191.479,395.961,191.479,388.736z"/><path d="M264.755,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083s-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083S264.755,395.961,264.755,388.736z"/><path d="M338.031,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083c-7.226,0-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083C332.174,401.819,338.031,395.961,338.031,388.736z"/></g></g></svg>
                        </button>
                    </div>
                </div>`

            return bookHTML
        })
        strHTML += booksStrHTMLs.join('')
    }
    else {
        strHTML += `<div class="empty-state-container">
                        <img class="empty-state-img" src="img/no-books-empty-state.png" alt="no books">
                        <p>No books were found...</p>
                        </div>`
    }

    strHTML += `</div>`
    elTableGrid.innerHTML = strHTML

    const elCardsGrid = document.querySelector(`.data-cards-container`)
    elCardsGrid.hidden = true
    elTableGrid.hidden = false


    const elLayoutBtnContainer = document.querySelector(`.books-layout-btn-container`)
    elLayoutBtnContainer.innerHTML = `<button class="icon-btn btn-secondary" onClick="onLayoutCardsBtnClick()">
                                        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 0H0.5C0.367392 0 0.240215 0.0526785 0.146447 0.146447C0.0526785 0.240215 0 0.367392 0 0.5V10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8536C0.240215 10.9473 0.367392 11 0.5 11H10.5C10.6326 11 10.7598 10.9473 10.8536 10.8536C10.9473 10.7598 11 10.6326 11 10.5V0.5C11 0.367392 10.9473 0.240215 10.8536 0.146447C10.7598 0.0526785 10.6326 0 10.5 0ZM9 9H2V2H9V9ZM24.5 0H14.5C14.3674 0 14.2402 0.0526785 14.1464 0.146447C14.0527 0.240215 14 0.367392 14 0.5V10.5C14 10.6326 14.0527 10.7598 14.1464 10.8536C14.2402 10.9473 14.3674 11 14.5 11H24.5C24.6326 11 24.7598 10.9473 24.8536 10.8536C24.9473 10.7598 25 10.6326 25 10.5V0.5C25 0.367392 24.9473 0.240215 24.8536 0.146447C24.7598 0.0526785 24.6326 0 24.5 0ZM23 9H16V2H23V9ZM10.5 14H0.5C0.367392 14 0.240215 14.0527 0.146447 14.1464C0.0526785 14.2402 0 14.3674 0 14.5V24.5C6.63e-06 24.6326 0.0526871 24.7598 0.146454 24.8535C0.240221 24.9473 0.367394 25 0.5 25H10.5C10.6326 25 10.7598 24.9473 10.8535 24.8535C10.9473 24.7598 11 24.6326 11 24.5V14.5C11 14.3674 10.9473 14.2402 10.8536 14.1464C10.7598 14.0527 10.6326 14 10.5 14ZM9 23H2V16H9V23ZM24.5 14H14.5C14.3674 14 14.2402 14.0527 14.1464 14.1464C14.0527 14.2402 14 14.3674 14 14.5V24.5C14 24.6326 14.0527 24.7598 14.1465 24.8535C14.2402 24.9473 14.3674 25 14.5 25H24.5C24.6326 25 24.7598 24.9473 24.8535 24.8535C24.9473 24.7598 25 24.6326 25 24.5V14.5C25 14.3674 24.9473 14.2402 24.8536 14.1464C24.7598 14.0527 24.6326 14 24.5 14ZM23 23H16V16H23V23Z" fill="currentColor"/></svg>
                                    </button>`


}

function renderBooksCards(books) {
    const elCardsGrid = document.querySelector(`.data-cards-container`)
    var strHTML = ``

    if (books.length > 0) {
        var booksStrHTMLs = books.map(book => {
            var bookHTML = `<div class="book-card ${book.id}" onclick="onViewBookClick('${book.id}')" onmouseover="onBookCardMouseOver(this ,'${book.id}')" onmouseout="onBookCardMouseOut(this,'${book.id}')">
                                <div class="card-content-wraper">
                                    <p class="book-title">${book.title}</p>
                                    <p class="book-author">${book.author}</p>
                                    <img class="book-cover" src="${book.imgUrl}"
                                        alt="book cover" onerror="this.src='img/no-cover-default.webp'">

                                    <div class="book-attrb-container">
                                        <p class="book-price">${book.price}$</p>
                                        <p class="seperator">|</p>
                                        <p class="book-rate">${(book.rate).toFixed(1)}⭐</p>
                                        <p class="seperator">|</p>
                                        <p class="book-stock"><span class="property-name">Stock: </span>${book.stock}</p>
                                    </div>

                                    <div class="card-btns">
                                        <button class="txt-btn btn-primary" onclick="onUpdateBtnClick('${book.id}',event)">Edit</button>
                                        <button class="icon-btn btn-secondary" onclick="onDeleteBook('${book.id}',event)"><svg viewBox="0 0 482.428 482.429" xmlns="http://www.w3.org/2000/svg"> <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.896c15.973,0,28.973,13.001,28.973,28.979V115.744z" /><path d="M191.479,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083c-7.225,0-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083C185.621,401.819,191.479,395.961,191.479,388.736z" /><path d="M264.755,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083s-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083S264.755,395.961,264.755,388.736z" /><path d="M338.031,388.736V214.433c0-7.225-5.857-13.083-13.083-13.083c-7.226,0-13.083,5.858-13.083,13.083v174.303c0,7.225,5.857,13.083,13.083,13.083C332.174,401.819,338.031,395.961,338.031,388.736z" /></svg></button>
                                    </div>
                                </div>
                            </div>`


            return bookHTML
        })
        strHTML += booksStrHTMLs.join('')
    }
    else {
        strHTML += `<div class="empty-state-container">
                        <img class="empty-state-img" src="img/no-books-empty-state.png" alt="no books">
                        <p>No books were found...</p>
                        </div>`
    }

    strHTML += `</div>`

    elCardsGrid.innerHTML = strHTML
    const elListGrid = document.querySelector(`.data-table-container`)
    elListGrid.hidden = true
    elCardsGrid.hidden = false

    const elLayoutBtnContainer = document.querySelector(`.books-layout-btn-container`)
    elLayoutBtnContainer.innerHTML = `<button class="icon-btn btn-secondary" onClick="onLayoutListBtnClick()">
                                        <svg viewBox="0 0 487.3 487.3" xmlns="http://www.w3.org/2000/svg"><path d="M487.2,69.7c0,12.9-10.5,23.4-23.4,23.4h-322c-12.9,0-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4h322.1C476.8,46.4,487.2,56.8,487.2,69.7z M463.9,162.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,172.8,476.8,162.3,463.9,162.3z M463.9,278.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,288.8,476.8,278.3,463.9,278.3z M463.9,394.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,404.8,476.8,394.3,463.9,394.3z M38.9,30.8C17.4,30.8,0,48.2,0,69.7s17.4,39,38.9,39s38.9-17.5,38.9-39S60.4,30.8,38.9,30.8z M38.9,146.8C17.4,146.8,0,164.2,0,185.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,146.8,38.9,146.8z M38.9,262.8C17.4,262.8,0,280.2,0,301.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,262.8,38.9,262.8z M38.9,378.7C17.4,378.7,0,396.1,0,417.6s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9C77.8,396.2,60.4,378.7,38.9,378.7z"/></svg>
                                    </button>`
}

function onAddBookBtnClick() {
    renderAddBook()
    OpenSidePanel('add')
}

function onUpdateBtnClick(bookId, ev) {
    if (ev) ev.stopPropagation()
    const book = getBookById(bookId)
    OpenSidePanel()
    renderUpdateBook(book)
}

function OpenSidePanel() {
    elGrid = document.querySelector(`.main-area-grid`)
    elGrid.style.gridTemplateColumns = "8fr 24em"
}

function onCloseSidePanel() {
    elGrid = document.querySelector(`.main-area-grid`)
    elGrid.style.gridTemplateColumns = "8fr 0"
}

function renderAddBook() {
    const elPanel = document.querySelector(`.side-panel`)
    elPanel.classList.remove(`no-act-btn`)

    elPanel.innerHTML = `
                <button class="close-panel-btn" onclick="onCloseSidePanel()"><svg fill="none" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"> <path d="M566.65 533.317L699.983 399.983M699.983 399.983L566.65 266.65M699.983 399.983H299.984M433.317 699.983H206.676C169.34 699.983 150.671 699.983 136.41 692.717C123.866 686.327 113.668 676.127 107.276 663.583C100.01 649.323 100.01 630.653 100.01 593.317V206.65C100.01 169.314 100.01 150.645 107.276 136.384C113.668 123.84 123.866 113.642 136.41 107.25C150.671 99.9836 169.34 99.9836 206.676 99.9836H433.317" stroke-linecap="round" stroke-linejoin="round" stroke-width="66.6667" /></svg> </button>

                <div class="content-grid-wraper">
                    <h3>Add New Book</h3>

                    <form>
                        <div class="form-group">
                            <label for="name">Book Name</label>
                            <input id="name" type="text" />
                        </div>

                        <div class="form-group">
                            <label for="author">Author</label>
                            <input id="author" type="text" />
                        </div>

                        <div class="form-group">
                            <label for="img">Image URL</label>
                            <input id="img" type="text" />
                        </div>

                        <div class="form-group">
                            <label for="price">Price</label>
                            <input id="price" type="number" />
                        </div>

                        <div class="form-group">
                            <label for="rate">Rating</label>
                            <input id="rate" type="number" />
                        </div>

                        <div class="form-group">
                            <label for="stock">Stock</label>
                            <input id="stock" type="number" />
                        </div>

                    </form>
                </div>
                <div class="btn-box">
                    <button class="txt-btn btn-primary btn-disabled" onclick="onAddBook()">Add</button>
                </div>
`
}

function renderUpdateBook(book) {
    const elPanel = document.querySelector(`.side-panel`)
    elPanel.classList.remove(`no-act-btn`)

    elPanel.innerHTML = `
                <button class="close-panel-btn" onclick="onCloseSidePanel()"><svg fill="none" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"> <path d="M566.65 533.317L699.983 399.983M699.983 399.983L566.65 266.65M699.983 399.983H299.984M433.317 699.983H206.676C169.34 699.983 150.671 699.983 136.41 692.717C123.866 686.327 113.668 676.127 107.276 663.583C100.01 649.323 100.01 630.653 100.01 593.317V206.65C100.01 169.314 100.01 150.645 107.276 136.384C113.668 123.84 123.866 113.642 136.41 107.25C150.671 99.9836 169.34 99.9836 206.676 99.9836H433.317" stroke-linecap="round" stroke-linejoin="round" stroke-width="66.6667" /></svg> </button>

                <div class="content-grid-wraper">
                    <h3>${book.title}</h3>
                    <img class="book-cover" src="${book.imgUrl}" alt="Book-cover">
                    
                    <form>
                        <div class="form-group">
                            <label for="name">Book Name</label>
                            <input id="name" type="text" value="${book.title}" />
                        </div>

                        <div class="form-group">
                            <label for="author">Author</label>
                            <input id="author" type="text" value="${book.author}"/>
                        </div>

                        <div class="form-group">
                            <label for="img">Image URL</label>
                            <input id="img" type="text" value="${book.imgUrl}"/>
                        </div>

                        <div class="form-group">
                            <label for="price">Price</label>
                            <input id="price" type="number" value="${book.price}"/>
                        </div>

                        <div class="form-group">
                            <label for="rate">Rating</label>
                            <input id="rate" type="number" value="${book.rate}"/>
                        </div>

                        <div class="form-group">
                            <label for="stock">Stock</label>
                            <input id="stock" type="number" value="${book.stock}"/>
                        </div>

                    </form>
                </div>
                <div class="btn-box">
                    <button class="txt-btn btn-primary btn-disabled" onclick="onUpdateBook('${book.id}')">Update</button>
                </div>
`
}

function onAddBook() {
    const data = {
        title: document.querySelector(`.side-panel #name`).value,
        author: document.querySelector(`.side-panel #author`).value,
        price: +document.querySelector(`.side-panel #price`).value,
        rate: +document.querySelector(`.side-panel #rate`).value,
        stock: +document.querySelector(`.side-panel #stock`).value,
        imgUrl: document.querySelector(`.side-panel #img`).value
    }

    addBook(data)
    onCloseSidePanel()
    renderBooks()
    showPopUpMsg(`success`, `You have added a new book!`)
}

function onUpdateBook(bookId) {

    const data = {
        title: document.querySelector(`.side-panel #name`).value,
        author: document.querySelector(`.side-panel #author`).value,
        price: +document.querySelector(`.side-panel #price`).value,
        rate: +document.querySelector(`.side-panel #rate`).value,
        stock: +document.querySelector(`.side-panel #stock`).value,
        imgUrl: document.querySelector(`.side-panel #img`).value
    }

    updateBook(bookId, data)
    onCloseSidePanel()
    renderBooks()
    showPopUpMsg(`success`, `You have succesfully updated this book!`)
}

function onDeleteBook(bookId, ev) {
    if (ev) ev.stopPropagation()
    renderConfirmDelete(bookId)
}

function onViewBookClick(bookId) {
    const book = getBookById(bookId)
    renderViewBook(book)
    OpenSidePanel()
}

function renderViewBook(book) {
    const elPanel = document.querySelector(`.side-panel`)
    elPanel.classList.add(`no-act-btn`)

    elPanel.innerHTML = `
                <button class="close-panel-btn" onclick="onCloseSidePanel()"><svg fill="none" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"><path d="M566.65 533.317L699.983 399.983M699.983 399.983L566.65 266.65M699.983 399.983H299.984M433.317 699.983H206.676C169.34 699.983 150.671 699.983 136.41 692.717C123.866 686.327 113.668 676.127 107.276 663.583C100.01 649.323 100.01 630.653 100.01 593.317V206.65C100.01 169.314 100.01 150.645 107.276 136.384C113.668 123.84 123.866 113.642 136.41 107.25C150.671 99.9836 169.34 99.9836 206.676 99.9836H433.317" stroke-linecap="round" stroke-linejoin="round" stroke-width="66.6667" /></svg> </button>

                <div class="content-grid-wraper">
                    <h3>${book.title}</h3>
                    <button class="txt-btn btn-primary" onclick="onUpdateBtnClick('${book.id}')">Edit</button>

                    <img class="book-cover" src="${book.imgUrl}" alt="Book-cover" onerror="this.src='img/no-cover-default.webp'" >

                    <div class="detail-group">
                        <label>Author</label>
                        <p>${book.author}</p>
                    </div>

                    <div class="detail-group">
                        <label>Price</label>
                        <p>${book.price}</p>
                    </div>

                    <div class="detail-group">
                        <label>Rate</label>
                        <p>${book.rate}</p>
                    </div>

                    <div class="detail-group">
                        <label>Stock</label>
                        <p>${book.stock}</p>
                    </div>

                </div>`
}

function renderConfirmDelete(bookId) {
    var elBackdrop = document.querySelector(`.backdrop`)
    elBackdrop.innerHTML = `   
            <div class="modal">
                <p>Are you sure you wish to delete this book? </p>
                <div class="btns-container">
                    <button class="txt-btn btn-secondary" onclick="onCloseModal()">CANCEL</button>
                    <button class="txt-btn btn-primary warning" onclick="onDeleteConfirm('${bookId}')">DELETE</button>
                </div>
            </div>`
    elBackdrop.hidden = false
    elBackdrop.offsetHeight
    elBackdrop.classList.add(`bd-apperance`)
}

function onDeleteConfirm(bookId) {
    deleteBook(bookId)
    renderBooks()

    var elBackdrop = document.querySelector(`.backdrop`)
    elBackdrop.classList.remove(`bd-apperance`)
    setTimeout(() => {
        elBackdrop.hidden = true
        elBackdrop.innerHTML = ``
    }, 500)

    showPopUpMsg(`success`, `You have succesfully deleted this book!`)
}

function onCloseModal() {
    var elBackdrop = document.querySelector(`.backdrop`)

    elBackdrop.classList.remove(`bd-apperance`)
    setTimeout(() => {
        elBackdrop.hidden = true
        elBackdrop.innerHTML = ``
    }, 500)
}

function showPopUpMsg(type = `success`, msg = `Success!`) {
    const elPopUp = document.querySelector(`.pop-up-msg`)
    elPopUp.classList.add(type)
    const elMsg = document.querySelector(`.pop-up-msg p`)
    elMsg.innerText = msg

    elPopUp.hidden = false
    elPopUp.offsetHeight
    elPopUp.classList.add(`apperance`)

    setTimeout(() => {
        elPopUp.classList.remove(`apperance`)
        setTimeout(() => {
            elPopUp.hidden = false
            elMsg.innerText = ``
            elPopUp.classList.remove(`fail`, `success`)
        }, 500);
    }, 2500);
}

function onLayoutListBtnClick() {
    const elCardsGrid = document.querySelector(`.data-cards-container`)
    elCardsGrid.innerHTML = ``
    elCardsGrid.hidden = true

    gLayout = 'table'
    renderBooks()
}

function onLayoutCardsBtnClick() {
    const elListGrid = document.querySelector(`.data-cards-container`)
    elListGrid.innerHTML = ``
    elListGrid.hidden = true

    gLayout = 'cards'
    renderBooks()
}


function onBookCardMouseOver(elCard, id) {
    const elAtribContainer = document.querySelector(`.${id} .book-attrb-container`)
    const elBtnsContainer = document.querySelector(`.${id} .card-btns`)

    elCard.classList.add(`upper-layer`)
    elAtribContainer.classList.add(`flex`)
    elBtnsContainer.classList.add(`flex`)
    elAtribContainer.offsetHeight
    elBtnsContainer.offsetHeight
    elAtribContainer.classList.add(`visible`)
    elBtnsContainer.classList.add(`visible`)



}

function onBookCardMouseOut(elCard, id) {
    const elAtribContainer = document.querySelector(`.${id} .book-attrb-container`)
    const elBtnsContainer = document.querySelector(`.${id} .card-btns`)


    elCard.classList.remove(`upper-layer`)
    elAtribContainer.classList.remove(`flex`, `visible`)
    elBtnsContainer.classList.remove(`flex`, `visible`)


}

function onFilterChange() {
    const searchVal = document.querySelector(`input[name="search"]`).value
    const minRateVal = document.querySelector(`input[name="min-rate"]`).value
    const maxPriceVal = document.querySelector(`input[name="max-price"]`).value

    gQueryOptions.filterBy.search = searchVal
    gQueryOptions.filterBy.minRate = minRateVal
    gQueryOptions.filterBy.maxPrice = maxPriceVal

    renderBooks()

}

function onMaxPriceChange() {
    const maxPriceVal = document.querySelector(`input[name="max-price"]`).value
    const elValSpan = document.querySelector('.field-group.price span')
    elValSpan.innerText = maxPriceVal
}

function onMinRateChange() {
    const minRateVal = document.querySelector(`input[name="min-rate"]`).value
    const elValSpan = document.querySelector('.field-group.rate span')
    elValSpan.innerText = minRateVal
}

function onSortChange() {
    const sortBy = document.querySelector(`select[name="sort-by"]`).value
    var sortDir = document.querySelector(`input[name="sort-dir"]`).checked
    sortDir = sortDir === true ? -1 : 1

    gQueryOptions.sortBy.field = sortBy
    gQueryOptions.sortBy.dir = sortDir
    renderBooks()
}

function onResetFilters() {
    gQueryOptions.filterBy.search = null
    gQueryOptions.filterBy.minRate = 1
    gQueryOptions.filterBy.maxPrice = 999
    gQueryOptions.sortBy.field = null
    gQueryOptions.sortBy.dir = 1
    resetFiltersElements()
    console.log(gQueryOptions)
    renderBooks()
}

function resetFiltersElements() {
    document.querySelector(`input[name="search"]`).value = ''
    document.querySelector(`input[name="min-rate"]`).value = 0
    document.querySelector('.field-group.rate span').innerText = 0
    document.querySelector(`input[name="max-price"]`).value = null
    document.querySelector('.field-group.price span').innerText = 999

    document.querySelector(`select[name="sort-by"]`).value = ''
    document.querySelector(`input[name="sort-dir"]`).checked = false

}
