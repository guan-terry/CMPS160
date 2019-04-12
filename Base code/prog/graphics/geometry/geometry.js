/**
 * Specifies a geometric object.
 *
 * @author Lucas N. Ferreira
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Geometry} Geomtric object created
   */
  constructor(shader) {
      this.shader = shader;
  }

  /**
   * A callback used to modify a geometry every frame (60 typically).
   */
  render() {
    renderer.changeDrawingMode("gl.TRIANGLE_FAN");
  }

  /**
   * Interleaves the geometry's vertices for optimal performance. MUST be called
   * after any vertex is modified/constructed in a Geometry's vertices array.
   */
  interleaveVertices() {
        var interleavedData = interleaveVertexData(this.vertices);
//        console.log(interleavedData);
        this.data       = interleavedData[0];
        this.indices    = interleavedData[1];
        //console.log(this.data);
        this.dataCounts = interleavedData[2];
        //console.log(this.data);
  }
}
