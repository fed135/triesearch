/**
 * Trie-search entry point
 */

'use strict';

/* Requires ------------------------------------------------------------------*/

var Trie = require('./lib/trie').Trie;

/* Methods -------------------------------------------------------------------*/

function Autocomplete(name) {
  this.trie = new Trie();
  return this;
}

Autocomplete.prototype.initialize = function(elements) {
  this.addContainer(elements);
};

Autocomplete.prototype.addContainer = function(element) {
  Object.keys(element).forEach(function(e, i) {
    if (typeof element[e] === 'object') {
      var _k = Object.keys(element[e]);
      this.addElement({key:_k[0], value:element[e][_k[0]]});
    }
    else {
      if (e != i) this.addElement({key: e, value: element[e]});
      else this.addElement({key: element[i], value: element[i]});
    }
  }, this);
};

Autocomplete.prototype.addElement = function(element) {
  this.trie.addValue(element);
};


Autocomplete.prototype.removeElement = function(element) {
  this.trie.removeValue(element);
};

Autocomplete.prototype.search = function(prefix) {
  return this.trie.autoComplete(prefix);
};

/* Exports -------------------------------------------------------------------*/

module.exports = Autocomplete;
