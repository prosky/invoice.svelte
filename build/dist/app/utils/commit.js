export function commit(node, duration = 0) {
  let timer;
  const exec = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent("commit"));
    }, duration);
    return true;
  };
  const handleKeyup = (e) => {
    e.key === "Enter" && exec();
  };
  const handleBlur = () => exec();
  node.addEventListener("keyup", handleKeyup);
  node.addEventListener("blur", handleBlur);
  return {
    update(newDuration) {
      duration = newDuration;
    },
    destroy() {
      node.removeEventListener("keyup", handleKeyup);
      node.removeEventListener("blur", handleBlur);
    }
  };
}
