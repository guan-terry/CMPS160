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
    var afteri = this.geometries.slice(i+1);
    this.geometries = [this.geometries[0], this.geometries[1]].concat(afteri);
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometries() {
    this.geometries = [];
  }
}
