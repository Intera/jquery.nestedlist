jQuery(function () {
	var nestedLists = jQuery(".demo-list").nestedList()
	$(document).on("click", function (event) {
		if (3 == event.which) nestedLists.closeAll()
	})
})
