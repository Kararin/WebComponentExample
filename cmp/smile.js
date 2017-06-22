var thisDoc = (document._currentScript || document.currentScript).ownerDocument;

const cb = () => {
    var template = thisDoc.querySelector('template').content,
        MyElementProto = Object.create(HTMLElement.prototype);

    MyElementProto.createdCallback = function() {
        var shadowRoot = this.createShadowRoot();
        var clone = document.importNode(template, true);
        shadowRoot.appendChild(clone);

        this.el = shadowRoot.querySelector('#smile');
        this.ctx = this.el.getContext('2d');

        this.setSmile(JSON.parse(this.getAttribute('smile')));
    };

    MyElementProto.attributeChangedCallback = function(attr, oldVal, newVal) {
        if (attr === 'smile') {
            this.setSmile(JSON.parse(newVal));
        }
    };

    MyElementProto.setSmile = function(val) {
        this.el.innerHTML = val ? this.drawHappy() : this.drawSad();
    };

    MyElementProto.drawHappy = function() {
        this.clean();
        this.drawFace();
        this.drawHappyEyes();
        this.drawSmile();
    };

    MyElementProto.drawHappyEyes = function() {
        let width = this.el.width,
            height = this.el.height,
            topPadding = height / 1.8,
            leftPadding = width / 3;

        this.ctx.beginPath();
        this.ctx.moveTo(width / 2 - 10, 20);
        this.ctx.lineTo(width / 2 - 25, 30);
        this.ctx.moveTo(width / 2 + 10, 20);
        this.ctx.lineTo(width / 2 + 25, 30);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    MyElementProto.drawSmile = function() {
        let width = this.el.width,
            height = this.el.height;

        this.ctx.beginPath();
        this.ctx.arc(width / 2, height / 2, width / 3, 0, Math.PI, false);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    MyElementProto.help = function() {
        let width = this.el.width,
            height = this.el.height;

        this.ctx.beginPath();
        this.ctx.moveTo(0, height / 2);
        this.ctx.lineTo(width, height / 2);
        this.ctx.moveTo(width / 2, 0);
        this.ctx.lineTo(width / 2, height);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    MyElementProto.drawSad = function() {
        this.clean();
        this.drawFace();
        this.drawSadEyes();
        this.drawSadSmile();
    };

    MyElementProto.drawSadEyes = function() {
        let width = this.el.width,
            height = this.el.height;

        this.ctx.beginPath();
        this.ctx.arc(width / 2 - 13, 25, 3, 0, Math.PI * 2);
        this.ctx.arc(width / 2 + 13, 25, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    };

    MyElementProto.drawSadSmile = function() {
        let width = this.el.width,
            height = this.el.height;

        this.ctx.beginPath();
        this.ctx.moveTo(width / 2 - 20, height / 2 + 15);
        this.ctx.lineTo(width / 2 + 20, height / 2 + 15);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    MyElementProto.drawFace = function() {
        let width = this.el.width,
            height = this.el.height,
            r = width / 2;

        this.ctx.beginPath();
        this.ctx.arc(width / 2, height / 2, r, 0, 2 * Math.PI, true);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    MyElementProto.clean = function() {
        this.ctx.clearRect(0, 0, this.el.height, this.el.width);
    };

    window.MyElement = document.registerElement('my-smiley', {
        prototype: MyElementProto
    });

};

thisDoc.addEventListener('DOMContentLoaded', cb);