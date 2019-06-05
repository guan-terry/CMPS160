class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);
        this.ambient = [0.1, 0.1, 0.1];
        this.diffuse = [0.3, 0.3, 0.3];
        this.specular = [0.9, 0.9, 0.9];
    }
}
