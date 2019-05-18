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
    this.vertices = [];
    this.shader = shader;

    this.normalMatrix = new Matrix4();
    this.modelMatrix = new Matrix4();

    // Calculate the matrix to transform the normal based on the model matrix
    this.normalMatrix.setInverseOf(this.modelMatrix);
    this.normalMatrix.transpose();
  }

  /**
   * A callback used to modify a geometry every frame (60 typically).
   */
  render() {
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    this.shader.setUniform("u_NormalMatrix", this.normalMatrix.elements);
  }


  /**
   * Interleaves the geometry's vertices for optimal performance. MUST be called
   * after any vertex is modified/constructed in a Geometry's vertices array.
   */
  interleaveVertices() {
    var interleavedData = interleaveVertexData(this.vertices);
    this.data = interleavedData[0];
    this.indices = interleavedData[1];
    this.dataCounts = interleavedData[2];
  }
}
