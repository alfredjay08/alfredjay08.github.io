class messageView {
  _parentEl = document.querySelector(".message--container");
  _data;

  render(data) {
    this._data = data;
    this._parentEl.insertAdjacentHTML("beforeend", this._markup);

    if (this._parentEl.firstElementChild.getBoundingClientRect().y < 0)
      this._parentEl.style.justifyContent = "flex-start";

    this._parentEl.lastElementChild.scrollIntoView({ behavior: "smooth" });
  }

  get _markup() {
    return this._data
      .map((msg) => {
        return `
        <div class="message-row ${msg.isSender ? "right" : "left"}">
          ${!msg.isSender ? '<div class="bot-icon">🤖</div>' : ""}
          <div class="message-content">
            <div class="message">${msg.message}</div>
            <div class="date">${this.formatDate(msg.date)}</div>
          </div>
          
          ${
            msg.isSender
              ? '<div class="bot-icon"><i class="fa-solid fa-user"></i></div>'
              : ""
          }
        </div>
      `;
      })
      .join("");
  }

  formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }

  addHandlerMessage(handler) {
    window.addEventListener("load", handler);
  }
}

export default new messageView();
