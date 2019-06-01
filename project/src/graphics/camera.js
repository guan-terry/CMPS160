class Camera {
  constructor(source) {
    this.eye = new Vector3([0, 0, 1]);
    this.center = new Vector3([0, 0, -1]);
    this.up = new Vector3([0, 1, 0]);

    this.viewMatrix = new Matrix4();
    this.updateView();

  }

  updateView() {
    this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
      this.center.elements[0], this.center.elements[1], this.center.elements[2],
      this.up.elements[0], this.up.elements[1], this.up.elements[2]);
  }
}
