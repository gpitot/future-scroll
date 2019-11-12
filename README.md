# package template

npm package for smooth scrolling across browsers/mouses

# installation

```javascript
npm i future-scroll
```

[NPM package](https://www.npmjs.com/package/future-scroll)

# how to use

```javascript
import FutureScroll, { Item } from "future-scroll";

const item = new Item({element});
item.add({
    ease : 0.1,
    render : (element, currentPosition) => {
        //currentPosition is number from 0 to 1
        //use it to animate your element, e.g. transform scale of image
        //use a mapping maths function to do this.
        //e.g. const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
    }
});

const fs = new FutureScroll({
    article : document.querySelector(article),
    scrollable : document.querySelector(element),
    items : [item, ...]
})


const anotherItem = new Item({element});
anotherItem.add({
    ease : 0.1,
    render : (element, currentPosition) => {
    }
});
fs.addItem(anotherItem);
```

# demo

[Here is a demo](https://gpitot.github.io/smoothscrolldemo/)
