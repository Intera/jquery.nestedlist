/* jquery.nestedlist.src.js 2012-11-6 | https://github.com/jkalbhenn/jquery.nestedlist */
jQuery.fn.shift = function (width, onComplete) {
	//shift\move selected elements horizontally
	var left = parseInt(this.css("left"))
	var widthNext = isNaN(left) ? width : left + width
	this.animate({ left: widthNext }, { complete: onComplete })
}

jQuery.fn.nestedList = function (config) {

	function returnFalse () { return false }
	function emptyFunc () { return false	}

	var createId = (function () {
		var count = 0
		return function () {
			//create a unique id for the toplevel of the nestedlist
			var next = function () { return "nestedlist-" + count }
			var cur = next()
			while ($(cur).length) {
				cur = next(count)
				count += 1
			}
			return cur
		}
	})()

	function updateHeight (container, ul) {
		//li = all li of a list
		//resize nestedList container on displayed content change
		//if the number of displayed list items changes, the nestedList container otherwise would not resize automatically
		var child = ul.children()
		///height of <li> elements
		var li = child.filter("li")
		var liHeight = li.eq(0).outerHeight()
		var liCount = li.length
		var nextHeight = liCount * liHeight
		//height of other elements
		var otherEl = child.not("li")
		otherElLength = otherEl.length
		while (otherElLength--) {
			nextHeight += otherEl.eq(otherElLength).outerHeight()
		}

		//animate problems in FF - container shown empty\white while animating, IE - container is empty\white and never shows again
		//container.animate({ height: nextHeight }, { duration: 500 })
		container.height(nextHeight)

		return li
	}

	function nestedListOne (container) {
		//class for the topmost list. prevents going upwards when on the root list
		var toplevelClass = createId()
		container.addClass(toplevelClass)

		//the currently activated list element
		var activeItem = false
		var upButton = $("<div><div>Zurück</div></div>").addClass("nestedlist-up")
		function upButtonClick (e) {
			closeList(container, activeItem)
			//prevent default handling and stop event propagation
			return false
		}

		var cardWidth = container.children("li:first").width() + 20
		var onBeforeChange = (config && config.onBeforeChange) ? config.onBeforeChange : function () {}
		var onAfterChange = (config && config.onAfterChange) ? config.onAfterChange : function () {}

		function upButtonDisableClick () {
			upButton.off("click", upButtonClick)
			upButton.click(returnFalse)
		}

		function setActive (li) {
			if (activeItem) {	activeItem.removeClass("active") }
			activeItem = li.addClass("active")
		}

		function openList (container, li) {
			//take a <li> and open its child list if it has one
			nextList = li.children("ul")
			onBeforeChange(1, nextList)
			setActive(li)
			if (nextList.length) {
				nextList.show()
				nextList.prepend(upButton)
				var prevListItems = li.siblings()
				var nextListItems = nextList.find("li")
				//reduce size of prev list before cardswitch if the next list has a smaller size.
				//this makes the animation look smoother - imagine a dynamically sizing box around the nested lists.
				//+1 is for the currently active <li> - we do not include it in prevListItems because we wouldn't want to hide it.
				if ((prevListItems.length + 1) > nextListItems.length) {
					prevListItems.slice(-0, prevListItems.length - nextListItems.length).hide()
				}
				upButtonDisableClick()
				container.shift(-cardWidth, function () {
					upButton.click(upButtonClick)
					onAfterChange(1, nextList)
				})
				updateHeight(container, nextList)
			}
		}

		function closeList (container, li) {
			//take the activeItem <li> and close its child list if it has one, and open the parent list.
			///no "activeItem" means no activated list, no list to close
			if (activeItem) {
				var prevList = li.children("ul")
				var nextList = li.parent("ul")
				onBeforeChange(-1, nextList)
				li.siblings().show()
				if (nextList.hasClass(toplevelClass)) {
					activeItem = false
				} else {
					nextList.prepend(upButton)
					setActive(nextList.parent("li"))
				}
				updateHeight(container, nextList)
				upButtonDisableClick()
				container.shift(cardWidth, function () {
					upButton.click(upButtonClick)
					prevList.hide()
					onAfterChange(-1, nextList)
				})
			}
		}

		function listItemClick (event) {
			var li = $(this)
			//prevent repeated clicks on the same list item or leaf item. leaf items are handled by another function
			if (container.is(":animated") || li.hasClass("leaf")) { return false	}
			openList(container, li)
			//important because containers with this click event handler are nested - the event would bubble up and would be created multiple times
			event.stopPropagation()
		}

		//set css and hide all nested lists by default
		container.css({ position: "relative" })
		container.find("ul").css({
			position: "absolute",
			left: cardWidth + "px",
			top: "0px"
		}).hide()

		//add leaf class
		container.find("li:not(li:has(ul))").addClass("leaf")

		//click events for all list elements with sublists
		container.find("li").
			//extra hover class because of list elements nested in list elements
			hover(function (e) { $(this).addClass("hover"); e.stopPropagation() },
						function (e) { $(this).removeClass("hover"); e.stopPropagation() })
		container.find("li").click(listItemClick)

		//click event for the "up" button
		//upButton.click(upButtonClick)
	}

	//initialise nestedlists for one or multiple elements
	for (i=0; i < this.length; i+=1) { nestedListOne($(this[i])) }
	return this
}
