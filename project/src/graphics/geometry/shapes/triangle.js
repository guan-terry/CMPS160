/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, image) {
      super(shader);

      this.image = image;

      this.vertices = this.generateTriangleVertices();
      this.faces = {0: [0, 1, 2]};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices() {
      var vertices = []

      // Bottom left
      var vertex0 = new Vertex(-1.0, -1.0, 0.0);
      vertex0.texCoord = [0.0, 0.0];
      vertices.push(vertex0);

      // Bottom right
      var vertex1 = new Vertex( 1.0, -1.0, 0.0);
      vertex1.texCoord = [1.0, 0.0];
      vertices.push(vertex1);

      // Center
      var vertex2 = new Vertex( 0.0, 1.0, 0.0);
      vertex2.texCoord = [0.5, 1.0];
      vertices.push(vertex2);

      return vertices;
   }
}
