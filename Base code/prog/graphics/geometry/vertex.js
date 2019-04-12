/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z,redVertex, greenVertex, blueVertex) {
      this.point  = new Vector3([x, y, z]);
      redVertex = redVertex/255;
      greenVertex = greenVertex/255;
      blueVertex = blueVertex/255;
      this.color  = [redVertex, greenVertex, blueVertex, 1.0];

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
