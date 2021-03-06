/*!
 * vue-virtualized-list v0.0.3 
 * (c) 2020 albertodeagostini.dev@gmail.com
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.VueVirtualizedList = factory());
}(this, (function () { 'use strict';

    var VirtualizedListRender = {
      name: "VirtualizedList",
      props: {
        outerContainerEl: {
          type: String,
          default: "div"
        },
        outerContainerClass: {
          type: String,
          default: "vue-virtualized-list__scroll"
        },
        innerContainerEl: {
          type: String,
          default: "div"
        },
        innerContainerClass: {
          type: String,
          default: "vue-virtualized-list"
        },
        items: {
          type: Array,
          required: true
        },
        itemHeight: {
          type: Number,
          required: true
        }
      },
      data: function data() {
        return {
          firstItemToRender: null,
          // index of the first item to render
          lastItemToRender: null,
          // index of the last item to render
          benchBefore: 5,
          // amount of items to render before the first
          benchAfter: 5,
          // amount of items to render after the last
          scrollTop: 0 // current scrolltop offset of the scrollable container

        };
      },
      computed: {
        firstToRender: function firstToRender() {
          return Math.max(0, this.firstItemToRender - this.benchBefore);
        },
        lastToRender: function lastToRender() {
          return Math.min(this.items.length, this.lastItemToRender + this.benchAfter);
        }
      },
      mounted: function mounted() {
        this.firstItemToRender = 0;
        this.lastItemToRender = Math.floor(this.$el.clientHeight / this.itemHeight); // console.log("mounted", this.firstItemToRender, this.lastItemToRender);

        this.$el.addEventListener("scroll", this.onScroll, false);
      },
      methods: {
        onScroll: function onScroll(evt) {
          this.scrollTop = evt.target.scrollTop;
          this.firstItemToRender = Math.floor(this.scrollTop / this.itemHeight);
          this.lastItemToRender = this.firstItemToRender + Math.ceil(this.$el.clientHeight / this.itemHeight); // console.log("scroll", this.firstItemToRender, this.lastItemToRender);
        },
        getRenderedItems: function getRenderedItems(h) {
          var _this = this;

          // return html
          var toRender = this.items.slice(this.firstToRender, this.lastToRender);
          return toRender.map(function (item, i) {
            return h("div", {
              style: {
                position: "absolute",
                left: 0,
                right: 0,
                top: (_this.firstToRender + i) * _this.itemHeight + "px"
              }
            }, _this.$scopedSlots.default(item));
          });
        }
      },
      render: function render(h) {
        var list = this.getRenderedItems(h);
        var renderScroll = h(this.innerContainerEl, {
          class: this.innerContainerClass,
          style: Object.assign({
            display: "block",
            height: this.items.length * this.itemHeight + "px"
          })
        }, list);
        var renderList = h(this.outerContainerEl, {
          class: this.outerContainerClass,
          style: {
            height: "100%",
            overflow: "auto",
            position: "relative",
            display: "block"
          }
        }, [renderScroll]);
        return renderList;
      }
    };

    var VirtualizedListRender$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': VirtualizedListRender
    });

    function getCjsExportFromNamespace (n) {
    	return n && n['default'] || n;
    }

    var require$$0 = getCjsExportFromNamespace(VirtualizedListRender$1);

    var src = require$$0;

    return src;

})));
