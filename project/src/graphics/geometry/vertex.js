/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z, r, g, b) {
      if (r == null && g == null && b == null) {
        r = 1.0;
        g = 0.0;
        b = 0.0;
      }
      this.point    = new Vector3([x, y, z]);
      this.color    = [r, g, b, 1.0];
      this.texCoord = [0.0, 0.0];

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
