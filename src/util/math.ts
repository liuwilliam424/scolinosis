/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Math for sensor
*/

/*
Calibration ==================================
1. Calibrate ground
++++++++++++++++++++++++++++++++++++++++++++++
2D Math ======================================
1. get plane equation from euler angles
2. calculate normal plane to both
3. get_vector_intersection_3D for both planes
4. intersect_lines_2D
5. get_dist_from_center_2D
++++++++++++++++++++++++++++++++++++++++++++++
3D Math ======================================
1. add normal shoulder vectors
2. subtract from normal ground vector
*/

/*
const groundA: number // ground plane
const groundB: number
const groundC: number
*/

// initialize common types
type plane = [number, number, number];
type vector = [number, number, number];

//==================================

// cramer's rule for 2x2 matrix
function cramer_2x2(
  a: number,
  b: number,
  r1: number,
  c: number,
  d: number,
  r2: number
) {
  // ax+by=c
  const der: number = a * d - b * c;
  const dx: number = r1 * d - r2 * b;
  const dy: number = a * r2 - c * r1;
  const solution: [number, number] = [dx / der, dy / der];
  return solution;
}

// cross product of R3 vector
function cross_product(vector1: vector, vector2: vector) {
  const v1: number = vector1[1] * vector2[2] - vector1[2] * vector2[1];
  const v2: number = vector1[2] * vector2[0] - vector1[0] * vector2[2];
  const v3: number = vector1[0] * vector2[1] - vector1[1] * vector2[0];
  const intersect_plane: plane = [v1, v2, v3];
  return intersect_plane;
}

//get plane from euler angles
function get_plane_equation_3D(angle1: number, angle2: number) {
  const plane_data: plane = [
    Math.cos((angle1 * Math.PI) / 180),
    Math.sin((angle1 * Math.PI) / 180),
    Math.tan((angle2 * Math.PI) / 180),
  ];
  return plane_data; // ax+by+cz=0
}

//get vector intersection of two planes
function get_vector_intersection_3D(plane1: plane, plane2: plane) {
  const num1: number = plane1[1] * plane2[2] - plane1[2] * plane2[1];
  const num2: number = -1 * (plane1[0] * plane2[2] - plane1[2] * plane2[0]);
  const num3: number = plane1[0] * plane2[1] - plane1[1] * plane2[0];
  const vect: vector = [num1, num2, num3];
  return vect; // (a,b,c)
}

//convert plane to normal vector
function plane_to_vector(surface: plane) {
  const vect: vector = [surface[0], surface[1], surface[2]];
  return vect;
}

//make vector length 1
function normalize_vector(vect: vector) {
  const len: number = Math.sqrt(
    Math.pow(vect[0], 2) + Math.pow(vect[1], 2) + Math.pow(vect[2], 2)
  );
  const normal_vect: vector = [vect[0] / len, vect[1] / len, vect[2] / len];
  return normal_vect;
}

// =================================

// find intersection of two lines
function intersect_lines_2D(
  a: number,
  b: number,
  r1: number,
  c: number,
  d: number,
  r2: number,
  shoulder: number
) {
  const intersection: [number, number] = cramer_2x2(
    a,
    b,
    r1 - (shoulder / 2) * a,
    c,
    d,
    r2 + (shoulder / 2) * c
  );
  return intersection;
}

// distance from center vector
function get_dist_from_center_2D(intersection: [number, number]) {
  return intersection[0];
}

//more calculations for angles
function level_2D(
  angle1: number,
  angle2: number,
  angle3: number,
  angle4: number
) {
  // angle1 and angle2 correspond to one shoulder, and angle3 and angle4 the other
  const plane1: plane = get_plane_equation_3D(angle1, angle2);
  const plane2: plane = get_plane_equation_3D(angle3, angle4);
  const chest: plane = cross_product(plane1, plane2);
  const vect2: vector = get_vector_intersection_3D(plane2, chest);
  const vect3: number = get_dist_from_center_2D(([vect2[0], vect2[1]]))-vect2[0];
  return vect3;
}

// =================================

//add vectors
function sum_vectors_3D(vect1: vector, vect2: vector) {
  const vect_sum: vector = [
    vect1[0] + vect2[0],
    vect1[1] + vect2[1],
    vect1[2] + vect2[2],
  ];
  return vect_sum;
}

// subtract vectors
function subtract_vectors_3D(vect1: vector, vect2: vector) {
  const vect_sum: vector = [
    vect1[0] - vect2[0],
    vect1[1] - vect2[1],
    vect1[2] - vect2[2],
  ];
  return vect_sum;
}

// more angle calculations
function level_3D(
  angle1: number,
  angle2: number,
  angle3: number,
  angle4: number,
  ground1: number,
  ground2: number
) {
  // angle1 and angle2 correspond to one shoulder, and angle3 and angle4 the other
  const vect1: vector = plane_to_vector(get_plane_equation_3D(angle1, angle2));
  const vect2: vector = plane_to_vector(get_plane_equation_3D(angle3, angle4));
  const sum_vect: vector = sum_vectors_3D(vect1, vect2);
  const ground_vect: vector = plane_to_vector(
    get_plane_equation_3D(ground1, ground2)
  );
  const normal_sum: vector = normalize_vector(sum_vect);
  const normal_ground: vector = normalize_vector(ground_vect);
  const diff_vect: vector = subtract_vectors_3D(normal_ground, normal_sum);
  const diff_vect_normal: vector = subtract_vectors_3D(normal_sum, normal_ground);
  return magnitude(sum_vectors_3D(diff_vect, diff_vect_normal));
}

// magnitude of vector
function magnitude(data: [number, number, number]) {
  const a = data[0],
    b = data[1],
    c = data[2];
  return Math.sqrt(a * a + b * b + c * c);
}

//export for use
export { level_2D, level_3D };
