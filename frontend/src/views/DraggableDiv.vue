<template>
  <div ref="draggableContainer" id="draggable-container">
    <v-card
      elevation="1" 
      outlined
      max-width="438"
      :style="'background: '+color"
    >
      <div id="draggable-header" @mousedown="dragMouseDown">
        <slot name="header"></slot>
      </div>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'DraggableDiv',
  data: function () {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
      gridSize: 50,
    }
  },
  props: ['color', 'savedClientX', 'savedClientY'],
  methods: {
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
  },
  mounted() {
    if(typeof this.savedClientX !== 'undefined' && typeof this.savedClientY !== 'undefined'){
      this.$refs.draggableContainer.style.left = this.savedClientX + 'px';
      this.$refs.draggableContainer.style.top = this.savedClientY + 'px';
    }
  }
}
</script>

<style>
#draggable-container {
  position: absolute;
  z-index: 1;
}
#draggable-header {
  z-index: 2;
}
</style>