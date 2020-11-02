class Fangdajin {
  constructor(options) {
    this.container = document.querySelector(options.el);
    this.img = null;
    this.canvas = null;
    this.ctx = null;
    this.areaRect = null;
    this.areaRectX = 0;
    this.areaReactY = 0;

    this.container.style.position = "relative";
  }
  init() {
    this.generateCanvas();
    this.generateAreaRect();
    this.drawImage();
    this.addEventListener();
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
  }
  generateAreaRect() {
    const areaRect = document.createElement("div");
    areaRect.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    areaRect.style.position = "absolute";
    areaRect.style.display = "none";
    this.areaRect = areaRect;
    document.body.append(this.areaRect);
  }
  drawImage() {
    const img = new Image();
    img.src = this.container.getAttribute("data-img-src");
    img.addEventListener("load", () => {
      this.ctx.drawImage(this.img, 0, 0);
    });
    this.img = img;
  }
  addEventListener() {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const minTop = this.container.getBoundingClientRect().top;
      const maxTop =
        this.container.getBoundingClientRect().top +
        Number(window.getComputedStyle(this.container).height.split("px")[0]);
      const minLeft = this.container.getBoundingClientRect().left;
      const maxLeft =
        this.container.getBoundingClientRect().left +
        Number(window.getComputedStyle(this.container).width.split("px")[0]);
      if (x >= minLeft && x <= maxLeft && y >= minTop && y <= maxTop) {
        this.areaRect.style.display = "block";
        this.areaRect.style.width = "250px";
        this.areaRect.style.height = "300px";
        this.areaRect.style.top = y - 150 + "px";
        this.areaRect.style.left = x - 125 + "px";
      }
    });
  }
}

new Fangdajin({
  el: ".fangdajin",
}).init();
