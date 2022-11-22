import * as posenet from '@tensorflow-models/posenet';
import 'p5/lib/addons/p5.dom';

export default async function( sketch ) {

    var width = 0;
    var height = 0;
    
    sketch.setup = async function() {
        width = document.getElementById('sketch').clientWidth;
        height = document.getElementById('sketch').clientHeight;
        sketch.createCanvas(width, height);
        sketch.frameRate(4);
    }

    sketch.draw = async function() {
        sketch.background(0);

        var posenetCoord = await detectWithTensor();
        sketch.fill(255,0,0,125);
        sketch.strokeWeight(0);

        for (var i=0; i<posenetCoord.length; i++) {
            // per object
            for (var j=0; j<posenetCoord[i]['keypoints'].length; j++) {
                // per point
                var x = (posenetCoord[i]['keypoints'][j]['position']['x']/300)*1200
                var y = (posenetCoord[i]['keypoints'][j]['position']['y']/200)*800
                //sketch.fill('red');
                sketch.ellipse(x, y, 25,25);
            }
        }
    }

    async function detectWithTensor() {
        let imageScaleFactor = 0.50;
        let flipHorizontal = false;
        let outputStride = 16;
        let maxPoseDetections = 5;
        let scoreThreshold = 0.5;
        let nmsRadius = 20;
  
        let videoElement = document.getElementById('videoElement');
        videoElement.width = 300;
        videoElement.height = 200;

        let net = await posenet.load();
        return await net.estimateMultiplePoses(
            videoElement, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold, nmsRadius);
      }

}