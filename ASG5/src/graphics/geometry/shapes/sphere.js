class Sphere extends Geometry {
  /**
   * Constructor for Sphere.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Sphere} Sphere created
   */
  constructor(shader,x, y, z, segments, r, g, b) {
      super(shader);

      this.vertices = this.generateSphereVertices(segments,x,y,z, r, g, b);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSphereVertices(segments,x,y,z, r, g, b) {
      var outerVerts = [];

      // Generate coordinates
      for (var j = 0; j <= segments; j++) {
          var aj = j * Math.PI / segments;
          var sj = Math.sin(aj)/2;
          var cj = Math.cos(aj)/2;
          for (var i = 0; i <= segments; i++) {
              var ai = i * 2 * Math.PI / segments;
              var si = Math.sin(ai);
              var ci = Math.cos(ai);

              //outerVerts.push({"x": (si * sj)+ x, "y": cj+y, "z": (ci * sj)+z});
              outerVerts.push({"x": (ci * sj) - z, "y": cj+y, "z": (si * sj)-x});

          }
      }

      var vertices = [];

      // Generate vertices
      for (var j = 0; j < segments; j++) {
        for (var i = 0; i < segments; i++) {
          var p1 = j * (segments+1) + i;
          var p2 = p1 + (segments+1);

          var vertex0 = new Vertex(outerVerts[p1].x, outerVerts[p1].y, outerVerts[p1].z, r, g, b);
          vertex0.normal.elements[0] = outerVerts[p1].x + z;
          vertex0.normal.elements[1] = outerVerts[p1].y - y;
          vertex0.normal.elements[2] = outerVerts[p1].z + x;

          var vertex1 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z, r, g, b);
          vertex1.normal.elements[0] = outerVerts[p2].x + z;
          vertex1.normal.elements[1] = outerVerts[p2].y - y;
          vertex1.normal.elements[2] = outerVerts[p2].z + x;

          var vertex2 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z, r, g, b);
          vertex2.normal.elements[0] = outerVerts[p1 + 1].x + z;
          vertex2.normal.elements[1] = outerVerts[p1 + 1].y - y;
          vertex2.normal.elements[2] = outerVerts[p1 + 1].z + x;

          vertices.push(vertex0, vertex1, vertex2);

          var vertex3 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z, r, g, b);
          vertex3.normal.elements[0] = outerVerts[p1 + 1].x + z;
          vertex3.normal.elements[1] = outerVerts[p1 + 1].y - y;
          vertex3.normal.elements[2] = outerVerts[p1 + 1].z + x;

          var vertex4 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z, r, g, b);
          vertex4.normal.elements[0] = outerVerts[p2].x + z;
          vertex4.normal.elements[1] = outerVerts[p2].y - y;
          vertex4.normal.elements[2] = outerVerts[p2].z + x;

          var vertex5 = new Vertex(outerVerts[p2 + 1].x, outerVerts[p2 + 1].y, outerVerts[p2 + 1].z, r, g, b);
          vertex5.normal.elements[0] = outerVerts[p2 + 1].x + z;
          vertex5.normal.elements[1] = outerVerts[p2 + 1].y - y;
          vertex5.normal.elements[2] = outerVerts[p2 + 1].z + x;

          vertices.push(vertex3, vertex4, vertex5);
        }
      }

      return vertices;
   }
}
