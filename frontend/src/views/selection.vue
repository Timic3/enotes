<template>
  <v-card light elevation="1" >
    <canvas id='canvas' ref='select' @mousedown='startPainting' @mousemove='sketch' @mouseup='stopPainting'></canvas>
    <v-row></v-row>
    <v-btn
      color="green lighten-1"
      text
      @click="callSaveDrawing"
    >
      SAVE
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'selection',
  data: function () {
    return {
      ctx: null,
      canvas: null,
      selectionMode: false,
      paint: false,
      test: false,
      coord: {x: 0, y: 0},
      startPosition: {
        x: null,
        y: null
      }
    };
  },
  methods: {
    getPosition(event){ 
      this.coord.x = event.clientX - this.canvas.parentElement.parentElement.offsetLeft; 
      this.coord.y = event.clientY - this.canvas.parentElement.parentElement.offsetTop; 
    },
    startPainting(event){ 
      this.paint = true; 
      this.getPosition(event); 
    },
    stopPainting(){ 
      this.paint = false; 
    },

    sketch(event){ 
      if (!this.paint) return; 
      this.ctx.beginPath(); 
        
      this.ctx.lineWidth = 5; 
      
      // Sets the end of the lines drawn 
      // to a round shape. 
      this.ctx.lineCap = 'round'; 
        
      this.ctx.strokeStyle = 'green'; 
          
      // The cursor to start drawing 
      // moves to this coordinate 
      this.ctx.moveTo(this.coord.x, this.coord.y); 
      
      // The position of the cursor 
      // gets updated as we move the 
      // mouse around. 
      this.getPosition(event); 
      
      // A line is traced from start 
      // coordinate to this coordinate 
      this.ctx.lineTo(this.coord.x , this.coord.y); 
        
      // Draws the line. 
      this.ctx.stroke();
    },
    callSaveDrawing(){
      let image = this.canvas.toDataURL("image/png")
      this.$emit('saveDrawingToDb', image);
    }
  },
  mounted() {
    this.$refs.select.height = window.innerHeight/2;
    this.$refs.select.width = window.innerWidth/2;
    this.canvas = this.$refs.select;
    this.ctx = this.canvas.getContext("2d");
    // this.ctx.fillRect(0,0,500,500);
  }
}
</script>