export function add(arr, val) {
  arr.push(val);
  return arr;
}
export function remove(arr, index) {
  arr.splice(index, 1);
  return arr;
}
export function move(arr, old_index, new_index) {
  if (old_index !== new_index) {
    const element = arr[old_index];
    arr.splice(old_index, 1);
    arr.splice(new_index > old_index ? new_index - 1 : new_index, 0, element);
  }
  return arr;
}
