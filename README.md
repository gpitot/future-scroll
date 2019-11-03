# package template
npm package for smooth scrolling across browsers/mouses


# how to use
```javascript
import SmoothScrollingArticle, {Item} from "smooth-scroll";

const item = new Item({element});
item.add({
    ease ,
    render : (element, currentPosition) => {
        //currentPosition is number from 0 to 1
        //use it to animate your element, e.g. transform scale of image 
        //use a mapping maths function to do this.
        //e.g. const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
    }
});

new SmoothScrollingArticle({
    article : document.querySelector(article),
    scrollable : document.querySelector(element),
    items : [item, ...]
})
```


# demo
[Here is a demo](https://gpitot.github.io/smoothscrolldemo/)