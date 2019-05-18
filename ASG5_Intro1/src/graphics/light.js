
class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);
        this.ambient = [0.5, 0.5, 0.5];
        this.diffuse = [0.5, 0.5, 0.5];
        this.specular = [0.5, 0.5, 0.5];
    }
}
