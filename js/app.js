const BASE_HEADER = "Some text header"
const BASE_ITEM_HEADER = "New paragraph"
const BASE_PARAGRAPH_TEXT = '<p contenteditable>New text of paragraph</p>'

var app = new Vue({
    el: '#app',
    data: {
        title: BASE_HEADER,
        items: [],
        message: null
    },
    created: function () {
        this.title = window.localStorage.getItem("text_title") || BASE_HEADER
        this.items = JSON.parse(window.localStorage.getItem("text_data")) || []
    },
    methods: {
        saveData() {
            // get really current data from html
            this.title = document.getElementById("page_title").innerHTML
            let items_title = document.getElementsByClassName("item-wrapper-title")
            let items_text = document.getElementsByClassName("item-wrapper-text")
            for (var i = 0; i < items_title.length; i++) {
                this.items[i].title = items_title[i].innerHTML
                this.items[i].text = items_text[i].innerHTML
            }

            window.localStorage.setItem('text_data', JSON.stringify(this.items))
            window.localStorage.setItem('text_title', this.title)
            this.message = "Data was successfully saved!"
            setTimeout(() => {
                this.message = null
            }, 3000)
        },
        clearData: function () {
            window.localStorage.removeItem("text_data")
            this.items = []
            window.localStorage.removeItem("text_title")
            this.title = BASE_HEADER
            this.message = "Data was successfully cleared!"
        },
        deleteItem: function (index) {
            this.items.splice(index, 1)
        },
        addItem: function () {
            this.items.push({
                'title': BASE_ITEM_HEADER,
                'text': BASE_PARAGRAPH_TEXT
            })
        },
        addParagraph(index) {
            this.items[index].text = this.items[index].text + BASE_PARAGRAPH_TEXT;
        },
        scrollTo(index) {
            window.scroll({
                behavior: 'smooth',
                left: 0,
                top: document.getElementById("item" + index).offsetTop
            });
        },
        saveHtml() {
            // TODO 
            this.message = "This function isn't ready yet!"
        },
        savePdf() {
            this.saveData()
            let doc = new jsPDF(),         
                elementHandler = {
                    '.item-menu': function (element, renderer) {
                        return true;
                    },
                    '#menu': function (element, renderer) {
                        return true;
                    },
                    '#summary': function (element, renderer) {
                        return true;
                    },
                }
            doc.fromHTML(
                document.getElementById("app"),
                15,
                15,
                {
                    'width': 80,'elementHandlers': elementHandler
                }
            );
            doc.save(this.title + '.pdf');
        }
    }
});