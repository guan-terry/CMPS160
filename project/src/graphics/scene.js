/**
 * Specifies a Scene full of Geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   * @returns {Scene} Scene object created
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  //check each geometry and checks if the x degree is out of the screen
  checkGeometries() {
    for (var i = 2; i < this.geometries.length; i++) {
      if (this.geometries[i].modelMatrix.elements[12] < -2.2) {
        this.removeGeometry(i);
      }
    }
  }

  //remove the geometry at the i-th position
  removeGeometry(i) {
    var afteri = this.geometries.slice(i + 1);
    this.geometries = [this.geometries[0], this.geometries[1]].concat(afteri);
  }

  //checks if the 3rd geometry is touching the 2nd Geometry
  isTouching() {
    var player = this.geometries[1];


    var playerRight = player.data[9];
    var playerLeft = player.data[0];
    var playerBottom = player.data[1];


    if (this.geometries[2] != null) {
      var object = this.geometries[2];


      var objectRight = object.data[9];
      var objectLeft = object.data[0];
      var objectTop = object.data[19];

      if(object.modelMatrix.elements[12] < -1.4399 && player.modelMatrix.elements[13] < .2 * object.ySize * 2 && object.modelMatrix.elements[12] > -1.6) {
        console.log("collision");
      }
    }

  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometries() {
    this.geometries = [];
  }
}
