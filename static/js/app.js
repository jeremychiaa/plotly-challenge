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
        
        // Set index value to 0 for every page load
        i = i || 0;

        // Store data from each sample into an object
        var patientData = sampleData.samples;

        // Sort new object by sample values
        var sortedPatientData = patientData.sort((a, b) => b.sample_values - a.sample_values);

        // Find first 10 values for first patient
        var sampleValues = sortedData[i].sample_values.slice(0, 10).reverse();
        var otuIds = sortedData[i].otu_ids.slice(0, 10);
        var otuLabels = sortedData[i].otu_labels.slice(0, 10);

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
            text: otuLabels
        }]

        // Setting the plot title
        var layout = {
            title: "Top 10 OTUs"
        }

        // Using Plotly to visualise horizontal bar chart
        Plotly.newPlot("bar", data, layout, {displayModeBar: false});
    };

});