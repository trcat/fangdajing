const source = document.getElementById("source");
source.style.position = "relative";
source.style.overflow = "hidden";
const area = document.createElement("div");
area.style.position = "absolute";
area.style.width = "100px";
area.style.height = "100px";
area.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
area.style.top = "-100px";
area.style.left = "-100px";

source.append(area);

source.addEventListener("mousemove", (e) => {
  const x = e.clientX - source.getBoundingClientRect().left;
  const y = e.clientY;
  let top, left;
  if (x - 50 >= 0 && x + 50 <= 1121) {
    left = x - 50;
  } else if (x - 50 < 0) {
    left = 0;
  } else {
    left = 1021;
  }
  if (y - 50 >= 0 && y + 50 <= 701) {
    top = y - 50;
  } else if (y - 50 < 0) {
    top = 0;
  } else {
    top = 601;
  }
  area.style.top = top + "px";
  area.style.left = left + "px";
});
