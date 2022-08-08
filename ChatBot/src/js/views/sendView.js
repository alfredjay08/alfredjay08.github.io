class sendView {
  _parentEl = document.querySelector(".config--container");

  _clearInput() {
    this._parentEl.querySelector(".input--message").value = "";
  }

  addHandlerSend(handler) {
    this._parentEl.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".btn--send");

        if (!btn) return;

        const message = e.currentTarget.querySelector(".input--message").value;

        if (!message) return;

        this._clearInput();

        handler(message);
      }.bind(this)
    );
  }
}

export default new sendView();
