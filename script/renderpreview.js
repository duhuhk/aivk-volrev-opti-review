const prevs = document.querySelector('#preview-2d');
const pretx = prevs.getContext('2d');

pretx.fillRect(0,0,50,50);

function pythagoras(x, y){
   return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function renderPreview(stepIndex = step){
   // if(prevs.width != (xUpperBound - xLowerBound) && prevs.height != (yUpperBound - yLowerBound)){
   //    prevs.width = (xUpperBound - xLowerBound) / 2;
   //    prevs.height = (yUpperBound - yLowerBound) / 2;
   // }
   pretx.clearRect(0,0,prevs.width,prevs.height);
   // pretx.translate(prevs.width / 2, prevs.height / 2);
   // pretx.setTransform(1, 0, 0, -1, prevs.width / 2, prevs.height / 2);
   let xScale = (prevs.width - 2) / (xUpperBound - xLowerBound);
   let xShift = -1 * xScale * xLowerBound;
   let yScale = -1 * (prevs.height - 2) / (yUpperBound - yLowerBound);
   let yShift = (-1 * yScale * yLowerBound) + prevs.height - 1;
   pretx.setTransform(1, 0, 0, 1, xShift + 1, yShift);

   pretx.strokeStyle = 'black';
   pretx.lineWidth = 2;
   // x-axis
   pretx.beginPath();
   pretx.moveTo(xLowerBound * xScale, 0);
   pretx.lineTo(xUpperBound * xScale, 0);
   pretx.closePath();
   pretx.stroke();
   // y-axis
   pretx.beginPath();
   pretx.moveTo(0, yLowerBound * yScale);
   pretx.lineTo(0, yUpperBound * yScale);
   pretx.closePath();
   pretx.stroke();

   pretx.lineWidth = 1;
   
   try{
      if(fIsSet){
         pretx.beginPath();
         pretx.moveTo(xLowerBound * xScale, Number(nerdamer('f(' + xLowerBound + ')').text('decimal')) * yScale);
         for(let i = xLowerBound; i < xUpperBound; i += stepIndex){
            let y = nerdamer('f(' + i + ')').text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            pretx.lineTo(i * xScale, Number(y) * yScale);
            // console.log((i * xScale) + ', ' + (Number(nerdamer('f(' + i + ')').text('decimal')) * yScale));
         }
         pretx.closePath();
         pretx.strokeStyle = color_f.value;
         pretx.stroke();
      }
      if(gIsSet){
         pretx.beginPath();
         pretx.moveTo(xLowerBound * xScale, Number(nerdamer('g(' + xLowerBound + ')').text('decimal')) * yScale);
         for(let j = xLowerBound; j < xUpperBound; j += stepIndex){
            let y = nerdamer('g(' + j + ')').text('decimal');
            if(y.substring(0,2) == '0-') y = y.substring(1);
            pretx.lineTo(j * xScale, Number(y) * yScale);
            // console.log(j + ', ' + Number(nerdamer('g(' + j + ')').text('decimal')));
         }
         pretx.closePath();
         pretx.strokeStyle = color_g.value;
         pretx.stroke();
      }
   }catch(err){
      errorLog.general.push(err);
      console.log(err);
   }

   pretx.setTransform(1, 0, 0, 1, 0, 0);

   pretx.strokeStyle = 'black';
   pretx.lineWidth = 2;
   // y-axis
   if(yLowerBound != -1 * yUpperBound){
      pretx.beginPath();
      pretx.moveTo(1,0);
      pretx.lineTo(1,prevs.height);
      pretx.moveTo(1,prevs.height / 2);
      pretx.lineTo(10,prevs.height / 2);
      pretx.closePath();
      pretx.stroke();
   }
   // x-axis
   if(xLowerBound != -1 * xUpperBound){
      pretx.beginPath();
      pretx.moveTo(0, prevs.height - 1);
      pretx.lineTo(prevs.width, prevs.height - 1);
      pretx.moveTo(prevs.width / 2, prevs.height - 1);
      pretx.lineTo(prevs.width / 2, prevs.height - 1 - 10);
      pretx.closePath();
      pretx.stroke();
   }

   // window.requestAnimationFrame(renderPreview);
}

// window.requestAnimationFrame(renderPreview);
renderPreview(step * 100);
window.setTimeout(renderPreview, 1);

input_f.addEventListener('keyup', e => {
   renderPreview(step * 10);
   // renderPreview();
});
input_f.addEventListener('blur', e => renderPreview());

input_g.addEventListener('keyup', e => {
   renderPreview(step * 10);
   // renderPreview();
});
input_g.addEventListener('blur', e => renderPreview());

input_s.addEventListener('blur', e => renderPreview());

input_yLo.addEventListener('keyup', e => {
   renderPreview(step * 10);
   // renderPreview();
});
input_yLo.addEventListener('blur', e => renderPreview());

input_yUp.addEventListener('keyup', e => {
   renderPreview(step * 10);
   // renderPreview();
});
input_yUp.addEventListener('blur', e => renderPreview());

input_xLo.addEventListener('keyup', e => {
   renderPreview(step * 10);
   // renderPreview();
});
input_xLo.addEventListener('blur', e => renderPreview());

input_xUp.addEventListener('keyup', e => {
   renderPreview(step * 10);
   // renderPreview();
});
input_xUp.addEventListener('blur', e => renderPreview());
