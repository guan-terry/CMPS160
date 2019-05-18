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

    this.rotationMatrix = new Matrix4();

    this.left = -.7;
    this.right = .7;
    this.top = 1.5;
    this.bottom = -1;
    this.near = 1.5;

    // Camera view attributes
    this.eye = new Vector3([0, 0, 1]);
    this.center = new Vector3([0, 0, -1]);
    this.up = new Vector3([0, 1, 0]);

    this.viewMatrix = new Matrix4();
    this.updateView();

    this.projectionMatrix = new Matrix4();
    this.projectionMatrix.setOrtho(this.left, this.right, this.bottom, this.top, this.near, 7);
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
//    this.up = this.up.add(u);


    this.updateView();
  }

  /**
   *  Changes the y direction of the eye
   */
  tilt(dir) {
    // calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    //calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    // calculate the new center
    var newCenter = this.center.sub(this.eye);
    this.rotationMatrix.setRotate(dir*this.speed, u.elements[0], u.elements[1], u.elements[2]);
    newCenter = this.rotationMatrix.multiplyVector3(newCenter);
    this.center = newCenter.add(this.eye);

    if(Math.abs(n.dot(this.up)) >= 0.985) {
      this.up = this.rotationMatrix.multiplyVector3(this.up);
    }

    this.updateView();
  }

  /**
   *  Changes the x direction of the center
   */
  pan(dir) {

    var n = this.eye.sub(this.center);
    n = n.normalize();
    var u = this.up.cross(n);
    u = u.normalize();

    var up = n.cross(u);
    up.normalize()
    //var up = this.up.sub(this.eye);
    //up = up.normalize();

    // calculate the new center
    var newCenter = this.center.sub(this.eye);
    this.rotationMatrix.setRotate(dir*this.speed, up.elements[0], up.elements[1], up.elements[2]);
    newCenter = this.rotationMatrix.multiplyVector3(newCenter);
    this.center = newCenter.add(this.eye);



    this.updateView();
  }

  /**
   *
   *  Moves along the z axis
   */
  dolly(dir) {
    // calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();
    this.eye = this.eye.add(n.mul(dir*this.speed));
    this.center = this.center.add(n.mul(dir*this.speed));
    //this.up = this.up.add(n.mul(dir*this.speed));

    this.updateView();

  }

  /**
   *  Changes the persepctive view of the camera
   */
  changePerspective() {
    if (!this.isProjection) {
      this.projectionMatrix.setFrustum(this.left, this.right, this.bottom, this.top, this.near,  32);
      this.isProjection = true;
    } else {
      this.projectionMatrix.setOrtho(this.left, this.right, this.bottom, this.top, this.near,  32);
      this.isProjection = false;
    }
  }

  zoom(ev) {
    if (this.isProjection) {
      this.left *= ev/100 + 1;
      this.right *= ev/100 + 1;
      this.top *= ev/100 + 1;
      this.bottom *= ev/100 + 1;
      this.projectionMatrix.setFrustum(this.left, this.right, this.bottom, this.top, this.near,  32);
    } else {
      this.left *= ev/100 + 1;
      this.right *= ev/100 + 1;
      this.top *= ev/100 + 1;
      this.bottom *= ev/100 + 1;
      this.projectionMatrix.setOrtho(this.left, this.right, this.bottom, this.top, this.near,  32);
    }
  }

  zoomOut(ev) {
    ev = Math.abs(ev);
    if (this.isProjection) {
      this.left *= 1 - ev/100;
      this.right *= 1 - ev/100;
      this.top *= 1 - ev/100;
      this.bottom *= 1 - ev/100;
      this.projectionMatrix.setFrustum(this.left, this.right, this.bottom, this.top, this.near,  32);
    } else {
      this.left *= 1 - ev/100;
      this.right *= 1 - ev/100;
      this.top *= 1 - ev/100;
      this.bottom *= 1 - ev/100;
      this.projectionMatrix.setOrtho(this.left, this.right, this.bottom, this.top, this.near,  32);
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
