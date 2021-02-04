var file = 'https://raw.githubusercontent.com/LOUD-Project/Git-LOUD/master/CHANGELOG.txt';
jQuery.get(file, function(data) {
	data = data.replaceAll(/(['"&])/g, function(match) {
		if (match == "'") {
			return "&apos;";
		} else if (match == '"') {
			return "&quot;";
		} else {
			return "&amp;";
		}
	});

	var entries = data.match(/###[\w\s\-]+###([\w\s\-.:|>'(),;&\/“”’]|(#(?!#)))+/g);
	for (const entry of entries) {
		var lines = entry.split('\n');
		var header = lines[0].substring(4, lines[0].length - 4);
		var btn = $(`<button class="changelog-header">${header}</button>`);
		$('#changelog-container').append(btn);
		var body = $('<div class="changelog-entry"></div>')
		$('#changelog-container').append(body);
		for (var i = 1; i < (lines.length - 2); i++) {
			if (lines[i]) {
				body.append(`<p>${lines[i]}</p>`);
			} else {
				body.append('<br>')
			}
		}
	}

	var coll = $(".changelog-header");
	var i;
	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
		  this.classList.toggle("active");
		  var content = this.nextElementSibling;
		  if (content.style.display === "block") {
			content.style.display = "none";
		  } else {
			content.style.display = "block";
		  }
		});
	  }
});