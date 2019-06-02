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
    this.panic = 1;
    this.redVal = 0;
    this.greenVal = 0;
    this.blueVal = 1;
  }


  setLight(light) {
    this.light = light;
  }



  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  /**
   *  Checks if any geometry is off the onscreen
   *  If any geometries is off the scrreen, then call removeGeometry(i)
   *  For the i-th geometry.
   */
  checkGeometries() {
    for (var i = 2; i < this.geometries.length; i++) {
      if (this.geometries[i].modelMatrix.elements[12] < -2.2) {
        this.removeGeometry(i);
      }
    }
  }

  /**
   *  Removes the i-th geometry
   */
  removeGeometry(i) {
    var afteri = this.geometries.slice(i + 1);
    this.geometries = [this.geometries[0], this.geometries[1]].concat(afteri);

  }

  /**
   *  Checks if the outcomming object is touching the player
   */
  isTouching() {
    var player = this.geometries[0];
    if (this.geometries[2] != null) {
      var object = this.geometries[2];
      if (object.modelMatrix.elements[12] < -1.4399 && player.modelMatrix.elements[13] < .2 * object.ySize * 2 && object.modelMatrix.elements[12] > -1.6) {
        return true;
      }
    }
    return false;
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometries() {
    this.geometries = [];
  }
}
