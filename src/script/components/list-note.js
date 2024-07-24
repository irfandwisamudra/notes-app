import Notes from "../data/local/notes.js";

class ListNote extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._notes = Notes.getAllNotes();
  }

  _updateStyle() {
    this._style.textContent = `
      .list-note h4 {
        margin-bottom: 10px;
        font-size: 1.5em;
        color: var(--primary-color);
      }

      #listNote {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr 1fr;
      }

      .note-item {
        padding: 1rem;
        border-radius: 5px;
        background-color: var(--light-color);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .note-item h5 {
        margin: 0 0 10px 0;
        font-size: 1.2em;
        color: var(--secondary-color);
      }

      .note-item p {
        margin: 0 0 10px 0;
        font-size: 1em;
        color: var(--dark-color);
      }

      .note-item small {
        font-size: 0.8em;
        color: var(--dark-color);
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
    this._registerEvents();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    
    this._shadowRoot.innerHTML += `
      <div class="list-note">
        <section>
          <h4>Daftar Catatan</h4>
          <div id="listNote"></div>
        </section>
      </div>
    `;
    this._renderNotes(this._notes);
  }

  _renderNotes(notes) {
    const listNote = this._shadowRoot.getElementById('listNote');
    listNote.innerHTML = "";

    // Mengurutkan catatan berdasarkan tanggal terbaru
    const sortedNotes = notes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    sortedNotes.forEach((note) => {
      const noteItem = document.createElement('div');
      noteItem.className = 'note-item';
      noteItem.innerHTML = `
        <h5>${note.title}</h5>
        <p>${note.body}</p>
        <small>${new Date(note.createdAt).toLocaleString()}</small>
      `;
      listNote.appendChild(noteItem);
    });
  }

  _registerEvents() {
    document.addEventListener('notes-updated', (event) => {
      this._renderNotes(event.detail.notes);
    });
  }
}

customElements.define('list-note', ListNote);
