# package template
npm package for smooth scrolling across browsers/mouses


# how to use

import SmoothScrollingArticle, {Item} from "smooth-scroll";

const item = new Item({element});
item.add({
    ease ,
    minChange,
    update : (element) => {},
    render : (element, current) => {}
});

new SmoothScrollingArticle({
    article : document.querySelector("main"),
    scrollable : document.querySelector("div[data-scroll]"),
    items : [item]
})