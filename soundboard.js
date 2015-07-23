	var retVal = '<p>';
soundNames = ["Roar","Bear","Lightning","Spell 1","Spell 2","Mystic aura","Turn down"];

//for (i = 0; i < soundNames.length; i++) { }

sounds = []
//for (i = 0; i < soundNames.length; i++) { 
//  myURL = "http://www.maxradin.com/soundboard/sounds/" + soundNames[i] + ".wav";
//  sounds.push(gapi.hangout.av.effects.createAudioResource(
//               myURL).createSound({loop: false, localOnly: false}));
//	    }

function addButton(name) {
    var div = document.getElementById('buttonsDiv');
    retVal = div.innerHTML;
    retVal += name
    retVal += '<input class="button" type="button" value="play" id="' + name + '" '; 
	  retVal += 'onClick="playSound(' + (sounds.length-1) + ')"/>'
    retVal += '<input class="button" type="button" value="stop" id="' + name + '" '; 
	  retVal += 'onClick="stopSound(' + (sounds.length-1) + ')"/>'
    retVal += '<input class="button" type="button" value="toggle loop" id="' + name + '" '; 
	  retVal += 'onClick="toggleSound(' + (sounds.length-1) + ')"/>'
    retVal += '<br><br>';
    div.innerHTML = retVal;
}

function playSound(i) {
  sounds[i].play();
}

function stopSound(i) {
  sounds[i].stop();
}

function toggleSound(i) {
  sounds[i].setLoop(!sounds[i].isLooped());
}

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      reader.filename = f.name
      reader.onload = function(e){
        sounds.push((gapi.hangout.av.effects.createAudioResource(
                     e.target.result).createSound({loop: false, localOnly: false})));
      addButton(e.target.filename)
      }
      reader.readAsDataURL(f)
    }
    document.getElementById("drop_zone").style.backgroundColor = "#EEEEEE"
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  function handleDragEnter(evt) {
    document.getElementById("drop_zone").style.backgroundColor = "#CCFFCC"
  }

  function handleDragLeave(evt) {
    document.getElementById("drop_zone").style.backgroundColor = "#EEEEEE"
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('dragenter', handleDragEnter, false);
  dropZone.addEventListener('dragleave', handleDragLeave, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

function init() {
  // When API is ready...                                                         
}

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
