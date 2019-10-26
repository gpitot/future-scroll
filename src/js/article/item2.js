

import { lerp } from "../utils";

class Item {
    constructor({
        element,

    }) {

        this.element = element;
        this.effects = [];
        this.visible = false;
        
        this.handleResize();

        new IntersectionObserver(this.observerCallback).observe(this.element);
    }

    handleResize = () => {
        this.size = this.element.getBoundingClientRect();
    }

    observerCallback = ([{isIntersecting}]) => {
        this.visible = isIntersecting;
    }

    add = ({ease, update, render, minChange}) => {
        this.effects.push({
            previous: 0,
            current : 0,
            minChange,
            ease,
            update,
            render
        });
    }


    update = () => {
        if (!this.visible) return false;

        let shouldRender = false;
        this.effects.forEach(effect => {
            const {ease, update, minChange} = effect;

            const current = update(this.element);
            const previous = lerp(effect.previous, current, ease);

            if (Math.abs(previous - current) > minChange) {
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
        
    }


    render = () => {
        //previous in this case is actually current
        //current is more the future state that we are aiming to get to.
        this.effects.forEach(effect => {
            const {previous} = effect;
            effect.render(this.element, previous);
        });
    }
}


export default Item;