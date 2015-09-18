// jquery.nestedlist.src.js 2014-5-7 | https://github.com/Intera/jquery.nestedlist

jQuery.fn.shift = function(width, config) {
	// shift\move selected elements horizontally
	var left = parseInt(this.css("left"));
	var widthNext = isNaN(left) ? width : left + width;
  config ? this.animate({ left: widthNext }, config) : this.css({ left: widthNext })
};

jQuery.fn.nestedList = function(config) {

	function returnFalse() { return false }

	function removeTopLevelFallbackHyperlinks(container, linkSelector) {
		// for non-javascript fallback capability, hyperlinks can be rendered in the list
		// and deactivated using this procedure if javascript is available.
		var topLevelLinks = container.find(linkSelector || "li:not(.leaf) > a:first-of-type");
		var topLevelLinksLength = topLevelLinks.length;
		var link;
		while(topLevelLinksLength--) {
			link = topLevelLinks.eq(topLevelLinksLength);
			link.replaceWith(link.html())
		}
	}

	function linkWholeContainerForLeafItems(container, linkSelector) {
		// link whole container area for hyperlinks in leaf items
		container.find(linkSelector || ".leaf a:first-of-type").each(function () {
			//var hlink = $(this);
			//hlink.parents(".leaf:first()").click(function () {
			//	document.location.href = hlink.attr('href');
			//	return false
			//}).css('cursor', 'pointer')
		});
	}

	var createClass = (function() {
		var count = 0;
		return function() {
			count += 1;
			return "nestedlist-" + count
		}
	})();

	function nestedListOne(container) {
		// class for the topmost list. prevents going upwards when on the root list
		var toplevelClass = createClass();
		container.addClass(toplevelClass);

		// the currently activated list element
		var activeItem = false;

		function updateHeight(nextList, ul) {
			// li = all li of a list
			var child = ul.children();
			// height of <li> elements
			var li = child.filter("li");
			var nextHeight = 0;
			for(var i=0; i<li.length; i+=1) { nextHeight += li.eq(i).outerHeight() }

			// animate problems in FF - container shown empty\white while animating, IE - container is empty\white and never shows again
			// container.animate({ height: nextHeight }, { duration: 500 })

			// resize the nestedList container because enclosing containers only scale to the height of the nestedlist root-<ul> and not the nested sublist-<ul>
			container.height(nextHeight);
			return li
		}

		// the upButton is one container that by default is moved around and inserted into the active <li> where needed, but if the upButtonSelector and upButtonShow options are specified,
		// then the upButton can be anywhere stationary
		var upButton;
		if(config && config.upButtonSelector) {
			upButton = (typeof config.upButtonSelector == "string") ? container.nextAll(config.upButtonSelector) : config.upButtonSelector;
			upButton.hide()
		}
		else {
			upButton = container.nextAll(".nestedlist-up");
			if(upButton.length == 1) upButton.remove();
			else upButton = $("<li>back</li>").addClass("nestedlist-up")
		}

		function upButtonClick() {
			closeList();
			// prevent default handling and stop event propagation
			return false
		}

		var configDefaults = {
			upButtonShow: function(upButton, nextList) { nextList.prepend(upButton) },
			onBeforeChange: function() {},
			onAfterChange: function() {},
			shiftAnimation: {},
			noScriptLinks: false,
			linkListItems: true
		};
		config = (typeof config == "object") ? $.extend(configDefaults, config) : configDefaults;

		var cardWidth = container.outerWidth();

		function upButtonDisableClick() {
			upButton.off("click", upButtonClick);
			// prevent default handling and stop event propagation
			upButton.click(returnFalse)
		}

		function setActive(li) {
			if(activeItem) activeItem.removeClass("active");
			activeItem = li ? li.addClass("active") : false
		}

		function openList(li) {
			// take a <li> and open its child list if it has one
			nextList = li.children("ul");
			config.onBeforeChange(1, nextList, container);
			setActive(li);
			if(nextList.length) {
				nextList.show();
				config.upButtonShow(upButton, nextList);
				var prevListItems = li.siblings();
				var nextListItems = nextList.find("li");
				// reduce size of previous list before cardswitch if the next list has a smaller size.
				// otherwise the height height changes after the card have switched.
				// +1 is for the currently active <li> - we do not include it in prevListItems because we would not want to hide it.
				if((prevListItems.length + 1) > nextListItems.length) {
					prevListItems.slice(-0, prevListItems.length - nextListItems.length).hide()
				}
				upButtonDisableClick();
				config.shiftAnimation.complete = function() {
					upButton.click(upButtonClick);
					config.onAfterChange(1, nextList, container)
				};
				container.shift(-cardWidth, config.shiftAnimation);
				updateHeight(container, nextList)
			}
		}

		function closeList(noAnimation) {
			// take the activeItem <li> and close its child list if it has one, and open the parent list.
			// no "activeItem" means no activated list, no list to close
			if(activeItem) {
				var prevList = activeItem.children("ul");
				var nextList = activeItem.parent("ul");
				config.onBeforeChange(-1, nextList, container);
				activeItem.siblings().show();
				if(nextList.hasClass(toplevelClass)) {
					setActive(false);
					upButton.hide()
				} else {
					config.upButtonShow(upButton, nextList);
					setActive(nextList.parent("li"))
				}
				updateHeight(container, nextList);
				upButtonDisableClick();
				if (!noAnimation && config.shiftAnimation) {
					config.shiftAnimation.complete = function() {
						upButton.click(upButtonClick);
						prevList.hide();
						config.onAfterChange(-1, nextList, container)
					};
					container.shift(cardWidth, config.shiftAnimation)
				}
				else {
					container.shift(cardWidth, false);
					prevList.hide()
				}
				return true
			}
			else return false
		}

		function listItemClick(event) {
			var li = $(this);
			// prevent repeated clicks on the same list item or leaf item. leaf items are handled by another function
			if(li.hasClass("active") || container.is(":animated")) return false;
			openList(li);
			// important because containers with this click event handler may be nested -
			// the event would bubble up and would be created multiple times
			event.stopPropagation()
		}

		// set css and hide all nested lists by default
		container.css({ position: "relative" });
		container.find("ul").css({
			position: "absolute",
			left: cardWidth + "px",
			top: "0px"
		}).hide();

		// add leaf class
		container.find("li:not(:has(ul))").addClass("leaf").click(function (event) {
			event.stopPropagation()
		});

		// extra hover class because of list elements nested in list elements.
		// click events for all list elements with sublists
		container.find("li:not(.leaf)")
			.hover(function(e) { $(this).addClass("hover"); e.stopPropagation() },
						 function(e) { $(this).removeClass("hover"); e.stopPropagation() })
			.click(listItemClick);

		if(config.noScriptLinks) {
			removeTopLevelFallbackHyperlinks(container, (typeof config.noScriptLinks === "string") && config.noScriptLinks)
		}
		if(config.linkListItems) {
			linkWholeContainerForLeafItems(container, config && config.leafItemLink)
		}

		return {
			container: container,
			toplevelClass: toplevelClass,
      closeList: closeList,
      openList: openList
		}
	}

	// initialise all nestedlists
	var nestedLists = $.map(this, function (e) { return nestedListOne($(e)) });

	function closeAll () {
		for(var i=0; i<nestedLists.length; i+=1) { while(nestedLists[i].closeList(true)) {} }
	}

  return {
		nestedLists: nestedLists,
		closeAll: closeAll
	}
};
