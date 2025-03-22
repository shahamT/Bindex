
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
}

function renderBooksCards(books) {

}

function onAddBookBtnClick() {
    renderAddBook()
    OpenSidePanel('add')
}

function onUpdateBtnClick(bookId,ev) {
    if(ev) ev.stopPropagation()
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
    const book = {
        id: 'bg' + gNxtId++,
        title: document.querySelector(`.side-panel #name`).value,
        author: document.querySelector(`.side-panel #author`).value,
        price: +document.querySelector(`.side-panel #price`).value,
        rate: +document.querySelector(`.side-panel #rate`).value,
        stock: +document.querySelector(`.side-panel #stock`).value,
        imgUrl: document.querySelector(`.side-panel #img`).value
    }
    addBook(book)
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

function onDeleteBook(bookId,ev) {
    if(ev) ev.stopPropagation()
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

                    <img class="book-cover" src="${book.imgUrl}" alt="Book-cover">

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