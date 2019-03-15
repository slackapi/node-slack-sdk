'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskScheduler = function () {
  function TaskScheduler() {
    _classCallCheck(this, TaskScheduler);

    this.queue = [];
    this.isBusy = false;
  }

  TaskScheduler.prototype.enqueue = function enqueue(task) {
    if (this.isBusy) {
      this.queue.push(task);
    } else {
      this.execute(task);
    }
  };

  TaskScheduler.prototype.execute = function execute(task) {
    if (this.isBusy) {
      throw new Error('Cannot execute task because another task is already running.');
    }
    this.isBusy = true;
    try {
      task();
      while (this.queue.length > 0) {
        var nextTask = this.queue.shift();
        nextTask();
      }
    } finally {
      // Clean up
      if (this.queue.length > 0) {
        this.queue = [];
      }
      this.isBusy = false;
    }
  };

  return TaskScheduler;
}();

exports.default = TaskScheduler;