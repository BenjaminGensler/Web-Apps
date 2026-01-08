// 1. Define reference colors
const referenceColors = [
    { name: "black", rgb: [0, 0, 0] },
    { name: "gray", rgb: [128, 128, 128] },
    { name: "light gray", rgb: [200, 200, 200] },
    { name: "white", rgb: [255, 255, 255] },
    { name: "red", rgb: [255, 0, 0] },
    { name: "light red", rgb: [255, 128, 128] },
    { name: "blue", rgb: [0, 0, 255] },
    { name: "light blue", rgb: [128, 128, 255] },
    { name: "green", rgb: [0, 255, 0] },
    { name: "light green", rgb: [128, 255, 128] },
    { name: "yellow", rgb: [255, 255, 0] },
    { name: "light yellow", rgb: [255, 255, 128] },
    { name: "purple", rgb: [128, 0, 128] },
    { name: "light purple", rgb: [255, 128, 255] },
    { name: "orange", rgb: [255, 165, 0] },
    { name: "light orange", rgb: [255, 200, 128] }
];


// 2. Initialize color counts
const colorCounts = {};
referenceColors.forEach(color => colorCounts[color.name] = 0);


let c = document.createElement("canvas");
let img1 = new Image();

img1.onload = function(){
    document.getElementById("image1").remove();
    w = img1.width;
    h = img1.height;

    c.width = w;
    c.height = h;
    ctx = c.getContext("2d");
    ctx.drawImage(img1,0,0);

    let pixelArr = ctx.getImageData(0,0,w,h).data;
    let sample_size = 20;          // Data that changes the pixelation size

    for(let y = 0; y < h; y += sample_size){
        for(let x = 0; x < w; x += sample_size){
            let p = ((y * w) + x) * 4;
            let r = pixelArr[p];
            let g = pixelArr[p+1];
            let b = pixelArr[p+2];


            // 3. Find closest reference color
            let minDist = Infinity;
            let closestColor = null;
            for (const ref of referenceColors) {
                let dr = r - ref.rgb[0];
                let dg = g - ref.rgb[1];
                let db = b - ref.rgb[2];
                let dist = dr*dr + dg*dg + db*db;
                if (dist < minDist) {
                    minDist = dist;
                    closestColor = ref.name;
                }
            }
            // 4. Increment count
            colorCounts[closestColor]++;

            ctx.fillStyle = `rgba(${r},${g},${b},${pixelArr[p+3]})`;
            ctx.fillRect(x,y,sample_size, sample_size);

            // Draw black outline
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, sample_size, sample_size);
        }
    }

    // Output color counts to the page
    let countsDiv = document.createElement('div');
    countsDiv.style.marginTop = '20px';
    countsDiv.innerHTML = '<h3>Color Counts</h3>';
    
    
    for (const ref of referenceColors) {
        const colorName = ref.name;
        const count = colorCounts[colorName];
        if (count > 0) { // Only show if count is not 0
            const rgb = `rgb(${ref.rgb[0]},${ref.rgb[1]},${ref.rgb[2]})`;
            let row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.marginBottom = '4px';
            row.innerHTML = `
                <span style="display:inline-block;width:20px;height:20px;background:${rgb};margin-right:8px;border:1px solid #ccc;"></span>
                <span style="width:120px;display:inline-block;">${colorName}</span>
                <span>${count}</span>
            `;
            countsDiv.appendChild(row);
        }
    }

    

    document.body.appendChild(countsDiv);

    let img2 = new Image();
    img2.src = c.toDataURL("image/jpeg");
    img2.width = 600;
    document.body.appendChild(img2);
}

img1.src = document.getElementById("image1").src;

