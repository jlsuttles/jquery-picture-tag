// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.PictureTag = {};

  $.fn.pictureTag = function() {
    return this.each(function() {
      return new PictureTag.Picture($(this));
    });
  };

  this.PictureTag.Picture = (function() {

    function Picture($el) {
      this.$el = $el;
      this._img = __bind(this._img, this);

      this._displayBest = __bind(this._displayBest, this);

      this.sources = new PictureTag.Sources(this.$el.children("source"));
      this._displayBest();
      $(window).resize(this._displayBest);
    }

    Picture.prototype._displayBest = function() {
      return this._img().display(this.sources.best());
    };

    Picture.prototype._img = function() {
      return new PictureTag.Img(this.$el.children("img:first"));
    };

    return Picture;

  })();

  this.PictureTag.Img = (function() {

    function Img($el) {
      this.$el = $el;
      this._replace = __bind(this._replace, this);

    }

    Img.prototype.display = function(value) {
      if (value !== this.$el.attr("src")) {
        this.$el2 = this.$el.clone();
        this.$el2.attr("src", value);
        return this.$el2.load(this._replace);
      }
    };

    Img.prototype._replace = function() {
      return this.$el.replaceWith(this.$el2);
    };

    return Img;

  })();

  this.PictureTag.Sources = (function() {

    function Sources($els) {
      this.$els = $els;
      this._newSource = __bind(this._newSource, this);

      this.best = __bind(this.best, this);

      this.defaultSource = new PictureTag.Source(this.$els.filter(":not([media])"));
      this.mediaSources = this.$els.filter("[media]").map(this._newSource);
    }

    Sources.prototype.best = function() {
      var bestSoFar,
        _this = this;
      bestSoFar = this.defaultSource;
      this.mediaSources.each(function(i, mediaSource) {
        if (mediaSource.isBetterThan(bestSoFar)) {
          return bestSoFar = mediaSource;
        }
      });
      return bestSoFar.src();
    };

    Sources.prototype._newSource = function(i, el) {
      return new PictureTag.Source($(el));
    };

    return Sources;

  })();

  this.PictureTag.Source = (function() {

    function Source($el) {
      this.$el = $el;
      this.media = new PictureTag.Media(this.$el.attr("media"));
      this.srcset = this.$el.attr("srcset");
    }

    Source.prototype.isBetterThan = function(other) {
      return this.media.isBetterThan(other.media);
    };

    Source.prototype.src = function() {
      if (this.srcset) {
        return this.srcset.match(/^\S+?(?=,|\s)/)[0];
      }
    };

    return Source;

  })();

  this.PictureTag.Media = (function() {

    function Media(query) {
      this.query = query;
    }

    Media.prototype.isBetterThan = function(other) {
      if (this._matches() && !other._matches()) {
        return true;
      } else if (this._matches() && other._matches()) {
        return this._minWidth >= other.minWidth;
      } else {
        return false;
      }
    };

    Media.prototype._matches = function() {
      return this.query && matchMedia(this.query).matches;
    };

    Media.prototype._minWidth = function() {
      return parseInt(this.query.match(/\d+/)[0]);
    };

    return Media;

  })();

}).call(this);