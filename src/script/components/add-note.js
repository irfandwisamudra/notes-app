import Notes from "../data/local/notes.js";

class AddNote extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      .add-note h4 {
        margin-bottom: 10px;
        font-size: 1.5em;
        color: var(--primary-color);
      }

      .add-note .input-group {
        margin-bottom: 10px;
      }

      .add-note .input-group textarea {
        resize: vertical;
      }

      .add-note .form-label {
        display: block;
        margin-bottom: 5px;
        font-size: 1em;
        color: var(--dark-color);
      }

      .add-note .form-control {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        background-color: var(--light-color);
        color: var(--dark-color);
        border: 1px solid var(--tertiary-color);
        box-sizing: border-box;
        outline: none;
      }

      .add-note .form-control:focus {
        border: 1px solid var(--tertiary-color);
        box-shadow: 0 0 0 0.25rem rgba(0, 74, 173, 0.25);
      }

      .add-note .add-button {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        background-color: var(--primary-color);
        color: var(--light-color);
        cursor: pointer;
        border: none;
      }

      .add-note .add-button:hover {
        background-color: blue;
      }

      .add-note .add-button:focus {
        box-shadow: 0 0 0 0.25rem rgba(0, 74, 173, 0.25);
      }

      .add-note .add-button i {
        margin-left: 5px;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      <section class="add-note">
        <h4>Tambahkan Catatan Baru</h4>
        <form id="addNote">
          <div class="input-group">
            <label class="form-label" for="inputNoteTitle">Judul</label>
            <input
              class="form-control"
              id="inputNoteTitle"
              type="text"
              required
            />
          </div>
          <div class="input-group">
            <label class="form-label" for="inputNoteDescription">Deskripsi</label>
            <textarea
              class="form-control"
              id="inputNoteDescription"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="input-group">
            <button class="add-button" type="submit">
              Tambah
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </div>
        </form>
      </section>
    `;

    this._shadowRoot
      .querySelector("#addNote")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.addNote();
      });
  }

  addNote() {
    const title = this._shadowRoot.querySelector("#inputNoteTitle").value;
    const description = this._shadowRoot.querySelector(
      "#inputNoteDescription"
    ).value;

    if (title && description) {
      const newNote = {
        id: `notes-${Date.now()}`,
        title: title,
        body: description,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      Notes.addNote(newNote);
      alert("Catatan baru berhasil ditambahkan!");
      this._shadowRoot.querySelector("#addNote").reset();
    }
  }
}

customElements.define("add-note", AddNote);