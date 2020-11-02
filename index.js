class Fangdajin {
  constructor(options = {}) {
    this.container = document.querySelector(options.el);
    this.areaRectWidth = options.areaWidth || 250;
    this.areaRectHeight = options.areaHeight || 300;
    this.viewWidth = options.viewWidth || this.areaRectWidth;
    this.viewHeight = options.viewHeight || this.areaRectHeight;
    this.largeSize = options.largeSize || 2;
    this.img = null;
    this.canvas = null;
    this.ctx = null;
    this.areaRect = null;
    this.sideCanvas = null;
    this.sideCtx = null;
  }
  init() {
    // 检查 container 是否存在
    if (!this.container) {
      throw new Error("请检查是否设定 el 属性");
    } else {
      this.container.style.position = "relative";
    }

    this.generateCanvas();
    this.generateAreaRect();
    this.generateSideCanvas();
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
  generateSideCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this.viewWidth;
    canvas.height = this.viewHeight;
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.right = "-" + this.viewWidth + "px";
    this.sideCanvas = canvas;
    this.container.append(this.sideCanvas);
    this.sideCtx = this.sideCanvas.getContext("2d");
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

      // 定义多区域框的位置
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
        // 防止滚轮造成数据偏差
        top += window.scrollY;
        left += window.scrollX;
        // 设置 areaRect 位置
        this.areaRect.style.display = "block";
        this.areaRect.style.top = top + "px";
        this.areaRect.style.left = left + "px";
        // 绘画放大内容
        const cTop = top - minTop - window.scrollY;
        const cLeft = left - minLeft - window.scrollX;
        this.sideCtx.clearRect(0, 0, this.areaRectWidth, this.areaRectHeight);
        this.sideCtx.drawImage(
          this.canvas,
          cLeft,
          cTop,
          this.areaRectWidth,
          this.areaRectHeight,
          (this.areaRectWidth * this.largeSize - this.viewWidth) * -1 / 2,
          (this.areaRectHeight * this.largeSize - this.viewHeight) * -1 / 2,
          this.areaRectWidth * this.largeSize,
          this.areaRectHeight * this.largeSize
        );
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
  el: ".fangdajin", // 目标 css class, 必填
  areaWidth: 250, // 选择区域的宽度， 选填
  areaHeight: 300, // 选择区域的高度， 选填
  viewWidth: 250, // 显示区域的宽度， 选填
  viewHeight: 300, // 显示区域的高度， 选填
  largeSize: 2, // 发大选择区域的倍数， 选填
}).init();
