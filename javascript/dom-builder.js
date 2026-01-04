export class DOMBuilder {
    /*
    Trida pro vytvoreni DOM stromu
    */
    constructor() {
        this.root = document.createElement("div");
        this.root.classList.add("root");

        this.currentParent = this.root;
    }

    setParent(parent) {
        this.currentParent = parent;
    }

    appendHeading(headingType, payload, setClass=null) {
        const h = document.createElement(headingType);
        if(setClass) {
            h.classList.add(setClass)
        }
        h.textContent = payload;
        this.currentParent.appendChild(h);
        return h;
    }

    appendParagraph(payload, setClass=null) {
        const p = document.createElement("p");
        if(setClass) {
            p.classList.add(setClass)
        }
        p.textContent = payload;
        this.currentParent.appendChild(p);
        return p;
    }

    appendDiv(setClass=null) {
        const d = document.createElement("div");
        if(setClass) {
            d.classList.add(setClass)
        }
        this.currentParent.appendChild(d);
        return d;
    }

    appendImg(source, description) {
        const img = document.createElement("img");
        img.src = source;
        img.alt = description;
        this.currentParent.appendChild(img);
        return img;
    }
}