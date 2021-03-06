/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(nx, ny, nz, x, y, z, r, g, b) {
      this.point  = new Vector3([x, y, z]);
      this.color  = [r/255, g/255, b/255, 1.0];
      this.texCoord  = [0.0, 0.0];
      this.normal = new Vector3([nx, ny, nz]);

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
