const Item = (title, description, dueDate, priority) => {
	const completed = false;
	return {
		title, description, dueDate, priority, completed,
	};
};

export default Item;
