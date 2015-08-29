(function() {
  (function($) {
    var GuidingLight;
    GuidingLight = (function() {
      function GuidingLight(container) {
        this.container = container != null ? container : $('.cgl-container', this.doc);
        this.history = [];
        this.log = [];
        if (this.container.length !== 1) {
          throw new Error('Guiding Light: Too many container object!');
        }
        this.container.empty();
        if (this.doc = this.doc || this.container.data('cgl-doc')) {
          this.load('#index');
        } else {
          throw new Error('Guiding Light: Tutorial document not found!');
        }
      }

      GuidingLight.prototype.guidelize = function(container) {
        var gl, need_nav, next_btn, prev_btn;
        if (container == null) {
          container = this.container;
        }
        gl = this;
        container.prepend('<hr>');
        container.prepend("<div class=\"cgl-order\">" + this.history.length + "</div>");
        container.find('*[data-for]').each(function() {
          var for_what, self;
          self = $(this);
          for_what = self.data('for');
          if (gl.log.indexOf(for_what) < 0) {
            return self.css('display', 'none');
          }
        });
        container.find('*[data-not-for]').each(function() {
          var for_what, self;
          self = $(this);
          for_what = self.data('not-for');
          if (gl.log.indexOf(for_what) >= 0) {
            return self.css('display', 'none');
          }
        });
        need_nav = true;
        if (this.history[0].name === '#finish') {
          need_nav = false;
        }
        container.find('.cgl-block-option').each(function() {
          var img_url, is_new_window, self, target, _ref;
          need_nav = false;
          self = $(this);
          if (img_url = self.data('img')) {
            self.prepend("<img src=\"" + img_url + "\" />");
          }
          _ref = GuidingLight.parse_target(self.data('target')), target = _ref[0], is_new_window = _ref[1];
          if (target) {
            return self.click(function() {
              container.find('.cgl-prev, .cgl-next').remove();
              self.addClass('active');
              self.siblings('.cgl-block-option').addClass('disabled').off('click');
              gl.log.unshift(self.data('value'));
              return gl.load(target, is_new_window);
            });
          }
        });
        if (this.history.length > 1) {
          prev_btn = $('<div class="cgl-prev">Back to previous step</div>');
          prev_btn.click((function(_this) {
            return function() {
              var last;
              container.find('.cgl-prev, .cgl-next').remove();
              _this.history.shift().section.remove();
              _this.log.shift();
              if (last = _this.history.shift()) {
                last.section.remove();
                return _this.load(last.name);
              }
            };
          })(this));
        }
        if (need_nav) {
          next_btn = $('<div class="cgl-next">I completed this step</div>');
          next_btn.click((function(_this) {
            return function() {
              var div, target;
              div = container.find('div[id]').first();
              if (target = div.data('target')) {
                container.find('.cgl-prev, .cgl-next').remove();
                return gl.load(target, div.data('new-page'));
              }
            };
          })(this));
        }
        return container.append(prev_btn).append(next_btn);
      };

      GuidingLight.prototype.load = function(target, new_window) {
        var sec;
        if (new_window == null) {
          new_window = false;
        }
        if (new_window) {
          this.container.empty();
        }
        this.container.append(sec = GuidingLight.section());
        this.history.unshift({
          name: target,
          section: sec
        });
        return sec.load("" + this.doc + " " + target, (function(_this) {
          return function() {
            return _this.guidelize(sec);
          };
        })(this));
      };

      GuidingLight.section = function() {
        return $('<div class="cgl-section"></div>');
      };

      GuidingLight.parse_target = function(t) {
        if (t[0] === '^') {
          return [t.substr(1), false];
        } else {
          return [t, true];
        }
      };

      return GuidingLight;

    })();
    jQuery.fn.guidingLight = function() {
      return this.each(function() {
        var container, doc;
        container = $(this);
        doc = container.data('cgl-doc');
        return new GuidingLight(container, doc);
      });
    };
    return $(document).ready(function() {
      return $('.cgl-container').guidingLight();
    });
  })(jQuery);

}).call(this);
