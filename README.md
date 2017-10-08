![](img/dronedeploy.png)

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
I then read the API Docs regarding Tiles [here](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/tiles.html) and used the [jsPDF docs](https://github.com/MrRio/jsPDF) to generate the pdf.

In order to generate a pdf of my current map, which is composed of tiles, I need to get the user's currently viewed plan
which I can do by calling ```Plans.getCurrentlyViewed()```, which returns back a plethora of imformation ([here](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/plans.html)) including a ```plan id```.

To be able to retreive tiles from the map we have to use a URL template, which we can do by making ```GET``` requests via [```Tiles.get```](https://dronedeploy.gitbooks.io/dronedeploy-apps/content/tiles.html) and which requires the ```plan id``` that we acquired previously.

 The ```Tiles.get``` returns a response like:

    {
    expires: 1478214226365,
    template: "https://public-tiles.dronedeploy.com/1477521235_DILLONOPENPIPELINE_ortho_xul/{z}/{x}/{y}.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wdWJsaWMtdGlsZXMuZHJvbmVkZXBsb3kuY29tLzE0Nzc1MjEyMzVfRElMTE9OT1BFTlBJUEVMSU5FX29ydGhvX3h1bC8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNDc4MjE0MjI2fX19XX0_&Signature=RxAMowpa1AxVdJ1HFdduwllksyyP2XGgEteisdAqjPrheTLIyq7-a1Xk68Tx0kxquM9-cY-sY8kbmmmwdpsQgLPc~mg5MlXRICuCunZ~qdZ-9qVMBeTTgH8ZxAqnPfbQ764y~f6CfH1q~gCT0NTHTT4X8~MKmCjztWvhB3ji6NkipzxYrm4osf60FFjf8IuaOUvBtzOv5Q1J6qXXiyRG4AtDmZWeVlSUQ7UH1UtzQpIPfLqq~EgX7XNDqt12rRckkRGWowm5uOGFT62tQ2fgF77KZCScJZ4HbmRFUHcD27GME~5uY6gakA~ydKDIcgX8emKpbENGyjdWJZ1lGggQFA__&Key-Pair-Id=APKAJXGC45PGQXCMCXSA",
    }

We used the  ```plan id``` to get a list of Tiles from which we can then retrieve each ```Tiles URL``` and then add it to the PDF.

Once we create an array of ```Tiles URL's```, we then need to traverse through the Array, get the image and then add it to the document that we created at the beginning.

So once we have the URL, we need a way of converting the ```Image URL``` to a ```Base64 DataURL```, which can be done through ```HTML Canvas```.

So we create a function that does the conversion that accepts the url and a ```callback ```function that adds it in-order to the doc.















