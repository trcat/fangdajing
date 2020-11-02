class Fangdajin {
  constructor(options) {
    this.container = document.querySelector(options.el);
    this.img = null;
    this.canvas = null;
    this.ctx = null;
    this.areaRect = null;
    this.areaRectWidth = 250;
    this.areaRectHeight = 300;

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
    canvas.width = this.getElementWidth(this.container);
    canvas.height = this.getElementHeight(this.container);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.container.append(this.canvas);
  }
  generateAreaRect() {
    const areaRect = document.createElement("div");
    areaRect.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    areaRect.style.position = "absolute";
    areaRect.style.display = "none";
    areaRect.style.width = this.areaRectWidth + "px";
    areaRect.style.height = this.areaRectHeight + "px";
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
      const containerWidth = this.getElementWidth(this.container);
      const containerHeight = this.getElementHeight(this.container);
      const minTop = this.container.getBoundingClientRect().top;
      const maxTop = minTop + containerHeight;
      const minLeft = this.container.getBoundingClientRect().left;
      const maxLeft = minLeft + containerWidth;

      if (x >= minLeft && x <= maxLeft && y >= minTop && y <= maxTop) {
        let top = y - 150;
        let left = x - 125;

        if (x < minLeft + this.areaRectWidth / 2) {
          left = minLeft;
        } else if (x > maxLeft - this.areaRectWidth / 2) {
          left = maxLeft - this.areaRectWidth;
        }

        if (y < minTop + this.areaRectHeight / 2) {
          top = minTop;
        } else if (y > maxTop - this.areaRectHeight / 2) {
          top = maxTop - this.areaRectHeight;
        }

        this.areaRect.style.display = "block";
        this.areaRect.style.top = top + "px";
        this.areaRect.style.left = left + "px";
      }
    });
  }
  /**
   * 获取对应元素的宽度
   * @param {HTMLElement} element
   * @return {number}
   */
  getElementWidth(element) {
    return Number(window.getComputedStyle(element).width.split("px")[0]);
  }
  /**
   * 获取对应元素的高度
   * @param {HTMLElement} element
   * @return {number}
   */
  getElementHeight(element) {
    return Number(window.getComputedStyle(element).height.split("px")[0]);
  }
}

new Fangdajin({
  el: ".fangdajin",
}).init();
