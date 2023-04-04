import $ from '../core';

$.prototype.setAttr = function(attribute, value) {
    for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(attribute, value);
    }

    return this;
}

$.prototype.removeAttr = function(attribute) {
    for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute(attribute);
    }

    return this;
}

$.prototype.getAttr = function(attribute) {
    for (let i = 0; i < this.length; i++) {
        return this[0].getAttribute(attribute);
    }

    return this;
}

$.prototype.toggleAttr = function(attribute, value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].hasAttribute(attribute)) {
            this[i].removeAttribute(attribute);
        } else {
            this[i].setAttribute(attribute, value);
        }
    }

    return this;
}