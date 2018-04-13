// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
    var Starrr;

    Starrr = (function() {
        Starrr.prototype.defaults = {
            rating: void 0,
            numStars: 5,
            change: function(e, value) {}
        };

        function Starrr($el, options) {
            var i, _, _ref,
                _this = this;

            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            _ref = this.defaults;
            for (i in _ref) {
                _ = _ref[i];
                if (this.$el.data(i) != null) {
                    this.options[i] = this.$el.data(i);
                }
            }
            this.createStars();
            this.syncRating();
            this.$el.on('mouseover.starrr', 'span', function(e) {
                return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
            });
            this.$el.on('mouseout.starrr', function() {
                return _this.syncRating();
            });
            this.$el.on('click.starrr', 'span', function(e) {
                return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
            });
            this.$el.on('starrr:change', this.options.change);
        }

        Starrr.prototype.createStars = function() {
            var _i, _ref, _results;

            _results = [];
            for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                _results.push(this.$el.append("<span class='icon ion-android-star-outline'></span>"));
            }
            return _results;
        };

        Starrr.prototype.setRating = function(rating) {
            if (this.options.rating === rating) {
                rating = void 0;
            }
            this.options.rating = rating;
            this.syncRating();
            return this.$el.trigger('starrr:change', rating);
        };

        Starrr.prototype.syncRating = function(rating) {
            var i, _i, _j, _ref;

            rating || (rating = this.options.rating);
            if (rating) {
                for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                    this.$el.find('span').eq(i).removeClass('ion-android-star-outline').addClass('ion-star');
                }
            }
            if (rating && rating < 5) {
                for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                    this.$el.find('span').eq(i).removeClass('ion-star').addClass('ion-android-star-outline');
                }
            }
            if (!rating) {
                return this.$el.find('span').removeClass('ion-star').addClass('ion-android-star-outline');
            }
        };

        return Starrr;

    })();
    return $.fn.extend({
        starrr: function() {
            var args, option;

            option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return this.each(function() {
                var data;

                data = $(this).data('star-rating');
                if (!data) {
                    $(this).data('star-rating', (data = new Starrr($(this), option)));
                }
                if (typeof option === 'string') {
                    return data[option].apply(data, args);
                }
            });
        }
    });
})(window.jQuery, window);

$(function() {
    return $(".starrr").starrr();
});

/**** Tabs ****/
$(document).on("click", ".tabsNav__tabNavigation a",function(e)
{
	e.preventDefault();
	var i, tabcontent, tablinks, current_tab;
	current_tab = $(this).attr('href');
	current_tab = current_tab.replace("#", "");

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabDescription__content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tabLinkNav");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(current_tab).style.display = "block";
    e.currentTarget.className += " active";
});

/** Popover**/
var popup = $('#popper_obj');
var popper;

$(document).on("click", ".profileList .profileList__item--button",function(e)
{
	e.preventDefault();
	var pop_title = $(this).attr('data-title');
	var pop_data = $(this).attr('data-value');
	$('.popover__body--input label').html(pop_title);
	if(pop_data != "")
	{
		$('#popover__name').val(pop_data);
	}
    popup.show();
	
    popper = new Popper(this, popup, {
		placement: 'right'
	});
});

$(document).on("click", ".closePopover",function(e)
{
	$('.popover').css("display", "none");
	popper.destroy();
});

/**** Edit profile ****/
$(document).on("click", "#editProfile",function(e)
{
	e.preventDefault();
	$(this).css("display", "none");
	$('.editMobile.popover__body--actions').css("display", "block");
	$('.profileList').css("display", "none");
	$('.editMobile').show( "slow", function() {});
});

$(document).on("click", "#cancelEdit",function(e)
{
	e.preventDefault();
	$('.editMobile.popover__body--actions').css("display", "none");
	$('#editProfile').css("display", "block");
	$('.editMobile').css("display", "none");
	$('.profileList').show( "slow", function() {});
});

$(document).ready(function()
{
	/**** Popup ****/
    popup.hide();
});
	
