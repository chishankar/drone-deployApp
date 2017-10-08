# Challenge Option 3 -> PDF Generator
Create an app for the DroneDeploy platform. The app should provide a button on the data page that will create a PDF of the map shown. For example:
https://www.dropbox.com/s/af50irnf2mrzhua/Screenshot%202016-12-09%2014.44.51.png?dl=0

When the button is clicked it should download a PDF that contains an image of the map being view. See http://developer.dronedeploy.com ( http://developer.dronedeploy.com ) in particular how to access “Tiles”.

# Process

### Step 1
I first read the Design Guidlines [here](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/getting_started.html) and found the design guidlines very similar to the app I wanted to make:

    <div class="row">
        <a id="report-button">
            <div class="col-1">
                <img class="icon" src="img/icon.png">
                <div id="button-text">Generate</div>
            </div>
            <div class="col-3">
                Printable and editable map report, with annotations.
            </div>
        </a>
     </div>

### Step 2
I then read the API Docs regarding Tiles [here](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/tiles.html) and used [jsPDF docs](https://github.com/MrRio/jsPDF) to generate the pdf.

In order to generate a pdf of my current map, which is composed of tiles, I need to get the user's currently viewed plan
which I can do by calling ```Plans.getCurrentlyViewed()```, which returns back a plethora of imformation ([here](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/plans.html)) including a ```plan id```.

To be able to retreive tiles from the map we have to use a URL template, which we can do by making ```GET``` requests via [```Tiles.get```](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/tiles.html)









