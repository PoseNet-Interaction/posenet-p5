<template>
  <div class="hello">
    <!-- <img id='target-multi' alt="Infinity war" src="../assets/InfinityWar5aa86b6fdaeb5.0.jpg"> -->
    <video autoplay="true" id="videoElement"></video>
    <div class='sketch' id="sketch"></div>
  </div>
</template>

<script>
// import * as posenet from '@tensorflow-models/posenet';
import sketch from './sketch.js'
import p5 from 'p5';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    net: null,
    myp5: null,
  },
  mounted: async function() {
    //this.net = await posenet.load();
    this.myp5 = new p5(sketch, document.getElementById('sketch'))
    // this.detectWithTensor();
    var video = document.querySelector("#videoElement");
    if (navigator.mediaDevices.getUserMedia) {       
        navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        video.srcObject = stream;
      })
      .catch(function(error) {
        /* eslint.disable no-console */
        console.log("Something went wrong!");
        /* eslint.disable no-console */
      });
    }
  }
  // methods: {
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#sketch {
   width: 100%;
   height:100%;
   position: absolute;
   left: 0;
   top: 0;
   border: 1px solid black;
}
#videoElement {
   width: 100%;
   height:100%;
   position: absolute;
   left: 0;
   top: 0;
   border: 1px solid black;
}
</style>
