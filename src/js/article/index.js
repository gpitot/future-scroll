import { lerp, getPageYScroll } from "../utils";

export default class SmoothScrollingArticle {
  constructor({ article, scrollable, items }) {
    this.DOM = {
      main: article,
      scrollable
    };
    this.items = items;

    this.scrolling = false;

    this.renderedStyles = {
      translationY: {
        // interpolated value
        previous: 0,
        // current value
        current: 0,
        // amount to interpolate
        ease: 0.1,
        // current value setter
        // in this case the value of the translation will be the same like the document scroll
        setValue: getPageYScroll
      }
    };
    // set the body's height
    this.handleResize();

    // the <main> element's style needs to be modified
    this.style();

    // start the render loop
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  }

  handleScroll = () => {
    if (this.scrolling) return;
    this.scrolling = true;
    requestAnimationFrame(this.render);
  };

  handleResize = () => {
    document.body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
  };

  layout = () => {
    const {
      translationY: { previous }
    } = this.renderedStyles;

    this.DOM.scrollable.style.transform = `translate3d(0,${-1 * previous}px,0)`;
  };

  style = () => {
    // the <main> needs to "stick" to the screen and not scroll
    // for that we set it to position fixed and overflow hidden
    this.DOM.main.style.position = "fixed";
    this.DOM.main.style.width = this.DOM.main.style.height = "100%";
    this.DOM.main.style.top = this.DOM.main.style.left = 0;
    this.DOM.main.style.overflow = "hidden";
  };


  addItem = (item) => {
      this.items.push(item);
  }

  render = () => {
    // update the current and interpolated values
    const { translationY } = this.renderedStyles;

    translationY.current = translationY.setValue();
    translationY.previous = lerp(
      translationY.previous,
      translationY.current,
      translationY.ease
    );

    let anyItemRendering = false;
    if (Math.abs(translationY.current - translationY.previous) > 0.5) {
      this.layout();
      anyItemRendering = true;
    }

    // for every item
    
    this.items.forEach(element => {
      if (element.update()) {
        anyItemRendering = true;
      }
      
    });
    if (anyItemRendering) {
        requestAnimationFrame(this.render);
    } else {
        this.scrolling = false;
    }

    //setTimeout(() => this.render(), 1500);
  };
}
