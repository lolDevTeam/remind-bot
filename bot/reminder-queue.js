class Reminder {
	constructor(id, time, target, context, comment) {
		this._id = id;
		this._time = time;
		this._target = target;
		this._context = context;
		this._comment = comment;
	}

	get id() {
		return this._id;
	}

	get time() {
		return this._time;
	}

	get target() {
		return this._target;
	}

	get context() {
		return this._context;
	}

	get comment() {
		return (this._comment === 'undefined') ? '' : this._comment;
	}

	getInfo() {
		console.log("alert time: " + this.time + "\n"
				+ "target user: " + this.target + "\n"
				+ "context: \n" + this.context + "\n"
				+ "comment: " + this.comment);
	}
}

class Reminders {
	// Represented using a heap based priority queue
	constructor() {
		this.reminders = [];
		this.next = 0;	//index of the next insertion point
	}

	// add new reminder to queue, sorting by reminder.time
	// equivalent to pq.push()
	add(reminder) {
		this.reminders[this.next++] = reminder;
		heapifyUp.bind(this)();
	}

	// remove and return the next reminder from queue
	// equivalent to pq.pop()
	poll() {
		if (this.next === 0) return -1;
		var nextReminder = this.reminders[0];
		this.reminders[0] = this.reminders[--this.next];
		heapifyDown.bind(this)();
		return nextReminder;
	}

	// return the next reminder from the queue
	// equivalent to pq.poll()
	peek() {
		if (this.next === 0) return -1;
		return this.reminders[0];
	}

	// true if no reminders in queue
	isEmpty() {
		return (this.next === 0);
	}
}

// private functions to organise the priority queue
//
// need to check if there is a better practice regarding
// private methods for classes

// restore heap after adding
function heapifyUp() {
	// newly added reminder is before current insertion point
	let iNew = this.next - 1;
	let iPrt = getParent(iNew);
	// until smaller than parent or root
	while(iPrt >= 0 && this.reminders[iNew].time < this.reminders[iPrt].time
		&& iPrt >= 0){
		let tRem = this.reminders[getParent(iNew)];
		this.reminders[iPrt] = this.reminders[iNew];
		this.reminders[iNew] = tRem;
		iNew = iPrt;
		iPrt = getParent(iNew);
	}
}

// restore heap after removing
function heapifyDown() {
	// pre: generic leaf node replaced root
	let iPrt = 0;
	let iLft = getLeftChild(0);
	let iRgt = getRightChild(0);
	// until larger that children or is leaf
	while (iLft < this.next) {
		// assign right if its in range AND less than left
		let iSml = (iRgt < this.next && this.reminders[iRgt].time < this.reminders[iLft].time)
			? iRgt : iLft;
		if (this.reminders[iPrt].time <= this.reminders[iSml])
			break; // heap satisfied, we are done;
		let tRem = this.reminders[iSml];
		this.reminders[iSml] = this.reminders[iPrt];
		this.reminders[iPrt] = tRem;
		iPrt = iSml;
		iLft = getLeftChild(iPrt);
		iRgt = getRightChild(iPrt);
	}
	// post-cond:
	//  - iPrt must be a leaf (loop guard broken) OR
	//  - iPrt smaller than both children (break)
}



// heap helper functions

function getParent(index) {return Math.ceil((index/2) - 1);}

function getLeftChild(index) {return (index*2) + 1;}

function getRightChild(index) {return (index*2) + 2;}

module.exports = {Reminder : Reminder, Reminders : Reminders};
