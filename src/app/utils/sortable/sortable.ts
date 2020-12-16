
export function sortable(node: HTMLElement, {id}) {
	// DRAG AND DROP
	let isOver: string | false = false;
	node.draggable = true;
	node.dataset.index = id;

	// DISPATCH REORDER
	const dispatch = (type: string, detail) => {
		node.dispatchEvent(new CustomEvent(type, {detail}));
	};
	const getDraggable = (node) => node.dataset.index ? node : getDraggable(node.parentElement);
	const start = ev => {
		ev.dataTransfer.setData("id", id);
	};
	const over = ev => {
		ev.preventDefault();
		let dragged = getDraggable(ev.target);
		if (isOver !== dragged.dataset.index) {
			setOver(dragged.dataset.index);
		}
	};
	const leave = ev => {
		let dragged = getDraggable(ev.target);
		if (isOver === dragged.dataset.index) {
			setOver(false);
		}
	};
	const drop = ev => {
		ev.preventDefault();
		setOver(false);
		let from = ev.dataTransfer.getData("id");
		let to = id;
		dispatch("update", {from, to});
	};
	const setOver = (over: string | false) => {
		isOver = over;
		node.classList.toggle('over', Boolean(over));
		dispatch("over", {isOver});
	}

	node.addEventListener('dragstart', start);
	node.addEventListener('dragover', over);
	node.addEventListener('dragleave', leave);
	node.addEventListener('drop', drop);

	return {
		destroy() {
			node.removeEventListener('dragstart', start);
			node.removeEventListener('dragover', over);
			node.removeEventListener('dragleave', leave);
			node.removeEventListener('drop', drop);
		}
	};
}
