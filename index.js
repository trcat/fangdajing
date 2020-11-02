class Fangdajin {
  constructor(options) {
    this.container = document.querySelector(options.el);
    this.img = null;
    this.canvas = null;
    this.ctx = null;
  }
  init() {
    this.generateCanvas();
  }
  generateCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = window.getComputedStyle(this.container).width.split("px")[0];
    canvas.height = window
      .getComputedStyle(this.container)
      .height.split("px")[0];
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.container.append(this.canvas);
    this.drawImage();
  }
  drawImage() {
    const img = new Image();
    img.src = this.container.getAttribute("data-img-src");
    img.addEventListener("load", () => {
      this.ctx.drawImage(this.img, 0, 0);
    });
    this.img = img;
  }
}

new Fangdajin({
  el: ".fangdajin",
}).init();
