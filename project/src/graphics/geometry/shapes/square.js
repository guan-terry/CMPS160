/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class square extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y, z, r, g, b, xSize, ySize, image) {
      super(shader);

      this.image = image;
      this.jump = false;

      this.vertices = this.generateTriangleVertices(x,y,z,r,g,b,xSize,ySize);
      this.faces = {0: [0, 1, 2]};
      this.jumping = 20;

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(0, .01, 0);

      this.modelMatrix = new Matrix4();

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  test() {
    this.jump = true;
  }

  generateTriangleVertices(x,y,z,r,g,b,xSize, ySize) {
      var vertices = [];
      var vertex0 = new Vertex(x-1 * xSize, y - .2 * ySize, z, r, g, b);
      var vertex1 = new Vertex(x+1 * xSize, y - .2 * ySize, z, r, g ,b);
      var vertex2 = new Vertex(x-1 * xSize, y + .2 * ySize, z, r, g, b);
      var vertex3 = new Vertex(x+1 * xSize, y + .2 * ySize, z, r, g, b);

      vertices.push(vertex0);
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);

      return vertices;
   }
   render() {
     if (this.jump == true) {
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
       this.jumping += -1;
     }
     if (this.jumping == 0) {
       this.jump = false;
       this.jumping = 20;
     }
     //toDO
     while (this.jump == false && this.vertices[0])
     this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}
