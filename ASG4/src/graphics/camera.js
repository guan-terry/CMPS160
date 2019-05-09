/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
  /**
   * Constructor for Camera.
   *
   * @constructor
   * @returns {Camera} Camera object created
   */
  constructor(shader) {
    this.speed = 0.1;
    this.isProjection = false;
    this.near = 1;
    this.far = 10;

    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(90, 0, 0, 1);

    // Camera view attributes
    this.eye = new Vector3([0, 0, 1]);
    this.center = new Vector3([0, 0, -1]);
    this.up = new Vector3([0, 1, 1]);

    this.viewMatrix = new Matrix4();
    this.updateView();

    this.projectionMatrix = new Matrix4();
  }

  /**
   *  moves the camera along the x axis;
   */
  truck(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize()

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    // Scale the u axis to the desired distance to move
    u = u.mul(dir * this.speed);

    // Add the direction vector to both the eye and center positions
    this.eye = this.eye.add(u);
    this.center = this.center.add(u);

    this.updateView();
  }

  /**
   *  Changes the y direction of the eye
   */
  pan(dir) {
    this.eye = this.eye.add(new Vector3([0, dir * -.01, 0]));

    this.updateView();
  }

  /**
   *  Changes the x direction of the eye
   */
  tilt(dir) {
    this.eye = this.eye.add(new Vector3([dir * .01, 0, 0]));

    this.updateView();
  }

  /**
   *moves the camera along the y axis.
   */
  dolly(dir) {
    // calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    //calculate the u camera axis
    var u = this.rotationMatrix.multiplyVector3(this.up.cross(n));
    u = u.normalize();

    //scale the u axis to the desired distance to move;
    u = u.mul(dir * this.speed);

    // Add the direciton vector to both the eye and center positions
    this.eye = this.eye.add(u);
    this.center = this.center.add(u);

    this.updateView();

  }

  /**
   *  Changes the persepctive view of the camera
   */
  changePerspective() {
    if (!this.isProjection) {
      this.projectionMatrix.setFrustum(-1, 1, -1, 1, this.near, this.far);
      this.isProjection = true;
    } else {
      this.projectionMatrix.setOrtho(-1, 1, -1, 1, this.near, this.far);
      this.isProjection = false;
    }
  }

  zoom() {
    if (this.isProjection) {
      this.near *= 1.01;
      this.projectionMatrix.setFrustum(-1, 1, -1, 1, this.near, this.far);
    } else {
      this.near *= 1.01;
      this.projectionMatrix.setOrtho(-1, 1, -1, 1, this.near, this.far);
    }
  }

  zoomOut() {
    if (this.isProjection) {
      this.near *= .99;
      this.projectionMatrix.setFrustum(-1, 1, -1, 1, this.near, this.far);
    } else {
      this.near *= .99;
      this.projectionMatrix.setOrtho(-1, 1, -1, 1, this.near, this.far);
    }
  }
  /**
   *  Updates teh view
   */
  updateView() {
    this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
      this.center.elements[0], this.center.elements[1], this.center.elements[2],
      this.up.elements[0], this.up.elements[1], this.up.elements[2]);
  }
}
