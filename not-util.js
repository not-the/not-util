// Dom manipulation -----------------------------------------
//#region 
/** Shorthand for document.getElementById()
 * @param {string} id ID of the target element
 * @returns Returns a reference to the first object with the specified value of the ID attribute.
 */
function dom(id) {return document.getElementById(id);}
/** Shorthand for document.getElementById()
 * @param {string} id ID of the target element
 * @returns Returns a reference to the first object with the specified value of the ID attribute.
 */
var id = dom;
/** Shorthand for document.querySelector()
 * @param {string} sel DOM selector
 * @returns Returns the first element that is a descendant of node that matches selectors.
 */
function $(sel) {return document.querySelector(sel);}
/** Shorthand for document.querySelectorAll()
 * @param {string} sel DOM selector
 * @returns Returns all element descendants of node that match selectors.
 */
function $all(sel) {return document.querySelectorAll(sel);}

/** Shorthand for adding/removing a CSS class to or from an element
 * @param {node} element HTML element
 * @param {string} classname CSS class name
 * @param {boolean} state true = add, false = remove
 */
function style(element, classname, state) {
    state ? element.classList.add(classname) : element.classList.remove(classname);
}
//#endregion



// localStorage ----------------------------------------------
//#region 
/** Shorthand for localStorage.getItem & localStorage.setItem. Will only setItem if a value is specified
 * @param {string} key 
 * @param {any} value 
 * @param {constructor} datatype If you specify a datatype it will be converted back to it when returned instead of being returned as a string
 * @returns Value if only key is specified
 */
function store(key, value, datatype=String) {
    switch (datatype) {
        // Object
        case Object:
            if(value) localStorage.setItem(key, JSON.stringify(value));
            else {
                let v = localStorage.getItem(key);
                return v && JSON.parse(v);
            }
            break;

        // Number
        case Number:
            if(value) localStorage.setItem(value);
            else {
                let v = localStorage.getItem(key);
                return v && Number(v);
            }
            break;

        // String/default
        default:
            if(value) localStorage.setItem(key, value);
            else return localStorage.getItem(key);
            break;
    }
}
/** Shorthand for localStorage.getItem & localStorage.setItem. Will only setItem if a value is specified
 * @param {string} key 
 * @param {any} value 
 * @param {constructor} datatype If you specify a datatype it will be converted to it when returned instead of being returned as a string
 * @returns Value if only key is specified
 */
var ls = store;
/** Shorthand for sessionStorage.getItem & sessionStorage.setItem. Will only setItem if a value is specified
 * @param {string} key 
 * @param {any} value 
 * @param {constructor} datatype If you specify a datatype it will be converted to it when returned instead of being returned as a string
 * @returns Value if only key is specified
 */
function sessionStore(key, value, datatype=String) {
    switch (datatype) {
        // Object
        case Object:
            if(value) sessionStorage.setItem(key, JSON.stringify(value));
            else {
                let v = sessionStorage.getItem(key);
                return v && JSON.parse(v);
            }
            break;

        // Number
        case Number:
            if(value) sessionStorage.setItem(value);
            else {
                let v = sessionStorage.getItem(key);
                return v && Number(v);
            }
            break;

        // String/default
        default:
            if(value) sessionStorage.setItem(key, value);
            else return sessionStorage.getItem(key);
            break;
    }
}
/** Shorthand for sessionStorage.getItem & sessionStorage.setItem. Will only setItem if a value is specified
 * @param {string} key 
 * @param {any} value 
 * @param {constructor} datatype If you specify a datatype it will be converted to it when returned instead of being returned as a string
 * @returns Value if only key is specified
 */
var ss = sessionStore;
// Storage.prototype.setObject = (key, value) => { this.setItem(key, JSON.stringify(value)); }
// Storage.prototype.getObject = function(key) {
//     var value = this.getItem(key);
//     return value && JSON.parse(value);
// }
//#endregion



// Numbers ----------------------------------------------------

// Random number generator
//#region 
/** Shorthand for Math.floor(Math.random() * max)
 * @param {number} max Range
 * @returns Returns a random number between 0 and the provided maximum minus 1. Will not return the maximum, will at most return max - 1 and at least return 0.
 */
function random(max) {
    return Math.floor(Math.random() * max);
}
/**
 * Shorthand for Math.floor(Math.random() * max)
 * @param {number} max Range
 * @returns Returns a random number between 0 and the provided maximum minus 1. Will not return the maximum, will at most return max - 1 and at least return 0.
 */
var r = random;
//#endregion

// Percentage calculator (From https://stackoverflow.com/a/48841348/11039898)
//#region 
/** Finds a Percentage
 * @param {Number} number 
 * @param {Number} total 
 * @returns (100 * number)/total
 */
 function percentage(num, total) {
    return (100 * num) / total;
}
//#endregion

// Add commas to full number (From https://stackoverflow.com/a/2901298/11039898)
//#region 
/** Adds commas to numbers
 * @param {Number} number 
 * @returns A number seperated with commas
 */
function numCommas(num) {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
//#endregion



// Strings ------------------------------------------------------

// Capitalize first letter of string
//#region 
// https://stackoverflow.com/a/1026087
function capitalizeFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//#endregion



/** Levenshtein distance between 2 strings
 * From: https://github.com/gustf/js-levenshtein/blob/master/index.js
*/
function levenshtein(a, b) {
    if(a === b) return 0;
    if(a.length > b.length) {
        let tmp = a;
        a = b;
        b = tmp;
    }

    let la = a.length;
    let lb = b.length;
    while(la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
        la--;
        lb--;
    }

    let offset = 0;
    while(offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
        offset++;
    }

    la -= offset;
    lb -= offset;
    if(la === 0 || lb < 3) return lb;

    let x = 0, y, d0, d1, d2, d3, dd, dy, ay, bx0, bx1, bx2, bx3;
    let vector = [];

    for(y = 0; y < la; y++) {
        vector.push(y + 1);
        vector.push(a.charCodeAt(offset + y));
    }

    let len = vector.length - 1;
    for (; x < lb - 3;) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        bx1 = b.charCodeAt(offset + (d1 = x + 1));
        bx2 = b.charCodeAt(offset + (d2 = x + 2));
        bx3 = b.charCodeAt(offset + (d3 = x + 3));
        dd = (x += 4);
        for (y = 0; y < len; y += 2) {
            dy = vector[y];
            ay = vector[y + 1];
            d0 = _min(dy, d0, d1, bx0, ay);
            d1 = _min(d0, d1, d2, bx1, ay);
            d2 = _min(d1, d2, d3, bx2, ay);
            dd = _min(d2, d3, dd, bx3, ay);
            vector[y] = dd;
            d3 = d2;
            d2 = d1;
            d1 = d0;
            d0 = dy;
        }
    }

    for(; x < lb;) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        dd = ++x;
        for(y = 0; y < len; y += 2) {
            dy = vector[y];
            vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
            d0 = dy;
        }
    }

    return dd;

    // Min
    function _min(d0, d1, d2, bx, ay) {
        return d0 < d1 || d2 < d1
            ? d0 > d2
                ? d2 + 1
                : d0 + 1
            : bx === ay
                ? d1
                : d1 + 1;
    }
};

// Mouse position -----------------------------------------------

// Mouse position handler
// From: https://stackoverflow.com/a/7790764
var mouseX = 0;
var mouseY = 0;
function trackMouse(state=true) {
    if(!state) return document.onmousemove = undefined;
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        
        mouseX = event.pageX;
        mouseY = event.pageY;
    }
}
