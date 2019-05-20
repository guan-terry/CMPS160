/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex1 {
  constructor(x, y, z, r, g, b, nx, ny, nz) {
      this.point  = new Vector3([x, y, z]);
      this.texCoord  = [0.0, 0.0];
      this.normal = new Vector3([nx, ny, nz]);


  }
}
