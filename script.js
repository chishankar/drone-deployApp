// Creating global variable to reference API
var drone_deploy_api = null;

// Starting the generation of combining all the tiles into a pdf
function generatePDF(){
  // Utilize jsPDF to create a new document.
  const new_doc = new jsPDF()
  /* Initialize DroneDeploy API, create promise chain 
    Used Example Call in API Doc as example to structure this part */
  new DroneDeploy({version: 1}).then(function(dronedeployApi){
    drone_deploy_api = dronedeployApi
    return drone_deploy_api.Plans.getCurrentlyViewed()
  }).then(function(plan){
    /* Make GET request to get the Tiles */
    const zoom_int = parseInt(16)
    return drone_deploy_api.Tiles.get({
      planId: plan.id,
      layerName: "ortho",
      zoom: zoom_int
    })
    // Gettings the Time image URL's
  }).then(function(TileFile){
    return TileFile.tiles
  }).then(function(url_arr){
    for (let x = 0; x <  url_arr.length; i++){
      getBase64ImageViaURL(url_arr[i],function(element_url){
        doc.addImage(element_url,'PNG',10,50)
      })
    }
  })
  new_doc.save("Map.pdf")
}

function getBase64ImageViaURL(url, callback) {
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function() {
    const canvas = document.createElement('CANVAS')
    const ctx = canvas.getContext('2d')
    let dataURL
    canvas.height = this.height
    canvas.width = this.width
    ctx.drawImage(this, 0, 0)
    dataURL = canvas.toDataURL('image/png')
    callback(dataURL)
    canvas = null
  }
  img.src = url
}
