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
    i = sounds.length - 1;
    retVal = div.innerHTML;
    retVal += name + "<br>"
    retVal += '<input class="button" type="button" value="&#x25B6" id="play_' + i + '" '; 
	  retVal += 'onClick="playSound(' + i + ')"/>'
    retVal += '<input class="button" type="button" value="&#x25FC" id="stop_' + i + '" '; 
	  retVal += 'onClick="stopSound(' + i + ')"/>'
    retVal += '<input class="button" type="button" value="&#x21BA" id="toggle_' + i + '" '; 
	  retVal += 'onClick="toggleSound(' + i + ')"/>'
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
  color = sounds[i].isLooped() ? '#000000' : '#FF00FF';
  document.getElementById('toggle_' + i).style.color = color; 
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
