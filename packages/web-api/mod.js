var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// deno-shims/buffer-shim.js
import { Buffer as Buffer2 } from "https://deno.land/std@0.112.0/node/buffer.ts";
var dummy_buffer;
var init_buffer_shim = __esm({
  "deno-shims/buffer-shim.js"() {
    dummy_buffer = Buffer2;
  }
});

// deno-shims/xhr-shim.js
import "https://deno.land/x/xhr@0.1.0/mod.ts";
var init_xhr_shim = __esm({
  "deno-shims/xhr-shim.js"() {
  }
});

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "node_modules/path-browserify/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
      }
    }
    function normalizeStringPosix(path, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path.length; ++i) {
        if (i < path.length)
          code = path.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path.slice(lastSlash + 1, i);
            else
              res = path.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path;
          if (i >= 0)
            path = arguments[i];
          else {
            if (cwd === void 0)
              cwd = String();
            path = cwd;
          }
          assertPath(path);
          if (path.length === 0) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var isAbsolute = path.charCodeAt(0) === 47;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
        path = normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute)
          path = ".";
        if (path.length > 0 && trailingSeparator)
          path += "/";
        if (isAbsolute)
          return "/" + path;
        return path;
      },
      isAbsolute: function isAbsolute(path) {
        assertPath(path);
        return path.length > 0 && path.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to)
          return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path) {
        return path;
      },
      dirname: function dirname(path) {
        assertPath(path);
        if (path.length === 0)
          return ".";
        var code = path.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path.slice(0, end);
      },
      basename: function basename2(path, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
          if (ext.length === path.length && ext === path)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path.length;
          return path.slice(start, end);
        } else {
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path.slice(start, end);
        }
      },
      extname: function extname(path) {
        assertPath(path);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path) {
        assertPath(path);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path.length === 0)
          return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path.slice(1, end);
            else
              ret.base = ret.name = path.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
          } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
          }
          ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module.exports = posix;
  }
});

// node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  "node_modules/is-stream/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var isStream2 = module.exports = function(stream) {
      return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
    };
    isStream2.writable = function(stream) {
      return isStream2(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
    };
    isStream2.readable = function(stream) {
      return isStream2(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
    };
    isStream2.duplex = function(stream) {
      return isStream2.writable(stream) && isStream2.readable(stream);
    };
    isStream2.transform = function(stream) {
      return isStream2.duplex(stream) && typeof stream._transform === "function" && typeof stream._transformState === "object";
    };
  }
});

// node_modules/p-queue/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/p-queue/node_modules/eventemitter3/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if (typeof module !== "undefined") {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/p-finally/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then((val) => new Promise((resolve) => {
        resolve(onFinally());
      }).then(() => val), (err) => new Promise((resolve) => {
        resolve(onFinally());
      }).then(() => {
        throw err;
      }));
    };
  }
});

// node_modules/p-timeout/index.js
var require_p_timeout = __commonJS({
  "node_modules/p-timeout/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var pFinally = require_p_finally();
    var TimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "TimeoutError";
      }
    };
    var pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
      if (typeof milliseconds !== "number" || milliseconds < 0) {
        throw new TypeError("Expected `milliseconds` to be a positive number");
      }
      if (milliseconds === Infinity) {
        resolve(promise);
        return;
      }
      const timer = setTimeout(() => {
        if (typeof fallback === "function") {
          try {
            resolve(fallback());
          } catch (error) {
            reject(error);
          }
          return;
        }
        const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
        const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        reject(timeoutError);
      }, milliseconds);
      pFinally(promise.then(resolve, reject), () => {
        clearTimeout(timer);
      });
    });
    module.exports = pTimeout;
    module.exports.default = pTimeout;
    module.exports.TimeoutError = TimeoutError;
  }
});

// node_modules/p-queue/dist/lower-bound.js
var require_lower_bound = __commonJS({
  "node_modules/p-queue/dist/lower-bound.js"(exports) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lowerBound(array, value, comparator) {
      let first = 0;
      let count = array.length;
      while (count > 0) {
        const step = count / 2 | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
          first = ++it;
          count -= step + 1;
        } else {
          count = step;
        }
      }
      return first;
    }
    exports.default = lowerBound;
  }
});

// node_modules/p-queue/dist/priority-queue.js
var require_priority_queue = __commonJS({
  "node_modules/p-queue/dist/priority-queue.js"(exports) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lower_bound_1 = require_lower_bound();
    var PriorityQueue = class {
      constructor() {
        this._queue = [];
      }
      enqueue(run, options) {
        options = Object.assign({ priority: 0 }, options);
        const element = {
          priority: options.priority,
          run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
          this._queue.push(element);
          return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);
        this._queue.splice(index, 0, element);
      }
      dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
      }
      filter(options) {
        return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
      }
      get size() {
        return this._queue.length;
      }
    };
    exports.default = PriorityQueue;
  }
});

// node_modules/p-queue/dist/index.js
var require_dist = __commonJS({
  "node_modules/p-queue/dist/index.js"(exports) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventEmitter2 = require_eventemitter3();
    var p_timeout_1 = require_p_timeout();
    var priority_queue_1 = require_priority_queue();
    var empty = () => {
    };
    var timeoutError = new p_timeout_1.TimeoutError();
    var PQueue2 = class extends EventEmitter2 {
      constructor(options) {
        var _a, _b, _c, _d;
        super();
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        this._resolveEmpty = empty;
        this._resolveIdle = empty;
        options = Object.assign({ carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default }, options);
        if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
          throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
          throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
      }
      get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
      }
      get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
      }
      _next() {
        this._pendingCount--;
        this._tryToStartAnother();
        this.emit("next");
      }
      _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
          this._resolveIdle();
          this._resolveIdle = empty;
          this.emit("idle");
        }
      }
      _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = void 0;
      }
      _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === void 0) {
          const delay2 = this._intervalEnd - now;
          if (delay2 < 0) {
            this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
          } else {
            if (this._timeoutId === void 0) {
              this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, delay2);
            }
            return true;
          }
        }
        return false;
      }
      _tryToStartAnother() {
        if (this._queue.size === 0) {
          if (this._intervalId) {
            clearInterval(this._intervalId);
          }
          this._intervalId = void 0;
          this._resolvePromises();
          return false;
        }
        if (!this._isPaused) {
          const canInitializeInterval = !this._isIntervalPaused();
          if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
            const job = this._queue.dequeue();
            if (!job) {
              return false;
            }
            this.emit("active");
            job();
            if (canInitializeInterval) {
              this._initializeIntervalIfNeeded();
            }
            return true;
          }
        }
        return false;
      }
      _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== void 0) {
          return;
        }
        this._intervalId = setInterval(() => {
          this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
      }
      _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = void 0;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
      }
      _processQueue() {
        while (this._tryToStartAnother()) {
        }
      }
      get concurrency() {
        return this._concurrency;
      }
      set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
          throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this._concurrency = newConcurrency;
        this._processQueue();
      }
      async add(fn, options = {}) {
        return new Promise((resolve, reject) => {
          const run = async () => {
            this._pendingCount++;
            this._intervalCount++;
            try {
              const operation = this._timeout === void 0 && options.timeout === void 0 ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === void 0 ? this._timeout : options.timeout, () => {
                if (options.throwOnTimeout === void 0 ? this._throwOnTimeout : options.throwOnTimeout) {
                  reject(timeoutError);
                }
                return void 0;
              });
              resolve(await operation);
            } catch (error) {
              reject(error);
            }
            this._next();
          };
          this._queue.enqueue(run, options);
          this._tryToStartAnother();
          this.emit("add");
        });
      }
      async addAll(functions, options) {
        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
      }
      start() {
        if (!this._isPaused) {
          return this;
        }
        this._isPaused = false;
        this._processQueue();
        return this;
      }
      pause() {
        this._isPaused = true;
      }
      clear() {
        this._queue = new this._queueClass();
      }
      async onEmpty() {
        if (this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveEmpty;
          this._resolveEmpty = () => {
            existingResolve();
            resolve();
          };
        });
      }
      async onIdle() {
        if (this._pendingCount === 0 && this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveIdle;
          this._resolveIdle = () => {
            existingResolve();
            resolve();
          };
        });
      }
      get size() {
        return this._queue.size;
      }
      sizeBy(options) {
        return this._queue.filter(options).length;
      }
      get pending() {
        return this._pendingCount;
      }
      get isPaused() {
        return this._isPaused;
      }
      get timeout() {
        return this._timeout;
      }
      set timeout(milliseconds) {
        this._timeout = milliseconds;
      }
    };
    exports.default = PQueue2;
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    module.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = new Date().getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self2 = this;
      this._timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = new Date().getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i = 0; i < this._errors.length; i++) {
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
          mainError = error;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports) {
    init_buffer_shim();
    init_xhr_shim();
    var RetryOperation = require_retry_operation();
    exports.operation = function(options) {
      var timeouts = exports.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i = 0; i < opts.retries; i++) {
        timeouts.push(this.createTimeout(i, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
      }
      timeouts.sort(function(a, b) {
        return a - b;
      });
      return timeouts;
    };
    exports.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        var original = obj[method];
        obj[method] = function retryWrapper(original2) {
          var op = exports.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }.bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    module.exports = require_retry();
  }
});

// node_modules/p-retry/index.js
var require_p_retry = __commonJS({
  "node_modules/p-retry/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var retry = require_retry2();
    var networkErrorMsgs = [
      "Failed to fetch",
      "NetworkError when attempting to fetch resource.",
      "The Internet connection appears to be offline.",
      "Network request failed"
    ];
    var AbortError2 = class extends Error {
      constructor(message) {
        super();
        if (message instanceof Error) {
          this.originalError = message;
          ({ message } = message);
        } else {
          this.originalError = new Error(message);
          this.originalError.stack = this.stack;
        }
        this.name = "AbortError";
        this.message = message;
      }
    };
    var decorateErrorWithCounts = (error, attemptNumber, options) => {
      const retriesLeft = options.retries - (attemptNumber - 1);
      error.attemptNumber = attemptNumber;
      error.retriesLeft = retriesLeft;
      return error;
    };
    var isNetworkError = (errorMessage) => networkErrorMsgs.includes(errorMessage);
    var pRetry2 = (input, options) => new Promise((resolve, reject) => {
      options = {
        onFailedAttempt: () => {
        },
        retries: 10,
        ...options
      };
      const operation = retry.operation(options);
      operation.attempt(async (attemptNumber) => {
        try {
          resolve(await input(attemptNumber));
        } catch (error) {
          if (!(error instanceof Error)) {
            reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
            return;
          }
          if (error instanceof AbortError2) {
            operation.stop();
            reject(error.originalError);
          } else if (error instanceof TypeError && !isNetworkError(error.message)) {
            operation.stop();
            reject(error);
          } else {
            decorateErrorWithCounts(error, attemptNumber, options);
            try {
              await options.onFailedAttempt(error);
            } catch (error2) {
              reject(error2);
              return;
            }
            if (!operation.retry(error)) {
              reject(operation.mainError());
            }
          }
        }
      });
    });
    module.exports = pRetry2;
    module.exports.default = pRetry2;
    module.exports.AbortError = AbortError2;
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream2(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream: isStream2,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var createError = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || defaults.transitional;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    module.exports = {
      "version": "0.24.0"
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    module.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.Cancel = require_Cancel();
    axios2.CancelToken = require_CancelToken();
    axios2.isCancel = require_isCancel();
    axios2.VERSION = require_data().version;
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = require_spread();
    axios2.isAxiosError = require_isAxiosError();
    module.exports = axios2;
    module.exports.default = axios2;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    module.exports = require_axios();
  }
});

// node_modules/form-data/lib/browser.js
var require_browser = __commonJS({
  "node_modules/form-data/lib/browser.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    module.exports = typeof self == "object" ? self.FormData : window.FormData;
  }
});

// node_modules/is-electron/index.js
var require_is_electron = __commonJS({
  "node_modules/is-electron/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    function isElectron2() {
      if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
        return true;
      }
      if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron) {
        return true;
      }
      if (typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron") >= 0) {
        return true;
      }
      return false;
    }
    module.exports = isElectron2;
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter32 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if (typeof module !== "undefined") {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/@slack/types/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@slack/types/dist/index.js"(exports) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/os-browserify/browser.js
var require_browser2 = __commonJS({
  "node_modules/os-browserify/browser.js"(exports) {
    init_buffer_shim();
    init_xhr_shim();
    exports.endianness = function() {
      return "LE";
    };
    exports.hostname = function() {
      if (typeof location !== "undefined") {
        return location.hostname;
      } else
        return "";
    };
    exports.loadavg = function() {
      return [];
    };
    exports.uptime = function() {
      return 0;
    };
    exports.freemem = function() {
      return Number.MAX_VALUE;
    };
    exports.totalmem = function() {
      return Number.MAX_VALUE;
    };
    exports.cpus = function() {
      return [];
    };
    exports.type = function() {
      return "Browser";
    };
    exports.release = function() {
      if (typeof navigator !== "undefined") {
        return navigator.appVersion;
      }
      return "";
    };
    exports.networkInterfaces = exports.getNetworkInterfaces = function() {
      return {};
    };
    exports.arch = function() {
      return "javascript";
    };
    exports.platform = function() {
      return "browser";
    };
    exports.tmpdir = exports.tmpDir = function() {
      return "/tmp";
    };
    exports.EOL = "\n";
    exports.homedir = function() {
      return "/";
    };
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "@slack/web-api",
      version: "6.5.1",
      description: "Official library for using the Slack Platform's Web API",
      author: "Slack Technologies, LLC",
      license: "MIT",
      keywords: [
        "slack",
        "web-api",
        "bot",
        "client",
        "http",
        "api",
        "proxy",
        "rate-limiting",
        "pagination"
      ],
      main: "dist/index.js",
      types: "./dist/index.d.ts",
      files: [
        "dist/**/*"
      ],
      engines: {
        node: ">= 12.13.0",
        npm: ">= 6.12.0"
      },
      repository: "slackapi/node-slack-sdk",
      homepage: "https://slack.dev/node-slack-sdk/web-api",
      publishConfig: {
        access: "public"
      },
      bugs: {
        url: "https://github.com/slackapi/node-slack-sdk/issues"
      },
      scripts: {
        prepare: "npm run build",
        build: "npm run build:clean && tsc",
        "build:clean": "shx rm -rf ./dist ./coverage ./.nyc_output",
        lint: "eslint --ext .ts src",
        test: "npm run lint && npm run build && npm run test:mocha && npm run test:types",
        "test:mocha": "nyc mocha --config .mocharc.json src/*.spec.js",
        "test:types": "tsd",
        coverage: "codecov -F webapi --root=$PWD",
        "ref-docs:model": "api-extractor run",
        watch: "npx nodemon --watch 'src' --ext 'ts' --exec npm run build",
        "build:deno": `esbuild --bundle --define:process.cwd=String --define:process.version='"v16.0.0"' --define:Buffer=dummy_buffer --inject:./deno-shims/buffer-shim.js --inject:./deno-shims/xhr-shim.js --target=esnext --format=esm --outfile=./mod.js src/index.ts`
      },
      dependencies: {
        "@slack/logger": "^3.0.0",
        "@slack/types": "^2.0.0",
        "@types/is-stream": "^1.1.0",
        "@types/node": ">=12.0.0",
        "path-browserify": "1.0.1",
        "os-browserify": "0.3.0",
        axios: "^0.24.0",
        eventemitter3: "^3.1.0",
        "form-data": "^2.5.0",
        "is-stream": "^1.1.0",
        "p-queue": "^6.6.1",
        "p-retry": "^4.0.0",
        "is-electron": "2.2.0"
      },
      devDependencies: {
        "@aoberoi/capture-console": "^1.1.0",
        "@microsoft/api-extractor": "^7.3.4",
        "@types/chai": "^4.1.7",
        "@types/mocha": "^5.2.6",
        "@typescript-eslint/eslint-plugin": "^4.4.1",
        "@typescript-eslint/parser": "^4.4.0",
        busboy: "^0.3.0",
        chai: "^4.2.0",
        codecov: "^3.2.0",
        esbuild: "^0.13.15",
        eslint: "^7.32.0",
        "eslint-config-airbnb-base": "^14.2.1",
        "eslint-config-airbnb-typescript": "^12.3.1",
        "eslint-plugin-import": "^2.22.1",
        "eslint-plugin-jsdoc": "^30.6.1",
        "eslint-plugin-node": "^11.1.0",
        mocha: "^9.1.0",
        nock: "^13.1.0",
        nyc: "^14.1.1",
        shelljs: "^0.8.3",
        shx: "^0.3.2",
        sinon: "^7.2.7",
        "source-map-support": "^0.5.10",
        "ts-node": "^9.0.0",
        tsd: "^0.13.1",
        typescript: "^4.1"
      },
      browser: { os: "os-browserify", path: "path-browserify", querystring: "./deno-shims/qs-shim.js" },
      tsd: {
        directory: "test/types"
      }
    };
  }
});

// node_modules/@slack/logger/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/@slack/logger/dist/index.js"(exports) {
    init_buffer_shim();
    init_xhr_shim();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleLogger = exports.LogLevel = void 0;
    var LogLevel3;
    (function(LogLevel4) {
      LogLevel4["ERROR"] = "error";
      LogLevel4["WARN"] = "warn";
      LogLevel4["INFO"] = "info";
      LogLevel4["DEBUG"] = "debug";
    })(LogLevel3 = exports.LogLevel || (exports.LogLevel = {}));
    var ConsoleLogger2 = class {
      constructor() {
        this.level = LogLevel3.INFO;
        this.name = "";
      }
      getLevel() {
        return this.level;
      }
      setLevel(level) {
        this.level = level;
      }
      setName(name) {
        this.name = name;
      }
      debug(...msg) {
        if (ConsoleLogger2.isMoreOrEqualSevere(LogLevel3.DEBUG, this.level)) {
          console.debug(ConsoleLogger2.labels.get(LogLevel3.DEBUG), this.name, ...msg);
        }
      }
      info(...msg) {
        if (ConsoleLogger2.isMoreOrEqualSevere(LogLevel3.INFO, this.level)) {
          console.info(ConsoleLogger2.labels.get(LogLevel3.INFO), this.name, ...msg);
        }
      }
      warn(...msg) {
        if (ConsoleLogger2.isMoreOrEqualSevere(LogLevel3.WARN, this.level)) {
          console.warn(ConsoleLogger2.labels.get(LogLevel3.WARN), this.name, ...msg);
        }
      }
      error(...msg) {
        if (ConsoleLogger2.isMoreOrEqualSevere(LogLevel3.ERROR, this.level)) {
          console.error(ConsoleLogger2.labels.get(LogLevel3.ERROR), this.name, ...msg);
        }
      }
      static isMoreOrEqualSevere(a, b) {
        return ConsoleLogger2.severity[a] >= ConsoleLogger2.severity[b];
      }
    };
    exports.ConsoleLogger = ConsoleLogger2;
    ConsoleLogger2.labels = (() => {
      const entries = Object.entries(LogLevel3);
      const map = entries.map(([key, value]) => {
        return [value, `[${key}] `];
      });
      return new Map(map);
    })();
    ConsoleLogger2.severity = {
      [LogLevel3.ERROR]: 400,
      [LogLevel3.WARN]: 300,
      [LogLevel3.INFO]: 200,
      [LogLevel3.DEBUG]: 100
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ErrorCode: () => ErrorCode,
  LogLevel: () => import_logger2.LogLevel,
  Logger: () => import_logger2.Logger,
  Method: () => methods_exports.default,
  Methods: () => Methods,
  WebClient: () => WebClient,
  WebClientEvent: () => WebClientEvent2,
  addAppMetadata: () => addAppMetadata,
  cursorPaginationEnabledMethods: () => cursorPaginationEnabledMethods,
  retryPolicies: () => retry_policies_default
});
init_buffer_shim();
init_xhr_shim();

// src/WebClient.ts
init_buffer_shim();
init_xhr_shim();

// deno-shims/qs-shim.js
var qs_shim_exports = {};
__markAsModule(qs_shim_exports);
init_buffer_shim();
init_xhr_shim();
__reExport(qs_shim_exports, querystring_star);
import * as querystring_star from "https://deno.land/std@0.112.0/node/querystring.ts";

// src/WebClient.ts
var import_path = __toModule(require_path_browserify());
var import_is_stream = __toModule(require_is_stream());
var import_p_queue = __toModule(require_dist());
var import_p_retry = __toModule(require_p_retry());
var import_axios = __toModule(require_axios2());
var import_form_data = __toModule(require_browser());
var import_is_electron = __toModule(require_is_electron());

// src/methods.ts
var methods_exports = {};
__export(methods_exports, {
  Methods: () => Methods,
  cursorPaginationEnabledMethods: () => cursorPaginationEnabledMethods
});
init_buffer_shim();
init_xhr_shim();
var import_eventemitter3 = __toModule(require_eventemitter32());
__reExport(methods_exports, __toModule(require_dist2()));
function bindApiCall(self2, method) {
  return self2.apiCall.bind(self2, method);
}
var Methods = class extends import_eventemitter3.EventEmitter {
  constructor() {
    super();
    this.admin = {
      apps: {
        approve: bindApiCall(this, "admin.apps.approve"),
        approved: {
          list: bindApiCall(this, "admin.apps.approved.list")
        },
        clearResolution: bindApiCall(this, "admin.apps.clearResolution"),
        requests: {
          list: bindApiCall(this, "admin.apps.requests.list")
        },
        restrict: bindApiCall(this, "admin.apps.restrict"),
        restricted: {
          list: bindApiCall(this, "admin.apps.restricted.list")
        },
        uninstall: bindApiCall(this, "admin.apps.uninstall")
      },
      auth: {
        policy: {
          assignEntities: bindApiCall(this, "admin.auth.policy.assignEntities"),
          getEntities: bindApiCall(this, "admin.auth.policy.getEntities"),
          removeEntities: bindApiCall(this, "admin.auth.policy.removeEntities")
        }
      },
      barriers: {
        create: bindApiCall(this, "admin.barriers.create"),
        delete: bindApiCall(this, "admin.barriers.delete"),
        list: bindApiCall(this, "admin.barriers.list"),
        update: bindApiCall(this, "admin.barriers.update")
      },
      conversations: {
        archive: bindApiCall(this, "admin.conversations.archive"),
        convertToPrivate: bindApiCall(this, "admin.conversations.convertToPrivate"),
        create: bindApiCall(this, "admin.conversations.create"),
        delete: bindApiCall(this, "admin.conversations.delete"),
        disconnectShared: bindApiCall(this, "admin.conversations.disconnectShared"),
        ekm: {
          listOriginalConnectedChannelInfo: bindApiCall(this, "admin.conversations.ekm.listOriginalConnectedChannelInfo")
        },
        getConversationPrefs: bindApiCall(this, "admin.conversations.getConversationPrefs"),
        getTeams: bindApiCall(this, "admin.conversations.getTeams"),
        invite: bindApiCall(this, "admin.conversations.invite"),
        rename: bindApiCall(this, "admin.conversations.rename"),
        restrictAccess: {
          addGroup: bindApiCall(this, "admin.conversations.restrictAccess.addGroup"),
          listGroups: bindApiCall(this, "admin.conversations.restrictAccess.listGroups"),
          removeGroup: bindApiCall(this, "admin.conversations.restrictAccess.removeGroup")
        },
        getCustomRetention: bindApiCall(this, "admin.conversations.getCustomRetention"),
        setCustomRetention: bindApiCall(this, "admin.conversations.setCustomRetention"),
        removeCustomRetention: bindApiCall(this, "admin.conversations.removeCustomRetention"),
        search: bindApiCall(this, "admin.conversations.search"),
        setConversationPrefs: bindApiCall(this, "admin.conversations.setConversationPrefs"),
        setTeams: bindApiCall(this, "admin.conversations.setTeams"),
        unarchive: bindApiCall(this, "admin.conversations.unarchive")
      },
      emoji: {
        add: bindApiCall(this, "admin.emoji.add"),
        addAlias: bindApiCall(this, "admin.emoji.addAlias"),
        list: bindApiCall(this, "admin.emoji.list"),
        remove: bindApiCall(this, "admin.emoji.remove"),
        rename: bindApiCall(this, "admin.emoji.rename")
      },
      inviteRequests: {
        approve: bindApiCall(this, "admin.inviteRequests.approve"),
        approved: {
          list: bindApiCall(this, "admin.inviteRequests.approved.list")
        },
        denied: {
          list: bindApiCall(this, "admin.inviteRequests.denied.list")
        },
        deny: bindApiCall(this, "admin.inviteRequests.deny"),
        list: bindApiCall(this, "admin.inviteRequests.list")
      },
      teams: {
        admins: {
          list: bindApiCall(this, "admin.teams.admins.list")
        },
        create: bindApiCall(this, "admin.teams.create"),
        list: bindApiCall(this, "admin.teams.list"),
        owners: {
          list: bindApiCall(this, "admin.teams.owners.list")
        },
        settings: {
          info: bindApiCall(this, "admin.teams.settings.info"),
          setDefaultChannels: bindApiCall(this, "admin.teams.settings.setDefaultChannels"),
          setDescription: bindApiCall(this, "admin.teams.settings.setDescription"),
          setDiscoverability: bindApiCall(this, "admin.teams.settings.setDiscoverability"),
          setIcon: bindApiCall(this, "admin.teams.settings.setIcon"),
          setName: bindApiCall(this, "admin.teams.settings.setName")
        }
      },
      usergroups: {
        addChannels: bindApiCall(this, "admin.usergroups.addChannels"),
        addTeams: bindApiCall(this, "admin.usergroups.addTeams"),
        listChannels: bindApiCall(this, "admin.usergroups.listChannels"),
        removeChannels: bindApiCall(this, "admin.usergroups.removeChannels")
      },
      users: {
        assign: bindApiCall(this, "admin.users.assign"),
        invite: bindApiCall(this, "admin.users.invite"),
        list: bindApiCall(this, "admin.users.list"),
        remove: bindApiCall(this, "admin.users.remove"),
        session: {
          list: bindApiCall(this, "admin.users.session.list"),
          reset: bindApiCall(this, "admin.users.session.reset"),
          resetBulk: bindApiCall(this, "admin.users.session.resetBulk"),
          invalidate: bindApiCall(this, "admin.users.session.invalidate"),
          getSettings: bindApiCall(this, "admin.users.session.getSettings"),
          setSettings: bindApiCall(this, "admin.users.session.setSettings"),
          clearSettings: bindApiCall(this, "admin.users.session.clearSettings")
        },
        setAdmin: bindApiCall(this, "admin.users.setAdmin"),
        setExpiration: bindApiCall(this, "admin.users.setExpiration"),
        setOwner: bindApiCall(this, "admin.users.setOwner"),
        setRegular: bindApiCall(this, "admin.users.setRegular")
      }
    };
    this.api = {
      test: bindApiCall(this, "api.test")
    };
    this.apps = {
      connections: {
        open: bindApiCall(this, "apps.connections.open")
      },
      event: {
        authorizations: {
          list: bindApiCall(this, "apps.event.authorizations.list")
        }
      },
      uninstall: bindApiCall(this, "apps.uninstall")
    };
    this.auth = {
      revoke: bindApiCall(this, "auth.revoke"),
      teams: {
        list: bindApiCall(this, "auth.teams.list")
      },
      test: bindApiCall(this, "auth.test")
    };
    this.bots = {
      info: bindApiCall(this, "bots.info")
    };
    this.calls = {
      add: bindApiCall(this, "calls.add"),
      end: bindApiCall(this, "calls.end"),
      info: bindApiCall(this, "calls.info"),
      update: bindApiCall(this, "calls.update"),
      participants: {
        add: bindApiCall(this, "calls.participants.add"),
        remove: bindApiCall(this, "calls.participants.remove")
      }
    };
    this.chat = {
      delete: bindApiCall(this, "chat.delete"),
      deleteScheduledMessage: bindApiCall(this, "chat.deleteScheduledMessage"),
      getPermalink: bindApiCall(this, "chat.getPermalink"),
      meMessage: bindApiCall(this, "chat.meMessage"),
      postEphemeral: bindApiCall(this, "chat.postEphemeral"),
      postMessage: bindApiCall(this, "chat.postMessage"),
      scheduleMessage: bindApiCall(this, "chat.scheduleMessage"),
      scheduledMessages: {
        list: bindApiCall(this, "chat.scheduledMessages.list")
      },
      unfurl: bindApiCall(this, "chat.unfurl"),
      update: bindApiCall(this, "chat.update")
    };
    this.conversations = {
      acceptSharedInvite: bindApiCall(this, "conversations.acceptSharedInvite"),
      approveSharedInvite: bindApiCall(this, "conversations.approveSharedInvite"),
      archive: bindApiCall(this, "conversations.archive"),
      close: bindApiCall(this, "conversations.close"),
      create: bindApiCall(this, "conversations.create"),
      declineSharedInvite: bindApiCall(this, "conversations.declineSharedInvite"),
      history: bindApiCall(this, "conversations.history"),
      info: bindApiCall(this, "conversations.info"),
      invite: bindApiCall(this, "conversations.invite"),
      inviteShared: bindApiCall(this, "conversations.inviteShared"),
      join: bindApiCall(this, "conversations.join"),
      kick: bindApiCall(this, "conversations.kick"),
      leave: bindApiCall(this, "conversations.leave"),
      list: bindApiCall(this, "conversations.list"),
      listConnectInvites: bindApiCall(this, "conversations.listConnectInvites"),
      mark: bindApiCall(this, "conversations.mark"),
      members: bindApiCall(this, "conversations.members"),
      open: bindApiCall(this, "conversations.open"),
      rename: bindApiCall(this, "conversations.rename"),
      replies: bindApiCall(this, "conversations.replies"),
      setPurpose: bindApiCall(this, "conversations.setPurpose"),
      setTopic: bindApiCall(this, "conversations.setTopic"),
      unarchive: bindApiCall(this, "conversations.unarchive")
    };
    this.dialog = {
      open: bindApiCall(this, "dialog.open")
    };
    this.dnd = {
      endDnd: bindApiCall(this, "dnd.endDnd"),
      endSnooze: bindApiCall(this, "dnd.endSnooze"),
      info: bindApiCall(this, "dnd.info"),
      setSnooze: bindApiCall(this, "dnd.setSnooze"),
      teamInfo: bindApiCall(this, "dnd.teamInfo")
    };
    this.emoji = {
      list: bindApiCall(this, "emoji.list")
    };
    this.files = {
      delete: bindApiCall(this, "files.delete"),
      info: bindApiCall(this, "files.info"),
      list: bindApiCall(this, "files.list"),
      revokePublicURL: bindApiCall(this, "files.revokePublicURL"),
      sharedPublicURL: bindApiCall(this, "files.sharedPublicURL"),
      upload: bindApiCall(this, "files.upload"),
      comments: {
        delete: bindApiCall(this, "files.comments.delete")
      },
      remote: {
        info: bindApiCall(this, "files.remote.info"),
        list: bindApiCall(this, "files.remote.list"),
        add: bindApiCall(this, "files.remote.add"),
        update: bindApiCall(this, "files.remote.update"),
        remove: bindApiCall(this, "files.remote.remove"),
        share: bindApiCall(this, "files.remote.share")
      }
    };
    this.migration = {
      exchange: bindApiCall(this, "migration.exchange")
    };
    this.oauth = {
      access: bindApiCall(this, "oauth.access"),
      v2: {
        access: bindApiCall(this, "oauth.v2.access"),
        exchange: bindApiCall(this, "oauth.v2.exchange")
      }
    };
    this.openid = {
      connect: {
        token: bindApiCall(this, "openid.connect.token"),
        userInfo: bindApiCall(this, "openid.connect.userInfo")
      }
    };
    this.pins = {
      add: bindApiCall(this, "pins.add"),
      list: bindApiCall(this, "pins.list"),
      remove: bindApiCall(this, "pins.remove")
    };
    this.reactions = {
      add: bindApiCall(this, "reactions.add"),
      get: bindApiCall(this, "reactions.get"),
      list: bindApiCall(this, "reactions.list"),
      remove: bindApiCall(this, "reactions.remove")
    };
    this.reminders = {
      add: bindApiCall(this, "reminders.add"),
      complete: bindApiCall(this, "reminders.complete"),
      delete: bindApiCall(this, "reminders.delete"),
      info: bindApiCall(this, "reminders.info"),
      list: bindApiCall(this, "reminders.list")
    };
    this.rtm = {
      connect: bindApiCall(this, "rtm.connect"),
      start: bindApiCall(this, "rtm.start")
    };
    this.search = {
      all: bindApiCall(this, "search.all"),
      files: bindApiCall(this, "search.files"),
      messages: bindApiCall(this, "search.messages")
    };
    this.stars = {
      add: bindApiCall(this, "stars.add"),
      list: bindApiCall(this, "stars.list"),
      remove: bindApiCall(this, "stars.remove")
    };
    this.team = {
      accessLogs: bindApiCall(this, "team.accessLogs"),
      billableInfo: bindApiCall(this, "team.billableInfo"),
      billing: {
        info: bindApiCall(this, "team.billing.info")
      },
      info: bindApiCall(this, "team.info"),
      integrationLogs: bindApiCall(this, "team.integrationLogs"),
      preferences: {
        list: bindApiCall(this, "team.preferences.list")
      },
      profile: {
        get: bindApiCall(this, "team.profile.get")
      }
    };
    this.usergroups = {
      create: bindApiCall(this, "usergroups.create"),
      disable: bindApiCall(this, "usergroups.disable"),
      enable: bindApiCall(this, "usergroups.enable"),
      list: bindApiCall(this, "usergroups.list"),
      update: bindApiCall(this, "usergroups.update"),
      users: {
        list: bindApiCall(this, "usergroups.users.list"),
        update: bindApiCall(this, "usergroups.users.update")
      }
    };
    this.users = {
      conversations: bindApiCall(this, "users.conversations"),
      deletePhoto: bindApiCall(this, "users.deletePhoto"),
      getPresence: bindApiCall(this, "users.getPresence"),
      identity: bindApiCall(this, "users.identity"),
      info: bindApiCall(this, "users.info"),
      list: bindApiCall(this, "users.list"),
      lookupByEmail: bindApiCall(this, "users.lookupByEmail"),
      setPhoto: bindApiCall(this, "users.setPhoto"),
      setPresence: bindApiCall(this, "users.setPresence"),
      profile: {
        get: bindApiCall(this, "users.profile.get"),
        set: bindApiCall(this, "users.profile.set")
      }
    };
    this.views = {
      open: bindApiCall(this, "views.open"),
      publish: bindApiCall(this, "views.publish"),
      push: bindApiCall(this, "views.push"),
      update: bindApiCall(this, "views.update")
    };
    this.workflows = {
      stepCompleted: bindApiCall(this, "workflows.stepCompleted"),
      stepFailed: bindApiCall(this, "workflows.stepFailed"),
      updateStep: bindApiCall(this, "workflows.updateStep")
    };
    this.channels = {
      archive: bindApiCall(this, "channels.archive"),
      create: bindApiCall(this, "channels.create"),
      history: bindApiCall(this, "channels.history"),
      info: bindApiCall(this, "channels.info"),
      invite: bindApiCall(this, "channels.invite"),
      join: bindApiCall(this, "channels.join"),
      kick: bindApiCall(this, "channels.kick"),
      leave: bindApiCall(this, "channels.leave"),
      list: bindApiCall(this, "channels.list"),
      mark: bindApiCall(this, "channels.mark"),
      rename: bindApiCall(this, "channels.rename"),
      replies: bindApiCall(this, "channels.replies"),
      setPurpose: bindApiCall(this, "channels.setPurpose"),
      setTopic: bindApiCall(this, "channels.setTopic"),
      unarchive: bindApiCall(this, "channels.unarchive")
    };
    this.groups = {
      archive: bindApiCall(this, "groups.archive"),
      create: bindApiCall(this, "groups.create"),
      createChild: bindApiCall(this, "groups.createChild"),
      history: bindApiCall(this, "groups.history"),
      info: bindApiCall(this, "groups.info"),
      invite: bindApiCall(this, "groups.invite"),
      kick: bindApiCall(this, "groups.kick"),
      leave: bindApiCall(this, "groups.leave"),
      list: bindApiCall(this, "groups.list"),
      mark: bindApiCall(this, "groups.mark"),
      open: bindApiCall(this, "groups.open"),
      rename: bindApiCall(this, "groups.rename"),
      replies: bindApiCall(this, "groups.replies"),
      setPurpose: bindApiCall(this, "groups.setPurpose"),
      setTopic: bindApiCall(this, "groups.setTopic"),
      unarchive: bindApiCall(this, "groups.unarchive")
    };
    this.im = {
      close: bindApiCall(this, "im.close"),
      history: bindApiCall(this, "im.history"),
      list: bindApiCall(this, "im.list"),
      mark: bindApiCall(this, "im.mark"),
      open: bindApiCall(this, "im.open"),
      replies: bindApiCall(this, "im.replies")
    };
    this.mpim = {
      close: bindApiCall(this, "mpim.close"),
      history: bindApiCall(this, "mpim.history"),
      list: bindApiCall(this, "mpim.list"),
      mark: bindApiCall(this, "mpim.mark"),
      open: bindApiCall(this, "mpim.open"),
      replies: bindApiCall(this, "mpim.replies")
    };
    if (new.target !== WebClient && !(new.target.prototype instanceof WebClient)) {
      throw new Error("Attempt to inherit from WebClient methods without inheriting from WebClient");
    }
  }
};
var cursorPaginationEnabledMethods = new Set();
cursorPaginationEnabledMethods.add("admin.apps.approved.list");
cursorPaginationEnabledMethods.add("admin.apps.requests.list");
cursorPaginationEnabledMethods.add("admin.apps.restricted.list");
cursorPaginationEnabledMethods.add("admin.auth.policy.getEntities");
cursorPaginationEnabledMethods.add("admin.barriers.list");
cursorPaginationEnabledMethods.add("admin.conversations.ekm.listOriginalConnectedChannelInfo");
cursorPaginationEnabledMethods.add("admin.conversations.getTeams");
cursorPaginationEnabledMethods.add("admin.conversations.search");
cursorPaginationEnabledMethods.add("admin.emoji.list");
cursorPaginationEnabledMethods.add("admin.inviteRequests.approved.list");
cursorPaginationEnabledMethods.add("admin.inviteRequests.denied.list");
cursorPaginationEnabledMethods.add("admin.inviteRequests.list");
cursorPaginationEnabledMethods.add("admin.teams.admins.list");
cursorPaginationEnabledMethods.add("admin.teams.list");
cursorPaginationEnabledMethods.add("admin.teams.owners.list");
cursorPaginationEnabledMethods.add("admin.users.list");
cursorPaginationEnabledMethods.add("admin.users.session.list");
cursorPaginationEnabledMethods.add("apps.event.authorizations.list");
cursorPaginationEnabledMethods.add("auth.teams.list");
cursorPaginationEnabledMethods.add("channels.list");
cursorPaginationEnabledMethods.add("chat.scheduledMessages.list");
cursorPaginationEnabledMethods.add("conversations.history");
cursorPaginationEnabledMethods.add("conversations.list");
cursorPaginationEnabledMethods.add("conversations.listConnectInvites");
cursorPaginationEnabledMethods.add("conversations.members");
cursorPaginationEnabledMethods.add("conversations.replies");
cursorPaginationEnabledMethods.add("files.info");
cursorPaginationEnabledMethods.add("files.remote.list");
cursorPaginationEnabledMethods.add("groups.list");
cursorPaginationEnabledMethods.add("im.list");
cursorPaginationEnabledMethods.add("mpim.list");
cursorPaginationEnabledMethods.add("reactions.list");
cursorPaginationEnabledMethods.add("stars.list");
cursorPaginationEnabledMethods.add("users.conversations");
cursorPaginationEnabledMethods.add("users.list");

// src/instrument.ts
init_buffer_shim();
init_xhr_shim();
var os = __toModule(require_browser2());
var packageJson = require_package();
function replaceSlashes(s) {
  return s.replace("/", ":");
}
var baseUserAgent = `${replaceSlashes(packageJson.name)}/${packageJson.version} node/${"v16.0.0".replace("v", "")} ${os.platform()}/${os.release()}`;
var appMetadata = {};
function addAppMetadata({ name, version }) {
  appMetadata[replaceSlashes(name)] = version;
}
function getUserAgent() {
  const appIdentifier = Object.entries(appMetadata).map(([name, version]) => `${name}/${version}`).join(" ");
  return (appIdentifier.length > 0 ? `${appIdentifier} ` : "") + baseUserAgent;
}

// src/errors.ts
init_buffer_shim();
init_xhr_shim();
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["RequestError"] = "slack_webapi_request_error";
  ErrorCode2["HTTPError"] = "slack_webapi_http_error";
  ErrorCode2["PlatformError"] = "slack_webapi_platform_error";
  ErrorCode2["RateLimitedError"] = "slack_webapi_rate_limited_error";
})(ErrorCode || (ErrorCode = {}));
function errorWithCode(error, code) {
  const codedError = error;
  codedError.code = code;
  return codedError;
}
function requestErrorWithOriginal(original) {
  const error = errorWithCode(new Error(`A request error occurred: ${original.message}`), ErrorCode.RequestError);
  error.original = original;
  return error;
}
function httpErrorFromResponse(response) {
  const error = errorWithCode(new Error(`An HTTP protocol error occurred: statusCode = ${response.status}`), ErrorCode.HTTPError);
  error.statusCode = response.status;
  error.statusMessage = response.statusText;
  error.headers = response.headers;
  error.body = response.data;
  return error;
}
function platformErrorFromResult(result) {
  const error = errorWithCode(new Error(`An API error occurred: ${result.error}`), ErrorCode.PlatformError);
  error.data = result;
  return error;
}
function rateLimitedErrorWithDelay(retrySec) {
  const error = errorWithCode(new Error(`A rate-limit has been reached, you may retry this request in ${retrySec} seconds`), ErrorCode.RateLimitedError);
  error.retryAfter = retrySec;
  return error;
}

// src/logger.ts
init_buffer_shim();
init_xhr_shim();
var import_logger = __toModule(require_dist3());
var import_logger2 = __toModule(require_dist3());
var instanceCount = 0;
function getLogger(name, level, existingLogger) {
  const instanceId = instanceCount;
  instanceCount += 1;
  const logger = (() => {
    if (existingLogger !== void 0) {
      return existingLogger;
    }
    return new import_logger.ConsoleLogger();
  })();
  logger.setName(`web-api:${name}:${instanceId}`);
  if (level !== void 0) {
    logger.setLevel(level);
  }
  return logger;
}

// src/retry-policies.ts
init_buffer_shim();
init_xhr_shim();
var tenRetriesInAboutThirtyMinutes = {
  retries: 10,
  factor: 1.96821,
  randomize: true
};
var fiveRetriesInFiveMinutes = {
  retries: 5,
  factor: 3.86
};
var rapidRetryPolicy = {
  minTimeout: 0,
  maxTimeout: 1
};
var policies = {
  tenRetriesInAboutThirtyMinutes,
  fiveRetriesInFiveMinutes,
  rapidRetryPolicy
};
var retry_policies_default = policies;

// src/helpers.ts
init_buffer_shim();
init_xhr_shim();
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

// src/WebClient.ts
var defaultFilename = "Untitled";
var defaultPageSize = 200;
var noopPageReducer = () => void 0;
var WebClientEvent2;
(function(WebClientEvent3) {
  WebClientEvent3["RATE_LIMITED"] = "rate_limited";
})(WebClientEvent2 || (WebClientEvent2 = {}));
var _WebClient = class extends Methods {
  constructor(token, {
    slackApiUrl = "https://slack.com/api/",
    logger = void 0,
    logLevel = void 0,
    maxRequestConcurrency = 3,
    retryConfig = tenRetriesInAboutThirtyMinutes,
    agent = void 0,
    tls = void 0,
    timeout = 0,
    rejectRateLimitedCalls = false,
    headers = {},
    teamId = void 0
  } = {}) {
    super();
    this.token = token;
    this.slackApiUrl = slackApiUrl;
    this.retryConfig = retryConfig;
    this.requestQueue = new import_p_queue.default({ concurrency: maxRequestConcurrency });
    this.tlsConfig = tls !== void 0 ? tls : {};
    this.rejectRateLimitedCalls = rejectRateLimitedCalls;
    this.teamId = teamId;
    if (typeof logger !== "undefined") {
      this.logger = logger;
      if (typeof logLevel !== "undefined") {
        this.logger.debug("The logLevel given to WebClient was ignored as you also gave logger");
      }
    } else {
      this.logger = getLogger(_WebClient.loggerName, logLevel ?? import_logger2.LogLevel.INFO, logger);
    }
    if (this.token && !headers.Authorization)
      headers.Authorization = `Bearer ${this.token}`;
    this.axios = import_axios.default.create({
      timeout,
      baseURL: slackApiUrl,
      headers: (0, import_is_electron.default)() ? headers : { "User-Agent": getUserAgent(), ...headers },
      httpAgent: agent,
      httpsAgent: agent,
      transformRequest: [this.serializeApiCallOptions.bind(this)],
      validateStatus: () => true,
      maxRedirects: 0,
      proxy: false
    });
    delete this.axios.defaults.headers.post["Content-Type"];
    this.logger.debug("initialized");
  }
  async apiCall(method, options = {}) {
    this.logger.debug(`apiCall('${method}') start`);
    warnDeprecations(method, this.logger);
    warnIfFallbackIsMissing(method, this.logger, options);
    warnIfThreadTsIsNotString(method, this.logger, options);
    if (typeof options === "string" || typeof options === "number" || typeof options === "boolean") {
      throw new TypeError(`Expected an options argument but instead received a ${typeof options}`);
    }
    const headers = {};
    if (options.token)
      headers.Authorization = `Bearer ${options.token}`;
    const response = await this.makeRequest(method, {
      team_id: this.teamId,
      ...options
    }, headers);
    const result = this.buildResult(response);
    if (result.response_metadata !== void 0 && result.response_metadata.warnings !== void 0) {
      result.response_metadata.warnings.forEach(this.logger.warn.bind(this.logger));
    }
    if (result.response_metadata !== void 0 && result.response_metadata.messages !== void 0) {
      result.response_metadata.messages.forEach((msg) => {
        const errReg = /\[ERROR\](.*)/;
        const warnReg = /\[WARN\](.*)/;
        if (errReg.test(msg)) {
          const errMatch = msg.match(errReg);
          if (errMatch != null) {
            this.logger.error(errMatch[1].trim());
          }
        } else if (warnReg.test(msg)) {
          const warnMatch = msg.match(warnReg);
          if (warnMatch != null) {
            this.logger.warn(warnMatch[1].trim());
          }
        }
      });
    }
    if (!result.ok) {
      throw platformErrorFromResult(result);
    }
    return result;
  }
  paginate(method, options, shouldStop, reduce) {
    if (!cursorPaginationEnabledMethods.has(method)) {
      this.logger.warn(`paginate() called with method ${method}, which is not known to be cursor pagination enabled.`);
    }
    const pageSize = (() => {
      if (options !== void 0 && typeof options.limit === "number") {
        const { limit } = options;
        delete options.limit;
        return limit;
      }
      return defaultPageSize;
    })();
    async function* generatePages() {
      let result;
      let paginationOptions = {
        limit: pageSize
      };
      if (options !== void 0 && options.cursor !== void 0) {
        paginationOptions.cursor = options.cursor;
      }
      while (result === void 0 || paginationOptions !== void 0) {
        result = await this.apiCall(method, Object.assign(options !== void 0 ? options : {}, paginationOptions));
        yield result;
        paginationOptions = paginationOptionsForNextPage(result, pageSize);
      }
    }
    if (shouldStop === void 0) {
      return generatePages.call(this);
    }
    const pageReducer = reduce !== void 0 ? reduce : noopPageReducer;
    let index = 0;
    return (async () => {
      const pageIterator = generatePages.call(this);
      const firstIteratorResult = await pageIterator.next(void 0);
      const firstPage = firstIteratorResult.value;
      let accumulator = pageReducer(void 0, firstPage, index);
      index += 1;
      if (shouldStop(firstPage)) {
        return accumulator;
      }
      for await (const page of pageIterator) {
        accumulator = pageReducer(accumulator, page, index);
        if (shouldStop(page)) {
          return accumulator;
        }
        index += 1;
      }
      return accumulator;
    })();
  }
  async makeRequest(url, body, headers = {}) {
    const task = () => this.requestQueue.add(async () => {
      this.logger.debug("will perform http request");
      try {
        const response = await this.axios.post(url, body, {
          headers,
          ...this.tlsConfig
        });
        this.logger.debug("http response received");
        if (response.status === 429) {
          const retrySec = parseRetryHeaders(response);
          if (retrySec !== void 0) {
            this.emit(WebClientEvent2.RATE_LIMITED, retrySec);
            if (this.rejectRateLimitedCalls) {
              throw new import_p_retry.AbortError(rateLimitedErrorWithDelay(retrySec));
            }
            this.logger.info(`API Call failed due to rate limiting. Will retry in ${retrySec} seconds.`);
            this.requestQueue.pause();
            await delay(retrySec * 1e3);
            this.requestQueue.start();
            throw Error(`A rate limit was exceeded (url: ${url}, retry-after: ${retrySec})`);
          } else {
            throw new import_p_retry.AbortError(new Error(`Retry header did not contain a valid timeout (url: ${url})`));
          }
        }
        if (response.status !== 200) {
          throw httpErrorFromResponse(response);
        }
        return response;
      } catch (error) {
        const e = error;
        this.logger.warn("http request failed", e.message);
        if (e.request) {
          throw requestErrorWithOriginal(e);
        }
        throw error;
      }
    });
    return (0, import_p_retry.default)(task, this.retryConfig);
  }
  serializeApiCallOptions(options, headers) {
    let containsBinaryData = false;
    const flattened = Object.entries(options).map(([key, value]) => {
      if (value === void 0 || value === null) {
        return [];
      }
      let serializedValue = value;
      if (dummy_buffer.isBuffer(value) || (0, import_is_stream.default)(value)) {
        containsBinaryData = true;
      } else if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
        serializedValue = JSON.stringify(value);
      }
      return [key, serializedValue];
    });
    if (containsBinaryData) {
      this.logger.debug("request arguments contain binary data");
      const form = flattened.reduce((frm, [key, value]) => {
        if (dummy_buffer.isBuffer(value) || (0, import_is_stream.default)(value)) {
          const opts = {};
          opts.filename = (() => {
            const streamOrBuffer = value;
            if (typeof streamOrBuffer.name === "string") {
              return (0, import_path.basename)(streamOrBuffer.name);
            }
            if (typeof streamOrBuffer.path === "string") {
              return (0, import_path.basename)(streamOrBuffer.path);
            }
            return defaultFilename;
          })();
          frm.append(key, value, opts);
        } else if (key !== void 0 && value !== void 0) {
          frm.append(key, value);
        }
        return frm;
      }, new import_form_data.default());
      Object.entries(form.getHeaders()).forEach(([header, value]) => {
        headers[header] = value;
      });
      return form;
    }
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    const initialValue = {};
    return (0, qs_shim_exports.stringify)(flattened.reduce((accumulator, [key, value]) => {
      if (key !== void 0 && value !== void 0) {
        accumulator[key] = value;
      }
      return accumulator;
    }, initialValue));
  }
  buildResult(response) {
    let { data } = response;
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (_) {
        data = { ok: false, error: data };
      }
    }
    if (data.response_metadata === void 0) {
      data.response_metadata = {};
    }
    if (response.headers["x-oauth-scopes"] !== void 0) {
      data.response_metadata.scopes = response.headers["x-oauth-scopes"].trim().split(/\s*,\s*/);
    }
    if (response.headers["x-accepted-oauth-scopes"] !== void 0) {
      data.response_metadata.acceptedScopes = response.headers["x-accepted-oauth-scopes"].trim().split(/\s*,\s*/);
    }
    const retrySec = parseRetryHeaders(response);
    if (retrySec !== void 0) {
      data.response_metadata.retryAfter = retrySec;
    }
    return data;
  }
};
var WebClient = _WebClient;
WebClient.loggerName = "WebClient";
function paginationOptionsForNextPage(previousResult, pageSize) {
  if (previousResult !== void 0 && previousResult.response_metadata !== void 0 && previousResult.response_metadata.next_cursor !== void 0 && previousResult.response_metadata.next_cursor !== "") {
    return {
      limit: pageSize,
      cursor: previousResult.response_metadata.next_cursor
    };
  }
  return void 0;
}
function parseRetryHeaders(response) {
  if (response.headers["retry-after"] !== void 0) {
    const retryAfter = parseInt(response.headers["retry-after"], 10);
    if (!Number.isNaN(retryAfter)) {
      return retryAfter;
    }
  }
  return void 0;
}
function warnDeprecations(method, logger) {
  const deprecatedConversationsMethods = ["channels.", "groups.", "im.", "mpim."];
  const deprecatedMethods = ["admin.conversations.whitelist."];
  const isDeprecatedConversations = deprecatedConversationsMethods.some((depMethod) => {
    const re = new RegExp(`^${depMethod}`);
    return re.test(method);
  });
  const isDeprecated = deprecatedMethods.some((depMethod) => {
    const re = new RegExp(`^${depMethod}`);
    return re.test(method);
  });
  if (isDeprecatedConversations) {
    logger.warn(`${method} is deprecated. Please use the Conversations API instead. For more info, go to https://api.slack.com/changelog/2020-01-deprecating-antecedents-to-the-conversations-api`);
  } else if (isDeprecated) {
    logger.warn(`${method} is deprecated. Please check on https://api.slack.com/methods for an alternative.`);
  }
}
function warnIfFallbackIsMissing(method, logger, options) {
  const targetMethods = ["chat.postEphemeral", "chat.postMessage", "chat.scheduleMessage", "chat.update"];
  const isTargetMethod = targetMethods.includes(method);
  const missingAttachmentFallbackDetected = (args) => Array.isArray(args.attachments) && args.attachments.some((attachment) => !attachment.fallback || attachment.fallback.trim() === 0);
  const isEmptyText = (args) => args.text === void 0 || args.text === null || args.text === "";
  const buildWarningMessage = (missing) => `The \`${missing}\` argument is missing in the request payload for a ${method} call - It's a best practice to always provide a \`${missing}\` argument when posting a message. The \`${missing}\` is used in places where the content cannot be rendered such as: system push notifications, assistive technology such as screen readers, etc.`;
  if (isTargetMethod && typeof options === "object" && isEmptyText(options)) {
    if (missingAttachmentFallbackDetected(options)) {
      logger.warn(buildWarningMessage("fallback"));
    } else {
      logger.warn(buildWarningMessage("text"));
    }
  }
}
function warnIfThreadTsIsNotString(method, logger, options) {
  const targetMethods = ["chat.postEphemeral", "chat.postMessage", "chat.scheduleMessage", "files.upload"];
  const isTargetMethod = targetMethods.includes(method);
  if (isTargetMethod && options?.thread_ts !== void 0 && typeof options?.thread_ts !== "string") {
    logger.warn(`The given thread_ts value in the request payload for a ${method} call is a float value. We highly recommend using a string value instead.`);
  }
}

// src/index.ts
__reExport(src_exports, methods_exports);

// src/response/index.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAnalyticsGetFileResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAppsApproveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAppsApprovedListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAppsClearResolutionResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAppsRequestsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAppsRestrictResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAppsRestrictedListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAppsUninstallResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAuthPolicyAssignEntitiesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAuthPolicyGetEntitiesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminAuthPolicyRemoveEntitiesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminBarriersCreateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminBarriersDeleteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminBarriersListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminBarriersUpdateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsArchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsConvertToPrivateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsCreateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsDeleteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsDisconnectSharedResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsEkmListOriginalConnectedChannelInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsGetConversationPrefsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsGetCustomRetentionResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsGetTeamsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsRemoveCustomRetentionResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsRenameResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsRestrictAccessAddGroupResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsRestrictAccessListGroupsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsRestrictAccessRemoveGroupResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsSearchResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsSetConversationPrefsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsSetCustomRetentionResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsSetTeamsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsUnarchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsWhitelistAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsWhitelistListGroupsLinkedToChannelResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminConversationsWhitelistRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminEmojiAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminEmojiAddAliasResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminEmojiListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminEmojiRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminEmojiRenameResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminInviteRequestsApproveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminInviteRequestsApprovedListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminInviteRequestsDeniedListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminInviteRequestsDenyResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminInviteRequestsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsAdminsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsCreateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsOwnersListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsSettingsInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsSettingsSetDefaultChannelsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsSettingsSetDescriptionResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsSettingsSetDiscoverabilityResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsSettingsSetIconResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminTeamsSettingsSetNameResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsergroupsAddChannelsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsergroupsAddTeamsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsergroupsListChannelsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsergroupsRemoveChannelsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersAssignResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSessionClearSettingsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSessionGetSettingsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSessionInvalidateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSessionListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSessionResetResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSessionResetBulkResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSessionSetSettingsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSetAdminResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSetExpirationResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSetOwnerResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AdminUsersSetRegularResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ApiTestResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsConnectionsOpenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsEventAuthorizationsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsPermissionsInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsPermissionsRequestResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsPermissionsResourcesListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsPermissionsScopesListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsPermissionsUsersListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsPermissionsUsersRequestResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AppsUninstallResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AuthRevokeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AuthTeamsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/AuthTestResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/BotsInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/CallsAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/CallsEndResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/CallsInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/CallsParticipantsAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/CallsParticipantsRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/CallsUpdateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsArchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsCreateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsHistoryResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsJoinResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsKickResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsLeaveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsMarkResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsRenameResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsRepliesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsSetPurposeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsSetTopicResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChannelsUnarchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatDeleteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatDeleteScheduledMessageResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatGetPermalinkResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatMeMessageResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatPostEphemeralResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatPostMessageResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatScheduleMessageResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatScheduledMessagesListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatUnfurlResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ChatUpdateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsAcceptSharedInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsApproveSharedInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsArchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsCloseResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsCreateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsDeclineSharedInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsHistoryResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsInviteSharedResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsJoinResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsKickResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsLeaveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsListConnectInvitesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsMarkResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsMembersResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsOpenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsRenameResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsRepliesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsSetPurposeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsSetTopicResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ConversationsUnarchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/DialogOpenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/DndEndDndResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/DndEndSnoozeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/DndInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/DndSetSnoozeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/DndTeamInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/EmojiListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesCommentsAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesCommentsDeleteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesCommentsEditResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesDeleteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesRemoteAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesRemoteInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesRemoteListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesRemoteRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesRemoteShareResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesRemoteUpdateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesRevokePublicURLResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesSharedPublicURLResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/FilesUploadResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsArchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsCloseResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsCreateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsCreateChildResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsHistoryResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsInviteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsKickResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsLeaveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsMarkResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsOpenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsRenameResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsRepliesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsSetPurposeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsSetTopicResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/GroupsUnarchiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ImCloseResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ImHistoryResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ImListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ImMarkResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ImOpenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ImRepliesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/MigrationExchangeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/MpimCloseResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/MpimHistoryResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/MpimListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/MpimMarkResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/MpimOpenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/MpimRepliesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/OauthAccessResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/OauthTokenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/OauthV2AccessResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/OauthV2ExchangeResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/OpenIDConnectTokenResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/OpenIDConnectUserInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/PinsAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/PinsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/PinsRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ReactionsAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ReactionsGetResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ReactionsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ReactionsRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/RemindersAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/RemindersCompleteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/RemindersDeleteResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/RemindersInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/RemindersListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/RtmConnectResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/RtmStartResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/SearchAllResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/SearchFilesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/SearchMessagesResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/StarsAddResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/StarsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/StarsRemoveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/TeamAccessLogsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/TeamBillableInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/TeamBillingInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/TeamInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/TeamIntegrationLogsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/TeamPreferencesListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/TeamProfileGetResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsergroupsCreateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsergroupsDisableResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsergroupsEnableResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsergroupsListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsergroupsUpdateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsergroupsUsersListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsergroupsUsersUpdateResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersConversationsResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersDeletePhotoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersGetPresenceResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersIdentityResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersInfoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersListResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersLookupByEmailResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersProfileGetResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersProfileSetResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersSetActiveResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersSetPhotoResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/UsersSetPresenceResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/ViewsOpenResponse.ts
init_buffer_shim();
init_xhr_shim();
var Type;
(function(Type5) {
  Type5["Empty"] = "";
  Type5["Mrkdwn"] = "mrkdwn";
  Type5["PlainText"] = "plain_text";
})(Type || (Type = {}));

// src/response/ViewsPublishResponse.ts
init_buffer_shim();
init_xhr_shim();
var Type2;
(function(Type5) {
  Type5["Empty"] = "";
  Type5["Mrkdwn"] = "mrkdwn";
  Type5["PlainText"] = "plain_text";
})(Type2 || (Type2 = {}));

// src/response/ViewsPushResponse.ts
init_buffer_shim();
init_xhr_shim();
var Type3;
(function(Type5) {
  Type5["Empty"] = "";
  Type5["Mrkdwn"] = "mrkdwn";
  Type5["PlainText"] = "plain_text";
})(Type3 || (Type3 = {}));

// src/response/ViewsUpdateResponse.ts
init_buffer_shim();
init_xhr_shim();
var Type4;
(function(Type5) {
  Type5["Empty"] = "";
  Type5["Mrkdwn"] = "mrkdwn";
  Type5["PlainText"] = "plain_text";
})(Type4 || (Type4 = {}));

// src/response/WorkflowsStepCompletedResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/WorkflowsStepFailedResponse.ts
init_buffer_shim();
init_xhr_shim();

// src/response/WorkflowsUpdateStepResponse.ts
init_buffer_shim();
init_xhr_shim();
var export_LogLevel = import_logger2.LogLevel;
var export_Logger = import_logger2.Logger;
var export_Method = methods_exports.default;
export {
  ErrorCode,
  export_LogLevel as LogLevel,
  export_Logger as Logger,
  export_Method as Method,
  Methods,
  WebClient,
  WebClientEvent2 as WebClientEvent,
  addAppMetadata,
  cursorPaginationEnabledMethods,
  retry_policies_default as retryPolicies
};
