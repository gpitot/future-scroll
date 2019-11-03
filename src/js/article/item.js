import { lerp, map } from "../utils";

class Item {
  constructor({ element }) {
    this.element = element;
    this.effects = [];
    this.visible = false;

    this.minChange = 0.04;

    this.handleResize();

    new IntersectionObserver(this.observerCallback).observe(this.element);
  }

  handleResize = () => {
    this.size = this.element.getBoundingClientRect();
  };

  observerCallback = ([{ isIntersecting }]) => {
    this.visible = isIntersecting;
  };

  add = ({ ease, render }) => {
    this.effects.push({
      previous: 0,
      current: 0,
      ease,
      render
    });
  };

  getPercentageToTop = () => {
    //from 0 - 1
    //1 is top of screen
    //0 bottom of sreen
    const val = map(
      this.element.getBoundingClientRect().top,
      window.innerHeight,
      0,
      0,
      1
    );
    return val;
  };

  update = () => {
    if (!this.visible) return false;

    let shouldRender = false;
    this.effects.forEach(effect => {
      const { ease } = effect;

      const current = this.getPercentageToTop();
      const previous = lerp(effect.previous, current, ease);

      if (Math.abs(previous - current) > this.minChange) {
        shouldRender = true;
        effect.previous = previous;
        effect.current = current;
      }
    });

    if (shouldRender) {
      this.render();
      return true;
    }
    return false;
  };

  render = () => {
    //previous in this case is actually current
    //current is more the future state that we are aiming to get to.
    this.effects.forEach(effect => {
      const { previous } = effect;
      effect.render(this.element, previous);
    });
  };
}

export default Item;
