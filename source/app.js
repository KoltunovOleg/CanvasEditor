 /**
*Connecting the Library fabric-webpack
*/
// var Canvas = require('canvas-prebuilt');
var fabric = require('fabric-webpack').fabric;

export default function () {
 /**
 *Pattern
 *http://fabricjs.com/freedrawing
 */ 
  let $_fabric = (id) => document.getElementById(id);
  var canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true
  });

  fabric.Object.prototype.transparentCorners = false;

  var drawingOptionsEl = $_fabric('drawing-mode-options'),
      drawingColorEl = $_fabric('drawing-color'),
      drawingLineWidthEl = $_fabric('drawing-line-width'),
      clearEl = $_fabric('clear-canvas');

  clearEl.onclick = function() { canvas.clear() };


  if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');
      
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 2;

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 5;
      var patternCanvas = fabric.document.createElement('canvas');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var canvasWidth = rect.getBoundingRectWidth();

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext('2d');
      rect.render(ctx);

      return patternCanvas;
    };

    // var img = new Image();
    // img.src = '../assets/honey_im_subtle.png';

    // var texturePatternBrush = new fabric.PatternBrush(canvas);
    // texturePatternBrush.source = img;
  }

  $_fabric('drawing-mode-selector').onchange = function() {

    if (this.value === 'hline') {
      canvas.freeDrawingBrush = vLinePatternBrush;
    }
    else if (this.value === 'vline') {
      canvas.freeDrawingBrush = hLinePatternBrush;
    }
    else if (this.value === 'square') {
      canvas.freeDrawingBrush = squarePatternBrush;
    }
    else if (this.value === 'diamond') {
      canvas.freeDrawingBrush = diamondPatternBrush;
    }
    else if (this.value === 'texture') {
      canvas.freeDrawingBrush = texturePatternBrush;
    }
    else {
      canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
    }

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingColorEl.value;
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      // canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
    }
  };

  drawingColorEl.onchange = function() {
    canvas.freeDrawingBrush.color = this.value;
  };
  // drawingShadowColorEl.onchange = function() {
  //   canvas.freeDrawingBrush.shadowColor = this.value;
  // };
  drawingLineWidthEl.onchange = function() {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    this.previousSibling.innerHTML = this.value;
  };
  // drawingShadowWidth.onchange = function() {
  //   canvas.freeDrawingBrush.shadowBlur = parseInt(this.value, 10) || 0;
  //   this.previousSibling.innerHTML = this.value;
  // };
  // drawingShadowOffset.onchange = function() {
  //   canvas.freeDrawingBrush.shadowOffsetX =
  //   canvas.freeDrawingBrush.shadowOffsetY = parseInt(this.value, 10) || 0;
  //   this.previousSibling.innerHTML = this.value;
  // };

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadowBlur = 0;
  }
/** 
 * ---------------------------------------------------------------------------------
 */

/**
 * Functions of save and switches
 */
jQuery(document).ready(() => {
    /**
     * Declare the initial value in localstorage
     */
    localStorage.setItem("count", 0);
    localStorage.setItem('undoCount', localStorage.getItem('count'));
    
    $('#redo').addClass('disabled');
    $('#redo').attr('disabled', true);
    $('#undo').addClass('disabled');
    $('#undo').attr('disabled', true);
    /**
     * Save current image
     */
    $('#save').on('click', () => {
      let value = localStorage.getItem("count");
      let newvalue;
      /**
       * Checking for a recorded value in localstorage
       */
      if (value >= 0) {
        newvalue = ++value;
        $('#undo').removeClass('disabled');
        $('#undo').attr('disabled', false);
      } else {
        newvalue = 0;
        $('#undo').addClass('disabled');
        $('#undo').attr('disabled', true);
      };
      let dataURL = canvas.toDataURL('jpg');
      localStorage.setItem("count", newvalue);
      localStorage.setItem("undoCount", newvalue);
      localStorage.setItem('liquImage-' + newvalue, dataURL);

      return false;
    });
    /**
     * Go to previous
     */
    $('#undo').on('click', () => {
      let value = localStorage.getItem('undoCount');
      let newvalue;
      /**
       * Checking for a recorded value in localstorage
       */
      if (value > 1) {
        newvalue = --value;
        $('#undo').removeClass('disabled');
        $('#undo').attr('disabled', false);
        $('#redo').removeClass('disabled');
        $('#redo').attr('disabled', false);
      } else {
        newvalue = 0;
        $('#undo').addClass('disabled');
        $('#undo').attr('disabled', true);
      };
      /**
       * Saving the value and displaying the previous image
       */
      localStorage.setItem('undoCount', newvalue);
      // $('#redo').addClass('disabled');
      canvas.clear();
      fabric.Image.fromURL(localStorage.getItem('liquImage-' + newvalue), (oImg) => {
        canvas.add(oImg);
      });
      return false;
    });
    /**
     * Go back
     */
    $('#redo').on('click', () => {
      let undoValue = localStorage.getItem('undoCount');
      let value = localStorage.getItem('count');
      let newvalue;
      /**
       * Checking for a recorded value in localstorage
       */
      if (undoValue < value) {
        newvalue = ++undoValue;
        $('#redo').removeClass('disabled');
        $('#redo').attr('disabled', false);
        $('#undo').removeClass('disabled');
        $('#undo').attr('disabled', false);
      } else {
        newvalue = value;
        $('#redo').addClass('disabled');
        $('#redo').attr('disabled', true);
        $('#undo').removeClass('disabled');
        $('#undo').attr('disabled', false);
      };
      /**
       * Saving the value and displaying the next image
       */
      localStorage.setItem('undoCount', newvalue);
      // $('#undo').removeClass('disabled');
      canvas.clear();
      fabric.Image.fromURL(localStorage.getItem('liquImage-' + newvalue), (oImg) => {
        canvas.add(oImg);
      });
      return false;
    });


     /**
      * Filters
      */
     var filters = [
       new fabric.Image.filters.Grayscale(),       // grayscale    0
       new fabric.Image.filters.Sepia2(),          // sepia        1
       new fabric.Image.filters.Invert(),          // invert       2
       new fabric.Image.filters.Convolute({        // emboss       3
         matrix: [ 
                   1,   1,    1,
                   1,  0.7,  -1,
                  -1,  -1,   -1
                 ]
       }),
       new fabric.Image.filters.Convolute({        // sharpen      4
         matrix: [
                   0,  -1.1,   0,
                  -1,    5,   -1,
                   0,   -1,    0
                 ]
       })
     ];
     /**
      * -------------------------------------------------------------
      */
      /**
       * Подгрузка изображения как объекта из canvas для последующего наложения фильтра
       */
     $('.upper-canvas').on( "mouseout", function(){
      
      let overlayImageUrl = canvas.toDataURL('jpg');
      fabric.Image.fromURL(overlayImageUrl, (image) => {
        canvas.clear();
        canvas.add(image);
      });
     });
     /**
      * Switch on / off filters
      */
    $('.filters_list label').on("change", "input", function () {
      /**
       * Получение объекта изображения из канвы
       */
        var obj = canvas.item(0),
        /**
         * Получение атрибутов checkboxes
         */
            isChecked = $(this).prop("checked"),
            filter = $(this).data("filter");
        /**
         * Применение filter c соответствии выбранному checkbox
         */
        obj.filters[filter] = isChecked ? filters[filter] : null;
        obj.applyFilters(() => {
            canvas.renderAll();
        });
    });
});
  /** 
 * ---------------------------------------------------------------------------------
 */
}
