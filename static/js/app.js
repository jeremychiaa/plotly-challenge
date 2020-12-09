// Using d3 to read into data
d3.json("samples.json").then((sampleData) => {
    console.log(sampleData);

    // Store each patient ID into an array
    var names = sampleData.names;

    // Using d3 to populate dropdown options with patient IDs
    d3.select("#selDataset").selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .html(d => d);

    // Define init function that loads visualisations when page is initialised
    function init(i) {
        
        // Set initial page load's index value to 0
        i = i || 0;

        // Store data from each sample into an object
        var patientData = sampleData.samples;

        // Sort new object by sample values
        var sortedPatientData = patientData.sort((a, b) => b.sample_values - a.sample_values);

        // Retieve first 10 OTUs and arrange them in reverse order
        var sampleValues = sortedPatientData[i].sample_values.slice(0, 10).reverse();
        var otuIds = sortedPatientData[i].otu_ids.slice(0, 10).reverse();
        var topOtuLabels = sortedPatientData[i].otu_labels.slice(0, 10).reverse();

        // Create empty array for chart labels
        var chartLabels = [];

        // Concatenate OTU ID to display on chart
        otuIds.forEach(x => chartLabels.push("OTU " + x));

        // Setting the data to plot
        var data = [{
            type: "bar",
            x: sampleValues,
            y: chartLabels.reverse(),
            orientation: "h",
            text: topOtuLabels
        }]

        // Setting the plot title
        var layout = {
            title: "Top 10 OTUs"
        }

        // Using Plotly to visualise horizontal bar chart
        Plotly.newPlot("bar", data, layout, {displayModeBar: false});

        // Store values for bubble chart into variables
        var sampleValues = sampleData.samples[i].sample_values; // y values & marker size
        var otuIds = sampleData.samples[i].otu_ids; // x values
        var otuLabels = sampleData.samples[i].otu_labels;

        // Set data to plot
        var data = [{
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            text: otuLabels,
            marker: {
                size: sampleValues.map(x => x / 1.25),
                color: otuIds
            }
        }];

        // Set plot title
        var layout = {
            title: "Bubble Chart"
        }

        // Using Plotly to visualise bubble chart
        Plotly.newPlot("bubble", data, layout);

        // Retrieve demographic info metadata
        var metadata = Object.entries(sampleData.metadata[i]);

        // Using d3 to select html panel body element
        var panelBody = d3.select(".panel-body");

        // Create empty array to store panel data
        var panelData = [];

        // Append metadata into panel data array
        metadata.forEach(x => panelData.push(`${x[0]}: ${x[1]}`));

        // Clear existing data
        d3.select(".panel-body").html("");

        // Updata values in the panel
        d3.select(".panel-body").selectAll("p")
            .data(panelData)
            .enter()
            .append("p")
            .html(d => d)
        
        console.log(panelData);

        // Gauge chart
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: sampleData.metadata[i].wfreq,
                title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var layout = 
            {
                width: 600,
                height: 500,
                margin: { t: 0, b: 0 }
            };

        Plotly.newPlot('gauge', data, layout);
    };

    // Set up event listener
    d3.selectAll("#selDataset").on("change", optionChanged);

    // Update plot based on chosen dropdown value
    function optionChanged() {

        // Use d3 to select dropdown menu
        var dropdownMenu = d3.select("#selDataset");

        // Store value into a variable
        var dropdownValue = dropdownMenu.property("value");

        console.log(names.findIndex(x => x === dropdownValue));

        // Run init function using index of valye in dropdown menu
        init(names.findIndex(x => x === dropdownValue));
    };

    // Call function to initialise page
    init();

});