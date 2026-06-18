document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('drawbox');
  const ctx = canvas.getContext('2d');
  const submitBtn = document.getElementById('submit-drawing');
  const clearBtn = document.getElementById('clear-drawing');
  const undoBtn = document.getElementById('undo-btn');
  const fillBtn = document.getElementById('fill-btn');
  const eraserBtn = document.getElementById('eraser-btn');
  const brushBtn = document.getElementById('brush-btn');
  const brushSizeInput = document.getElementById('brush-size');
  const saveBtn = document.getElementById('save-drawing');
  const submitBtnTextP = submitBtn.querySelector('p');
  const colorPicker = document.getElementById('color-picker');
  const activeSwatches = document.getElementById('active-swatches');

  const palette = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080',
    '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080',
    '#4000ff', '#804000', '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00',
    '#00ff00', '#00ffff', '#0000FF', '#FF00FF', '#FFFF80', '#00ff80',
    '#80FFFF', '#8080ff', '#ff0080', '#ff8040'
  ];

  let primaryColor = '#000000';
  let secondaryColor = '#FFFFFF';
  let activeSwatch = 'primary';
  let drawing = false;
  let hasDrawn = false;
  let tool = 'brush';
  let fillMode = false;

  const WIDTH = 450;
  const HEIGHT = 338;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const undoStack = [];
  const maxUndoSteps = 10;

  function renderPalette() {
    palette.forEach(color => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color;
      swatch.addEventListener('click', () => {
        updateColor('primary', color);
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
      });
      swatch.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        updateColor('secondary', color);
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
      });
      colorPicker.appendChild(swatch);
    });
    colorPicker.firstChild.classList.add('selected');
    renderActiveSwatches();
  }

  function renderActiveSwatches() {
    activeSwatches.innerHTML = '';
    const primarySwatch = document.createElement('div');
    primarySwatch.className = `active-swatch ${activeSwatch === 'primary' ? 'active' : ''}`;
    primarySwatch.style.backgroundColor = primaryColor;
    primarySwatch.title = 'Primary Color (Left Click)';
    primarySwatch.addEventListener('click', () => {
      activeSwatch = 'primary';
      updateSelectedColor(primaryColor);
      updateActiveSwatchStyles();
    });

    const secondarySwatch = document.createElement('div');
    secondarySwatch.className = `active-swatch ${activeSwatch === 'secondary' ? 'active' : ''}`;
    secondarySwatch.style.backgroundColor = secondaryColor;
    secondarySwatch.title = 'Secondary Color (Right Click)';
    secondarySwatch.addEventListener('click', () => {
      activeSwatch = 'secondary';
      updateSelectedColor(secondaryColor);
      updateActiveSwatchStyles();
    });

    activeSwatches.appendChild(primarySwatch);
    activeSwatches.appendChild(secondarySwatch);
  }

  function updateColor(swatchType, color) {
    if (swatchType === 'primary') {
      primaryColor = color;
      if (activeSwatch === 'primary') updateSelectedColor(color);
    } else {
      secondaryColor = color;
      if (activeSwatch === 'secondary') updateSelectedColor(color);
    }
    renderActiveSwatches();
  }

  function updateActiveSwatchStyles() {
    const swatches = activeSwatches.querySelectorAll('.active-swatch');
    swatches.forEach(swatch => swatch.classList.remove('active'));
    swatches[activeSwatch === 'primary' ? 0 : 1].classList.add('active');
  }

  function updateSelectedColor(newColor) {
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : newColor;
  }

  function setBrushSettings() {
    ctx.lineWidth = brushSizeInput.value ? parseInt(brushSizeInput.value, 10) : 2;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : (activeSwatch === 'primary' ? primaryColor : secondaryColor);
  }

  function saveState() {
    if (undoStack.length >= maxUndoSteps) undoStack.shift();
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    undoBtn.disabled = false;
  }

  function undo() {
    if (undoStack.length === 0) return;
    const imageData = undoStack.pop();
    ctx.putImageData(imageData, 0, 0);
    if (undoStack.length === 0) {
      undoBtn.disabled = true;
      hasDrawn = false;
      disableButton(submitBtn);
      disableButton(clearBtn);
      disableButton(saveBtn);
    }
  }

  function enableButton(btn) {
    btn.disabled = false;
    btn.setAttribute('aria-disabled', 'false');
    btn.style.pointerEvents = 'auto';
    btn.classList.remove('disabled');
  }

  function disableButton(btn) {
    btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
    btn.style.pointerEvents = 'none';
    btn.classList.add('disabled');
  }

  function enableControls() {
    enableButton(submitBtn);
    enableButton(clearBtn);
    enableButton(saveBtn);
  }

  function disableControls() {
    disableButton(submitBtn);
    disableButton(clearBtn);
    disableButton(saveBtn);
  }

  function clearCanvas() {
    saveState();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hasDrawn = false;
  }

  disableControls();
  undoBtn.disabled = true;
  setBrushSettings();

  function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.offsetX,
        y: e.offsetY,
      };
    }
  }

  function pointerDownHandler(e) {
    if (fillMode) return;
    e.preventDefault();
    drawing = true;
    saveState();
    const pos = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    if (e.button === 2) {
      activeSwatch = 'secondary';
      updateSelectedColor(secondaryColor);
      updateActiveSwatchStyles();
    } else {
      activeSwatch = 'primary';
      updateSelectedColor(primaryColor);
      updateActiveSwatchStyles();
    }
  }

  function pointerMoveHandler(e) {
    if (!drawing || fillMode) return;
    e.preventDefault();
    const pos = getPointerPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    if (!hasDrawn) {
      hasDrawn = true;
      enableControls();
    }
  }

  function pointerUpHandler(e) {
    if (fillMode) return;
    e.preventDefault();
    drawing = false;
    ctx.closePath();
  }

  function pointerLeaveHandler(e) {
    if (drawing) {
      drawing = false;
      ctx.closePath();
    }
  }

  canvas.addEventListener('mousedown', pointerDownHandler);
  canvas.addEventListener('touchstart', pointerDownHandler, { passive: false });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  canvas.addEventListener('mousemove', pointerMoveHandler);
  canvas.addEventListener('touchmove', pointerMoveHandler, { passive: false });

  canvas.addEventListener('mouseup', pointerUpHandler);
  canvas.addEventListener('touchend', pointerUpHandler);

  canvas.addEventListener('mouseleave', pointerLeaveHandler);
  canvas.addEventListener('touchcancel', pointerLeaveHandler);

  canvas.addEventListener('click', (e) => {
    if (!fillMode) return;
    saveState();
    const pos = getPointerPos(e);
    floodFill(pos.x, pos.y);
    hasDrawn = true;
    enableControls();
  });

  function floodFill(x, y) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = getColorAt(imageData, x, y);
    const fillColor = hexToRgba(activeSwatch === 'primary' ? primaryColor : secondaryColor);

    if (colorsMatch(targetColor, fillColor)) return;

    const stack = [[x, y]];

    while (stack.length) {
      const [cx, cy] = stack.pop();
      const currentColor = getColorAt(imageData, cx, cy);
      if (!colorsMatch(currentColor, targetColor)) continue;

      setColorAt(imageData, cx, cy, fillColor);

      if (cx > 0) stack.push([cx - 1, cy]);
      if (cx < canvas.width - 1) stack.push([cx + 1, cy]);
      if (cy > 0) stack.push([cx, cy - 1]);
      if (cy < canvas.height - 1) stack.push([cx, cy + 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function getColorAt(imageData, x, y) {
    const i = (Math.floor(y) * imageData.width + Math.floor(x)) * 4;
    const d = imageData.data;
    return [d[i], d[i + 1], d[i + 2], d[i + 3]];
  }

  function setColorAt(imageData, x, y, [r, g, b, a]) {
    const i = (Math.floor(y) * imageData.width + Math.floor(x)) * 4;
    const d = imageData.data;
    d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = a;
  }

  function colorsMatch(c1, c2) {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
  }

  function hexToRgba(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b, 255];
  }

  undoBtn.addEventListener('click', undo);

  fillBtn.addEventListener('click', () => {
    fillMode = !fillMode;
    fillBtn.classList.toggle('active', fillMode);

    if (fillMode) {
      eraserBtn.classList.remove('active');
      brushBtn.classList.remove('active');
      tool = 'fill';
    } else {
      tool = 'brush';
      brushBtn.classList.add('active');
      eraserBtn.classList.remove('active');
    }
    setBrushSettings();
  });

  eraserBtn.addEventListener('click', () => {
    if (tool === 'eraser') {
      tool = 'brush';
      eraserBtn.classList.remove('active');
      brushBtn.classList.add('active');
      fillMode = false;
      fillBtn.classList.remove('active');
    } else {
      tool = 'eraser';
      eraserBtn.classList.add('active');
      brushBtn.classList.remove('active');
      fillMode = false;
      fillBtn.classList.remove('active');
    }
    setBrushSettings();
  });

  brushBtn.addEventListener('click', () => {
    tool = 'brush';
    brushBtn.classList.add('active');
    eraserBtn.classList.remove('active');
    fillMode = false;
    fillBtn.classList.remove('active');
    setBrushSettings();
  });

  brushSizeInput.addEventListener('input', () => {
    setBrushSettings();
  });

  function setSubmitButtonText(text) {
    submitBtnTextP.innerHTML = (text.toLowerCase() === 'submit') ?
      `<span style="text-decoration: underline;">S</span>ubmit` : text;
  }

submitBtn.addEventListener('click', () => {
  if (!hasDrawn) return;
  setSubmitButtonText('Submitting...');
  disableButton(submitBtn);
  const dataURL = canvas.toDataURL('image/png');

  fetch('https://draws.howsoonisnow.workers.dev/', {
    method: 'POST',
    body: JSON.stringify({ image: dataURL }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        alert(result.message);
      } else {
        alert('Error: ' + result.message);
      }
    })
    .catch(err => alert('Error: ' + err.message))
    .finally(() => setSubmitButtonText('Submit'));
});

  clearBtn.addEventListener('click', () => {
    clearCanvas();
    setSubmitButtonText('Submit');
    disableControls();
  });

  saveBtn.addEventListener('click', () => {
    if (!hasDrawn) return;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  undoBtn.addEventListener('mousedown', () => {
    if (!undoBtn.disabled) undoBtn.classList.add('pressed');
  });

  undoBtn.addEventListener('mouseup', () => {
    undoBtn.classList.remove('pressed');
  });

  undoBtn.addEventListener('mouseleave', () => {
    undoBtn.classList.remove('pressed');
  });

  const popup = document.getElementById('popup1');
  const clickText = document.getElementById('clickdraw');
  const dragBar = popup.querySelector('.bar');

  clickText.onclick = () => {
    popup.style.visibility = 'hidden';
    popup.style.display = 'block';
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 5;
    const maxLeft = scrollLeft + viewportWidth - popupWidth - margin;
    const maxTop = scrollTop + viewportHeight - popupHeight - margin;
    const minLeft = scrollLeft + margin;
    const minTop = scrollTop + margin;
    const finalLeft = maxLeft < minLeft ? minLeft : (minLeft + Math.floor(Math.random() * (maxLeft - minLeft)));
    const finalTop = maxTop < minTop ? minTop : (minTop + Math.floor(Math.random() * (maxTop - minTop)));
    popup.style.position = 'absolute';
    popup.style.left = finalLeft + 'px';
    popup.style.top = finalTop + 'px';
    popup.style.visibility = 'visible';
    popup.style.display = 'block';
  };

  let offsetX = 0, offsetY = 0, isDragging = false;

dragBar.addEventListener('mousedown', (e) => {
  if (e.target.closest('button')) return;

  isDragging = true;
  offsetX = e.clientX - popup.offsetLeft;
  offsetY = e.clientY - popup.offsetTop;
  document.body.classList.add('noselect');
  e.preventDefault();
});

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      popup.style.left = (e.clientX - offsetX) + 'px';
      popup.style.top = (e.clientY - offsetY) + 'px';
      e.preventDefault();
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.classList.remove('noselect');
  });

  const extraControls = document.getElementById('extra-controls');
  extraControls.style.position = 'absolute';

  let ecDragging = false;
  let ecOffsetX = 0;
  let ecOffsetY = 0;

  extraControls.addEventListener('mousedown', (e) => {
    ecDragging = true;
    ecOffsetX = e.clientX - extraControls.offsetLeft;
    ecOffsetY = e.clientY - extraControls.offsetTop;
    document.body.classList.add('noselect');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!ecDragging) return;
    extraControls.style.left = (e.clientX - ecOffsetX) + 'px';
    extraControls.style.top = (e.clientY - ecOffsetY) + 'px';
    e.preventDefault();
  });

  document.addEventListener('mouseup', () => {
    ecDragging = false;
    document.body.classList.remove('noselect');
  });

  renderPalette();
});