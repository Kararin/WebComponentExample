var thisDoc = (document._currentScript || document.currentScript).ownerDocument;

const cb = () => {
    var template = thisDoc.querySelector('template').content,
        MyElementProto = Object.create(HTMLElement.prototype);

    MyElementProto.createdCallback = function() {
        var shadowRoot = this.createShadowRoot();
        var clone = document.importNode(template, true);
        shadowRoot.appendChild(clone);

        this.el = shadowRoot.querySelector('.smile');

        this.setSmile(JSON.parse(this.getAttribute('smile')));
    };

    MyElementProto.attributeChangedCallback = function(attr, oldVal, newVal) {
        if (attr === 'smile') {
            this.setSmile(JSON.parse(newVal));
        }
    };

    MyElementProto.setSmile = function(val) {
        this.el.innerHTML = val ? '&#9786;' : '&#9785;';
    };

    window.MyElement = document.registerElement('my-smiley', {
        prototype: MyElementProto
    });

};

thisDoc.addEventListener('DOMContentLoaded', cb);