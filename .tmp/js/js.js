'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

particlesJS.load('duang', 'pc.json');

var tagSlide = function () {
    function tagSlide(option) {
        var _this = this;

        _classCallCheck(this, tagSlide);

        this.PADDING = option.PADDING || 100;
        this.MAX_FONT = option.PADDING || 2;
        this.MIN_FONT = option.PADDING || 0.9;
        this.BLANK_CENTER = option.PADDING || 500;
        this.stage = document.getElementById('duang');
        this.initStage();
        this.initTags(option.tags);
        this.showTags();
        setTimeout(function () {
            window.requestAnimationFrame(function () {
                _this.carouselTags();
            });
        }, 7000);
        window.addEventListener('resize', function () {
            _this.initStage();
        });
    }

    _createClass(tagSlide, [{
        key: 'initStage',
        value: function initStage() {
            this.stageHeight = this.stage.clientHeight;
            this.stageWidth = this.stage.clientWidth;
        }
    }, {
        key: 'initTags',
        value: function initTags(tags) {
            this.tags = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tag = _step.value;

                    var tmp = document.createElement("p");
                    tmp.innerHTML = tag;
                    tmp.className = "tags";
                    this.tags.push(tmp);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'showTags',
        value: function showTags() {
            var _this2 = this;

            var tagPointer = 0;
            var Duang = function Duang() {
                var xSeed = Math.round(Math.random());
                _this2.tags[tagPointer].style.left = Math.round(Math.random() * (_this2.stageWidth / 2 - _this2.PADDING - _this2.BLANK_CENTER / 2)) + (1 - xSeed) * _this2.PADDING + xSeed * (_this2.stageWidth / 2 + _this2.BLANK_CENTER / 2) + "px";
                _this2.tags[tagPointer].style.top = Math.round(Math.random() * (_this2.stageHeight - _this2.PADDING * 2)) + _this2.PADDING + "px";
                _this2.tags[tagPointer].style.fontSize = Math.random() * (_this2.MAX_FONT - _this2.MIN_FONT) + _this2.MIN_FONT + "em";
                _this2.tags[tagPointer].style.opacity = 0.5;
                _this2.stage.appendChild(_this2.tags[tagPointer]);
                if (tagPointer < _this2.tags.length - 1) {

                    setTimeout(function () {
                        tagPointer++;
                        Duang();
                    }, 100);
                } else {
                    tagPointer = 0;
                }
            };
            Duang();
        }
    }, {
        key: 'removeTags',
        value: function removeTags() {
            var _this3 = this;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop = function _loop() {
                    var tag = _step2.value;

                    tag.style.opacity = 0;
                    tag.style.top = _this3.stageHeight + 'px';
                    setTimeout(function () {
                        _this3.stage.removeChild(tag);
                    }, 800);
                };

                for (var _iterator2 = this.tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'carouselTags',
        value: function carouselTags() {
            var _this4 = this;

            this.removeTags();
            setTimeout(function () {
                _this4.showTags();
            }, 800);
            setTimeout(function () {
                window.requestAnimationFrame(function () {
                    _this4.carouselTags();
                });
            }, 7000);
        }
    }]);

    return tagSlide;
}();